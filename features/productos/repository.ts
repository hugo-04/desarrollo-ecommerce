/**
 * PRODUCT REPOSITORY
 *
 * IProductRepository: contrato que el servicio usa.
 * DbProductRepository: implementación con Prisma/PostgreSQL.
 *
 * Optimizaciones clave:
 *  - findAll: COUNT + findMany en Promise.all (una sola ida a la DB)
 *  - Búsqueda de texto: OR ILIKE acelerado por índices GIN (pg_trgm)
 *  - findBestSellers / findFeatured: take limitado + order by rating
 *  - create/update: resolveRelations resuelve nombre→ID sin `data as any`
 */

import type { Product } from "@/lib/types"
import type { ProductFilters, PaginatedResult, CreateProductDTO, UpdateProductDTO } from "./types"
import { PrismaClient } from "@prisma/client"

// ─── Interface ─────────────────────────────────────────────────────────────────

export interface IProductRepository {
  findAll(filters: ProductFilters): Promise<PaginatedResult<Product>>
  findById(id: number): Promise<Product | null>
  findBestSellers(): Promise<Product[]>
  findFeatured(): Promise<Product[]>
  findRelated(productId: number, categoryName: string): Promise<Product[]>
  create(data: CreateProductDTO): Promise<Product>
  update(id: number, data: UpdateProductDTO): Promise<Product>
  delete(id: number): Promise<void>
}

// ─── Prisma DB implementation ──────────────────────────────────────────────────

export class DbProductRepository implements IProductRepository {
  constructor(private db: PrismaClient) { }

  /** Convierte technicalSpecs desde DB (Record o Array) → TechnicalSpec[] */
  private parseSpecs(raw: unknown): { label: string; value: string }[] {
    if (!raw) return []
    if (Array.isArray(raw)) return raw as { label: string; value: string }[]
    if (typeof raw === "object")
      return Object.entries(raw as Record<string, string>).map(([label, value]) => ({ label, value }))
    return []
  }

  /** Mapea el modelo de DB (con relaciones incluidas) al DTO de la app */
  private mapProduct(p: any): Product {
    return {
      id: p.id,
      name: p.name,
      slug: p.slug ?? undefined,
      description: p.description,
      fullDescription: p.fullDescription,
      image: p.image,
      imageAlt: p.imageAlt ?? undefined,
      imageTitle: p.imageTitle ?? undefined,
      gallery: p.gallery,
      galleryAlts: p.galleryAlts?.length ? p.galleryAlts : undefined,
      keywords: p.keywords?.length ? p.keywords : undefined,
      modelo: p.modelo ?? undefined,
      medidas: p.medidas,
      fichaTecnica: p.fichaTecnica ?? undefined,
      featured: p.featured,
      bestSeller: p.bestSeller,
      rating: p.rating,
      category: p.category?.name ?? "",
      categorySlug: p.category?.slug ?? undefined,
      brands: p.brands?.map((b: any) => b.name) ?? [],
      subcategoryId: p.subcategory?.id ?? undefined,
      subcategoryName: p.subcategory?.name ?? undefined,
      technicalSpecs: this.parseSpecs(p.technicalSpecs),
      createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
      updatedAt: p.updatedAt instanceof Date ? p.updatedAt.toISOString() : p.updatedAt,
    }
  }

  /**
   * Catálogo paginado con filtros completos y búsqueda FTS avanzada.
   *
   * ── Estrategia de búsqueda (Full-Text Search + pg_trgm) ──────────────────
   *
   * Sin query → path rápido: Prisma ORM + índices B-tree existentes.
   *
   * Con query → PostgreSQL FTS nativo:
   *   1. Normalización del input
   *      - trim()   : elimina espacios al inicio/final
   *      - lower()  : case-insensitive
   *      - unaccent(): accent-insensitive (aislación = aislacion)
   *
   *   2. tsvector pre-calculado en columna `search_vector` con GIN index
   *      - Peso A: name  (mayor relevancia)
   *      - Peso D: description (menor relevancia)
   *      - Diccionario 'simple': NO stemming → preserva términos técnicos
   *        (NEMA, IEC, ANSI, aislador, etc.)
   *
   *   3. Marca y categoría: to_tsvector() on-the-fly en la query
   *      (están en otras tablas, no se pueden pre-calcular en el trigger)
   *
   *   4. tsquery con prefijo (':*')
   *      - Convierte "cable" → 'cable:*' → matches cable, cables, cableado…
   *      - Cada palabra se convierte independientemente → multi-word
   *
   *   5. Ranking compuesto (ts_rank_cd)
   *      - Pesa name (A) > brand (B) > category (B) > description (D)
   *      - NORMALIZATION=32: divide por longitud del documento → justo para
   *        productos con descripciones largas vs cortas
   *
   *   6. Fallback pg_trgm (word_similarity > 0.30)
   *      - Solo activa cuando no hay match FTS exacto
   *      - Umbral 0.30 evita falsos positivos
   *      - Captura errores tipográficos: "aisaldor" → "aislador"
   *
   *   7. ILIKE exacto como tercer nivel (rápido vía GIN trigrama)
   *
   * COUNT + data en paralelo → mínimas round-trips a la DB.
   */
  async findAll(filters: ProductFilters): Promise<PaginatedResult<Product>> {
    const {
      categories = [],
      brands = [],
      query = "",
      onlyBestSellers = false,
      page = 1,
      limit = 12,
      sortBy = "recommended",
      subcategoryId,
    } = filters

    // ── Sin búsqueda: Prisma ORM directo (sin overhead de FTS) ────────────────
    if (!query.trim()) {
      const where: any = {}
      if (categories.length > 0) where.category = { name: { in: categories } }
      if (brands.length > 0) where.brands = { some: { name: { in: brands } } }
      if (onlyBestSellers) where.bestSeller = true
      if (subcategoryId) where.subcategoryId = subcategoryId

      const orderBy: any =
        sortBy === "az" ? { name: "asc" } :
          sortBy === "za" ? { name: "desc" } :
            sortBy === "rating" ? { rating: "desc" } :
              { id: "desc" }

      const [total, rows] = await Promise.all([
        this.db.product.count({ where }),
        this.db.product.findMany({
          where, skip: (page - 1) * limit, take: limit, orderBy,
          include: { category: true, brands: true, subcategory: true },
        }),
      ])

      return {
        data: rows.map((p) => this.mapProduct(p)),
        total, page,
        totalPages: Math.ceil(total / limit) || 1,
      }
    }

    // ── Con búsqueda: FTS nativo PostgreSQL ────────────────────────────────────

    // $1 = query normalizado (trim + lower + unaccent via SQL)
    // Los params $2..N son para los filtros adicionales
    const params: unknown[] = [query.trim()]
    let paramIdx = 2

    // Filtros adicionales (categoría, marca, bestSeller)
    const extraConditions: string[] = []

    if (categories.length > 0) {
      const ph = categories.map(() => `$${paramIdx++}`).join(", ")
      extraConditions.push(`cat.name = ANY(ARRAY[${ph}]::text[])`)
      categories.forEach((c) => params.push(c))
    }

    if (brands.length > 0) {
      const ph = brands.map(() => `$${paramIdx++}`).join(", ")
      extraConditions.push(`br.name = ANY(ARRAY[${ph}]::text[])`)
      brands.forEach((b) => params.push(b))
    }

    if (onlyBestSellers) {
      extraConditions.push(`p."bestSeller" = true`)
    }

    if (subcategoryId) {
      extraConditions.push(`p."subcategoryId" = $${paramIdx++}`)
      params.push(subcategoryId)
    }

    const extraWhere = extraConditions.length > 0
      ? `AND ${extraConditions.join(" AND ")}`
      : ""

    // Tiebreak por sortBy cuando dos productos tienen el mismo score FTS
    const tieBreak =
      sortBy === "az" ? "p.name ASC" :
        sortBy === "za" ? "p.name DESC" :
          sortBy === "rating" ? "p.rating DESC" :
            "p.id DESC"

    // ── Normalización del input ────────────────────────────────────────────────
    // f_unaccent() = wrapper IMMUTABLE sobre unaccent() (ver migration 010001)
    // Necesario para que coincida con los índices funcionales GIN de trigramas.
    const normQ = `f_unaccent(lower(trim($1::text)))`

    // ── tsquery con prefijo (prefix matching) ─────────────────────────────────
    // Convierte "cable ac" → 'cable:* & ac:*'
    // Cada token del input se convierte en una búsqueda de prefijo independiente.
    // Esto permite: "aislad" → matches "aislador", "aislamiento", etc.
    const tsqueryExpr = `
      to_tsquery('simple',
        (SELECT string_agg(token || ':*', ' & ')
         FROM unnest(regexp_split_to_array(${normQ}, '\\s+')) AS token
         WHERE token <> '')
      )
    `

    // ── tsvector de marca y categoría (on-the-fly) ────────────────────────────
    // Peso B para brand y category (relevancia media)
    const brandTsv   = `setweight(to_tsvector('simple', f_unaccent(coalesce(br.name, ''))), 'B')`
    const catTsv     = `setweight(to_tsvector('simple', f_unaccent(coalesce(cat.name, ''))), 'B')`
    // search_vector ya tiene name(A) + description(D) pre-calculado con GIN index
    const fullVector = `(p.search_vector || ${brandTsv} || ${catTsv})`

    // ── Score compuesto ────────────────────────────────────────────────────────
    // ts_rank_cd con NORMALIZATION=32 (divide por log(ndoc)) → justo entre docs
    // word_similarity como bono para typos (umbral aplicado en WHERE)
    const scoreExpr = `
      ts_rank_cd(${fullVector}, ${tsqueryExpr}, 32)
      + GREATEST(
          word_similarity(${normQ}, f_unaccent(lower(p.name))),
          word_similarity(${normQ}, f_unaccent(lower(coalesce(br.name, ''))))
        ) * 0.15
    `

    // ── WHERE: match FTS OR typo-tolerance OR substring exacta ──────────────
    // Orden de precisión (menos → más falsos positivos):
    //   1. @@ tsquery   → 0 falsos positivos (FTS exacto/prefijo)
    //   2. word_sim>0.3 → mínimos falsos positivos (typo tolerance)
    //   3. ILIKE        → subcadenas exactas (caso: "IEC" dentro de texto largo)
    const searchWhere = `
      (
        ${fullVector} @@ ${tsqueryExpr}
        OR word_similarity(${normQ}, f_unaccent(lower(p.name))) > 0.30
        OR word_similarity(${normQ}, f_unaccent(lower(coalesce(br.name, '')))) > 0.30
        OR p.name      ILIKE '%' || trim($1::text) || '%'
        OR br.name     ILIKE '%' || trim($1::text) || '%'
        OR cat.name    ILIKE '%' || trim($1::text) || '%'
      )
    `

    const baseFrom = `
      FROM products p
      LEFT JOIN "_BrandToProduct" _bp ON _bp."B" = p.id
      LEFT JOIN brands     br  ON br.id  = _bp."A"
      LEFT JOIN categories cat ON cat.id = p."categoryId"
    `

    const countSQL = `
      SELECT COUNT(DISTINCT p.id) AS total
      ${baseFrom}
      WHERE ${searchWhere} ${extraWhere}
    `

    const dataSQL = `
      SELECT p.id, MAX(${scoreExpr}) AS _score
      ${baseFrom}
      WHERE ${searchWhere} ${extraWhere}
      GROUP BY p.id
      ORDER BY _score DESC, ${tieBreak}
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `

    const [countResult, idRows] = await Promise.all([
      this.db.$queryRawUnsafe<{ total: bigint }[]>(countSQL, ...params),
      this.db.$queryRawUnsafe<{ id: number; _score: number }[]>(dataSQL, ...params),
    ])

    const total = Number(countResult[0]?.total ?? 0)
    const ids   = idRows.map((r) => r.id)

    if (ids.length === 0) {
      return { data: [], total, page, totalPages: Math.ceil(total / limit) || 1 }
    }

    // Fetch completo de las filas encontradas
    const rows = await this.db.product.findMany({
      where: { id: { in: ids } },
      include: { category: true, brands: true, subcategory: true },
    })

    // Re-ordenar según ranking FTS (findMany no preserva el orden del IN)
    const rowMap  = new Map(rows.map((r) => [r.id, r]))
    const ordered = ids.map((id) => rowMap.get(id)).filter(Boolean) as typeof rows

    return {
      data: ordered.map((p) => this.mapProduct(p)),
      total, page,
      totalPages: Math.ceil(total / limit) || 1,
    }
  }

  async findById(id: number): Promise<Product | null> {
    const p = await this.db.product.findUnique({
      where: { id },
      include: { category: true, brands: true, subcategory: true },
    })
    return p ? this.mapProduct(p) : null
  }

  /** Limitado a 8 — suficiente para el carrusel del home */
  async findBestSellers(): Promise<Product[]> {
    const rows = await this.db.product.findMany({
      where: { bestSeller: true },
      include: { category: true, brands: true, subcategory: true },
      orderBy: { rating: "desc" },
      take: 8,
    })
    return rows.map((p) => this.mapProduct(p))
  }

  /** Limitado a 6 — sección FeaturedOffers del home */
  async findFeatured(): Promise<Product[]> {
    const rows = await this.db.product.findMany({
      where: { featured: true },
      include: { category: true, brands: true, subcategory: true },
      orderBy: { rating: "desc" },
      take: 6,
    })
    return rows.map((p) => this.mapProduct(p))
  }

  /** Hasta 8 relacionados de la misma categoría, excluyendo el producto actual */
  async findRelated(productId: number, categoryName: string): Promise<Product[]> {
    const rows = await this.db.product.findMany({
      where: { category: { name: categoryName }, id: { not: productId } },
      include: { category: true, brands: true, subcategory: true },
      orderBy: { rating: "desc" },
      take: 8,
    })
    return rows.map((p) => this.mapProduct(p))
  }

  // ─── CRUD ────────────────────────────────────────────────────────────────────

  /**
   * Resuelve nombres de marca y categoría a sus IDs antes de persistir.
   * El DTO usa nombres (brand: string, category: string);
   * la DB necesita brandId/categoryId.
   */
  private async resolveRelations(brands: string[], category: string) {
    const [brandRows, categoryRow] = await Promise.all([
      this.db.brand.findMany({ where: { name: { in: brands } } }),
      this.db.category.findFirst({ where: { name: category } }),
    ])
    if (!categoryRow) throw new Error(`Categoría "${category}" no encontrada`)
    return { brandIds: brandRows.map(b => b.id), categoryId: categoryRow.id }
  }

  async create(data: CreateProductDTO): Promise<Product> {
    const { brandIds, categoryId } = await this.resolveRelations(data.brands ?? [], data.category)

    const [created] = await this.db.$transaction([
      this.db.product.create({
        data: {
          name: data.name,
          description: data.description ?? "",
          fullDescription: data.fullDescription ?? "",
          image: data.image ?? "",
          imageAlt: data.imageAlt,
          imageTitle: data.imageTitle,
          gallery: data.gallery ?? [],
          galleryAlts: data.galleryAlts ?? [],
          modelo: data.modelo,
          keywords: data.keywords ?? [],
          medidas: data.medidas ?? [],
          fichaTecnica: data.fichaTecnica,
          featured: data.featured ?? false,
          bestSeller: data.bestSeller ?? false,
          rating: data.rating ?? 4.5,
          technicalSpecs: (data.technicalSpecs ?? []) as object[],
          brands: { connect: brandIds.map(id => ({ id })) },
          category: { connect: { id: categoryId } },
          ...(data.subcategoryId != null && { subcategory: { connect: { id: data.subcategoryId } } }),
        },
        include: { category: true, brands: true, subcategory: true },
      }),
      this.db.category.update({
        where: { id: categoryId },
        data: { count: { increment: 1 } },
      }),
    ])
    return this.mapProduct(created)
  }

  async update(id: number, data: UpdateProductDTO): Promise<Product> {
    const { brands: _b, category: _c, technicalSpecs, ...rest } = data

    // Resolver relaciones solo si se cambia marca o categoría
    let connect: any = {}
    if (data.brands || data.category) {
      const row = await this.db.product.findUnique({
        where: { id }, include: { brands: true, category: true },
      })
      if (!row) throw new Error(`Producto con id ${id} no encontrado`)
      const ids = await this.resolveRelations(
        data.brands ?? row.brands.map((b: any) => b.name),
        data.category ?? row.category.name,
      )
      connect = {
        ...(data.brands && { brands: { set: ids.brandIds.map(id => ({ id })) } }),
        ...(data.category && { category: { connect: { id: ids.categoryId } } }),
      }
    }

    // Manejar cambio de subcategoría (null desvincula, undefined no toca)
    const subcategoryConnect =
      data.subcategoryId === null
        ? { subcategory: { disconnect: true } }
        : data.subcategoryId !== undefined
          ? { subcategory: { connect: { id: data.subcategoryId } } }
          : {}

    const updated = await this.db.product.update({
      where: { id },
      data: {
        ...rest,
        ...connect,
        ...subcategoryConnect,
        ...(technicalSpecs !== undefined && { technicalSpecs: technicalSpecs as object[] }),
      },
      include: { category: true, brands: true, subcategory: true },
    })
    return this.mapProduct(updated)
  }

  async delete(id: number): Promise<void> {
    const product = await this.db.product.findUnique({ where: { id }, select: { categoryId: true } })
    if (!product) throw new Error(`Producto con id ${id} no encontrado`)

    await this.db.$transaction([
      this.db.product.delete({ where: { id } }),
      this.db.category.update({
        where: { id: product.categoryId },
        data: { count: { decrement: 1 } },
      }),
    ])
  }
}

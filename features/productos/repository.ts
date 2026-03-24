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
  constructor(private db: PrismaClient) {}

  /** Mapea el modelo de DB (con relaciones incluidas) al DTO de la app */
  private mapProduct(p: any): Product {
    return {
      id:             p.id,
      sku:            p.sku,
      name:           p.name,
      description:    p.description,
      fullDescription:p.fullDescription,
      image:          p.image,
      imageAlt:       p.imageAlt ?? undefined,
      gallery:        p.gallery,
      galleryAlts:    p.galleryAlts?.length ? p.galleryAlts : undefined,
      specs:          p.specs,
      fichaTecnica:   p.fichaTecnica ?? undefined,
      featured:       p.featured,
      bestSeller:     p.bestSeller,
      rating:         p.rating,
      category:       p.category?.name ?? "",
      brand:          p.brand?.name ?? "",
      technicalSpecs: (p.technicalSpecs as any) ?? [],
    }
  }

  /**
   * Catálogo paginado con filtros completos.
   * COUNT + findMany en paralelo → una sola round-trip a la DB.
   * Las queries ILIKE sobre name/sku/description usan índices GIN de trigramas.
   */
  async findAll(filters: ProductFilters): Promise<PaginatedResult<Product>> {
    const {
      categories     = [],
      brands         = [],
      query          = "",
      onlyBestSellers = false,
      page           = 1,
      limit          = 12,
      sortBy         = "recommended",
    } = filters

    const where: any = {}

    if (categories.length > 0) where.category   = { name: { in: categories } }
    if (brands.length > 0)     where.brand       = { name: { in: brands } }
    if (onlyBestSellers)       where.bestSeller  = true

    if (query) {
      where.OR = [
        { name:        { contains: query, mode: "insensitive" } },
        { sku:         { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { brand:       { name: { contains: query, mode: "insensitive" } } },
      ]
    }

    const orderBy: any =
      sortBy === "az"     ? { name: "asc" }    :
      sortBy === "za"     ? { name: "desc" }   :
      sortBy === "rating" ? { rating: "desc" } :
      { id: "desc" }  // recommended: más recientes primero

    const [total, rows] = await Promise.all([
      this.db.product.count({ where }),
      this.db.product.findMany({
        where,
        skip:    (page - 1) * limit,
        take:    limit,
        orderBy,
        include: { category: true, brand: true },
      }),
    ])

    return {
      data:       rows.map((p) => this.mapProduct(p)),
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    }
  }

  async findById(id: number): Promise<Product | null> {
    const p = await this.db.product.findUnique({
      where:   { id },
      include: { category: true, brand: true },
    })
    return p ? this.mapProduct(p) : null
  }

  /** Limitado a 8 — suficiente para el carrusel del home */
  async findBestSellers(): Promise<Product[]> {
    const rows = await this.db.product.findMany({
      where:   { bestSeller: true },
      include: { category: true, brand: true },
      orderBy: { rating: "desc" },
      take:    8,
    })
    return rows.map((p) => this.mapProduct(p))
  }

  /** Limitado a 6 — sección FeaturedOffers del home */
  async findFeatured(): Promise<Product[]> {
    const rows = await this.db.product.findMany({
      where:   { featured: true },
      include: { category: true, brand: true },
      orderBy: { rating: "desc" },
      take:    6,
    })
    return rows.map((p) => this.mapProduct(p))
  }

  /** 4 relacionados de la misma categoría, excluyendo el producto actual */
  async findRelated(productId: number, categoryName: string): Promise<Product[]> {
    const rows = await this.db.product.findMany({
      where:   { category: { name: categoryName }, id: { not: productId } },
      include: { category: true, brand: true },
      orderBy: { rating: "desc" },
      take:    4,
    })
    return rows.map((p) => this.mapProduct(p))
  }

  // ─── CRUD ────────────────────────────────────────────────────────────────────

  /**
   * Resuelve nombres de marca y categoría a sus IDs antes de persistir.
   * El DTO usa nombres (brand: string, category: string);
   * la DB necesita brandId/categoryId.
   */
  private async resolveRelations(brand: string, category: string) {
    const [brandRow, categoryRow] = await Promise.all([
      this.db.brand.findFirst({ where: { name: brand } }),
      this.db.category.findFirst({ where: { name: category } }),
    ])
    if (!brandRow)    throw new Error(`Marca "${brand}" no encontrada`)
    if (!categoryRow) throw new Error(`Categoría "${category}" no encontrada`)
    return { brandId: brandRow.id, categoryId: categoryRow.id }
  }

  async create(data: CreateProductDTO): Promise<Product> {
    const { brandId, categoryId } = await this.resolveRelations(data.brand, data.category)
    const { brand: _b, category: _c, technicalSpecs, ...rest } = data

    const created = await this.db.product.create({
      data: { ...rest, brandId, categoryId, technicalSpecs: (technicalSpecs ?? []) as object[] },
      include: { category: true, brand: true },
    })
    return this.mapProduct(created)
  }

  async update(id: number, data: UpdateProductDTO): Promise<Product> {
    const { brand: _b, category: _c, technicalSpecs, ...rest } = data

    // Resolver relaciones solo si se cambia marca o categoría
    let connect: { brand?: { connect: { id: number } }; category?: { connect: { id: number } } } = {}
    if (data.brand || data.category) {
      const row  = await this.db.product.findUnique({
        where: { id }, include: { brand: true, category: true },
      })
      const ids  = await this.resolveRelations(
        data.brand    ?? row?.brand?.name    ?? "",
        data.category ?? row?.category?.name ?? "",
      )
      connect = {
        brand:    { connect: { id: ids.brandId } },
        category: { connect: { id: ids.categoryId } },
      }
    }

    const updated = await this.db.product.update({
      where: { id },
      data: {
        ...rest,
        ...connect,
        ...(technicalSpecs !== undefined && { technicalSpecs: technicalSpecs as object[] }),
      },
      include: { category: true, brand: true },
    })
    return this.mapProduct(updated)
  }

  async delete(id: number): Promise<void> {
    await this.db.product.delete({ where: { id } })
  }
}

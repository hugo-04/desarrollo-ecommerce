/**
 * CATEGORY REPOSITORY
 *
 * ICategoryRepository: contrato que el servicio usa.
 * DbCategoryRepository: implementación con Prisma/PostgreSQL.
 */

import type { CategoryDTO, CreateCategoryDTO, UpdateCategoryDTO, CategoryFilters, CategoryPaginatedResult } from "./types"
import { PrismaClient, Prisma } from "@prisma/client"

// ─── Tipos internos ────────────────────────────────────────────────────────────

type SubRow = { id: number; name: string }

type CategoryRow = {
  id:          number
  name:        string
  slug:        string
  image:       string
  imageAlt:    string | null
  imageTitle:  string | null
  description: string
  subs:        SubRow[]
  keywords:    string[]
  count:       number
  featured:    boolean
  createdAt:   Date
  updatedAt:   Date
}

const INCLUDE_SUBS = { subs: true } as const
const INCLUDE_SUBS_WITH_PRODUCTS = { subs: { where: { products: { some: {} } } } } as const

// ─── Interface ─────────────────────────────────────────────────────────────────

export interface ICategoryRepository {
  findAll(): Promise<CategoryDTO[]>
  findFeatured(): Promise<CategoryDTO[]>
  findPaged(filters: CategoryFilters): Promise<CategoryPaginatedResult>
  findById(id: number): Promise<CategoryDTO | null>
  findBySlug(slug: string): Promise<CategoryDTO | null>
  create(data: CreateCategoryDTO): Promise<CategoryDTO>
  update(id: number, data: UpdateCategoryDTO): Promise<CategoryDTO>
  delete(id: number): Promise<void>
}

// ─── Prisma DB implementation ──────────────────────────────────────────────────

export class DbCategoryRepository implements ICategoryRepository {
  constructor(private db: PrismaClient) {}

  private map(c: CategoryRow): CategoryDTO {
    return {
      id:              c.id,
      name:            c.name,
      slug:            c.slug,
      image:           c.image,
      imageAlt:        c.imageAlt    ?? undefined,
      imageTitle:      c.imageTitle  ?? undefined,
      description:     c.description ?? undefined,
      subcategories:   c.subs.map((s) => s.name),
      subcategoryItems: c.subs.map((s) => ({ id: s.id, name: s.name })),
      keywords:        c.keywords,
      count:           c.count,
      featured:        c.featured,
      createdAt:       c.createdAt.toISOString(),
      updatedAt:       c.updatedAt.toISOString(),
    }
  }

  async findAll(): Promise<CategoryDTO[]> {
    const rows = await this.db.category.findMany({ orderBy: { count: "desc" }, include: INCLUDE_SUBS })
    return rows.map((c) => this.map(c as CategoryRow))
  }

  async findFeatured(): Promise<CategoryDTO[]> {
    const rows = await this.db.category.findMany({ where: { featured: true }, orderBy: { count: "desc" }, include: INCLUDE_SUBS })
    return rows.map((c) => this.map(c as CategoryRow))
  }

  async findPaged(filters: CategoryFilters): Promise<CategoryPaginatedResult> {
    const { query = "", page = 1, limit = 12, withProductsOnly = false } = filters

    const where: Prisma.CategoryWhereInput = {
      ...(withProductsOnly ? { count: { gt: 0 } } : {}),
      ...(query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" as const } },
              { slug: { contains: query, mode: "insensitive" as const } },
            ],
          }
        : {}),
    }

    const include = withProductsOnly ? INCLUDE_SUBS_WITH_PRODUCTS : INCLUDE_SUBS

    const [total, rows] = await Promise.all([
      this.db.category.count({ where }),
      this.db.category.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: withProductsOnly ? { count: "desc" } : { name: "asc" },
        include,
      }),
    ])

    const totalPages = Math.max(1, Math.ceil(total / limit))
    return { data: rows.map((c) => this.map(c as CategoryRow)), total, page, totalPages }
  }

  async findById(id: number): Promise<CategoryDTO | null> {
    const c = await this.db.category.findUnique({ where: { id }, include: INCLUDE_SUBS })
    return c ? this.map(c as CategoryRow) : null
  }

  async findBySlug(slug: string): Promise<CategoryDTO | null> {
    const c = await this.db.category.findUnique({ where: { slug }, include: INCLUDE_SUBS })
    return c ? this.map(c as CategoryRow) : null
  }

  async create(data: CreateCategoryDTO): Promise<CategoryDTO> {
    const { subcategoryIds, ...rest } = data
    try {
      const c = await this.db.category.create({
        data: {
          ...rest,
          keywords: rest.keywords ?? [],
          ...(subcategoryIds && subcategoryIds.length > 0 && {
            subs: { connect: subcategoryIds.map((id) => ({ id })) },
          }),
        },
        include: INCLUDE_SUBS,
      })
      return this.map(c as CategoryRow)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
        throw new Error("Ya existe una categoría con ese nombre o slug")
      throw e
    }
  }

  async update(id: number, data: UpdateCategoryDTO): Promise<CategoryDTO> {
    const { subcategoryIds, ...rest } = data
    try {
      const c = await this.db.category.update({
        where: { id },
        data: {
          ...rest,
          ...(subcategoryIds !== undefined && {
            subs: { set: subcategoryIds.map((sid) => ({ id: sid })) },
          }),
        },
        include: INCLUDE_SUBS,
      })
      return this.map(c as CategoryRow)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
        throw new Error("Ya existe una categoría con ese nombre o slug")
      throw e
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.db.category.delete({ where: { id } })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2003")
        throw new Error("No se puede eliminar: la categoría tiene productos asociados")
      throw e
    }
  }
}

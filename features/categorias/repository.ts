/**
 * CATEGORY REPOSITORY
 *
 * ICategoryRepository: contrato que el servicio usa.
 * DbCategoryRepository: implementación con Prisma/PostgreSQL.
 *
 * Las queries de texto usan ILIKE aceleradas por índice GIN de trigramas.
 * findAll() ordena por count desc → home page muestra las más populares primero.
 */

import type { CategoryDTO, CreateCategoryDTO, UpdateCategoryDTO, CategoryFilters, CategoryPaginatedResult } from "./types"
import { PrismaClient } from "@prisma/client"

// ─── Interface ─────────────────────────────────────────────────────────────────

export interface ICategoryRepository {
  findAll(): Promise<CategoryDTO[]>
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

  /**
   * Ordena por count desc: las categorías con más productos aparecen
   * primero → el slice(0,6) del home grid muestra las más relevantes.
   */
  async findAll(): Promise<CategoryDTO[]> {
    return this.db.category.findMany({ orderBy: { count: "desc" } })
  }

  /**
   * COUNT + findMany en paralelo.
   * La búsqueda ILIKE sobre name y slug usa los índices GIN de trigramas.
   */
  async findPaged(filters: CategoryFilters): Promise<CategoryPaginatedResult> {
    const { query = "", page = 1, limit = 12 } = filters

    const where = query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" as const } },
            { slug: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {}

    const [total, data] = await Promise.all([
      this.db.category.count({ where }),
      this.db.category.findMany({
        where,
        skip:    (page - 1) * limit,
        take:    limit,
        orderBy: { name: "asc" },
      }),
    ])

    const totalPages = Math.max(1, Math.ceil(total / limit))
    return { data, total, page, totalPages }
  }

  async findById(id: number): Promise<CategoryDTO | null> {
    return this.db.category.findUnique({ where: { id } })
  }

  async findBySlug(slug: string): Promise<CategoryDTO | null> {
    return this.db.category.findUnique({ where: { slug } })
  }

  async create(data: CreateCategoryDTO): Promise<CategoryDTO> {
    return this.db.category.create({ data })
  }

  async update(id: number, data: UpdateCategoryDTO): Promise<CategoryDTO> {
    return this.db.category.update({ where: { id }, data })
  }

  async delete(id: number): Promise<void> {
    await this.db.category.delete({ where: { id } })
  }
}

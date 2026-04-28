/**
 * BRAND REPOSITORY
 *
 * IBrandRepository: contrato que el servicio usa.
 * DbBrandRepository: implementación con Prisma/PostgreSQL.
 *
 * Las queries de texto usan ILIKE (Prisma mode: "insensitive"),
 * aceleradas por el índice GIN de trigramas (pg_trgm) sobre brands.name.
 */

import type { Brand } from "@/lib/types"
import type { CreateBrandDTO, UpdateBrandDTO, BrandFilters, BrandPaginatedResult } from "./types"
import { PrismaClient, Prisma } from "@prisma/client"

// ─── Interface ─────────────────────────────────────────────────────────────────

export interface IBrandRepository {
  findAll(): Promise<Brand[]>
  findPaged(filters: BrandFilters): Promise<BrandPaginatedResult>
  findById(id: number): Promise<Brand | null>
  findNames(): Promise<string[]>
  /** Devuelve solo marcas con showInCarousel=true — para el marquee del home */
  findCarousel(): Promise<Brand[]>
  create(data: CreateBrandDTO): Promise<Brand>
  update(id: number, data: UpdateBrandDTO): Promise<Brand>
  delete(id: number): Promise<void>
}

// ─── Prisma DB implementation ──────────────────────────────────────────────────

export class DbBrandRepository implements IBrandRepository {
  constructor(private db: PrismaClient) {}

  /**
   * Prisma devuelve logoAlt: string | null; Brand espera string | undefined.
   * Este mapper normaliza la diferencia.
   */
  private map(b: { id: number; name: string; logo: string; logoAlt: string | null; showInCarousel: boolean }): Brand {
    return { id: b.id, name: b.name, logo: b.logo, logoAlt: b.logoAlt ?? undefined, showInCarousel: b.showInCarousel }
  }

  async findAll(): Promise<Brand[]> {
    const rows = await this.db.brand.findMany({ orderBy: { name: "asc" } })
    return rows.map((b) => this.map(b))
  }

  async findById(id: number): Promise<Brand | null> {
    const b = await this.db.brand.findUnique({ where: { id } })
    return b ? this.map(b) : null
  }

  /** select solo name para minimizar transferencia de datos */
  async findNames(): Promise<string[]> {
    const rows = await this.db.brand.findMany({ select: { name: true }, orderBy: { name: "asc" } })
    return rows.map((b) => b.name)
  }

  /** Filtrado server-side con índice parcial WHERE showInCarousel=true */
  async findCarousel(): Promise<Brand[]> {
    const rows = await this.db.brand.findMany({ where: { showInCarousel: true }, orderBy: { name: "asc" } })
    return rows.map((b) => this.map(b))
  }

  /**
   * COUNT + findMany en paralelo para una sola ida a la DB.
   * La búsqueda ILIKE sobre name usa el índice GIN de trigrama.
   */
  async findPaged(filters: BrandFilters): Promise<BrandPaginatedResult> {
    const { query = "", page = 1, limit = 12 } = filters

    const where = query ? { name: { contains: query, mode: "insensitive" as const } } : {}

    const [total, rows] = await Promise.all([
      this.db.brand.count({ where }),
      this.db.brand.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { name: "asc" } }),
    ])

    const totalPages = Math.max(1, Math.ceil(total / limit))
    return { data: rows.map((b) => this.map(b)), total, page, totalPages }
  }

  async create(data: CreateBrandDTO): Promise<Brand> {
    const b = await this.db.brand.create({ data })
    return this.map(b)
  }

  async update(id: number, data: UpdateBrandDTO): Promise<Brand> {
    const b = await this.db.brand.update({ where: { id }, data })
    return this.map(b)
  }

  async delete(id: number): Promise<void> {
    try {
      await this.db.brand.delete({ where: { id } })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2003") {
        throw new Error("No se puede eliminar: la marca tiene productos asociados")
      }
      throw e
    }
  }
}

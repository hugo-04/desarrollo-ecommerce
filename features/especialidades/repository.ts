import type { EspecialidadDTO, CreateEspecialidadDTO, UpdateEspecialidadDTO, EspecialidadFilters, EspecialidadPaginatedResult } from "./types"
import { PrismaClient, Prisma } from "@prisma/client"

export interface IEspecialidadRepository {
  findAll():                                              Promise<EspecialidadDTO[]>
  findActive():                                           Promise<EspecialidadDTO[]>
  findPaged(filters: EspecialidadFilters):                Promise<EspecialidadPaginatedResult>
  findById(id: number):                                   Promise<EspecialidadDTO | null>
  create(data: CreateEspecialidadDTO):                    Promise<EspecialidadDTO>
  update(id: number, data: UpdateEspecialidadDTO):        Promise<EspecialidadDTO>
  delete(id: number):                                     Promise<void>
}

export class DbEspecialidadRepository implements IEspecialidadRepository {
  constructor(private db: PrismaClient) {}

  private map(e: any): EspecialidadDTO {
    return {
      id:          e.id,
      title:       e.title,
      subtitle:    e.subtitle,
      description: e.description,
      image:       e.image,
      imageAlt:    e.imageAlt ?? undefined,
      gradient:    e.gradient,
      order:       e.order,
      active:      e.active,
      createdAt:   e.createdAt.toISOString(),
      updatedAt:   e.updatedAt.toISOString(),
    }
  }

  async findAll(): Promise<EspecialidadDTO[]> {
    const rows = await this.db.especialidad.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] })
    return rows.map((e) => this.map(e))
  }

  async findActive(): Promise<EspecialidadDTO[]> {
    const rows = await this.db.especialidad.findMany({
      where:   { active: true },
      orderBy: [{ order: "asc" }, { id: "asc" }],
    })
    return rows.map((e) => this.map(e))
  }

  async findPaged(filters: EspecialidadFilters): Promise<EspecialidadPaginatedResult> {
    const { query = "", page = 1, limit = 15 } = filters
    const where: Prisma.EspecialidadWhereInput = query
      ? { OR: [
          { title:    { contains: query, mode: "insensitive" } },
          { subtitle: { contains: query, mode: "insensitive" } },
        ] }
      : {}
    const [total, rows] = await Promise.all([
      this.db.especialidad.count({ where }),
      this.db.especialidad.findMany({
        where,
        skip:    (page - 1) * limit,
        take:    limit,
        orderBy: [{ order: "asc" }, { id: "asc" }],
      }),
    ])
    return { data: rows.map((e) => this.map(e)), total, page, totalPages: Math.max(1, Math.ceil(total / limit)) }
  }

  async findById(id: number): Promise<EspecialidadDTO | null> {
    const e = await this.db.especialidad.findUnique({ where: { id } })
    return e ? this.map(e) : null
  }

  async create(data: CreateEspecialidadDTO): Promise<EspecialidadDTO> {
    const e = await this.db.especialidad.create({ data })
    return this.map(e)
  }

  async update(id: number, data: UpdateEspecialidadDTO): Promise<EspecialidadDTO> {
    const e = await this.db.especialidad.update({ where: { id }, data })
    return this.map(e)
  }

  async delete(id: number): Promise<void> {
    await this.db.especialidad.delete({ where: { id } })
  }
}

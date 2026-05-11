import type { EntidadBancariaDTO, CreateEntidadBancariaDTO, UpdateEntidadBancariaDTO, EntidadBancariaFilters, EntidadBancariaPaginatedResult } from "./types"
import { PrismaClient, Prisma } from "@prisma/client"

export interface IEntidadBancariaRepository {
  findAll():                                                Promise<EntidadBancariaDTO[]>
  findActive():                                             Promise<EntidadBancariaDTO[]>
  findPaged(filters: EntidadBancariaFilters):               Promise<EntidadBancariaPaginatedResult>
  findById(id: number):                                     Promise<EntidadBancariaDTO | null>
  create(data: CreateEntidadBancariaDTO):                   Promise<EntidadBancariaDTO>
  update(id: number, data: UpdateEntidadBancariaDTO):       Promise<EntidadBancariaDTO>
  delete(id: number):                                       Promise<void>
}

export class DbEntidadBancariaRepository implements IEntidadBancariaRepository {
  constructor(private db: PrismaClient) {}

  private map(e: any): EntidadBancariaDTO {
    return {
      id:         e.id,
      name:       e.name,
      logo:       e.logo,
      logoAlt:    e.logoAlt    ?? undefined,
      nroCuenta:  e.nroCuenta  ?? undefined,
      nroCci:       e.nroCci     ?? undefined,
      tipoCuenta:   e.tipoCuenta ?? undefined,
      nombreCuenta: e.nombreCuenta ?? undefined,
      order:        e.order,
      active:     e.active,
      createdAt:  e.createdAt.toISOString(),
      updatedAt:  e.updatedAt.toISOString(),
    }
  }

  async findAll(): Promise<EntidadBancariaDTO[]> {
    const rows = await this.db.entidadBancaria.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] })
    return rows.map((e) => this.map(e))
  }

  async findActive(): Promise<EntidadBancariaDTO[]> {
    const rows = await this.db.entidadBancaria.findMany({
      where:   { active: true },
      orderBy: [{ order: "asc" }, { id: "asc" }],
    })
    return rows.map((e) => this.map(e))
  }

  async findPaged(filters: EntidadBancariaFilters): Promise<EntidadBancariaPaginatedResult> {
    const { query = "", page = 1, limit = 15 } = filters
    const where: Prisma.EntidadBancariaWhereInput = query
      ? { name: { contains: query, mode: "insensitive" } }
      : {}
    const [total, rows] = await Promise.all([
      this.db.entidadBancaria.count({ where }),
      this.db.entidadBancaria.findMany({
        where,
        skip:    (page - 1) * limit,
        take:    limit,
        orderBy: [{ order: "asc" }, { id: "asc" }],
      }),
    ])
    return { data: rows.map((e) => this.map(e)), total, page, totalPages: Math.max(1, Math.ceil(total / limit)) }
  }

  async findById(id: number): Promise<EntidadBancariaDTO | null> {
    const e = await this.db.entidadBancaria.findUnique({ where: { id } })
    return e ? this.map(e) : null
  }

  async create(data: CreateEntidadBancariaDTO): Promise<EntidadBancariaDTO> {
    try {
      const e = await this.db.entidadBancaria.create({ data })
      return this.map(e)
    } catch (err: any) {
      if (err?.code === "P2002") throw new Error("Ya existe una entidad bancaria con ese nombre")
      throw err
    }
  }

  async update(id: number, data: UpdateEntidadBancariaDTO): Promise<EntidadBancariaDTO> {
    try {
      const e = await this.db.entidadBancaria.update({ where: { id }, data })
      return this.map(e)
    } catch (err: any) {
      if (err?.code === "P2002") throw new Error("Ya existe una entidad bancaria con ese nombre")
      throw err
    }
  }

  async delete(id: number): Promise<void> {
    await this.db.entidadBancaria.delete({ where: { id } })
  }
}

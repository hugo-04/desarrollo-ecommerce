import type {
  SubcategoryDTO,
  CreateSubcategoryDTO,
  UpdateSubcategoryDTO,
  SubcategoryFilters,
  SubcategoryPaginatedResult,
} from "./types"
import { PrismaClient, Prisma } from "@prisma/client"

type CatRef = { id: number; name: string }

type SubRow = {
  id:          number
  name:        string
  slug:        string | null
  image:       string
  imageAlt:    string | null
  imageTitle:  string | null
  description: string
  keywords:    string[]
  categories:  CatRef[]
  createdAt:   Date
  updatedAt:   Date
}

const INCLUDE_CATS = { categories: { select: { id: true, name: true } } } as const

export interface ISubcategoryRepository {
  findAll(): Promise<SubcategoryDTO[]>
  findPaged(filters: SubcategoryFilters): Promise<SubcategoryPaginatedResult>
  findById(id: number): Promise<SubcategoryDTO | null>
  create(data: CreateSubcategoryDTO): Promise<SubcategoryDTO>
  update(id: number, data: UpdateSubcategoryDTO): Promise<SubcategoryDTO>
  delete(id: number): Promise<void>
}

export class DbSubcategoryRepository implements ISubcategoryRepository {
  constructor(private db: PrismaClient) {}

  private map(s: SubRow): SubcategoryDTO {
    return {
      id:          s.id,
      name:        s.name,
      slug:        s.slug,
      image:       s.image,
      imageAlt:    s.imageAlt   ?? undefined,
      imageTitle:  s.imageTitle ?? undefined,
      description: s.description,
      keywords:    s.keywords,
      categories:  s.categories,
      createdAt:   s.createdAt.toISOString(),
      updatedAt:   s.updatedAt.toISOString(),
    }
  }

  async findAll(): Promise<SubcategoryDTO[]> {
    const rows = await this.db.subcategory.findMany({
      orderBy: { name: "asc" },
      include: INCLUDE_CATS,
    })
    return rows.map((s) => this.map(s as SubRow))
  }

  async findPaged(filters: SubcategoryFilters): Promise<SubcategoryPaginatedResult> {
    const { query = "", page = 1, limit = 12 } = filters

    const where: Prisma.SubcategoryWhereInput = query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" as const } },
            { slug: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {}

    const [total, rows] = await Promise.all([
      this.db.subcategory.count({ where }),
      this.db.subcategory.findMany({
        where,
        skip:    (page - 1) * limit,
        take:    limit,
        orderBy: { name: "asc" },
        include: INCLUDE_CATS,
      }),
    ])

    const totalPages = Math.max(1, Math.ceil(total / limit))
    return { data: rows.map((s) => this.map(s as SubRow)), total, page, totalPages }
  }

  async findById(id: number): Promise<SubcategoryDTO | null> {
    const s = await this.db.subcategory.findUnique({ where: { id }, include: INCLUDE_CATS })
    return s ? this.map(s as SubRow) : null
  }

  async create(data: CreateSubcategoryDTO): Promise<SubcategoryDTO> {
    try {
      const s = await this.db.subcategory.create({
        data: { ...data, keywords: data.keywords ?? [] },
        include: INCLUDE_CATS,
      })
      return this.map(s as SubRow)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
        throw new Error("Ya existe una subcategoría con ese nombre o slug")
      throw e
    }
  }

  async update(id: number, data: UpdateSubcategoryDTO): Promise<SubcategoryDTO> {
    try {
      const s = await this.db.subcategory.update({
        where:   { id },
        data,
        include: INCLUDE_CATS,
      })
      return this.map(s as SubRow)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
        throw new Error("Ya existe una subcategoría con ese nombre o slug")
      throw e
    }
  }

  async delete(id: number): Promise<void> {
    await this.db.subcategory.delete({ where: { id } })
  }
}

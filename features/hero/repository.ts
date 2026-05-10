import type { PrismaClient } from "@prisma/client"
import type { HeroSlide, CreateHeroSlideDTO, UpdateHeroSlideDTO } from "./types"

function mapRow(row: any): HeroSlide {
  return {
    id:        row.id,
    label:     row.label,
    image:     row.image     ?? "",
    imageAlt:  row.imageAlt  ?? undefined,
    gradient:  row.gradient  ?? "from-[#003D73] via-[#00316b] to-[#00244f]",
    order:     row.order,
    active:    row.active,
    createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : row.createdAt,
    updatedAt: row.updatedAt instanceof Date ? row.updatedAt.toISOString() : row.updatedAt,
  }
}

export class DbHeroRepository {
  constructor(private readonly db: PrismaClient) {}

  async findAll(): Promise<HeroSlide[]> {
    const rows = await this.db.heroSlide.findMany({ orderBy: { order: "asc" } })
    return rows.map(mapRow)
  }

  async findActive(): Promise<HeroSlide[]> {
    const rows = await this.db.heroSlide.findMany({
      where:   { active: true },
      orderBy: { order: "asc" },
    })
    return rows.map(mapRow)
  }

  async findById(id: number): Promise<HeroSlide | null> {
    const row = await this.db.heroSlide.findUnique({ where: { id } })
    return row ? mapRow(row) : null
  }

  async create(data: CreateHeroSlideDTO): Promise<HeroSlide> {
    const maxOrder = await this.db.heroSlide.aggregate({ _max: { order: true } })
    const nextOrder = (maxOrder._max.order ?? -1) + 1
    const row = await this.db.heroSlide.create({
      data: {
        label:    data.label,
        image:    data.image    ?? "",
        imageAlt: data.imageAlt,
        gradient: data.gradient ?? "from-[#003D73] via-[#00316b] to-[#00244f]",
        order:    data.order    ?? nextOrder,
        active:   data.active   ?? true,
      },
    })
    return mapRow(row)
  }

  async update(id: number, data: UpdateHeroSlideDTO): Promise<HeroSlide> {
    const row = await this.db.heroSlide.update({ where: { id }, data })
    return mapRow(row)
  }

  async reorder(id: number, direction: "up" | "down"): Promise<void> {
    const slide = await this.db.heroSlide.findUnique({ where: { id } })
    if (!slide) return

    const sibling = await this.db.heroSlide.findFirst({
      where: direction === "up"
        ? { order: { lt: slide.order } }
        : { order: { gt: slide.order } },
      orderBy: { order: direction === "up" ? "desc" : "asc" },
    })
    if (!sibling) return

    await this.db.$transaction([
      this.db.heroSlide.update({ where: { id: slide.id },   data: { order: sibling.order } }),
      this.db.heroSlide.update({ where: { id: sibling.id }, data: { order: slide.order  } }),
    ])
  }

  async delete(id: number): Promise<void> {
    await this.db.heroSlide.delete({ where: { id } })
  }
}

import type { PrismaClient } from "@prisma/client"
import type { BlogPost, CreateBlogPostDTO, UpdateBlogPostDTO, BlogPostFilters } from "./types"

function mapRow(row: any): BlogPost {
  return {
    id:          row.id,
    title:       row.title,
    slug:        row.slug,
    excerpt:     row.excerpt      ?? "",
    content:     row.content      ?? "",
    coverImage:  row.coverImage   ?? "",
    coverAlt:    row.coverAlt     ?? undefined,
    image2:      row.image2       ?? undefined,
    image2Alt:   row.image2Alt    ?? undefined,
    image3:      row.image3       ?? undefined,
    image3Alt:   row.image3Alt    ?? undefined,
    tag:         row.tag          ?? undefined,
    tagCategory: row.tagCategory  ?? undefined,
    metaTitle:   row.metaTitle    ?? undefined,
    metaDesc:    row.metaDesc     ?? undefined,
    keywords:    row.keywords     ?? [],
    published:   row.published,
    createdAt:   row.createdAt instanceof Date ? row.createdAt.toISOString() : row.createdAt,
    updatedAt:   row.updatedAt instanceof Date ? row.updatedAt.toISOString() : row.updatedAt,
  }
}

export class DbBlogRepository {
  constructor(private readonly db: PrismaClient) {}

  async findPaged(filters: BlogPostFilters) {
    const { page = 1, query = "", limit = 10, publishedOnly = false } = filters
    const skip  = (page - 1) * limit
    const where: any = {}
    if (query)         where.title     = { contains: query, mode: "insensitive" }
    if (publishedOnly) where.published = true

    const [rows, total] = await Promise.all([
      this.db.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.db.blogPost.count({ where }),
    ])

    return {
      data:       rows.map(mapRow),
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    }
  }

  async findPublished(limit?: number): Promise<BlogPost[]> {
    const rows = await this.db.blogPost.findMany({
      where:   { published: true },
      orderBy: { createdAt: "desc" },
      ...(limit ? { take: limit } : {}),
    })
    return rows.map(mapRow)
  }

  async findBySlug(slug: string): Promise<BlogPost | null> {
    const row = await this.db.blogPost.findUnique({ where: { slug } })
    return row ? mapRow(row) : null
  }

  async findById(id: number): Promise<BlogPost | null> {
    const row = await this.db.blogPost.findUnique({ where: { id } })
    return row ? mapRow(row) : null
  }

  async create(data: CreateBlogPostDTO): Promise<BlogPost> {
    const row = await this.db.blogPost.create({
      data: {
        title:       data.title,
        slug:        data.slug,
        excerpt:     data.excerpt      ?? "",
        content:     data.content      ?? "",
        coverImage:  data.coverImage   ?? "",
        coverAlt:    data.coverAlt,
        image2:      data.image2       ?? "",
        image2Alt:   data.image2Alt,
        image3:      data.image3       ?? "",
        image3Alt:   data.image3Alt,
        tag:         data.tag,
        tagCategory: data.tagCategory,
        metaTitle:   data.metaTitle,
        metaDesc:    data.metaDesc,
        keywords:    data.keywords     ?? [],
        published:   data.published    ?? false,
      },
    })
    return mapRow(row)
  }

  async update(id: number, data: UpdateBlogPostDTO): Promise<BlogPost> {
    const row = await this.db.blogPost.update({ where: { id }, data })
    return mapRow(row)
  }

  async delete(id: number): Promise<void> {
    await this.db.blogPost.delete({ where: { id } })
  }
}

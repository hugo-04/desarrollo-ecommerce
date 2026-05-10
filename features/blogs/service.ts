import type { DbBlogRepository } from "./repository"
import type { BlogPost, CreateBlogPostDTO, UpdateBlogPostDTO, BlogPostFilters } from "./types"

export class BlogService {
  constructor(private readonly repo: DbBlogRepository) {}

  getPaged(filters: BlogPostFilters) {
    return this.repo.findPaged(filters)
  }

  getPublished(limit?: number): Promise<BlogPost[]> {
    return this.repo.findPublished(limit)
  }

  getBySlug(slug: string): Promise<BlogPost | null> {
    return this.repo.findBySlug(slug)
  }

  getById(id: number): Promise<BlogPost | null> {
    return this.repo.findById(id)
  }

  create(data: CreateBlogPostDTO): Promise<BlogPost> {
    return this.repo.create(data)
  }

  update(id: number, data: UpdateBlogPostDTO): Promise<BlogPost> {
    return this.repo.update(id, data)
  }

  async delete(id: number): Promise<void> {
    return this.repo.delete(id)
  }
}

/**
 * CATEGORY SERVICE — Lógica de negocio para categorías.
 */

import type { ICategoryRepository } from "./repository"
import type { CategoryDTO, CreateCategoryDTO, UpdateCategoryDTO } from "./types"

export class CategoryService {
  constructor(private readonly repo: ICategoryRepository) {}

  getAll(): Promise<CategoryDTO[]>                             { return this.repo.findAll() }
  getById(id: number): Promise<CategoryDTO | null>             { return this.repo.findById(id) }
  getBySlug(slug: string): Promise<CategoryDTO | null>         { return this.repo.findBySlug(slug) }
  create(data: CreateCategoryDTO): Promise<CategoryDTO>        { return this.repo.create(data) }
  update(id: number, data: UpdateCategoryDTO): Promise<CategoryDTO> { return this.repo.update(id, data) }
  delete(id: number): Promise<void>                            { return this.repo.delete(id) }
}

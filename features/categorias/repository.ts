/**
 * CATEGORY REPOSITORY
 *
 * ICategoryRepository: contrato que el servicio usa.
 * MockCategoryRepository: implementación con datos mock (actual).
 *
 * Al migrar a DB:
 *   export class DbCategoryRepository implements ICategoryRepository { ... }
 */

import type { CategoryDTO, CreateCategoryDTO, UpdateCategoryDTO } from "./types"
import { MOCK_CATEGORIES } from "@/lib/data/mock/categories.mock"

// ─── Interface ─────────────────────────────────────────────────────────────────

export interface ICategoryRepository {
  findAll(): Promise<CategoryDTO[]>
  findById(id: number): Promise<CategoryDTO | null>
  findBySlug(slug: string): Promise<CategoryDTO | null>
  create(data: CreateCategoryDTO): Promise<CategoryDTO>
  update(id: number, data: UpdateCategoryDTO): Promise<CategoryDTO>
  delete(id: number): Promise<void>
}

// ─── Mock implementation ───────────────────────────────────────────────────────

export class MockCategoryRepository implements ICategoryRepository {
  // Serializar al inicializar: quitar icon (React component)
  private categories: CategoryDTO[] = MOCK_CATEGORIES.map(({ icon: _icon, ...rest }) => rest)

  async findAll(): Promise<CategoryDTO[]> {
    return this.categories
  }

  async findById(id: number): Promise<CategoryDTO | null> {
    return this.categories.find((c) => c.id === id) ?? null
  }

  async findBySlug(slug: string): Promise<CategoryDTO | null> {
    return this.categories.find((c) => c.slug === slug) ?? null
  }

  async create(data: CreateCategoryDTO): Promise<CategoryDTO> {
    const id       = Math.max(...this.categories.map((c) => c.id)) + 1
    const category = { id, ...data }
    this.categories.push(category)
    return category
  }

  async update(id: number, data: UpdateCategoryDTO): Promise<CategoryDTO> {
    const index = this.categories.findIndex((c) => c.id === id)
    if (index === -1) throw new Error(`Categoría ${id} no encontrada`)
    this.categories[index] = { ...this.categories[index], ...data }
    return this.categories[index]
  }

  async delete(id: number): Promise<void> {
    const index = this.categories.findIndex((c) => c.id === id)
    if (index === -1) throw new Error(`Categoría ${id} no encontrada`)
    this.categories.splice(index, 1)
  }
}

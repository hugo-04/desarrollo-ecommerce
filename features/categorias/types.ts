import type { Category } from "@/lib/types"

// DTO: Category desde DB — icon es opcional, se resuelve en cliente con getCategoryIcon(slug)
export type CategoryDTO = Omit<Category, "icon">

// ─── CRUD DTOs ─────────────────────────────────────────────────────────────────

export type CreateCategoryDTO = Omit<CategoryDTO, "id">
export type UpdateCategoryDTO = Partial<CreateCategoryDTO>

// ─── Paginación ────────────────────────────────────────────────────────────────

/** Parámetros de filtrado y paginación para el listado de categorías */
export interface CategoryFilters {
  query?: string
  page?:  number
  limit?: number
}

/** Resultado paginado del repositorio de categorías */
export interface CategoryPaginatedResult {
  data:       CategoryDTO[]
  total:      number
  page:       number
  totalPages: number
}

import type { Brand } from "@/lib/types"

export type { Brand }

// ─── Paginación ────────────────────────────────────────────────────────────────

/** Parámetros de filtrado y paginación para el listado de marcas */
export interface BrandFilters {
  query?: string
  page?:  number
  limit?: number
}

/** Resultado paginado del repositorio de marcas */
export interface BrandPaginatedResult {
  data:       Brand[]
  total:      number
  page:       number
  totalPages: number
}

// ─── CRUD DTOs ─────────────────────────────────────────────────────────────────

export type CreateBrandDTO = Omit<Brand, "id">
export type UpdateBrandDTO = Partial<CreateBrandDTO>

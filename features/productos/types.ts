import type { Product } from "@/lib/types"

export interface ProductFilters {
  categories?: string[]
  brands?: string[]
  query?: string
  onlyBestSellers?: boolean
  page?: number
  limit?: number
  sortBy?: "az" | "za" | "rating" | "recommended"
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
}

// ─── CRUD DTOs ─────────────────────────────────────────────────────────────────

export type CreateProductDTO = Omit<Product, "id">
export type UpdateProductDTO = Partial<CreateProductDTO>

/**
 * DOMAIN TYPES — Productos feature
 * Pure TypeScript, no React, no UI dependencies.
 */

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

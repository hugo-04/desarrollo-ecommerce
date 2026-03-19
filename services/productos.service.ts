/**
 * PRODUCTOS HTTP SERVICE — Client-side API calls
 *
 * Used by client components that fetch data from /api/productos.
 * When the backend is ready, components already use this service —
 * no changes needed in the UI layer.
 */

import { apiClient } from "./api-client"
import type { Product } from "@/lib/types"
import type { ProductFilters, PaginatedResult } from "@/features/productos/types"

function buildQuery(filters: ProductFilters): string {
  const params = new URLSearchParams()
  if (filters.categories?.length) params.set("cat", filters.categories.join(","))
  if (filters.brands?.length) params.set("brand", filters.brands.join(","))
  if (filters.query) params.set("q", filters.query)
  if (filters.onlyBestSellers) params.set("bestSellers", "true")
  if (filters.page) params.set("page", String(filters.page))
  if (filters.limit) params.set("limit", String(filters.limit))
  if (filters.sortBy && filters.sortBy !== "recommended") params.set("sort", filters.sortBy)
  return params.toString() ? `?${params}` : ""
}

export const productosHttpService = {
  getAll: (filters: ProductFilters) =>
    apiClient.get<PaginatedResult<Product>>(`/api/productos${buildQuery(filters)}`),

  getById: (id: number) =>
    apiClient.get<Product>(`/api/productos/${id}`),
}

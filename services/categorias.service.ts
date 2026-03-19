/**
 * CATEGORIAS HTTP SERVICE — Client-side API calls
 */

import { apiClient } from "./api-client"
import type { Category } from "@/lib/types"

// Serialized category (icon stripped for JSON transport)
export type CategoryDTO = Omit<Category, "icon">

export const categoriasHttpService = {
  getAll: () => apiClient.get<CategoryDTO[]>("/api/categorias"),
  getBrands: () => apiClient.get<string[]>("/api/marcas"),
}

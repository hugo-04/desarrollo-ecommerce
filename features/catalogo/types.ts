/**
 * CATALOG FEATURE TYPES
 * State types for the catalog page filters and UI.
 */

export type SortOption = "recommended" | "az" | "za" | "rating"
export type ViewMode = "grid" | "list"

export interface CatalogFilterState {
  selectedCategories: string[]
  selectedBrands: string[]
  onlyBestSellers: boolean
  sortBy: SortOption
  viewMode: ViewMode
  currentPage: number
  searchQuery: string
}

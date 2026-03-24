"use client"

/**
 * CATALOG HOOKS — UI state management for the catalog page
 *
 * Encapsulates all filter/sort/pagination state.
 * The CatalogoView component imports this — it has zero business logic itself.
 */

import { useState, useEffect, useCallback } from "react"
import type { CatalogFilterState, SortOption, ViewMode } from "./types"

interface UseCatalogFiltersOptions {
  initialCategory?: string
  initialQuery?: string
  initialBestSellers?: boolean
}

export function useCatalogFilters({
  initialCategory,
  initialQuery = "",
  initialBestSellers = false,
}: UseCatalogFiltersOptions = {}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  )
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [onlyBestSellers, setOnlyBestSellers] = useState(initialBestSellers)
  const [sortBy, setSortBy] = useState<SortOption>("recommended")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  // Sync from URL params changes
  useEffect(() => {
    setSelectedCategories(initialCategory ? [initialCategory] : [])
  }, [initialCategory])

  useEffect(() => {
    setOnlyBestSellers(initialBestSellers)
  }, [initialBestSellers])

  useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategories, selectedBrands, onlyBestSellers, sortBy, searchQuery])

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }, [])

  const toggleBrand = useCallback((brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }, [])

  const clearCategories = useCallback(() => setSelectedCategories([]), [])
  const clearBrands = useCallback(() => setSelectedBrands([]), [])

  const clearFilters = useCallback(() => {
    setSelectedCategories([])
    setSelectedBrands([])
    setOnlyBestSellers(false)
  }, [])

  const activeFiltersCount =
    selectedCategories.length + selectedBrands.length + (onlyBestSellers ? 1 : 0)

  const filters: CatalogFilterState = {
    selectedCategories,
    selectedBrands,
    onlyBestSellers,
    sortBy,
    viewMode,
    currentPage,
    searchQuery,
  }

  return {
    filters,
    // Setters
    toggleCategory,
    toggleBrand,
    clearCategories,
    clearBrands,
    clearFilters,
    setOnlyBestSellers,
    setSortBy,
    setViewMode,
    setCurrentPage,
    setSearchQuery,
    // Computed
    activeFiltersCount,
  }
}

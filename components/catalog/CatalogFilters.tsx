"use client"

import { FilterCheckbox } from "./FilterCheckbox"
import { FilterSection } from "./FilterSection"
import { IconFire, IconCheck, IconX } from "@/components/icons"
import type { CategoryDTO } from "@/features/categorias/types"

interface CatalogFiltersProps {
  categories: CategoryDTO[]
  availableBrands: string[]
  selectedCategories: string[]
  selectedBrands: string[]
  onlyBestSellers: boolean
  activeFiltersCount: number
  toggleCategory: (cat: string) => void
  toggleBrand: (brand: string) => void
  clearCategories: () => void
  clearBrands: () => void
  clearFilters: () => void
  setOnlyBestSellers: (v: boolean) => void
}

export function CatalogFilters({
  categories,
  availableBrands,
  selectedCategories,
  selectedBrands,
  onlyBestSellers,
  activeFiltersCount,
  toggleCategory,
  toggleBrand,
  clearCategories,
  clearBrands,
  clearFilters,
  setOnlyBestSellers,
}: CatalogFiltersProps) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-800">Filtros</span>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 transition-colors hover:bg-red-100"
          >
            <IconX className="h-2.5 w-2.5" /> Limpiar ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Best Sellers Toggle */}
      <button
        onClick={() => setOnlyBestSellers(!onlyBestSellers)}
        className={`flex w-full items-center gap-2.5 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all ${
          onlyBestSellers
            ? "border-red-200 bg-red-50 text-red-600"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
        }`}
      >
        <IconFire className="h-3.5 w-3.5 shrink-0" />
        <span className="flex-1 text-left">Solo Mas Vendidos</span>
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
            onlyBestSellers ? "border-red-500 bg-red-500" : "border-slate-300"
          }`}
        >
          {onlyBestSellers && <IconCheck className="h-2.5 w-2.5 text-white" />}
        </span>
      </button>

      {/* Categories */}
      <FilterSection
        title="Categorias"
        badge={selectedCategories.length || undefined}
        onClear={clearCategories}
      >
        {categories.map((category) => (
          <FilterCheckbox
            key={category.id}
            checked={selectedCategories.includes(category.name)}
            label={category.name}
            count={category.count}
            onChange={() => toggleCategory(category.name)}
          />
        ))}
      </FilterSection>

      {/* Brands */}
      <FilterSection
        title="Marcas"
        badge={selectedBrands.length || undefined}
        onClear={clearBrands}
      >
        {availableBrands.map((brand) => (
          <FilterCheckbox
            key={brand}
            checked={selectedBrands.includes(brand)}
            label={brand}
            count={0}
            onChange={() => toggleBrand(brand)}
          />
        ))}
      </FilterSection>
    </div>
  )
}

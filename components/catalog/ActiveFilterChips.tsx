"use client"

import { IconX } from "@/components/icons"

interface ActiveFilterChipsProps {
  selectedCategories: string[]
  selectedBrands: string[]
  onlyBestSellers: boolean
  onRemoveCategory: (cat: string) => void
  onRemoveBrand: (brand: string) => void
  onRemoveBestSellers: () => void
}

export function ActiveFilterChips({
  selectedCategories,
  selectedBrands,
  onlyBestSellers,
  onRemoveCategory,
  onRemoveBrand,
  onRemoveBestSellers,
}: ActiveFilterChipsProps) {
  const hasFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || onlyBestSellers
  if (!hasFilters) return null

  return (
    <div className="mb-4 flex flex-wrap gap-1.5">
      {selectedCategories.map((cat) => (
        <span
          key={cat}
          className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-[11px] font-medium text-primary"
        >
          {cat}
          <button
            onClick={() => onRemoveCategory(cat)}
            className="ml-0.5 rounded-full hover:text-primary/70"
          >
            <IconX className="h-3 w-3" />
          </button>
        </span>
      ))}
      {selectedBrands.map((brand) => (
        <span
          key={brand}
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
        >
          {brand}
          <button
            onClick={() => onRemoveBrand(brand)}
            className="ml-0.5 rounded-full hover:text-slate-400"
          >
            <IconX className="h-3 w-3" />
          </button>
        </span>
      ))}
      {onlyBestSellers && (
        <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-600">
          Mas Vendidos
          <button onClick={onRemoveBestSellers} className="ml-0.5 rounded-full hover:text-red-400">
            <IconX className="h-3 w-3" />
          </button>
        </span>
      )}
    </div>
  )
}

"use client"

import { IconGrid, IconList } from "@/components/icons"
import type { SortOption, ViewMode } from "@/features/catalogo/types"

interface CatalogToolbarProps {
  total: number
  showing: number
  viewMode: ViewMode
  sortBy: SortOption
  onViewModeChange: (mode: ViewMode) => void
  onSortChange: (sort: SortOption) => void
}

export function CatalogToolbar({
  total,
  showing,
  viewMode,
  sortBy,
  onViewModeChange,
  onSortChange,
}: CatalogToolbarProps) {
  return (
    <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
      <p className="text-xs text-slate-500">
        Mostrando <span className="font-semibold text-slate-800">{showing}</span> de{" "}
        <span className="font-semibold text-slate-800">{total}</span> productos
      </p>
      <div className="flex items-center gap-2">
        <div className="hidden items-center rounded-lg border border-slate-200 p-0.5 sm:flex">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`rounded-md p-1.5 transition-colors ${
              viewMode === "grid" ? "bg-primary text-white" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <IconGrid className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`rounded-md p-1.5 transition-colors ${
              viewMode === "list" ? "bg-primary text-white" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <IconList className="h-3.5 w-3.5" />
          </button>
        </div>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="recommended">Recomendados</option>
          <option value="az">Nombre A-Z</option>
          <option value="za">Nombre Z-A</option>
          <option value="rating">Mejor Valorados</option>
        </select>
      </div>
    </div>
  )
}

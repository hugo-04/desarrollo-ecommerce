"use client"

import { useState, useEffect, useRef } from "react"
import { FilterCheckbox } from "./FilterCheckbox"
import { FilterSection } from "./FilterSection"
import { IconFire, IconCheck, IconX } from "@/components/icons"
import { Search, Loader2 } from "lucide-react"
import { useInfiniteBrands } from "@/features/marcas/hooks"
import { useInfiniteCategories } from "@/features/categorias/hooks"

interface CatalogFiltersProps {
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
            className="flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600 transition-colors hover:bg-slate-100"
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
            ? "border-slate-200 bg-slate-50 text-slate-600"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
        }`}
      >
        <IconFire className="h-3.5 w-3.5 shrink-0" />
        <span className="flex-1 text-left">Solo Mas Vendidos</span>
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
            onlyBestSellers ? "border-slate-500 bg-slate-500" : "border-slate-300"
          }`}
        >
          {onlyBestSellers && <IconCheck className="h-2.5 w-2.5 text-white" />}
        </span>
      </button>

      {/* 
          Contenedor único con scroll para ambas secciones (Categorías y Marcas).
          Esto evita que aparezcan múltiples barras de scroll internas.
      */}
      <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar space-y-6">
        
        {/* Categories Section */}
        <FilterSection
          title="Categorias"
          badge={selectedCategories.length || undefined}
          onClear={clearCategories}
        >
          <InfiniteFilterList
            type="category"
            selectedItems={selectedCategories}
            onToggle={toggleCategory}
            placeholder="Buscar categoría..."
          />
        </FilterSection>

        {/* Brands Section */}
        <FilterSection
          title="Marcas"
          badge={selectedBrands.length || undefined}
          onClear={clearBrands}
        >
          <InfiniteFilterList
            type="brand"
            selectedItems={selectedBrands}
            onToggle={toggleBrand}
            placeholder="Buscar marca..."
          />
        </FilterSection>

      </div>
    </div>
  )
}

/**
 * Componente genérico para lista con scroll infinito y búsqueda.
 */
function InfiniteFilterList({
  type,
  selectedItems,
  onToggle,
  placeholder
}: {
  type: "category" | "brand"
  selectedItems: string[]
  onToggle: (val: string) => void
  placeholder: string
}) {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Debounce simple para evitar demasiadas peticiones
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(timer)
  }, [search])

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = type === "category" 
    ? useInfiniteCategories(debouncedSearch) 
    : useInfiniteBrands(debouncedSearch)

  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage()
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const allItems = (data?.pages.flatMap((page: any) => page.data) ?? []) as any[]

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
          <Search className="h-3 w-3 text-slate-400" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-2 text-[11px] outline-none transition-all focus:border-primary/30 focus:bg-white focus:ring-2 focus:ring-primary/10"
        />
      </div>

      <div className="space-y-0.5">
        {!mounted || status === "pending" ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
          </div>
        ) : allItems.length === 0 ? (
          <p className="py-2 text-[11px] text-slate-400 text-center italic">No hay resultados</p>
        ) : (
          <>
            {allItems.map((item) => (
              <FilterCheckbox
                key={item.id}
                checked={selectedItems.includes(item.name)}
                label={item.name}
                count={item.productCount ?? (item as any).count}
                onChange={() => onToggle(item.name)}
              />
            ))}
            {/* Trigger para el scroll infinito */}
            <div ref={observerRef} className="h-4 w-full">
               {isFetchingNextPage && (
                 <div className="flex justify-center py-1">
                   <Loader2 className="h-3 w-3 animate-spin text-slate-400" />
                 </div>
               )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

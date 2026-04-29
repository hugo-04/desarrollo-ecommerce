"use client"

/**
 * CATALOGO VIEW — Orquestador de la página de catálogo.
 *
 * Usa hooks que llaman a las API routes internas (/api/productos, /api/categorias, /api/marcas).
 * No importa datos directamente — toda la lógica de filtrado/paginación queda en el servidor.
 */

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { SlidersHorizontal } from "lucide-react"
import { ProductCard } from "@/components/product/ProductCard"
import { CatalogFilters } from "@/components/catalog/CatalogFilters"
import { CategoryBanner } from "@/components/catalog/CategoryBanner"
import { ActiveFilterChips } from "@/components/catalog/ActiveFilterChips"
import { CatalogToolbar } from "@/components/catalog/CatalogToolbar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCatalogFilters } from "@/features/catalogo/hooks"
import { useInfiniteProducts } from "@/features/productos/hooks"
import {
  IconChevronRight, IconSearch,
  IconStar, IconEye,
} from "@/components/icons"
import type { ProductFilters } from "@/features/productos/types"
import type { CategoryDTO } from "@/features/categorias/types"

const ITEMS_PER_PAGE = 20

// ── Card con animación de entrada ────────────────────────────────────────────

function AnimatedCard({ product, index, animate }: {
  product: import("@/lib/types").Product
  index: number
  animate: boolean
}) {
  const [visible, setVisible] = useState(!animate)

  useEffect(() => {
    if (!animate) return
    const t = setTimeout(() => setVisible(true), index * 50)
    return () => clearTimeout(t)
  }, [animate, index])

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: visible ? "opacity 0.35s ease, transform 0.35s ease" : "none",
      }}
    >
      <ProductCard product={product} />
    </div>
  )
}

interface CatalogoViewProps {
  initialCategory?: string
  initialQuery?: string
  initialBestSellers?: boolean
  initialCategories: CategoryDTO[]
  initialBrands: string[]
}

export function CatalogoView({
  initialCategory,
  initialQuery = "",
  initialBestSellers = false,
  initialCategories,
  initialBrands,
}: CatalogoViewProps) {
  const [filterOpen, setFilterOpen] = useState(false)
  const {
    filters,
    toggleCategory,
    toggleBrand,
    clearCategories,
    clearBrands,
    clearFilters,
    setOnlyBestSellers,
    setSortBy,
    setViewMode,
    activeFiltersCount,
  } = useCatalogFilters({ initialCategory, initialQuery, initialBestSellers })

  const { selectedCategories, selectedBrands, onlyBestSellers, sortBy, viewMode, searchQuery } =
    filters

  // Filtros para el hook — el hook gestiona la página internamente
  const productFilters: Omit<ProductFilters, "page"> = {
    categories: selectedCategories,
    brands: selectedBrands,
    onlyBestSellers,
    sortBy,
    limit: ITEMS_PER_PAGE,
    query: searchQuery,
  }

  const { products, total, hasMore, loading, loadingMore, loadMore } = useInfiniteProducts(productFilters)
  const categories      = initialCategories
  const availableBrands = initialBrands

  // Rastrear dónde empieza cada nuevo lote para animarlo
  const [newBatchStart, setNewBatchStart] = useState<number | null>(null)
  const prevProductCount = useRef(0)
  useEffect(() => {
    if (products.length > prevProductCount.current && prevProductCount.current > 0) {
      setNewBatchStart(prevProductCount.current)
    } else if (products.length === 0) {
      setNewBatchStart(null)
    }
    prevProductCount.current = products.length
  }, [products.length])

  // Sentinel para infinite scroll — dispara loadMore al entrar en viewport
  const sentinelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore() },
      { rootMargin: "200px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore])

  const selectedCat = selectedCategories.length === 1
    ? categories.find((c) => c.name === selectedCategories[0]) ?? null
    : null

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumbs */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-1.5 text-xs">
            <Link href="/" className="text-slate-500 hover:text-primary">Inicio</Link>
            <IconChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-medium text-slate-800">Catálogo</span>
            {selectedCategories.length === 1 && (
              <>
                <IconChevronRight className="h-3 w-3 text-slate-400" />
                <span className="font-medium text-primary">{selectedCategories[0]}</span>
              </>
            )}
            {selectedCategories.length > 1 && (
              <>
                <IconChevronRight className="h-3 w-3 text-slate-400" />
                <span className="font-medium text-primary">
                  {selectedCategories.length} categorias
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Desktop Sidebar */}
          <aside className="hidden w-56 shrink-0 lg:sticky lg:top-20 lg:block lg:h-fit">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <CatalogFilters
                categories={categories}
                availableBrands={availableBrands}
                selectedCategories={selectedCategories}
                selectedBrands={selectedBrands}
                onlyBestSellers={onlyBestSellers}
                activeFiltersCount={activeFiltersCount}
                toggleCategory={toggleCategory}
                toggleBrand={toggleBrand}
                clearCategories={clearCategories}
                clearBrands={clearBrands}
                clearFilters={clearFilters}
                setOnlyBestSellers={setOnlyBestSellers}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Category Banner */}
            {selectedCat && (
              <CategoryBanner
                category={selectedCat}
                productCount={total}
              />
            )}

            {/* Active Filter Chips */}
            <ActiveFilterChips
              selectedCategories={selectedCategories}
              selectedBrands={selectedBrands}
              onlyBestSellers={onlyBestSellers}
              onRemoveCategory={toggleCategory}
              onRemoveBrand={toggleBrand}
              onRemoveBestSellers={() => setOnlyBestSellers(false)}
            />

            {/* Toolbar + botón filtros mobile */}
            <div className="flex items-center gap-3">
              {/* Botón filtros — solo mobile */}
              <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                <SheetTrigger asChild>
                  <button className="lg:hidden flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-primary hover:text-primary">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    Filtros
                    {activeFiltersCount > 0 && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] p-0">
                  <SheetHeader className="border-b border-slate-100 px-5 py-4">
                    <SheetTitle className="text-sm font-bold text-slate-800">Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="overflow-y-auto p-5">
                    <CatalogFilters
                      categories={categories}
                      availableBrands={availableBrands}
                      selectedCategories={selectedCategories}
                      selectedBrands={selectedBrands}
                      onlyBestSellers={onlyBestSellers}
                      activeFiltersCount={activeFiltersCount}
                      toggleCategory={toggleCategory}
                      toggleBrand={toggleBrand}
                      clearCategories={clearCategories}
                      clearBrands={clearBrands}
                      clearFilters={clearFilters}
                      setOnlyBestSellers={setOnlyBestSellers}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex-1">
                <CatalogToolbar
                  total={total}
                  showing={products.length}
                  viewMode={viewMode}
                  sortBy={sortBy}
                  onViewModeChange={setViewMode}
                  onSortChange={setSortBy}
                />
              </div>
            </div>

            {/* Skeleton — solo primera carga */}
            {loading && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <div key={i} className="h-72 animate-pulse rounded-xl bg-slate-200" />
                ))}
              </div>
            )}

            {/* Grid de productos */}
            {!loading && viewMode === "grid" && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product, idx) => (
                  <AnimatedCard
                    key={product.id}
                    product={product}
                    index={newBatchStart !== null ? idx - newBatchStart : idx}
                    animate={newBatchStart !== null && idx >= newBatchStart}
                  />
                ))}
              </div>
            )}

            {/* Lista de productos */}
            {!loading && viewMode === "list" && (
              <div className="space-y-3">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/producto/${product.id}`}
                    className="group flex cursor-pointer gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                            {product.brand}
                          </span>
                          <div className="flex items-center gap-0.5">
                            <IconStar className="h-3 w-3 text-amber-500" />
                            <span className="text-[10px] font-medium text-slate-600">
                              {product.rating}
                            </span>
                          </div>
                        </div>
                        <h3 className="mb-1 text-sm font-semibold text-slate-800 transition-colors group-hover:text-primary">
                          {product.name}
                        </h3>
                        <p className="mb-2 line-clamp-1 text-xs text-slate-500">
                          {product.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {product.medidas.map((medida, index) => (
                            <span
                              key={index}
                              className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500"
                            >
                              {medida}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="flex w-fit items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white">
                          <IconEye className="h-3 w-3" />
                          Ver Detalles
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && products.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 text-center px-4">
                <IconSearch className="mb-3 h-12 w-12 text-slate-300" />
                <h3 className="mb-1 text-base font-semibold text-slate-800">
                  No se encontraron productos
                </h3>
                {activeFiltersCount > 0 ? (
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2">
                      La combinación de filtros activos no tiene resultados:
                    </p>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {selectedCategories.map((c) => (
                        <span key={c} className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                          {c}
                        </span>
                      ))}
                      {selectedBrands.map((b) => (
                        <span key={b} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="mb-4 text-xs text-slate-500">
                    Intenta ajustar los filtros o buscar con otros términos
                  </p>
                )}
                <button
                  onClick={clearFilters}
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  Limpiar Filtros
                </button>
              </div>
            )}

            {/* Infinite scroll — sentinel + spinner + fin de lista */}
            {!loading && (
              <>
                <div ref={sentinelRef} className="h-1" />
                {loadingMore && (
                  <div className="flex flex-col items-center justify-center py-8 gap-2">
                    <div className="relative h-8 w-8">
                      <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
                      <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Cargando más productos…</p>
                  </div>
                )}
                {!hasMore && products.length > 0 && (
                  <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    <p className="text-sm text-slate-400 font-medium">
                      {total} productos · fin del catálogo
                    </p>
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

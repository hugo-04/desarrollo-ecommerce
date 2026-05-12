"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { SlidersHorizontal } from "lucide-react"
import { ProductCard } from "@/components/product/ProductCard"
import { CatalogFilters } from "@/components/catalog/CatalogFilters"
import { CategoryBanner } from "@/components/catalog/CategoryBanner"
import { ActiveFilterChips } from "@/components/catalog/ActiveFilterChips"
import { CatalogToolbar } from "@/components/catalog/CatalogToolbar"
import { CatalogPagination } from "@/components/catalog/CatalogPagination"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCatalogFilters } from "@/features/catalogo/hooks"
import { useProducts } from "@/features/productos/hooks"
import { IconChevronRight, IconSearch, IconStar, IconEye } from "@/components/icons"
import type { ProductFilters } from "@/features/productos/types"
import type { CategoryDTO } from "@/features/categorias/types"

const DEFAULT_PAGE_SIZE = 24
const PAGE_SIZE_OPTIONS = [12, 24, 48]

// ── Card con animación de entrada ────────────────────────────────────────────

function AnimatedCard({ product, index }: {
  product: import("@/lib/types").Product
  index: number
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 45)
    return () => clearTimeout(t)
  }, [index])

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
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
}

export function CatalogoView({
  initialCategory,
  initialQuery = "",
  initialBestSellers = false,
  initialCategories,
}: CatalogoViewProps) {
  const [filterOpen, setFilterOpen] = useState(false)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

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
    setCurrentPage,
    activeFiltersCount,
  } = useCatalogFilters({ initialCategory, initialQuery, initialBestSellers })

  const { selectedCategories, selectedBrands, onlyBestSellers, sortBy, viewMode, currentPage, searchQuery } = filters

  const productFilters: ProductFilters = {
    categories: selectedCategories,
    brands: selectedBrands,
    onlyBestSellers,
    sortBy,
    limit: pageSize,
    query: searchQuery,
    page: currentPage,
  }

  const { data, isLoading: loading, isFetching: fetching } = useProducts(productFilters)
  const products = data?.data ?? []
  const total = data?.total ?? 0
  const totalPages = data?.totalPages ?? 0

  const categories      = initialCategories

  const selectedCat = selectedCategories.length === 1
    ? categories.find((c) => c.name === selectedCategories[0]) ?? null
    : null

  const isLoading = loading || fetching

  function handlePageChange(p: number) {
    setCurrentPage(p)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size)
    setCurrentPage(1)
  }

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
                <span className="font-medium text-primary">{selectedCategories.length} categorías</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-6 lg:flex-row">

          {/* Sidebar desktop */}
          <aside className="hidden w-56 shrink-0 lg:sticky lg:top-20 lg:block lg:h-fit">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <CatalogFilters
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

          {/* Contenido principal */}
          <main className="min-w-0 flex-1">
            {selectedCat && <CategoryBanner category={selectedCat} productCount={total} />}

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
              <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                <SheetTrigger asChild>
                  <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-primary hover:text-primary lg:hidden">
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

            {/* Skeleton — primera carga */}
            {loading && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {Array.from({ length: pageSize }).map((_, i) => (
                  <div key={i} className="h-52 animate-pulse rounded-xl bg-slate-200 sm:h-72" />
                ))}
              </div>
            )}

            {/* Overlay de "recargando" al cambiar filtros/página */}
            {fetching && !loading && (
              <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden">
                <div className="h-full w-full animate-pulse bg-primary" />
              </div>
            )}

            {/* Grid de productos */}
            {!loading && viewMode === "grid" && (
              <div className={`grid grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 transition-opacity duration-200 ${fetching ? "opacity-60" : "opacity-100"}`}>
                {products.map((product, idx) => (
                  <AnimatedCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            )}

            {/* Lista de productos */}
            {!loading && viewMode === "list" && (
              <div className={`space-y-3 transition-opacity duration-200 ${fetching ? "opacity-60" : "opacity-100"}`}>
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/producto/${product.id}`}
                    className="group flex cursor-pointer gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                      {product.image && (
                        <Image
                          src={product.image}
                          alt={product.imageAlt ?? product.name}
                          width={112}
                          height={112}
                          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="mb-1 flex flex-wrap items-center gap-1.5">
                          {product.brands.map((b, i) => (
                            <span key={i} className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">{b}</span>
                          ))}
                          <div className="flex items-center gap-0.5">
                            <IconStar className="h-3 w-3 text-amber-500" />
                            <span className="text-[10px] font-medium text-slate-600">{product.rating}</span>
                          </div>
                        </div>
                        <h3 className="mb-1 text-sm font-semibold text-slate-800 transition-colors group-hover:text-primary">{product.name}</h3>
                        <p className="mb-2 line-clamp-1 text-xs text-slate-500">{product.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {product.medidas.map((m, i) => (
                            <span key={i} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">{m}</span>
                          ))}
                        </div>
                      </div>
                      <span className="mt-2 flex w-fit items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white">
                        <IconEye className="h-3 w-3" /> Ver Detalles
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && products.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 text-center px-4">
                <IconSearch className="mb-3 h-12 w-12 text-slate-300" />
                <h3 className="mb-1 text-base font-semibold text-slate-800">No se encontraron productos</h3>
                {activeFiltersCount > 0 ? (
                  <div className="mb-4">
                    <p className="mb-2 text-xs text-slate-500">La combinación de filtros activos no tiene resultados.</p>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {selectedCategories.map((c) => (
                        <span key={c} className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">{c}</span>
                      ))}
                      {selectedBrands.map((b) => (
                        <span key={b} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">{b}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="mb-4 text-xs text-slate-500">Intenta ajustar los filtros o buscar con otros términos.</p>
                )}
                <button onClick={clearFilters} className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary/90">
                  Limpiar Filtros
                </button>
              </div>
            )}

            {/* Paginación */}
            {!loading && total > 0 && (
              <CatalogPagination
                page={currentPage}
                totalPages={totalPages}
                total={total}
                pageSize={pageSize}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

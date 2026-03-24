"use client"

/**
 * CATALOGO VIEW — Orquestador de la página de catálogo.
 *
 * Usa hooks que llaman a las API routes internas (/api/productos, /api/categorias, /api/marcas).
 * No importa datos directamente — toda la lógica de filtrado/paginación queda en el servidor.
 */

import Link from "next/link"
import { ProductCard } from "@/components/product/ProductCard"
import { CatalogFilters } from "@/components/catalog/CatalogFilters"
import { CategoryBanner } from "@/components/catalog/CategoryBanner"
import { ActiveFilterChips } from "@/components/catalog/ActiveFilterChips"
import { CatalogToolbar } from "@/components/catalog/CatalogToolbar"
import { useCatalogFilters } from "@/features/catalogo/hooks"
import { useProducts } from "@/features/productos/hooks"
import { useCategories } from "@/features/categorias/hooks"
import { useBrandNames } from "@/features/marcas/hooks"
import {
  IconChevronRight, IconSearch,
  IconStar, IconEye,
} from "@/components/icons"
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis,
} from "@/components/ui/pagination"
import type { ProductFilters } from "@/features/productos/types"

const ITEMS_PER_PAGE = 6

interface CatalogoViewProps {
  initialCategory?: string
  initialQuery?: string
  initialBestSellers?: boolean
}

export function CatalogoView({
  initialCategory,
  initialQuery = "",
  initialBestSellers = false,
}: CatalogoViewProps) {
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

  const { selectedCategories, selectedBrands, onlyBestSellers, sortBy, viewMode, currentPage, searchQuery } =
    filters

  // Construir filtros para la API
  const productFilters: ProductFilters = {
    categories: selectedCategories,
    brands: selectedBrands,
    onlyBestSellers,
    sortBy,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    query: searchQuery,
  }

  // Datos desde API routes internas
  const { products, total, totalPages, loading } = useProducts(productFilters)
  const { categories } = useCategories()
  const availableBrands = useBrandNames()

  const selectedCat = selectedCategories.length === 1
    ? categories.find((c) => c.name === selectedCategories[0]) ?? null
    : null

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, 5, "ellipsis", totalPages)
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      pages.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages)
    }
    return pages
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumbs */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-1.5 text-xs">
            <Link href="/" className="text-slate-500 hover:text-primary">Inicio</Link>
            <IconChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-medium text-slate-800">Catalogo</span>
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

            {/* Toolbar */}
            <CatalogToolbar
              total={total}
              showing={products.length}
              viewMode={viewMode}
              sortBy={sortBy}
              onViewModeChange={setViewMode}
              onSortChange={setSortBy}
            />

            {/* Loading */}
            {loading && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <div key={i} className="h-72 animate-pulse rounded-xl bg-slate-200" />
                ))}
              </div>
            )}

            {/* Products Grid / List */}
            {!loading && viewMode === "grid" && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {!loading && viewMode === "list" && (
              <div className="space-y-3">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/producto/${product.id}`}
                    className="group flex cursor-pointer gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                            {product.brand}
                          </span>
                          <span className="text-[10px] text-slate-400">SKU: {product.sku}</span>
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
                          {product.specs.map((spec, index) => (
                            <span
                              key={index}
                              className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500"
                            >
                              {spec}
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
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 text-center">
                <IconSearch className="mb-3 h-12 w-12 text-slate-300" />
                <h3 className="mb-1 text-base font-semibold text-slate-800">
                  No se encontraron productos
                </h3>
                <p className="mb-4 text-xs text-slate-500">
                  Intenta ajustar los filtros o buscar con otros terminos
                </p>
                <button
                  onClick={clearFilters}
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  Limpiar Filtros
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <Pagination className="mt-10 mb-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {getPageNumbers().map((page, i) => (
                    <PaginationItem key={i}>
                      {page === "ellipsis" ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage(page as number)
                          }}
                          isActive={currentPage === page}
                          className="cursor-pointer font-medium"
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

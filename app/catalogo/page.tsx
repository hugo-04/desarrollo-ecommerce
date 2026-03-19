"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ProductCard } from "@/components/product/ProductCard"
import { products, categories } from "@/lib/data"
import {
  IconChevronRight, IconFilter, IconX, IconSearch, IconGrid, IconList,
  IconStar, IconEye, IconFire, IconCheck, IconWhatsApp,
} from "@/components/icons"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"

// ========== CHECKBOX ==========
function FilterCheckbox({ checked, label, count, onChange }: {
  checked: boolean; label: string; count: number; onChange: () => void
}) {
  return (
    <button
      onClick={onChange}
      className={`group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
        checked ? "bg-primary/8 text-primary" : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
        checked ? "border-primary bg-primary" : "border-slate-300 group-hover:border-slate-400"
      }`}>
        {checked && <IconCheck className="h-2.5 w-2.5 text-white" />}
      </span>
      <span className={`flex-1 truncate font-medium ${checked ? "text-primary" : ""}`}>{label}</span>
      <span className="shrink-0 text-[10px] text-slate-400">{count}</span>
    </button>
  )
}

// ========== FILTER SECTION (collapsible label + scrollable list) ==========
function FilterSection({ title, children, badge, onClear }: {
  title: string; children: React.ReactNode; badge?: number; onClear?: () => void
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{title}</h4>
        <div className="flex items-center gap-1.5">
          {badge ? (
            <span className="flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white">
              {badge}
            </span>
          ) : null}
          {badge && onClear ? (
            <button
              onClick={onClear}
              className="flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
              title={`Limpiar ${title}`}
            >
              <IconX className="h-2.5 w-2.5" /> limpiar
            </button>
          ) : null}
        </div>
      </div>
      <div className="max-h-[200px] overflow-y-auto overscroll-contain rounded-lg border border-slate-100 bg-slate-50/50 py-1 custom-scrollbar">
        {children}
      </div>
    </div>
  )
}

// ========== FILTER CONTENT ==========
function FilterContent({
  availableBrands,
  selectedCategories,
  toggleCategory,
  clearCategories,
  selectedBrands,
  toggleBrand,
  clearBrands,
  clearFilters,
  activeFiltersCount,
  onlyBestSellers,
  setOnlyBestSellers,
  getCategoryCount,
  getBrandCount,
}: {
  availableBrands: string[]
  selectedCategories: string[]
  toggleCategory: (category: string) => void
  clearCategories: () => void
  selectedBrands: string[]
  toggleBrand: (brand: string) => void
  clearBrands: () => void
  clearFilters: () => void
  activeFiltersCount: number
  onlyBestSellers: boolean
  setOnlyBestSellers: (value: boolean) => void
  getCategoryCount: (name: string) => number
  getBrandCount: (brand: string) => number
}) {
  return (
    <div className="space-y-5">
      {/* Header filtros */}
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
        <span className="flex-1 text-left">Solo Más Vendidos</span>
        <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
          onlyBestSellers ? "border-red-500 bg-red-500" : "border-slate-300"
        }`}>
          {onlyBestSellers && <IconCheck className="h-2.5 w-2.5 text-white" />}
        </span>
      </button>

      {/* Categories */}
      <FilterSection title="Categorías" badge={selectedCategories.length || undefined} onClear={clearCategories}>
        {categories.map((category) => (
          <FilterCheckbox
            key={category.id}
            checked={selectedCategories.includes(category.name)}
            label={category.name}
            count={getCategoryCount(category.name)}
            onChange={() => toggleCategory(category.name)}
          />
        ))}
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Marcas" badge={selectedBrands.length || undefined} onClear={clearBrands}>
        {availableBrands.map((brand) => (
          <FilterCheckbox
            key={brand}
            checked={selectedBrands.includes(brand)}
            label={brand}
            count={getBrandCount(brand)}
            onChange={() => toggleBrand(brand)}
          />
        ))}
      </FilterSection>
    </div>
  )
}

// ========== CATALOG PAGE ==========
function CatalogoContent() {
  const searchParams = useSearchParams()
  const categoriaParam = searchParams.get("categoria")
  const queryParam = searchParams.get("q")
  const bestSellersParam = searchParams.get("bestSellers")

  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoriaParam ? [categoriaParam] : [])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("recommended")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [onlyBestSellers, setOnlyBestSellers] = useState(bestSellersParam === "true")
  const [searchQuery] = useState(queryParam || "")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  const itemsPerPage = 6

  useEffect(() => {
    setSelectedCategories(categoriaParam ? [categoriaParam] : [])
  }, [categoriaParam])

  useEffect(() => {
    setOnlyBestSellers(bestSellersParam === "true")
  }, [bestSellersParam])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const matchesSearch = !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesBestSeller = !onlyBestSellers || product.bestSeller
      return matchesCategory && matchesBrand && matchesSearch && matchesBestSeller
    })
  }, [selectedCategories, selectedBrands, searchQuery, onlyBestSellers])

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === "az") return a.name.localeCompare(b.name)
      if (sortBy === "za") return b.name.localeCompare(a.name)
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })
  }, [filteredProducts, sortBy])

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, "ellipsis", totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages)
      }
    }
    return pages
  }

  useEffect(() => { setCurrentPage(1) }, [selectedCategories, selectedBrands, searchQuery, onlyBestSellers])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand])
  }

  const clearCategories = () => setSelectedCategories([])
  const clearBrands = () => setSelectedBrands([])
  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setOnlyBestSellers(false)
  }

  const availableBrands = [...new Set(products.map((p) => p.brand))]
  const activeFiltersCount = selectedCategories.length + selectedBrands.length + (onlyBestSellers ? 1 : 0)
  const getCategoryCount = (categoryName: string) => products.filter(p => p.category === categoryName).length
  const getBrandCount = (brand: string) => products.filter(p => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category)
    return matchesCategory && p.brand === brand
  }).length

  const filterProps = {
    availableBrands,
    selectedCategories,
    toggleCategory,
    clearCategories,
    selectedBrands,
    toggleBrand,
    clearBrands,
    clearFilters,
    activeFiltersCount,
    onlyBestSellers,
    setOnlyBestSellers,
    getCategoryCount,
    getBrandCount,
  }

  return (
    <>
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
                  <span className="font-medium text-primary">{selectedCategories.length} categorías</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Mobile Filters Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 lg:hidden"
            >
              <IconFilter className="h-4 w-4" />Filtros
              {activeFiltersCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Mobile Filters Drawer */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
                <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-auto rounded-t-2xl bg-white p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">Filtros</h3>
                    <button onClick={() => setMobileFiltersOpen(false)}>
                      <IconX className="h-5 w-5 text-slate-500" />
                    </button>
                  </div>
                  <FilterContent {...filterProps} />
                </div>
              </div>
            )}

            {/* Desktop Sidebar */}
            <aside className="hidden w-56 shrink-0 lg:sticky lg:top-20 lg:block lg:h-fit">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <FilterContent {...filterProps} />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Category contextual banner */}
              {selectedCategories.length === 1 && (() => {
                const cat = categories.find((c) => c.name === selectedCategories[0])
                if (!cat) return null
                return (
                  <div className={`mb-5 overflow-hidden rounded-2xl bg-gradient-to-r ${cat.color} p-5 text-white`}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                          <cat.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">Categoría seleccionada</p>
                          <h3 className="text-lg font-extrabold text-white">{cat.name}</h3>
                          <p className="mt-0.5 text-[11px] text-white/70">
                            {cat.subcategories.slice(0, 3).join(" · ")}{cat.subcategories.length > 3 ? " · ..." : ""}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-2xl font-extrabold text-white">{filteredProducts.length}</p>
                        <p className="text-[10px] text-white/60">productos</p>
                      </div>
                    </div>
                  </div>
                )
              })()}
              {/* Active filter chips */}
              {activeFiltersCount > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {selectedCategories.map((cat) => (
                    <span key={cat} className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-[11px] font-medium text-primary">
                      {cat}
                      <button onClick={() => toggleCategory(cat)} className="ml-0.5 rounded-full hover:text-primary/70">
                        <IconX className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {selectedBrands.map((brand) => (
                    <span key={brand} className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                      {brand}
                      <button onClick={() => toggleBrand(brand)} className="ml-0.5 rounded-full hover:text-slate-400">
                        <IconX className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {onlyBestSellers && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-600">
                      Más Vendidos
                      <button onClick={() => setOnlyBestSellers(false)} className="ml-0.5 rounded-full hover:text-red-400">
                        <IconX className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <p className="text-xs text-slate-500">
                  Mostrando <span className="font-semibold text-slate-800">{paginatedProducts.length}</span> de{" "}
                  <span className="font-semibold text-slate-800">{sortedProducts.length}</span> productos
                </p>
                <div className="flex items-center gap-2">
                  <div className="hidden items-center rounded-lg border border-slate-200 p-0.5 sm:flex">
                    <button onClick={() => setViewMode("grid")} className={`rounded-md p-1.5 transition-colors ${viewMode === "grid" ? "bg-primary text-white" : "text-slate-500 hover:text-slate-700"}`}>
                      <IconGrid className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => setViewMode("list")} className={`rounded-md p-1.5 transition-colors ${viewMode === "list" ? "bg-primary text-white" : "text-slate-500 hover:text-slate-700"}`}>
                      <IconList className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="recommended">Recomendados</option>
                    <option value="az">Nombre A-Z</option>
                    <option value="za">Nombre Z-A</option>
                    <option value="rating">Mejor Valorados</option>
                  </select>
                </div>
              </div>

              {viewMode === "grid" ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {paginatedProducts.map((product) => (
                    <Link key={product.id} href={`/producto/${product.id}`} className="group flex cursor-pointer gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-primary/30 hover:shadow-md">
                      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                        <img src={product.image} alt={product.name} className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105" crossOrigin="anonymous" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">{product.brand}</span>
                            <span className="text-[10px] text-slate-400">SKU: {product.sku}</span>
                            <div className="flex items-center gap-0.5">
                              <IconStar className="h-3 w-3 text-amber-500" />
                              <span className="text-[10px] font-medium text-slate-600">{product.rating}</span>
                            </div>
                          </div>
                          <h3 className="mb-1 text-sm font-semibold text-slate-800 transition-colors group-hover:text-primary">{product.name}</h3>
                          <p className="mb-2 line-clamp-1 text-xs text-slate-500">{product.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {product.specs.map((spec, index) => (
                              <span key={index} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">{spec}</span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="flex w-fit items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white">
                            <IconEye className="h-3 w-3" />Ver Detalles
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {sortedProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 text-center">
                  <IconSearch className="mb-3 h-12 w-12 text-slate-300" />
                  <h3 className="mb-1 text-base font-semibold text-slate-800">No se encontraron productos</h3>
                  <p className="mb-4 text-xs text-slate-500">Intenta ajustar los filtros o buscar con otros terminos</p>
                  <button onClick={clearFilters} className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary/90">
                    Limpiar Filtros
                  </button>
                </div>
              )}

              {totalPages > 1 && (
                <Pagination className="mt-10 mb-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => { e.preventDefault(); setCurrentPage(prev => Math.max(1, prev - 1)) }}
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
                            onClick={(e) => { e.preventDefault(); setCurrentPage(page as number) }}
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
                        onClick={(e) => { e.preventDefault(); setCurrentPage(prev => Math.min(totalPages, prev + 1)) }}
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

      {/* Floating "Cotizar selección" button (appears after 300px scroll) */}
      {scrolled && (
        <a
          href="https://wa.me/51981375196?text=Hola%2C%20quisiera%20cotizar%20varios%20productos%20de%20su%20cat%C3%A1logo%20AT%2FMT"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 right-5 z-40 flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-xs font-bold text-white shadow-2xl shadow-green-600/40 transition-all hover:bg-green-700 hover:scale-105 sm:bottom-8 sm:right-8"
        >
          <IconWhatsApp className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Cotizar productos seleccionados</span>
          <span className="sm:hidden">Cotizar</span>
        </a>
      )}
    </>
  )
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <CatalogoContent />
    </Suspense>
  )
}

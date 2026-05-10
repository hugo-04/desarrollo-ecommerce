"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ProductCard } from "@/components/product/ProductCard"
import { CatalogPagination as Pagination } from "@/components/catalog/CatalogPagination"
import { IconChevronRight } from "@/components/icons"
import { getCatalogAction } from "@/features/productos/actions"
import type { Brand, Product } from "@/lib/types"

const DEFAULT_LIMIT = 20
const PAGE_SIZE_OPTIONS = [12, 20, 50]

interface MarcaViewProps {
  brand: Brand
  initialProducts: Product[]
  initialTotal: number
  initialTotalPages: number
}

export function MarcaView({ brand, initialProducts, initialTotal, initialTotalPages }: MarcaViewProps) {
  const [products, setProducts]     = useState<Product[]>(initialProducts)
  const [total, setTotal]           = useState(initialTotal)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [page, setPage]             = useState(1)
  const [pageSize, setPageSize]     = useState(DEFAULT_LIMIT)
  const [loading, setLoading]       = useState(false)

  const skipNext   = useRef(true)
  const sectionRef = useRef<HTMLElement>(null)

  const hasLogo    = brand.logo && brand.logo.startsWith("http")
  const hasProducts = total > 0

  const fetchPage = useCallback(async (p: number, size: number) => {
    setLoading(true)
    try {
      const result = await getCatalogAction({ brands: [brand.name], page: p, limit: size })
      setProducts(result.data)
      setTotal(result.total)
      setTotalPages(result.totalPages)
    } catch {
      // silencio — no romper UX
    } finally {
      setLoading(false)
    }
  }, [brand.name])

  useEffect(() => {
    if (skipNext.current) { skipNext.current = false; return }
    fetchPage(page, pageSize)
  }, [page, pageSize, fetchPage])

  function handlePageChange(p: number) {
    setPage(p)
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size)
    setPage(1)
  }

  return (
    <>
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-primary">Inicio</Link>
            <IconChevronRight className="h-3 w-3 text-slate-400" />
            <Link href="/marcas" className="hover:text-primary">Marcas</Link>
            <IconChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-800">{brand.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero — logo + nombre + contador (sin descripción) ──────────────── */}
      <section className="bg-linear-to-br from-[#003D73] via-[#002d5f] to-[#001a3d] py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">

            {/* Logo */}
            {hasLogo && (
              <div className="flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                <Image
                  src={brand.logo}
                  alt={brand.logoAlt ?? brand.name}
                  width={160}
                  height={80}
                  className="h-full w-auto object-contain"
                />
              </div>
            )}

            {/* Texto del hero */}
            <div>
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6B35]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B35]" />
                Marca — {total} producto{total !== 1 ? "s" : ""}
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {brand.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ── Productos — solo si hay resultados ─────────────────────────────── */}
      {hasProducts && (
        <section ref={sectionRef} className="bg-slate-50 py-10 scroll-mt-4">
          <div className="mx-auto max-w-7xl px-4">

            {/* Encabezado de sección */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-extrabold text-[#003D73]">
                  Productos {brand.name}
                </h2>
                <p className="mt-0.5 text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">{total}</span>{" "}
                  producto{total !== 1 ? "s" : ""} disponibles
                  {totalPages > 1 && (
                    <span className="ml-1 text-slate-400">
                      · Página {page} de {totalPages}
                    </span>
                  )}
                </p>
              </div>
              <Link
                href={`/catalogo?marca=${encodeURIComponent(brand.name)}`}
                className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#003D73] transition-all hover:border-[#003D73]/30 hover:text-[#003D73] sm:flex"
              >
                Ver en catálogo con filtros →
              </Link>
            </div>

            {/* Grid con spinner flotante al cambiar página */}
            <div className="relative">
              {loading && (
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                  <div className="rounded-2xl bg-white/90 px-6 py-4 shadow-md ring-1 ring-slate-100 backdrop-blur-sm">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-[#003D73]" />
                  </div>
                </div>
              )}

              <div className={`grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4 transition-opacity duration-200 ${loading ? "pointer-events-none opacity-30" : "opacity-100"}`}>
                {products.map((p) => (
                  <div key={p.id}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>

            {/* Paginación — solo si hay más de 1 página o para mostrar selector */}
            <div className={`mt-6 transition-opacity duration-200 ${loading ? "pointer-events-none opacity-50" : "opacity-100"}`}>
              <Pagination
                page={page}
                totalPages={totalPages}
                total={total}
                pageSize={pageSize}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Descripción SEO — solo si existe, debajo de los productos ──────── */}
      {brand.description && (
        <section className={`border-t border-slate-100 bg-white py-14 ${!hasProducts ? "border-t-0" : ""}`}>
          <div className="mx-auto max-w-3xl px-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6B35]">
              Sobre la marca
            </p>
            <h2 className="mb-4 text-2xl font-extrabold text-[#003D73] sm:text-3xl">
              {brand.name} — Insumos Industriales y Mineros
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              {brand.description}
            </p>
            <div className="mt-6">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-xl bg-[#003D73] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#002d5f]"
              >
                Solicitar cotización de {brand.name}
                <IconChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

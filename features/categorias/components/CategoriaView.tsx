"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { ProductCard } from "@/components/product/ProductCard"
import { IconChevronRight } from "@/components/icons"
import { getCatalogAction } from "@/features/productos/actions"
import type { CategoryDTO } from "@/features/categorias/types"
import type { Product } from "@/lib/types"

/**
 * CategoriaView — Vista de categoría con Infinite Scroll.
 *
 * Client Component: recibe el primer lote de productos desde SSR (rápido + SEO),
 * luego acumula más automáticamente usando IntersectionObserver al hacer scroll.
 * Las cards nuevas entran con animación fade-in + slide-up.
 */

const LIMIT = 12

interface CategoriaViewProps {
  category: CategoryDTO
  initialProducts: Product[]
  initialTotal: number
  initialTotalPages: number
}

// ── Card con animación de entrada ─────────────────────────────────────────────

function AnimatedCard({ product, index, animate }: {
  product: Product
  index: number
  animate: boolean
}) {
  const [visible, setVisible] = useState(!animate)

  useEffect(() => {
    if (!animate) return
    const t = setTimeout(() => setVisible(true), index * 60)
    return () => clearTimeout(t)
  }, [animate, index])

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: visible ? "opacity 0.4s ease, transform 0.4s ease" : "none",
      }}
    >
      <ProductCard product={product} />
    </div>
  )
}

// ── Spinner de carga ──────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
        <div className="absolute inset-0 rounded-full border-4 border-t-[#121A47] animate-spin" />
      </div>
      <p className="text-xs font-medium text-slate-400 tracking-wide">Cargando más productos…</p>
    </div>
  )
}

// ── Vista principal ───────────────────────────────────────────────────────────

export function CategoriaView({
  category,
  initialProducts,
  initialTotal,
  initialTotalPages,
}: CategoriaViewProps) {
  // Estado del catálogo acumulado
  const [products, setProducts]       = useState<Product[]>(initialProducts)
  const [total]                       = useState(initialTotal)
  const [page, setPage]               = useState(1)
  const [totalPages]                  = useState(initialTotalPages)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore]         = useState(initialTotalPages > 1)
  // Marca qué índices son "nuevos" (para animar)
  const [newBatchStart, setNewBatchStart] = useState<number | null>(null)

  const sentinelRef   = useRef<HTMLDivElement>(null)
  const isFetchingRef = useRef(false)

  // Carga siguiente página
  const loadMore = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return
    isFetchingRef.current = true
    setLoadingMore(true)

    try {
      const nextPage = page + 1
      const result = await getCatalogAction({
        categories: [category.name],
        page: nextPage,
        limit: LIMIT,
      })
      setProducts((prev) => {
        setNewBatchStart(prev.length)
        return [...prev, ...result.data]
      })
      setPage(nextPage)
      setHasMore(nextPage < totalPages)
    } catch {
      // silencio — no romper UX
    } finally {
      setLoadingMore(false)
      isFetchingRef.current = false
    }
  }, [page, hasMore, totalPages, category.name])

  // IntersectionObserver — dispara loadMore cuando el sentinel entra al viewport
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore() },
      { rootMargin: "300px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore])

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-primary">Inicio</Link>
            <IconChevronRight className="h-3 w-3 text-slate-400" />
            <Link href="/catalogo" className="hover:text-primary">Catálogo</Link>
            <IconChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-800">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#07091E] via-[#121A47] to-[#0B1035] py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-red-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            Categoría — {total} productos
          </div>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {category.name}
          </h1>
          {category.description && (
            <p className="max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {category.description}
            </p>
          )}

          {/* Subcategorías — visibles para Google */}
          {category.subcategories.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                Tipos de productos
              </p>
              <div className="flex flex-wrap gap-2">
                {category.subcategories.map((sub, i) => (
                  <span key={i} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Grid de productos con infinite scroll */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          {products.length > 0 ? (
            <>
              {/* Encabezado */}
              <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#121A47]">
                    Productos de {category.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Mostrando {products.length} de {total} productos
                  </p>
                </div>
                <Link
                  href={`/catalogo?categoria=${encodeURIComponent(category.name)}`}
                  className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#121A47] transition-all hover:border-primary/30 hover:text-primary sm:flex"
                >
                  Ver en catálogo con filtros →
                </Link>
              </div>

              {/* Grid con animación por lote */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product, idx) => (
                  <AnimatedCard
                    key={product.id}
                    product={product}
                    index={newBatchStart !== null ? idx - newBatchStart : idx}
                    animate={newBatchStart !== null && idx >= newBatchStart}
                  />
                ))}
              </div>

              {/* Sentinel + estados del scroll infinito */}
              <div ref={sentinelRef} className="h-1 mt-4" />

              {loadingMore && <LoadingSpinner />}

              {!hasMore && products.length > 0 && (
                <div className="mt-10 flex flex-col items-center gap-3 text-center">
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                  <p className="text-sm text-slate-400 font-medium">
                    {total} productos · fin de la categoría
                  </p>
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center text-slate-500">
              <p className="text-lg font-semibold">
                No hay productos disponibles en esta categoría aún.
              </p>
              <Link href="/catalogo" className="mt-4 inline-block text-primary hover:underline">
                Ver catálogo completo →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      {category.subcategories.length >= 2 && (
        <section className="border-t border-slate-100 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-6 text-lg font-extrabold text-[#121A47]">
              Preguntas frecuentes sobre {category.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-sm font-bold text-slate-800">¿Qué tipos de {category.name} tienen?</h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Distribuimos: {category.subcategories.slice(0, 4).join(", ")}
                  {category.subcategories.length > 4 && ` y ${category.subcategories.length - 4} variantes más`}.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-sm font-bold text-slate-800">¿Cuentan con certificación IEC y ANSI?</h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Sí. Todos los {category.name} cumplen las normas IEC, ANSI y NTP para instalaciones AT/MT en Perú.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-sm font-bold text-slate-800">¿Despachan a provincias?</h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Sí. Despacho en Lima en 24–48 h. Enviamos a provincias de todo el Perú. Cotice por web o WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Internal linking */}
      <section className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">
            También te puede interesar
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/catalogo"
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-primary/30 hover:bg-white hover:text-primary">
              Ver todo el catálogo
            </Link>
            <Link href="/contacto"
              className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-all hover:bg-red-100">
              Cotizar ahora →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

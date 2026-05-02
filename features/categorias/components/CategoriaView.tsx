"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ProductCard } from "@/components/product/ProductCard"
import { Pagination } from "@/components/ui/pagination"
import { IconChevronRight } from "@/components/icons"
import { getCatalogAction } from "@/features/productos/actions"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import type { CategoryDTO } from "@/features/categorias/types"
import type { Product } from "@/lib/types"

const DEFAULT_LIMIT = 20
const PAGE_SIZE_OPTIONS = [12, 20, 50]

interface CategoriaViewProps {
  category: CategoryDTO
  initialProducts: Product[]
  initialTotal: number
  initialTotalPages: number
  /** Subcategoría activa (opcional — para navegar directo a una sub) */
  activeSubcategoryId?: number
}

// ── Card con animación de entrada ─────────────────────────────────────────────

function AnimatedCard({ product, index }: { product: Product; index: number }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 50)
    return () => clearTimeout(t)
  }, [index])
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.35s ease, transform 0.35s ease",
    }}>
      <ProductCard product={product} />
    </div>
  )
}

// ── Vista principal ───────────────────────────────────────────────────────────

export function CategoriaView({
  category,
  initialProducts,
  initialTotal,
  initialTotalPages,
  activeSubcategoryId,
}: CategoriaViewProps) {
  const [products, setProducts]       = useState<Product[]>(initialProducts)
  const [total, setTotal]             = useState(initialTotal)
  const [totalPages, setTotalPages]   = useState(initialTotalPages)
  const [page, setPage]               = useState(1)
  const [pageSize, setPageSize]       = useState(DEFAULT_LIMIT)
  const [loading, setLoading]         = useState(false)
  const [subcategoryId, setSubId]     = useState<number | undefined>(activeSubcategoryId)

  // Nombre de la subcategoría activa (para mostrar en breadcrumb / badge)
  const activeSubName = subcategoryId
    ? category.subcategoryItems?.find((s) => s.id === subcategoryId)?.name
    : undefined

  const fetchPage = useCallback(async (p: number, size: number, subId?: number) => {
    setLoading(true)
    try {
      const result = await getCatalogAction({
        categories: [category.name],
        page: p,
        limit: size,
        subcategoryId: subId,
      })
      setProducts(result.data)
      setTotal(result.total)
      setTotalPages(result.totalPages)
    } catch {
      // silencio — no romper UX
    } finally {
      setLoading(false)
    }
  }, [category.name])

  // Refetch cuando cambia página, tamaño o subcategoría
  useEffect(() => {
    // Solo si no es la carga inicial (los datos SSR ya están listos)
    if (page === 1 && pageSize === DEFAULT_LIMIT && subcategoryId === activeSubcategoryId) return
    fetchPage(page, pageSize, subcategoryId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, subcategoryId])

  function handlePageChange(p: number) {
    setPage(p)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size)
    setPage(1)
  }

  function handleSubcategory(subId: number | undefined) {
    setSubId(subId)
    setPage(1)
    if (subId !== subcategoryId) fetchPage(1, pageSize, subId)
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 flex-wrap text-xs text-slate-500">
            <Link href="/" className="hover:text-primary">Inicio</Link>
            <IconChevronRight className="h-3 w-3 text-slate-400" />
            <Link href="/catalogo" className="hover:text-primary">Catálogo</Link>
            <IconChevronRight className="h-3 w-3 text-slate-400" />
            <button onClick={() => handleSubcategory(undefined)} className={`font-semibold ${activeSubName ? "text-slate-500 hover:text-primary" : "text-slate-800"}`}>
              {category.name}
            </button>
            {activeSubName && (
              <>
                <IconChevronRight className="h-3 w-3 text-slate-400" />
                <span className="font-semibold text-[#003D73]">{activeSubName}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-linear-to-br from-[#003D73] via-[#002d5f] to-[#001a3d] py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6B35]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B35]" />
            Categoría — {total} producto{total !== 1 ? "s" : ""}
          </div>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {category.name}
            {activeSubName && (
              <span className="ml-3 text-2xl font-semibold text-[#FF6B35]/80 sm:text-3xl">/ {activeSubName}</span>
            )}
          </h1>
          {category.description && (
            <p className="max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">{category.description}</p>
          )}

          {/* Chips de subcategorías */}
          {category.subcategoryItems && category.subcategoryItems.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={() => handleSubcategory(undefined)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                  !subcategoryId
                    ? "border-[#FF6B35] bg-[#FF6B35] text-white"
                    : "border-white/20 bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                Todos
              </button>
              {category.subcategoryItems.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleSubcategory(sub.id === subcategoryId ? undefined : sub.id)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                    sub.id === subcategoryId
                      ? "border-[#FF6B35] bg-[#FF6B35] text-white"
                      : "border-white/20 bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Grid de productos con paginación */}
      <section className="bg-slate-50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          {/* Encabezado */}
          <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-[#003D73]">
                {activeSubName ? `${category.name} › ${activeSubName}` : `Productos de ${category.name}`}
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                {total > 0 ? `${total} producto${total !== 1 ? "s" : ""} disponibles` : "Sin productos en esta selección"}
              </p>
            </div>
            <Link
              href={`/catalogo?categoria=${encodeURIComponent(category.name)}`}
              className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#003D73] transition-all hover:border-primary/30 hover:text-primary sm:flex"
            >
              Ver en catálogo con filtros →
            </Link>
          </div>

          {/* Skeleton */}
          {loading && (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: pageSize }).map((_, i) => (
                <div key={i} className="h-52 animate-pulse rounded-xl bg-slate-200 sm:h-64" />
              ))}
            </div>
          )}

          {/* Grid */}
          {!loading && products.length > 0 && (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p, idx) => (
                <AnimatedCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && products.length === 0 && (
            <div className="py-20 text-center text-slate-500">
              <p className="text-lg font-semibold">No hay productos disponibles en esta selección.</p>
              <button
                onClick={() => handleSubcategory(undefined)}
                className="mt-4 inline-block text-primary hover:underline"
              >
                Ver todos los productos de {category.name} →
              </button>
            </div>
          )}

          {/* Paginación */}
          {!loading && total > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              pageSize={pageSize}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </div>
      </section>

      {/* FAQ */}
      {category.subcategories.length >= 2 && (
        <section className="border-t border-slate-100 bg-white py-14">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6B35]">Preguntas frecuentes</p>
            <h2 className="mb-2 text-2xl font-extrabold text-[#003D73] sm:text-3xl">Todo sobre {category.name}</h2>
            <p className="mb-10 text-sm text-slate-500">Resolvemos las dudas más comunes sobre este producto.</p>

            <Accordion type="single" collapsible className="rounded-xl border border-slate-200 overflow-hidden text-left">
              <AccordionItem value="tipos" className="px-6 border-slate-100">
                <AccordionTrigger className="py-5 text-sm font-semibold text-slate-800 hover:no-underline hover:text-[#003D73]">
                  ¿Qué tipos de {category.name} tienen disponibles?
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-slate-600">
                  En Electro Thina contamos con {category.subcategories.length} variantes de {category.name}:{" "}
                  <strong className="text-slate-700">{category.subcategories.slice(0, 4).join(", ")}</strong>
                  {category.subcategories.length > 4 && ` y ${category.subcategories.length - 4} modelos adicionales`}.
                  Todos están disponibles en stock permanente en nuestra sede de Lima.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="certificacion" className="px-6 border-slate-100">
                <AccordionTrigger className="py-5 text-sm font-semibold text-slate-800 hover:no-underline hover:text-[#003D73]">
                  ¿Los {category.name} cuentan con certificación IEC y ANSI?
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-slate-600">
                  Sí. Todos los {category.name} que distribuimos cumplen con las normas <strong className="text-slate-700">IEC, ANSI C135 y NTP</strong> vigentes.
                  Podemos entregar certificados de calidad y fichas técnicas con cada pedido.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="cotizacion" className="px-6 border-slate-100">
                <AccordionTrigger className="py-5 text-sm font-semibold text-slate-800 hover:no-underline hover:text-[#003D73]">
                  ¿Cómo solicito una cotización?
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-slate-600">
                  Puede solicitar su cotización por WhatsApp, completando el formulario de <strong>Contacto</strong>, o llamándonos al <strong>+51 981 375 196</strong>. Respondemos en menos de 24 horas hábiles.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="provincias" className="px-6 border-slate-100">
                <AccordionTrigger className="py-5 text-sm font-semibold text-slate-800 hover:no-underline hover:text-[#003D73]">
                  ¿Realizan despachos a provincias?
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-slate-600">
                  Sí. Realizamos despachos en Lima en <strong>24 a 48 horas</strong>. Para envíos a provincias coordinamos mediante empresas de encomiendas de alcance nacional.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      )}

      {/* Internal linking */}
      <section className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">También te puede interesar</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/catalogo" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-primary/30 hover:bg-white hover:text-primary">
              Ver todo el catálogo
            </Link>
            <Link href="/contacto" className="rounded-full border border-[#FF6B35]/30 bg-[#FF6B35]/5 px-4 py-2 text-sm font-medium text-[#FF6B35] transition-all hover:bg-[#FF6B35]/10">
              Cotizar ahora →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

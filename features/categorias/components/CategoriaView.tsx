"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { ProductCard } from "@/components/product/ProductCard"
import { IconChevronRight } from "@/components/icons"
import { getCatalogAction } from "@/features/productos/actions"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
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
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
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
        <section className="border-t border-slate-100 bg-white py-14">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">Preguntas frecuentes</p>
            <h2 className="mb-2 text-2xl font-extrabold text-[#121A47] sm:text-3xl">
              Todo sobre {category.name}
            </h2>
            <p className="mb-10 text-sm text-slate-500">
              Resolvemos las dudas más comunes de nuestros clientes sobre este producto.
            </p>

            <Accordion type="single" collapsible className="rounded-xl border border-slate-200 overflow-hidden text-left">
              <AccordionItem value="tipos" className="px-6 border-slate-100">
                <AccordionTrigger className="text-sm font-semibold text-slate-800 hover:no-underline hover:text-[#121A47] py-5">
                  ¿Qué tipos de {category.name} tienen disponibles?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-slate-600 pb-5">
                  En Electro Thina contamos con {category.subcategories.length} variantes
                  de {category.name}: <strong className="text-slate-700">{category.subcategories.slice(0, 4).join(", ")}</strong>
                  {category.subcategories.length > 4 && ` y ${category.subcategories.length - 4} modelos adicionales`}.
                  Todos están disponibles en stock permanente en nuestra sede de Lima. Si necesita
                  una referencia específica o un volumen mayor, contáctenos para coordinar disponibilidad
                  y tiempos de entrega personalizados.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="certificacion" className="px-6 border-slate-100">
                <AccordionTrigger className="text-sm font-semibold text-slate-800 hover:no-underline hover:text-[#121A47] py-5">
                  ¿Los {category.name} cuentan con certificación IEC y ANSI?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-slate-600 pb-5">
                  Sí. Todos los {category.name} que distribuimos cumplen con las normas
                  <strong className="text-slate-700"> IEC, ANSI C135 y NTP</strong> vigentes para
                  instalaciones eléctricas de alta y media tensión en Perú. Esto garantiza compatibilidad
                  con las especificaciones técnicas de concesionarias como Enel, Luz del Sur, Electrocentro
                  y demás distribuidoras reguladas por Osinergmin. Podemos entregar certificados de calidad
                  y fichas técnicas con cada pedido.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cotizacion" className="px-6 border-slate-100">
                <AccordionTrigger className="text-sm font-semibold text-slate-800 hover:no-underline hover:text-[#121A47] py-5">
                  ¿Cómo solicito una cotización?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-slate-600 pb-5">
                  Puede solicitar su cotización de tres formas: (1) haciendo clic en el botón
                  <strong className="text-slate-700"> "Cotizar ahora"</strong> de cada producto para
                  enviarnos un mensaje directo por WhatsApp, (2) completando el formulario en nuestra
                  página de <strong className="text-slate-700">Contacto</strong>, o (3) llamándonos al
                  <strong className="text-slate-700"> +51 981 375 196</strong>. Respondemos todas las
                  consultas en menos de 24 horas hábiles con precios, disponibilidad y condiciones de entrega.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="provincias" className="px-6 border-slate-100">
                <AccordionTrigger className="text-sm font-semibold text-slate-800 hover:no-underline hover:text-[#121A47] py-5">
                  ¿Realizan despachos a provincias?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-slate-600 pb-5">
                  Sí. Realizamos despachos en Lima en <strong className="text-slate-700">24 a 48 horas</strong> desde
                  la confirmación del pedido. Para envíos a provincias coordinamos el transporte a través de
                  empresas de encomiendas de alcance nacional. El costo y plazo de envío se calculan según
                  el volumen y destino; nuestro equipo le brinda esta información al momento de la cotización.
                  Para pedidos de gran volumen, evaluamos condiciones especiales de flete.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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

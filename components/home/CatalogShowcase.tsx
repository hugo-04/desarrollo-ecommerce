"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { fadeUp, viewportOnce } from "@/hooks/useAnimations"
import { CATEGORIES_GRID_CONTENT, BEST_SELLERS_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@/components/icons"
import { getCategoryIcon } from "@/lib/category-icons"
import { useBestSellers } from "@/features/productos/hooks"
import { ProductCard } from "@/components/product/ProductCard"
import type { CategoryDTO } from "@/features/categorias/types"

// ─── Tipos de tab ──────────────────────────────────────────────────────────────
type TabId = "categorias" | "productos"

const TABS: { id: TabId; label: string; href: string }[] = [
  { id: "categorias", label: "Nuestras Categorías", href: "/catalogo" },
  { id: "productos",  label: "Productos Destacados", href: "/catalogo" },
]

// ─── Paleta de gradientes para tarjetas de categoría ──────────────────────────
const GRADIENT_PALETTE = [
  "from-[#1C2870] via-[#1C2870]/70 to-[#1C2870]/10",
  "from-blue-900 via-blue-800/70 to-blue-800/10",
  "from-indigo-900 via-indigo-800/70 to-indigo-800/10",
  "from-slate-900 via-slate-700/70 to-slate-700/10",
  "from-cyan-900 via-cyan-700/70 to-cyan-700/10",
  "from-sky-900 via-sky-700/70 to-sky-700/10",
  "from-zinc-900 via-zinc-700/70 to-zinc-700/10",
  "-[#001530] via-[#1C2870]/70 to-[#1C2870]/10",
]
function autoGradient(slug: string): string {
  let h = 0
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return GRADIENT_PALETTE[h % GRADIENT_PALETTE.length]
}

// ─── Hook: items visibles según breakpoint ─────────────────────────────────────
function useItemsPerView(tab: TabId) {
  const [items, setItems] = useState(tab === "productos" ? 4 : 3)
  useEffect(() => {
    function update() {
      if (tab === "productos") {
        // Productos: 1 / 2 / 3 / 4
        if      (window.innerWidth < 640)  setItems(1)
        else if (window.innerWidth < 768)  setItems(2)
        else if (window.innerWidth < 1280) setItems(3)
        else                               setItems(4)
      } else {
        // Categorías: 1 / 2 / 3
        if      (window.innerWidth < 640)  setItems(1)
        else if (window.innerWidth < 1024) setItems(2)
        else                               setItems(3)
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [tab])
  return items
}

// ─── Tarjeta de categoría con imagen de fondo ──────────────────────────────────
function CategoryCard({ category }: { category: CategoryDTO }) {
  const Icon     = getCategoryIcon(category.slug)
  const gradient = autoGradient(category.slug)
  const subs     = (category.subcategories ?? []).slice(0, 3)

  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="group relative block h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#1C2870]/30"
      aria-label={`Ver categoría ${category.name}`}
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.imageAlt ?? category.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C2870] bg-[#001530]" />
        )}
      </div>

      {/* Overlay degradado */}
      <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-90 transition-opacity duration-500 group-hover:opacity-95`} />

      {/* Tinte rojo sutil al hover */}
      <div className="absolute inset-0 bg-[#CC1B1B]/0 transition-colors duration-500 group-hover:bg-[#CC1B1B]/6" />

      {/* Contenido */}
      <div className="relative flex h-full flex-col justify-end p-5 sm:p-6 lg:p-7">
        {/* Icono + badge */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/30 backdrop-blur-md transition-all duration-500 group-hover:bg-[#CC1B1B] group-hover:ring-[#CC1B1B] group-hover:shadow-[0_0_20px_rgba(204,27,27,0.5)]">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            {category.count} productos
          </span>
        </div>

        {/* Nombre */}
        <h3 className="mb-2 text-lg font-black leading-tight text-white sm:text-xl lg:text-2xl">
          {category.name}
        </h3>

        {/* Chips de subcategorías */}
        {subs.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {subs.map((sub) => (
              <span key={sub} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                {sub}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-semibold text-red-400 transition-all duration-300 group-hover:gap-3 group-hover:text-red-300">
          <span>Ver productos</span>
          <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

// ─── Skeleton de producto (mientras carga) ─────────────────────────────────────
function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-square bg-slate-100" />
      <div className="p-4 space-y-2.5">
        <div className="h-3 w-1/3 rounded bg-slate-200" />
        <div className="h-4 w-4/5 rounded bg-slate-200" />
        <div className="h-3 w-full rounded bg-slate-100" />
        <div className="h-3 w-2/3 rounded bg-slate-100" />
        <div className="mt-4 h-8 w-full rounded-xl bg-slate-100" />
      </div>
    </div>
  )
}

// ─── Carrusel genérico ─────────────────────────────────────────────────────────
interface CarouselProps {
  count: number
  itemsPerView: number
  current: number
  onPrev: () => void
  onNext: () => void
  onDot: (i: number) => void
  children: React.ReactNode
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function Carousel({ count, itemsPerView, current, onPrev, onNext, onDot, children, onMouseEnter, onMouseLeave }: CarouselProps) {
  const maxIndex     = Math.max(0, count - itemsPerView)
  const showControls = count > itemsPerView

  return (
    <div>
      {/* Track */}
      <div
        className="overflow-hidden"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <motion.div
          className="flex"
          animate={{ x: `-${current * (100 / itemsPerView)}%` }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>

      {/* Controles */}
      {showControls && (
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            onClick={onPrev}
            aria-label="Anterior"
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 shadow-sm transition-all duration-300 hover:border-[#1C2870] hover:bg-[#1C2870] hover:text-white hover:shadow-lg sm:h-12 sm:w-12 sm:rounded-2xl"
          >
            <IconChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => onDot(i)}
                aria-label={`Ir a elemento ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === i ? "w-7 bg-[#1C2870]" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={onNext}
            aria-label="Siguiente"
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 shadow-sm transition-all duration-300 hover:border-[#1C2870] hover:bg-[#1C2870] hover:text-white hover:shadow-lg sm:h-12 sm:w-12 sm:rounded-2xl"
          >
            <IconChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Props del componente principal ───────────────────────────────────────────
interface CatalogShowcaseProps {
  categories: CategoryDTO[]
}

// ─── Componente principal ──────────────────────────────────────────────────────
export function CatalogShowcase({ categories }: CatalogShowcaseProps) {
  const [activeTab, setActiveTab] = useState<TabId>("categorias")

  // Best sellers — se obtienen client-side
  const { data: bestSellersData, isLoading: loadingProducts } = useBestSellers()
  const bestSellers = bestSellersData ?? []

  // Estado del carrusel de categorías
  const catItemsPerView = useItemsPerView("categorias")
  const catMaxIndex     = Math.max(0, categories.length - catItemsPerView)
  const [catIndex, setCatIndex] = useState(0)
  const catPaused = useRef(false)

  // Estado del carrusel de productos
  const prodItemsPerView = useItemsPerView("productos")
  const prodMaxIndex     = Math.max(0, bestSellers.length - prodItemsPerView)
  const [prodIndex, setProdIndex] = useState(0)
  const prodPaused = useRef(false)

  // Ajustar índices al cambiar breakpoint
  useEffect(() => { setCatIndex((c) => Math.min(c, catMaxIndex)) }, [catMaxIndex])
  useEffect(() => { setProdIndex((p) => Math.min(p, prodMaxIndex)) }, [prodMaxIndex])

  // Autoplay categorías
  const nextCat = useCallback(() => {
    setCatIndex((p) => (p >= catMaxIndex ? 0 : p + 1))
  }, [catMaxIndex])

  useEffect(() => {
    if (activeTab !== "categorias") return
    const id = setInterval(() => { if (!catPaused.current) nextCat() }, 4000)
    return () => clearInterval(id)
  }, [nextCat, activeTab])

  // Autoplay productos
  const nextProd = useCallback(() => {
    setProdIndex((p) => (p >= prodMaxIndex ? 0 : p + 1))
  }, [prodMaxIndex])

  useEffect(() => {
    if (activeTab !== "productos") return
    const id = setInterval(() => { if (!prodPaused.current) nextProd() }, 4500)
    return () => clearInterval(id)
  }, [nextProd, activeTab])

  // Contenido del encabezado según tab
  const heading = activeTab === "categorias"
    ? { badge: CATEGORIES_GRID_CONTENT.badge, title: CATEGORIES_GRID_CONTENT.title, subtitle: CATEGORIES_GRID_CONTENT.subtitle, cta: "/catalogo", ctaLabel: "Ver catálogo completo" }
    : { badge: BEST_SELLERS_CONTENT.badge,    title: BEST_SELLERS_CONTENT.title,    subtitle: BEST_SELLERS_CONTENT.subtitle,    cta: "/catalogo", ctaLabel: "Ver todos los productos" }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="relative overflow-hidden py-14 sm:py-20 lg:py-28"
    >
      {/* Fondo — blanco puro, máxima claridad para productos */}
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,102,179,0.06) 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Tabs ── */}
        <motion.div variants={fadeUp} className="mb-10 flex flex-col items-center gap-6 sm:mb-12">
          {/* Pill switcher */}
          <div className="relative flex items-center gap-1 rounded-2xl border border-slate-200/80 bg-white p-1 shadow-sm">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {/* Indicador animado */}
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-xl bg-[#1C2870] shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Encabezado animado con AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="text-center"
            >
              <div className="mb-2 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-red-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">
                  {heading.badge}
                </span>
                <div className="h-px w-8 bg-red-500" />
              </div>
              <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-[#121A47] sm:text-3xl lg:text-4xl">
                {heading.title}
              </h2>
              <p className="mx-auto max-w-lg text-xs leading-relaxed text-slate-500 sm:text-sm">
                {heading.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Contenido del carrusel con AnimatePresence ── */}
        <AnimatePresence mode="wait">

          {/* ── Tab: Categorías ── */}
          {activeTab === "categorias" && (
            <motion.div
              key="categorias"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Carousel
                count={categories.length}
                itemsPerView={catItemsPerView}
                current={catIndex}
                onPrev={() => setCatIndex((p) => (p <= 0 ? catMaxIndex : p - 1))}
                onNext={nextCat}
                onDot={setCatIndex}
                onMouseEnter={() => { catPaused.current = true }}
                onMouseLeave={() => { catPaused.current = false }}
              >
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="shrink-0 px-2"
                    style={{ width: `${100 / catItemsPerView}%` }}
                  >
                    <div className="h-[380px] sm:h-[420px] lg:h-[460px]">
                      <CategoryCard category={cat} />
                    </div>
                  </div>
                ))}
              </Carousel>
            </motion.div>
          )}

          {/* ── Tab: Productos ── */}
          {activeTab === "productos" && (
            <motion.div
              key="productos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {loadingProducts ? (
                /* Skeleton de carga */
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)}
                </div>
              ) : (
                <Carousel
                  count={bestSellers.length}
                  itemsPerView={prodItemsPerView}
                  current={prodIndex}
                  onPrev={() => setProdIndex((p) => (p <= 0 ? prodMaxIndex : p - 1))}
                  onNext={nextProd}
                  onDot={setProdIndex}
                  onMouseEnter={() => { prodPaused.current = true }}
                  onMouseLeave={() => { prodPaused.current = false }}
                >
                  {bestSellers.map((product, idx) => (
                    <div
                      key={product.id}
                      className="shrink-0 px-2"
                      style={{ width: `${100 / prodItemsPerView}%` }}
                    >
                      <ProductCard product={product} showBadge priority={idx < 4} />
                    </div>
                  ))}
                </Carousel>
              )}
            </motion.div>
          )}

        </AnimatePresence>

        {/* ── CTA ── */}
        <motion.div variants={fadeUp} className="mt-10 flex justify-center sm:mt-12">
          <Link
            href={heading.cta}
            className="group inline-flex items-center gap-2 rounded-full border border-[#1C2870]/30 bg-white px-6 py-2.5 text-sm font-semibold text-[#1C2870] shadow-sm transition-all duration-300 hover:border-[#1C2870] hover:bg-[#1C2870] hover:text-white hover:shadow-lg"
          >
            {heading.ctaLabel}
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </motion.section>
  )
}

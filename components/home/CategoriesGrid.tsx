"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { fadeUp, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { CATEGORIES_GRID_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@/components/icons"
import { getCategoryIcon } from "@/lib/category-icons"
import type { CategoryDTO } from "@/features/categorias/types"

// ─── Paleta de gradientes de acento — asignada determinísticamente por slug ────
const GRADIENT_PALETTE = [
  "from-[#1C2870] via-[#1C2870]/60 to-transparent",
  "from-blue-900 via-blue-800/60 to-transparent",
  "from-indigo-900 via-indigo-800/60 to-transparent",
  "from-slate-900 via-slate-700/60 to-transparent",
  "from-cyan-900 via-cyan-700/60 to-transparent",
  "from-sky-900 via-sky-700/60 to-transparent",
  "from-zinc-900 via-zinc-700/60 to-transparent",
  "-[#001530] via-[#1C2870]/60 to-transparent",
]

function autoGradient(slug: string): string {
  let h = 0
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return GRADIENT_PALETTE[h % GRADIENT_PALETTE.length]
}

// ─── Cuántas tarjetas se muestran según breakpoint ─────────────────────────────
function useItemsPerView() {
  const [items, setItems] = useState(3)
  useEffect(() => {
    function update() {
      if (window.innerWidth < 640)       setItems(1)
      else if (window.innerWidth < 1024) setItems(2)
      else                               setItems(3)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])
  return items
}

// ─── Tarjeta individual con imagen de fondo ────────────────────────────────────
function CategoryCard({ category }: { category: CategoryDTO }) {
  const Icon     = getCategoryIcon(category.slug)
  const gradient = autoGradient(category.slug)
  const subs     = (category.subcategories ?? []).slice(0, 3)

  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="group relative block h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#1C2870]/30"
      aria-label={`Ver categoría ${category.name}`}
    >
      {/* ── Imagen de fondo ── */}
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
          /* Fallback si no hay imagen — gradiente sólido */
          <div className={`absolute inset-0 bg-gradient-to-br ${autoGradient(category.slug).replace("to-transparent", "-[#001530]")}`} />
        )}
      </div>

      {/* ── Overlay degradado oscuro ── */}
      <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-90 transition-opacity duration-500 group-hover:opacity-95`} />

      {/* ── Overlay de acento al hover ── */}
      <div className="absolute inset-0 bg-[#CC1B1B]/0 transition-colors duration-500 group-hover:bg-[#CC1B1B]/5" />

      {/* ── Contenido ── */}
      <div className="relative flex h-full flex-col justify-end p-6 lg:p-7">
        {/* Badge de productos */}
        <div className="mb-4 flex items-center gap-3">
          {/* Icono */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/30 backdrop-blur-md transition-all duration-500 group-hover:bg-[#CC1B1B] group-hover:ring-[#CC1B1B] group-hover:shadow-[0_0_20px_rgba(204,27,27,0.5)]">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            {category.count} productos
          </span>
        </div>

        {/* Nombre */}
        <h3 className="mb-2 text-xl font-black leading-tight text-white lg:text-2xl">
          {category.name}
        </h3>

        {/* Subcategorías como chips */}
        {subs.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {subs.map((sub) => (
              <span
                key={sub}
                className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm"
              >
                {sub}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-semibold text-red-400 transition-all duration-300 group-hover:gap-3 group-hover:text-red-300">
          <span>Ver productos</span>
          <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

// ─── Props ─────────────────────────────────────────────────────────────────────
interface CategoriesGridProps {
  categories: CategoryDTO[]
}

// ─── Componente principal — Carrusel ───────────────────────────────────────────
export function CategoriesGrid({ categories }: CategoriesGridProps) {
  const itemsPerView  = useItemsPerView()
  const maxIndex      = Math.max(0, categories.length - itemsPerView)
  const [current, setCurrent] = useState(0)
  const paused = useRef(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prev = () => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  // Autoplay cada 4s — pausa al hacer hover
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) next()
    }, 4000)
    return () => clearInterval(id)
  }, [next])

  // Ajustar índice si cambia el breakpoint
  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex))
  }, [maxIndex])

  // Solo mostrar flechas si hay más items que los visibles
  const showControls = categories.length > itemsPerView

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-14 sm:py-20 lg:py-28"
    >
      {/* Fondo de sección */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F0F5] via-[#E7E7EF] to-[#F0F0F5]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(0 51 160 / 0.04) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Encabezado ── */}
        <motion.div variants={fadeUp} className="mb-10 text-center sm:mb-14">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-red-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">
              {CATEGORIES_GRID_CONTENT.badge}
            </span>
            <div className="h-px w-8 bg-red-500" />
          </div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-[#121A47] sm:text-3xl lg:text-4xl">
            {CATEGORIES_GRID_CONTENT.title}
          </h2>
          <p className="mx-auto max-w-lg text-xs leading-relaxed text-slate-500 sm:text-sm">
            {CATEGORIES_GRID_CONTENT.subtitle}
          </p>
        </motion.div>

        {/* ── Carrusel ── */}
        <motion.div
          variants={fadeUp}
          className="overflow-hidden"
          onMouseEnter={() => { paused.current = true }}
          onMouseLeave={() => { paused.current = false }}
        >
          <motion.div
            className="flex"
            animate={{ x: `-${current * (100 / itemsPerView)}%` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="shrink-0 px-2"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                {/* Altura fija para el carrusel */}
                <div className="h-[380px] sm:h-[420px] lg:h-[460px]">
                  <CategoryCard category={category} />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Controles de navegación ── */}
        {showControls && (
          <div className="mt-8 flex items-center justify-center gap-5 sm:mt-10">
            {/* Flecha anterior */}
            <button
              onClick={prev}
              aria-label="Categoría anterior"
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-500 shadow-sm transition-all duration-300 hover:border-[#1C2870] hover:bg-[#1C2870] hover:text-white hover:shadow-lg sm:h-12 sm:w-12 sm:rounded-2xl"
            >
              <IconChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots indicadores */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Ir a categoría ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    current === i
                      ? "w-7 bg-[#1C2870] h-2"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {/* Flecha siguiente */}
            <button
              onClick={next}
              aria-label="Categoría siguiente"
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-500 shadow-sm transition-all duration-300 hover:border-[#1C2870] hover:bg-[#1C2870] hover:text-white hover:shadow-lg sm:h-12 sm:w-12 sm:rounded-2xl"
            >
              <IconChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* ── CTA ver catálogo ── */}
        <motion.div variants={fadeUp} className="mt-10 flex justify-center">
          <Link
            href="/catalogo"
            className="group inline-flex items-center gap-2 rounded-full border border-[#1C2870]/30 bg-white px-6 py-2.5 text-sm font-semibold text-[#1C2870] shadow-sm transition-all duration-300 hover:border-[#1C2870] hover:bg-[#1C2870] hover:text-white hover:shadow-lg"
          >
            Ver todo el catálogo
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </motion.section>
  )
}

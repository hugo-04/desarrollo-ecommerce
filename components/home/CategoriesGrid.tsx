"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { fadeUp, scaleUp, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { CATEGORIES_GRID_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconArrowRight } from "@/components/icons"
import { getCategoryIcon } from "@/lib/category-icons"
import type { CategoryDTO } from "@/features/categorias/types"

// Paleta de gradientes — se asigna de forma determinística por slug
const GRADIENT_PALETTE = [
  "from-[#1C2870] to-[#151f5c]",
  "from-blue-700 to-blue-900",
  "from-indigo-700 to-[#1C2870]",
  "from-slate-600 to-slate-800",
  "from-cyan-700 to-blue-900",
  "from-sky-700 to-indigo-900",
  "from-slate-700 to-zinc-900",
  "from-blue-800 to-indigo-950",
]
function autoGradient(slug: string): string {
  let h = 0
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return GRADIENT_PALETTE[h % GRADIENT_PALETTE.length]
}

function CategoryCard({ category, index }: { category: CategoryDTO; index: number }) {
  const Icon = getCategoryIcon(category.slug)
  const isFeatured = index === 0

  return (
    <motion.div variants={scaleUp} className={`h-full w-full ${isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
      <Link
        href={`/categoria/${category.slug}`}
        className="group relative block h-full w-full overflow-hidden rounded-3xl border border-slate-200/50 bg-white text-left transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1C2870]/20"
      >
        <div className={`relative w-full overflow-hidden ${isFeatured ? 'h-[220px] sm:h-[320px] lg:h-full' : 'h-[180px] sm:h-[260px] lg:h-[340px]'}`}>
          <div className="absolute inset-0 bg-slate-900/10 z-10 transition-opacity duration-500 group-hover:opacity-0" />
          {category.image && (
            <Image
              src={category.image}
              alt={category.imageAlt ?? category.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          )}
          <div className={`absolute inset-0 bg-gradient-to-t from-[#07091E]/95 ${isFeatured ? 'via-[#07091E]/40' : 'via-[#07091E]/60'} to-transparent z-10`} />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${autoGradient(category.slug)} opacity-20 mix-blend-color z-10 transition-opacity duration-500 group-hover:opacity-40`}
          />
          <div className="absolute inset-0 flex flex-col justify-end p-4 z-20 sm:p-6 lg:p-8">
            <div className="mb-2 flex items-center gap-2 sm:mb-4 sm:gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/30 transition-all duration-500 group-hover:bg-[#CC1B1B] group-hover:ring-[#CC1B1B] group-hover:shadow-[0_0_20px_rgba(204,27,27,0.4)] sm:h-12 sm:w-12 sm:rounded-2xl">
                <Icon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              </div>
              <div className="rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur-md sm:px-3 sm:py-1 sm:text-[10px]">
                {category.count} PRODUCTOS
              </div>
            </div>
            <h3 className={`mb-1 font-black text-white sm:mb-2 ${isFeatured ? 'text-lg sm:text-2xl lg:text-4xl' : 'text-sm sm:text-lg lg:text-xl'}`}>{category.name}</h3>
            <p className={`text-white/70 ${isFeatured ? 'mb-3 max-w-sm text-[10px] sm:mb-6 sm:text-sm' : 'mb-2 text-[10px] sm:mb-4 sm:text-xs'}`}>
              {(category.subcategories ?? []).slice(0, 2).join(" · ")}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-red-400 transition-all group-hover:gap-3 sm:text-xs">
              <span>Ver productos</span>
              <IconArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-3.5 sm:w-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

interface CategoriesGridProps {
  /** Categorías cargadas por el Server Component padre (de la DB) */
  categories: CategoryDTO[]
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-12 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F0F5] via-[#E7E7EF] to-[#F0F0F5]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(0 51 160 / 0.04) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div variants={fadeUp} className="mb-8 text-center sm:mb-16">
          <div className="mb-3 flex items-center justify-center gap-3 sm:mb-4">
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
      </div>
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2 lg:gap-6 auto-rows-fr"
          >
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

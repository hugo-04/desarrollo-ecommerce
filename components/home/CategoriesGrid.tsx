"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeUp, scaleUp, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { CATEGORIES_GRID_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconArrowRight } from "@/components/icons"
import { getCategoryIcon } from "@/lib/category-icons"
import type { CategoryDTO } from "@/features/categorias/types"

function CategoryCard({ category, index }: { category: CategoryDTO; index: number }) {
  const Icon = getCategoryIcon(category.slug)
  const isFeatured = index === 0

  return (
    <motion.div variants={scaleUp} className={`h-full w-full ${isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
      <Link
        href={`/catalogo?categoria=${encodeURIComponent(category.name)}`}
        className="group relative block h-full w-full overflow-hidden rounded-3xl border border-slate-200/50 bg-white text-left transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1C2870]/20"
      >
        <div className={`relative w-full overflow-hidden ${isFeatured ? 'h-[400px] lg:h-full' : 'h-[340px]'}`}>
          <div className="absolute inset-0 bg-slate-900/10 z-10 transition-opacity duration-500 group-hover:opacity-0" />
          {category.image && (
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              crossOrigin="anonymous"
            />
          )}
          <div className={`absolute inset-0 bg-gradient-to-t from-[#07091E]/95 ${isFeatured ? 'via-[#07091E]/40' : 'via-[#07091E]/60'} to-transparent z-10`} />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 mix-blend-color z-10 transition-opacity duration-500 group-hover:opacity-40`}
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/30 transition-all duration-500 group-hover:bg-[#CC1B1B] group-hover:ring-[#CC1B1B] group-hover:shadow-[0_0_20px_rgba(204,27,27,0.4)]">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                {category.count} PRODUCTOS
              </div>
            </div>
            <h3 className={`mb-2 font-black text-white ${isFeatured ? 'text-3xl lg:text-4xl' : 'text-xl'}`}>{category.name}</h3>
            <p className={`text-white/70 ${isFeatured ? 'mb-6 max-w-sm text-sm' : 'mb-4 text-xs'}`}>
              {category.subcategories.slice(0, 3).join(" · ")}
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 transition-all group-hover:gap-3">
              <span>Ver productos</span>
              <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
      className="relative overflow-hidden py-24"
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
        <motion.div variants={fadeUp} className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-red-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">
              {CATEGORIES_GRID_CONTENT.badge}
            </span>
            <div className="h-px w-8 bg-red-500" />
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#121A47] lg:text-4xl">
            {CATEGORIES_GRID_CONTENT.title}
          </h2>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-slate-500">
            {CATEGORIES_GRID_CONTENT.subtitle}
          </p>
        </motion.div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-6 auto-rows-fr"
          >
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

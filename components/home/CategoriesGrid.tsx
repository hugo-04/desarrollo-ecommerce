"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeUp, scaleUp, cardHover, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { useCategories } from "@/features/categorias/hooks"
import { CATEGORIES_GRID_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconArrowRight } from "@/components/icons"
import { getCategoryIcon } from "@/lib/category-icons"

function CategoryCard({ category }: { category: { id: number; name: string; slug: string; image: string; color: string; count: number; subcategories: string[] } }) {
  const Icon = getCategoryIcon(category.slug)

  return (
    <motion.div variants={scaleUp} whileHover={cardHover} className="h-full w-full">
      <Link
        href={`/catalogo?categoria=${encodeURIComponent(category.name)}`}
        className="group relative block h-full w-full overflow-hidden rounded-2xl text-left transition-shadow duration-500 hover:shadow-2xl"
      >
        <div className="relative h-[340px] w-full overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121A47] via-[#121A47]/50 to-transparent" />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-30 mix-blend-multiply transition-opacity group-hover:opacity-50`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]" />
          <div className="absolute inset-0 flex flex-col justify-end p-7">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 transition-all group-hover:bg-white/20 group-hover:shadow-lg">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="rounded-full bg-red-500/90 px-3 py-1 text-[10px] font-bold text-white shadow-lg">
                {category.count} productos
              </div>
            </div>
            <h3 className="mb-1 text-xl font-extrabold text-white">{category.name}</h3>
            <p className="mb-3 text-xs text-white/60">
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

export function CategoriesGrid() {
  const { categories, loading } = useCategories()

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
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[340px] animate-pulse rounded-2xl bg-slate-200" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {categories.slice(0, 6).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

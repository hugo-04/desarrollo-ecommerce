"use client"

import { getCategoryIcon } from "@/lib/category-icons"
import type { CategoryDTO } from "@/features/categorias/types"

interface CategoryBannerProps {
  category: CategoryDTO
  productCount: number
}

export function CategoryBanner({ category, productCount }: CategoryBannerProps) {
  const Icon = getCategoryIcon(category.slug)

  return (
    <div className={`mb-5 overflow-hidden rounded-2xl bg-gradient-to-r ${category.color} p-5 text-white`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
              Categoria seleccionada
            </p>
            <h3 className="text-lg font-extrabold text-white">{category.name}</h3>
            <p className="mt-0.5 text-[11px] text-white/70">
              {category.subcategories.slice(0, 3).join(" · ")}
              {category.subcategories.length > 3 ? " · ..." : ""}
            </p>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-2xl font-extrabold text-white">{productCount}</p>
          <p className="text-[10px] text-white/60">productos</p>
        </div>
      </div>
    </div>
  )
}

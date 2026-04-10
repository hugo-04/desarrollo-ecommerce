"use client"

import { getCategoryIcon } from "@/lib/category-icons"
import type { CategoryDTO } from "@/features/categorias/types"

// Paleta de gradientes basada en los colores de la página
const GRADIENTS = [
  "linear-gradient(to right, #1C2870, #2d3fa8)", // azul marino principal
  "linear-gradient(to right, #CC1B1B, #e83a3a)", // rojo diamante
  "linear-gradient(to right, #1C2870, #0d1a5e)", // azul marino oscuro
  "linear-gradient(to right, #B01010, #CC1B1B)", // rojo acento
  "linear-gradient(to right, #1a3a7c, #1C2870)", // azul marino medio
  "linear-gradient(to right, #0d1a5e, #1C2870)", // azul profundo
  "linear-gradient(to right, #CC1B1B, #B01010)", // rojo intenso
  "linear-gradient(to right, #1C2870, #162060)", // azul navy puro
]

function getCategoryGradient(slug: string): string {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  }
  return GRADIENTS[hash % GRADIENTS.length]
}

interface CategoryBannerProps {
  category: CategoryDTO
  productCount: number
}

export function CategoryBanner({ category, productCount }: CategoryBannerProps) {
  const Icon = getCategoryIcon(category.slug)

  return (
    <div
      className="mb-5 overflow-hidden rounded-2xl p-5"
      style={{ background: getCategoryGradient(category.slug), color: "white" }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-60">
              Categoria seleccionada
            </p>
            <h3 className="text-lg font-extrabold">{category.name}</h3>
            <p className="mt-0.5 text-[11px] opacity-70">
              {(category.subcategories ?? []).slice(0, 3).join(" · ")}
              {(category.subcategories ?? []).length > 3 ? " · ..." : ""}
            </p>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-2xl font-extrabold">{productCount}</p>
          <p className="text-[10px] opacity-60">productos</p>
        </div>
      </div>
    </div>
  )
}

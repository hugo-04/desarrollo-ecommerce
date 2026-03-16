"use client"

import Link from "next/link"
import { IconFire, IconStar, IconPDF, IconEye } from "@/components/icons"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  showBadge?: boolean
}

export function ProductCard({ product, showBadge = false }: ProductCardProps) {
  return (
    <Link
      href={`/producto/${product.id}`}
      className="group block cursor-pointer overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all duration-500 hover:border-primary/30 hover:-translate-y-1 hover:[box-shadow:0_0_0_1.5px_var(--primary),0_8px_30px_-8px_color-mix(in_srgb,var(--primary)_30%,transparent),0_0_20px_-6px_color-mix(in_srgb,var(--primary)_20%,transparent)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100/50 p-6">
        <img src={product.image} alt={product.name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110" crossOrigin="anonymous" />
        {showBadge && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg bg-red-600 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-red-600/25">
            <IconFire className="h-3 w-3" />Top Ventas
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); alert("Descargando ficha tecnica...") }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-primary shadow-md ring-1 ring-black/[0.04] backdrop-blur-sm transition-all hover:bg-primary hover:text-white group-hover:opacity-100 sm:opacity-0"
          title="Descargar Ficha Tecnica"
        >
          <IconPDF className="h-4 w-4" />
        </button>
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-white/90 px-2.5 py-1.5 shadow-sm ring-1 ring-black/[0.04] backdrop-blur-sm">
          <IconStar className="h-3 w-3 text-amber-500" />
          <span className="text-xs font-bold text-slate-800">{product.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{product.brand}</span>
          <span className="text-[10px] font-medium text-slate-400">SKU: {product.sku}</span>
        </div>
        <h3 className="mb-1.5 line-clamp-2 text-sm font-bold leading-snug text-[#121A47] transition-colors group-hover:text-primary">{product.name}</h3>
        <p className="mb-3 line-clamp-1 text-[11px] text-slate-400">{product.description}</p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {product.specs.slice(0, 3).map((spec, index) => (
            <span key={index} className="rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600">{spec}</span>
          ))}
        </div>
        <span className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#121A47] to-primary py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:shadow-lg hover:shadow-primary/20">
          <IconEye className="h-3.5 w-3.5" />Ver Detalles y Cotizar
        </span>
      </div>
    </Link>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
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
      className="group block cursor-pointer overflow-hidden rounded-[24px] border border-slate-200/50 bg-white transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(28,40,112,0.12)] hover:border-red-500/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(28,40,112,0.03)_0,transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        {product.image && (
          <Image
            src={product.image}
            alt={product.imageAlt ?? product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="relative z-10 object-contain drop-shadow-xl transition-transform duration-700 group-hover:scale-110"
          />
        )}
        {showBadge && (
          <span className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-red-600/30 ring-1 ring-white/20">
            <IconFire className="h-3 w-3 animate-pulse text-amber-300" />MAS VENDIDO
          </span>
        )}
        {/* Solo muestra el botón de PDF si el producto tiene ficha técnica cargada */}
        {product.fichaTecnica && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              window.open(product.fichaTecnica, "_blank", "noopener,noreferrer")
            }}
            className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-xl bg-white/95 px-3 py-2 text-[10px] font-bold text-[#cc1b1b] shadow-lg shadow-black/5 ring-1 ring-slate-200/50 backdrop-blur-md transition-all duration-300 hover:bg-[#cc1b1b] hover:text-white hover:shadow-[#cc1b1b]/30"
            title="Descargar Ficha Técnica (PDF)"
          >
            <IconPDF className="h-4 w-4" /> FICHA PDF
          </button>
        )}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1.5 shadow-sm ring-1 ring-black/[0.04] backdrop-blur-sm">
          <IconStar className="h-3 w-3 text-amber-400" />
          <span className="text-[10px] font-bold text-slate-800">{product.rating}</span>
        </div>
      </div>
      <div className="flex flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-md bg-[#1C2870] px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-sm">{product.brand}</span>
        </div>
        <h3 className="mb-2 line-clamp-2 min-h-[44px] text-[15px] font-extrabold leading-snug text-[#121A47] transition-colors group-hover:text-[#cc1b1b]">{product.name}</h3>
        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-slate-500">{product.description}</p>
        
        <div className="mb-6 flex flex-wrap gap-1.5">
          {product.medidas.slice(0, 3).map((spec, index) => (
            <span key={index} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-600">{spec}</span>
          ))}
        </div>
        
        <div className="mt-auto">
          <span className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-xs font-bold text-[#1C2870] transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#1C2870] group-hover:to-[#121A47] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#1C2870]/25">
            <IconEye className="h-4 w-4 transition-transform group-hover:scale-110" /> Ver Detalles
          </span>
        </div>
      </div>
    </Link>
  )
}

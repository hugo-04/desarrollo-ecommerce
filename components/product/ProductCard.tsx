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
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_16px_36px_rgba(28,40,112,0.10)]"
    >
      {/* ── Imagen ── */}
      <div className="relative aspect-square overflow-hidden bg-linear-to-b from-slate-50 to-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(28,40,112,0.04)_0,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {product.image && (
          <Image
            src={product.image}
            alt={product.imageAlt ?? product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="relative z-10 object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Best seller badge */}
        {showBadge && (
          <span className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-full bg-linear-to-r from-red-600 to-rose-500 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-md shadow-red-600/30">
            <IconFire className="h-2.5 w-2.5 animate-pulse text-amber-300" />
            Más vendido
          </span>
        )}

        {/* Rating badge */}
        <div className="absolute right-3 top-3 z-20 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
          <IconStar className="h-2.5 w-2.5 text-amber-400" />
          <span className="text-[9px] font-bold text-slate-700">{product.rating}</span>
        </div>

        {/* PDF button */}
        {product.fichaTecnica && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              window.open(product.fichaTecnica, "_blank", "noopener,noreferrer")
            }}
            className="absolute bottom-3 right-3 z-20 flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1.5 text-[9px] font-bold text-red-600 shadow-md ring-1 ring-slate-200/60 backdrop-blur-sm transition-all duration-300 hover:bg-red-600 hover:text-white"
            title="Descargar Ficha Técnica (PDF)"
          >
            <IconPDF className="h-3.5 w-3.5" /> PDF
          </button>
        )}
      </div>

      {/* ── Info ── */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Nombre */}
        <h3 className="mb-2 line-clamp-2 text-[13px] font-extrabold leading-snug text-[#121A47] transition-colors group-hover:text-primary sm:text-[15px]">
          {product.name}
        </h3>

        {/* Marca + Modelo */}
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-[12px]">
          <div className="flex items-center gap-1">
            <span className="font-black text-primary/90">Marca:</span>
            <span className="font-bold uppercase tracking-tight text-slate-600">
              {product.brands.join(", ")}
            </span>
          </div>
          {product.modelo && (
            <div className="flex items-center gap-1">
              <span className="font-black text-primary/90">Modelo:</span>
              <span className="font-bold text-slate-600">
                {product.modelo}
              </span>
            </div>
          )}
        </div>

        {/* Descripción */}
        <p className="mb-2 line-clamp-2 text-[11px] leading-relaxed text-slate-400 sm:text-[12px]">
          {product.description}
        </p>

        {/* Medidas */}
        {product.medidas.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {product.medidas.slice(0, 3).map((spec, index) => (
              <span
                key={index}
                className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[8px] font-semibold text-slate-500 sm:text-[9px]"
              >
                {spec}
              </span>
            ))}
            {product.medidas.length > 3 && (
              <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[8px] font-semibold text-slate-400 sm:text-[9px]">
                +{product.medidas.length - 3}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto">
          <span className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-100 py-2 text-[10px] font-bold text-[#1C2870] transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/25 sm:py-2.5 sm:text-[11px]">
            <IconEye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            Ver detalles
          </span>
        </div>
      </div>
    </Link>
  )
}

"use client"

import { IconWhatsApp, IconPDF, IconCheck } from "@/components/icons"
import { PRODUCT_DETAIL_CONTENT } from "@/lib/data/mock/static-content.mock"

interface ProductCTAProps {
  onCotizar: () => void
  onFichaTecnica: () => void
}

export function ProductCTA({ onCotizar, onFichaTecnica }: ProductCTAProps) {
  const c = PRODUCT_DETAIL_CONTENT
  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/80 to-white p-5 shadow-sm">
      <p className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
        {c.requestLabel}
      </p>

      <div className="flex gap-3">
        {/* Ficha Técnica */}
        <button
          onClick={onFichaTecnica}
          className="group flex flex-1 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-all duration-200 hover:border-red-200 hover:bg-red-50/40"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-200/70 bg-red-50">
            <IconPDF className="h-4 w-4 text-red-600" />
          </span>
          <span className="text-left">
            <span className="block text-xs font-semibold text-slate-800 leading-tight">
              {c.fichaTecnicaLabel}
            </span>
            <span className="block text-[10px] text-slate-400 mt-0.5 font-medium">
              {c.fichaTecnicaSubLabel}
            </span>
          </span>
        </button>

        {/* Cotizar */}
        <button
          onClick={onCotizar}
          className="group relative flex flex-[1.4] items-center gap-3 overflow-hidden rounded-xl bg-green-600 px-4 py-3.5 text-white shadow-md shadow-green-600/25 transition-all duration-300 hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/30"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20">
            <IconWhatsApp className="h-4 w-4" />
          </span>
          <span className="text-left">
            <span className="block text-xs font-bold leading-tight">{c.cotizarLabel}</span>
            <span className="block text-[10px] text-green-100/75 mt-0.5">{c.cotizarSubLabel}</span>
          </span>
        </button>
      </div>

      {/* Trust signal */}
      <div className="mt-3.5 flex items-center justify-center gap-1.5">
        <IconCheck className="h-3 w-3 shrink-0 text-emerald-500" />
        <p className="text-[11px] text-slate-400">{c.trustSignal}</p>
      </div>
    </div>
  )
}

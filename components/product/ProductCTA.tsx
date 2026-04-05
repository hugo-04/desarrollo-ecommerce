"use client"

import { IconWhatsApp, IconCheck } from "@/components/icons"
import { PRODUCT_DETAIL_CONTENT } from "@/lib/data/mock/static-content.mock"

interface ProductCTAProps {
  onCotizar: () => void
}

export function ProductCTA({ onCotizar }: ProductCTAProps) {
  const c = PRODUCT_DETAIL_CONTENT
  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/80 to-white p-5 shadow-sm">
      <p className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
        {c.requestLabel}
      </p>

      {/* Cotizar */}
      <button
        onClick={onCotizar}
        className="group relative flex w-full items-center gap-3 overflow-hidden rounded-xl bg-green-600 px-4 py-3.5 text-white shadow-md shadow-green-600/25 transition-all duration-300 hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/30"
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

      {/* Trust signal */}
      <div className="mt-3.5 flex items-center justify-center gap-1.5">
        <IconCheck className="h-3 w-3 shrink-0 text-emerald-500" />
        <p className="text-[11px] text-slate-400">{c.trustSignal}</p>
      </div>
    </div>
  )
}

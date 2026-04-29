"use client"

import { useState } from "react"
import { IconWhatsApp, IconX } from "@/components/icons"
import { WA, CONTACT } from "@/lib/contact"
import { PRODUCT_DETAIL_CONTENT } from "@/lib/data/mock/static-content.mock"
import type { Product } from "@/lib/types"

interface QuoteModalProps {
  product: Product
  onClose: () => void
}

export function QuoteModal({ product, onClose }: QuoteModalProps) {
  const [note, setNote] = useState("")
  const c = PRODUCT_DETAIL_CONTENT.quoteModal

  const handleSubmit = () => {
    const url = note
      ? `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
          `Hola, me gustaría solicitar cotización del producto:\n*${product.name}*\nMarca: ${product.brand}\n\nNota: ${note}`
        )}`
      : WA.producto(product.name, product.brand)
    window.open(url, "_blank")
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
        >
          <IconX className="h-4 w-4" />
        </button>

        <div className="mb-5">
          <div className="mb-1 flex items-center gap-2">
            <IconWhatsApp className="h-5 w-5 text-green-600" />
            <p className="text-xs font-bold uppercase tracking-wider text-green-700">
              {c.headerLabel}
            </p>
          </div>
          <h3 className="text-base font-extrabold text-[#121A47]">{product.name}</h3>
          <p className="text-xs text-slate-500">
            {product.brand}
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">{c.noteLabel}</label>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={c.notePlaceholder}
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm placeholder:text-slate-400 focus:border-green-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400/20"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 py-4 text-sm font-bold text-white shadow-lg shadow-green-600/25 transition-all hover:bg-green-700"
        >
          <IconWhatsApp className="h-5 w-5" />
          {c.submitLabel}
        </button>
        <p className="mt-3 text-center text-[10px] text-slate-400">{c.footer}</p>
      </div>
    </div>
  )
}

"use client"

import { IconStar, IconShield } from "@/components/icons"
import type { Product } from "@/lib/types"
import { PRODUCT_DETAIL_CONTENT } from "@/lib/data/mock/static-content.mock"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const c = PRODUCT_DETAIL_CONTENT
  return (
    <div>
      {/* Brand / SKU / Rating */}
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
          {product.brand}
        </span>
        <span className="text-xs text-slate-400">SKU: {product.sku}</span>
        <div className="flex items-center gap-1">
          <IconStar className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-xs font-bold text-slate-700">{product.rating}</span>
        </div>
      </div>

      {/* Name */}
      <h1 className="mb-3 text-xl font-extrabold text-[#121A47] lg:text-2xl">{product.name}</h1>

      {/* Stock badge */}
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {c.stockBadge}
        </span>
      </div>

      {/* Description */}
      <p className="mb-5 text-sm leading-relaxed text-slate-500">{product.fullDescription}</p>

      {/* Specs tags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {product.specs.map((spec, index) => (
          <span
            key={index}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Certification badge */}
      <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
        <div className="flex items-center gap-2">
          <IconShield className="h-5 w-5 text-blue-600" />
          <span className="text-xs font-bold text-blue-900">{c.certTitle}</span>
        </div>
        <p className="mt-1 text-xs text-blue-700">{c.certDesc}</p>
      </div>
    </div>
  )
}

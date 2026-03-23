"use client"

import { IconStar, IconShield } from "@/components/icons"
import type { Product } from "@/lib/types"
import { PRODUCT_DETAIL_CONTENT } from "@/lib/data/mock/static-content.mock"

interface ProductInfoProps {
  product: Product
}

// ─── Markdown renderer (bold + bullets) ──────────────────────────────────────

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-slate-700">{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

function MarkdownText({ text }: { text: string }) {
  const lines = text.split("\n")
  const result: React.ReactNode[] = []
  let listBuffer: string[] = []

  const flushList = (key: number) => {
    if (listBuffer.length === 0) return
    result.push(
      <ul key={`ul-${key}`} className="my-2 list-disc space-y-0.5 pl-5">
        {listBuffer.map((item, i) => (
          <li key={i} className="text-slate-500">{renderInline(item)}</li>
        ))}
      </ul>
    )
    listBuffer = []
  }

  lines.forEach((line, i) => {
    if (line.startsWith("- ") || line.startsWith("• ")) {
      listBuffer.push(line.slice(2))
    } else {
      flushList(i)
      if (line.trim()) {
        result.push(
          <p key={i} className="leading-relaxed text-slate-500">{renderInline(line)}</p>
        )
      }
    }
  })
  flushList(lines.length)

  return <div className="space-y-1 text-sm">{result}</div>
}

// ─── Component ────────────────────────────────────────────────────────────────

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

      {/* Descripción corta */}
      {product.description && (
        <p className="mb-4 text-sm leading-relaxed text-slate-500">{product.description}</p>
      )}

      {/* Descripción completa (markdown) */}
      {product.fullDescription && (
        <div className="mb-5">
          <MarkdownText text={product.fullDescription} />
        </div>
      )}

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

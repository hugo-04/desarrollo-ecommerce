"use client"

import { IconStar, IconShield, IconWhatsApp } from "@/components/icons"
import type { Product } from "@/lib/types"
import { PRODUCT_DETAIL_CONTENT } from "@/lib/data/mock/static-content.mock"
import { WA } from "@/lib/contact"

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
      {/* Rating */}
      <div className="mb-3 flex items-center gap-1">
        <IconStar className="h-3.5 w-3.5 text-amber-500" />
        <span className="text-xs font-bold text-slate-700">{product.rating}</span>
      </div>

      {/* Name */}
      <h1 className="mb-2 text-xl font-extrabold text-[#1e293b] lg:text-3xl">{product.name}</h1>

      {/* Marca + Modelo */}
      <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] lg:text-lg">
        <div className="flex items-center gap-1.5">
          <span className="font-black text-primary">Marca:</span>
          <span className="font-bold uppercase tracking-tight text-slate-600">
            {product.brands.join(", ")}
          </span>
        </div>
        {product.modelo && (
          <div className="flex items-center gap-1.5">
            <span className="font-black text-primary">Modelo:</span>
            <span className="font-bold text-slate-600">
              {product.modelo}
            </span>
          </div>
        )}
      </div>

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

      {/* Descripción completa */}
      {product.fullDescription && (
        <div className="mb-5">
          {/<[a-z][\s\S]*>/i.test(product.fullDescription) ? (
            <div
              className="prose prose-sm prose-slate max-w-none text-slate-500"
              dangerouslySetInnerHTML={{ __html: product.fullDescription }}
            />
          ) : (
            <MarkdownText text={product.fullDescription} />
          )}
        </div>
      )}

      {/* Medidas — debajo de la descripción */}
      {product.medidas.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Medidas:</span>
          {product.medidas.map((medida, index) => (
            <span
              key={index}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-500"
            >
              {medida}
            </span>
          ))}
        </div>
      )}

      {/* Certification badge */}
      <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
        <div className="flex items-center gap-2">
          <IconShield className="h-5 w-5 text-blue-600" />
          <span className="text-xs font-bold text-blue-900">{c.certTitle}</span>
        </div>
        <p className="mt-1 text-xs text-blue-700">{c.certDesc}</p>
      </div>

      {/* Botones de acción — Cotización directa al final */}
      <div className="mb-4 mt-2 flex flex-col gap-3 sm:flex-row">
        <a
          href={WA.producto(product.name, product.brands.join(", "), product.modelo)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:-translate-y-1 hover:bg-[#22c55e] hover:shadow-xl hover:shadow-green-500/30 active:scale-95"
        >
          <IconWhatsApp className="h-5 w-5" />
          Cotizar por WhatsApp
        </a>
      </div>
    </div>
  )
}

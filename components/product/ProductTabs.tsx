"use client"

import type { Product } from "@/lib/types"
import { PRODUCT_DETAIL_CONTENT } from "@/lib/data/mock/static-content.mock"

interface ProductTabsProps {
  product: Product
  activeTab: "desc" | "medidas"
  onTabChange: (tab: "desc" | "medidas") => void
}

export function ProductTabs({ product, activeTab, onTabChange }: ProductTabsProps) {
  const c = PRODUCT_DETAIL_CONTENT
  return (
    <div className="mt-12">
      <div className="mb-8 flex gap-6 border-b border-slate-200">
        <button
          onClick={() => onTabChange("desc")}
          className={`pb-4 text-sm font-semibold transition-colors ${
            activeTab === "desc"
              ? "border-b-2 border-primary text-primary"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          {c.tabDesc}
        </button>
        <button
          onClick={() => onTabChange("medidas")}
          className={`pb-4 text-sm font-semibold transition-colors ${
            activeTab === "medidas"
              ? "border-b-2 border-primary text-primary"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          {c.tabSpecs}
        </button>
      </div>

      {activeTab === "desc" ? (
        <div className="max-w-4xl space-y-6">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight border-b text-[#121A47]">
            Acerca de {product.name}
          </h2>
          <div className="leading-7 text-slate-700 text-base">
            {product.fullDescription ? (
              <p>{product.fullDescription}</p>
            ) : (
              <p className="text-slate-400 italic text-sm">
                Descripción técnica no disponible. Contáctenos para más información.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm max-w-4xl">
          {(product.technicalSpecs ?? []).map((spec, index) => (
            <div
              key={index}
              className={`flex items-center justify-between px-6 py-4 text-sm transition-colors hover:bg-slate-100/50 ${
                index % 2 === 0 ? "bg-slate-50" : "bg-white"
              }`}
            >
              <span className="font-medium text-slate-600">{spec.label}</span>
              <span className="font-bold text-[#121A47]">{spec.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

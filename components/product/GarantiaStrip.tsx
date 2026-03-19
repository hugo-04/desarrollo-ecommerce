"use client"

import { IconShield, IconCertificate, IconTools } from "@/components/icons"
import { PRODUCT_DETAIL_CONTENT } from "@/lib/data/mock/static-content.mock"

const iconMap = {
  shield: IconShield,
  certificate: IconCertificate,
  tools: IconTools,
}

export function GarantiaStrip() {
  const items = PRODUCT_DETAIL_CONTENT.garantia
  return (
    <div className="mt-10 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-3">
      {items.map((item, i) => {
        const Icon = iconMap[item.iconName as keyof typeof iconMap]
        return (
          <div key={i} className="flex items-start gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}>
              {Icon && <Icon className={`h-5 w-5 ${item.iconColor}`} />}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{item.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{item.desc}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

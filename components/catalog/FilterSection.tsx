"use client"

import { IconX } from "@/components/icons"

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  badge?: number
  onClear?: () => void
}

export function FilterSection({ title, children, badge, onClear }: FilterSectionProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{title}</h4>
        <div className="flex items-center gap-1.5">
          {badge ? (
            <span className="flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white">
              {badge}
            </span>
          ) : null}
          {badge && onClear ? (
            <button
              onClick={onClear}
              className="flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-500"
              title={`Limpiar ${title}`}
            >
              <IconX className="h-2.5 w-2.5" /> limpiar
            </button>
          ) : null}
        </div>
      </div>
      <div className="max-h-[200px] overflow-y-auto overscroll-contain rounded-lg border border-slate-100 bg-slate-50/50 py-1 custom-scrollbar">
        {children}
      </div>
    </div>
  )
}

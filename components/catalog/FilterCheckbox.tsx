"use client"

import { IconCheck } from "@/components/icons"

interface FilterCheckboxProps {
  checked: boolean
  label: string
  count?: number
  onChange: () => void
}

export function FilterCheckbox({ checked, label, count, onChange }: FilterCheckboxProps) {
  return (
    <button
      onClick={onChange}
      className={`group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
        checked ? "bg-primary/8 text-primary" : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
          checked ? "border-primary bg-primary" : "border-slate-300 group-hover:border-slate-400"
        }`}
      >
        {checked && <IconCheck className="h-2.5 w-2.5 text-white" />}
      </span>
      <span className={`flex-1 truncate font-medium ${checked ? "text-primary" : ""}`}>
        {label}
      </span>
      {count !== undefined && count > 0 && (
        <span className="shrink-0 text-[10px] text-slate-400">{count}</span>
      )}
    </button>
  )
}

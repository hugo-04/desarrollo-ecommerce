"use client"

/**
 * TechSpecsEditor — editor de parámetros técnicos (label/value) para la ficha técnica.
 *
 * Cada fila tiene un campo "Parámetro" y un campo "Valor",
 * más un icono de arrastre (visual) y un botón de eliminación.
 */

import { X, Plus, GripVertical } from "lucide-react"
import type { TechnicalSpec } from "@/lib/types"

/** Alias local para legibilidad — es el mismo tipo que `TechnicalSpec` de lib/types */
export type TechSpec = TechnicalSpec

interface TechSpecsEditorProps {
  values: TechnicalSpec[]
  onChange: (v: TechnicalSpec[]) => void
}

export function TechSpecsEditor({ values, onChange }: TechSpecsEditorProps) {
  function update(i: number, field: keyof TechnicalSpec, val: string) {
    const next = [...values]
    next[i] = { ...next[i], [field]: val }
    onChange(next)
  }

  return (
    <div>
      <label className="mb-0.5 block text-xs font-semibold text-slate-600">
        Parámetros técnicos
      </label>
      <p className="mb-3 text-[11px] text-slate-400">
        Aparecen en la ficha técnica del producto
      </p>

      <div className="space-y-2">
        {values.map((spec, i) => (
          <div key={i} className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 shrink-0 text-slate-300" />
            <input
              value={spec.label}
              onChange={(e) => update(i, "label", e.target.value)}
              placeholder="Lorem ipsum (ej: Lorem Ipsum)"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition focus:border-[#334155]/40 focus:ring-2 focus:ring-[#334155]/15"
            />
            <input
              value={spec.value}
              onChange={(e) => update(i, "value", e.target.value)}
              placeholder="Lorem (ej: Lorem ipsum)"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition focus:border-[#334155]/40 focus:ring-2 focus:ring-[#334155]/15"
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-100 text-red-400 transition hover:bg-red-50"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...values, { label: "", value: "" }])}
        className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#334155] transition hover:opacity-70"
      >
        <Plus className="h-3.5 w-3.5" /> Agregar parámetro
      </button>
    </div>
  )
}

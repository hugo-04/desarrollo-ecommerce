"use client"

/**
 * TagsEditor — editor de etiquetas (tags) con input + tecla Enter.
 *
 * Muestra los tags existentes como chips con botón de eliminación
 * y permite agregar nuevos escribiendo y presionando Enter o el botón "Agregar".
 *
 * Con `seoHint={true}` muestra validación SEO en tiempo real sobre el input:
 * detecta nombres muy cortos, genéricos o demasiado largos.
 */

import { useState } from "react"
import { X, Plus, AlertCircle, CheckCircle2 } from "lucide-react"

interface TagsEditorProps {
  label: string
  hint?: string
  values: string[]
  onChange: (v: string[]) => void
  placeholder?: string
  /** Activa feedback SEO en tiempo real sobre el nombre que se está escribiendo */
  seoHint?: boolean
}

const GENERIC_WORDS = ["otros", "general", "varios", "misc", "otro", "generales"]

function analyzeSeoName(text: string): string | null {
  if (!text.trim()) return null
  const words = text.trim().split(/\s+/)
  if (words.length < 2)
    return 'Tip SEO: usá 2 o más palabras descriptivas (ej: "Lorem Ipsum")'
  if (text.length > 45)
    return "Tip SEO: muy largo — máx. 45 caracteres para mejor indexación"
  if (GENERIC_WORDS.includes(text.trim().toLowerCase()))
    return 'Tip SEO: evitá nombres genéricos como "Otros" o "General"'
  return null // sin problema
}

export function TagsEditor({ label, hint, values, onChange, placeholder, seoHint }: TagsEditorProps) {
  const [input, setInput] = useState("")

  const seoWarning = seoHint ? analyzeSeoName(input) : null
  const seoOk      = seoHint && input.trim().length > 0 && seoWarning === null

  function add() {
    const tag = input.trim()
    if (tag && !values.includes(tag)) {
      onChange([...values, tag])
      setInput("")
    }
  }

  return (
    <div>
      <label className="mb-0.5 block text-xs font-semibold text-slate-600">{label}</label>
      {hint && <p className="mb-2 text-[11px] text-slate-400">{hint}</p>}

      {/* Chips actuales */}
      <div className="mb-2.5 flex min-h-[36px] flex-wrap gap-1.5">
        {values.map((v) => (
          <span
            key={v}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
          >
            {v}
            <button
              type="button"
              onClick={() => onChange(values.filter((x) => x !== v))}
              className="text-slate-300 transition hover:text-red-400"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>

      {/* Input para agregar */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add() } }}
          placeholder={placeholder ?? "Escribí y presioná Enter"}
          className={`flex-1 rounded-lg border px-3 py-2 text-xs outline-none transition focus:ring-2 ${
            seoWarning
              ? "border-amber-300 focus:border-amber-400 focus:ring-amber-100"
              : seoOk
              ? "border-green-300 focus:border-green-400 focus:ring-green-100"
              : "border-slate-200 focus:border-[#334155]/40 focus:ring-[#334155]/15"
          }`}
        />
        <button
          type="button"
          onClick={add}
          className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          <Plus className="h-3.5 w-3.5" /> Agregar
        </button>
      </div>

      {/* Feedback SEO */}
      {seoWarning && (
        <p className="mt-1 flex items-start gap-1 text-[11px] text-amber-600">
          <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" />
          {seoWarning}
        </p>
      )}
      {seoOk && (
        <p className="mt-1 flex items-center gap-1 text-[11px] text-green-600">
          <CheckCircle2 className="h-3 w-3" />
          Nombre SEO correcto
        </p>
      )}
    </div>
  )
}

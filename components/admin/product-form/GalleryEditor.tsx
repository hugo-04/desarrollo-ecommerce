"use client"

/**
 * GalleryEditor — grilla para gestionar imágenes adicionales del producto.
 *
 * Cada celda muestra la imagen + un campo alt text SEO debajo.
 * El último slot es siempre el botón "Agregar imagen".
 */

import { X, Plus, Info } from "lucide-react"
import { ImageUpload } from "@/components/ui/ImageUpload"

interface GalleryEditorProps {
  values: string[]
  onChange: (v: string[]) => void
  alts?: string[]
  onAltsChange?: (alts: string[]) => void
  /** Carpeta S3 destino — se pasa a cada ImageUpload */
  folder?: string
  tempKeys?: (string | null)[]
  onTempKeysChange?: (keys: (string | null)[]) => void
}

export function GalleryEditor({ values, onChange, alts = [], onAltsChange, folder, tempKeys = [], onTempKeysChange }: GalleryEditorProps) {
  function setAlt(index: number, alt: string) {
    const next = [...alts]
    next[index] = alt
    onAltsChange?.(next)
  }

  function setTempKey(index: number, key: string | null) {
    const next = [...tempKeys]
    next[index] = key
    onTempKeysChange?.(next)
  }

  function removeItem(index: number) {
    onChange(values.filter((_, j) => j !== index))
    onAltsChange?.((alts ?? []).filter((_, j) => j !== index))
    onTempKeysChange?.(tempKeys.filter((_, j) => j !== index))
  }

  function addItem() {
    onChange([...values, ""])
    onAltsChange?.([...alts, ""])
    onTempKeysChange?.([...tempKeys, null])
  }

  return (
    <div>
      <label className="mb-0.5 block text-xs font-semibold text-slate-600">
        Galería de imágenes
      </label>
      <p className="mb-3 text-[11px] text-slate-400">
        Imágenes adicionales para el carrusel (opcional)
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {values.map((url, i) => (
          <div key={i} className="group relative flex flex-col gap-1.5">
            {/* Imagen */}
            <div className="relative">
              <ImageUpload
                value={url}
                onChange={(v) => {
                  const next = [...values]
                  next[i] = v
                  onChange(next)
                }}
                onTempKey={(key) => setTempKey(i, key)}
                aspect="1/1"
                folder={folder}
              />
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="absolute -right-1.5 -top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-red-200 bg-white text-red-400 shadow-sm transition hover:bg-red-500 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>

            {/* Alt text SEO */}
            <div className="rounded-md border border-slate-100 bg-slate-50 px-2 py-1.5">
              <label className="mb-1 flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                <Info className="h-2.5 w-2.5 text-blue-400" />
                Alt SEO
              </label>
              <input
                type="text"
                value={alts[i] ?? ""}
                onChange={(e) => setAlt(i, e.target.value)}
                placeholder={`Imagen ${i + 1} del producto…`}
                className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700 outline-none transition focus:border-[#334155]/40 focus:ring-1 focus:ring-[#334155]/15"
              />
            </div>
          </div>
        ))}

        {/* Agregar imagen */}
        <button
          type="button"
          onClick={addItem}
          className="flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 transition hover:border-primary/40 hover:text-primary/60"
        >
          <Plus className="h-5 w-5" />
          <span className="text-xs font-medium">Agregar imagen</span>
        </button>
      </div>
    </div>
  )
}

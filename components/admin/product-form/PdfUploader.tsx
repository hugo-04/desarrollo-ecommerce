"use client"

/**
 * PdfUploader — sube un PDF a `/api/upload` y notifica la URL resultante.
 *
 * Muestra un área de drop visual antes de subir y una previsualización
 * con nombre de archivo y enlace "Ver archivo" una vez cargado.
 */

import { useState, useRef } from "react"
import { Upload, X, FileText, AlertCircle } from "lucide-react"

interface PdfUploaderProps {
  label: string
  value: string
  onChange: (url: string) => void
  onTempKey?: (key: string | null) => void
  onSeoNameChange?: (name: string) => void
}

function toSeoSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")
    .slice(0, 70)
}

export function PdfUploader({ label, value, onChange, onTempKey, onSeoNameChange }: PdfUploaderProps) {
  const inputRef              = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError]     = useState("")
  const [fileName, setFileName] = useState("")
  const [seoName, setSeoName] = useState("")

  async function handleFile(file: File) {
    setUploading(true)
    setError("")
    setFileName(file.name)
    const fd = new FormData()
    fd.append("file", file)
    if (seoName.trim()) fd.append("seoName", seoName.trim())
    // Las fichas técnicas siempre van a la carpeta de fichas en S3
    fd.append("folder", "productos/fichas")
    try {
      const res  = await fetch("/api/upload", { method: "POST", body: fd })
      let data: Record<string, unknown> = {}
      try { data = await res.json() } catch { /* respuesta no-JSON (502, nginx error, etc.) */ }
      if (!res.ok) throw new Error((data.error as string) ?? `Error al subir (${res.status})`)
      onChange(data.url as string)
      if (data.tempKey) onTempKey?.(data.tempKey as string)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al subir")
      setFileName("")
    } finally {
      setUploading(false)
    }
  }

  const seoSlug = toSeoSlug(seoName)

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</label>

      {value ? (
        /* Vista: archivo cargado */
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-100 bg-red-50">
            <FileText className="h-5 w-5 text-red-500" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-700">
              {fileName || "Ficha técnica cargada"}
            </p>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-primary underline-offset-2 hover:underline"
            >
              Ver archivo ↗
            </a>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Cambiar
            </button>
            <button
              type="button"
              onClick={() => { onChange(""); setFileName(""); onTempKey?.(null) }}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-100 text-red-400 transition hover:bg-red-50"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Vista: área de subida */
        <div
          onClick={() => inputRef.current?.click()}
          className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-slate-200 p-4 transition-all hover:border-primary/40 hover:bg-primary/[0.02]"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
            {uploading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              <Upload className="h-4 w-4 text-slate-400" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600">
              {uploading ? "Subiendo PDF…" : "Subir ficha técnica"}
            </p>
            <p className="text-xs text-slate-400">Opcional · Solo PDF · Máx. 10 MB</p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />

      {/* Campo SEO name */}
      <div className="mt-3">
        <label className="mb-1 block text-xs font-semibold text-slate-600">
          Nombre SEO del PDF
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={seoName}
            onChange={(e) => { setSeoName(e.target.value); onSeoNameChange?.(e.target.value) }}
            placeholder='Ej: "lorem-ipsum-ficha-tecnica"'
            className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="button"
            onClick={() => setSeoName(toSeoSlug(seoName))}
            className="rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 whitespace-nowrap"
          >
            Auto-formatear
          </button>
        </div>
        {seoName && (
          <p className="mt-1 font-mono text-[10px] text-slate-400">
            {seoSlug}.pdf
          </p>
        )}
      </div>

      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
          <AlertCircle className="h-3 w-3" /> {error}
        </p>
      )}
    </div>
  )
}

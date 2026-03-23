"use client"

/**
 * ImageUpload — Carga de imágenes con soporte SEO.
 *
 * Características:
 *  - Drag & drop con react-dropzone
 *  - Zoom de preview vía Radix Dialog
 *  - Badge con dimensiones reales de la imagen
 *  - Tip con tamaño SEO recomendado según el aspect ratio
 *  - Campo de alt text: se usa como nombre del archivo subido (SEO)
 *
 * Props:
 *   value        — URL actual (controlado)
 *   onChange     — callback con la nueva URL
 *   altValue     — texto alt actual (controlado; si se omite no muestra el campo)
 *   onAltChange  — callback con el nuevo alt text
 *   label        — etiqueta visible
 *   required     — muestra asterisco y valida
 *   error        — mensaje de error externo
 *   aspect       — ratio del preview (default "4/3")
 */

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import * as Dialog from "@radix-ui/react-dialog"
import { ImagePlus, AlertCircle, ZoomIn, Info, X, Wand2, CheckCircle2 } from "lucide-react"

// Tamaños SEO recomendados por aspect ratio
const SEO_SIZE_TIP: Record<string, string> = {
  "1/1":  "800×800 px recomendado",
  "4/3":  "1200×900 px recomendado",
  "16/9": "1200×675 px recomendado",
}

/** Convierte texto libre a slug SEO-friendly */
function toSeoSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")   // quita acentos
    .replace(/[^a-z0-9\s-]/g, "")                       // solo letras, números, espacios, guiones
    .trim()
    .replace(/\s+/g, "-")                               // espacios → guiones
    .replace(/-{2,}/g, "-")                             // guiones dobles → uno
    .slice(0, 70)
}

interface SeoIssue { code: string; msg: string }

/** Detecta problemas SEO en el alt text */
function analyzeSeo(text: string): SeoIssue[] {
  if (!text) return []
  const issues: SeoIssue[] = []
  if (/[A-ZÁÉÍÓÚÑ]/.test(text))         issues.push({ code: "case",    msg: "Tiene mayúsculas — Google prefiere minúsculas" })
  if (/ /.test(text))                    issues.push({ code: "spaces",  msg: "Tiene espacios — usá guiones en su lugar" })
  if (/[áéíóúüñÁÉÍÓÚÜÑ]/.test(text))    issues.push({ code: "accent",  msg: "Tiene acentos — quitarlos mejora la URL" })
  if (text.replace(/-/g, " ").trim().split(/\s+/).length < 2)
                                          issues.push({ code: "short",   msg: "Muy corto — describí la imagen con 2-4 palabras" })
  if (text.length > 70)                  issues.push({ code: "long",    msg: "Muy largo — máx. 70 caracteres para SEO" })
  if (/\b(imagen|foto|image|img|pic)\b/i.test(text))
                                          issues.push({ code: "generic", msg: 'Evitá palabras genéricas como "imagen" o "foto"' })
  return issues
}

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  altValue?: string
  onAltChange?: (alt: string) => void
  label?: string
  required?: boolean
  error?: string
  aspect?: string
}

export function ImageUpload({
  value,
  onChange,
  altValue,
  onAltChange,
  label,
  required,
  error,
  aspect = "4/3",
}: ImageUploadProps) {
  const [uploading, setUploading]       = useState(false)
  const [uploadError, setUploadError]   = useState("")
  const [dimensions, setDimensions]     = useState<{ w: number; h: number } | null>(null)

  const uploadFile = useCallback(
    async (file: File) => {
      setUploading(true)
      setUploadError("")
      const fd = new FormData()
      fd.append("file", file)
      // Nombre SEO: usamos el alt text como filename para que la URL sea amigable para Google
      const seoName = (altValue ?? "").trim()
      if (seoName) fd.append("seoName", seoName)
      try {
        const res  = await fetch("/api/upload", { method: "POST", body: fd })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error ?? "Error al subir")
        onChange(data.url)
      } catch (e: unknown) {
        setUploadError(e instanceof Error ? e.message : "Error al subir")
      } finally {
        setUploading(false)
      }
    },
    [onChange, altValue],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    disabled: uploading,
    onDropAccepted: ([file]) => uploadFile(file),
    onDropRejected: (rejected) => {
      const code = rejected[0]?.errors[0]?.code
      if (code === "file-too-large")    setUploadError("El archivo excede 5 MB")
      else if (code === "file-invalid-type") setUploadError("Solo JPG, PNG o WebP")
      else setUploadError("Archivo no válido")
    },
  })

  const sizeTip      = SEO_SIZE_TIP[aspect] ?? "1200×900 px recomendado"
  const displayError = error || uploadError
  const showAltField = onAltChange !== undefined

  return (
    <div className="space-y-2.5">
      {label && (
        <label className="flex items-center gap-0.5 text-xs font-semibold text-slate-600">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {value ? (
        /* ── Preview ──────────────────────────────────────────────── */
        <div
          className="group relative overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50"
          style={{ aspectRatio: aspect }}
        >
          <img
            src={value}
            alt={altValue || "preview"}
            className="h-full w-full object-contain p-4"
            onLoad={(e) => {
              const img = e.currentTarget
              setDimensions({ w: img.naturalWidth, h: img.naturalHeight })
            }}
          />

          {/* Badge de dimensiones reales */}
          {dimensions && (
            <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/55 px-2 py-0.5">
              <span className="font-mono text-[10px] text-white/90">
                {dimensions.w}×{dimensions.h}px
              </span>
            </div>
          )}

          {/* Overlay con acciones */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/45 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
            {/* Zoom */}
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  title="Ver tamaño completo"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 shadow-lg transition hover:bg-white"
                >
                  <ZoomIn className="h-4 w-4 text-slate-700" />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 outline-none">
                  <img
                    src={value}
                    alt={altValue || "preview"}
                    className="max-h-[85vh] max-w-[88vw] rounded-xl object-contain shadow-2xl"
                  />
                  {dimensions && (
                    <p className="mt-2 text-center font-mono text-xs text-white/60">
                      {dimensions.w}×{dimensions.h}px
                    </p>
                  )}
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-lg text-slate-500 transition hover:text-slate-900"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            {/* Cambiar */}
            <button
              type="button"
              {...getRootProps()}
              className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-lg hover:bg-slate-50"
            >
              <input {...getInputProps()} />
              Cambiar
            </button>

            {/* Quitar */}
            <button
              type="button"
              onClick={() => { onChange(""); setDimensions(null) }}
              className="rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-red-600"
            >
              Quitar
            </button>
          </div>
        </div>
      ) : (
        /* ── Drop zone ─────────────────────────────────────────────── */
        <div
          {...getRootProps()}
          className={`flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-all ${
            isDragActive
              ? "border-primary bg-primary/5 scale-[1.01]"
              : displayError
              ? "border-red-300 bg-red-50"
              : "border-slate-200 bg-slate-50/50 hover:border-primary/50 hover:bg-primary/[0.02]"
          }`}
        >
          <input {...getInputProps()} />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-xs font-medium text-slate-500">Subiendo imagen…</p>
            </div>
          ) : (
            <>
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 border-dashed ${
                  displayError ? "border-red-300" : "border-slate-200"
                }`}
              >
                <ImagePlus className={`h-5 w-5 ${displayError ? "text-red-400" : "text-slate-300"}`} />
              </div>
              <div className="text-center">
                <p className={`text-sm font-semibold ${displayError ? "text-red-500" : "text-slate-600"}`}>
                  {isDragActive ? "Soltá la imagen aquí" : "Arrastrá o hacé clic para subir"}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">JPG, PNG, WebP — máx. 5 MB</p>
              </div>
              {/* Tip SEO de tamaño */}
              <div className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-[11px] text-blue-600">
                <Info className="h-3 w-3 shrink-0" />
                <span>SEO: {sizeTip}, WebP preferido</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* URL directa (alternativa al drag & drop) */}
      {!value && !uploading && (
        <input
          type="text"
          placeholder="O pegá una URL de imagen"
          onChange={(e) => { if (e.target.value) onChange(e.target.value) }}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 outline-none transition focus:border-[#1C2870]/40 focus:ring-2 focus:ring-[#1C2870]/15"
        />
      )}

      {/* Campo Alt text / SEO — solo si el padre lo controla */}
      {showAltField && (
        <SeoAltField value={altValue ?? ""} onChange={onAltChange!} />
      )}

      {displayError && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertCircle className="h-3 w-3" />
          {displayError}
        </p>
      )}
    </div>
  )
}

// ─── Campo SEO con validación en tiempo real ──────────────────────────────────

function SeoAltField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const issues  = analyzeSeo(value)
  const slug    = toSeoSlug(value)
  const isClean = value.length > 0 && issues.length === 0
  const needsFix = issues.some(i => ["case", "spaces", "accent"].includes(i.code))

  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 space-y-2">
      {/* Label + botón auto-formatear */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
          <Info className="h-3 w-3 text-blue-400" />
          Nombre SEO (alt text)
        </label>
        {needsFix && (
          <button
            type="button"
            onClick={() => onChange(slug)}
            className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700 transition hover:bg-blue-200"
          >
            <Wand2 className="h-2.5 w-2.5" />
            Auto-formatear
          </button>
        )}
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Ej: "aislador-polimerico-22kv-schneider-electric"'
        className={`w-full rounded-md border bg-white px-3 py-2 text-xs text-slate-700 outline-none transition focus:ring-2 ${
          isClean
            ? "border-green-300 focus:border-green-400 focus:ring-green-100"
            : issues.length > 0
            ? "border-amber-300 focus:border-amber-400 focus:ring-amber-100"
            : "border-slate-200 focus:border-[#1C2870]/40 focus:ring-[#1C2870]/15"
        }`}
      />

      {/* Preview del nombre de archivo */}
      {value && (
        <div className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1">
          <span className="text-[10px] text-slate-400">Archivo:</span>
          <span className="font-mono text-[10px] text-slate-600 truncate">{slug}.jpg</span>
          {isClean && <CheckCircle2 className="ml-auto h-3 w-3 shrink-0 text-green-500" />}
        </div>
      )}

      {/* Advertencias SEO */}
      {issues.length > 0 && (
        <ul className="space-y-0.5">
          {issues.map((issue) => (
            <li key={issue.code} className="flex items-start gap-1 text-[10px] text-amber-700">
              <AlertCircle className="mt-0.5 h-2.5 w-2.5 shrink-0" />
              {issue.msg}
            </li>
          ))}
        </ul>
      )}

      {isClean && (
        <p className="text-[10px] text-green-600 flex items-center gap-1">
          <CheckCircle2 className="h-2.5 w-2.5" />
          Nombre SEO correcto
        </p>
      )}

      <p className="text-[10px] text-slate-400">
        El archivo se guardará con este nombre — mejora el posicionamiento en Google Imágenes.
      </p>
    </div>
  )
}

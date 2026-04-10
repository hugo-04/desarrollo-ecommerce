"use client"

/**
 * CategoryForm — Formulario para crear y editar categorías.
 *
 * Layout:
 *   Fila 1 (grid 2 cols): Nombre | Slug — los dos campos más importantes juntos
 *   Fila 2 (full width):  Subcategorías como chips
 *
 * Lógica SEO:
 *   - Slug se auto-genera desde el nombre (con posibilidad de edición manual)
 *   - Tips SEO en tiempo real para nombre y subcategorías
 *   - Color de la categoría se asigna automáticamente desde una paleta armónica
 *
 * Validación:
 *   Toda la validación usa Zod (importado desde features/categorias/schemas.ts).
 */

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Info, CheckCircle2, Layers, Hash, Star } from "lucide-react"
import { TagsEditor } from "@/components/admin/product-form/TagsEditor"
import { DeleteDialog } from "@/components/admin/DeleteDialog"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { categorySchema, type CatErrors } from "@/features/categorias/schemas"
import type { CategoryDTO } from "@/features/categorias/types"

// ── Paleta armónica ────────────────────────────────────────────────────────────
// Tonalidades que coinciden con el diseño del sitio (navy + slate + acentos).
// Se asigna automáticamente según el nombre — mismo nombre, mismo color siempre.
const COLOR_PALETTE = [
  "from-[#1C2870] to-[#151f5c]",
  "from-blue-700 to-blue-900",
  "from-indigo-700 to-[#1C2870]",
  "from-slate-600 to-slate-800",
  "from-cyan-700 to-blue-900",
  "from-sky-700 to-indigo-900",
  "from-slate-700 to-zinc-900",
  "from-blue-800 to-indigo-950",
]

/** Asigna un color de la paleta de forma determinística según el nombre */
function autoColor(name: string): string {
  let hash = 0
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return COLOR_PALETTE[hash % COLOR_PALETTE.length]
}

/** Convierte texto a slug SEO-friendly */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")
}

// ── Props ──────────────────────────────────────────────────────────────────────

interface CategoryFormProps {
  initialData?: CategoryDTO
  onSave: (data: Omit<CategoryDTO, "id" | "count">) => Promise<void>
  onDelete?: () => Promise<void>
}

// ── Componente ─────────────────────────────────────────────────────────────────

export function CategoryForm({ initialData, onSave, onDelete }: CategoryFormProps) {
  const router    = useRouter()
  const isEditing = !!initialData

  const [name,        setName]        = useState(initialData?.name           ?? "")
  const [slug,        setSlug]        = useState(initialData?.slug           ?? "")
  const [description, setDescription] = useState(initialData?.description   ?? "")
  const [subcats,     setSubcats]     = useState<string[]>(initialData?.subcategories ?? [])
  const [image,        setImage]        = useState(initialData?.image    ?? "")
  const [imageAlt,     setImageAlt]     = useState(initialData?.imageAlt ?? "")
  const [imageTempKey, setImageTempKey] = useState<string | null>(null)
  const [featured,     setFeatured]     = useState(initialData?.featured ?? false)
  const [saving,   setSaving]   = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error,    setError]    = useState("")
  const [errors,   setErrors]   = useState<CatErrors>({})

  // Indica si el slug fue editado manualmente (para no sobreescribirlo)
  const slugManual = useRef(isEditing)

  function handleNameChange(v: string) {
    setName(v)
    if (errors.name) setErrors((p) => ({ ...p, name: undefined }))
    if (!slugManual.current) setSlug(slugify(v))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")

    const result = categorySchema.safeParse({
      name:        name.trim(),
      slug:        slug.trim(),
      description: description.trim() || undefined,
    })
    if (!result.success) {
      const errs: CatErrors = {}
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof CatErrors
        if (!errs[k]) errs[k] = issue.message
      }
      setErrors(errs)
      setSaving(false)
      return
    }
    setErrors({})

    try {
      // Finalizar imagen con nombre SEO si hay un upload temporal pendiente
      let finalImage = image
      if (imageTempKey) {
        const res  = await fetch("/api/upload/finalize", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({
            tempKey: imageTempKey,
            seoName: imageAlt.trim() || slugify(name),
            folder:  "categorias/imagenes",
          }),
        })
        let data: Record<string, unknown> = {}
        try { data = await res.json() } catch { /* respuesta no-JSON (502, nginx error, etc.) */ }
        if (!res.ok) throw new Error((data.error as string) ?? `Error al finalizar subida (${res.status})`)
        if (res.ok) { finalImage = data.url as string; setImage(data.url as string) }
        setImageTempKey(null)
      }

      await onSave({
        name:          name.trim(),
        slug:          slug.trim() || slugify(name.trim()),
        description:   description.trim() || undefined,
        image:         finalImage,
        imageAlt:      imageAlt.trim() || undefined,
        color:         initialData?.color || autoColor(name.trim()),
        subcategories: subcats,
        featured,
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al guardar")
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!onDelete) return
    setDeleting(true)
    try { await onDelete() } catch { setDeleting(false) }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-[#1C2870]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1C2870]/15"

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Error global */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ── Fila 1: Nombre + Slug (lado a lado) ─────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1C2870]/8">
            <Layers className="h-3.5 w-3.5 text-[#1C2870]" />
          </div>
          <h2 className="text-sm font-semibold text-slate-700">Información de la categoría</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Nombre */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Ej: Aisladores AT/MT"
              required
              className={inputClass}
            />
            {errors.name ? (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            ) : name && name.trim().split(/\s+/).length < 2 ? (
              <p className="mt-1 flex items-center gap-1 text-[11px] text-amber-600">
                <Info className="h-3 w-3 shrink-0" />
                Tip SEO: usá 2+ palabras descriptivas
              </p>
            ) : name.trim().length >= 4 ? (
              <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600">
                <CheckCircle2 className="h-3 w-3 shrink-0" />
                Nombre SEO correcto
              </p>
            ) : null}
          </div>

          {/* Slug */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">
              Slug (URL) <span className="text-red-500">*</span>
            </label>
            <p className="mb-1.5 text-[11px] text-slate-400">
              Auto-generado · podés editarlo
            </p>
            <div className="flex items-center gap-1.5">
              <Hash className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              <input
                value={slug}
                onChange={(e) => {
                  slugManual.current = true
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                  if (errors.slug) setErrors((p) => ({ ...p, slug: undefined }))
                }}
                placeholder="aisladores-at-mt"
                required
                className={`${inputClass} font-mono text-xs`}
              />
            </div>
            {errors.slug ? (
              <p className="mt-1 text-xs text-red-500">{errors.slug}</p>
            ) : slug && slug.split("-").filter(Boolean).length < 2 ? (
              <p className="mt-1 flex items-center gap-1 text-[11px] text-amber-600">
                <Info className="h-3 w-3 shrink-0" />
                Tip SEO: 2+ palabras (ej: <code>aisladores-at</code>)
              </p>
            ) : slug ? (
              <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600">
                <CheckCircle2 className="h-3 w-3 shrink-0" />
                Slug SEO correcto
              </p>
            ) : null}
          </div>
        </div>

        {/* Descripción SEO */}
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-600">
              Descripción SEO
              <span className="ml-1.5 text-[11px] font-normal text-slate-400">(meta description para Google)</span>
            </label>
            <span className={`text-[11px] tabular-nums ${
              description.length === 0      ? "text-slate-400"
              : description.length < 100   ? "text-amber-500"
              : description.length <= 155  ? "text-emerald-600"
              :                              "text-red-500"
            }`}>
              {description.length} / 155
            </span>
          </div>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
              if (errors.description) setErrors((p) => ({ ...p, description: undefined }))
            }}
            placeholder="Ej: Grapas de anclaje tipo pistola, suspensión y preformadas para conductores AAAC y cable ABC en líneas de alta y media tensión."
            rows={3}
            maxLength={200}
            className={`${inputClass} resize-none ${errors.description ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
          />
          {errors.description ? (
            <p className="mt-1 flex items-center gap-1 text-[11px] text-red-500">
              <Info className="h-3 w-3 shrink-0" />
              {errors.description}
            </p>
          ) : description.length === 0 ? (
            <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
              <Info className="h-3 w-3 shrink-0" />
              Aparece bajo el título en resultados de Google. Objetivo: 130–155 caracteres.
            </p>
          ) : description.length < 100 ? (
            <p className="mt-1 flex items-center gap-1 text-[11px] text-amber-600">
              <Info className="h-3 w-3 shrink-0" />
              Muy corta — ampliá con especificaciones técnicas o contexto de uso.
            </p>
          ) : description.length <= 155 ? (
            <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600">
              <CheckCircle2 className="h-3 w-3 shrink-0" />
              Longitud ideal para Google ({description.length} chars)
            </p>
          ) : (
            <p className="mt-1 flex items-center gap-1 text-[11px] text-red-500">
              <Info className="h-3 w-3 shrink-0" />
              Demasiado larga — Google la cortará en {description.length - 155} caracteres.
            </p>
          )}
        </div>
      </div>

      {/* ── Fila 2: Imagen (opcional) ────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1C2870]/8">
            <Star className="h-3.5 w-3.5 text-[#1C2870]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-700">Imagen de la categoría</h2>
            <p className="text-[11px] text-slate-400">Opcional — se muestra en la grilla del home si la categoría es destacada</p>
          </div>
        </div>
        <ImageUpload
          value={image}
          onChange={setImage}
          onTempKey={setImageTempKey}
          altValue={imageAlt}
          onAltChange={setImageAlt}
          label="Imagen representativa"
          aspect="4/3"
          folder="categorias/imagenes"
        />
      </div>

      {/* ── Fila 3: Subcategorías ─────────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <TagsEditor
          label="Subcategorías"
          hint="Escribí el nombre y presioná Enter. Cada subcategoría es un chip independiente."
          values={subcats}
          onChange={setSubcats}
          placeholder="Ej: Aisladores Poliméricos"
          seoHint
        />
      </div>

      {/* ── Fila 4: Destacada en home ─────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="flex cursor-pointer items-start gap-4">
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="peer sr-only"
            />
            <div className="h-5 w-5 rounded border-2 border-slate-300 bg-white transition-colors peer-checked:border-[#1C2870] peer-checked:bg-[#1C2870] flex items-center justify-center">
              {featured && (
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Mostrar en el home</p>
            <p className="mt-0.5 text-xs text-slate-500">
              La categoría aparecerá en la grilla de "Nuestras Categorías" de la página principal.
              Se recomienda tener imagen cargada.
            </p>
          </div>
        </label>
      </div>

      {/* ── Barra de acciones ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={saving || deleting}
            className="bg-[#1C2870] px-6 hover:bg-[#1C2870]/90"
          >
            {saving
              ? isEditing ? "Guardando…" : "Creando…"
              : isEditing ? "Guardar cambios" : "Crear categoría"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={saving || deleting}
          >
            Cancelar
          </Button>
        </div>

        {onDelete && (
          <DeleteDialog
            trigger={
              <Button
                type="button"
                variant="outline"
                disabled={deleting || saving}
                className="border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
              >
                {deleting ? "Eliminando…" : "Eliminar categoría"}
              </Button>
            }
            itemName={initialData?.name ?? "esta categoría"}
            onConfirm={handleDelete}
          />
        )}
      </div>

    </form>
  )
}

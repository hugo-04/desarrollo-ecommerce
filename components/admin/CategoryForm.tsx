"use client"

/**
 * CategoryForm — Formulario compartido para crear y editar categorías.
 *
 * Características:
 *  - Auto-generación de slug desde el nombre (con edición manual)
 *  - Subcategorías como lista de chips (TagsEditor) — nunca texto libre
 *  - Imagen con SEO alt text
 *  - Modo crear / modo editar según si se pasa `initialData`
 */

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Info, CheckCircle2 } from "lucide-react"
import { categorySchema, type CatErrors } from "@/features/categorias/schemas"
import { TagsEditor } from "@/components/admin/product-form/TagsEditor"
import { DeleteDialog } from "@/components/admin/DeleteDialog"
import { Button } from "@/components/ui/button"
import type { CategoryDTO } from "@/features/categorias/types"

/**
 * Paleta armónica con el diseño del sitio (navy/slate primario + acentos).
 * Se asigna automáticamente según el nombre de la categoría — mismo nombre,
 * mismo color siempre (hash determinístico).
 */
const COLOR_PALETTE = [
  "from-[#1C2870] to-[#151f5c]",    // navy marca (primary)
  "from-blue-700 to-blue-900",       // azul eléctrico
  "from-indigo-700 to-[#1C2870]",    // índigo → marca
  "from-slate-600 to-slate-800",     // slate neutro
  "from-cyan-700 to-blue-900",       // cian técnico
  "from-sky-700 to-indigo-900",      // cielo profundo
  "from-slate-700 to-zinc-900",      // carbón
  "from-blue-800 to-indigo-950",     // azul profundo
]

/** Asigna un color de la paleta de forma determinística según el nombre */
function autoColor(name: string): string {
  let hash = 0
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return COLOR_PALETTE[hash % COLOR_PALETTE.length]
}

interface CategoryFormProps {
  initialData?: CategoryDTO
  onSave: (data: Omit<CategoryDTO, "id" | "count">) => Promise<void>
  onDelete?: () => Promise<void>
}

/** Convierte texto a slug: minúsculas, sin acentos, guiones */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")
}

export function CategoryForm({ initialData, onSave, onDelete }: CategoryFormProps) {
  const router    = useRouter()
  const isEditing = !!initialData

  const [name, setName]                 = useState(initialData?.name ?? "")
  const [slug, setSlug]                 = useState(initialData?.slug ?? "")
  const [color, setColor]               = useState(initialData?.color ?? "from-[#1C2870] to-[#1C2870]/80")
  const [subcategories, setSubcats] = useState<string[]>(initialData?.subcategories ?? [])
  const [saving, setSaving]         = useState(false)
  const [deleting, setDeleting]         = useState(false)
  const [error, setError]               = useState("")
  const [errors, setErrors]             = useState<CatErrors>({})

  // Indica si el usuario modificó el slug manualmente (no auto-generar más)
  const slugManual = useRef(isEditing)

  function handleNameChange(v: string) {
    setName(v)
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
    if (!slugManual.current) {
      setSlug(slugify(v))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")

    const result = categorySchema.safeParse({ name: name.trim(), slug: slug.trim() })
    if (!result.success) {
      const errs: CatErrors = {}
      for (const issue of result.error.issues) {
        const k = issue.path[0] as "name" | "slug"
        if (!errs[k]) errs[k] = issue.message
      }
      setErrors(errs)
      setSaving(false)
      return
    }
    setErrors({})

    try {
      await onSave({
        name:          name.trim(),
        slug:          slug.trim() || slugify(name),
        image:         initialData?.image ?? "",
        color:         initialData?.color || autoColor(name.trim()),
        subcategories,
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al guardar")
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!onDelete) return
    setDeleting(true)
    try {
      await onDelete()
    } catch {
      setDeleting(false)
    }
  }

  const inputClass = "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Información */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
        <h2 className="text-sm font-semibold text-slate-700">Información de la categoría</h2>

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
            <p className="mt-1 text-[11px] text-amber-600 flex items-center gap-1">
              <Info className="h-3 w-3" /> Tip SEO: usá 2 o más palabras descriptivas (ej: "Aisladores Poliméricos AT/MT")
            </p>
          ) : name.trim().length >= 4 ? (
            <p className="mt-1 text-[11px] text-green-600 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Nombre SEO correcto
            </p>
          ) : null}
        </div>

        {/* Slug */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            Slug (URL) <span className="text-red-500">*</span>
          </label>
          <p className="mb-1.5 text-[11px] text-slate-400">
            Se auto-genera desde el nombre — podés editarlo manualmente.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">/categorias/</span>
            <input
              value={slug}
              onChange={(e) => {
                slugManual.current = true
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                if (errors.slug) setErrors((prev) => ({ ...prev, slug: undefined }))
              }}
              placeholder="aisladores"
              required
              className={`${inputClass} font-mono text-xs`}
            />
          </div>
          {errors.slug ? (
            <p className="mt-1 text-xs text-red-500">{errors.slug}</p>
          ) : slug && slug.split("-").filter(Boolean).length < 2 ? (
            <p className="mt-1 text-[11px] text-amber-600 flex items-center gap-1">
              <Info className="h-3 w-3" /> Tip SEO: usá al menos 2 palabras (ej: <code>aisladores-porcelana</code>)
            </p>
          ) : slug ? (
            <p className="mt-1 text-[11px] text-green-600 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Slug SEO correcto
            </p>
          ) : null}
        </div>

        {/* Subcategorías — siempre como lista de chips */}
        <TagsEditor
          label="Subcategorías"
          hint="Escribí el nombre y presioná Enter o el botón Agregar. Cada subcategoría es un chip independiente."
          values={subcategories}
          onChange={setSubcats}
          placeholder="Ej: Aisladores Poliméricos"
          seoHint
        />
      </div>

      {/* Acciones */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={saving || deleting}
            className="bg-primary px-6 hover:bg-primary/90"
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

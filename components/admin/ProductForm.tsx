"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { createProductAction, updateProductAction } from "@/features/productos/actions"
import type { Product } from "@/lib/types"
import type { CategoryDTO } from "@/features/categorias/types"
import type { Brand } from "@/lib/types"

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductFormProps {
  product?: Product          // undefined = crear, definido = editar
  categories: CategoryDTO[]
  brands: Brand[]
}

interface TechSpec { label: string; value: string }

// ─── Image Uploader ───────────────────────────────────────────────────────────

function ImageUploader({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (url: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  async function handleFile(file: File) {
    setUploading(true)
    setError("")
    const fd = new FormData()
    fd.append("file", file)
    try {
      const res  = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      onChange(data.url)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al subir")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</label>

      {/* Preview */}
      {value && (
        <div className="mb-2 relative h-32 w-32 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <img src={value} alt="preview" className="h-full w-full object-contain p-2" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-1 top-1 rounded-full bg-red-500 px-1.5 text-[10px] text-white"
          >✕</button>
        </div>
      )}

      <div className="flex gap-2">
        {/* Upload file */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          {uploading ? "Subiendo…" : "📁 Subir archivo"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
        />

        {/* Or URL */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="O pegar URL de imagen"
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-[#1C2870]/20"
        />
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

// ─── File Uploader (PDF ficha técnica) ───────────────────────────────────────

function FileUploader({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (url: string) => void
}) {
  const inputRef  = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  async function handleFile(file: File) {
    setUploading(true)
    setError("")
    const fd = new FormData()
    fd.append("file", file)
    try {
      const res  = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      onChange(data.url)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al subir")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          {uploading ? "Subiendo…" : "📄 Subir PDF"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
        />
        {value && (
          <a href={value} target="_blank" rel="noopener noreferrer"
             className="text-xs text-[#1C2870] underline">
            Ver archivo actual
          </a>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

// ─── Dynamic tags (specs cortas) ──────────────────────────────────────────────

function TagsEditor({ label, values, onChange }: { label: string; values: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState("")
  const add = () => {
    const tag = input.trim()
    if (tag && !values.includes(tag)) { onChange([...values, tag]); setInput("") }
  }
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</label>
      <div className="mb-2 flex flex-wrap gap-1.5">
        {values.map((v) => (
          <span key={v} className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            {v}
            <button type="button" onClick={() => onChange(values.filter((x) => x !== v))}
                    className="text-slate-400 hover:text-red-500">✕</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add() }}}
          placeholder="Ej: 22kV, ANSI C29.1"
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#1C2870]/20"
        />
        <button type="button" onClick={add}
                className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200">
          + Agregar
        </button>
      </div>
    </div>
  )
}

// ─── Dynamic key-value (ficha técnica) ───────────────────────────────────────

function TechSpecsEditor({ values, onChange }: { values: TechSpec[]; onChange: (v: TechSpec[]) => void }) {
  const update = (i: number, field: keyof TechSpec, val: string) => {
    const next = [...values]
    next[i] = { ...next[i], [field]: val }
    onChange(next)
  }
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        Ficha Técnica (parámetros)
      </label>
      <div className="space-y-2">
        {values.map((spec, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={spec.label}
              onChange={(e) => update(i, "label", e.target.value)}
              placeholder="Parámetro (ej: Tensión nominal)"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#1C2870]/20"
            />
            <input
              value={spec.value}
              onChange={(e) => update(i, "value", e.target.value)}
              placeholder="Valor (ej: 22 kV)"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#1C2870]/20"
            />
            <button type="button" onClick={() => onChange(values.filter((_, j) => j !== i))}
                    className="rounded-lg border border-red-100 px-2.5 text-xs text-red-500 hover:bg-red-50">✕</button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...values, { label: "", value: "" }])}
        className="mt-2 text-xs font-medium text-[#1C2870] hover:underline"
      >
        + Agregar parámetro
      </button>
    </div>
  )
}

// ─── Gallery editor ───────────────────────────────────────────────────────────

function GalleryEditor({ values, onChange }: { values: string[]; onChange: (v: string[]) => void }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">Galería de imágenes</label>
      <div className="space-y-2">
        {values.map((url, i) => (
          <div key={i} className="flex items-center gap-2">
            {url && <img src={url} alt="" className="h-10 w-10 rounded-lg border border-slate-200 object-contain p-1" />}
            <ImageUploader label="" value={url} onChange={(v) => {
              const next = [...values]; next[i] = v; onChange(next)
            }} />
            <button type="button" onClick={() => onChange(values.filter((_, j) => j !== i))}
                    className="shrink-0 rounded-lg border border-red-100 px-2 py-1.5 text-xs text-red-500 hover:bg-red-50">✕</button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="mt-2 text-xs font-medium text-[#1C2870] hover:underline"
      >
        + Agregar imagen
      </button>
    </div>
  )
}

// ─── MAIN FORM ────────────────────────────────────────────────────────────────

export function ProductForm({ product, categories, brands }: ProductFormProps) {
  const router = useRouter()
  const isEdit = Boolean(product)

  // State
  const [image, setImage]               = useState(product?.image ?? "")
  const [gallery, setGallery]           = useState<string[]>(product?.gallery ?? [])
  const [specs, setSpecs]               = useState<string[]>(product?.specs ?? [])
  const [techSpecs, setTechSpecs]       = useState<TechSpec[]>(product?.technicalSpecs ?? [])
  const [fichaTecnica, setFichaTecnica] = useState(product?.fichaTecnica ?? "")
  const [saving, setSaving]             = useState(false)
  const [error, setError]               = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError("")

    const fd       = new FormData(e.currentTarget)
    const data = {
      sku:              (fd.get("sku")             as string).trim(),
      name:             (fd.get("name")            as string).trim(),
      brand:            (fd.get("brand")           as string).trim(),
      category:         (fd.get("category")        as string).trim(),
      description:      (fd.get("description")     as string).trim(),
      fullDescription:  (fd.get("fullDescription") as string).trim(),
      rating:           Number(fd.get("rating"))   || 4.5,
      featured:         fd.get("featured")         === "on",
      bestSeller:       fd.get("bestSeller")        === "on",
      image,
      gallery:          gallery.filter(Boolean),
      specs,
      technicalSpecs:   techSpecs.filter((s) => s.label && s.value),
      fichaTecnica,
    }

    try {
      if (isEdit && product) {
        await updateProductAction(product.id, data)
      } else {
        await createProductAction(data as Parameters<typeof createProductAction>[0])
      }
      router.push("/productos")
      router.refresh()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al guardar")
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ── Información básica ── */}
      <Section title="Información básica">
        <div className="grid grid-cols-2 gap-4">
          <Field label="SKU *" name="sku" defaultValue={product?.sku} placeholder="ET-AIS-001" required />
          <Field label="Nombre del producto *" name="name" defaultValue={product?.name} placeholder="Aislador Polimérico 22kV" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">Categoría *</label>
            <select name="category" defaultValue={product?.category} required
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1C2870]/20">
              <option value="">Seleccionar…</option>
              {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">Marca *</label>
            <select name="brand" defaultValue={product?.brand} required
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1C2870]/20">
              <option value="">Seleccionar…</option>
              {brands.map((b) => <option key={b.id} value={b.name}>{b.name}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <Field label="Rating (0-5)" name="rating" type="number" defaultValue={product?.rating?.toString() ?? "4.5"} step="0.1" min="0" max="5" />
          <label className="flex cursor-pointer items-center gap-2 pt-5">
            <input type="checkbox" name="featured" defaultChecked={product?.featured} className="h-4 w-4 rounded border-slate-300 text-[#1C2870]" />
            <span className="text-sm font-medium text-slate-700">Destacado</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 pt-5">
            <input type="checkbox" name="bestSeller" defaultChecked={product?.bestSeller} className="h-4 w-4 rounded border-slate-300 text-[#1C2870]" />
            <span className="text-sm font-medium text-slate-700">Más vendido</span>
          </label>
        </div>
      </Section>

      {/* ── Descripción ── */}
      <Section title="Descripción">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-600">Descripción corta *</label>
          <textarea name="description" rows={2} required defaultValue={product?.description}
                    placeholder="Descripción breve del producto para las tarjetas del catálogo."
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1C2870]/20" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-600">Descripción completa</label>
          <textarea name="fullDescription" rows={5} defaultValue={product?.fullDescription}
                    placeholder="Descripción detallada del producto, aplicaciones, ventajas, etc."
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1C2870]/20" />
        </div>
        <TagsEditor
          label="Especificaciones rápidas (etiquetas)"
          values={specs}
          onChange={setSpecs}
        />
      </Section>

      {/* ── Imágenes ── */}
      <Section title="Imágenes">
        <ImageUploader label="Imagen principal *" value={image} onChange={setImage} />
        <GalleryEditor values={gallery} onChange={setGallery} />
      </Section>

      {/* ── Ficha técnica ── */}
      <Section title="Ficha técnica">
        <TechSpecsEditor values={techSpecs} onChange={setTechSpecs} />
        <FileUploader
          label="PDF de ficha técnica (opcional)"
          value={fichaTecnica}
          onChange={setFichaTecnica}
        />
      </Section>

      {/* ── Acciones ── */}
      <div className="flex items-center gap-3 border-t border-slate-200 pt-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[#1C2870] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1C2870]/90 disabled:opacity-60"
        >
          {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear producto"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Field({
  label, name, defaultValue, placeholder, required, type = "text", step, min, max,
}: {
  label: string; name: string; defaultValue?: string; placeholder?: string
  required?: boolean; type?: string; step?: string; min?: string; max?: string
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</label>
      <input
        type={type} name={name} defaultValue={defaultValue} placeholder={placeholder}
        required={required} step={step} min={min} max={max}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1C2870]/20"
      />
    </div>
  )
}

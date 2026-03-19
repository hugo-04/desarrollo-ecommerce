"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { getBrandByIdAction, updateBrandAction, deleteBrandAction } from "@/features/marcas/actions"
import type { Brand } from "@/lib/types"

export default function EditarMarcaPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const inputRef = useRef<HTMLInputElement>(null)

  const [brand, setBrand]         = useState<Brand | null>(null)
  const [logo, setLogo]           = useState("")
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving]       = useState(false)
  const [deleting, setDeleting]   = useState(false)
  const [error, setError]         = useState("")

  useEffect(() => {
    getBrandByIdAction(Number(id)).then((b) => {
      if (!b) router.replace("/marcas")
      else { setBrand(b); setLogo(b.logo) }
    })
  }, [id, router])

  if (!brand) {
    return <div className="py-8 text-sm text-slate-400">Cargando…</div>
  }

  async function handleFile(file: File) {
    setUploading(true)
    setError("")
    const fd = new FormData()
    fd.append("file", file)
    try {
      const res  = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setLogo(data.url)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al subir imagen")
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError("")
    const fd = new FormData(e.currentTarget)
    try {
      await updateBrandAction(brand.id, {
        name: (fd.get("name") as string).trim(),
        logo,
      })
      router.push("/marcas")
      router.refresh()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al guardar")
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm(`¿Eliminar marca "${brand.name}"? Esta acción no se puede deshacer.`)) return
    setDeleting(true)
    await deleteBrandAction(brand.id)
    router.push("/marcas")
    router.refresh()
  }

  return (
    <div className="max-w-md">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Editar Marca</h1>
      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">Nombre *</label>
          <input
            name="name"
            defaultValue={brand.name}
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C2870]/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-600">Logo de la marca</label>

          {logo && (
            <div className="mb-3 flex items-center gap-3">
              <img
                src={logo}
                alt="preview"
                className="h-16 w-16 rounded-lg border border-slate-200 object-contain p-2"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
              />
              <button
                type="button"
                onClick={() => setLogo("")}
                className="text-xs text-red-500 hover:underline"
              >
                Quitar imagen
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-500 transition hover:border-[#1C2870] hover:text-[#1C2870] disabled:opacity-50"
          >
            {uploading ? "Subiendo…" : logo ? "📁 Cambiar imagen" : "📁 Subir logo"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
          />
          <p className="mt-1 text-[11px] text-slate-400">PNG, JPG o WebP · máx. 5 MB</p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving || deleting || uploading}
              className="rounded-lg bg-[#1C2870] px-6 py-2 text-sm font-semibold text-white hover:bg-[#1C2870]/90 disabled:opacity-60"
            >
              {saving ? "Guardando…" : "Guardar"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
          </div>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting || saving}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-40"
          >
            {deleting ? "Eliminando…" : "Eliminar"}
          </button>
        </div>
      </form>
    </div>
  )
}

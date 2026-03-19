"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { getCategoryByIdAction, updateCategoryAction, deleteCategoryAction } from "@/features/categorias/actions"
import type { CategoryDTO } from "@/features/categorias/types"

export default function EditarCategoriaPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const [category, setCategory] = useState<CategoryDTO | null>(null)
  const [saving, setSaving]     = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError]       = useState("")

  useEffect(() => {
    getCategoryByIdAction(Number(id)).then((c) => {
      if (!c) router.replace("/categorias")
      else setCategory(c)
    })
  }, [id, router])

  if (!category) {
    return <div className="text-sm text-slate-400 py-8">Cargando…</div>
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError("")
    const fd = new FormData(e.currentTarget)
    try {
      await updateCategoryAction(category!.id, {
        name:           (fd.get("name")  as string).trim(),
        slug:           (fd.get("slug")  as string).trim().toLowerCase().replace(/\s+/g, "-"),
        image:          (fd.get("image") as string).trim(),
        color:          (fd.get("color") as string).trim() || "#1C2870",
        subcategories:  (fd.get("subcategories") as string).split("\n").map(s => s.trim()).filter(Boolean),
      })
      router.push("/categorias")
      router.refresh()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al guardar")
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm(`¿Eliminar categoría "${category!.name}"? Esta acción no se puede deshacer.`)) return
    setDeleting(true)
    await deleteCategoryAction(category!.id)
    router.push("/categorias")
    router.refresh()
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Editar Categoría</h1>
      <p className="mb-6 text-sm text-slate-500">Slug: {category.slug}</p>

      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}
        <Field label="Nombre *" name="name" defaultValue={category.name} required />
        <Field label="Slug (URL) *" name="slug" defaultValue={category.slug} required />
        <Field label="Imagen (URL)" name="image" defaultValue={category.image} />
        <Field label="Color (hex)" name="color" defaultValue={category.color} />
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">Subcategorías (una por línea)</label>
          <textarea
            name="subcategories"
            rows={4}
            defaultValue={category.subcategories.join("\n")}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C2870]/20"
          />
        </div>
        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving || deleting}
              className="rounded-lg bg-[#1C2870] px-6 py-2 text-sm font-semibold text-white hover:bg-[#1C2870]/90 disabled:opacity-60"
            >
              {saving ? "Guardando…" : "Guardar Cambios"}
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

function Field({ label, name, defaultValue, required }: { label: string; name: string; defaultValue?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-slate-600">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C2870]/20"
      />
    </div>
  )
}

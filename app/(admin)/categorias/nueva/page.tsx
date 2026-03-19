"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createCategoryAction } from "@/features/categorias/actions"

export default function NuevaCategoriaPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError("")
    const fd = new FormData(e.currentTarget)
    try {
      await createCategoryAction({
        name:           (fd.get("name")  as string).trim(),
        slug:           (fd.get("slug")  as string).trim().toLowerCase().replace(/\s+/g, "-"),
        image:          (fd.get("image") as string).trim(),
        color:          (fd.get("color") as string).trim() || "#1C2870",
        subcategories:  (fd.get("subcategories") as string).split("\n").map(s => s.trim()).filter(Boolean),
        count:          0,
      })
      router.push("/categorias")
      router.refresh()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al crear")
      setSaving(false)
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Nueva Categoría</h1>
      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}
        <Field label="Nombre *" name="name" placeholder="Ej: Aisladores AT/MT" required />
        <Field label="Slug (URL) *" name="slug" placeholder="Ej: aisladores" required />
        <Field label="Imagen (URL)" name="image" placeholder="https://…" />
        <Field label="Color (hex)" name="color" placeholder="#1C2870" />
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">Subcategorías (una por línea)</label>
          <textarea
            name="subcategories"
            rows={4}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C2870]/20"
            placeholder={"Aisladores de Porcelana\nAisladores Poliméricos\nAisladores de Vidrio"}
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[#1C2870] px-6 py-2 text-sm font-semibold text-white hover:bg-[#1C2870]/90 disabled:opacity-60"
          >
            {saving ? "Creando…" : "Crear Categoría"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({ label, name, placeholder, required }: { label: string; name: string; placeholder: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-slate-600">{label}</label>
      <input
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C2870]/20"
      />
    </div>
  )
}

"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { getCategoriesAction, deleteCategoryAction } from "@/features/categorias/actions"
import type { CategoryDTO } from "@/features/categorias/types"

const PAGE_SIZE = 10

export default function AdminCategoriasPage() {
  const [allCategories, setAllCategories] = useState<CategoryDTO[]>([])
  const [search, setSearch]               = useState("")
  const [page, setPage]                   = useState(1)
  const [loading, setLoading]             = useState(true)
  const [removingId, setRemovingId]       = useState<number | null>(null)

  const loadAll = useCallback(async () => {
    setLoading(true)
    const result = await getCategoriesAction()
    setAllCategories(result)
    setLoading(false)
  }, [])

  useEffect(() => { loadAll() }, [loadAll])
  useEffect(() => {
    window.addEventListener("focus", loadAll)
    return () => window.removeEventListener("focus", loadAll)
  }, [loadAll])

  const filtered = allCategories.filter((c) =>
    !search ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paged       = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function handleSearch(q: string) { setSearch(q); setPage(1) }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`¿Eliminar categoría "${name}"? Esta acción no se puede deshacer.`)) return
    setRemovingId(id)
    setTimeout(() => {
      setAllCategories((prev) => prev.filter((c) => c.id !== id))
      setRemovingId(null)
    }, 280)
    await deleteCategoryAction(id)
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Categorías</h1>
          <p className="text-sm text-slate-500">
            {loading ? "Cargando…" : `${filtered.length} de ${allCategories.length} categorías`}
          </p>
        </div>
        <Link
          href="/categorias/nueva"
          className="rounded-lg bg-[#1C2870] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1C2870]/90"
        >
          + Nueva Categoría
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar por nombre o slug…"
          className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1C2870]/20"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Nombre</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Slug</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Productos</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Subcategorías</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-400">Cargando categorías…</td>
              </tr>
            ) : paged.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-400">
                  {search ? "Sin resultados." : "No hay categorías aún."}
                </td>
              </tr>
            ) : paged.map((cat) => (
              <tr
                key={cat.id}
                className="transition-all duration-300 hover:bg-slate-50"
                style={{
                  opacity:   removingId === cat.id ? 0   : 1,
                  transform: removingId === cat.id ? "translateX(12px) scale(0.98)" : "none",
                }}
              >
                <td className="px-4 py-3 font-medium text-slate-800">{cat.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{cat.slug}</td>
                <td className="px-4 py-3">
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                    {cat.count}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">{cat.subcategories.length}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/categorias/${cat.id}/editar`}
                      className="rounded border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-[#1C2870] hover:text-[#1C2870]"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
                      disabled={removingId === cat.id}
                      className="rounded border border-red-100 px-2.5 py-1 text-xs font-medium text-red-500 hover:bg-red-50 disabled:opacity-40"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
          <span>Página {currentPage} de {totalPages}</span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:bg-slate-50 disabled:opacity-40"
            >
              ← Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => Math.abs(p - currentPage) <= 2)
              .map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                    p === currentPage
                      ? "border-[#1C2870] bg-[#1C2870] text-white"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:bg-slate-50 disabled:opacity-40"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

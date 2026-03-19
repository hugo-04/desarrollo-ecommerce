"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { getCatalogAction, deleteProductAction } from "@/features/productos/actions"
import type { Product } from "@/lib/types"

const PAGE_SIZE = 10

export default function AdminProductosPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [search, setSearch]           = useState("")
  const [page, setPage]               = useState(1)
  const [loading, setLoading]         = useState(true)
  const [removingId, setRemovingId]   = useState<number | null>(null)

  const loadAll = useCallback(async () => {
    setLoading(true)
    const result = await getCatalogAction({ limit: 1000 })
    setAllProducts(result.data)
    setLoading(false)
  }, [])

  // Carga inicial + recarga al volver de la página de edición
  useEffect(() => { loadAll() }, [loadAll])
  useEffect(() => {
    window.addEventListener("focus", loadAll)
    return () => window.removeEventListener("focus", loadAll)
  }, [loadAll])

  const filtered = allProducts.filter((p) =>
    !search ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paged       = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function handleSearch(q: string) { setSearch(q); setPage(1) }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return
    // Animación de salida → luego quitar del estado
    setRemovingId(id)
    setTimeout(() => {
      setAllProducts((prev) => prev.filter((p) => p.id !== id))
      setRemovingId(null)
    }, 280)
    await deleteProductAction(id)
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Productos</h1>
          <p className="text-sm text-slate-500">
            {loading ? "Cargando…" : `${filtered.length} de ${allProducts.length} productos`}
          </p>
        </div>
        <Link
          href="/productos/nuevo"
          className="rounded-lg bg-[#1C2870] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1C2870]/90"
        >
          + Nuevo Producto
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar por nombre, SKU, categoría o marca…"
          className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1C2870]/20"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">SKU</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Nombre</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Categoría</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Marca</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Rating</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-400">Cargando productos…</td>
              </tr>
            ) : paged.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-400">
                  {search ? "Sin resultados." : "No hay productos aún."}
                </td>
              </tr>
            ) : paged.map((product) => (
              <tr
                key={product.id}
                className="transition-all duration-300 hover:bg-slate-50"
                style={{
                  opacity:   removingId === product.id ? 0   : 1,
                  transform: removingId === product.id ? "translateX(12px) scale(0.98)" : "none",
                }}
              >
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{product.sku}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{product.name}</td>
                <td className="px-4 py-3 text-slate-600">{product.category}</td>
                <td className="px-4 py-3 text-slate-600">{product.brand}</td>
                <td className="px-4 py-3">
                  <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                    {product.rating}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/productos/${product.id}/editar`}
                      className="rounded border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-[#1C2870] hover:text-[#1C2870]"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      disabled={removingId === product.id}
                      className="rounded border border-red-100 px-2.5 py-1 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 disabled:opacity-40"
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

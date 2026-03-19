"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { getBrandsAction, deleteBrandAction } from "@/features/marcas/actions"
import type { Brand } from "@/lib/types"

const PAGE_SIZE = 12

export default function AdminMarcasPage() {
  const [allBrands, setAllBrands]   = useState<Brand[]>([])
  const [search, setSearch]         = useState("")
  const [page, setPage]             = useState(1)
  const [loading, setLoading]       = useState(true)
  const [removingId, setRemovingId] = useState<number | null>(null)

  const loadAll = useCallback(async () => {
    setLoading(true)
    const result = await getBrandsAction()
    setAllBrands(result)
    setLoading(false)
  }, [])

  useEffect(() => { loadAll() }, [loadAll])
  useEffect(() => {
    window.addEventListener("focus", loadAll)
    return () => window.removeEventListener("focus", loadAll)
  }, [loadAll])

  const filtered = allBrands.filter((b) =>
    !search || b.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paged       = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function handleSearch(q: string) { setSearch(q); setPage(1) }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`¿Eliminar marca "${name}"? Esta acción no se puede deshacer.`)) return
    setRemovingId(id)
    setTimeout(() => {
      setAllBrands((prev) => prev.filter((b) => b.id !== id))
      setRemovingId(null)
    }, 280)
    await deleteBrandAction(id)
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Marcas</h1>
          <p className="text-sm text-slate-500">
            {loading ? "Cargando…" : `${filtered.length} de ${allBrands.length} marcas`}
          </p>
        </div>
        <Link
          href="/marcas/nueva"
          className="rounded-lg bg-[#1C2870] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1C2870]/90"
        >
          + Nueva Marca
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar marca…"
          className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1C2870]/20"
        />
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-slate-400">Cargando marcas…</div>
      ) : paged.length === 0 ? (
        <div className="py-12 text-center text-sm text-slate-400">
          {search ? "Sin resultados." : "No hay marcas aún."}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {paged.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300"
              style={{
                opacity:   removingId === brand.id ? 0   : 1,
                transform: removingId === brand.id ? "scale(0.95) translateY(-4px)" : "none",
              }}
            >
              <div className="flex items-center gap-3">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-8 w-8 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-400">
                    {brand.name[0]}
                  </div>
                )}
                <span className="font-semibold text-slate-800">{brand.name}</span>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/marcas/${brand.id}/editar`}
                  className="rounded border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-[#1C2870] hover:text-[#1C2870]"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(brand.id, brand.name)}
                  disabled={removingId === brand.id}
                  className="rounded border border-red-100 px-2.5 py-1 text-xs font-medium text-red-500 hover:bg-red-50 disabled:opacity-40"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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

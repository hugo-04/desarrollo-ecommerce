"use client"

/**
 * AdminMarcasPage — Listado de marcas en formato card grid con paginación SERVER-SIDE.
 *
 * Usa `useAdminPagedList` en lugar de `useAdminList` para no cargar todas las
 * marcas de una vez — el servidor devuelve solo la página solicitada.
 * Esto evita sobrecargar la DB cuando el catálogo de marcas crece.
 */

import Link from "next/link"
import { getBrandsPagedAction } from "@/features/marcas/actions"
import { deleteBrandAction } from "@/features/marcas/actions"
import type { Brand } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { AdminListHeader } from "@/components/admin/AdminListHeader"
import { AdminPagination } from "@/components/admin/AdminPagination"
import { DeleteDialog } from "@/components/admin/DeleteDialog"
import { useAdminPagedList } from "@/hooks/admin/use-admin-paged-list"

const PAGE_SIZE = 12
const PAGE_SIZE_OPTIONS = [12, 24, 48]

export default function AdminMarcasPage() {
  const {
    items,
    total,
    loading,
    search,
    pageSize,
    currentPage,
    totalPages,
    removingId,
    handleSearch,
    setPage,
    setPageSize,
    handleDelete,
  } = useAdminPagedList<Brand>({
    pageSize: PAGE_SIZE,
    /** Llama al servidor con la página y búsqueda actuales — nunca carga todo */
    loadFn: ({ page, query, limit }) =>
      getBrandsPagedAction({ page, query, limit }),
  })

  return (
    <div>
      <AdminListHeader
        title="Marcas"
        subtitle={loading ? "Cargando…" : `${total} marca${total !== 1 ? "s" : ""}`}
        newHref="/marcas/nueva"
        newLabel="Nueva marca"
        searchValue={search}
        searchPlaceholder="Buscar marca…"
        onSearch={handleSearch}
      />

      {/* Estado de carga */}
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-400">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1C2870] border-t-transparent" />
          Cargando marcas…
        </div>

      ) : items.length === 0 ? (
        /* Estado vacío */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <p className="text-sm text-slate-400">
            {search ? "Sin resultados para la búsqueda." : "No hay marcas aún."}
          </p>
        </div>

      ) : (
        /* Grid de cards — cada card muestra logo, nombre, badge carrusel y acciones */
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((brand) => (
            <div
              key={brand.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
              style={{
                opacity:    removingId === brand.id ? 0 : 1,
                transform:  removingId === brand.id ? "scale(0.96)" : "none",
                transition: "all 0.3s",
              }}
            >
              {/* Área del logo */}
              <div className="flex h-28 items-center justify-center bg-slate-50 p-4 border-b border-slate-100">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-16 max-w-full object-contain"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.display = "none"
                    }}
                  />
                ) : (
                  <span className="text-3xl font-black text-slate-200 select-none">
                    {brand.name[0]}
                  </span>
                )}
              </div>

              {/* Contenido del card */}
              <div className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <p className="min-w-0 flex-1 truncate font-bold text-slate-800">{brand.name}</p>
                  {brand.showInCarousel && (
                    <span className="shrink-0 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-600 ring-1 ring-emerald-200">
                      Carrusel
                    </span>
                  )}
                </div>

                {/* Acciones: editar + eliminar */}
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="xs" className="flex-1 justify-center">
                    <Link href={`/marcas/${brand.id}/editar`}>Editar</Link>
                  </Button>
                  <DeleteDialog
                    trigger={
                      <Button
                        variant="outline"
                        size="xs"
                        disabled={removingId === brand.id}
                        className="border-red-100 text-red-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 px-2.5"
                      >
                        ✕
                      </Button>
                    }
                    itemName={brand.name}
                    onConfirm={() =>
                      handleDelete(brand.id, () => deleteBrandAction(brand.id), brand.name)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        onPage={setPage}
        pageSize={pageSize}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        onPageSize={setPageSize}
      />
    </div>
  )
}

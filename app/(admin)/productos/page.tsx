"use client"

/**
 * AdminProductosPage — Listado de productos del panel admin.
 *
 * Mejoras visuales respecto a la versión anterior:
 *  - Columna de estado con badges Destacado y Más vendido
 *  - Categoría + Marca como chips en lugar de texto plano
 *  - SKU con estilo monospace más legible
 *  - Rating con estrella visual
 */

import Link from "next/link"
import { getProductsPagedAction, deleteProductAction } from "@/features/productos/actions"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { AdminListHeader } from "@/components/admin/AdminListHeader"
import { AdminPagination } from "@/components/admin/AdminPagination"
import { DeleteDialog } from "@/components/admin/DeleteDialog"
import { AdminTableThumb } from "@/components/admin/AdminTableThumb"
import { useAdminPagedList } from "@/hooks/admin/use-admin-paged-list"

const PAGE_SIZE = 10
const PAGE_SIZE_OPTIONS = [10, 25, 50]

export default function AdminProductosPage() {
  const {
    items: paged,
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
  } = useAdminPagedList<Product>({
    pageSize: PAGE_SIZE,
    /** Paginación server-side: el servidor devuelve solo la página solicitada */
    loadFn: ({ page, query, limit }) =>
      getProductsPagedAction({ page, query, limit }),
  })

  return (
    <div>
      <AdminListHeader
        title="Productos"
        subtitle={loading ? "Cargando…" : `${total} producto${total !== 1 ? "s" : ""}`}
        newHref="/productos/nuevo"
        newLabel="Nuevo producto"
        searchValue={search}
        searchPlaceholder="Buscar por nombre, SKU, categoría o marca…"
        onSearch={handleSearch}
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="border-slate-100">
              <TableHead className="w-14 px-4 py-3 font-semibold text-slate-600">Img</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">SKU</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Nombre</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Categoría / Marca</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Rating</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Estado</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-slate-400">
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1C2870] border-t-transparent" />
                    Cargando productos…
                  </span>
                </TableCell>
              </TableRow>
            ) : paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-slate-400">
                  {search ? "Sin resultados." : "No hay productos aún."}
                </TableCell>
              </TableRow>
            ) : (
              paged.map((product) => (
                <TableRow
                  key={product.id}
                  className="border-slate-100 transition-colors hover:bg-slate-50/40"
                  style={{
                    opacity:    removingId === product.id ? 0 : 1,
                    transform:  removingId === product.id ? "translateX(12px) scale(0.98)" : "none",
                    transition: "all 0.3s",
                  }}
                >
                  {/* Miniatura */}
                  <TableCell className="px-4 py-2">
                    <AdminTableThumb
                      src={product.image}
                      alt={product.name}
                      fallback={product.name}
                      variant="cover"
                    />
                  </TableCell>

                  {/* SKU — monospace */}
                  <TableCell className="px-4 py-3">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-500">
                      {product.sku}
                    </span>
                  </TableCell>

                  {/* Nombre del producto */}
                  <TableCell className="px-4 py-3 font-semibold text-slate-800">
                    {product.name}
                  </TableCell>

                  {/* Categoría + Marca como chips apilados */}
                  <TableCell className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className="w-fit rounded-md bg-violet-50 px-2 py-0.5 text-[11px] font-medium text-violet-700">
                        {product.category}
                      </span>
                      <span className="w-fit rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                        {product.brand}
                      </span>
                    </div>
                  </TableCell>

                  {/* Rating con estrella */}
                  <TableCell className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-600 ring-1 ring-amber-200">
                      ★ {product.rating}
                    </span>
                  </TableCell>

                  {/* Badges de estado: Destacado / Más vendido */}
                  <TableCell className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      {product.featured && (
                        <span className="w-fit rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-600">
                          Destacado
                        </span>
                      )}
                      {product.bestSeller && (
                        <span className="w-fit rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-500">
                          Más vendido
                        </span>
                      )}
                      {!product.featured && !product.bestSeller && (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </div>
                  </TableCell>

                  {/* Editar / Eliminar */}
                  <TableCell className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="xs">
                        <Link href={`/productos/${product.id}/editar`}>Editar</Link>
                      </Button>
                      <DeleteDialog
                        trigger={
                          <Button
                            variant="outline"
                            size="xs"
                            disabled={removingId === product.id}
                            className="border-red-100 text-red-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            Eliminar
                          </Button>
                        }
                        itemName={product.name}
                        onConfirm={() =>
                          handleDelete(
                            product.id,
                            () => deleteProductAction(product.id),
                            product.name,
                          )
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

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

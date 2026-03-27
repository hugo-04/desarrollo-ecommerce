"use client"

/**
 * AdminCategoriasPage — Listado de categorías del panel admin.
 *
 * Mejoras visuales respecto a la versión anterior:
 *  - Franja de color de acento (derivada del campo `color` de la categoría)
 *  - Subcategorías mostradas como chips en lugar de un número solo
 *  - Badge de productos con mejor contraste
 */

import Link from "next/link"
import { getCategoriesPagedAction, deleteCategoryAction } from "@/features/categorias/actions"
import type { CategoryDTO } from "@/features/categorias/types"
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
import { useAdminPagedList } from "@/hooks/admin/use-admin-paged-list"

const PAGE_SIZE = 10
const PAGE_SIZE_OPTIONS = [10, 25, 50]

export default function AdminCategoriasPage() {
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
  } = useAdminPagedList<CategoryDTO>({
    pageSize: PAGE_SIZE,
    /** Paginación server-side: el servidor devuelve solo la página solicitada */
    loadFn: ({ page, query, limit }) =>
      getCategoriesPagedAction({ page, query, limit }),
  })

  return (
    <div>
      <AdminListHeader
        title="Categorías"
        subtitle={loading ? "Cargando…" : `${total} categoría${total !== 1 ? "s" : ""}`}
        newHref="/categorias/nueva"
        newLabel="Nueva categoría"
        searchValue={search}
        searchPlaceholder="Buscar por nombre o slug…"
        onSearch={handleSearch}
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="border-slate-100">
              <TableHead className="w-8 px-0 py-4" />
              <TableHead className="px-5 py-4 font-semibold text-slate-600">Nombre</TableHead>
              <TableHead className="px-5 py-4 font-semibold text-slate-600">Slug</TableHead>
              <TableHead className="px-5 py-4 font-semibold text-slate-600">Productos</TableHead>
              <TableHead className="px-5 py-4 font-semibold text-slate-600">Subcategorías</TableHead>
              <TableHead className="px-5 py-4 font-semibold text-slate-600">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-slate-400">
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1C2870] border-t-transparent" />
                    Cargando categorías…
                  </span>
                </TableCell>
              </TableRow>
            ) : paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-slate-400">
                  {search ? "Sin resultados." : "No hay categorías aún."}
                </TableCell>
              </TableRow>
            ) : (
              paged.map((cat) => (
                <TableRow
                  key={cat.id}
                  className="border-slate-100"
                  style={{
                    opacity:    removingId === cat.id ? 0 : 1,
                    transform:  removingId === cat.id ? "translateX(12px) scale(0.98)" : "none",
                    transition: "all 0.3s",
                  }}
                >
                  {/* Franja de color derivada del campo color de la categoría */}
                  <TableCell className="w-2 p-0">
                    <div
                      className={`h-full min-h-[60px] w-1.5 rounded-r-full bg-gradient-to-b ${cat.color || "from-slate-300 to-slate-400"}`}
                    />
                  </TableCell>

                  {/* Nombre */}
                  <TableCell className="px-5 py-4 font-semibold text-slate-800">
                    {cat.name}
                  </TableCell>

                  {/* Slug — monospace */}
                  <TableCell className="px-5 py-4">
                    <span className="rounded-md bg-slate-100 px-2.5 py-1.5 font-mono text-xs text-slate-500">
                      {cat.slug}
                    </span>
                  </TableCell>

                  {/* Contador de productos */}
                  <TableCell className="px-5 py-4">
                    <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-full bg-[#1C2870]/8 px-2.5 text-xs font-bold text-[#1C2870]">
                      {cat.count}
                    </span>
                  </TableCell>

                  {/* Subcategorías como chips (máx. 3 visibles + overflow) */}
                  <TableCell className="px-5 py-4">
                    {cat.subcategories.length === 0 ? (
                      <span className="text-xs text-slate-300">—</span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {cat.subcategories.slice(0, 3).map((sub) => (
                          <span
                            key={sub}
                            className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                          >
                            {sub}
                          </span>
                        ))}
                        {cat.subcategories.length > 3 && (
                          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-400">
                            +{cat.subcategories.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </TableCell>

                  {/* Acciones */}
                  <TableCell className="px-5 py-4">
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="xs">
                        <Link href={`/categorias/${cat.id}/editar`}>Editar</Link>
                      </Button>
                      <DeleteDialog
                        trigger={
                          <Button
                            variant="outline"
                            size="xs"
                            disabled={removingId === cat.id}
                            className="border-red-100 text-red-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            Eliminar
                          </Button>
                        }
                        itemName={cat.name}
                        onConfirm={() =>
                          handleDelete(cat.id, () => deleteCategoryAction(cat.id), cat.name)
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

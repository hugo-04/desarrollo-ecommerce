"use client"

/**
 * Página de listado de categorías del panel admin.
 * Usa el hook genérico `useAdminList` para toda la lógica de estado:
 * carga, búsqueda, paginación y eliminación con animación.
 */

import Link from "next/link"
import { getCategoriesAction, deleteCategoryAction } from "@/features/categorias/actions"
import type { CategoryDTO } from "@/features/categorias/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { useAdminList } from "@/hooks/admin/use-admin-list"

const PAGE_SIZE = 10

export default function AdminCategoriasPage() {
  const {
    allItems,
    filteredCount,
    paged,
    loading,
    search,
    currentPage,
    totalPages,
    removingId,
    handleSearch,
    setPage,
    handleDelete,
  } = useAdminList<CategoryDTO>({
    pageSize: PAGE_SIZE,
    loadFn: getCategoriesAction,
    filterFn: (c, q) => {
      const lq = q.toLowerCase()
      return c.name.toLowerCase().includes(lq) || c.slug.toLowerCase().includes(lq)
    },
  })

  return (
    <div>
      <AdminListHeader
        title="Categorías"
        subtitle={loading ? "Cargando…" : `${filteredCount} de ${allItems.length} categorías`}
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
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Nombre</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Slug</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Productos</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Subcategorías</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-slate-400">
                  Cargando categorías…
                </TableCell>
              </TableRow>
            ) : paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-slate-400">
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
                  <TableCell className="px-4 py-3 font-medium text-slate-800">
                    {cat.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-mono text-xs text-slate-500">
                    {cat.slug}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                      {cat.count}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge variant="outline" className="border-violet-200 bg-violet-50 text-violet-700">
                      {cat.subcategories.length}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3">
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
                          handleDelete(
                            cat.id,
                            () => deleteCategoryAction(cat.id),
                            cat.name,
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

      <AdminPagination currentPage={currentPage} totalPages={totalPages} onPage={setPage} />
    </div>
  )
}

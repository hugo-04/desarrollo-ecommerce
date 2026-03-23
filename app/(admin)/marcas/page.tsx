"use client"

/**
 * Página de listado de marcas del panel admin.
 * Usa el hook genérico `useAdminList` para toda la lógica de estado:
 * carga, búsqueda, paginación y eliminación con animación.
 */

import Link from "next/link"
import { getBrandsAction, deleteBrandAction } from "@/features/marcas/actions"
import type { Brand } from "@/lib/types"
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
import { useAdminList } from "@/hooks/admin/use-admin-list"

const PAGE_SIZE = 6

export default function AdminMarcasPage() {
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
  } = useAdminList<Brand>({
    pageSize: PAGE_SIZE,
    loadFn: getBrandsAction,
    filterFn: (b, q) => b.name.toLowerCase().includes(q.toLowerCase()),
  })

  return (
    <div>
      <AdminListHeader
        title="Marcas"
        subtitle={loading ? "Cargando…" : `${filteredCount} de ${allItems.length} marcas`}
        newHref="/marcas/nueva"
        newLabel="Nueva marca"
        searchValue={search}
        searchPlaceholder="Buscar marca…"
        onSearch={handleSearch}
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="border-slate-100">
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Logo</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Nombre</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="py-8 text-center text-slate-400">
                  Cargando marcas…
                </TableCell>
              </TableRow>
            ) : paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="py-8 text-center text-slate-400">
                  {search ? "Sin resultados." : "No hay marcas aún."}
                </TableCell>
              </TableRow>
            ) : (
              paged.map((brand) => (
                <TableRow
                  key={brand.id}
                  className="border-slate-100"
                  style={{
                    opacity:    removingId === brand.id ? 0 : 1,
                    transform:  removingId === brand.id ? "translateX(12px) scale(0.98)" : "none",
                    transition: "all 0.3s",
                  }}
                >
                  <TableCell className="px-4 py-2">
                    <AdminTableThumb
                      src={brand.logo}
                      alt={brand.name}
                      fallback={brand.name}
                      variant="square"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3 font-semibold text-slate-800">
                    {brand.name}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="xs">
                        <Link href={`/marcas/${brand.id}/editar`}>Editar</Link>
                      </Button>
                      <DeleteDialog
                        trigger={
                          <Button
                            variant="outline"
                            size="xs"
                            disabled={removingId === brand.id}
                            className="border-red-100 text-red-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            Eliminar
                          </Button>
                        }
                        itemName={brand.name}
                        onConfirm={() =>
                          handleDelete(
                            brand.id,
                            () => deleteBrandAction(brand.id),
                            brand.name,
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

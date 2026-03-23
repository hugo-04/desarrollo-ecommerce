"use client"

/**
 * Página de listado de productos del panel admin.
 * Usa el hook genérico `useAdminList` para toda la lógica de estado:
 * carga, búsqueda, paginación y eliminación con animación.
 */

import Link from "next/link"
import { getCatalogAction, deleteProductAction } from "@/features/productos/actions"
import type { Product } from "@/lib/types"
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
import { AdminTableThumb } from "@/components/admin/AdminTableThumb"
import { useAdminList } from "@/hooks/admin/use-admin-list"

const PAGE_SIZE = 10

export default function AdminProductosPage() {
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
  } = useAdminList<Product>({
    pageSize: PAGE_SIZE,
    loadFn: () => getCatalogAction({ limit: 1000 }).then((r) => r.data),
    filterFn: (p, q) => {
      const lq = q.toLowerCase()
      return (
        p.name.toLowerCase().includes(lq) ||
        p.sku.toLowerCase().includes(lq) ||
        p.category.toLowerCase().includes(lq) ||
        p.brand.toLowerCase().includes(lq)
      )
    },
  })

  return (
    <div>
      <AdminListHeader
        title="Productos"
        subtitle={loading ? "Cargando…" : `${filteredCount} de ${allItems.length} productos`}
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
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Categoría</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Marca</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Rating</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-slate-400">
                  Cargando productos…
                </TableCell>
              </TableRow>
            ) : paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-slate-400">
                  {search ? "Sin resultados." : "No hay productos aún."}
                </TableCell>
              </TableRow>
            ) : (
              paged.map((product) => (
                <TableRow
                  key={product.id}
                  className="border-slate-100"
                  style={{
                    opacity:    removingId === product.id ? 0 : 1,
                    transform:  removingId === product.id ? "translateX(12px) scale(0.98)" : "none",
                    transition: "all 0.3s",
                  }}
                >
                  <TableCell className="px-4 py-2">
                    <AdminTableThumb
                      src={product.image}
                      alt={product.name}
                      fallback={product.name}
                      variant="cover"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3 font-mono text-xs text-slate-500">
                    {product.sku}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-medium text-slate-800">
                    {product.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-slate-600">{product.category}</TableCell>
                  <TableCell className="px-4 py-3 text-slate-600">{product.brand}</TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                      {product.rating}
                    </Badge>
                  </TableCell>
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

      <AdminPagination currentPage={currentPage} totalPages={totalPages} onPage={setPage} />
    </div>
  )
}

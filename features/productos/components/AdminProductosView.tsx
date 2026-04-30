"use client"

import Link from "next/link"
import { getProductsPagedAction, deleteProductAction } from "@/features/productos/actions"
import type { Product } from "@/lib/types"
import { Button }          from "@/components/ui/button"
import {
  Table, TableHeader, TableBody,
  TableHead, TableRow, TableCell,
} from "@/components/ui/table"
import { AdminListHeader }   from "@/components/admin/AdminListHeader"
import { AdminPagination }   from "@/components/admin/AdminPagination"
import { DeleteDialog }      from "@/components/admin/DeleteDialog"
import { AdminTableThumb }   from "@/components/admin/AdminTableThumb"
import { useAdminPagedList } from "@/hooks/admin/use-admin-paged-list"

function fmtDate(d?: string): string {
  if (!d) return "—"
  return new Date(d).toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" })
}

const PAGE_SIZE         = 10
const PAGE_SIZE_OPTIONS = [10, 25, 50]
const ROW_STAGGER_MS    = 35

interface ProductRowProps {
  product:    Product
  index:      number
  removingId: number | null
  onDelete:   () => void
}

function ProductRow({ product, index, removingId, onDelete }: ProductRowProps) {
  const isRemoving = removingId === product.id

  return (
    <TableRow
      className="border-slate-100 transition-colors hover:bg-slate-50/40"
      style={{
        animation:      `rowEnter 0.28s ease-out both`,
        animationDelay: `${index * ROW_STAGGER_MS}ms`,
        opacity:    isRemoving ? 0 : undefined,
        transform:  isRemoving ? "translateX(12px) scale(0.98)" : undefined,
        transition: isRemoving ? "all 0.3s ease" : undefined,
      }}
    >
      {/* Miniatura */}
      <TableCell className="px-4 py-2">
        <AdminTableThumb src={product.image} alt={product.name} fallback={product.name} variant="cover" />
      </TableCell>

      {/* Nombre */}
      <TableCell className="px-4 py-3 font-semibold text-slate-800">{product.name}</TableCell>

      {/* Categoría */}
      <TableCell className="px-4 py-3">
        <span className="w-fit rounded-md bg-violet-50 px-2 py-0.5 text-[11px] font-medium text-violet-700">
          {product.category}
        </span>
      </TableCell>

      {/* Marca */}
      <TableCell className="px-4 py-3">
        <span className="w-fit rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
          {product.brand}
        </span>
      </TableCell>

      {/* Rating */}
      <TableCell className="px-4 py-3">
        <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-600 ring-1 ring-amber-200">
          ★ {product.rating}
        </span>
      </TableCell>

      {/* Estado */}
      <TableCell className="px-4 py-3">
        <div className="flex flex-col gap-1">
          {product.featured && (
            <span className="w-fit rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-600">Destacado</span>
          )}
          {product.bestSeller && (
            <span className="w-fit rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-500">Más vendido</span>
          )}
          {!product.featured && !product.bestSeller && <span className="text-xs text-slate-300">—</span>}
        </div>
      </TableCell>

      {/* Creado */}
      <TableCell className="px-4 py-3 text-xs text-slate-500 tabular-nums">{fmtDate(product.createdAt)}</TableCell>

      {/* Actualizado */}
      <TableCell className="px-4 py-3 text-xs text-slate-500 tabular-nums">{fmtDate(product.updatedAt)}</TableCell>

      {/* Acciones */}
      <TableCell className="px-4 py-3">
        <div className="flex gap-2">
          <Button asChild variant="outline" size="xs">
            <Link href={`/productos/${product.id}/editar`}>Editar</Link>
          </Button>
          <DeleteDialog
            trigger={
              <Button
                variant="outline" size="xs" disabled={isRemoving}
                className="border-red-100 text-red-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Eliminar
              </Button>
            }
            itemName={product.name}
            onConfirm={onDelete}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}

export function AdminProductosView() {
  const {
    items: paged, total, loading, search,
    pageSize, currentPage, totalPages, removingId,
    handleSearch, setPage, setPageSize, handleDelete,
  } = useAdminPagedList<Product>({
    pageSize: PAGE_SIZE,
    loadFn:   getProductsPagedAction,
  })

  return (
    <div>
      <AdminListHeader
        title="Productos"
        subtitle={loading ? "Cargando…" : `${total} producto${total !== 1 ? "s" : ""}`}
        newHref="/productos/nuevo"
        newLabel="Nuevo producto"
        searchValue={search}
        searchPlaceholder="Buscar por nombre, categoría o marca…"
        onSearch={handleSearch}
      />

      <style>{`
        @keyframes rowEnter {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="overflow-x-auto overflow-y-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        style={{
          opacity:    loading ? 0.45 : 1,
          transform:  loading ? "translateY(4px)" : "translateY(0)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="border-slate-100">
              <TableHead className="w-14 px-4 py-3 font-semibold text-slate-600">Img</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Nombre</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Categoría</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Marca</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Rating</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Estado</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Creado</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Actualizado</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!loading && paged.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="py-10 text-center text-slate-400">
                  {search ? "Sin resultados para esa búsqueda." : "No hay productos aún."}
                </TableCell>
              </TableRow>
            )}

            {paged.map((product, i) => (
              <ProductRow
                key={`${currentPage}-${product.id}`}
                product={product}
                index={i}
                removingId={removingId}
                onDelete={() => handleDelete(product.id, () => deleteProductAction(product.id), product.name)}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <AdminPagination
        currentPage={currentPage} totalPages={totalPages} total={total}
        onPage={setPage} pageSize={pageSize} pageSizeOptions={PAGE_SIZE_OPTIONS}
        onPageSize={setPageSize}
      />
    </div>
  )
}

"use client"

/**
 * AdminProductosView — Vista completa del listado de productos del panel admin.
 *
 * Responsabilidades (SRP):
 *  - Gestionar el estado de paginación/búsqueda via `useAdminPagedList`
 *  - Renderizar la tabla con animación fluida al cambiar de página
 *  - Delegar la eliminación al hook y a la server action correspondiente
 *
 * La animación de cambio de página funciona así:
 *  1. Al disparar una nueva carga, el wrapper baja su opacidad y se desplaza
 *     ligeramente hacia abajo (efecto "fade-out + sink").
 *  2. Cuando los datos llegan, cada fila entra con un slide-up escalonado
 *     (animationDelay incrementado por índice), produciendo una sensación fluida.
 */

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

// ── Constantes de paginación ──────────────────────────────────────────────────

const PAGE_SIZE         = 10
const PAGE_SIZE_OPTIONS = [10, 25, 50]

/** Delay escalonado por fila para el efecto de entrada (ms) */
const ROW_STAGGER_MS = 35

// ── Subcomponente: fila de producto ──────────────────────────────────────────

interface ProductRowProps {
  product:   Product
  index:     number
  removingId: number | null
  onDelete:  () => void
}

/**
 * ProductRow — Fila individual de la tabla.
 * Entrada animada con delay escalonado según su índice.
 * Salida animada (slide-right + fade) al eliminar.
 */
function ProductRow({ product, index, removingId, onDelete }: ProductRowProps) {
  const isRemoving = removingId === product.id

  return (
    <TableRow
      className="border-slate-100 transition-colors hover:bg-slate-50/40"
      style={{
        // Animación de entrada: fade-in + slide desde abajo
        animation: `rowEnter 0.28s ease-out both`,
        animationDelay: `${index * ROW_STAGGER_MS}ms`,
        // Animación de salida al eliminar
        opacity:    isRemoving ? 0 : undefined,
        transform:  isRemoving ? "translateX(12px) scale(0.98)" : undefined,
        transition: isRemoving ? "all 0.3s ease" : undefined,
      }}
    >
      {/* Miniatura del producto */}
      <TableCell className="px-4 py-2">
        <AdminTableThumb
          src={product.image}
          alt={product.name}
          fallback={product.name}
          variant="cover"
        />
      </TableCell>

      {/* Nombre */}
      <TableCell className="px-4 py-3 font-semibold text-slate-800">
        {product.name}
      </TableCell>

      {/* Categoría — chip violeta */}
      <TableCell className="px-4 py-3">
        <span className="w-fit rounded-md bg-violet-50 px-2 py-0.5 text-[11px] font-medium text-violet-700">
          {product.category}
        </span>
      </TableCell>

      {/* Marca — chip gris */}
      <TableCell className="px-4 py-3">
        <span className="w-fit rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
          {product.brand}
        </span>
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

      {/* Acciones: Editar / Eliminar */}
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
                disabled={isRemoving}
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

// ── Componente principal ──────────────────────────────────────────────────────

/**
 * AdminProductosView — Punto de entrada de la vista admin de productos.
 * Orquesta el estado de paginación y compone los subcomponentes de UI.
 */
export function AdminProductosView() {
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
    /** Carga paginada en el servidor: solo devuelve la página solicitada */
    loadFn: ({ page, query, limit }) =>
      getProductsPagedAction({ page, query, limit }),
  })

  return (
    <div>
      {/* Encabezado con búsqueda y botón "Nuevo producto" */}
      <AdminListHeader
        title="Productos"
        subtitle={loading ? "Cargando…" : `${total} producto${total !== 1 ? "s" : ""}`}
        newHref="/productos/nuevo"
        newLabel="Nuevo producto"
        searchValue={search}
        searchPlaceholder="Buscar por nombre, categoría o marca…"
        onSearch={handleSearch}
      />

      {/*
       * Keyframes inline para la animación de entrada de filas.
       * Se definen aquí para no depender de clases globales externas.
       */}
      <style>{`
        @keyframes rowEnter {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/*
       * Wrapper de la tabla.
       * Durante la carga: se atenúa y desplaza levemente (fade-out suave).
       * Al completarse: los datos nuevos aparecen con rowEnter escalonado.
       */}
      <div
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        style={{
          opacity:    loading ? 0.45 : 1,
          transform:  loading ? "translateY(4px)" : "translateY(0)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        <Table>
          {/* Cabecera fija — no se anima para mantener referencia visual */}
          <TableHeader className="bg-slate-50">
            <TableRow className="border-slate-100">
              <TableHead className="w-14 px-4 py-3 font-semibold text-slate-600">Img</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Nombre</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Categoría</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Marca</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Rating</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Estado</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Estado vacío */}
            {!loading && paged.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-slate-400">
                  {search ? "Sin resultados para esa búsqueda." : "No hay productos aún."}
                </TableCell>
              </TableRow>
            )}

            {/*
             * Filas de producto.
             * La key incluye currentPage para forzar re-mount al cambiar página,
             * lo que dispara nuevamente la animación rowEnter en cada fila.
             */}
            {paged.map((product, i) => (
              <ProductRow
                key={`${currentPage}-${product.id}`}
                product={product}
                index={i}
                removingId={removingId}
                onDelete={() =>
                  handleDelete(product.id, () => deleteProductAction(product.id), product.name)
                }
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
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

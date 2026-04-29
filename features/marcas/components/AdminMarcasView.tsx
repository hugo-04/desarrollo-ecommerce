"use client"

import Link from "next/link"
import Image from "next/image"
import { getBrandsPagedAction, deleteBrandAction } from "@/features/marcas/actions"
import type { Brand } from "@/lib/types"
import { Button }          from "@/components/ui/button"
import {
  Table, TableHeader, TableBody,
  TableHead, TableRow, TableCell,
} from "@/components/ui/table"
import { AdminListHeader }   from "@/components/admin/AdminListHeader"
import { AdminPagination }   from "@/components/admin/AdminPagination"
import { DeleteDialog }      from "@/components/admin/DeleteDialog"
import { useAdminPagedList } from "@/hooks/admin/use-admin-paged-list"

function fmtDate(d?: string): string {
  if (!d) return "—"
  return new Date(d).toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" })
}

const PAGE_SIZE         = 15
const PAGE_SIZE_OPTIONS = [15, 30, 50]
const ROW_STAGGER_MS    = 30

interface BrandRowProps {
  brand:      Brand
  index:      number
  removingId: number | null
  onDelete:   () => void
}

function BrandRow({ brand, index, removingId, onDelete }: BrandRowProps) {
  const isRemoving = removingId === brand.id
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
      {/* Logo */}
      <TableCell className="px-4 py-2">
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {brand.logo ? (
            <Image
              src={brand.logo}
              alt={brand.logoAlt ?? brand.name}
              width={44}
              height={44}
              unoptimized
              className="h-full w-full object-contain p-1"
            />
          ) : (
            <span className="select-none text-lg font-black text-slate-200">{brand.name[0]}</span>
          )}
        </div>
      </TableCell>

      {/* Nombre */}
      <TableCell className="px-4 py-3 font-semibold text-slate-800">{brand.name}</TableCell>

      {/* Carrusel */}
      <TableCell className="px-4 py-3">
        {brand.showInCarousel ? (
          <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600 ring-1 ring-emerald-200">
            Activo
          </span>
        ) : (
          <span className="text-xs text-slate-300">—</span>
        )}
      </TableCell>

      {/* Creado */}
      <TableCell className="px-4 py-3 text-xs text-slate-500 tabular-nums">{fmtDate(brand.createdAt)}</TableCell>

      {/* Actualizado */}
      <TableCell className="px-4 py-3 text-xs text-slate-500 tabular-nums">{fmtDate(brand.updatedAt)}</TableCell>

      {/* Acciones */}
      <TableCell className="px-4 py-3">
        <div className="flex gap-2">
          <Button asChild variant="outline" size="xs">
            <Link href={`/marcas/${brand.id}/editar`}>Editar</Link>
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
            itemName={brand.name}
            onConfirm={onDelete}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}

export function AdminMarcasView() {
  const {
    items, total, loading, search,
    pageSize, currentPage, totalPages, removingId,
    handleSearch, setPage, setPageSize, handleDelete,
  } = useAdminPagedList<Brand>({
    pageSize: PAGE_SIZE,
    loadFn: ({ page, query, limit }) => getBrandsPagedAction({ page, query, limit }),
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
              <TableHead className="w-14 px-4 py-3 font-semibold text-slate-600">Logo</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Nombre</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Carrusel</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Creado</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Actualizado</TableHead>
              <TableHead className="px-4 py-3 font-semibold text-slate-600">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!loading && items.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-slate-400">
                  {search ? "Sin resultados para la búsqueda." : "No hay marcas aún."}
                </TableCell>
              </TableRow>
            )}

            {items.map((brand, i) => (
              <BrandRow
                key={`${currentPage}-${brand.id}`}
                brand={brand}
                index={i}
                removingId={removingId}
                onDelete={() => handleDelete(brand.id, () => deleteBrandAction(brand.id), brand.name)}
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

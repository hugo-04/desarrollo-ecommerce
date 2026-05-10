"use client"

import Link from "next/link"
import { getEspecialidadesPagedAction, deleteEspecialidadAction } from "@/features/especialidades/actions"
import type { EspecialidadDTO } from "@/features/especialidades/types"
import { Button }            from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { AdminListHeader }   from "@/components/admin/AdminListHeader"
import { AdminPagination }   from "@/components/admin/AdminPagination"
import { DeleteDialog }      from "@/components/admin/DeleteDialog"
import { useAdminPagedList } from "@/hooks/admin/use-admin-paged-list"
import { Skeleton }          from "@/components/ui/skeleton"
import { especialidadKeys }  from "@/features/especialidades/hooks"

function fmtDate(d?: string) {
  if (!d) return "—"
  return new Date(d).toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" })
}

const PAGE_SIZE         = 15
const PAGE_SIZE_OPTIONS = [15, 30, 50]
const STAGGER_MS        = 30

function EspRow({ esp, index, removingId, onDelete }: {
  esp: EspecialidadDTO; index: number; removingId: number | null; onDelete: () => void
}) {
  const isRemoving = removingId === esp.id
  return (
    <TableRow
      className="border-slate-100 transition-colors hover:bg-slate-50/40"
      style={{
        animation: `rowEnter 0.28s ease-out both`,
        animationDelay: `${index * STAGGER_MS}ms`,
        opacity:   isRemoving ? 0 : undefined,
        transform: isRemoving ? "translateX(12px) scale(0.98)" : undefined,
        transition: isRemoving ? "all 0.3s ease" : undefined,
      }}
    >
      {/* Imagen */}
      <TableCell className="px-4 py-2">
        <div className={`relative flex h-12 w-20 overflow-hidden rounded-lg bg-gradient-to-br ${esp.gradient}`}>
          {esp.image && esp.image.startsWith("http") && (
            <img src={esp.image} alt={esp.imageAlt ?? esp.title} className="absolute inset-0 h-full w-full object-cover opacity-80" />
          )}
        </div>
      </TableCell>

      {/* Título */}
      <TableCell className="px-4 py-3">
        <p className="font-semibold text-slate-800">{esp.title}</p>
        {esp.subtitle && <p className="text-[11px] text-slate-400 truncate max-w-[200px]">{esp.subtitle}</p>}
      </TableCell>

      {/* Orden */}
      <TableCell className="px-4 py-3 text-sm text-slate-500 tabular-nums">{esp.order}</TableCell>

      {/* Estado */}
      <TableCell className="px-4 py-3">
        {esp.active ? (
          <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600 ring-1 ring-emerald-200">Activo</span>
        ) : (
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-400">Oculto</span>
        )}
      </TableCell>

      {/* Fecha */}
      <TableCell className="px-4 py-3 text-xs text-slate-500 tabular-nums">{fmtDate(esp.updatedAt)}</TableCell>

      {/* Acciones */}
      <TableCell className="px-4 py-3">
        <div className="flex gap-2">
          <Button asChild variant="outline" size="xs">
            <Link href={`/especialidades/${esp.id}/editar`}>Editar</Link>
          </Button>
          <DeleteDialog
            trigger={
              <Button variant="outline" size="xs" disabled={isRemoving}
                className="border-red-100 text-red-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                Eliminar
              </Button>
            }
            itemName={esp.title}
            onConfirm={onDelete}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}

function SkeletonRow() {
  return (
    <TableRow className="border-slate-100">
      <TableCell className="px-4 py-2"><Skeleton className="h-12 w-20 rounded-lg" /></TableCell>
      <TableCell className="px-4 py-3"><Skeleton className="h-4 w-40" /></TableCell>
      <TableCell className="px-4 py-3"><Skeleton className="h-4 w-8" /></TableCell>
      <TableCell className="px-4 py-3"><Skeleton className="h-6 w-16 rounded-md" /></TableCell>
      <TableCell className="px-4 py-3"><Skeleton className="h-4 w-20" /></TableCell>
      <TableCell className="px-4 py-3"><div className="flex gap-2"><Skeleton className="h-7 w-14 rounded-md" /><Skeleton className="h-7 w-16 rounded-md" /></div></TableCell>
    </TableRow>
  )
}

export function AdminEspecialidadesView() {
  const {
    items, total, loading, fetching, search,
    pageSize, currentPage, totalPages, removingId,
    handleSearch, setPage, setPageSize, handleDelete,
  } = useAdminPagedList<EspecialidadDTO>({
    pageSize: PAGE_SIZE,
    loadFn:   getEspecialidadesPagedAction,
    queryKey: especialidadKeys.lists(),
  })

  return (
    <div>
      <AdminListHeader
        title="Especialidades"
        subtitle={loading || fetching ? "Cargando…" : `${total} especialidad${total !== 1 ? "es" : ""}`}
        newHref="/especialidades/nueva"
        newLabel="Nueva especialidad"
        searchValue={search}
        searchPlaceholder="Buscar especialidad…"
        onSearch={handleSearch}
      />

      <style>{`
        @keyframes rowEnter {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {fetching && (
          <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden rounded-t-xl bg-slate-100">
            <div className="h-full w-1/2 animate-[fetchBar_1.2s_ease-in-out_infinite] bg-[#1C2870]/50" />
          </div>
        )}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-slate-100">
                <TableHead className="w-24 px-4 py-3 font-semibold text-slate-600">Imagen</TableHead>
                <TableHead className="px-4 py-3 font-semibold text-slate-600">Título</TableHead>
                <TableHead className="px-4 py-3 font-semibold text-slate-600">Orden</TableHead>
                <TableHead className="px-4 py-3 font-semibold text-slate-600">Estado</TableHead>
                <TableHead className="px-4 py-3 font-semibold text-slate-600">Actualizado</TableHead>
                <TableHead className="px-4 py-3 font-semibold text-slate-600">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(loading || fetching) && Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonRow key={i} />)}
              {!loading && !fetching && items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-slate-400">
                    {search ? "Sin resultados para la búsqueda." : "No hay especialidades aún."}
                  </TableCell>
                </TableRow>
              )}
              {!loading && !fetching && items.map((esp, i) => (
                <EspRow
                  key={`${currentPage}-${esp.id}`}
                  esp={esp} index={i} removingId={removingId}
                  onDelete={() => handleDelete(esp.id, () => deleteEspecialidadAction(esp.id), esp.title)}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AdminPagination
        currentPage={currentPage} totalPages={totalPages} total={total}
        onPage={setPage} pageSize={pageSize} pageSizeOptions={PAGE_SIZE_OPTIONS}
        onPageSize={setPageSize}
      />
    </div>
  )
}

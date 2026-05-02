"use client"

import Link from "next/link"
import { getCategoriesPagedAction, deleteCategoryAction } from "@/features/categorias/actions"
import type { CategoryDTO } from "@/features/categorias/types"
import { Button }          from "@/components/ui/button"
import {
  Table, TableHeader, TableBody,
  TableHead, TableRow, TableCell,
} from "@/components/ui/table"
import { AdminListHeader }   from "@/components/admin/AdminListHeader"
import { AdminPagination }   from "@/components/admin/AdminPagination"
import { DeleteDialog }      from "@/components/admin/DeleteDialog"
import { useAdminPagedList } from "@/hooks/admin/use-admin-paged-list"
import { Skeleton }          from "@/components/ui/skeleton"
import { categoryKeys }      from "@/features/categorias/hooks"

function fmtDate(d?: string): string {
  if (!d) return "—"
  return new Date(d).toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" })
}

const PAGE_SIZE         = 10
const PAGE_SIZE_OPTIONS = [10, 25, 50]
const ROW_STAGGER_MS    = 35

const GRADIENT_PALETTE = [
  "from-[#334155] to-[#151f5c]",
  "from-blue-700 to-blue-900",
  "from-indigo-700 to-[#334155]",
  "from-slate-600 to-slate-800",
  "from-cyan-700 to-blue-900",
  "from-sky-700 to-indigo-900",
  "from-slate-700 to-zinc-900",
  "from-blue-800 to-indigo-950",
]

function autoGradient(slug: string): string {
  let h = 0
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return GRADIENT_PALETTE[h % GRADIENT_PALETTE.length]
}

interface CategoryRowProps {
  cat:        CategoryDTO
  index:      number
  removingId: number | null
  onDelete:   () => void
}

function CategoryRow({ cat, index, removingId, onDelete }: CategoryRowProps) {
  const isRemoving = removingId === cat.id
  return (
    <TableRow
      className="border-slate-100"
      style={{
        animation:      `rowEnter 0.28s ease-out both`,
        animationDelay: `${index * ROW_STAGGER_MS}ms`,
        opacity:    isRemoving ? 0 : undefined,
        transform:  isRemoving ? "translateX(12px) scale(0.98)" : undefined,
        transition: isRemoving ? "all 0.3s ease" : undefined,
      }}
    >
      {/* Franja de color */}
      <TableCell className="w-2 p-0">
        <div className={`h-full min-h-[60px] w-1.5 rounded-r-full bg-gradient-to-b ${autoGradient(cat.slug)}`} />
      </TableCell>

      {/* Nombre */}
      <TableCell className="px-5 py-4 font-semibold text-slate-800">{cat.name}</TableCell>

      {/* Slug */}
      <TableCell className="px-5 py-4">
        <span className="rounded-md bg-slate-100 px-2.5 py-1.5 font-mono text-xs text-slate-500">{cat.slug}</span>
      </TableCell>

      {/* Productos */}
      <TableCell className="px-5 py-4">
        <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-full bg-[#334155]/8 px-2.5 text-xs font-bold text-[#334155]">
          {cat.count}
        </span>
      </TableCell>

      {/* Subcategorías */}
      <TableCell className="px-5 py-4">
        {cat.subcategories.length === 0 ? (
          <span className="text-xs text-slate-300">—</span>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {cat.subcategories.slice(0, 3).map((sub) => (
              <span key={sub} className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">{sub}</span>
            ))}
            {cat.subcategories.length > 3 && (
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-400">
                +{cat.subcategories.length - 3}
              </span>
            )}
          </div>
        )}
      </TableCell>

      {/* Creado */}
      <TableCell className="px-5 py-4 text-xs text-slate-500 tabular-nums">{fmtDate(cat.createdAt)}</TableCell>

      {/* Actualizado */}
      <TableCell className="px-5 py-4 text-xs text-slate-500 tabular-nums">{fmtDate(cat.updatedAt)}</TableCell>

      {/* Acciones */}
      <TableCell className="px-5 py-4">
        <div className="flex gap-2">
          <Button asChild variant="outline" size="xs">
            <Link href={`/categorias/${cat.id}/editar`}>Editar</Link>
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
            itemName={cat.name}
            onConfirm={onDelete}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}

function CategorySkeletonRow() {
  return (
    <TableRow className="border-slate-100">
      <TableCell className="w-2 p-0"><div className="min-h-[60px] w-1.5 rounded-r-full bg-slate-200" /></TableCell>
      <TableCell className="px-5 py-4"><Skeleton className="h-4 w-36" /></TableCell>
      <TableCell className="px-5 py-4"><Skeleton className="h-6 w-28 rounded-md" /></TableCell>
      <TableCell className="px-5 py-4"><Skeleton className="h-7 w-7 rounded-full" /></TableCell>
      <TableCell className="px-5 py-4"><div className="flex gap-1.5"><Skeleton className="h-6 w-20 rounded-md" /><Skeleton className="h-6 w-16 rounded-md" /></div></TableCell>
      <TableCell className="px-5 py-4"><Skeleton className="h-4 w-20" /></TableCell>
      <TableCell className="px-5 py-4"><Skeleton className="h-4 w-20" /></TableCell>
      <TableCell className="px-5 py-4"><div className="flex gap-2"><Skeleton className="h-7 w-14 rounded-md" /><Skeleton className="h-7 w-16 rounded-md" /></div></TableCell>
    </TableRow>
  )
}

export function AdminCategoriasView() {
  const {
    items: paged, total, loading, fetching, search,
    pageSize, currentPage, totalPages, removingId,
    handleSearch, setPage, setPageSize, handleDelete,
  } = useAdminPagedList<CategoryDTO>({
    pageSize: PAGE_SIZE,
    loadFn:   getCategoriesPagedAction,
    queryKey: categoryKeys.lists(),
  })

  return (
    <div>
      <AdminListHeader
        title="Categorías"
        subtitle={loading || fetching ? "Cargando…" : `${total} categoría${total !== 1 ? "s" : ""}`}
        newHref="/categorias/nueva"
        newLabel="Nueva categoría"
        searchValue={search}
        searchPlaceholder="Buscar por nombre o slug…"
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
        <div className="overflow-x-auto overflow-y-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-slate-100">
                <TableHead className="w-8 px-0 py-4" />
                <TableHead className="px-5 py-4 font-semibold text-slate-600">Nombre</TableHead>
                <TableHead className="px-5 py-4 font-semibold text-slate-600">Slug</TableHead>
                <TableHead className="px-5 py-4 font-semibold text-slate-600">Productos</TableHead>
                <TableHead className="px-5 py-4 font-semibold text-slate-600">Subcategorías</TableHead>
                <TableHead className="px-5 py-4 font-semibold text-slate-600">Creado</TableHead>
                <TableHead className="px-5 py-4 font-semibold text-slate-600">Actualizado</TableHead>
                <TableHead className="px-5 py-4 font-semibold text-slate-600">Acciones</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {(loading || fetching) && Array.from({ length: PAGE_SIZE }).map((_, i) => <CategorySkeletonRow key={i} />)}

              {!loading && !fetching && paged.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center text-slate-400">
                    {search ? "Sin resultados para esa búsqueda." : "No hay categorías aún."}
                  </TableCell>
                </TableRow>
              )}

              {!loading && !fetching && paged.map((cat, i) => (
                <CategoryRow
                  key={`${currentPage}-${cat.id}`}
                  cat={cat}
                  index={i}
                  removingId={removingId}
                  onDelete={() => handleDelete(cat.id, () => deleteCategoryAction(cat.id), cat.name)}
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

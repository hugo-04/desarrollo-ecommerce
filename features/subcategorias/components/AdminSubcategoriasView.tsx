"use client"

import Link from "next/link"
import Image from "next/image"
import { getSubcategoriesPagedAction, deleteSubcategoryAction } from "@/features/subcategorias/actions"
import type { SubcategoryDTO } from "@/features/subcategorias/types"
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
import { subcategoryKeys }   from "@/features/subcategorias/hooks"
import { ImageIcon } from "lucide-react"

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

function autoGradient(name: string): string {
  let h = 0
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return GRADIENT_PALETTE[h % GRADIENT_PALETTE.length]
}

// ── Fila ─────────────────────────────────────────────────────────────────────

interface SubcatRowProps {
  sub:        SubcategoryDTO
  index:      number
  removingId: number | null
  onDelete:   () => void
}

function SubcatRow({ sub, index, removingId, onDelete }: SubcatRowProps) {
  const isRemoving = removingId === sub.id
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
        <div className={`h-full min-h-[60px] w-1.5 rounded-r-full bg-gradient-to-b ${autoGradient(sub.name)}`} />
      </TableCell>

      {/* Imagen */}
      <TableCell className="px-4 py-3">
        {sub.image ? (
          <div className="relative h-10 w-14 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
            <Image
              src={sub.image}
              alt={sub.imageAlt ?? sub.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
        ) : (
          <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50">
            <ImageIcon className="h-4 w-4 text-slate-300" />
          </div>
        )}
      </TableCell>

      {/* Nombre */}
      <TableCell className="px-5 py-4 font-semibold text-slate-800">{sub.name}</TableCell>

      {/* Slug */}
      <TableCell className="px-5 py-4">
        {sub.slug ? (
          <span className="rounded-md bg-slate-100 px-2.5 py-1.5 font-mono text-xs text-slate-500">{sub.slug}</span>
        ) : (
          <span className="rounded-md bg-amber-50 px-2.5 py-1.5 text-xs text-amber-600">Sin slug</span>
        )}
      </TableCell>

      {/* Categorías */}
      <TableCell className="px-5 py-4">
        {!sub.categories || sub.categories.length === 0 ? (
          <span className="text-xs text-slate-300">—</span>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {sub.categories.slice(0, 3).map((c) => (
              <span key={c.id} className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">{c.name}</span>
            ))}
            {sub.categories.length > 3 && (
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-400">
                +{sub.categories.length - 3}
              </span>
            )}
          </div>
        )}
      </TableCell>

      {/* Creado */}
      <TableCell className="px-5 py-4 text-xs text-slate-500 tabular-nums">{fmtDate(sub.createdAt)}</TableCell>

      {/* Acciones */}
      <TableCell className="px-5 py-4">
        <div className="flex gap-2">
          <Button asChild variant="outline" size="xs">
            <Link href={`/subcategorias/${sub.id}/editar`}>Editar</Link>
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
            itemName={sub.name}
            onConfirm={onDelete}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}

function SubcatSkeletonRow() {
  return (
    <TableRow className="border-slate-100">
      <TableCell className="w-2 p-0"><div className="min-h-[60px] w-1.5 rounded-r-full bg-slate-200" /></TableCell>
      <TableCell className="px-4 py-3"><Skeleton className="h-10 w-14 rounded-lg" /></TableCell>
      <TableCell className="px-5 py-4"><Skeleton className="h-4 w-36" /></TableCell>
      <TableCell className="px-5 py-4"><Skeleton className="h-6 w-28 rounded-md" /></TableCell>
      <TableCell className="px-5 py-4"><div className="flex gap-1.5"><Skeleton className="h-6 w-20 rounded-md" /></div></TableCell>
      <TableCell className="px-5 py-4"><Skeleton className="h-4 w-20" /></TableCell>
      <TableCell className="px-5 py-4"><div className="flex gap-2"><Skeleton className="h-7 w-14 rounded-md" /><Skeleton className="h-7 w-16 rounded-md" /></div></TableCell>
    </TableRow>
  )
}

// ── Vista principal ───────────────────────────────────────────────────────────

export function AdminSubcategoriasView() {
  const {
    items: paged, total, loading, fetching, search,
    pageSize, currentPage, totalPages, removingId,
    handleSearch, commitSearch, setPage, setPageSize, handleDelete,
  } = useAdminPagedList<SubcategoryDTO>({
    pageSize: PAGE_SIZE,
    loadFn:   getSubcategoriesPagedAction,
    queryKey: subcategoryKeys.lists(),
  })

  return (
    <div>
      <AdminListHeader
        title="Subcategorías"
        subtitle={loading || fetching ? "Cargando…" : `${total} subcategoría${total !== 1 ? "s" : ""}`}
        newHref="/subcategorias/nueva"
        newLabel="Nueva subcategoría"
        searchValue={search}
        searchPlaceholder="Buscar por nombre o slug…"
        onSearch={handleSearch}
        onSearchNow={commitSearch}
        fetching={fetching}
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
                <TableHead className="px-4 py-4 font-semibold text-slate-600">Imagen</TableHead>
                <TableHead className="px-5 py-4 font-semibold text-slate-600">Nombre</TableHead>
                <TableHead className="px-5 py-4 font-semibold text-slate-600">Slug</TableHead>
                <TableHead className="px-5 py-4 font-semibold text-slate-600">Categorías</TableHead>
                <TableHead className="px-5 py-4 font-semibold text-slate-600">Creado</TableHead>
                <TableHead className="px-5 py-4 font-semibold text-slate-600">Acciones</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {(loading || fetching) && Array.from({ length: PAGE_SIZE }).map((_, i) => <SubcatSkeletonRow key={i} />)}

              {!loading && !fetching && paged.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-slate-400">
                    {search ? "Sin resultados para esa búsqueda." : "No hay subcategorías aún."}
                  </TableCell>
                </TableRow>
              )}

              {!loading && !fetching && paged.map((sub, i) => (
                <SubcatRow
                  key={`${currentPage}-${sub.id}`}
                  sub={sub}
                  index={i}
                  removingId={removingId}
                  onDelete={() => handleDelete(sub.id, () => deleteSubcategoryAction(sub.id), sub.name)}
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

"use client"

import Link from "next/link"
import { getBlogPostsPagedAction, deleteBlogPostAction } from "@/features/blogs/actions"
import type { BlogPost } from "@/features/blogs/types"
import { blogKeys }               from "@/features/blogs/hooks"
import { Button }                  from "@/components/ui/button"
import {
  Table, TableHeader, TableBody,
  TableHead, TableRow, TableCell,
} from "@/components/ui/table"
import { AdminListHeader }          from "@/components/admin/AdminListHeader"
import { AdminPagination }          from "@/components/admin/AdminPagination"
import { DeleteDialog }             from "@/components/admin/DeleteDialog"
import { AdminTableThumb }          from "@/components/admin/AdminTableThumb"
import { useAdminPagedList }        from "@/hooks/admin/use-admin-paged-list"
import { Skeleton }                 from "@/components/ui/skeleton"
import { Eye, EyeOff }              from "lucide-react"

function fmtDate(d?: string): string {
  if (!d) return "—"
  return new Date(d).toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" })
}

const PAGE_SIZE         = 10
const PAGE_SIZE_OPTIONS = [10, 25, 50]
const ROW_STAGGER_MS    = 35

interface BlogRowProps {
  post:       BlogPost
  index:      number
  removingId: number | null
  onDelete:   () => void
}

function BlogRow({ post, index, removingId, onDelete }: BlogRowProps) {
  const isRemoving = removingId === post.id

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
        <AdminTableThumb src={post.coverImage} alt={post.title} fallback={post.title} variant="cover" />
      </TableCell>

      {/* Título */}
      <TableCell className="px-4 py-3 max-w-[280px]">
        <p className="font-semibold text-slate-800 leading-snug line-clamp-2">{post.title}</p>
        <p className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">/blog/{post.slug}</p>
      </TableCell>

      {/* Extracto */}
      <TableCell className="px-4 py-3 max-w-[220px]">
        <p className="text-xs text-slate-500 line-clamp-2">{post.excerpt || "—"}</p>
      </TableCell>

      {/* Estado */}
      <TableCell className="px-4 py-3">
        {post.published ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-[11px] font-bold text-green-600 ring-1 ring-green-200">
            <Eye className="h-2.5 w-2.5" /> Publicado
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-500">
            <EyeOff className="h-2.5 w-2.5" /> Borrador
          </span>
        )}
      </TableCell>

      {/* Creado */}
      <TableCell className="px-4 py-3 text-xs text-slate-500 tabular-nums">{fmtDate(post.createdAt)}</TableCell>

      {/* Actualizado */}
      <TableCell className="px-4 py-3 text-xs text-slate-500 tabular-nums">{fmtDate(post.updatedAt)}</TableCell>

      {/* Acciones */}
      <TableCell className="px-4 py-3">
        <div className="flex gap-2">
          <Button asChild variant="outline" size="xs">
            <Link href={`/blogs/${post.id}/editar`}>Editar</Link>
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
            itemName={post.title}
            onConfirm={onDelete}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}

function BlogSkeletonRow() {
  return (
    <TableRow className="border-slate-100">
      <TableCell className="px-4 py-2"><Skeleton className="h-10 w-16 rounded-lg" /></TableCell>
      <TableCell className="px-4 py-3"><Skeleton className="h-4 w-52" /><Skeleton className="h-3 w-32 mt-1" /></TableCell>
      <TableCell className="px-4 py-3"><Skeleton className="h-4 w-44" /></TableCell>
      <TableCell className="px-4 py-3"><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
      <TableCell className="px-4 py-3"><Skeleton className="h-4 w-20" /></TableCell>
      <TableCell className="px-4 py-3"><Skeleton className="h-4 w-20" /></TableCell>
      <TableCell className="px-4 py-3"><div className="flex gap-2"><Skeleton className="h-7 w-14 rounded-md" /><Skeleton className="h-7 w-16 rounded-md" /></div></TableCell>
    </TableRow>
  )
}

export function AdminBlogsView() {
  const {
    items: paged, total, loading, fetching, search,
    pageSize, currentPage, totalPages, removingId,
    handleSearch, setPage, setPageSize, handleDelete,
  } = useAdminPagedList<BlogPost>({
    pageSize: PAGE_SIZE,
    loadFn:   getBlogPostsPagedAction,
    queryKey: blogKeys.lists(),
  })

  return (
    <div>
      <AdminListHeader
        title="Blog"
        subtitle={loading || fetching ? "Cargando…" : `${total} artículo${total !== 1 ? "s" : ""}`}
        newHref="/blogs/nuevo"
        newLabel="Nuevo artículo"
        searchValue={search}
        searchPlaceholder="Buscar por título del artículo…"
        onSearch={handleSearch}
      />

      <style>{`
        @keyframes rowEnter {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fetchBar {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(50%); }
          100% { transform: translateX(200%); }
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
                <TableHead className="w-20 px-4 py-3 font-semibold text-slate-600">Portada</TableHead>
                <TableHead className="px-4 py-3 font-semibold text-slate-600">Título / URL</TableHead>
                <TableHead className="px-4 py-3 font-semibold text-slate-600">Extracto</TableHead>
                <TableHead className="px-4 py-3 font-semibold text-slate-600">Estado</TableHead>
                <TableHead className="px-4 py-3 font-semibold text-slate-600">Creado</TableHead>
                <TableHead className="px-4 py-3 font-semibold text-slate-600">Actualizado</TableHead>
                <TableHead className="px-4 py-3 font-semibold text-slate-600">Acciones</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {(loading || fetching) && Array.from({ length: PAGE_SIZE }).map((_, i) => <BlogSkeletonRow key={i} />)}

              {!loading && !fetching && paged.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-slate-400">
                    {search ? "Sin resultados para esa búsqueda." : "No hay artículos aún. ¡Creá el primero!"}
                  </TableCell>
                </TableRow>
              )}

              {!loading && !fetching && paged.map((post, i) => (
                <BlogRow
                  key={`${currentPage}-${post.id}`}
                  post={post}
                  index={i}
                  removingId={removingId}
                  onDelete={() => handleDelete(post.id, () => deleteBlogPostAction(post.id), post.title)}
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

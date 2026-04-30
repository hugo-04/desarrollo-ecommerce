"use client"

import { useRef, useState }                            from "react"
import { useQuery, useQueryClient, keepPreviousData }  from "@tanstack/react-query"
import { toast }                                       from "sonner"

// ─── Tipos públicos ────────────────────────────────────────────────────────────

export interface PagedResult<T> {
  data:       T[]
  total:      number
  page:       number
  totalPages: number
}

export interface UseAdminPagedListOptions<T extends { id: number }> {
  pageSize: number
  loadFn:   (params: { page: number; query: string; limit: number }) => Promise<PagedResult<T>>
}

// ─── Caché de claves por función (implementación interna) ─────────────────────
// Las Server Actions son referencias estables a nivel de módulo.
// El WeakMap asigna una clave única a cada acción sin exponer nada al exterior.

const fnKeys = new WeakMap<Function, string>()
let   keyIdx = 0

function getStableKey(fn: Function): string {
  if (!fnKeys.has(fn)) fnKeys.set(fn, `ql-${++keyIdx}`)
  return fnKeys.get(fn)!
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAdminPagedList<T extends { id: number }>({
  pageSize: initialPageSize,
  loadFn,
}: UseAdminPagedListOptions<T>) {
  const queryClient = useQueryClient()

  // Clave estable derivada de la función — el view no necesita saber nada de esto
  const stableKey = useRef(getStableKey(loadFn)).current

  const [search, setSearch]           = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSizeState]  = useState(initialPageSize)
  const [removingId, setRemovingId]   = useState<number | null>(null)

  const queryKey = [stableKey, currentPage, search, pageSize] as const

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn:         () => loadFn({ page: currentPage, query: search, limit: pageSize }),
    placeholderData: keepPreviousData,
  })

  const items      = data?.data       ?? []
  const total      = data?.total      ?? 0
  const totalPages = data?.totalPages ?? 1

  function handleSearch(q: string) {
    setSearch(q)
    setCurrentPage(1)
  }

  function handlePage(p: number) {
    setCurrentPage(p)
  }

  function handlePageSize(size: number) {
    setPageSizeState(size)
    setCurrentPage(1)
  }

  async function handleDelete(
    id: number,
    deleteFn: () => Promise<void>,
    itemName = "ítem",
  ) {
    setRemovingId(id)
    try {
      await deleteFn()

      // Optimistic update: elimina del caché actual sin esperar el refetch
      queryClient.setQueryData(queryKey, (old: PagedResult<T> | undefined) => {
        if (!old) return old
        return {
          ...old,
          data:  old.data.filter((i) => i.id !== id),
          total: Math.max(0, old.total - 1),
        }
      })

      // Invalida todas las páginas de este listado para consistencia
      await queryClient.invalidateQueries({ queryKey: [stableKey] })

      setTimeout(() => setRemovingId(null), 280)
      toast.success(`"${itemName}" eliminado correctamente`)
    } catch {
      setRemovingId(null)
      toast.error(`No se pudo eliminar "${itemName}"`)
    }
  }

  return {
    items,
    total,
    loading:     isLoading,
    search,
    pageSize,
    currentPage,
    totalPages,
    removingId,
    handleSearch,
    setPage:     handlePage,
    setPageSize: handlePageSize,
    handleDelete,
  }
}

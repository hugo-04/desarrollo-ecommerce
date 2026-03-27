"use client"

/**
 * useAdminPagedList — Hook para listados con paginación SERVER-SIDE.
 *
 * Soporta cambio dinámico de tamaño de página mediante `setPageSize`.
 * Todos los valores mutables se guardan en refs para evitar closures obsoletas.
 *
 * @template T - Cualquier entidad que tenga un campo `id: number`.
 */

import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

// ─── Tipos ─────────────────────────────────────────────────────────────────────

export interface PagedResult<T> {
  data:       T[]
  total:      number
  page:       number
  totalPages: number
}

export interface UseAdminPagedListOptions<T extends { id: number }> {
  pageSize: number
  loadFn: (params: { page: number; query: string; limit: number }) => Promise<PagedResult<T>>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAdminPagedList<T extends { id: number }>({
  pageSize: initialPageSize,
  loadFn,
}: UseAdminPagedListOptions<T>) {
  const [items, setItems]             = useState<T[]>([])
  const [total, setTotal]             = useState(0)
  const [totalPages, setTotalPages]   = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch]           = useState("")
  const [loading, setLoading]         = useState(true)
  const [removingId, setRemovingId]   = useState<number | null>(null)
  const [pageSize, setPageSizeState]  = useState(initialPageSize)

  // Refs para evitar closures obsoletas en el handler de focus y llamadas manuales
  const loadFnRef   = useRef(loadFn)
  const searchRef   = useRef("")
  const pageRef     = useRef(1)
  const pageSizeRef = useRef(initialPageSize)

  useEffect(() => { loadFnRef.current = loadFn })

  /** Carga una página sin depender de estado — recibe todo por argumento */
  const load = useCallback(async (page: number, query: string, limit: number) => {
    setLoading(true)
    try {
      const result = await loadFnRef.current({ page, query, limit })
      pageRef.current = result.page
      setItems(result.data)
      setTotal(result.total)
      setTotalPages(result.totalPages)
      setCurrentPage(result.page)
    } finally {
      setLoading(false)
    }
  }, [])

  // Carga inicial al montar
  useEffect(() => { load(1, "", pageSizeRef.current) }, [load])

  // Recarga al volver a la pestaña (útil después de crear/editar en otra ruta)
  useEffect(() => {
    function onFocus() { load(pageRef.current, searchRef.current, pageSizeRef.current) }
    window.addEventListener("focus", onFocus)
    return () => window.removeEventListener("focus", onFocus)
  }, [load])

  function handleSearch(q: string) {
    searchRef.current = q
    setSearch(q)
    load(1, q, pageSizeRef.current)
  }

  function handlePage(p: number) {
    pageRef.current = p
    setCurrentPage(p)
    load(p, searchRef.current, pageSizeRef.current)
  }

  /** Cambia el tamaño de página y recarga desde la primera página */
  function handlePageSize(size: number) {
    pageSizeRef.current = size
    setPageSizeState(size)
    load(1, searchRef.current, size)
  }

  /**
   * Elimina un ítem con animación de salida (280 ms) y toast de feedback.
   * Actualiza el total y retira el ítem del estado local sin re-fetchear.
   */
  async function handleDelete(
    id: number,
    deleteFn: () => Promise<void>,
    itemName = "ítem",
  ) {
    setRemovingId(id)
    let timeout: ReturnType<typeof setTimeout> | null = null
    try {
      await deleteFn()
      timeout = setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== id))
        setTotal((t) => Math.max(0, t - 1))
        setRemovingId(null)
      }, 280)
      toast.success(`"${itemName}" eliminado correctamente`)
    } catch {
      if (timeout) clearTimeout(timeout)
      setRemovingId(null)
      toast.error(`No se pudo eliminar "${itemName}"`)
    }
  }

  return {
    items,
    total,
    loading,
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

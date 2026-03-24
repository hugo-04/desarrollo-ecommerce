"use client"

/**
 * useAdminPagedList — Hook para listados con paginación SERVER-SIDE.
 *
 * A diferencia de `useAdminList` (que carga todos los registros de una vez
 * y pagina/filtra en el cliente), este hook llama al servidor en cada cambio
 * de página o búsqueda, trayendo SOLO los registros de la página actual.
 *
 * Cuándo usar cada uno:
 *  - useAdminList       → colecciones pequeñas (< ~100 registros), filtrado instantáneo sin re-fetch
 *  - useAdminPagedList  → colecciones grandes donde traer todo sería costoso (marcas, productos en escala)
 *
 * @template T - Cualquier entidad que tenga un campo `id: number`.
 */

import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

// ─── Tipos ─────────────────────────────────────────────────────────────────────

/** Forma del resultado que debe devolver el `loadFn` */
export interface PagedResult<T> {
  data:       T[]
  total:      number
  page:       number
  totalPages: number
}

export interface UseAdminPagedListOptions<T extends { id: number }> {
  /** Ítems por página */
  pageSize: number
  /**
   * Server action que acepta `{ page, query, limit }` y devuelve `PagedResult<T>`.
   * El hook la llama cada vez que cambia la página o la búsqueda.
   */
  loadFn: (params: { page: number; query: string; limit: number }) => Promise<PagedResult<T>>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAdminPagedList<T extends { id: number }>({
  pageSize,
  loadFn,
}: UseAdminPagedListOptions<T>) {
  const [items, setItems]           = useState<T[]>([])
  const [total, setTotal]           = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch]         = useState("")
  const [loading, setLoading]       = useState(true)
  const [removingId, setRemovingId] = useState<number | null>(null)

  // Guardar loadFn en ref para que no recree `load` si el padre pasa una función inline
  const loadFnRef = useRef(loadFn)
  useEffect(() => { loadFnRef.current = loadFn })

  /** Llama al servidor con la página y búsqueda actuales */
  const load = useCallback(async (page: number, query: string) => {
    setLoading(true)
    try {
      const result = await loadFnRef.current({ page, query, limit: pageSize })
      setItems(result.data)
      setTotal(result.total)
      setTotalPages(result.totalPages)
      setCurrentPage(result.page) // el servidor puede corregir la página si estaba fuera de rango
    } finally {
      setLoading(false)
    }
  }, [pageSize])

  // Carga inicial al montar
  useEffect(() => { load(1, "") }, [load])

  // Recarga al volver a la pestaña (útil después de crear/editar en otra ruta)
  useEffect(() => {
    function onFocus() { load(currentPage, search) }
    window.addEventListener("focus", onFocus)
    return () => window.removeEventListener("focus", onFocus)
  }, [load, currentPage, search])

  /** Cambia la búsqueda y resetea a página 1 */
  function handleSearch(q: string) {
    setSearch(q)
    load(1, q)
  }

  /** Cambia de página */
  function handlePage(p: number) {
    setCurrentPage(p)
    load(p, search)
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
    currentPage,
    totalPages,
    removingId,
    handleSearch,
    setPage: handlePage,
    handleDelete,
  }
}

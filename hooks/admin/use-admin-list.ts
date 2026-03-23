"use client"

/**
 * useAdminList — Hook genérico para las páginas de listado del panel admin.
 *
 * Encapsula toda la lógica común: carga de datos, búsqueda, paginación
 * y eliminación con animación de salida, siguiendo el principio DRY.
 *
 * ⚠️ Diseño importante:
 *   `loadFn` y `filterFn` se guardan en refs para evitar que funciones
 *   definidas inline en el padre (nueva referencia en cada render) disparen
 *   el efecto de carga en un loop infinito.
 *
 * @template T - Cualquier entidad que tenga un campo `id: number`.
 */

import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

// ─── Tipos públicos ────────────────────────────────────────────────────────────

export interface UseAdminListOptions<T extends { id: number }> {
  /** Número de ítems por página */
  pageSize: number
  /** Función que obtiene todos los ítems desde el servidor */
  loadFn: () => Promise<T[]>
  /** Devuelve true si el ítem coincide con la búsqueda */
  filterFn: (item: T, query: string) => boolean
}

export interface UseAdminListReturn<T extends { id: number }> {
  /** Todos los ítems sin filtrar */
  allItems: T[]
  /** Cantidad de ítems que pasan el filtro actual */
  filteredCount: number
  /** Ítems de la página actual (filtrados + paginados) */
  paged: T[]
  loading: boolean
  search: string
  currentPage: number
  totalPages: number
  /** ID del ítem que está en animación de salida */
  removingId: number | null
  handleSearch: (q: string) => void
  setPage: (p: number) => void
  /**
   * Ejecuta la animación de salida, llama a `deleteFn` y muestra toast.
   * Si `deleteFn` falla, revierte el estado visual automáticamente.
   *
   * @param id        - ID del ítem a eliminar
   * @param deleteFn  - Server action de eliminación
   * @param itemName  - Nombre para el mensaje del toast
   */
  handleDelete: (id: number, deleteFn: () => Promise<void>, itemName?: string) => Promise<void>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAdminList<T extends { id: number }>({
  pageSize,
  loadFn,
  filterFn,
}: UseAdminListOptions<T>): UseAdminListReturn<T> {
  const [allItems, setAllItems]     = useState<T[]>([])
  const [search, setSearch]         = useState("")
  const [page, setPage]             = useState(1)
  const [loading, setLoading]       = useState(true)
  const [removingId, setRemovingId] = useState<number | null>(null)

  // ── Refs para funciones del padre ────────────────────────────────────────────
  // Guardar loadFn y filterFn en refs evita que funciones inline (nueva referencia
  // en cada render) recreen `loadAll` y disparen el efecto de carga en loop.
  const loadFnRef   = useRef(loadFn)
  const filterFnRef = useRef(filterFn)
  useEffect(() => { loadFnRef.current   = loadFn   })
  useEffect(() => { filterFnRef.current = filterFn })

  // loadAll es estable (sin dependencias) gracias a los refs
  const loadAll = useCallback(async () => {
    setLoading(true)
    const data = await loadFnRef.current()
    setAllItems(data)
    setLoading(false)
  }, [])

  // Carga inicial al montar el componente
  useEffect(() => { loadAll() }, [loadAll])

  // Recarga al volver a la pestaña (útil tras navegar a crear/editar)
  useEffect(() => {
    window.addEventListener("focus", loadAll)
    return () => window.removeEventListener("focus", loadAll)
  }, [loadAll])

  // ── Derivados: filtrado y paginación ─────────────────────────────────────────
  const filtered    = allItems.filter((item) => !search || filterFnRef.current(item, search))
  const totalPages  = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paged       = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  /** Actualiza la búsqueda y resetea a la primera página */
  function handleSearch(q: string) {
    setSearch(q)
    setPage(1)
  }

  /**
   * Elimina un ítem con animación de salida (280 ms) y feedback via toast.
   *
   * Flujo:
   *  1. Marca el ítem con `removingId` → la tabla aplica la animación CSS.
   *  2. Llama a `deleteFn` en paralelo con la animación.
   *  3a. Si tiene éxito → elimina el ítem del estado después de la animación.
   *  3b. Si falla → cancela el timeout, revierte `removingId` y muestra error.
   */
  async function handleDelete(
    id: number,
    deleteFn: () => Promise<void>,
    itemName = "ítem",
  ) {
    setRemovingId(id)

    // Guardamos el timeout para poder cancelarlo si hay error
    let removeTimeout: ReturnType<typeof setTimeout> | null = null

    try {
      await deleteFn()
      // Éxito: retirar del estado después de la animación
      removeTimeout = setTimeout(() => {
        setAllItems((prev) => prev.filter((item) => item.id !== id))
        setRemovingId(null)
      }, 280)
      toast.success(`"${itemName}" eliminado correctamente`)
    } catch {
      // Error: revertir la animación sin tocar el estado de la lista
      if (removeTimeout) clearTimeout(removeTimeout)
      setRemovingId(null)
      toast.error(`No se pudo eliminar "${itemName}"`)
    }
  }

  return {
    allItems,
    filteredCount: filtered.length,
    paged,
    loading,
    search,
    currentPage,
    totalPages,
    removingId,
    handleSearch,
    setPage,
    handleDelete,
  }
}

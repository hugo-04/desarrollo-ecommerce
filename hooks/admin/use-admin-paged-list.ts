"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
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
  const router       = useRouter()
  const pathname     = usePathname()
  const searchParams = useSearchParams()
  const queryClient  = useQueryClient()
  const stableKey    = useRef(getStableKey(loadFn)).current

  // inputValue: valor inmediato del input controlado
  // query:      valor debounced que realmente dispara el fetch y actualiza la URL
  const [inputValue, setInputValue]  = useState(() => searchParams.get("q")    ?? "")
  const [query, setQuery]            = useState(() => searchParams.get("q")    ?? "")
  const [currentPage, setPageState]  = useState(() => Math.max(1, Number(searchParams.get("page") ?? 1)))
  const [pageSize, setPageSizeState] = useState(initialPageSize)
  const [removingId, setRemovingId]  = useState<number | null>(null)

  // Flags para el efecto de debounce
  const isFirstRender    = useRef(true)
  const skipNextDebounce = useRef(false)

  // Actualiza la URL sin recargar la página
  const pushParams = useCallback((q: string, page: number) => {
    const params = new URLSearchParams()
    if (q)        params.set("q",    q)
    if (page > 1) params.set("page", String(page))
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [router, pathname])

  // Sincronizar estado cuando la URL cambia externamente (ej: botón atrás)
  useEffect(() => {
    const q    = searchParams.get("q")    ?? ""
    const page = Math.max(1, Number(searchParams.get("page") ?? 1))
    skipNextDebounce.current = true  // evitar que el efecto debounce sobreescriba la página
    setInputValue(q)
    setQuery(q)
    setPageState(page)
  }, [searchParams])

  // Debounce: confirma inputValue → query + URL después de 400 ms sin tipear
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return }
    if (skipNextDebounce.current) { skipNextDebounce.current = false; return }
    const t = setTimeout(() => {
      setQuery(inputValue)
      setPageState(1)
      pushParams(inputValue, 1)
    }, 400)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  const queryKey = [stableKey, currentPage, query, pageSize] as const

  const { data, isLoading, isFetching } = useQuery({
    queryKey,
    queryFn:         () => loadFn({ page: currentPage, query, limit: pageSize }),
    placeholderData: keepPreviousData,
  })

  const items      = data?.data       ?? []
  const total      = data?.total      ?? 0
  const totalPages = data?.totalPages ?? 1

  function handleSearch(q: string) {
    setInputValue(q)  // inmediato — el debounce confirma contra la DB
  }

  function handlePage(p: number) {
    setPageState(p)
    pushParams(query, p)
  }

  function handlePageSize(size: number) {
    setPageSizeState(size)
    setPageState(1)
    pushParams(query, 1)
  }

  async function handleDelete(
    id: number,
    deleteFn: () => Promise<void>,
    itemName = "ítem",
  ) {
    setRemovingId(id)
    try {
      await deleteFn()

      queryClient.setQueryData(queryKey, (old: PagedResult<T> | undefined) => {
        if (!old) return old
        return {
          ...old,
          data:  old.data.filter((i) => i.id !== id),
          total: Math.max(0, old.total - 1),
        }
      })

      await queryClient.invalidateQueries({ queryKey: [stableKey] })

      setTimeout(() => setRemovingId(null), 280)
      toast.success(`"${itemName}" eliminado correctamente`)
    } catch (e) {
      setRemovingId(null)
      const msg = e instanceof Error ? e.message : `No se pudo eliminar "${itemName}"`
      toast.error(msg)
    }
  }

  return {
    items,
    total,
    loading:     isLoading,
    fetching:    isFetching && !isLoading,
    search:      inputValue,  // valor inmediato para el input controlado
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

"use client"

/**
 * Hooks de React para categorías — para uso en Client Components.
 *
 * `useCategories` — carga todas las categorías al montar.
 * Expone `loading` y `error` para que el componente pueda mostrar
 * estados intermedios o mensajes de error sin conocer la fuente de datos.
 */

import { useState, useEffect } from "react"
import { getCategoriesAction } from "./actions"
import type { CategoryDTO } from "./types"

interface UseCategoriesReturn {
  categories: CategoryDTO[]
  loading: boolean
  /** Mensaje de error si la carga falló, o null si no hubo problema */
  error: string | null
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<CategoryDTO[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState<string | null>(null)

  useEffect(() => {
    getCategoriesAction()
      .then((c) => { setCategories(c); setLoading(false) })
      .catch((err: unknown) => {
        console.error("[useCategories]", err)
        setError("No se pudieron cargar las categorías")
        setLoading(false)
      })
  }, [])

  return { categories, loading, error }
}

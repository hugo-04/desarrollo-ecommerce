"use client"

/**
 * Hooks de React para marcas — para uso en Client Components.
 *
 * `useBrandNames` — devuelve solo los nombres (para filtros del catálogo).
 * `useBrands`     — devuelve objetos Brand completos (para selects del admin).
 *
 * Ambos loguean errores en consola para facilitar el diagnóstico
 * sin interrumpir la UI con errores no controlados.
 */

import { useState, useEffect } from "react"
import { getBrandNamesAction, getBrandsAction, getBrandsForCarouselAction } from "./actions"
import type { Brand } from "@/lib/types"

// ─── useBrandNames ─────────────────────────────────────────────────────────────

/**
 * Carga los nombres de marca al montar.
 * Ideal para filtros del catálogo donde no se necesita el logo ni el ID.
 */
export function useBrandNames(): string[] {
  const [brands, setBrands] = useState<string[]>([])

  useEffect(() => {
    getBrandNamesAction()
      .then(setBrands)
      .catch((err: unknown) => console.error("[useBrandNames]", err))
  }, [])

  return brands
}

// ─── useBrands ─────────────────────────────────────────────────────────────────

interface UseBrandsReturn {
  brands: Brand[]
  loading: boolean
  /** Mensaje de error si la carga falló, o null si no hubo problema */
  error: string | null
}

/**
 * Carga los objetos Brand completos al montar.
 * Usar cuando se necesite el logo o el ID (panel admin, selects de producto).
 */
export function useBrands(): UseBrandsReturn {
  const [brands, setBrands]   = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    getBrandsAction()
      .then((b) => { setBrands(b); setLoading(false) })
      .catch((err: unknown) => {
        console.error("[useBrands]", err)
        setError("No se pudieron cargar las marcas")
        setLoading(false)
      })
  }, [])

  return { brands, loading, error }
}

// ─── useBrandsCarousel ─────────────────────────────────────────────────────────

/**
 * Carga solo las marcas con showInCarousel=true desde el backend.
 * Usado por el componente MarqueeBrands en el home.
 */
export function useBrandsCarousel(): Brand[] {
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    getBrandsForCarouselAction()
      .then(setBrands)
      .catch((err: unknown) => console.error("[useBrandsCarousel]", err))
  }, [])

  return brands
}

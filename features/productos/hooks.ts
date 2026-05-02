"use client"

/**
 * PRODUCT HOOKS — Solo hooks de productos.
 * Categorías → features/categorias/hooks.ts
 * Marcas     → features/marcas/hooks.ts
 */

import { useState, useEffect, useRef, useCallback } from "react"
import {
  getCatalogAction,
  getProductAction,
  getBestSellersAction,
  getRelatedProductsAction,
} from "./actions"
import type { Product } from "@/lib/types"
import type { ProductFilters } from "./types"
import { log } from "@/lib/logger"

export function useProducts(filters: ProductFilters) {
  const [products, setProducts]     = useState<Product[]>([])
  const [total, setTotal]           = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading]       = useState(true)   // skeleton primera carga
  const [fetching, setFetching]     = useState(false)  // recarga por filtro
  const isFirstLoad                 = useRef(true)

  const filtersKey = JSON.stringify(filters)

  useEffect(() => {
    let cancelled = false

    if (isFirstLoad.current) {
      setLoading(true)
    } else {
      setFetching(true)
    }

    getCatalogAction(filters)
      .then((r) => {
        if (cancelled) return
        setProducts(r.data)
        setTotal(r.total)
        setTotalPages(r.totalPages)
        setLoading(false)
        setFetching(false)
        isFirstLoad.current = false
      })
      .catch(() => {
        if (!cancelled) { setLoading(false); setFetching(false) }
      })

    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey])

  return { products, total, totalPages, loading, fetching }
}

/**
 * useInfiniteProducts — acumula productos a medida que el usuario hace scroll.
 * La página se gestiona internamente; los filtros externos solo controlan
 * categoría, marca, etc. Cuando los filtros cambian, se reinicia a la página 1.
 */
export function useInfiniteProducts(filters: Omit<ProductFilters, "page">) {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [total, setTotal]             = useState(0)
  const [hasMore, setHasMore]         = useState(true)
  const [loading, setLoading]         = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [fetchKey, setFetchKey]       = useState(0)

  const pageRef    = useRef(1)
  const appendRef  = useRef(false)
  const filtersRef = useRef(filters)
  filtersRef.current = filters

  const prevFiltersKey = useRef(JSON.stringify(filters))
  const filtersKey     = JSON.stringify(filters)

  // Detectar cambio de filtros → resetear y disparar fetch desde página 1
  useEffect(() => {
    if (filtersKey === prevFiltersKey.current) return
    prevFiltersKey.current = filtersKey
    pageRef.current   = 1
    appendRef.current = false
    setAllProducts([])
    setTotal(0)
    setHasMore(true)
    setLoading(true)
    setLoadingMore(false)
    setFetchKey((k) => k + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey])

  // Fetch — se ejecuta solo cuando cambia fetchKey
  useEffect(() => {
    let cancelled = false

    getCatalogAction({ ...filtersRef.current, page: pageRef.current })
      .then((r) => {
        if (cancelled) return
        if (appendRef.current) {
          setAllProducts((prev) => [...prev, ...r.data])
        } else {
          setAllProducts(r.data)
        }
        setTotal(r.total)
        setHasMore(pageRef.current < r.totalPages)
        setLoading(false)
        setLoadingMore(false)
      })
      .catch(() => {
        if (!cancelled) { setLoading(false); setLoadingMore(false) }
      })

    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchKey])

  const loadMore = useCallback(() => {
    if (loadingMore || loading || !hasMore) return
    pageRef.current  += 1
    appendRef.current = true
    setLoadingMore(true)
    setFetchKey((k) => k + 1)
  }, [loadingMore, loading, hasMore])

  return { products: allProducts, total, hasMore, loading, loadingMore, loadMore }
}

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getProductAction(id)
      .then((p) => { setProduct(p); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  return { product, loading }
}

export function useBestSellers() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    getBestSellersAction()
      .then((p) => { setProducts(p); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return { products, loading }
}

export function useRelatedProducts(productId: number, categoryName: string) {
  const [related, setRelated] = useState<Product[]>([])

  useEffect(() => {
    if (!categoryName) return
    getRelatedProductsAction(productId, categoryName)
      .then(setRelated)
      .catch((err: unknown) => log.error("[useRelatedProducts]", err))
  }, [productId, categoryName])

  return related
}

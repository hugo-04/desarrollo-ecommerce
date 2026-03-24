"use client"

/**
 * PRODUCT HOOKS — Solo hooks de productos.
 * Categorías → features/categorias/hooks.ts
 * Marcas     → features/marcas/hooks.ts
 */

import { useState, useEffect } from "react"
import {
  getCatalogAction,
  getProductAction,
  getBestSellersAction,
  getRelatedProductsAction,
} from "./actions"
import type { Product } from "@/lib/types"
import type { ProductFilters } from "./types"

export function useProducts(filters: ProductFilters) {
  const [products, setProducts]     = useState<Product[]>([])
  const [total, setTotal]           = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading]       = useState(true)

  const filtersKey = JSON.stringify(filters)

  useEffect(() => {
    setLoading(true)
    getCatalogAction(filters)
      .then((r) => { setProducts(r.data); setTotal(r.total); setTotalPages(r.totalPages); setLoading(false) })
      .catch(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey])

  return { products, total, totalPages, loading }
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
    getRelatedProductsAction(productId, categoryName).then(setRelated).catch(() => {})
  }, [productId, categoryName])

  return related
}

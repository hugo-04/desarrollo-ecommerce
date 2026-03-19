"use client"

/**
 * PRODUCT HOOKS — React integration layer
 *
 * Bridges the ProductService with React state/effects.
 * Components import these hooks — they never touch the service or repository directly.
 *
 * Principle: Dependency Inversion — hooks depend on service abstraction.
 */

import { useState, useEffect, useMemo } from "react"
import { MockProductRepository } from "./repository"
import { ProductService } from "./service"
import type { Product, Category } from "@/lib/types"
import type { ProductFilters } from "./types"

// ─── Singleton service (swap repository here to switch data source) ───────────

const productService = new ProductService(new MockProductRepository())

// ─── useProducts ─────────────────────────────────────────────────────────────

export function useProducts(filters: ProductFilters) {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  const filtersKey = JSON.stringify(filters)

  useEffect(() => {
    setLoading(true)
    productService.getCatalog(filters).then((result) => {
      setProducts(result.data)
      setTotal(result.total)
      setTotalPages(result.totalPages)
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey])

  return { products, total, totalPages, loading }
}

// ─── useProduct ──────────────────────────────────────────────────────────────

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    productService.getProductById(id).then((p) => {
      setProduct(p)
      setLoading(false)
    })
  }, [id])

  return { product, loading }
}

// ─── useBestSellers ──────────────────────────────────────────────────────────

export function useBestSellers() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productService.getBestSellers().then((p) => {
      setProducts(p)
      setLoading(false)
    })
  }, [])

  return { products, loading }
}

// ─── useRelatedProducts ───────────────────────────────────────────────────────

export function useRelatedProducts(productId: number, categoryName: string) {
  const [related, setRelated] = useState<Product[]>([])

  useEffect(() => {
    if (!categoryName) return
    productService.getRelatedProducts(productId, categoryName).then(setRelated)
  }, [productId, categoryName])

  return related
}

// ─── useCategories ────────────────────────────────────────────────────────────

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productService.getCategories().then((c) => {
      setCategories(c)
      setLoading(false)
    })
  }, [])

  return { categories, loading }
}

// ─── useBrandNames ────────────────────────────────────────────────────────────

export function useBrandNames() {
  const [brands, setBrands] = useState<string[]>([])

  useEffect(() => {
    productService.getBrandNames().then(setBrands)
  }, [])

  return brands
}

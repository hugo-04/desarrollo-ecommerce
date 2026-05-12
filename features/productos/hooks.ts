"use client"

import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getCatalogAction,
  getProductAction,
  getBestSellersAction,
  getRelatedProductsAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
} from "./actions"
import type { ProductFilters } from "./types"

// ─── Query Keys ──────────────────────────────────────────────────────────────
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: any) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  infinite: (filters: any) => [...productKeys.all, "infinite", filters] as const,
}

// ─── useProducts ─────────────────────────────────────────────────────────────
export function useProducts(filters: ProductFilters, initialData?: Awaited<ReturnType<typeof getCatalogAction>>) {
  return useQuery({
    queryKey:    productKeys.list(filters),
    queryFn:     () => getCatalogAction(filters),
    initialData,
  })
}

// ─── useInfiniteProducts ──────────────────────────────────────────────────────
export function useInfiniteProducts(filters: Omit<ProductFilters, "page">) {
  return useInfiniteQuery({
    queryKey: productKeys.infinite(filters),
    queryFn: ({ pageParam = 1 }) => getCatalogAction({ ...filters, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
  })
}

// ─── useProduct ───────────────────────────────────────────────────────────────
export function useProduct(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductAction(id),
    enabled: !!id && !isNaN(id),
  })
}

// ─── useBestSellers ──────────────────────────────────────────────────────────
export function useBestSellers() {
  return useQuery({
    queryKey: [...productKeys.all, "best-sellers"],
    queryFn: () => getBestSellersAction(),
  })
}

// ─── useRelatedProducts ───────────────────────────────────────────────────────
export function useRelatedProducts(productId: number, categoryName: string) {
  return useQuery({
    queryKey: [...productKeys.all, "related", productId, categoryName],
    queryFn: () => getRelatedProductsAction(productId, categoryName),
    enabled: !!productId && !!categoryName,
  })
}

// ─── Mutaciones ───────────────────────────────────────────────────────────────

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProductAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateProductAction(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteProductAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}

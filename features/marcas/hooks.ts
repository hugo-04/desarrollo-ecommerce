"use client"

import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { 
  getBrandNamesAction, 
  getBrandsAction, 
  getBrandsForCarouselAction, 
  getBrandsPagedAction,
  getBrandByIdAction,
  createBrandAction,
  updateBrandAction,
  deleteBrandAction
} from "./actions"

// ─── Query Keys ──────────────────────────────────────────────────────────────
export const brandKeys = {
  all: ["brands"] as const,
  names: () => [...brandKeys.all, "names"] as const,
  lists: () => [...brandKeys.all, "list"] as const,
  details: () => [...brandKeys.all, "detail"] as const,
  detail: (id: number) => [...brandKeys.details(), id] as const,
  carousel: () => [...brandKeys.all, "carousel"] as const,
  infinite: (query: string) => [...brandKeys.all, "infinite", query] as const,
}

// ─── useBrandNames ─────────────────────────────────────────────────────────────
export function useBrandNames() {
  return useQuery({
    queryKey: brandKeys.names(),
    queryFn: getBrandNamesAction,
  })
}

// ─── useBrands ─────────────────────────────────────────────────────────────────
export function useBrands() {
  return useQuery({
    queryKey: brandKeys.lists(),
    queryFn: getBrandsAction,
  })
}

// ─── useBrand ──────────────────────────────────────────────────────────────────
export function useBrand(id: number) {
  return useQuery({
    queryKey: brandKeys.detail(id),
    queryFn: () => getBrandByIdAction(id),
    enabled: !!id && !isNaN(id),
  })
}

// ─── useBrandsCarousel ─────────────────────────────────────────────────────────
export function useBrandsCarousel() {
  return useQuery({
    queryKey: brandKeys.carousel(),
    queryFn: getBrandsForCarouselAction,
  })
}

// ─── useInfiniteBrands ────────────────────────────────────────────────────────
export function useInfiniteBrands(query: string = "") {
  return useInfiniteQuery({
    queryKey: brandKeys.infinite(query),
    queryFn: ({ pageParam = 1 }) => getBrandsPagedAction({ query, page: pageParam as number, limit: 15 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
  })
}

// ─── Mutaciones ───────────────────────────────────────────────────────────────

export function useCreateBrand() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createBrandAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.all })
    },
  })
}

export function useUpdateBrand() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateBrandAction(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: brandKeys.all })
      queryClient.invalidateQueries({ queryKey: brandKeys.detail(id) })
    },
  })
}

export function useDeleteBrand() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteBrandAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.all })
    },
  })
}


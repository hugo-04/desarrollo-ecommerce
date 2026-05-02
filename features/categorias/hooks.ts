"use client"

import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { 
  getCategoriesAction, 
  getCategoriesPagedAction, 
  createCategoryAction,
  getCategoryByIdAction,
  updateCategoryAction,
  deleteCategoryAction
} from "./actions"

// ─── Query Keys ──────────────────────────────────────────────────────────────
export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  details: () => [...categoryKeys.all, "detail"] as const,
  detail: (id: number) => [...categoryKeys.details(), id] as const,
  infinite: (query: string) => [...categoryKeys.all, "infinite", query] as const,
}

// ─── useCategories ─────────────────────────────────────────────────────────────
export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: getCategoriesAction,
  })
}

// ─── useCategory ───────────────────────────────────────────────────────────────
export function useCategory(id: number) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => getCategoryByIdAction(id),
    enabled: !!id && !isNaN(id),
  })
}

// ─── useInfiniteCategories ───────────────────────────────────────────────────
export function useInfiniteCategories(query: string = "") {
  return useInfiniteQuery({
    queryKey: categoryKeys.infinite(query),
    queryFn: ({ pageParam = 1 }) => getCategoriesPagedAction({ query, page: pageParam as number, limit: 15 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
  })
}

// ─── Mutaciones ───────────────────────────────────────────────────────────────

export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCategoryAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateCategoryAction(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(id) })
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteCategoryAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
  })
}


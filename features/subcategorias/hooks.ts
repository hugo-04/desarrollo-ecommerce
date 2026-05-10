"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getSubcategoriesAction,
  getSubcategoriesPagedAction,
  getSubcategoryByIdAction,
  createSubcategoryFullAction,
  updateSubcategoryAction,
  deleteSubcategoryAction,
} from "./actions"

export const subcategoryKeys = {
  all:     ["subcategories"] as const,
  lists:   () => [...subcategoryKeys.all, "list"] as const,
  details: () => [...subcategoryKeys.all, "detail"] as const,
  detail:  (id: number) => [...subcategoryKeys.details(), id] as const,
}

export function useSubcategories() {
  return useQuery({
    queryKey: subcategoryKeys.lists(),
    queryFn:  getSubcategoriesAction,
  })
}

export function useSubcategory(id: number) {
  return useQuery({
    queryKey: subcategoryKeys.detail(id),
    queryFn:  () => getSubcategoryByIdAction(id),
    enabled:  !!id && !isNaN(id),
  })
}

export function useCreateSubcategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createSubcategoryFullAction,
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: subcategoryKeys.all }),
  })
}

export function useUpdateSubcategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateSubcategoryAction(id, data),
    onSuccess:  (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: subcategoryKeys.all })
      queryClient.invalidateQueries({ queryKey: subcategoryKeys.detail(id) })
    },
  })
}

export function useDeleteSubcategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteSubcategoryAction(id),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: subcategoryKeys.all }),
  })
}

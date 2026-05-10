"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBlogPostAction } from "./actions"

export const blogKeys = {
  all:   () => ["blogs"] as const,
  lists: () => [...blogKeys.all(), "list"] as const,
  detail:(id: number) => [...blogKeys.all(), "detail", id] as const,
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteBlogPostAction(id),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: blogKeys.all() }),
  })
}

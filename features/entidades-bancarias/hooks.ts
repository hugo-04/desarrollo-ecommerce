"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getEntidadesBancariasActivasAction,
  getEntidadesBancariasPagedAction,
  getEntidadBancariaByIdAction,
  createEntidadBancariaAction,
  updateEntidadBancariaAction,
  deleteEntidadBancariaAction,
} from "./actions"
import type { EntidadBancariaFilters } from "./types"

export const entidadBancariaKeys = {
  all:    ["entidades-bancarias"] as const,
  active: () => [...entidadBancariaKeys.all, "active"] as const,
  lists:  () => [...entidadBancariaKeys.all, "list"] as const,
  detail: (id: number) => [...entidadBancariaKeys.all, "detail", id] as const,
}

export function useEntidadesBancariasActivas() {
  return useQuery({
    queryKey: entidadBancariaKeys.active(),
    queryFn:  getEntidadesBancariasActivasAction,
  })
}

export function useEntidadesBancariasPaged(filters: EntidadBancariaFilters) {
  return useQuery({
    queryKey: [...entidadBancariaKeys.lists(), filters],
    queryFn:  () => getEntidadesBancariasPagedAction(filters),
  })
}

export function useEntidadBancaria(id: number) {
  return useQuery({
    queryKey: entidadBancariaKeys.detail(id),
    queryFn:  () => getEntidadBancariaByIdAction(id),
    enabled:  !!id && !isNaN(id),
  })
}

export function useCreateEntidadBancaria() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createEntidadBancariaAction,
    onSuccess:  () => qc.invalidateQueries({ queryKey: entidadBancariaKeys.all }),
  })
}

export function useUpdateEntidadBancaria() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateEntidadBancariaAction(id, data),
    onSuccess:  (_, { id }) => {
      qc.invalidateQueries({ queryKey: entidadBancariaKeys.all })
      qc.invalidateQueries({ queryKey: entidadBancariaKeys.detail(id) })
    },
  })
}

export function useDeleteEntidadBancaria() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteEntidadBancariaAction(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: entidadBancariaKeys.all }),
  })
}

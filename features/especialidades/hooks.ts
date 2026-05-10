"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getEspecialidadesActivasAction,
  getEspecialidadesPagedAction,
  getEspecialidadByIdAction,
  createEspecialidadAction,
  updateEspecialidadAction,
  deleteEspecialidadAction,
} from "./actions"
import type { EspecialidadFilters } from "./types"

export const especialidadKeys = {
  all:    ["especialidades"] as const,
  active: () => [...especialidadKeys.all, "active"] as const,
  lists:  () => [...especialidadKeys.all, "list"] as const,
  detail: (id: number) => [...especialidadKeys.all, "detail", id] as const,
}

export function useEspecialidadesActivas() {
  return useQuery({
    queryKey: especialidadKeys.active(),
    queryFn:  getEspecialidadesActivasAction,
  })
}

export function useEspecialidadesPaged(filters: EspecialidadFilters) {
  return useQuery({
    queryKey: [...especialidadKeys.lists(), filters],
    queryFn:  () => getEspecialidadesPagedAction(filters),
  })
}

export function useEspecialidad(id: number) {
  return useQuery({
    queryKey: especialidadKeys.detail(id),
    queryFn:  () => getEspecialidadByIdAction(id),
    enabled:  !!id && !isNaN(id),
  })
}

export function useCreateEspecialidad() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createEspecialidadAction,
    onSuccess:  () => qc.invalidateQueries({ queryKey: especialidadKeys.all }),
  })
}

export function useUpdateEspecialidad() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateEspecialidadAction(id, data),
    onSuccess:  (_, { id }) => {
      qc.invalidateQueries({ queryKey: especialidadKeys.all })
      qc.invalidateQueries({ queryKey: especialidadKeys.detail(id) })
    },
  })
}

export function useDeleteEspecialidad() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteEspecialidadAction(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: especialidadKeys.all }),
  })
}

"use client"

import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { HeroSlideForm } from "@/components/admin/HeroSlideForm"
import { createHeroSlideAction } from "@/features/hero/actions"
import type { CreateHeroSlideDTO, UpdateHeroSlideDTO } from "@/features/hero/types"

const QK = ["hero-slides"]

export default function NuevoHeroSlidePage() {
  const router      = useRouter()
  const queryClient = useQueryClient()

  async function handleSave(data: CreateHeroSlideDTO | UpdateHeroSlideDTO) {
    const result = await createHeroSlideAction(data as CreateHeroSlideDTO)
    await queryClient.invalidateQueries({ queryKey: QK })
    return result
  }

  return (
    <div className="mx-auto max-w-3xl pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Nuevo slide del hero</h1>
        <p className="text-sm text-slate-500 mt-1">Subí la imagen a R2 y configurá el estilo visual.</p>
      </div>
      <HeroSlideForm onSave={handleSave} backHref="/hero" />
    </div>
  )
}

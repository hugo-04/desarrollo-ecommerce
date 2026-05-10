"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { HeroSlideForm } from "@/components/admin/HeroSlideForm"
import { getHeroSlideByIdAction, updateHeroSlideAction } from "@/features/hero/actions"
import type { HeroSlide, UpdateHeroSlideDTO } from "@/features/hero/types"

const QK = ["hero-slides"]

export default function EditarHeroSlidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const slideId = Number(id)
  const router  = useRouter()
  const queryClient = useQueryClient()

  const [slide,   setSlide]   = useState<HeroSlide | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHeroSlideByIdAction(slideId)
      .then((s) => {
        if (!s) { toast.error("Slide no encontrado"); router.push("/hero"); return }
        setSlide(s)
      })
      .finally(() => setLoading(false))
  }, [slideId, router])

  async function handleSave(data: UpdateHeroSlideDTO) {
    const result = await updateHeroSlideAction(slideId, data)
    await queryClient.invalidateQueries({ queryKey: QK })
    return result
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
    </div>
  )
  if (!slide) return null

  return (
    <div className="mx-auto max-w-3xl pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Editar slide</h1>
        <p className="text-sm text-slate-500 mt-1">{slide.label}</p>
      </div>
      <HeroSlideForm slide={slide} onSave={handleSave} backHref="/hero" />
    </div>
  )
}

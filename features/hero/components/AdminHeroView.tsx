"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  ChevronUp, ChevronDown, Pencil, Trash2, Plus,
  Eye, EyeOff, ImageOff, GripVertical, Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteDialog } from "@/components/admin/DeleteDialog"
import {
  getAllHeroSlidesAction,
  deleteHeroSlideAction,
  reorderHeroSlideAction,
  updateHeroSlideAction,
} from "@/features/hero/actions"
import type { HeroSlide } from "@/features/hero/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"

const QK = ["hero-slides"]

export function AdminHeroView() {
  const router       = useRouter()
  const queryClient  = useQueryClient()
  const [pending, startTransition] = useTransition()
  const [busyId, setBusyId] = useState<number | null>(null)

  const { data: slides = [], isLoading } = useQuery<HeroSlide[]>({
    queryKey: QK,
    queryFn:  getAllHeroSlidesAction,
  })

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: QK })
  }

  async function handleReorder(id: number, dir: "up" | "down") {
    setBusyId(id)
    try {
      await reorderHeroSlideAction(id, dir)
      invalidate()
    } catch { toast.error("No se pudo reordenar") }
    finally { setBusyId(null) }
  }

  async function handleToggleActive(slide: HeroSlide) {
    setBusyId(slide.id)
    try {
      await updateHeroSlideAction(slide.id, { active: !slide.active })
      invalidate()
      toast.success(slide.active ? "Slide desactivado" : "Slide activado")
    } catch { toast.error("Error al cambiar estado") }
    finally { setBusyId(null) }
  }

  async function handleDelete(id: number, label: string) {
    setBusyId(id)
    try {
      await deleteHeroSlideAction(id)
      invalidate()
      toast.success(`"${label}" eliminado`)
    } catch { toast.error("No se pudo eliminar") }
    finally { setBusyId(null) }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hero — Slides del inicio</h1>
          <p className="text-sm text-slate-500 mt-1">
            Administrá las imágenes del carrusel principal. Cambiá el orden con las flechas.
          </p>
        </div>
        <Button asChild className="bg-[#1B2B4B] hover:bg-[#1B2B4B]/90 text-white shrink-0">
          <Link href="/hero/nuevo">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo slide
          </Link>
        </Button>
      </div>

      {/* Estado vacío / loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      )}

      {!isLoading && slides.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-slate-200 py-16 text-center">
          <ImageOff className="mx-auto h-10 w-10 text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">No hay slides configurados</p>
          <p className="text-slate-400 text-sm mt-1">Creá el primero para que aparezca en la portada</p>
          <Button asChild className="mt-5 bg-[#1B2B4B] text-white">
            <Link href="/hero/nuevo"><Plus className="h-4 w-4 mr-2" />Crear primer slide</Link>
          </Button>
        </div>
      )}

      {/* Lista de slides */}
      {!isLoading && slides.length > 0 && (
        <div className="space-y-3">
          {slides.map((slide, idx) => {
            const isBusy = busyId === slide.id
            return (
              <div
                key={slide.id}
                className={`group relative flex items-stretch gap-0 overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 ${
                  slide.active ? "border-slate-200" : "border-slate-100 opacity-60"
                }`}
              >
                {/* Drag handle decorativo */}
                <div className="flex items-center px-3 bg-slate-50 border-r border-slate-100 text-slate-300">
                  <GripVertical className="h-4 w-4" />
                </div>

                {/* Número de orden */}
                <div className="flex items-center justify-center w-10 bg-slate-50 border-r border-slate-100">
                  <span className="text-sm font-black text-slate-400 tabular-nums">{idx + 1}</span>
                </div>

                {/* Imagen preview */}
                <div className="relative w-36 shrink-0 overflow-hidden bg-slate-100 sm:w-48">
                  {slide.image ? (
                    <>
                      <img
                        src={slide.image}
                        alt={slide.imageAlt || slide.label}
                        className="h-full w-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-linear-to-br ${slide.gradient} opacity-60`} />
                      <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/90 truncate">
                          {slide.label}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full min-h-[80px] items-center justify-center bg-slate-100">
                      <ImageOff className="h-6 w-6 text-slate-300" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-center gap-1 px-4 py-3 min-w-0">
                  <p className="font-bold text-slate-800 truncate">{slide.label}</p>
                  {slide.imageAlt && (
                    <p className="text-xs text-slate-400 truncate">Alt: {slide.imageAlt}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    {slide.active ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-600 ring-1 ring-green-200">
                        <Eye className="h-2.5 w-2.5" /> Activo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                        <EyeOff className="h-2.5 w-2.5" /> Oculto
                      </span>
                    )}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-col items-center justify-center gap-1.5 border-l border-slate-100 px-3 py-3 bg-slate-50/50">

                  {/* Reordenar */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleReorder(slide.id, "up")}
                      disabled={isBusy || idx === 0}
                      title="Subir"
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-[#1B2B4B] hover:text-white hover:border-[#1B2B4B] disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {isBusy ? <Loader2 className="h-3 w-3 animate-spin" /> : <ChevronUp className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => handleReorder(slide.id, "down")}
                      disabled={isBusy || idx === slides.length - 1}
                      title="Bajar"
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-[#1B2B4B] hover:text-white hover:border-[#1B2B4B] disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {isBusy ? <Loader2 className="h-3 w-3 animate-spin" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  {/* Activar/desactivar */}
                  <button
                    onClick={() => handleToggleActive(slide)}
                    disabled={isBusy}
                    title={slide.active ? "Desactivar" : "Activar"}
                    className={`flex h-7 w-7 items-center justify-center rounded-lg border transition ${
                      slide.active
                        ? "border-green-200 bg-green-50 text-green-600 hover:bg-green-100"
                        : "border-slate-200 bg-white text-slate-400 hover:bg-slate-100"
                    } disabled:opacity-50`}
                  >
                    {slide.active ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>

                  {/* Editar */}
                  <Link
                    href={`/hero/${slide.id}/editar`}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35]"
                    title="Editar"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>

                  {/* Eliminar */}
                  <DeleteDialog
                    trigger={
                      <button
                        disabled={isBusy}
                        title="Eliminar"
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-100 bg-white text-red-400 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200 disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    }
                    itemName={slide.label}
                    onConfirm={() => handleDelete(slide.id, slide.label)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Nota informativa */}
      {slides.length > 0 && (
        <p className="mt-5 text-center text-xs text-slate-400">
          {slides.filter(s => s.active).length} de {slides.length} slide{slides.length !== 1 ? "s" : ""} activo{slides.filter(s => s.active).length !== 1 ? "s" : ""} · La portada muestra automáticamente los activos en este orden
        </p>
      )}
    </div>
  )
}

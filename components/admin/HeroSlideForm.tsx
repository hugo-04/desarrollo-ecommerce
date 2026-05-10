"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/ui/ImageUpload"
import type { HeroSlide, CreateHeroSlideDTO, UpdateHeroSlideDTO } from "@/features/hero/types"

// ─── Opciones de gradiente disponibles ───────────────────────────────────────

export const GRADIENT_OPTIONS = [
  { label: "Azul profundo",  value: "from-[#003D73] via-[#00316b] to-[#00244f]",   preview: "linear-gradient(to right, #003D73, #00316b, #00244f)" },
  { label: "Azul marino",    value: "from-[#004d8f] via-[#003d72] to-[#002a52]",   preview: "linear-gradient(to right, #004d8f, #003d72, #002a52)" },
  { label: "Azul noche",     value: "from-[#002a5c] via-[#001f46] to-[#001530]",   preview: "linear-gradient(to right, #002a5c, #001f46, #001530)" },
  { label: "Azul empresa",   value: "from-[#1B2B4B] via-[#142040] to-[#0d1630]",   preview: "linear-gradient(to right, #1B2B4B, #142040, #0d1630)" },
  { label: "Azul oscuro",    value: "from-[#0f2944] via-[#0a1e33] to-[#061222]",   preview: "linear-gradient(to right, #0f2944, #0a1e33, #061222)" },
]

interface HeroSlideFormProps {
  slide?:   HeroSlide
  onSave:   (data: CreateHeroSlideDTO | UpdateHeroSlideDTO) => Promise<HeroSlide>
  backHref?: string
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="flex items-center gap-0.5 text-xs font-semibold text-slate-600">
      {children}{required && <span className="text-red-500">*</span>}
    </label>
  )
}

export function HeroSlideForm({ slide, onSave, backHref = "/hero" }: HeroSlideFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [label,    setLabel]    = useState(slide?.label    ?? "")
  const [image,    setImage]    = useState(slide?.image    ?? "")
  const [imageAlt, setImageAlt] = useState(slide?.imageAlt ?? "")
  const [gradient, setGradient] = useState(slide?.gradient ?? GRADIENT_OPTIONS[0].value)
  const [active,   setActive]   = useState(slide?.active   ?? true)
  const [errors,   setErrors]   = useState<Record<string, string>>({})

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!label.trim()) e.label = "El label es obligatorio"
    if (!image)        e.image = "La imagen es obligatoria"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    startTransition(async () => {
      try {
        await onSave({ label, image, imageAlt: imageAlt || undefined, gradient, active })
        toast.success(slide ? "Slide actualizado" : "Slide creado correctamente")
        router.push(backHref)
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Error al guardar")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">

      {/* Imagen */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-3">Imagen del slide</h3>
        <ImageUpload
          value={image}
          onChange={setImage}
          altValue={imageAlt}
          onAltChange={setImageAlt}
          aspect="16/9"
          folder="hero"
          label="Foto de fondo (se sube a R2)"
          required
        />
        {errors.image && <p className="text-xs text-red-500">{errors.image}</p>}
      </div>

      {/* Datos */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-3">Configuración del slide</h3>

        {/* Label */}
        <div className="space-y-1.5">
          <FieldLabel required>Etiqueta del slide (texto del badge)</FieldLabel>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder='Ej: "Insumos Industriales" o "SKF · Parker · Gates"'
            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
              errors.label
                ? "border-red-300 focus:ring-red-100"
                : "border-slate-200 focus:border-[#334155]/40 focus:ring-[#334155]/15"
            }`}
          />
          {errors.label && <p className="text-xs text-red-500">{errors.label}</p>}
        </div>

        {/* Gradiente */}
        <div className="space-y-2">
          <FieldLabel>Color de overlay (gradiente de marca)</FieldLabel>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {GRADIENT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setGradient(opt.value)}
                className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all ${
                  gradient === opt.value
                    ? "border-[#1B2B4B] bg-[#1B2B4B]/5 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div
                  className="h-8 w-12 shrink-0 rounded-lg"
                  style={{ background: opt.preview }}
                />
                <div>
                  <p className="text-xs font-semibold text-slate-700">{opt.label}</p>
                  {gradient === opt.value && (
                    <p className="text-[10px] text-[#1B2B4B] font-bold">Seleccionado</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Preview del overlay */}
        {image && (
          <div className="space-y-1.5">
            <FieldLabel>Vista previa del slide</FieldLabel>
            <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
              <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-70`} />
              <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" />
                  {label || "Etiqueta del slide"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Activo */}
        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-slate-700">Estado</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {active ? "Visible en el hero del sitio" : "Oculto — no aparece en el sitio"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActive(!active)}
            className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-all duration-200 ${
              active ? "bg-green-500 justify-end" : "bg-slate-300 justify-start"
            }`}
          >
            <span className="h-5 w-5 rounded-full bg-white shadow-sm" />
          </button>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-3 justify-end pb-6">
        <Button type="button" variant="outline" onClick={() => router.push(backHref)} disabled={isPending}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending} className="bg-[#1B2B4B] hover:bg-[#1B2B4B]/90 text-white">
          {isPending
            ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Guardando…</>
            : <><Save className="h-4 w-4 mr-2" />{slide ? "Actualizar slide" : "Crear slide"}</>
          }
        </Button>
      </div>
    </form>
  )
}

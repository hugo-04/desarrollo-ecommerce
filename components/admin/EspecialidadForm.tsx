"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { DeleteDialog } from "@/components/admin/DeleteDialog"
import { Button } from "@/components/ui/button"
import { ImageIcon, Layers, AlignLeft, Hash, SortAsc } from "lucide-react"
import type { EspecialidadDTO } from "@/features/especialidades/types"
import { toast } from "sonner"

const GRADIENT_PRESETS = [
  { label: "Azul principal",  value: "from-[#1B2B4B] to-[#003D73]" },
  { label: "Azul marino",     value: "from-[#003D73] to-[#00528c]" },
  { label: "Azul oscuro",     value: "from-[#0f1e35] to-[#1B2B4B]" },
  { label: "Naranja",         value: "from-[#FF6B35] to-[#e55b2a]" },
  { label: "Azul-naranja",    value: "from-[#1B2B4B] to-[#FF6B35]" },
  { label: "Verde industria", value: "from-[#065f46] to-[#064e3b]" },
  { label: "Gris acero",      value: "from-[#334155] to-[#1e293b]" },
]

type SaveData = {
  title: string; subtitle: string; description: string
  image: string; imageAlt?: string; gradient: string
  order: number; active: boolean
}

interface EspecialidadFormProps {
  initialData?: EspecialidadDTO
  onSave:       (data: SaveData) => Promise<void>
  onDelete?:    () => Promise<void>
}

export function EspecialidadForm({ initialData, onSave, onDelete }: EspecialidadFormProps) {
  const router    = useRouter()
  const isEditing = !!initialData

  const [title,       setTitle]      = useState(initialData?.title       ?? "")
  const [subtitle,    setSubtitle]   = useState(initialData?.subtitle    ?? "")
  const [description, setDesc]       = useState(initialData?.description ?? "")
  const [image,       setImage]      = useState(initialData?.image       ?? "")
  const [imageAlt,    setImageAlt]   = useState(initialData?.imageAlt    ?? "")
  const [gradient,    setGradient]   = useState(initialData?.gradient    ?? GRADIENT_PRESETS[0].value)
  const [order,       setOrder]      = useState(initialData?.order       ?? 0)
  const [active,      setActive]     = useState(initialData?.active      ?? true)
  const [tempKey,     setTempKey]    = useState<string | null>(null)

  const [saving,    setSaving]   = useState(false)
  const [deleting,  setDeleting] = useState(false)
  const [error,     setError]    = useState("")
  const [titleErr,  setTitleErr] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) { setTitleErr("El título es requerido"); return }
    setSaving(true)
    setError("")
    setTitleErr("")

    let finalImage = image
    try {
      if (tempKey) {
        const res  = await fetch("/api/upload/finalize", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ tempKey, seoName: imageAlt.trim(), folder: "especialidades/imagenes" }),
        })
        let data: any = {}
        try { data = await res.json() } catch { /**/ }
        if (!res.ok && res.status !== 409) throw new Error(data.error ?? `Error al finalizar subida (${res.status})`)
        if (res.ok) { finalImage = data.url; setImage(finalImage) }
        setTempKey(null)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al finalizar subida")
      setSaving(false)
      return
    }

    try {
      await onSave({
        title:       title.trim(),
        subtitle:    subtitle.trim(),
        description: description.trim(),
        image:       finalImage,
        imageAlt:    imageAlt.trim() || undefined,
        gradient,
        order,
        active,
      })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar"
      setError(msg)
      toast.error(msg)
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!onDelete) return
    setDeleting(true)
    try { await onDelete() }
    catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al eliminar"
      setError(msg)
      toast.error(msg)
      setDeleting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {/* Col 1 — Imagen */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#334155]/8">
              <ImageIcon className="h-3.5 w-3.5 text-[#334155]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-700">Imagen</h2>
              <p className="text-[11px] text-slate-400">Aparece como fondo de la tarjeta</p>
            </div>
            <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">Opcional</span>
          </div>
          <ImageUpload
            value={image}
            onChange={(v) => setImage(v)}
            onTempKey={setTempKey}
            altValue={imageAlt}
            onAltChange={setImageAlt}
            aspect="16/9"
            folder="especialidades/imagenes"
          />

          {/* Preview de gradiente */}
          <div className="mt-4">
            <p className="mb-2 text-[11px] font-semibold text-slate-500">Gradiente de fondo</p>
            <div className="grid grid-cols-2 gap-1.5">
              {GRADIENT_PRESETS.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGradient(g.value)}
                  className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[11px] font-medium transition-all ${
                    gradient === g.value
                      ? "border-[#334155] ring-1 ring-[#334155]/30 bg-slate-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className={`h-4 w-4 shrink-0 rounded bg-gradient-to-br ${g.value}`} />
                  <span className="truncate text-slate-600">{g.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2 — Contenido */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#334155]/8">
              <Layers className="h-3.5 w-3.5 text-[#334155]" />
            </div>
            <h2 className="text-sm font-semibold text-slate-700">Contenido</h2>
          </div>

          {/* Título */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); if (titleErr) setTitleErr("") }}
              placeholder="Ej: Rodamientos Industriales"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-[#334155]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#334155]/15"
            />
            {titleErr && <p className="mt-1 text-xs text-red-500">{titleErr}</p>}
          </div>

          {/* Subtítulo */}
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Subtítulo <span className="ml-1 text-slate-400 font-normal">(marcas, ej: SKF · Timken · INA)</span>
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="SKF · Timken · INA · NSK"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-[#334155]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#334155]/15"
            />
          </div>

          {/* Descripción */}
          <div className="mt-4">
            <div className="mb-1.5 flex items-center gap-2">
              <AlignLeft className="h-3.5 w-3.5 text-slate-400" />
              <label className="text-xs font-semibold text-slate-600">Descripción</label>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Descripción breve de esta especialidad…"
              rows={5}
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm leading-relaxed transition-all placeholder:text-slate-400 focus:border-[#334155]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#334155]/15"
            />
          </div>
        </div>

        {/* Col 3 — Configuración */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          {/* Orden y visibilidad */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#334155]/8">
                <SortAsc className="h-3.5 w-3.5 text-[#334155]" />
              </div>
              <h2 className="text-sm font-semibold text-slate-700">Configuración</h2>
            </div>

            {/* Orden */}
            <div className="mb-4">
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <Hash className="h-3 w-3 text-slate-400" /> Orden de aparición
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                min={0}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all focus:border-[#334155]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#334155]/15"
              />
              <p className="mt-1 text-[11px] text-slate-400">0 = primero</p>
            </div>

            {/* Switch activo */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-slate-600">Visible en el home</p>
                <p className="text-[11px] text-slate-400">Desactivá para ocultar sin eliminar</p>
              </div>
              <Switch checked={active} onCheckedChange={setActive} />
            </div>

            <div className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
              active
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                : "bg-slate-50 text-slate-500 ring-1 ring-slate-200"
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-slate-300"}`} />
              {active ? "Visible en el home" : "Oculto"}
            </div>
          </div>

          {/* Preview visual */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm overflow-hidden">
            <p className="mb-3 text-xs font-semibold text-slate-600">Vista previa de la tarjeta</p>
            <div className={`relative overflow-hidden rounded-xl p-5 bg-gradient-to-br ${gradient}`}>
              {image && image.startsWith("http") && (
                <>
                  <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80`} />
                </>
              )}
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10" />
              <div className="relative">
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/60">{subtitle || "Subtítulo"}</p>
                <p className="mt-1 text-sm font-extrabold text-white">{title || "Título"}</p>
                <p className="mt-1 text-[11px] text-white/70 line-clamp-2">{description || "Descripción…"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de acciones */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div className="flex gap-3">
          <Button type="submit" disabled={saving || deleting} className="bg-[#334155] px-6 hover:bg-[#334155]/90">
            {saving
              ? isEditing ? "Guardando…" : "Creando…"
              : isEditing ? "Guardar cambios" : "Crear especialidad"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={saving || deleting}>
            Cancelar
          </Button>
        </div>
        {onDelete && (
          <DeleteDialog
            trigger={
              <Button type="button" variant="outline" disabled={deleting || saving}
                className="border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50">
                {deleting ? "Eliminando…" : "Eliminar"}
              </Button>
            }
            itemName={initialData?.title ?? "esta especialidad"}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </form>
  )
}

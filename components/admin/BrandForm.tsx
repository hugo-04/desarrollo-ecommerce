"use client"

/**
 * BrandForm — Formulario para crear y editar marcas.
 *
 * Layout 2 columnas:
 *   Izquierda → Logo + switch de carrusel (relacionados: logo requerido si carrusel ON)
 *   Derecha   → Nombre de la marca
 *
 * Validación:
 *   Toda la validación usa Zod (importado desde features/marcas/schemas.ts).
 *   El logo es requerido SOLO cuando showInCarousel está activo (superRefine).
 */

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { DeleteDialog } from "@/components/admin/DeleteDialog"
import { Button } from "@/components/ui/button"
import { ImageIcon, Tag, Tv2, FileText } from "lucide-react"
import { brandSchema } from "@/features/marcas/schemas"
import type { Brand } from "@/lib/types"
import { toast } from "sonner"

interface BrandFormProps {
  initialData?: Brand
  onSave: (data: { name: string; logo: string; logoAlt?: string; showInCarousel: boolean; description?: string }) => Promise<void>
  onDelete?: () => Promise<void>
}

export function BrandForm({ initialData, onSave, onDelete }: BrandFormProps) {
  const router    = useRouter()
  const isEditing = !!initialData

  // ── Estado del formulario ────────────────────────────────────────────────
  const [name,           setName]        = useState(initialData?.name           ?? "")
  const [logo,           setLogo]        = useState(initialData?.logo           ?? "")
  const [logoAlt,        setLogoAlt]     = useState(initialData?.logoAlt        ?? "")
  const [showInCarousel, setCarousel]    = useState(initialData?.showInCarousel ?? true)
  const [description,    setDescription] = useState(initialData?.description    ?? "")
  const [logoTempKey,    setLogoTempKey] = useState<string | null>(null)

  // ── Estado de UI ─────────────────────────────────────────────────────────
  const [saving,           setSaving]      = useState(false)
  const [deleting,         setDeleting]    = useState(false)
  const [error,            setError]       = useState("")
  const [nameError,        setNameError]   = useState("")
  const [logoError,        setLogoError]   = useState("")
  const [descriptionError, setDescError]   = useState("")

  // ── Handlers ─────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    setNameError("")
    setLogoError("")
    setDescError("")

    const result = brandSchema.safeParse({ name: name.trim(), logo, logoAlt: logoAlt.trim() || undefined, showInCarousel, description: description.trim() || undefined })
    if (!result.success) {
      for (const issue of result.error.issues) {
        if (issue.path[0] === "name")        setNameError(issue.message)
        if (issue.path[0] === "logo")        setLogoError(issue.message)
        if (issue.path[0] === "logoAlt")     setLogoError(issue.message)
        if (issue.path[0] === "description") setDescError(issue.message)
      }
      setSaving(false)
      return
    }

    let finalLogo = logo
    try {
      if (logoTempKey) {
        const res  = await fetch("/api/upload/finalize", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ tempKey: logoTempKey, seoName: logoAlt.trim(), folder: "marcas/logos" }),
        })
        let data: Record<string, unknown> = {}
        try { data = await res.json() } catch { /* respuesta no-JSON (502, nginx error, etc.) */ }
        // 409 = ya fue finalizado (doble submit) — continuar con URL actual
        if (!res.ok && res.status !== 409) throw new Error((data.error as string) ?? `Error al finalizar subida (${res.status})`)
        if (res.ok) { finalLogo = data.url as string; setLogo(finalLogo) }
        setLogoTempKey(null)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al finalizar subida")
      setSaving(false)
      return
    }

    try {
      await onSave({ name: name.trim(), logo: finalLogo, logoAlt: logoAlt.trim() || undefined, showInCarousel, description: description.trim() || undefined })
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
    setError("")
    try {
      await onDelete()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al eliminar la marca"
      setError(msg)
      toast.error(msg)
      setDeleting(false)
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Error banner global */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ── Layout 3 columnas en XL, 2 en LG, 1 en mobile ──────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {/* ── Col 1: Logo ─────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          <div className="flex-1 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#334155]/8">
                <ImageIcon className="h-3.5 w-3.5 text-[#334155]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-700">
                  Logo de la marca
                  {showInCarousel && <span className="ml-1 text-red-500">*</span>}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {showInCarousel ? "Requerido — PNG o WebP transparente" : "Opcional — PNG, JPG o WebP"}
                </p>
              </div>
              {!showInCarousel && (
                <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                  Opcional
                </span>
              )}
            </div>
            <ImageUpload
              value={logo}
              onChange={(v) => { setLogo(v); if (v) setLogoError("") }}
              onTempKey={setLogoTempKey}
              altValue={logoAlt}
              onAltChange={setLogoAlt}
              error={logoError}
              aspect="16/9"
              folder="marcas/logos"
            />
          </div>
        </div>

        {/* ── Col 2: Nombre + Descripción ─────────────────────────────────── */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#334155]/8">
              <Tag className="h-3.5 w-3.5 text-[#334155]" />
            </div>
            <h2 className="text-sm font-semibold text-slate-700">Información de la marca</h2>
          </div>

          {/* Nombre */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); if (nameError) setNameError("") }}
              placeholder="Ej: ABB, Schneider Electric, Siemens…"
              required
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-[#334155]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#334155]/15"
            />
            {nameError && <p className="mt-1.5 text-xs text-red-500">{nameError}</p>}
          </div>

          {/* Descripción SEO */}
          <div className="mt-5">
            <div className="mb-1.5 flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-slate-400" />
              <label className="text-xs font-semibold text-slate-600">Descripción SEO</label>
              <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">Opcional</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => { setDescription(e.target.value); if (descriptionError) setDescError("") }}
              placeholder="Texto breve sobre la marca que aparecerá en su página pública y en Google. Máx. 320 caracteres."
              rows={7}
              maxLength={320}
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm leading-relaxed transition-all placeholder:text-slate-400 focus:border-[#334155]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#334155]/15"
            />
            <div className="mt-1 flex items-center justify-between">
              <p className="text-[11px] text-slate-400">Aparece en la página pública y en el snippet de Google.</p>
              <span className={`text-[10px] font-semibold ${description.length > 290 ? "text-amber-500" : "text-slate-400"}`}>
                {description.length}/320
              </span>
            </div>
            {descriptionError && <p className="mt-1 text-xs text-red-500">{descriptionError}</p>}
          </div>
        </div>

        {/* ── Col 3: Carrusel + Tips ───────────────────────────────────────── */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          {/* Switch carrusel */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#334155]/8">
                <Tv2 className="h-3.5 w-3.5 text-[#334155]" />
              </div>
              <h2 className="text-sm font-semibold text-slate-700">Carrusel del home</h2>
            </div>
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs leading-relaxed text-slate-500">
                Activá para mostrar esta marca en el carrusel de la página de inicio.
                {showInCarousel && (
                  <span className="mt-1 block font-medium text-amber-600">
                    El logo es obligatorio cuando está activado.
                  </span>
                )}
              </p>
              <Switch
                checked={showInCarousel}
                onCheckedChange={(v) => { setCarousel(v); if (!v) setLogoError("") }}
              />
            </div>
            <div className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
              showInCarousel
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                : "bg-slate-50 text-slate-500 ring-1 ring-slate-200"
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${showInCarousel ? "bg-emerald-500" : "bg-slate-300"}`} />
              {showInCarousel ? "Visible en el carrusel" : "No aparece en el carrusel"}
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-2 text-xs font-semibold text-slate-600">Página pública de la marca</p>
            <ul className="space-y-2 text-xs leading-relaxed text-slate-500">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B35]" />
                La página <strong className="text-slate-600">/marca/{"{nombre}"}</strong> muestra los productos de esta marca.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B35]" />
                La descripción SEO aparece debajo de los productos y es indexada por Google.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B35]" />
                El logo se muestra en el hero de la página pública y en el dropdown de navegación.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Barra de acciones ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={saving || deleting}
            className="bg-[#334155] px-6 hover:bg-[#334155]/90"
          >
            {saving
              ? isEditing ? "Guardando…" : "Creando…"
              : isEditing ? "Guardar cambios" : "Crear marca"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={saving || deleting}
          >
            Cancelar
          </Button>
        </div>

        {/* Eliminar — solo en modo editar */}
        {onDelete && (
          <DeleteDialog
            trigger={
              <Button
                type="button"
                variant="outline"
                disabled={deleting || saving}
                className="border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
              >
                {deleting ? "Eliminando…" : "Eliminar marca"}
              </Button>
            }
            itemName={initialData?.name ?? "esta marca"}
            onConfirm={handleDelete}
          />
        )}
      </div>

    </form>
  )
}

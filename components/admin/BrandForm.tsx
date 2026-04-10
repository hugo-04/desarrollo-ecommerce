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
import { ImageIcon, Tag, Tv2 } from "lucide-react"
import { brandSchema } from "@/features/marcas/schemas"
import type { Brand } from "@/lib/types"

interface BrandFormProps {
  initialData?: Brand
  onSave: (data: { name: string; logo: string; logoAlt?: string; showInCarousel: boolean }) => Promise<void>
  onDelete?: () => Promise<void>
}

export function BrandForm({ initialData, onSave, onDelete }: BrandFormProps) {
  const router    = useRouter()
  const isEditing = !!initialData

  // ── Estado del formulario ────────────────────────────────────────────────
  const [name,           setName]     = useState(initialData?.name           ?? "")
  const [logo,           setLogo]     = useState(initialData?.logo           ?? "")
  const [logoAlt,        setLogoAlt]  = useState(initialData?.logoAlt        ?? "")
  const [showInCarousel, setCarousel] = useState(initialData?.showInCarousel ?? false)
  const [logoTempKey,    setLogoTempKey] = useState<string | null>(null)

  // ── Estado de UI ─────────────────────────────────────────────────────────
  const [saving,    setSaving]    = useState(false)
  const [deleting,  setDeleting]  = useState(false)
  const [error,     setError]     = useState("")
  const [nameError, setNameError] = useState("")
  const [logoError, setLogoError] = useState("")

  // ── Handlers ─────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    setNameError("")
    setLogoError("")

    const result = brandSchema.safeParse({ name: name.trim(), logo, showInCarousel })
    if (!result.success) {
      for (const issue of result.error.issues) {
        if (issue.path[0] === "name") setNameError(issue.message)
        if (issue.path[0] === "logo") setLogoError(issue.message)
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
      await onSave({ name: name.trim(), logo: finalLogo, logoAlt: logoAlt.trim() || undefined, showInCarousel })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al guardar")
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!onDelete) return
    setDeleting(true)
    try {
      await onDelete()
    } catch {
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

      {/* ── Layout 2 columnas ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* ── Columna izquierda: Logo + Carrusel ── */}
        <div className="flex flex-col gap-5">

          {/* Switch carrusel */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1C2870]/8">
                <Tv2 className="h-3.5 w-3.5 text-[#1C2870]" />
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
                onCheckedChange={(v) => {
                  setCarousel(v)
                  if (!v) setLogoError("")
                }}
              />
            </div>

            {/* Indicador de estado */}
            <div className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
              showInCarousel
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                : "bg-slate-50 text-slate-500 ring-1 ring-slate-200"
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${showInCarousel ? "bg-emerald-500" : "bg-slate-300"}`} />
              {showInCarousel ? "Visible en el carrusel" : "No aparece en el carrusel"}
            </div>
          </div>

          {/* Logo */}
          <div className="flex-1 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1C2870]/8">
                <ImageIcon className="h-3.5 w-3.5 text-[#1C2870]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-700">
                  Logo de la marca
                  {showInCarousel && <span className="ml-1 text-red-500">*</span>}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {showInCarousel ? "Requerido — PNG o WebP con fondo transparente" : "Opcional — PNG, JPG o WebP"}
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

        {/* ── Columna derecha: Información ── */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1C2870]/8">
              <Tag className="h-3.5 w-3.5 text-[#1C2870]" />
            </div>
            <h2 className="text-sm font-semibold text-slate-700">Información de la marca</h2>
          </div>

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
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-[#1C2870]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1C2870]/15"
            />
            {nameError && <p className="mt-1.5 text-xs text-red-500">{nameError}</p>}
          </div>

          {/* Tip sobre el logo + carrusel */}
          <div className="mt-5 rounded-lg bg-slate-50 px-4 py-3.5 text-xs leading-relaxed text-slate-500">
            <p className="font-semibold text-slate-600">¿Cómo funciona el carrusel?</p>
            <ul className="mt-1.5 space-y-1 text-slate-500">
              <li>→ <strong>Carrusel OFF</strong>: la marca existe en el sistema pero no se muestra en el home</li>
              <li>→ <strong>Carrusel ON</strong>: el logo aparece en la sección de marcas de la página de inicio</li>
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
            className="bg-[#1C2870] px-6 hover:bg-[#1C2870]/90"
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

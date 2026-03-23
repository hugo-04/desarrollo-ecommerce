"use client"

/**
 * BrandForm — Formulario para crear y editar marcas.
 *
 * Props:
 *   initialData — datos de la marca existente (undefined = modo crear)
 *   onSave      — llamado al guardar con los datos validados
 *   onDelete    — llamado al confirmar eliminación (solo en modo editar)
 *
 * Lógica del carrusel:
 *   showInCarousel OFF → logo opcional, marca no aparece en el home
 *   showInCarousel ON  → logo REQUERIDO, marca aparece en el carrusel del home
 *
 * Validación:
 *   Toda la validación usa Zod con superRefine para la regla condicional del logo.
 */

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { brandSchema } from "@/features/marcas/schemas"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { DeleteDialog } from "@/components/admin/DeleteDialog"
import { Button } from "@/components/ui/button"
import type { Brand } from "@/lib/types"

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

interface BrandFormProps {
  initialData?: Brand
  onSave: (data: { name: string; logo: string; logoAlt?: string; showInCarousel: boolean }) => Promise<void>
  onDelete?: () => Promise<void>
}

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

/**
 * Renderiza el formulario completo de marca con validación Zod unificada.
 */
export function BrandForm({ initialData, onSave, onDelete }: BrandFormProps) {
  const router    = useRouter()
  const isEditing = !!initialData

  // --- Estado del formulario ---
  const [name, setName]               = useState(initialData?.name           ?? "")
  const [logo, setLogo]               = useState(initialData?.logo           ?? "")
  const [logoAlt, setLogoAlt]         = useState(initialData?.logoAlt        ?? "")
  const [showInCarousel, setCarousel] = useState(initialData?.showInCarousel ?? false)

  // --- Estado de UI ---
  const [saving, setSaving]       = useState(false)
  const [deleting, setDeleting]   = useState(false)
  const [error, setError]         = useState("")
  const [nameError, setNameError] = useState("")
  const [logoError, setLogoError] = useState("")

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  /**
   * Valida con Zod y llama a onSave si todo está correcto.
   * Un único paso de validación cubre nombre Y logo condicional.
   */
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

    try {
      await onSave({ name: name.trim(), logo, logoAlt: logoAlt.trim() || undefined, showInCarousel })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al guardar")
      setSaving(false)
    }
  }

  /**
   * Confirma la eliminación llamando a onDelete.
   * El estado `deleting` evita doble-click mientras el servidor procesa.
   */
  async function handleDelete() {
    if (!onDelete) return
    setDeleting(true)
    try {
      await onDelete()
    } catch {
      setDeleting(false)
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── Error banner global ── */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ── Switch carrusel ── */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-700">Mostrar en carrusel del home</h2>
            <p className="mt-1 text-xs text-slate-400">
              Cuando está activado, el logo de esta marca aparece en el carrusel de marcas de la página de inicio.
              {showInCarousel && (
                <span className="ml-1 font-medium text-amber-600">
                  El logo es obligatorio si está activado.
                </span>
              )}
            </p>
          </div>
          <Switch
            checked={showInCarousel}
            onCheckedChange={(v) => {
              setCarousel(v)
              // Al desactivar el carrusel, el logo ya no es requerido → limpiar error
              if (!v) setLogoError("")
            }}
          />
        </div>

        {/* Indicador de estado visual */}
        <div className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
          showInCarousel
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-slate-50 text-slate-500 border border-slate-200"
        }`}>
          <span className={`h-2 w-2 rounded-full ${showInCarousel ? "bg-green-500" : "bg-slate-300"}`} />
          {showInCarousel ? "Visible en el carrusel del home" : "No aparece en el carrusel"}
        </div>
      </div>

      {/* ── Logo — obligatorio si showInCarousel, opcional si no ── */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-start gap-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-700">
              Logo de la marca
              {showInCarousel && <span className="ml-1 text-red-500">*</span>}
            </h2>
            <p className="mt-0.5 text-xs text-slate-400">
              {showInCarousel
                ? "Requerido — se mostrará en el carrusel. PNG o WebP con fondo transparente ideal."
                : "Opcional — solo necesario si activás el carrusel. PNG, JPG o WebP."}
            </p>
          </div>
          {!showInCarousel && (
            <span className="ml-auto shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
              Opcional
            </span>
          )}
        </div>

        <ImageUpload
          value={logo}
          onChange={(v) => { setLogo(v); if (v) setLogoError("") }}
          altValue={logoAlt}
          onAltChange={setLogoAlt}
          error={logoError}
          aspect="16/9"
        />
      </div>

      {/* ── Nombre de la marca ── */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-slate-700">Información de la marca</h2>
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
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {nameError && (
            <p className="mt-1 text-xs text-red-500">{nameError}</p>
          )}
        </div>
      </div>

      {/* ── Acciones: guardar / cancelar / eliminar ── */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={saving || deleting}
            className="bg-primary px-6 hover:bg-primary/90"
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

        {/* Botón eliminar — solo en modo editar */}
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

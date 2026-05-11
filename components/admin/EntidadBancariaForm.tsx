"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { DeleteDialog } from "@/components/admin/DeleteDialog"
import { Button } from "@/components/ui/button"
import { ImageIcon, Landmark, Hash, CreditCard } from "lucide-react"
import type { EntidadBancariaDTO } from "@/features/entidades-bancarias/types"
import { toast } from "sonner"

type SaveData = {
  name: string; logo: string; logoAlt?: string
  nroCuenta?: string; nroCci?: string
  tipoCuenta?: string; nombreCuenta?: string
  order: number; active: boolean
}

interface EntidadBancariaFormProps {
  initialData?: EntidadBancariaDTO
  onSave:       (data: SaveData) => Promise<void>
  onDelete?:    () => Promise<void>
}

export function EntidadBancariaForm({ initialData, onSave, onDelete }: EntidadBancariaFormProps) {
  const router    = useRouter()
  const isEditing = !!initialData

  const [name,      setName]      = useState(initialData?.name      ?? "")
  const [logo,      setLogo]      = useState(initialData?.logo      ?? "")
  const [logoAlt,   setLogoAlt]   = useState(initialData?.logoAlt   ?? "")
  const [nroCuenta, setNroCuenta] = useState(initialData?.nroCuenta ?? "")
  const [nroCci,    setNroCci]    = useState(initialData?.nroCci    ?? "")
  const [tipoCuenta, setTipoCuenta] = useState(initialData?.tipoCuenta ?? "")
  const [nombreCuenta, setNombreCuenta] = useState(initialData?.nombreCuenta ?? "")
  const [order,     setOrder]     = useState(initialData?.order     ?? 0)
  const [active,    setActive]    = useState(initialData?.active    ?? true)
  const [tempKey,   setTempKey]   = useState<string | null>(null)

  const [saving,   setSaving]   = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error,    setError]    = useState("")
  const [nameErr,  setNameErr]  = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setNameErr("El nombre es requerido"); return }
    setSaving(true)
    setError("")
    setNameErr("")

    let finalLogo = logo
    try {
      if (tempKey) {
        const res = await fetch("/api/upload/finalize", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ tempKey, seoName: logoAlt.trim() || name.trim(), folder: "entidades-bancarias/logos" }),
        })
        let data: any = {}
        try { data = await res.json() } catch { /**/ }
        if (!res.ok && res.status !== 409) throw new Error(data.error ?? `Error al finalizar subida (${res.status})`)
        if (res.ok) { finalLogo = data.url; setLogo(finalLogo) }
        setTempKey(null)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al finalizar subida")
      setSaving(false)
      return
    }

    try {
      await onSave({
        name:      name.trim(),
        logo:      finalLogo,
        logoAlt:   logoAlt.trim()   || undefined,
        nroCuenta: nroCuenta.trim() || undefined,
        nroCci:    nroCci.trim()    || undefined,
        tipoCuenta: tipoCuenta.trim() || undefined,
        nombreCuenta: nombreCuenta.trim() || undefined,
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

        {/* Col 1 — Logo */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#334155]/8">
              <ImageIcon className="h-3.5 w-3.5 text-[#334155]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-700">Logo de la entidad</h2>
              <p className="text-[11px] text-slate-400">PNG o WebP con fondo transparente</p>
            </div>
          </div>
          <ImageUpload
            value={logo}
            onChange={(v) => setLogo(v)}
            onTempKey={setTempKey}
            altValue={logoAlt}
            onAltChange={setLogoAlt}
            aspect="16/9"
            folder="entidades-bancarias/logos"
          />
          {logo && logo.startsWith("http") && (
            <div className="mt-4">
              <p className="mb-2 text-[11px] font-semibold text-slate-500">Vista previa en footer</p>
              <div className="flex items-center gap-2 rounded-lg bg-[#003D73] px-3 py-2">
                <div className="flex h-8 items-center justify-center rounded-md bg-white/15 px-2.5">
                  <img src={logo} alt={logoAlt || name} className="h-5 w-auto object-contain" />
                </div>
                {(nroCuenta || nroCci) && (
                  <div className="text-left">
                    {nroCuenta && <p className="text-[10px] font-mono font-semibold text-white/80 leading-tight">{nroCuenta}</p>}
                    {nroCci    && <p className="text-[9px] font-mono text-white/50 leading-tight">CCI: {nroCci}</p>}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Col 2 — Info */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#334155]/8">
              <Landmark className="h-3.5 w-3.5 text-[#334155]" />
            </div>
            <h2 className="text-sm font-semibold text-slate-700">Información</h2>
          </div>

          {/* Nombre */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Nombre del banco <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); if (nameErr) setNameErr("") }}
              placeholder="Ej: BCP, Interbank, Yape, Visa…"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-[#334155]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#334155]/15"
            />
            {nameErr && <p className="mt-1 text-xs text-red-500">{nameErr}</p>}
          </div>

          {/* Número de cuenta */}
          <div className="mt-4">
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <CreditCard className="h-3 w-3 text-slate-400" />
              Número de cuenta
            </label>
            <input
              type="text"
              value={nroCuenta}
              onChange={(e) => setNroCuenta(e.target.value)}
              placeholder="Ej: 193-12345678-0-35"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-sm transition-all placeholder:text-slate-400 placeholder:font-sans focus:border-[#334155]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#334155]/15"
            />
          </div>

          {/* CCI */}
          <div className="mt-4">
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <CreditCard className="h-3 w-3 text-slate-400" />
              Número CCI (Código Interbancario)
            </label>
            <input
              type="text"
              value={nroCci}
              onChange={(e) => setNroCci(e.target.value)}
              placeholder="Ej: 00219300123456780135"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-sm transition-all placeholder:text-slate-400 placeholder:font-sans focus:border-[#334155]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#334155]/15"
            />
          </div>

          {/* Tipo de cuenta */}
          <div className="mt-4">
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <CreditCard className="h-3 w-3 text-slate-400" />
              Tipo de cuenta
            </label>
            <input
              type="text"
              value={tipoCuenta}
              onChange={(e) => setTipoCuenta(e.target.value)}
              placeholder="Ej: Corriente, Ahorros..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all focus:border-[#334155]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#334155]/15"
            />
          </div>

          {/* Nombre de cuenta */}
          <div className="mt-4">
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <CreditCard className="h-3 w-3 text-slate-400" />
              Nombre de la cuenta
            </label>
            <input
              type="text"
              value={nombreCuenta}
              onChange={(e) => setNombreCuenta(e.target.value)}
              placeholder="Ej: CORP ELIMA S.A.C."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all focus:border-[#334155]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#334155]/15"
            />
          </div>

          {/* Orden */}
          <div className="mt-4">
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
            <p className="mt-1 text-[11px] text-slate-400">0 = aparece primero de izquierda a derecha</p>
          </div>
        </div>

        {/* Col 3 — Visibilidad */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#334155]/8">
              <Landmark className="h-3.5 w-3.5 text-[#334155]" />
            </div>
            <h2 className="text-sm font-semibold text-slate-700">Visibilidad</h2>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-600">Mostrar en el footer</p>
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
            {active ? "Visible en el footer" : "Oculto"}
          </div>

          <div className="mt-6 rounded-lg bg-slate-50 p-3">
            <p className="text-[11px] font-semibold text-slate-600 mb-1">Dónde aparece</p>
            <ul className="space-y-1 text-[11px] text-slate-500">
              <li className="flex items-start gap-1.5">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B35]" />
                En la sección "Medios de Pago" del footer de todas las páginas.
              </li>
              <li className="flex items-start gap-1.5">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B35]" />
                Se muestra el logo y debajo el número de cuenta si se ingresó.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra de acciones */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div className="flex gap-3">
          <Button type="submit" disabled={saving || deleting} className="bg-[#334155] px-6 hover:bg-[#334155]/90">
            {saving
              ? isEditing ? "Guardando…" : "Creando…"
              : isEditing ? "Guardar cambios" : "Crear entidad"}
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
                {deleting ? "Eliminando…" : "Eliminar entidad"}
              </Button>
            }
            itemName={initialData?.name ?? "esta entidad"}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </form>
  )
}

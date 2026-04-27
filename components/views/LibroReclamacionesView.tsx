"use client"

/**
 * Libro de Reclamaciones Virtual
 * Obligatorio según Ley N° 29571 - Código de Protección y Defensa del Consumidor
 * y D.S. N° 011-2011-PCM (INDECOPI).
 */

import { useState } from "react"
import { createReclamacionAction } from "@/features/reclamaciones/actions"
import { AlertCircle, CheckCircle2, ChevronRight } from "lucide-react"

const TIPOS_DOC = ["DNI", "RUC", "Carné de Extranjería", "Pasaporte"]

export function LibroReclamacionesView() {
  const [tipo,     setTipo]     = useState<"RECLAMACION" | "QUEJA">("RECLAMACION")
  const [tipoBien, setTipoBien] = useState<"PRODUCTO" | "SERVICIO">("PRODUCTO")
  const [saving,   setSaving]   = useState(false)
  const [success,  setSuccess]  = useState(false)
  const [error,    setError]    = useState("")
  const [nroReclamo, setNroReclamo] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError("")

    const fd = new FormData(e.currentTarget)

    try {
      await createReclamacionAction({
        nombres:     fd.get("nombres")     as string,
        apellidos:   fd.get("apellidos")   as string,
        tipoDoc:     fd.get("tipoDoc")     as string,
        nroDoc:      fd.get("nroDoc")      as string,
        domicilio:   fd.get("domicilio")   as string,
        email:       fd.get("email")       as string,
        telefono:    fd.get("telefono")    as string,
        tipo,
        tipoBien,
        descripcion: fd.get("descripcion") as string,
        pedido:      fd.get("pedido")      as string,
      })
      setNroReclamo(`ET-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`)
      setSuccess(true)
    } catch {
      setError("Ocurrió un error al registrar tu reclamo. Por favor intenta nuevamente o contáctanos por teléfono.")
    } finally {
      setSaving(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
          </div>
          <h1 className="mb-3 text-2xl font-extrabold text-slate-800">Reclamo registrado</h1>
          <p className="mb-2 text-sm text-slate-500">
            Tu {tipo === "RECLAMACION" ? "reclamación" : "queja"} ha sido registrada correctamente.
          </p>
          <div className="my-6 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-1">N° de reclamo</p>
            <p className="text-xl font-extrabold text-emerald-800 font-mono">{nroReclamo}</p>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571),
            Lorem Ipsum S.A.C. atenderá tu {tipo === "RECLAMACION" ? "reclamación" : "queja"} en un plazo máximo de <strong>30 días hábiles</strong>.
            Recibirás respuesta en el correo indicado.
          </p>
          <button
            onClick={() => window.location.href = "/"}
            className="mt-8 rounded-xl bg-[#1e293b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#334155]"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#1e293b] py-8 text-white">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
            <span>Inicio</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">Libro de Reclamaciones</span>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <img
              src="/libro-reclamaciones.png"
              alt="Libro de Reclamaciones"
              width={200}
              height={67}
              className="w-36 rounded-md shadow-lg sm:w-48"
            />
            <div>
              <h1 className="text-xl font-extrabold sm:text-2xl">Libro de Reclamaciones</h1>
              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                Conforme a la Ley N° 29571 — Código de Protección y Defensa del Consumidor
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Aviso legal */}
      <div className="bg-amber-50 border-b border-amber-200 py-3">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Aviso:</strong> La formulación de una reclamación no impide acudir a otras vías de solución de controversias
            ni es requisito previo para interponer una denuncia ante el INDECOPI.
            Plazo de respuesta: hasta <strong>30 días hábiles</strong>.
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl px-4 py-6 sm:py-10 space-y-6 sm:space-y-8">

        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Sección 1: Datos del consumidor */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#1e293b]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1e293b] text-[11px] font-extrabold text-white">1</span>
            Datos del Consumidor
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombres" name="nombres" required placeholder="Ej: Juan Carlos" />
            <Field label="Apellidos" name="apellidos" required placeholder="Ej: García López" />

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Tipo de documento <span className="text-slate-500">*</span>
              </label>
              <select
                name="tipoDoc"
                required
                defaultValue="DNI"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#334155]/50 focus:bg-white focus:ring-2 focus:ring-[#334155]/15"
              >
                {TIPOS_DOC.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <Field label="N° de documento" name="nroDoc" required placeholder="Ej: 12345678" />
            <Field label="Correo electrónico" name="email" type="email" required placeholder="correo@ejemplo.com" />
            <Field label="Teléfono" name="telefono" placeholder="Ej: 987 654 321" />
            <div className="sm:col-span-2">
              <Field label="Domicilio" name="domicilio" placeholder="Dirección de contacto (opcional)" />
            </div>
          </div>
        </div>

        {/* Sección 2: Tipo de reclamo */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#1e293b]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1e293b] text-[11px] font-extrabold text-white">2</span>
            Tipo de Reclamo
          </h2>

          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            {(["RECLAMACION", "QUEJA"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTipo(t)}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  tipo === t
                    ? "border-[#334155] bg-[#334155]/5"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <p className="text-sm font-bold text-slate-800">
                  {t === "RECLAMACION" ? "Reclamación" : "Queja"}
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  {t === "RECLAMACION"
                    ? "Disconformidad con el producto o servicio adquirido"
                    : "Malestar o descontento respecto a la atención recibida"}
                </p>
              </button>
            ))}
          </div>

          <div className="mb-1 text-xs font-semibold text-slate-600">Bien contratado <span className="text-slate-500">*</span></div>
          <div className="flex gap-3">
            {(["PRODUCTO", "SERVICIO"] as const).map((b) => (
              <label key={b} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="tipoBien"
                  value={b}
                  checked={tipoBien === b}
                  onChange={() => setTipoBien(b)}
                  className="accent-[#334155]"
                />
                <span className="text-sm text-slate-700">{b === "PRODUCTO" ? "Producto" : "Servicio"}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sección 3: Detalle */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#1e293b]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1e293b] text-[11px] font-extrabold text-white">3</span>
            Detalle del Reclamo
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Descripción del reclamo <span className="text-slate-500">*</span>
              </label>
              <textarea
                name="descripcion"
                required
                rows={4}
                placeholder="Describa con detalle lo ocurrido, indicando fechas y el bien o servicio involucrado..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#334155]/50 focus:bg-white focus:ring-2 focus:ring-[#334155]/15"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Pedido / Pretensión <span className="text-slate-500">*</span>
              </label>
              <textarea
                name="pedido"
                required
                rows={3}
                placeholder="Indique qué solución o compensación solicita (cambio, devolución, reparación, etc.)..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#334155]/50 focus:bg-white focus:ring-2 focus:ring-[#334155]/15"
              />
            </div>
          </div>
        </div>

        {/* Declaración */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" required className="mt-0.5 accent-[#334155]" />
            <span className="text-xs text-slate-600 leading-relaxed">
              Declaro que los datos proporcionados son verídicos y autorizo a Lorem Ipsum S.A.C.
              a utilizarlos únicamente para la gestión de este reclamo, conforme a la Ley N° 29733
              de Protección de Datos Personales.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-gradient-to-r from-[#1e293b] to-[#334155] py-4 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl disabled:opacity-60 disabled:hover:scale-100"
        >
          {saving ? "Registrando reclamo..." : "Enviar Reclamo"}
        </button>

        <p className="text-center text-[11px] text-slate-400">
          Lorem Ipsum S.A.C. · RUC: 00000000000
        </p>
      </form>
    </div>
  )
}

function Field({ label, name, type = "text", required, placeholder }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label} {required && <span className="text-slate-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 transition-all focus:border-[#334155]/50 focus:bg-white focus:ring-2 focus:ring-[#334155]/15"
      />
    </div>
  )
}

"use client"

/**
 * Libro de Reclamaciones Virtual
 * Obligatorio según Ley N° 29571 - Código de Protección y Defensa del Consumidor
 * y D.S. N° 011-2011-PCM (INDECOPI).
 */

import { useState } from "react"
import Image from "next/image"
import { createReclamacionAction } from "@/features/reclamaciones/actions"
import { reclamacionSchema, TIPOS_DOC, type ReclamacionErrors } from "@/features/reclamaciones/schemas"
import { AlertCircle, CheckCircle2, ChevronRight } from "lucide-react"

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 transition-all focus:border-[#1C2870]/50 focus:bg-white focus:ring-2 focus:ring-[#1C2870]/15"
const inputErrorClass =
  "w-full rounded-lg border border-red-300 bg-red-50 px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 transition-all focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"

export function LibroReclamacionesView() {
  // ─── Tipo de reclamo (controlado aparte porque no es string libre) ──────────
  const [tipo,     setTipo]     = useState<"RECLAMACION" | "QUEJA">("RECLAMACION")
  const [tipoBien, setTipoBien] = useState<"PRODUCTO" | "SERVICIO">("PRODUCTO")

  // ─── Campos de formulario controlados ────────────────────────────────────────
  const [nombres,     setNombres]     = useState("")
  const [apellidos,   setApellidos]   = useState("")
  const [tipoDoc,     setTipoDoc]     = useState<typeof TIPOS_DOC[number]>("DNI")
  const [nroDoc,      setNroDoc]      = useState("")
  const [email,       setEmail]       = useState("")
  const [telefono,    setTelefono]    = useState("")
  const [domicilio,   setDomicilio]   = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [pedido,      setPedido]      = useState("")
  const [accepted,    setAccepted]    = useState(false)

  // ─── UI state ─────────────────────────────────────────────────────────────────
  const [saving,     setSaving]     = useState(false)
  const [success,    setSuccess]    = useState(false)
  const [serverError,setServerError]= useState("")
  const [nroReclamo, setNroReclamo] = useState("")
  const [errors,     setErrors]     = useState<ReclamacionErrors>({})
  const [acceptError,setAcceptError]= useState("")

  // ─── Submit ───────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError("")
    setAcceptError("")

    if (!accepted) {
      setAcceptError("Debés aceptar la declaración de veracidad para continuar.")
      return
    }

    const result = reclamacionSchema.safeParse({
      nombres:     nombres.trim(),
      apellidos:   apellidos.trim(),
      tipoDoc,
      nroDoc:      nroDoc.trim(),
      email:       email.trim(),
      telefono:    telefono.trim() || undefined,
      domicilio:   domicilio.trim() || undefined,
      descripcion: descripcion.trim(),
      pedido:      pedido.trim(),
    })

    if (!result.success) {
      const errs: ReclamacionErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ReclamacionErrors
        if (!errs[key]) errs[key] = issue.message
      }
      setErrors(errs)
      const firstEl = document.querySelector("[data-field-error]")
      firstEl?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    setErrors({})
    setSaving(true)

    try {
      await createReclamacionAction({
        nombres:     result.data.nombres,
        apellidos:   result.data.apellidos,
        tipoDoc:     result.data.tipoDoc,
        nroDoc:      result.data.nroDoc,
        domicilio:   result.data.domicilio ?? "",
        email:       result.data.email,
        telefono:    result.data.telefono ?? "",
        tipo,
        tipoBien,
        descripcion: result.data.descripcion,
        pedido:      result.data.pedido,
      })
      setNroReclamo(`ET-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`)
      setSuccess(true)
    } catch {
      setServerError("Ocurrió un error al registrar tu reclamo. Por favor intenta nuevamente o contáctanos por teléfono.")
    } finally {
      setSaving(false)
    }
  }

  function clearError(field: keyof ReclamacionErrors) {
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }))
  }

  // ─── Vista de éxito ───────────────────────────────────────────────────────────
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
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">N° de reclamo</p>
            <p className="font-mono text-xl font-extrabold text-emerald-800">{nroReclamo}</p>
          </div>
          <p className="text-xs leading-relaxed text-slate-500">
            Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571),
            Electro Thina S.A.C. atenderá tu {tipo === "RECLAMACION" ? "reclamación" : "queja"} en un plazo máximo de{" "}
            <strong>30 días hábiles</strong>. Recibirás respuesta en el correo indicado.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-8 rounded-xl bg-[#002a5c] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1C2870]"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  // ─── Formulario ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="-[#002a5c] py-8 text-white">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
            <span>Inicio</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">Libro de Reclamaciones</span>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Image
              src="/libro-reclamaciones.png"
              alt="Libro de Reclamaciones INDECOPI"
              width={200}
              height={67}
              className="w-36 rounded-md shadow-lg sm:w-48"
              priority
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
      <div className="border-b border-amber-200 bg-amber-50 py-3">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-xs leading-relaxed text-amber-800">
            <strong>Aviso:</strong> La formulación de una reclamación no impide acudir a otras vías de solución de
            controversias ni es requisito previo para interponer una denuncia ante el INDECOPI. Plazo de respuesta:
            hasta <strong>30 días hábiles</strong>.
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:space-y-8 sm:py-10">

        {serverError && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {serverError}
          </div>
        )}

        {/* ── Sección 1: Datos del consumidor ──────────────────────────────── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#121A47]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#002a5c] text-[11px] font-extrabold text-white">1</span>
            Datos del Consumidor
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Nombres */}
            <FieldCtrl
              label="Nombres"
              required
              error={errors.nombres}
              value={nombres}
              onChange={(v) => { setNombres(v); clearError("nombres") }}
              placeholder="Ej: Juan Carlos"
              autoComplete="given-name"
            />
            {/* Apellidos */}
            <FieldCtrl
              label="Apellidos"
              required
              error={errors.apellidos}
              value={apellidos}
              onChange={(v) => { setApellidos(v); clearError("apellidos") }}
              placeholder="Ej: García López"
              autoComplete="family-name"
            />

            {/* Tipo de documento */}
            <div data-field-error={errors.tipoDoc ? true : undefined}>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Tipo de documento <span className="text-red-500">*</span>
              </label>
              <select
                value={tipoDoc}
                onChange={(e) => { setTipoDoc(e.target.value as typeof TIPOS_DOC[number]); clearError("tipoDoc"); setNroDoc("") }}
                className={errors.tipoDoc ? inputErrorClass : inputClass}
              >
                {TIPOS_DOC.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.tipoDoc && <FieldError msg={errors.tipoDoc} />}
            </div>

            {/* N° de documento */}
            <FieldCtrl
              label={`N° de ${tipoDoc}`}
              required
              error={errors.nroDoc}
              value={nroDoc}
              onChange={(v) => { setNroDoc(v.replace(/\s/g, "")); clearError("nroDoc") }}
              placeholder={
                tipoDoc === "DNI" ? "8 dígitos" :
                tipoDoc === "RUC" ? "11 dígitos" :
                "N° de documento"
              }
              inputMode={tipoDoc === "DNI" || tipoDoc === "RUC" ? "numeric" : "text"}
              maxLength={tipoDoc === "DNI" ? 8 : tipoDoc === "RUC" ? 11 : 20}
            />

            {/* Email */}
            <FieldCtrl
              label="Correo electrónico"
              type="email"
              required
              error={errors.email}
              value={email}
              onChange={(v) => { setEmail(v); clearError("email") }}
              placeholder="correo@ejemplo.com"
              autoComplete="email"
            />

            {/* Teléfono */}
            <FieldCtrl
              label="Teléfono"
              type="tel"
              error={errors.telefono}
              value={telefono}
              onChange={(v) => { setTelefono(v); clearError("telefono") }}
              placeholder="Ej: 987 654 321"
              autoComplete="tel"
            />

            {/* Domicilio */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Domicilio</label>
              <input
                type="text"
                value={domicilio}
                onChange={(e) => setDomicilio(e.target.value)}
                placeholder="Dirección de contacto (opcional)"
                className={inputClass}
                autoComplete="street-address"
              />
            </div>
          </div>
        </div>

        {/* ── Sección 2: Tipo de reclamo ────────────────────────────────────── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#121A47]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#002a5c] text-[11px] font-extrabold text-white">2</span>
            Tipo de Reclamo
          </h2>

          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            {(["RECLAMACION", "QUEJA"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTipo(t)}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  tipo === t ? "border-[#1C2870] bg-[#1C2870]/5" : "border-slate-200 hover:border-slate-300"
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

          <div className="mb-1 text-xs font-semibold text-slate-600">
            Bien contratado <span className="text-red-500">*</span>
          </div>
          <div className="flex gap-4">
            {(["PRODUCTO", "SERVICIO"] as const).map((b) => (
              <label key={b} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="tipoBien"
                  value={b}
                  checked={tipoBien === b}
                  onChange={() => setTipoBien(b)}
                  className="accent-[#1C2870]"
                />
                <span className="text-sm text-slate-700">{b === "PRODUCTO" ? "Producto" : "Servicio"}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ── Sección 3: Detalle del reclamo ───────────────────────────────── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#121A47]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#002a5c] text-[11px] font-extrabold text-white">3</span>
            Detalle del Reclamo
          </h2>

          <div className="space-y-4">
            {/* Descripción */}
            <div data-field-error={errors.descripcion ? true : undefined}>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-600">
                  Descripción del reclamo <span className="text-red-500">*</span>
                </label>
                <span className={`text-[11px] tabular-nums ${descripcion.length < 20 ? "text-amber-500" : "text-emerald-600"}`}>
                  {descripcion.length} / 2000
                </span>
              </div>
              <textarea
                rows={4}
                value={descripcion}
                onChange={(e) => { setDescripcion(e.target.value); clearError("descripcion") }}
                placeholder="Describí con detalle lo ocurrido, indicando fechas y el bien o servicio involucrado..."
                maxLength={2000}
                className={errors.descripcion ? `${inputErrorClass} resize-none` : `${inputClass} resize-none`}
              />
              {errors.descripcion
                ? <FieldError msg={errors.descripcion} />
                : descripcion.length > 0 && descripcion.length < 20
                ? <p className="mt-1 flex items-center gap-1 text-[11px] text-amber-600"><AlertCircle className="h-3 w-3 shrink-0" />Ampliá la descripción — necesitamos más detalle.</p>
                : null}
            </div>

            {/* Pedido */}
            <div data-field-error={errors.pedido ? true : undefined}>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-600">
                  Pedido / Pretensión <span className="text-red-500">*</span>
                </label>
                <span className={`text-[11px] tabular-nums ${pedido.length < 10 ? "text-amber-500" : "text-emerald-600"}`}>
                  {pedido.length} / 1000
                </span>
              </div>
              <textarea
                rows={3}
                value={pedido}
                onChange={(e) => { setPedido(e.target.value); clearError("pedido") }}
                placeholder="Indicá qué solución o compensación solicitás (cambio, devolución, reparación, etc.)..."
                maxLength={1000}
                className={errors.pedido ? `${inputErrorClass} resize-none` : `${inputClass} resize-none`}
              />
              {errors.pedido && <FieldError msg={errors.pedido} />}
            </div>
          </div>
        </div>

        {/* ── Declaración ──────────────────────────────────────────────────── */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => { setAccepted(e.target.checked); if (e.target.checked) setAcceptError("") }}
              className="mt-0.5 accent-[#1C2870]"
            />
            <span className="text-xs leading-relaxed text-slate-600">
              Declaro que los datos proporcionados son verídicos y autorizo a Insumind SAC a utilizarlos
              únicamente para la gestión de este reclamo, conforme a la Ley N° 29733 de Protección de Datos Personales.
            </span>
          </label>
          {acceptError && <FieldError msg={acceptError} />}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-gradient-to-r bg-[#002a5c] to-[#1C2870] py-4 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl disabled:opacity-60 disabled:hover:scale-100"
        >
          {saving ? "Registrando reclamo..." : "Enviar Reclamo"}
        </button>

        <p className="text-center text-[11px] text-slate-400">
          Insumind SAC · Lima, Perú
        </p>
      </form>
    </div>
  )
}

// ─── Componentes internos ──────────────────────────────────────────────────────

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="mt-1 flex items-center gap-1 text-[11px] text-red-500">
      <AlertCircle className="h-3 w-3 shrink-0" />
      {msg}
    </p>
  )
}

interface FieldCtrlProps {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  required?: boolean
  placeholder?: string
  autoComplete?: string
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"]
  maxLength?: number
}

function FieldCtrl({ label, value, onChange, error, type = "text", required, placeholder, autoComplete, inputMode, maxLength }: FieldCtrlProps) {
  return (
    <div data-field-error={error ? true : undefined}>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        className={error ? inputErrorClass : inputClass}
      />
      {error && <FieldError msg={error} />}
    </div>
  )
}

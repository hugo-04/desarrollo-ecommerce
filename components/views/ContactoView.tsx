"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { WA, CONTACT } from "@/lib/contact"
import {
  IconPhone, IconMail, IconMapPin, IconClock,
  IconCheck, IconArrowRight, IconWhatsApp,
} from "@/components/icons"
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from "@/hooks/useAnimations"

// ── Campo de formulario reutilizable ─────────────────────────────────────────
function Field({
  label, required = false, error = false,
  children,
}: {
  label: string
  required?: boolean
  error?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
        {label} {required && <span className="text-[#FF6B35]">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[10px] font-semibold text-red-500">Este campo es requerido</p>
      )}
    </div>
  )
}

const INPUT_CLS =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none ring-0 transition-all placeholder:text-slate-400 focus:border-[#0066B3]/50 focus:bg-white focus:ring-2 focus:ring-[#0066B3]/15"

// ── Chip de canal rápido ──────────────────────────────────────────────────────
function QuickChannel({
  href, icon: Icon, label, sub, highlight = false,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  sub: string
  highlight?: boolean
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all duration-300 ${
        highlight
          ? "border-green-400/30 bg-green-50 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-500/10"
          : "border-slate-200 bg-white hover:border-[#0066B3]/30 hover:shadow-md hover:shadow-[#0066B3]/5"
      }`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
          highlight
            ? "bg-green-500/10 text-green-600 group-hover:bg-green-500 group-hover:text-white"
            : "bg-[#0066B3]/[0.07] text-[#0066B3] group-hover:bg-[#0066B3] group-hover:text-white"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-slate-800">{label}</p>
        <p className="truncate text-[11px] text-slate-500">{sub}</p>
      </div>
      <IconArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-slate-500" />
    </a>
  )
}

// ── Pregunta frecuente ────────────────────────────────────────────────────────
function FAQ({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-bold text-[#1e293b]">{question}</span>
        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${open ? "border-[#FF6B35] bg-[#FF6B35] text-white" : "border-slate-300 text-slate-400"}`}>
          <svg viewBox="0 0 16 16" className={`h-3 w-3 transition-transform ${open ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M8 3v10M3 8h10" />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-slate-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FAQS = [
  {
    question: "¿Cuánto tiempo tardan en responder una cotización?",
    answer: "En horario de atención respondemos en menos de 2 horas por correo y de forma inmediata por WhatsApp. Nuestro equipo técnico verifica disponibilidad de stock en tiempo real y te entrega una cotización formal con precios y tiempo de entrega.",
  },
  {
    question: "¿Cuánto demora la entrega en Lima?",
    answer: "Para pedidos en Lima, entregamos al día siguiente de confirmado tu depósito o transferencia. Mantenemos stock permanente en nuestro almacén en Los Olivos para despachar con rapidez, sin tiempos de importación.",
  },
  {
    question: "¿Hacen despachos a provincia o mina?",
    answer: "Sí. Despachamos a nivel nacional a través de operadores logísticos confiables. El tiempo de entrega a provincia varía según el destino. Para zonas mineras coordinamos directamente con el área de logística del cliente.",
  },
  {
    question: "¿Emiten facturas y comprobantes electrónicos?",
    answer: "Sí. Insumind Perú S.A.C. es una empresa formal registrada ante SUNAT. Emitimos facturas y boletas electrónicas para todas nuestras ventas, sin excepción. Puedes registrarnos como proveedor con total confianza.",
  },
  {
    question: "¿Los productos tienen garantía?",
    answer: "Todos nuestros productos son 100% originales y cuentan con garantía del fabricante. Ante cualquier falla relacionada con la fabricación, gestionamos el reclamo directamente con el fabricante o distribuidor autorizado.",
  },
  {
    question: "¿Tienen precios especiales para empresas?",
    answer: "Sí. Para empresas con necesidades de abastecimiento continuo ofrecemos condiciones especiales por volumen y contratos marco de suministro. Contáctanos para evaluar tu caso específico.",
  },
]

// ── Vista principal ───────────────────────────────────────────────────────────
export function ContactoView() {
  const [form, setForm] = useState({
    nombre: "", empresa: "", ruc: "", email: "", telefono: "",
    tipo_producto: "", marca_codigo: "", cantidad: "", mensaje: "",
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, boolean> = {}
    if (!form.nombre.trim())       newErrors.nombre        = true
    if (!form.empresa.trim())      newErrors.empresa       = true
    if (!form.telefono.trim())     newErrors.telefono      = true
    if (!form.email.trim())        newErrors.email         = true
    if (!form.tipo_producto)       newErrors.tipo_producto = true
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setErrors({})
    setSending(true)
    setTimeout(() => { setSending(false); setSubmitted(true) }, 1200)
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          HERO — dark
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001a3d] via-[#003D73] to-[#002a5c]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23fff' stroke-width='.5'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#FF6B35]/10 blur-[100px]" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6B35]/60 to-transparent" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:py-24"
        >
          <motion.div variants={fadeUp} className="mb-5 flex justify-center">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
              Contacto
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Contáctanos — Cotización{" "}
            <span className="text-[#FF6B35]">Inmediata</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            En Insumind Perú S.A.C. respondemos con rapidez y precisión. Cuéntanos qué necesitas
            y nuestro equipo técnico te enviará una cotización formal con precios, disponibilidad y tiempo de entrega.
          </motion.p>

          {/* Pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
            {[
              "Respuesta en &lt;2 h",
              "Entrega al día siguiente en Lima",
              "Stock permanente",
            ].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold text-white/60"
                dangerouslySetInnerHTML={{ __html: `<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' class='h-3 w-3 text-[#FF6B35]'><path d='M5 13l4 4L19 7'/></svg>&nbsp;${label}` }}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CANALES RÁPIDOS — chips de contacto
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white py-8">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <QuickChannel
              href={WA.cotizar}
              icon={IconWhatsApp}
              label="WhatsApp (canal principal)"
              sub="Respuesta inmediata — adjunta foto o código"
              highlight
            />
            <QuickChannel
              href={`mailto:${CONTACT.email}`}
              icon={IconMail}
              label={CONTACT.email}
              sub="Cotizaciones formales con factura"
            />
            <QuickChannel
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`}
              icon={IconMapPin}
              label="Visítanos en Lima"
              sub="Los Olivos — con previa coordinación"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN — sidebar info + formulario
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F7FA] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid gap-8 lg:grid-cols-5 lg:gap-10"
          >
            {/* ── Sidebar izquierdo ── */}
            <motion.aside variants={fadeLeft} className="lg:col-span-2">
              {/* Tarjeta oscura de info */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001a3d] via-[#003D73] to-[#002a5c] p-8 text-white shadow-xl">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FF6B35]/10 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#0066B3]/20 blur-3xl" />
                <div className="relative">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                    Información de contacto
                  </p>
                  <h2 className="mb-6 text-xl font-extrabold text-white">
                    Estamos aquí para ayudarte
                  </h2>

                  {/* WhatsApp CTA dentro del sidebar */}
                  <a
                    href={WA.cotizar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-8 flex items-center gap-3 rounded-2xl bg-green-500/20 px-5 py-4 transition-all hover:bg-green-500/30 ring-1 ring-green-400/20"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500 shadow-lg shadow-green-500/30">
                      <IconWhatsApp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Cotizar por WhatsApp</p>
                      <p className="text-[11px] text-white/50">Respuesta en minutos</p>
                    </div>
                  </a>

                  {/* Info items */}
                  <div className="space-y-5">
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.08]">
                        <IconMail className="h-4 w-4 text-white/60" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">Correo</p>
                        <p className="mt-0.5 text-sm font-semibold text-white/80">{CONTACT.email}</p>
                      </div>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3.5 group"
                    >
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] transition-colors group-hover:bg-[#FF6B35]/30">
                        <IconMapPin className="h-4 w-4 text-white/60 transition-colors group-hover:text-[#FF6B35]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">Dirección</p>
                        <p className="mt-0.5 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{CONTACT.address}</p>
                        <p className="text-[10px] text-white/30 group-hover:text-[#FF6B35] transition-colors">Ver en Google Maps ↗</p>
                      </div>
                    </a>
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.08]">
                        <IconClock className="h-4 w-4 text-white/60" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">Horario</p>
                        <p className="mt-0.5 text-sm font-semibold text-white/80">{CONTACT.hours}</p>
                      </div>
                    </div>
                  </div>

                  {/* Trust note */}
                  <div className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] leading-relaxed text-white/45">
                      Atendemos empresas mineras, constructoras, manufactureras y pesqueras en todo el Perú.
                      Productos 100% originales con garantía de fábrica.
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* ── Formulario ── */}
            <motion.div variants={fadeRight} className="lg:col-span-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-50">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500">
                          <IconCheck className="h-7 w-7 text-white" />
                        </div>
                      </div>
                      <h3 className="mb-2 text-xl font-extrabold text-[#1e293b]">¡Gracias por contactar a Insumind Perú S.A.C.!</h3>
                      <p className="mb-6 max-w-xs text-sm text-slate-500">
                        Hemos recibido tu consulta y un asesor se comunicará contigo en menos de 2 horas
                        en horario hábil. Para urgencias, escríbenos directamente por WhatsApp.
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center">
                        <button
                          onClick={() => {
                            setSubmitted(false)
                            setForm({ nombre: "", empresa: "", ruc: "", email: "", telefono: "", tipo_producto: "", marca_codigo: "", cantidad: "", mensaje: "" })
                          }}
                          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                        >
                          Enviar otra consulta
                        </button>
                        <a
                          href={WA.cotizar}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-xl bg-green-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-green-600"
                        >
                          <IconWhatsApp className="h-4 w-4" />
                          Cotizar por WhatsApp
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      <div className="mb-6">
                        <h2 className="text-xl font-extrabold text-[#1e293b]">Envíanos tu solicitud de cotización</h2>
                        <p className="mt-1 text-sm text-slate-500">
                          Completa los datos y te respondemos en menos de 2 horas en horario hábil.
                        </p>
                      </div>

                      {/* Fila 1 — Nombre + Empresa */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Nombre completo" required error={errors.nombre}>
                          <input
                            type="text" value={form.nombre} onChange={set("nombre")} placeholder="Tu nombre completo"
                            className={`${INPUT_CLS} ${errors.nombre ? "border-red-300 focus:ring-red-200" : ""}`}
                          />
                        </Field>
                        <Field label="Empresa / Razón social" required error={errors.empresa}>
                          <input
                            type="text" value={form.empresa} onChange={set("empresa")} placeholder="Nombre de tu empresa"
                            className={`${INPUT_CLS} ${errors.empresa ? "border-red-300 focus:ring-red-200" : ""}`}
                          />
                        </Field>
                      </div>

                      {/* Fila 2 — RUC + Teléfono */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="RUC">
                          <input
                            type="text" value={form.ruc} onChange={set("ruc")}
                            placeholder="Ej: 20601234567"
                            maxLength={11}
                            inputMode="numeric"
                            className={INPUT_CLS}
                          />
                        </Field>
                        <Field label="Teléfono / WhatsApp" required error={errors.telefono}>
                          <input
                            type="tel" value={form.telefono} onChange={set("telefono")} placeholder="+51 987 654 321"
                            className={`${INPUT_CLS} ${errors.telefono ? "border-red-300 focus:ring-red-200" : ""}`}
                          />
                        </Field>
                      </div>

                      {/* Fila 3 — Email */}
                      <Field label="Correo electrónico" required error={errors.email}>
                        <input
                          type="email" value={form.email} onChange={set("email")} placeholder="correo@empresa.com"
                          className={`${INPUT_CLS} ${errors.email ? "border-red-300 focus:ring-red-200" : ""}`}
                        />
                      </Field>

                      {/* Tipo de producto */}
                      <Field label="Tipo de producto" required error={errors.tipo_producto}>
                        <select
                          value={form.tipo_producto} onChange={set("tipo_producto")}
                          className={`${INPUT_CLS} ${errors.tipo_producto ? "border-red-300 focus:ring-red-200" : ""}`}
                        >
                          <option value="">Selecciona el tipo de producto</option>
                          <option value="rodamientos">Rodamientos Industriales</option>
                          <option value="filtros">Filtros Industriales</option>
                          <option value="valvulas">Válvulas Industriales</option>
                          <option value="correas">Correas Industriales</option>
                          <option value="hidraulicos">Componentes Hidráulicos</option>
                          <option value="otro">Otro</option>
                        </select>
                      </Field>

                      {/* Fila 3 */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Marca o código de referencia">
                          <input
                            type="text" value={form.marca_codigo} onChange={set("marca_codigo")}
                            placeholder="Ej: SKF 6205, Gates 5VX630..."
                            className={INPUT_CLS}
                          />
                        </Field>
                        <Field label="Cantidad aproximada">
                          <input
                            type="text" value={form.cantidad} onChange={set("cantidad")}
                            placeholder="Ej: 10 unidades, 50 piezas..."
                            className={INPUT_CLS}
                          />
                        </Field>
                      </div>

                      {/* Mensaje */}
                      <Field label="Mensaje o consulta adicional">
                        <textarea
                          rows={4} value={form.mensaje} onChange={set("mensaje")}
                          placeholder="Indica cualquier especificación adicional, condiciones de operación, equipo en el que se instala, etc."
                          className={`${INPUT_CLS} resize-none`}
                        />
                      </Field>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={sending}
                        className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#FF6B35] py-4 text-sm font-bold text-white shadow-lg shadow-[#FF6B35]/20 transition-all hover:bg-[#e55a2a] hover:shadow-xl hover:shadow-[#FF6B35]/30 disabled:opacity-70"
                      >
                        {sending ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar solicitud de cotización
                            <IconArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-[11px] text-slate-400">
                        También puedes contactarnos directamente por{" "}
                        <a href={WA.cotizar} target="_blank" rel="noopener noreferrer" className="font-bold text-green-600 hover:underline">
                          WhatsApp
                        </a>{" "}
                        para una respuesta inmediata.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MAPA — placeholder estilizado
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white pb-0 pt-0">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
              {/* Header del mapa */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Abrir en Google Maps"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#003D73]/[0.07] transition-colors hover:bg-[#FF6B35]/10"
                  >
                    <IconMapPin className="h-4 w-4 text-[#003D73]" />
                  </a>
                  <div>
                    <p className="text-sm font-bold text-[#1e293b]">Nuestra ubicación — Los Olivos, Lima</p>
                    <p className="text-[11px] text-slate-500">{CONTACT.address}</p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-600 transition-colors hover:bg-slate-50 sm:flex"
                >
                  Abrir en Google Maps
                  <IconArrowRight className="h-3 w-3" />
                </a>
              </div>

              {/* Imagen del mapa — clic abre Google Maps */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden"
                title="Ver en Google Maps"
              >
                <Image
                  src="/mapa-ubicacion.png"
                  alt="Ubicación Insumind Perú — Los Olivos, Lima"
                  width={1400}
                  height={600}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                  priority
                />
                {/* Overlay al hover */}
                <div className="absolute inset-0 flex items-end justify-end bg-black/0 transition-colors duration-300 group-hover:bg-black/15 p-4">
                  <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#003D73] shadow-lg opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <IconMapPin className="h-4 w-4 text-[#FF6B35]" />
                    Abrir en Google Maps ↗
                  </span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PREGUNTAS FRECUENTES
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F7FA] py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-10 text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-[#1e293b] lg:text-3xl">
                Preguntas frecuentes
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Todo lo que necesitas saber antes de hacer tu primera compra con INSUMIND.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="rounded-2xl border border-slate-200 bg-white px-6 shadow-sm">
              {FAQS.map((faq) => (
                <FAQ key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA FINAL — naranja
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FF6B35]">
        <div className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#003D73]/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center lg:py-20">
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-white lg:text-3xl">
            ¡No pierdas tiempo buscando — tenemos el insumo que necesitas en Lima!
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-white/80">
            Stock permanente · Productos originales · Entrega al día siguiente en Lima
          </p>
          <a
            href={WA.cotizar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl bg-[#003D73] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#002a5c] hover:scale-[1.03]"
          >
            <IconWhatsApp className="h-4 w-4" />
            Cotizar ahora por WhatsApp
          </a>
          <p className="mt-5 text-[11px] text-white/60">
            Horario de atención: Lunes a Viernes 9:00 am – 6:00 pm | Sábados 9:00 am – 1:00 pm
          </p>
        </div>
      </section>
    </>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { viewportOnce } from "@/hooks/useAnimations"
import { PROCESO_CONTENT } from "@/lib/data/mock/static-content.mock"
import {
  IconWhatsApp, IconFileText, IconTruck, IconArrowRight, IconCheck,
} from "@/components/icons"

// ── Configuración de pasos ────────────────────────────────────────────────────

const STEP_ICONS  = [IconWhatsApp, IconFileText, IconTruck]
const STEP_DURATION = 5200 // ms por paso (auto-avance)

const STEP_THEME = [
  {
    icon:    "bg-green-50  text-green-600",
    badge:   "text-green-600",
    bar:     "bg-green-500",
    dot:     "bg-green-500",
    outline: "ring-green-400/30",
  },
  {
    icon:    "bg-[#003D73]/8 text-[#003D73]",
    badge:   "text-[#003D73]",
    bar:     "bg-[#003D73]",
    dot:     "bg-[#003D73]",
    outline: "ring-[#003D73]/30",
  },
  {
    icon:    "bg-[#FF6B35]/10 text-[#FF6B35]",
    badge:   "text-[#FF6B35]",
    bar:     "bg-[#FF6B35]",
    dot:     "bg-[#FF6B35]",
    outline: "ring-[#FF6B35]/30",
  },
]

// ── Mini-ilustraciones por paso ───────────────────────────────────────────────

function Illustration({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="flex flex-col items-end gap-2.5 pt-2">
        {/* Mensaje del cliente */}
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-green-500 px-4 py-3 shadow-md">
          <p className="text-[13px] font-semibold text-white">Hola, necesito:</p>
          <p className="mt-0.5 text-[12px] text-white/80">SKF 6205 · 50 unidades</p>
          <p className="mt-0.5 text-[12px] text-white/80">Donaldson P551551 · 10 und</p>
        </div>
        {/* Respuesta INSUMIND */}
        <div className="mr-auto max-w-[78%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-md ring-1 ring-slate-100">
          <p className="text-[13px] font-semibold text-slate-800">¡Hola! Revisando stock... 👋</p>
          <p className="mt-0.5 text-[12px] text-slate-500">Respuesta en menos de 2 h</p>
        </div>
        {/* Indicador online */}
        <div className="mr-auto flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 ring-1 ring-green-100">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-[11px] font-bold text-green-700">En línea · Respondiendo ahora</span>
        </div>
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200 shadow-lg">
        <div className="bg-[#003D73] px-5 py-3.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Insumind Perú S.A.C.</p>
          <p className="text-[15px] font-extrabold text-white">Cotización #2024-087</p>
        </div>
        <div className="divide-y divide-slate-100 bg-white">
          {[
            { name: "Rodamiento SKF 6205", qty: "50 und", price: "S/ 18.50 c/u" },
            { name: "Filtro Donaldson P551551", qty: "10 und", price: "S/ 64.00 c/u" },
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-[12px] font-bold text-slate-800">{item.name}</p>
                <p className="text-[11px] text-slate-400">{item.qty}</p>
              </div>
              <p className="text-[12px] font-bold text-[#003D73]">{item.price}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between bg-[#F5F7FA] px-5 py-3">
          <p className="text-[11px] text-slate-500">
            Entrega: <span className="font-bold text-slate-700">Mañana en Lima</span>
          </p>
          <div className="flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1">
            <IconCheck className="h-3 w-3 text-green-600" />
            <span className="text-[11px] font-bold text-green-700">En stock</span>
          </div>
        </div>
      </div>
    )
  }

  // Step 2 — Despacho
  return (
    <div className="space-y-2.5 pt-2">
      {[
        { label: "Depósito confirmado",         done: true,  accent: "bg-green-500" },
        { label: "Pedido en preparación",       done: true,  accent: "bg-green-500" },
        { label: "Despachado — Lima Norte",     done: true,  accent: "bg-[#FF6B35]" },
        { label: "Entrega al día siguiente",    done: false, accent: "bg-slate-200"  },
      ].map(({ label, done, accent }, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm transition-all ${
            done ? `${accent} shadow-md` : "border-2 border-slate-200 bg-white"
          }`}>
            {done
              ? <IconCheck className="h-4 w-4 text-white" />
              : <span className="text-[10px] font-bold text-slate-400">{i + 1}</span>
            }
          </div>
          <div className="flex-1">
            <p className={`text-[13px] ${done ? "font-bold text-slate-800" : "text-slate-400"}`}>
              {label}
            </p>
            {i === 2 && (
              <p className="text-[11px] text-[#FF6B35] font-semibold">En camino ·  hoy</p>
            )}
          </div>
          {i === 3 && (
            <span className="rounded-full bg-[#FF6B35]/10 px-2.5 py-1 text-[10px] font-bold text-[#FF6B35]">
              Mañana
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────

export function ProcesoSection() {
  const [active, setActive]  = useState(0)
  const [tick,   setTick]    = useState(0) // reinicia barra de progreso
  const totalSteps           = PROCESO_CONTENT.steps.length

  // Auto-avance
  useEffect(() => {
    const t = setInterval(() => {
      setActive(p => {
        const next = (p + 1) % totalSteps
        setTick(n => n + 1)
        return next
      })
    }, STEP_DURATION)
    return () => clearInterval(t)
  }, [totalSteps])

  const step  = PROCESO_CONTENT.steps[active]
  const theme = STEP_THEME[active]
  const Icon  = STEP_ICONS[active]

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">

      {/* Fondo: grid de puntos muy sutil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #003D73 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#0066B3]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0066B3]">
              {PROCESO_CONTENT.badge}
            </span>
            <div className="h-px w-8 bg-[#0066B3]" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1e293b] lg:text-4xl">
            {PROCESO_CONTENT.title}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-500">
            {PROCESO_CONTENT.subtitle}
          </p>
        </motion.div>

        {/* ── MOBILE: tabs de paso arriba + panel abajo ── */}
        <div className="lg:hidden">
          {/* Tab pills */}
          <div className="mb-5 flex gap-2">
            {PROCESO_CONTENT.steps.map((s, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setTick(n => n + 1) }}
                className={`relative flex-1 overflow-hidden rounded-xl py-3 text-sm font-extrabold transition-all duration-300 ${
                  i === active
                    ? "bg-[#003D73] text-white shadow-lg"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {i === active && (
                  <motion.span
                    key={tick}
                    className="absolute bottom-0 left-0 h-[3px] bg-[#FF6B35]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: STEP_DURATION / 1000, ease: "linear" }}
                  />
                )}
                {s.num}
              </button>
            ))}
          </div>

          {/* Panel animado — móvil */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-lg"
            >
              {/* Número decorativo */}
              <div className="pointer-events-none absolute right-3 top-2 select-none text-[100px] font-black leading-none text-slate-100">
                {step.num}
              </div>

              {/* Ícono */}
              <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${theme.icon} shadow-sm`}>
                <Icon className="h-7 w-7" />
              </div>

              <p className={`mb-1 text-[10px] font-black uppercase tracking-[0.25em] ${theme.badge}`}>
                Paso {active + 1} de {totalSteps}
              </p>
              <h3 className="mb-3 text-xl font-extrabold text-[#1e293b]">{step.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-500">{step.desc}</p>

              <Illustration step={active} />

              {/* Barra de color en base */}
              <div className={`absolute bottom-0 inset-x-0 h-[3px] ${theme.bar}`} />
            </motion.div>
          </AnimatePresence>

          {/* Dots de navegación — móvil */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {PROCESO_CONTENT.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setTick(n => n + 1) }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-[#003D73]" : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>

          {/* CTA — móvil */}
          <Link
            href={PROCESO_CONTENT.ctaHref}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#e55a2a] py-4 text-sm font-bold text-white shadow-lg shadow-[#FF6B35]/20"
          >
            {PROCESO_CONTENT.ctaLabel}
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ── DESKTOP: columna izquierda (botones) + columna derecha (panel) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="hidden lg:grid lg:grid-cols-5 lg:gap-8"
        >
          {/* Columna izquierda: botones de paso + CTA */}
          <div className="col-span-2 flex flex-col gap-3">
            {PROCESO_CONTENT.steps.map((s, i) => {
              const StepIcon  = STEP_ICONS[i]
              const stepTheme = STEP_THEME[i]
              const isActive  = i === active

              return (
                <button
                  key={i}
                  onClick={() => { setActive(i); setTick(n => n + 1) }}
                  className={`group relative overflow-hidden rounded-2xl border-2 px-6 py-5 text-left transition-all duration-350 ${
                    isActive
                      ? "border-transparent bg-[#003D73] shadow-2xl shadow-[#003D73]/20"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  {/* Barra de progreso auto-avance */}
                  {isActive && (
                    <motion.span
                      key={tick}
                      className="absolute bottom-0 left-0 h-[3px] bg-[#FF6B35]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: STEP_DURATION / 1000, ease: "linear" }}
                    />
                  )}

                  <div className="flex items-center gap-4">
                    {/* Ícono */}
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive ? "bg-white/12" : stepTheme.icon
                    }`}>
                      <StepIcon className={`h-6 w-6 ${isActive ? "text-white" : ""}`} />
                    </div>

                    {/* Texto */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                        isActive ? "text-white/45" : "text-slate-400"
                      }`}>
                        {s.num}
                      </p>
                      <p className={`truncate text-[15px] font-extrabold leading-tight ${
                        isActive ? "text-white" : "text-[#1e293b]"
                      }`}>
                        {s.title}
                      </p>
                    </div>

                    {/* Flecha */}
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      isActive ? "bg-[#FF6B35]" : "bg-slate-100 group-hover:bg-slate-200"
                    }`}>
                      <IconArrowRight className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-slate-400"}`} />
                    </div>
                  </div>
                </button>
              )
            })}

            {/* CTA abajo */}
            <Link
              href={PROCESO_CONTENT.ctaHref}
              className="group mt-2 flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#e55a2a] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-[#FF6B35]/20 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#FF6B35]/30"
            >
              {PROCESO_CONTENT.ctaLabel}
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Columna derecha: panel de contenido animado */}
          <div className="col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                className="relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-white shadow-xl"
              >
                {/* Número decorativo de fondo */}
                <div className="pointer-events-none absolute right-4 top-4 select-none text-[160px] font-black leading-none text-slate-100">
                  {step.num}
                </div>

                <div className="relative p-10">
                  {/* Ícono grande */}
                  <div className={`mb-7 inline-flex h-[72px] w-[72px] items-center justify-center rounded-3xl ${theme.icon} shadow-lg`}>
                    <Icon className="h-9 w-9" />
                  </div>

                  {/* Badge paso */}
                  <p className={`mb-2 text-[11px] font-black uppercase tracking-[0.3em] ${theme.badge}`}>
                    Paso {active + 1} de {totalSteps}
                  </p>

                  {/* Título */}
                  <h3 className="mb-4 text-[1.75rem] font-extrabold leading-tight tracking-tight text-[#1e293b]">
                    {step.title}
                  </h3>

                  {/* Descripción */}
                  <p className="mb-8 max-w-md text-sm leading-[1.9] text-slate-600">
                    {step.desc}
                  </p>

                  {/* Ilustración del paso */}
                  <Illustration step={active} />
                </div>

                {/* Barra de color en la base de la card */}
                <div className={`absolute inset-x-0 bottom-0 h-1 ${theme.bar}`} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

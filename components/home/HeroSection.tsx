"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { IconArrowRight, IconPhone } from "@/components/icons"

// TODO: cuando haya imágenes reales, reemplazar `bg` por src de media.electrothina.com
const SLIDES = [
  { label: "Alta y Media Tensión",   bg: "from-[#003D73] via-[#00316b] to-[#00244f]" },
  { label: "Ferretería Industrial",  bg: "from-[#004d8f] via-[#003d72] to-[#002a52]" },
  { label: "Distribución Eléctrica", bg: "from-[#002a5c] via-[#001f46] to-[#001530]" },
]

const STATS = [
  { value: "1162", label: "Productos" },
  { value: "350+", label: "Clientes"  },
  { value: "12+",  label: "Años"      },
  { value: "48h",  label: "Despacho"  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative overflow-hidden sm:min-h-[75vh] lg:min-h-[600px]">

      {/* ── FONDO: carrusel cubre todo el hero ─────────────────────────────── */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            className={`absolute inset-0 bg-linear-to-br ${SLIDES[current].bg}`}
          >
            {/* Patrón de puntos sutil sobre el fondo */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            {/* Rayo decorativo — identidad eléctrica */}
            <div className="absolute right-[8%] top-[12%] hidden lg:block">
              <svg width="110" height="128" viewBox="0 0 120 140" fill="none" className="opacity-[0.07]">
                <polygon points="70,0 20,75 58,75 50,140 100,55 62,55" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round"/>
                <polygon points="70,0 20,75 58,75 50,140 100,55 62,55" fill="rgba(255,255,255,0.04)"/>
              </svg>
            </div>

            {/* Gradiente oscuro en la zona del texto para mejor legibilidad */}
            <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Línea superior de acento naranja */}
      <div className="absolute inset-x-0 top-0 z-10 h-[3px] bg-linear-to-r from-transparent via-[#FF6B35]/80 to-transparent" />

      {/* ── CONTENIDO: sobre el fondo ──────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 pb-20 sm:py-24 sm:pb-24 lg:py-32 lg:pb-32">
        <div className="max-w-2xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B35]" />
            Ferretería Eléctrica AT/MT — Lima, Perú
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.07, ease: "easeOut" }}
            className="mb-5 text-[2.4rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.2rem]"
          >
            Soluciones en<br />
            <span className="text-[#FF6B35]">Alta &amp; Media Tensión</span>
          </motion.h1>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.13, ease: "easeOut" }}
            className="mb-8 max-w-lg text-[0.95rem] leading-[1.8] text-white/70 sm:text-base"
          >
            Fabricantes y distribuidores de ferretería y accesorios eléctricos para
            alta y media tensión. Atendemos proyectos industriales, mineros y de
            construcción en todo el Perú.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18, ease: "easeOut" }}
            className="mb-9 grid grid-cols-4 gap-2 sm:gap-3"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/15 bg-white/10 px-2 py-3 text-center backdrop-blur-sm"
              >
                <p className="text-lg font-black text-white sm:text-xl lg:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-white/50 sm:text-[10px]">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22, ease: "easeOut" }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B35] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6B35]/30 transition-all duration-200 hover:bg-[#e55a2a] hover:scale-[1.02]"
            >
              Ver Catálogo
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white/85 backdrop-blur-sm transition-all duration-200 hover:bg-white/18 hover:text-white"
            >
              <IconPhone className="h-4 w-4 text-[#FF6B35]" />
              Contáctanos
            </Link>
          </motion.div>

        </div>

        {/* ── Indicador de slide — barra + contador + etiqueta ─────────────── */}
        <div className="absolute bottom-6 left-4 right-4 sm:left-auto sm:right-8 flex items-end justify-between sm:justify-end gap-6">

          {/* Etiqueta del slide — sólo desktop a la izquierda */}
          <div className="hidden sm:block">
            <AnimatePresence mode="wait">
              <motion.span
                key={current}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" />
                {SLIDES[current].label}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Barras de progreso + contador */}
          <div className="flex flex-col items-end gap-2">
            {/* Contador */}
            <div className="flex items-baseline gap-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={current}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="text-lg font-black text-white tabular-nums leading-none"
                >
                  {String(current + 1).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
              <span className="text-[10px] font-bold text-white/40">/ {String(SLIDES.length).padStart(2, '0')}</span>
            </div>

            {/* Barras */}
            <div className="flex gap-1.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: i === current ? '40px' : '16px', background: 'rgba(255,255,255,0.2)' }}
                >
                  {i === current && (
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: '#FF6B35' }}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5, ease: 'linear' }}
                    />
                  )}
                  {i < current && (
                    <span className="absolute inset-0 rounded-full" style={{ background: 'rgba(255,107,53,0.5)' }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

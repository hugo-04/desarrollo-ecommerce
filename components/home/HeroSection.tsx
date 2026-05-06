"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { IconArrowRight } from "@/components/icons"

const SLIDES = [
  {
    label: "Insumos Industriales",
    bg:    "from-[#003D73] via-[#00316b] to-[#00244f]",
    // Rodamientos / ball bearings industriales
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80",
  },
  {
    label: "Insumos Mineros",
    bg:    "from-[#004d8f] via-[#003d72] to-[#002a52]",
    // Maquinaria industrial / minería
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1920&q=80",
  },
  {
    label: "SKF · Parker · Gates",
    bg:    "from-[#002a5c] via-[#001f46] to-[#001530]",
    // Componentes hidráulicos / fábrica
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
  },
]

const STATS = [
  { value: "500+", label: "Referencias Stock" },
  { value: "20+",  label: "Marcas Originales" },
  { value: "24h",  label: "Entrega Lima"       },
  { value: "100%", label: "Original"           },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  // Precarga el siguiente slide para que no haya parpadeo blanco al transicionar
  useEffect(() => {
    SLIDES.forEach((slide, i) => {
      if (i === 0) return // ya se carga con priority
      const img = new window.Image()
      img.src = slide.image
    })
  }, [])

  return (
    <section className="relative overflow-hidden sm:min-h-[75vh] lg:min-h-[600px]">

      {/* ── FONDO: carrusel de slides ───────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#002244]">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            {/* Foto industrial — fondo real */}
            <Image
              src={SLIDES[current].image}
              alt=""
              fill
              priority={current === 0}
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* Overlay degradado azul de marca (cubre ~65% de opacidad) */}
            <div className={`absolute inset-0 bg-linear-to-br ${SLIDES[current].bg} opacity-70`} />

            {/* Oscurecimiento extra en lado izquierdo para legibilidad del texto */}
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />

            {/* Patrón de puntos sutil */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            {/* Rayo decorativo */}
            <div className="absolute right-[8%] top-[12%] hidden lg:block">
              <svg width="110" height="128" viewBox="0 0 120 140" fill="none" className="opacity-[0.10]">
                <polygon points="70,0 20,75 58,75 50,140 100,55 62,55" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round"/>
                <polygon points="70,0 20,75 58,75 50,140 100,55 62,55" fill="rgba(255,255,255,0.04)"/>
              </svg>
            </div>
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
            Insumos Industriales y Mineros — Lima, Perú
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.07, ease: "easeOut" }}
            className="mb-5 text-[2.4rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.2rem]"
          >
            Soluciones en Insumos<br />
            <span className="text-[#FF6B35]">Industriales y Mineros</span>
          </motion.h1>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.13, ease: "easeOut" }}
            className="mb-8 max-w-lg text-[0.95rem] leading-[1.8] text-white/70 sm:text-base"
          >
            Rodamientos · Filtros · Válvulas · Correas · Componentes Hidráulicos.
            Distribuidora peruana con stock permanente de productos 100% originales
            para minería, construcción, manufactura y pesca. Entrega en Lima y despacho nacional.
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
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B35] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6B35]/30 transition-all duration-200 hover:bg-[#e55a2a] hover:scale-[1.02]"
            >
              Cotiza por WhatsApp
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white/85 backdrop-blur-sm transition-all duration-200 hover:bg-white/18 hover:text-white"
            >
              Ver Catálogo de Productos
            </Link>
          </motion.div>

        </div>

        {/* ── Indicador de slide ─────────────────────────────────────────────── */}
        <div className="absolute bottom-6 left-4 right-4 sm:left-auto sm:right-8 flex items-end justify-between sm:justify-end gap-6">

          {/* Etiqueta del slide — sólo desktop */}
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

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { WA, CONTACT } from "@/lib/contact"
import {
  IconShield, IconTruck, IconClock, IconHeadphones,
  IconArrowRight, IconCheck, IconBolt, IconZap, IconWhatsApp,
} from "@/components/icons"
import {
  fadeUp, fadeLeft, fadeRight, staggerContainer,
  viewportOnce, useCountUp,
} from "@/hooks/useAnimations"

// ── Stat con counter animado ──────────────────────────────────────────────────
function AnimatedStat({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const { count, ref } = useCountUp(end, 2200)
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 px-6 py-5 text-center">
      <span className="text-3xl font-black tabular-nums text-white sm:text-4xl">
        {count}{suffix}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">{label}</span>
    </div>
  )
}

// ── Vista principal ───────────────────────────────────────────────────────────
export function NosotrosView() {

  const valores = [
    {
      icon: IconShield,
      title: "Garantía de Originalidad",
      description: "Todos nuestros productos son 100% originales con certificado de autenticidad y trazabilidad de lote. Nunca vendemos imitaciones ni productos reacondicionados.",
    },
    {
      icon: IconTruck,
      title: "Entrega Oportuna",
      description: "Almacén propio en Los Olivos, Lima. Más de 500 referencias disponibles para entrega al día siguiente de confirmado tu depósito. Sin esperas de importación.",
    },
    {
      icon: IconBolt,
      title: "Asesoría Técnica Gratuita",
      description: "Nuestros asesores te ayudan a identificar el producto correcto para tu equipo, modelo y condiciones de operación — sin costo adicional.",
    },
    {
      icon: IconHeadphones,
      title: "Responsabilidad Postventa",
      description: "Si un producto presenta alguna falla de fabricación, gestionamos la garantía con el fabricante. Comprometidos con la satisfacción total de nuestros clientes.",
    },
  ]

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          HERO — dark gradient
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001a3d] via-[#003D73] to-[#002a5c]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23fff' stroke-width='.5'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#0066B3]/20 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#FF6B35]/10 blur-[120px]" />
        {/* Línea superior */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6B35]/60 to-transparent" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative mx-auto max-w-7xl px-4 pb-0 pt-10 sm:pt-14"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
              Quiénes somos
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="mx-auto mb-5 max-w-3xl text-center text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Somos{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#FF6B35]">INSUMIND</span>
            </span>
            {" "}— Tu Distribuidora Peruana de{" "}
            <span className="text-[#FF6B35]">Insumos Industriales</span> y Mineros
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mb-14 max-w-2xl text-center text-sm leading-relaxed text-slate-400 sm:text-base"
          >
            Insumind Perú S.A.C. — Insumos Mineros Industriales. Empresa peruana especializada
            en la distribución de insumos industriales y mineros de alta calidad con garantía de originalidad.
          </motion.p>

          {/* Stats strip */}
          <motion.div variants={fadeUp}>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-t-3xl border border-b-0 border-white/[0.08] bg-white/[0.04] backdrop-blur-sm">
              <div className="grid grid-cols-2 divide-x divide-white/[0.07] sm:grid-cols-4 divide-y sm:divide-y-0 border-white/[0.07]">
                <AnimatedStat end={500} suffix="+" label="Referencias en Stock" />
                <AnimatedStat end={20}  suffix="+" label="Marcas Originales" />
                <AnimatedStat end={5}   suffix=""  label="Categorías" />
                <AnimatedStat end={98}  suffix="%" label="Clientes Satisfechos" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          QUIÉNES SOMOS — white
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid items-start gap-16 lg:grid-cols-2"
          >
            {/* Texto */}
            <motion.div variants={fadeLeft}>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-[#0066B3]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0066B3]">
                  Nuestra Historia
                </span>
              </div>
              <h2 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#1e293b] lg:text-4xl">
                Empresa peruana con un propósito claro: ser el proveedor más confiable de insumos industriales
              </h2>
              <p className="mb-4 text-sm leading-[1.9] text-slate-600">
                Insumind Perú S.A.C. — cuyo nombre significa Insumos Mineros Industriales — es una empresa
                peruana fundada con un propósito claro: ser el proveedor más confiable y eficiente de materiales
                y accesorios industriales para las empresas mineras, constructoras, manufactureras y pesqueras del Perú.
              </p>
              <p className="mb-8 text-sm leading-[1.9] text-slate-600">
                Nacimos de la experiencia directa en el sector industrial peruano, comprendiendo la necesidad crítica
                que tienen las empresas de contar con un proveedor serio, formal y rápido que garantice la autenticidad
                de cada producto. En el mercado industrial, una pieza falsa o de baja calidad no solo genera pérdidas
                económicas — puede paralizar operaciones completas y comprometer la seguridad de los trabajadores.
                Por eso, en INSUMIND solo distribuimos productos 100% originales con garantía de fábrica y trazabilidad de lote.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {["Productos 100% Originales", "RUC Activo SUNAT", "Factura Electrónica", "Stock Lima"].map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#0066B3]/20 bg-[#0066B3]/[0.05] px-3 py-1 text-[11px] font-bold text-[#0066B3]"
                  >
                    <IconCheck className="h-3 w-3" />
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Imagen */}
            <motion.div variants={fadeRight} className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=900&q=80"
                  alt="Almacén de insumos industriales y mineros en Lima, Perú — INSUMIND"
                  className="h-[420px] w-full object-cover lg:h-[500px]"
                />
                {/* Gradient overlay bottom */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#001a3d]/80 to-transparent" />
                {/* Overlay label */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Sede en</p>
                    <p className="text-xl font-black text-white">Los Olivos</p>
                    <p className="text-sm font-bold text-white/70">Lima, Perú</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Stock</p>
                    <p className="text-2xl font-black text-white">500+</p>
                    <p className="text-xs font-bold text-white/70">referencias</p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -right-4 -top-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FF6B35] shadow-xl shadow-[#FF6B35]/30 sm:-right-6 sm:-top-6 sm:h-24 sm:w-24">
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-white/70 leading-tight">Entrega</p>
                  <p className="text-xl font-black leading-none text-white sm:text-2xl">24h</p>
                  <p className="text-[9px] font-bold uppercase tracking-wide text-white/70">Lima</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MISIÓN & VISIÓN — split bicolor editorial
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden">
        <div className="flex flex-col lg:flex-row">

          {/* ── Panel MISIÓN — azul oscuro ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeLeft}
            className="relative flex flex-1 flex-col justify-center overflow-hidden bg-[#003D73] px-8 py-16 sm:px-12 lg:px-16 lg:py-24"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-4 select-none text-[160px] font-black leading-none text-white/[0.04] lg:text-[200px]"
            >
              01
            </span>

            <div className="mb-8 h-1 w-14 rounded-full bg-[#FF6B35]" />

            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#FF6B35]">
              Misión
            </p>
            <h3 className="mb-5 text-2xl font-extrabold leading-snug text-white sm:text-3xl lg:text-4xl">
              Proveer a la industria y minería peruana con insumos originales y de calidad
            </h3>
            <p className="mb-8 max-w-md text-sm leading-[1.9] text-slate-300">
              Ser el socio estratégico de abastecimiento más confiable del Perú — proveyendo insumos originales
              con entrega oportuna, precios competitivos y asesoría técnica especializada para que las operaciones
              industriales nunca se detengan.
            </p>

            <ul className="space-y-3">
              {[
                "Productos 100% originales con garantía de fábrica",
                "Asesoría técnica especializada sin costo adicional",
                "Stock permanente · entrega al día siguiente en Lima",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF6B35]/20">
                    <IconCheck className="h-3 w-3 text-[#FF6B35]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Panel VISIÓN — blanco ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeRight}
            className="relative flex flex-1 flex-col justify-center overflow-hidden bg-white px-8 py-16 sm:px-12 lg:px-16 lg:py-24"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -left-6 -top-4 select-none text-[160px] font-black leading-none text-[#003D73]/[0.04] lg:text-[200px]"
            >
              02
            </span>

            <div className="mb-8 h-1 w-14 rounded-full bg-[#0066B3]" />

            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#0066B3]">
              Visión
            </p>
            <h3 className="mb-5 text-2xl font-extrabold leading-snug text-[#1e293b] sm:text-3xl lg:text-4xl">
              Ser la distribuidora industrial de referencia a nivel nacional
            </h3>
            <p className="mb-8 max-w-md text-sm leading-[1.9] text-slate-500">
              Ser reconocidos por la garantía, confianza y calidad de cada producto que distribuimos,
              expandiendo nuestra presencia en los principales sectores productivos del Perú: minería,
              construcción, manufactura, pesca y agroindustria.
            </p>

            <ul className="space-y-3">
              {[
                "Cobertura nacional en proyectos industriales y mineros",
                "Referente en distribución de insumos originales en el Perú",
                "Socio estratégico de empresas de todos los sectores productivos",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0066B3]/10">
                    <IconCheck className="h-3 w-3 text-[#0066B3]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          VALORES — light
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F7FA] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {/* Header */}
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-[#0066B3]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0066B3]">
                  Nuestro Compromiso
                </span>
                <div className="h-px w-8 bg-[#0066B3]" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#1e293b] lg:text-4xl">
                "Garantía y Confianza en cada Insumo"
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
                Cuatro pilares que guían cada cotización, cada entrega y cada asesoría técnica que realizamos.
              </p>
            </motion.div>

            {/* Cards */}
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {valores.map((valor, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:border-[#FF6B35]/30 hover:shadow-xl"
                >
                  {/* Top accent */}
                  <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#FF6B35]/0 via-[#FF6B35] to-[#FF6B35]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Icono */}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#003D73]/[0.07] text-[#003D73] transition-all duration-300 group-hover:bg-[#FF6B35] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#FF6B35]/25">
                    <valor.icon className="h-5 w-5" />
                  </div>

                  <h3 className="mb-2.5 text-sm font-extrabold text-[#1e293b]">{valor.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{valor.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA FINAL — azul suave
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0066B3]">
        <div className="absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#FF6B35]/10 blur-3xl" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="relative mx-auto max-w-4xl px-4 py-20 text-center lg:py-24"
        >
          <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
            ¿Listo para trabajar con una distribuidora industrial de confianza?
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-white/75">
            Contáctanos hoy y descubre por qué las empresas industriales y mineras del Perú confían en Insumind Perú S.A.C.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={WA.cotizar}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 rounded-xl bg-[#FF6B35] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6B35]/30 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-[#FF6B35]/40"
            >
              <IconWhatsApp className="h-4 w-4" />
              Solicitar cotización ahora
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2.5 rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
            >
              Escribirnos a {CONTACT.email}
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

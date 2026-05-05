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

const FOUNDING_YEAR = 2010

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
  const yearsActive = new Date().getFullYear() - FOUNDING_YEAR

  const valores = [
    {
      icon: IconShield,
      title: "Calidad Certificada",
      description: "Trabajamos exclusivamente con marcas líderes y productos que cumplen normas ISO, NTP, IEC y ANSI. Cada entrega incluye certificado de calidad del fabricante.",
    },
    {
      icon: IconTruck,
      title: "Entrega Confiable",
      description: "Mantenemos stock permanente con más de 80 referencias en Lima. Despacho en 24 a 48 horas con coordinación de encomiendas a provincias.",
    },
    {
      icon: IconBolt,
      title: "Expertise Técnico",
      description: "Más de 15 años especializados en AT/MT. Nuestro equipo te ayuda a seleccionar el material correcto según la aplicación, norma y nivel de tensión.",
    },
    {
      icon: IconHeadphones,
      title: "Soporte Integral",
      description: "Acompañamos cada proyecto desde la especificación técnica hasta la entrega: fichas técnicas, datasheet y asistencia posventa incluidos.",
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
            Especialistas en{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#FF6B35]">Materiales Eléctricos</span>
            </span>{" "}
            AT/MT
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mb-14 max-w-2xl text-center text-sm leading-relaxed text-slate-400 sm:text-base"
          >
            Desde {FOUNDING_YEAR} suministramos materiales de alta y media tensión a concesionarias
            eléctricas, contratistas y empresas mineras en todo el Perú.
          </motion.p>

          {/* Stats strip */}
          <motion.div variants={fadeUp}>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-t-3xl border border-b-0 border-white/[0.08] bg-white/[0.04] backdrop-blur-sm">
              <div className="grid grid-cols-2 divide-x divide-white/[0.07] sm:grid-cols-4 divide-y sm:divide-y-0 border-white/[0.07]">
                <AnimatedStat end={yearsActive} suffix="+" label="Años en el sector" />
                <AnimatedStat end={500}  suffix="+" label="Proyectos ejecutados" />
                <AnimatedStat end={80}   suffix="+"  label="Referencias en stock" />
                <AnimatedStat end={98}   suffix="%"  label="Clientes satisfechos" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          HISTORIA — white
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
                Más de {yearsActive} años impulsando la infraestructura eléctrica del Perú
              </h2>
              <p className="mb-4 text-sm leading-[1.9] text-slate-600">
                Insumind nació en Lima en {FOUNDING_YEAR} con una misión clara: proveer materiales
                eléctricos de alta y media tensión con los más altos estándares de calidad y
                confiabilidad. Desde nuestros inicios atendemos concesionarias eléctricas, empresas
                mineras y contratistas especializados que requieren insumos críticos para la
                continuidad operativa de sus proyectos.
              </p>
              <p className="mb-8 text-sm leading-[1.9] text-slate-600">
                Hoy contamos con un catálogo de más de 80 referencias —aisladores, herrajes
                galvanizados, conectores bimetálicos, seccionadores y más— con stock permanente en
                Lima y despacho en 24 a 48 horas. Cada producto cumple normas ISO, NTP, IEC y ANSI,
                respaldado por fichas técnicas y certificados de calidad.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {["ISO 9001", "Norma NTP", "IEC / ANSI", "Stock Lima"].map((b) => (
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
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80"
                  alt="Infraestructura eléctrica de alta tensión en Perú"
                  className="h-[420px] w-full object-cover lg:h-[500px]"
                />
                {/* Gradient overlay bottom */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#001a3d]/80 to-transparent" />
                {/* Overlay label */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Fundada en</p>
                    <p className="text-4xl font-black text-white">{FOUNDING_YEAR}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Lima, Perú</p>
                    <p className="text-sm font-bold text-white/80">AT / MT</p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -right-4 -top-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FF6B35] shadow-xl shadow-[#FF6B35]/30 sm:-right-6 sm:-top-6 sm:h-24 sm:w-24">
                <div className="text-center">
                  <p className="text-xl font-black leading-none text-white sm:text-2xl">{yearsActive}+</p>
                  <p className="text-[9px] font-bold uppercase tracking-wide text-white/70">años</p>
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
            {/* Número decorativo */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-4 select-none text-[160px] font-black leading-none text-white/[0.04] lg:text-[200px]"
            >
              01
            </span>

            {/* Línea superior accent */}
            <div className="mb-8 h-1 w-14 rounded-full bg-[#FF6B35]" />

            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#FF6B35]">
              Misión
            </p>
            <h3 className="mb-5 text-2xl font-extrabold leading-snug text-white sm:text-3xl lg:text-4xl">
              Proveer materiales eléctricos con calidad y confiabilidad certificada
            </h3>
            <p className="mb-8 max-w-md text-sm leading-[1.9] text-slate-300">
              Somos el socio estratégico de concesionarias, contratistas y mineras que requieren
              materiales AT/MT críticos. Garantizamos norma, stock y asesoría técnica en cada entrega.
            </p>

            <ul className="space-y-3">
              {[
                "Materiales certificados ISO, NTP, IEC y ANSI",
                "Asesoría técnica especializada sin costo adicional",
                "Stock permanente · despacho 24–48 h en Lima",
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
            {/* Número decorativo */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-6 -top-4 select-none text-[160px] font-black leading-none text-[#003D73]/[0.04] lg:text-[200px]"
            >
              02
            </span>

            {/* Línea superior accent */}
            <div className="mb-8 h-1 w-14 rounded-full bg-[#0066B3]" />

            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#0066B3]">
              Visión
            </p>
            <h3 className="mb-5 text-2xl font-extrabold leading-snug text-[#1e293b] sm:text-3xl lg:text-4xl">
              Ser el distribuidor líder de materiales AT/MT en el Perú
            </h3>
            <p className="mb-8 max-w-md text-sm leading-[1.9] text-slate-500">
              Aspiramos a ser la referencia técnica en suministro eléctrico de alta y media tensión,
              reconocidos por nuestra excelencia técnica y la confiabilidad de nuestro stock.
            </p>

            <ul className="space-y-3">
              {[
                "Cobertura nacional en proyectos eléctricos de alta tensión",
                "Referente técnico en AT/MT para el sector minero peruano",
                "Socio estratégico de las principales concesionarias eléctricas",
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
                  Valores
                </span>
                <div className="h-px w-8 bg-[#0066B3]" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#1e293b] lg:text-4xl">
                Lo que nos define
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
                Cuatro pilares que guían cada cotización, cada entrega y cada asesoría técnica.
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
      <section className="relative overflow-hidden bg-[#E6EDF5]">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,102,179,0.09) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#0066B3]/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#FF6B35]/[0.08] blur-3xl" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="relative mx-auto max-w-4xl px-4 py-20 text-center lg:py-24"
        >
          <motion.p variants={fadeUp} className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#0066B3]">
            ¿Listo para tu próximo proyecto?
          </motion.p>
          <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-extrabold tracking-tight text-[#003D73] lg:text-4xl">
            Cotiza tus materiales AT/MT con nosotros
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-slate-500">
            Cuéntanos tu requerimiento y te respondemos con disponibilidad, precios y especificaciones
            técnicas en menos de 24 horas hábiles.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/catalogo"
              className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#e55a2a] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6B35]/20 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-[#FF6B35]/30"
            >
              Ver catálogo completo
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={WA.ingeniero}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl border border-[#003D73]/20 bg-white px-8 py-3.5 text-sm font-semibold text-[#003D73] transition-all hover:border-[#003D73]/40 hover:bg-[#003D73]/[0.04] hover:shadow-md"
            >
              <IconWhatsApp className="h-4 w-4 text-green-500" />
              Habla con un ingeniero
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

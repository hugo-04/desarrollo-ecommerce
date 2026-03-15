"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useRef } from "react"
import { fadeUp, staggerContainer, scaleUp, viewportOnce, useCountUp } from "@/hooks/useAnimations"
import { IconBox, IconCertificate, IconBuilding, IconTruck, IconArrowRight, IconPhone } from "@/components/icons"

function StatCard({ value, label, icon: Icon, suffix, index }: {
  value: number; label: string; icon: React.ComponentType<{className?: string}>; suffix: string; index: number
}) {
  const { count, ref } = useCountUp(value, 2000)
  return (
    <motion.div
      ref={ref}
      variants={scaleUp}
      custom={index}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:border-primary/20 hover:bg-white/[0.06]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/5 ring-1 ring-red-500/10">
          <Icon className="h-5 w-5 text-red-400" />
        </div>
        <p className="text-3xl font-extrabold tracking-tight text-white lg:text-[2rem]">{count}{suffix}</p>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  const stats = [
    { value: 1162, label: "Productos AT/MT", icon: IconBox, suffix: "" },
    { value: 12, label: "Marcas Lideres", icon: IconCertificate, suffix: "+" },
    { value: 350, label: "Proyectos Ejecutados", icon: IconBuilding, suffix: "+" },
    { value: 48, label: "Despacho Nacional", icon: IconTruck, suffix: "h" },
  ]

  // No more scroll-driven parallax hooks here


  return (
    <section className="relative overflow-hidden mb-12">
      {/* === BACKGROUND === */}
      <div className="absolute inset-0">
        <img
          src="/electric-towers-with-blue-cloudy-sky-background.jpg"
          alt="Torres eléctricas"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020a1a]/80 via-[#121A47]/85 to-[#06102a]/95" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\' stroke=\'%23fff\' stroke-width=\'.5\'/%3E%3C/svg%3E")' }} />

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

      {/* Decorative element */}
      <div className="absolute right-[10%] top-[15%] hidden h-32 w-32 rounded-3xl border border-white/[0.04] lg:block" />
      <div className="absolute right-[8%] top-[13%] hidden h-32 w-32 -rotate-12 rounded-3xl border border-red-500/[0.06] lg:block" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          {/* LEFT — Content */}
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-red-500/20 bg-red-500/[0.08] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-red-400 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              Especialistas en Alta y Media Tension
            </motion.div>

            <motion.h1 variants={fadeUp} className="mb-8 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Ferreteria y Accesorios
              <span
                className="mt-2 block bg-gradient-to-r from-red-500 via-red-400 to-orange-400 bg-clip-text text-transparent"
              >
                Electricos AT/MT
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mb-12 max-w-xl text-base leading-[1.8] text-slate-400/90 sm:text-[1.05rem]">
              Aisladores, herrajes, conectores, cables y ferreteria para lineas de alta y media tension. Distribuidores autorizados con certificaciones IEC, ANSI e ISO.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5">
              <Link href="/catalogo" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-700 px-9 py-4 text-sm font-bold text-white shadow-2xl shadow-red-600/30 transition-all duration-300 hover:shadow-red-600/50 hover:scale-[1.03]">
                <span className="relative z-10">Ver Catalogo</span>
                <IconArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <Link href="/contacto" className="group inline-flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-9 py-4 text-sm font-semibold text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-white">
                <IconPhone className="h-4 w-4 text-red-400 transition-colors group-hover:text-red-300" />
                Contactanos
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT — Stats Grid */}
          <motion.div
            className="lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
            }}
          >
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

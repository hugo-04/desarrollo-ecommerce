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
    <section className="relative overflow-hidden mb-12 voltage-scan-wrap arc-flash-wrap">
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

      {/* Circuit board pattern — evoca PCB / tablero eléctrico */}
      <div className="absolute inset-0 opacity-[0.045]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'60\' height=\'60\' fill=\'none\'/%3E%3Cpath d=\'M0 30h25M35 30h25M30 0v25M30 35v25\' stroke=\'%23fff\' stroke-width=\'.6\'/%3E%3Crect x=\'26\' y=\'26\' width=\'8\' height=\'8\' fill=\'none\' stroke=\'%23fff\' stroke-width=\'.6\'/%3E%3Ccircle cx=\'0\' cy=\'0\' r=\'2\' fill=\'%23fff\'/%3E%3Ccircle cx=\'60\' cy=\'0\' r=\'2\' fill=\'%23fff\'/%3E%3Ccircle cx=\'0\' cy=\'60\' r=\'2\' fill=\'%23fff\'/%3E%3Ccircle cx=\'60\' cy=\'60\' r=\'2\' fill=\'%23fff\'/%3E%3C/svg%3E")' }} />

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

      {/* Decorative bolt SVG — identidad eléctrica */}
      <div className="absolute right-[6%] top-[10%] hidden lg:block electric-pulse" style={{ borderRadius: '50%' }}>
        <svg width="120" height="140" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="float-slow opacity-[0.18]">
          <polygon points="70,0 20,75 58,75 50,140 100,55 62,55" fill="none" stroke="rgba(245,158,11,0.7)" strokeWidth="2" strokeLinejoin="round"/>
          <polygon points="70,0 20,75 58,75 50,140 100,55 62,55" fill="rgba(245,158,11,0.08)"/>
        </svg>
      </div>
      <div className="absolute right-[12%] top-[8%] hidden h-28 w-28 -rotate-12 rounded-3xl border border-amber-400/[0.08] lg:block float" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          {/* LEFT — Content */}
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-red-500/20 bg-red-500/[0.08] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-red-400 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              Especialistas en Alta y Media Tension
            </motion.div>

            {/* Voltage range badge */}
            <motion.div variants={fadeUp} className="mb-8 flex items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-4 py-1.5 text-[11px] font-bold tracking-widest backdrop-blur-md" style={{ color: 'var(--electric)' }}>
                <span className="electric-pulse h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--electric)', display: 'inline-block' }} />
                25 kV
              </span>
              <span className="text-white/20 text-xs font-light">—</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/[0.06] px-4 py-1.5 text-[11px] font-bold tracking-widest text-sky-400 backdrop-blur-md">
                500 kV
              </span>
              <span className="text-white/30 text-[10px] font-medium tracking-wider">AT / MT</span>
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

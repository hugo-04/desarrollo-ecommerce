"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

import { fadeUp, staggerContainer, scaleUp, viewportOnce, useCountUp } from "@/hooks/useAnimations"
import { IconBox, IconCertificate, IconBuilding, IconTruck, IconArrowRight, IconPhone } from "@/components/icons"

function StatCard({ value, label, icon: Icon, suffix, index, wide }: {
  value: number; label: string; icon: React.ComponentType<{className?: string}>; suffix: string; index: number; wide?: boolean;
}) {
  const { count, ref } = useCountUp(value, 2000)
  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, scale: 0.85, y: 30 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15, delay: index * 0.15 } }
      }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b122e]/60 p-6 backdrop-blur-2xl transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(204,27,27,0.2)] hover:border-red-500/40 hover:bg-[#121A47]/80 ${wide ? 'col-span-2 sm:col-span-2' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      
      {/* Decorative tech blur */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/10 blur-[30px] transition-all duration-700 group-hover:bg-red-500/20 group-hover:blur-[40px]" />
      
      <div className="relative flex flex-col h-full justify-between">
        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 ring-1 ring-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${wide ? 'group-hover:translate-x-3' : ''}`}>
          <Icon className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <p className="text-3xl font-black tracking-tight text-white lg:text-[2.25rem]">{count}{suffix}</p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-red-200 transition-colors">{label}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  const stats = [
    { value: 1162, label: "Productos AT/MT", icon: IconBox, suffix: "", wide: false },
    { value: 350, label: "Proyectos Realizados", icon: IconBuilding, suffix: "+", wide: false },
    { value: 12, label: "Marcas Certificadas", icon: IconCertificate, suffix: "+", wide: false },
    { value: 48, label: "Horas: Despacho Garantizado a Nivel Nacional", icon: IconTruck, suffix: "h", wide: true },
  ]

  // No more scroll-driven parallax hooks here


  return (
    <section className="relative overflow-hidden mb-12 voltage-scan-wrap arc-flash-wrap">
      {/* === BACKGROUND === */}
      <div className="absolute inset-0">
        <Image
          src="/banner.jpg"
          alt="Torres eléctricas de alta tensión"
          fill
          priority
          fetchPriority="high"
          quality={60}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050C2A]/90 via-[#0a1236]/80 to-[#020617]/95 backdrop-blur-[2px]" />

      {/* Circuit board pattern — evoca PCB / tablero eléctrico */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'60\' height=\'60\' fill=\'none\'/%3E%3Cpath d=\'M0 30h25M35 30h25M30 0v25M30 35v25\' stroke=\'%23f8fafc\' stroke-width=\'.8\'/%3E%3Crect x=\'26\' y=\'26\' width=\'8\' height=\'8\' fill=\'none\' stroke=\'%23f8fafc\' stroke-width=\'.8\'/%3E%3Ccircle cx=\'0\' cy=\'0\' r=\'2\' fill=\'%23ef4444\'/%3E%3C/svg%3E")' }} />

      {/* Top red accent line */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#CC1B1B] to-transparent shadow-[0_0_15px_rgba(204,27,27,0.8)]" />

      {/* Decorative bolt SVG — identidad eléctrica */}
      <div className="absolute right-[6%] top-[10%] hidden lg:block electric-pulse" style={{ borderRadius: '50%' }}>
        <svg width="120" height="140" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="float-slow opacity-[0.18]">
          <polygon points="70,0 20,75 58,75 50,140 100,55 62,55" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinejoin="round"/>
          <polygon points="70,0 20,75 58,75 50,140 100,55 62,55" fill="rgba(34,211,238,0.08)"/>
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
            <motion.div variants={fadeUp} className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#f8fafc] backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              Especialistas en Alta y Media Tensión
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
              Ferretería y Accesorios Eléctricos
              <span
                className="mt-2 block bg-gradient-to-r from-red-400 via-red-500 to-[#CC1B1B] bg-clip-text text-transparent"
              >
                para Alta y Media Tensión
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mb-12 max-w-xl text-base leading-[1.8] text-white/90 sm:text-[1.05rem]">
              Aisladores, herrajes, conectores y cables para líneas de alta y media tensión. Fabricantes y distribuidores con certificaciones IEC, ANSI y NTP — despacho en 48 h a nivel nacional.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5">
              <Link href="/catalogo" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#CC1B1B] to-[#B01010] px-9 py-4 text-sm font-bold text-white shadow-2xl shadow-red-600/30 transition-all duration-300 hover:shadow-red-600/50 hover:scale-[1.03]">
                <span className="relative z-10">Ver Catálogo</span>
                <IconArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#B01010] to-[#990a0a] opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <Link href="/contacto" className="group inline-flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-9 py-4 text-sm font-semibold text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:border-red-500/30 hover:text-white">
                <IconPhone className="h-4 w-4 text-red-500 transition-colors group-hover:text-red-400" />
                Contáctanos
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
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
            }}
          >
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
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

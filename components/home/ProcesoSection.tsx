"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeUp, scaleUp, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { PROCESO_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconPhone, IconFileText, IconTruck, IconArrowRight } from "@/components/icons"

const iconMap = {
  phone: IconPhone,
  fileText: IconFileText,
  truck: IconTruck,
}

export function ProcesoSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-32"
    >
      <div className="absolute inset-0 bg-slate-50" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-slate-100 to-transparent" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,51,160,0.05) 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-slate-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-600">
              {PROCESO_CONTENT.badge}
            </span>
            <div className="h-px w-8 bg-slate-500" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1e293b] lg:text-4xl">
            {PROCESO_CONTENT.title}
          </h2>
          <p className="mt-3 mx-auto max-w-lg text-sm text-slate-500">
            {PROCESO_CONTENT.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="relative grid gap-6 md:grid-cols-3"
        >
          <div className="absolute left-[16.66%] right-[16.66%] top-[2.2rem] hidden h-[2px] md:block overflow-hidden bg-slate-200">
            <motion.div
              className="h-full w-1/3 bg-gradient-to-r from-transparent via-slate-500 to-transparent"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
          </div>
          {PROCESO_CONTENT.steps.map((paso, i) => {
            const Icon = iconMap[["phone", "fileText", "truck"][i] as keyof typeof iconMap]
            return (
              <motion.div key={i} variants={scaleUp} className="group relative flex flex-col items-center text-center">
                {/* Glow del paso */}
                <div className="absolute top-4 h-16 w-16 rounded-full bg-slate-400/20 blur-xl transition-all duration-500 group-hover:bg-slate-500/40 group-hover:blur-2xl" />
                
                <div
                  className={`relative mb-8 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 transition-all duration-500 group-hover:-translate-y-2 group-hover:border-slate-500/30 group-hover:shadow-2xl group-hover:shadow-slate-500/20`}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${paso.colorClass} opacity-[0.15] transition-opacity duration-500 group-hover:opacity-30`}
                  />
                  {Icon && <Icon className={`relative z-10 h-7 w-7 ${paso.textClass} transition-transform duration-500 group-hover:scale-110`} />}
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-lg bg-[#64748b] text-[10px] font-black text-white shadow-sm ring-2 ring-white transition-transform duration-500 group-hover:rotate-12">
                    {i + 1}
                  </span>
                </div>
                <span className={`mb-3 text-[10px] font-black tracking-[0.25em] ${paso.textClass} uppercase`}>
                  {paso.num}
                </span>
                <h3 className="mb-3 text-lg font-extrabold text-[#1c2870]">{paso.title}</h3>
                <p className="max-w-[260px] text-sm leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-700">{paso.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-12 flex justify-center">
          <Link
            href={PROCESO_CONTENT.ctaHref}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1c2870] to-[#121a47] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-[#1c2870]/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#1c2870]/30 hover:-translate-y-1"
          >
            <span className="relative z-10">{PROCESO_CONTENT.ctaLabel}</span>
            <IconArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#64748b] to-[#475569] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}

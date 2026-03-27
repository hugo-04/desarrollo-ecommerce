"use client"

import { motion } from "framer-motion"
import { fadeUp, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { SECTORES_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconLightning, IconZap, IconBuilding, IconFire, IconArrowRight } from "@/components/icons"

const iconMap = {
  lightning: IconLightning,
  zap: IconZap,
  building: IconBuilding,
  fire: IconFire,
}

export function SectoresSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F0F6] via-white to-[#e8edf5]" />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(0,51,160,0.03) 80px, rgba(0,51,160,0.03) 81px), repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(0,51,160,0.03) 80px, rgba(0,51,160,0.03) 81px)",
        }}
      />
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div variants={fadeUp} className="mb-16 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-red-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">
              {SECTORES_CONTENT.badge}
            </span>
            <div className="h-px w-8 bg-red-500" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#121A47] lg:text-4xl">
            {SECTORES_CONTENT.title}
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-sm leading-relaxed text-slate-500">
            {SECTORES_CONTENT.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SECTORES_CONTENT.sectors.map((sector, index) => {
            const Icon = iconMap[sector.iconName as keyof typeof iconMap]
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-[24px] border border-slate-200/50 bg-white/80 p-8 backdrop-blur-md transition-all duration-700 hover:-translate-y-2 hover:border-[#1C2870]/30 hover:shadow-[0_20px_40px_rgba(28,40,112,0.1)]"
              >
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#1c2870] via-[#cc1b1b] to-[#1c2870] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <motion.div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25"
                  whileHover={{ rotate: 10 }}
                >
                  {Icon && <Icon className="h-6 w-6" />}
                </motion.div>
                <h3 className="mb-2 text-lg font-bold text-[#121A47]">{sector.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-slate-500">{sector.desc}</p>
                <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
                  <span className="text-2xl font-extrabold text-primary">{sector.stat}</span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}

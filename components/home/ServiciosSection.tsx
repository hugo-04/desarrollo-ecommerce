"use client"

import { motion } from "framer-motion"
import { fadeUp, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { SERVICIOS_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconFileText, IconBox, IconDownload, IconTools } from "@/components/icons"

const iconMap = {
  fileText: IconFileText,
  box: IconBox,
  download: IconDownload,
  tools: IconTools,
}

export function ServiciosSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5FA] via-[#EEEEF5] to-[#F5F5FA]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(0 51 160 / 0.06) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div variants={fadeUp} className="mb-16 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-slate-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-600">
              {SERVICIOS_CONTENT.badge}
            </span>
            <div className="h-px w-8 bg-slate-500" />
          </div>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-[#1e293b] lg:text-4xl">
            {SERVICIOS_CONTENT.title}
          </h2>
          <p className="mx-auto max-w-xl text-sm text-slate-500">{SERVICIOS_CONTENT.subtitle}</p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICIOS_CONTENT.services.map((servicio, index) => {
            const Icon = iconMap[servicio.iconName as keyof typeof iconMap]
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative rounded-2xl bg-white p-7 shadow-sm shadow-black/[0.04] ring-1 ring-slate-200/80 transition-all duration-500 hover:shadow-xl hover:ring-primary/30"
              >
                <motion.div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1e293b] to-primary text-white shadow-lg shadow-primary/20"
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                </motion.div>
                <h3 className="mb-2 text-base font-bold text-[#1e293b]">{servicio.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{servicio.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}

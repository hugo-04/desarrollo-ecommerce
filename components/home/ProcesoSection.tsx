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
      className="relative overflow-hidden py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F5F5FA] to-white" />
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
            <div className="h-px w-8 bg-red-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">
              {PROCESO_CONTENT.badge}
            </span>
            <div className="h-px w-8 bg-red-500" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#121A47] lg:text-4xl">
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
          <div
            className="absolute left-[16.66%] right-[16.66%] top-[2.2rem] hidden h-px md:block"
            style={{
              background:
                "repeating-linear-gradient(90deg, #CBD5E1 0, #CBD5E1 6px, transparent 6px, transparent 14px)",
            }}
          />
          {PROCESO_CONTENT.steps.map((paso, i) => {
            const Icon = iconMap[["phone", "fileText", "truck"][i] as keyof typeof iconMap]
            return (
              <motion.div key={i} variants={scaleUp} className="relative flex flex-col items-center text-center">
                <div
                  className={`relative mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-2 bg-white shadow-lg ${paso.borderClass}`}
                >
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${paso.colorClass} opacity-60`}
                  />
                  {Icon && <Icon className={`relative z-10 h-6 w-6 ${paso.textClass}`} />}
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#121A47] text-[9px] font-extrabold text-white">
                    {i + 1}
                  </span>
                </div>
                <span className={`mb-2 text-[11px] font-extrabold tracking-[0.2em] ${paso.textClass}`}>
                  {paso.num}
                </span>
                <h3 className="mb-2 text-base font-bold text-[#121A47]">{paso.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{paso.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-12 flex justify-center">
          <Link
            href={PROCESO_CONTENT.ctaHref}
            className="group inline-flex items-center gap-3 rounded-xl bg-[#121A47] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#121A47]/20 transition-all hover:bg-primary hover:shadow-primary/25"
          >
            {PROCESO_CONTENT.ctaLabel}
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}

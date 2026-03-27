"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeLeft, fadeRight, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { FABRICACION_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconCheck, IconArrowRight, IconCertificate, IconShield } from "@/components/icons"

export function FabricacionSection() {
  const c = FABRICACION_CONTENT
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/80 to-white" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,51,160,0.07) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Left — 7/12 */}
          <motion.div variants={fadeLeft} className="lg:col-span-7">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-red-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">
                {c.badge}
              </span>
            </div>
            <h2 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#121A47] lg:text-4xl">
              {c.title}
              <br />
              <span className="bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                {c.titleHighlight}
              </span>
            </h2>
            <p className="mb-6 max-w-lg text-sm leading-[1.85] text-slate-600">{c.description}</p>
            <ul className="mb-8 space-y-2.5">
              {c.productLines.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <IconCheck className="h-3 w-3 text-primary" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={c.ctaHref}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1c2870] to-[#121a47] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#1c2870]/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#1c2870]/30 hover:-translate-y-1"
              >
                <span className="relative z-10">{c.ctaLabel}</span>
                <IconArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#cc1b1b] to-[#b01010] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-amber-50 px-4 py-2">
                <IconCertificate className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-bold text-amber-700">{c.badgeLabel}</span>
              </div>
            </div>
          </motion.div>

          {/* Right — 5/12 */}
          <motion.div variants={fadeRight} className="lg:col-span-5">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl shadow-slate-200">
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6 }}
                  src={c.image}
                  alt={c.imageAlt}
                  className="h-[420px] w-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.4, duration: 0.6, type: "spring", bounce: 0.5 }}
                className="absolute -bottom-6 -right-6 rounded-2xl border border-emerald-500/30 bg-white/95 p-5 shadow-2xl shadow-emerald-900/10 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                    <IconShield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-800">Fabricante</p>
                    <p className="text-[10px] font-semibold text-emerald-600">Certificado IEC</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

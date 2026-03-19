"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeLeft, fadeRight, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { WA, CONTACT } from "@/lib/contact"
import { CTA_BAND_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconArrowRight, IconWhatsApp } from "@/components/icons"

export function CtaBand() {
  const c = CTA_BAND_CONTENT
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden arc-flash-wrap"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#07091E] via-[#121A47] to-[#07091E]" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
      <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-red-600/6 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
          <motion.div variants={fadeLeft} className="max-w-xl text-center lg:text-left">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em] text-red-400">
              {c.badge}
            </p>
            <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white lg:text-4xl">
              {c.title}
              <br />
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                {c.titleHighlight}
              </span>
            </h2>
            <p className="text-[0.95rem] leading-relaxed text-slate-400">{c.subtitle}</p>
          </motion.div>

          <motion.div variants={fadeRight} className="flex flex-col items-center gap-4 lg:items-end">
            <div className="flex flex-wrap justify-center gap-3 lg:justify-end">
              <Link
                href={c.ctaPrimaryHref}
                className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-600/25 transition-all hover:scale-[1.03] hover:shadow-red-600/40"
              >
                {c.ctaPrimary}
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={c.ctaSecondaryHref}
                className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.05] px-8 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.1] hover:text-white"
              >
                {c.ctaSecondary}
              </Link>
            </div>
            <a
              href={WA.materiales}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-slate-400 transition-colors hover:text-green-400"
            >
              <IconWhatsApp className="h-3.5 w-3.5" />
              O escríbenos por WhatsApp: {CONTACT.phoneDisplay}
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

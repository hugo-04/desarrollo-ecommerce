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
      className="relative overflow-hidden bg-[#F5F7FA]"
    >
      {/* Patrón sutil de puntos */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,102,179,0.06) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Orbes decorativos suaves */}
      <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#0066B3]/8 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-[#FF6B35]/6 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* TEXTO */}
          <motion.div variants={fadeLeft} className="max-w-xl text-center lg:text-left">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#0066B3]">
              {c.badge}
            </p>
            <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-[#003D73] lg:text-4xl">
              {c.title}
              <br />
              <span className="text-[#FF6B35]">
                {c.titleHighlight}
              </span>
            </h2>
            <p className="text-[0.95rem] leading-relaxed text-[#4A5568]">{c.subtitle}</p>
          </motion.div>

          {/* BOTONES */}
          <motion.div variants={fadeRight} className="flex flex-col items-center gap-4 lg:items-end">
            <div className="flex flex-wrap justify-center gap-3 lg:justify-end">
              <Link
                href={c.ctaPrimaryHref}
                className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#e55a2a] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6B35]/20 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-[#FF6B35]/30"
              >
                {c.ctaPrimary}
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={c.ctaSecondaryHref}
                className="flex items-center gap-2 rounded-xl border border-[#003D73]/20 bg-white px-8 py-3.5 text-sm font-semibold text-[#003D73] transition-all hover:border-[#003D73]/40 hover:bg-[#003D73]/5"
              >
                {c.ctaSecondary}
              </Link>
            </div>
            <a
              href={WA.materiales}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-[#4A5568] transition-colors hover:text-green-600"
            >
              <IconWhatsApp className="h-3.5 w-3.5 text-green-500" />
              O escríbenos por WhatsApp: {CONTACT.phoneDisplay}
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}


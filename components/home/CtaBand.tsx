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
      className="relative overflow-hidden"
    >
      {/* Fondo dark navy — CTA final = acción decisiva, máxima conversión */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#001a3d] via-[#002a5c] to-[#003D73]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23fff' stroke-width='.5'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Glow orbs */}
      <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#FF6B35]/10 blur-[100px]" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#0066B3]/20 blur-[80px]" />
      {/* Línea accent top */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6B35]/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* TEXTO */}
          <motion.div variants={fadeLeft} className="max-w-xl text-center lg:text-left">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF6B35]">
              {c.badge}
            </p>
            <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white lg:text-4xl">
              {c.title}
              <br />
              <span className="text-[#FF6B35]">
                {c.titleHighlight}
              </span>
            </h2>
            <p className="text-[0.95rem] leading-relaxed text-slate-300">{c.subtitle}</p>
          </motion.div>

          {/* BOTONES */}
          <motion.div variants={fadeRight} className="flex flex-col items-center gap-4 lg:items-end">
            <div className="flex flex-wrap justify-center gap-3 lg:justify-end">
              <Link
                href={c.ctaPrimaryHref}
                className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#e55a2a] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6B35]/30 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-[#FF6B35]/40"
              >
                {c.ctaPrimary}
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={c.ctaSecondaryHref}
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/30"
              >
                {c.ctaSecondary}
              </Link>
            </div>
            <a
              href={WA.materiales}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-white/50 transition-colors hover:text-green-400"
            >
              <IconWhatsApp className="h-3.5 w-3.5 text-green-400" />
              O escríbenos por WhatsApp: {CONTACT.phoneDisplay}
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}


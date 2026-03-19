"use client"

import { motion } from "framer-motion"
import { fadeUp, viewportOnce } from "@/hooks/useAnimations"
import { TRUST_BAR_CONTENT } from "@/lib/data/mock/static-content.mock"

export function TrustBar() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className="relative border-b border-slate-200/80 bg-gradient-to-r from-slate-50 via-white to-slate-50 py-5"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
            {TRUST_BAR_CONTENT.label}
          </p>
          <div className="h-px w-full bg-slate-200 sm:hidden" />
          <div className="h-8 w-px bg-slate-200 hidden sm:block shrink-0" />
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-start">
            {TRUST_BAR_CONTENT.companies.map((name, i) => (
              <span
                key={i}
                className="text-xs font-semibold text-slate-400 transition-colors hover:text-slate-600"
              >
                {name}
              </span>
            ))}
          </div>
          <div className="shrink-0 ml-auto hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-600">
              {TRUST_BAR_CONTENT.badge}
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

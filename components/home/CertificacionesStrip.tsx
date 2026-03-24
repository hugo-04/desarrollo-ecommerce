"use client"

import { motion } from "framer-motion"
import { fadeUp, viewportOnce } from "@/hooks/useAnimations"
import { CERTIFICACIONES_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconShield, IconCertificate } from "@/components/icons"

export function CertificacionesStrip() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className="relative border-y border-slate-200/80 bg-white py-8"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center justify-center gap-3">
          <IconShield className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
            {CERTIFICACIONES_CONTENT.label}
          </span>
          <IconShield className="h-3.5 w-3.5 text-slate-400" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {CERTIFICACIONES_CONTENT.certs.map((cert, i) => (
            <div key={i} className={`flex items-center gap-2.5 rounded-lg border px-4 py-2.5 ${cert.bgClass}`}>
              <IconCertificate className={`h-4 w-4 shrink-0 ${cert.colorClass}`} />
              <div>
                <p className={`text-[12px] font-extrabold tracking-wide ${cert.colorClass}`}>
                  {cert.code}
                </p>
                <p className="text-[10px] text-slate-500">{cert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

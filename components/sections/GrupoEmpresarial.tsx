"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { fadeUp, staggerContainer, viewportOnce } from "@/hooks/useAnimations"

// ─── Datos del grupo ───────────────────────────────────────────────────────────
const EMPRESAS = [
  {
    nombre:   "Lorem Ipsum S.A.C.",
    ruc:      "00000000000",
    giro:     "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    logo:     "",
    actual:   true,
  },
  {
    nombre:   "Lorem Ipsum E.I.R.L.",
    ruc:      "00000000001",
    giro:     "Lorem ipsum dolor sit amet consectetur adipiscing",
    logo:     "",
    actual:   false,
  },
  {
    nombre:   "Lorem Ipsum Corporación E.I.R.L.",
    ruc:      "00000000002",
    giro:     "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    logo:     "",
    actual:   false,
  },
]

// ─── Versión COMPLETA — Nosotros ──────────────────────────────────────────────

export function GrupoEmpresarialSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Circuit board background — versión oscura sobre blanco, muy sutil */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='60' fill='none'/%3E%3Cpath d='M0 30h20M40 30h20M30 0v20M30 40v20' stroke='%23121A47' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='3' fill='none' stroke='%23121A47' stroke-width='1'/%3E%3Ccircle cx='0' cy='0' r='1.5' fill='%23ef4444'/%3E%3Ccircle cx='60' cy='60' r='1.5' fill='%23ef4444'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Separador superior — línea roja para cortar visualmente la sección anterior */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-slate-500/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-3">
              <div className="h-px w-8 bg-slate-500/60" />
              <span className="rounded border border-slate-500/40 bg-slate-50 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
                Grupo Empresarial
              </span>
              <div className="h-px w-8 bg-slate-500/60" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1e293b] lg:text-4xl">
              Lorem Ipsum del Grupo
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </p>
          </motion.div>

          {/* Cards grid */}
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3"
          >
            {EMPRESAS.map((empresa, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group relative overflow-hidden rounded-xl border p-6 transition-all duration-500 ${
                  empresa.actual
                    ? "border-slate-500/40 bg-gradient-to-br from-slate-50 to-white shadow-lg shadow-slate-100"
                    : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {/* Top accent line */}
                <div className={`absolute inset-x-0 top-0 h-[2px] ${empresa.actual ? "bg-gradient-to-r from-slate-500/0 via-slate-500 to-slate-500/0" : "bg-gradient-to-r from-[#1e293b]/0 via-[#1e293b]/30 to-[#1e293b]/0 opacity-0 group-hover:opacity-100 transition-opacity"}`} />

                {/* Corner circuit decoration */}
                <div className="absolute right-3 top-3 opacity-10">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M20 0 L20 10 L10 10 L10 20" stroke={empresa.actual ? "#ef4444" : "#1e293b"} strokeWidth="1" fill="none"/>
                    <circle cx="10" cy="10" r="1.5" fill={empresa.actual ? "#ef4444" : "#1e293b"}/>
                  </svg>
                </div>

                {/* Badge empresa actual */}
                {empresa.actual && (
                  <div className="mb-4 inline-flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-slate-500" />
                    </span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
                      Esta empresa
                    </span>
                  </div>
                )}

                {/* Logo */}
                <div className="mb-4 flex h-14 items-center">
                  {empresa.logo ? (
                    <Image
                      src={empresa.logo}
                      alt={`Logo ${empresa.nombre}`}
                      width={120}
                      height={56}
                      className="h-12 w-auto object-contain"
                      unoptimized
                    />
                  ) : (
                    <div className="h-12 w-28 rounded bg-slate-100 border border-slate-200" />
                  )}
                </div>

                {/* Nombre */}
                <h3 className={`mb-1 text-base font-bold leading-tight ${empresa.actual ? "text-[#1e293b]" : "text-slate-700 group-hover:text-[#1e293b] transition-colors"}`}>
                  {empresa.nombre}
                </h3>

                {/* Giro */}
                <p className="mb-4 text-[11px] leading-relaxed text-slate-500">
                  {empresa.giro}
                </p>

                {/* RUC — tipo placa técnica */}
                <div className={`rounded-lg border px-3 py-2 ${empresa.actual ? "border-slate-200 bg-slate-50" : "border-slate-200 bg-slate-50"}`}>
                  <p className={`font-mono text-[9px] font-semibold uppercase tracking-[0.2em] ${empresa.actual ? "text-slate-500/70" : "text-slate-400"}`}>
                    RUC
                  </p>
                  <p className={`font-mono text-sm font-bold tracking-wider ${empresa.actual ? "text-slate-600" : "text-slate-600"}`}>
                    {empresa.ruc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Nota legal */}
          <motion.p variants={fadeUp} className="mt-8 text-center font-mono text-[10px] text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. · Lorem · Ipsum
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Versión COMPACTA — Home ──────────────────────────────────────────────────

export function GrupoEmpresarialBand() {
  return (
    <section className="relative overflow-hidden bg-[#1e293b] py-12">
      {/* Separador superior rojo — contrasta con secciones adyacentes */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-slate-500/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-slate-500/30 to-transparent" />

      {/* Subtle circuit grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23fff' stroke-width='.5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {/* Label superior */}
          <motion.div variants={fadeUp} className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
              Grupo Empresarial
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
          </motion.div>

          {/* Empresas en banda horizontal */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {EMPRESAS.map((empresa, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  visible: {
                    opacity: 1, x: 0,
                    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
                  },
                }}
                className={`group relative overflow-hidden rounded-lg border px-4 py-3.5 transition-all duration-300 ${
                  empresa.actual
                    ? "border-slate-500/40 bg-slate-500/[0.10]"
                    : "border-white/[0.10] bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.08]"
                }`}
              >
                {empresa.actual && (
                  <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-slate-600/0 via-slate-500/90 to-slate-600/0" />
                )}

                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    {/* Mini logo */}
                    <div className="mb-2 flex h-8 items-center">
                      {empresa.logo ? (
                        <div className="inline-flex items-center rounded-md bg-white/95 px-2 py-0.5 shadow-sm">
                          <Image
                            src={empresa.logo}
                            alt={`Logo ${empresa.nombre}`}
                            width={80}
                            height={24}
                            className="h-5 w-auto object-contain"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="h-6 w-16 rounded bg-white/20 border border-white/10" />
                      )}
                    </div>
                    <p className={`truncate text-[11px] font-bold leading-tight ${empresa.actual ? "text-white" : "text-white/60 group-hover:text-white/90 transition-colors"}`}>
                      {empresa.nombre}
                    </p>
                    <p className={`mt-1.5 font-mono text-[10px] tracking-wider ${empresa.actual ? "text-slate-300/80" : "text-white/30"}`}>
                      {empresa.ruc}
                    </p>
                  </div>
                  {empresa.actual && (
                    <span className="relative mt-0.5 flex h-1.5 w-1.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-slate-500" />
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Nota al pie */}
          <motion.p variants={fadeUp} className="mt-5 text-center font-mono text-[10px] text-white/25">
            Lorem ipsum dolor sit amet · Lorem Ipsum · Lorem Ipsum
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

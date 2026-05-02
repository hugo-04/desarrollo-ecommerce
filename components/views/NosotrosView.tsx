"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { WA } from "@/lib/contact"
import {
  IconShield, IconTruck, IconClock, IconHeadphones,
  IconArrowRight, IconCertificate, IconCheck, IconBolt, IconZap,
  IconWhatsApp,
} from "@/components/icons"
import { fadeUp, fadeLeft, fadeRight, staggerContainer, scaleUp, viewportOnce } from "@/hooks/useAnimations"

const FOUNDING_YEAR = 2010

export function NosotrosView() {
  const yearsActive = new Date().getFullYear() - FOUNDING_YEAR

  const valores = [
    {
      icon: IconShield,
      title: "Lorem Ipsum A",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      icon: IconTruck,
      title: "Lorem Ipsum B",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      icon: IconClock,
      title: "Lorem Ipsum C",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      icon: IconHeadphones,
      title: "Lorem Ipsum D",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ]

  const stats = [
    { value: `${yearsActive}+`, label: "Lorem ipsum sector" },
    { value: "350+",            label: "Lorem ipsum ejecutados" },
    { value: "50+",             label: "Lorem ipsum stock" },
    { value: "98%",             label: "Lorem ipsum satisfechos" },
  ]

  return (
    <>
      {/* ===== HERO — DARK ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#003D73]" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80')] bg-cover bg-center opacity-[0.07]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\' stroke=\'%23fff\' stroke-width=\'.5\'/%3E%3C/svg%3E")' }} />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6B35]/60 to-transparent" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative mx-auto max-w-7xl px-4 py-24 text-center"
        >
          <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.08] px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
            Quiénes somos
          </motion.div>
          {/* H1 con keyword principal */}
          <motion.h1 variants={fadeUp} className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Lorem Ipsum — Lorem Ipsum Dolor Sit Amet
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </motion.p>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </section>

      {/* ===== HISTORIA — LIGHT ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid items-center gap-14 lg:grid-cols-2"
          >
            <motion.div variants={fadeLeft}>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-[#0066B3]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0066B3]">Nuestra Historia</span>
              </div>
              {/* H2 con keyword secundaria */}
              <h2 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#1e293b] lg:text-4xl">
                Lorem ipsum {yearsActive} años<br />lorem ipsum dolor sit amet
              </h2>
              <p className="mb-4 text-sm leading-[1.85] text-slate-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
              <p className="mb-6 text-sm leading-[1.85] text-slate-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, i) => (
                  <motion.div key={i} variants={scaleUp} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#003D73]">{stat.value}</p>
                    <p className="mt-0.5 text-[11px] font-medium text-slate-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeRight} className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
                  alt="Lorem ipsum dolor sit amet"
                  className="h-[440px] w-full object-cover"
                />
              </div>

            </motion.div>
          </motion.div>

        </div>
      </section>


      {/* ===== MISIÓN & VISIÓN — DARK ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#002a52] via-[#003D73] to-[#002a52]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B35]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FF6B35]/20 to-transparent" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="relative mx-auto max-w-7xl px-4 py-20"
        >
          <motion.div variants={fadeUp} className="mb-14 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-[#FF6B35]/60" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">Propósito</span>
              <div className="h-px w-8 bg-[#FF6B35]/60" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white lg:text-4xl">Misión y Visión</h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Misión */}
            <motion.div
              variants={fadeLeft}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#0066B3]/30 hover:bg-white/[0.07]"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#0066B3]/0 via-[#0066B3]/60 to-[#0066B3]/0 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066B3]/20 to-[#003D73]/10 ring-1 ring-[#0066B3]/20">
                <IconBolt className="h-7 w-7 text-[#0066B3]" />
              </div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#0066B3]">Misión</p>
              <h3 className="mb-4 text-xl font-extrabold text-white">Lorem Ipsum Dolor Sit Amet Consectetur</h3>
              <p className="text-sm leading-[1.85] text-slate-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  "Lorem ipsum dolor sit amet consectetur adipiscing",
                  "Lorem ipsum dolor ut labore et dolore magna aliqua",
                  "Lorem ipsum consectetur adipiscing elit sed eiusmod",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-white/60">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0066B3]/20 text-[#0066B3]">
                      <IconCheck className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Visión */}
            <motion.div
              variants={fadeRight}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/20 hover:bg-white/[0.07]"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-blue-600/10 ring-1 ring-primary/20">
                <IconZap className="h-7 w-7 text-blue-400" />
              </div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400">Visión</p>
              <h3 className="mb-4 text-xl font-extrabold text-white">Lorem Ipsum Dolor Sit Amet Adipiscing Elit</h3>
              <p className="text-sm leading-[1.85] text-slate-400">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation laboris nisi aliquip.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  "Lorem ipsum dolor sit amet adipiscing elit",
                  "Lorem ipsum consectetur ut labore et dolore magna",
                  "Lorem ipsum dolor incididunt ut labore dolore aliqua",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-white/60">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#FF6B35]/15 text-[#FF6B35]">
                      <IconCheck className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ===== VALORES — LIGHT ===== */}
      <section className="bg-[#F5F7FA] py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-[#0066B3]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0066B3]">Valores</span>
                <div className="h-px w-8 bg-[#0066B3]" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#1e293b] lg:text-4xl">Lo que nos define</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt</p>
            </motion.div>

            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {valores.map((valor, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:border-[#FF6B35]/40 hover:shadow-xl"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#FF6B35]/0 via-[#FF6B35] to-[#FF6B35]/0 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-gradient-to-br from-[#003D73]/10 to-[#003D73]/5 text-[#003D73] transition-all group-hover:bg-[#FF6B35] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#FF6B35]/20">
                    <valor.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-[#1e293b]">{valor.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{valor.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== GRUPO EMPRESARIAL (oculto) ===== */}
      {/* <GrupoEmpresarialSection /> */}

      {/* ===== CTA FINAL — LIGHT ===== */}
      <section className="relative overflow-hidden bg-[#E6EDF5]">
        {/* Patrón sutil de puntos */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,102,179,0.08) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#0066B3]/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-[#FF6B35]/8 blur-3xl" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="relative mx-auto max-w-4xl px-4 py-20 text-center"
        >
          <motion.p variants={fadeUp} className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#0066B3]">
            ¿Ya nos conoces?
          </motion.p>
          <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-extrabold tracking-tight text-[#003D73] lg:text-4xl">
            Lorem Ipsum Dolor Sit Amet Consectetur
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-[#4A5568]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/catalogo"
              className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#e55a2a] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6B35]/20 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-[#FF6B35]/30"
            >
              Ver Catálogo
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={WA.ingeniero}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl border border-[#003D73]/20 bg-white px-8 py-3.5 text-sm font-semibold text-[#003D73] transition-all hover:border-[#003D73]/40 hover:bg-[#003D73]/5"
            >
              <IconWhatsApp className="h-4 w-4 text-green-500" />
              Contacta con un asesor especializado
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

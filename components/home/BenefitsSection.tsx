"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { BENEFITS_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconShield, IconTruck, IconHeadphones, IconArrowRight } from "@/components/icons"

const iconMap = {
  shield: IconShield,
  truck: IconTruck,
  headphones: IconHeadphones,
}

export function BenefitsSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#07091E] via-[#1e293b] to-[#0f172a]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute -left-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/6 blur-3xl" />
      <div className="absolute -right-40 top-1/3 h-64 w-64 rounded-full bg-slate-500/6 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          {/* LEFT */}
          <motion.div variants={fadeLeft} className="lg:col-span-5">
            <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
              {BENEFITS_CONTENT.badge}
            </span>
            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-7xl font-extrabold leading-none tracking-tight text-white lg:text-8xl">
                  {BENEFITS_CONTENT.yearsExperience}
                </span>
                <span className="text-4xl font-bold text-slate-500">+</span>
              </div>
              <p className="mt-1 text-base font-semibold uppercase tracking-widest text-slate-400">
                {BENEFITS_CONTENT.experienceLabel}
              </p>
            </div>
            <p className="mb-8 text-[0.95rem] leading-[1.8] text-slate-400">
              {BENEFITS_CONTENT.description}
            </p>
            <div className="mb-8 flex gap-8">
              {BENEFITS_CONTENT.stats.map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-extrabold text-white">{s.value}</p>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href={BENEFITS_CONTENT.ctaHref}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              {BENEFITS_CONTENT.ctaLabel}
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
            className="lg:col-span-7 space-y-0"
          >
            {BENEFITS_CONTENT.benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.iconName as keyof typeof iconMap]
              return (
                <motion.div
                  key={index}
                  variants={fadeRight}
                  className="group flex items-start gap-6 border-b border-white/[0.06] py-7 last:border-0 transition-all duration-300 hover:border-white/[0.12]"
                >
                  <motion.div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-600/10 text-slate-400 transition-all duration-500 group-hover:from-amber-400/20 group-hover:to-amber-600/10 group-hover:text-amber-300 group-hover:[box-shadow:0_0_0_6px_rgba(245,158,11,0.10),0_0_20px_4px_rgba(245,158,11,0.08)]"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {Icon && <Icon className="h-6 w-6" />}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="mb-1.5 text-lg font-bold text-white">{benefit.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{benefit.description}</p>
                  </div>
                  <IconArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-white/10 transition-all group-hover:translate-x-1 group-hover:text-slate-400/60" />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

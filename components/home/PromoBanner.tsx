"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeLeft, fadeRight, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { PROMO_BANNER_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconArrowRight, IconClock, IconBox, IconHeadphones } from "@/components/icons"

const iconMap = {
  clock: IconClock,
  box: IconBox,
  headphones: IconHeadphones,
}

export function PromoBanner() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden bg-[#080A1C]"
    >
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#E11D48]/30 to-transparent" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#1E3A8A]/10 to-transparent rounded-full blur-[100px] opacity-50 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-[#E11D48]/5 to-transparent rounded-full blur-[100px] opacity-50 -translate-x-1/2 translate-y-1/2" />

      <div className="relative mx-auto max-w-7xl px-4 py-28 z-20">
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <motion.div
              variants={fadeLeft}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E11D48]/20 bg-[#E11D48]/[0.03] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E11D48]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
              {PROMO_BANNER_CONTENT.badge}
            </motion.div>
            <motion.h2
              variants={fadeLeft}
              className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white lg:text-[2.8rem]"
            >
              {PROMO_BANNER_CONTENT.title}
              <br />
              <span className="bg-gradient-to-r from-[#FF6B6B] to-[#F97316] bg-clip-text text-transparent">
                {PROMO_BANNER_CONTENT.titleHighlight}
              </span>
            </motion.h2>
            <motion.p
              variants={fadeLeft}
              className="mb-10 max-w-xl text-[0.95rem] leading-[1.8] text-slate-400"
            >
              {PROMO_BANNER_CONTENT.description}
            </motion.p>
            <motion.div variants={fadeLeft} className="flex flex-wrap items-center gap-4">
              <Link
                href={PROMO_BANNER_CONTENT.ctaPrimaryHref}
                className="group flex items-center gap-3 rounded-lg bg-[#E60000] px-7 py-3 text-sm font-bold text-white transition-all hover:bg-[#CC0000]"
              >
                {PROMO_BANNER_CONTENT.ctaPrimary}
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={PROMO_BANNER_CONTENT.ctaSecondaryHref}
                className="flex items-center gap-2 rounded-lg border border-[#1E2848] bg-[#101530] px-7 py-3 text-sm font-semibold text-slate-300 transition-colors hover:bg-[#131B38] hover:text-white"
              >
                {PROMO_BANNER_CONTENT.ctaSecondary}
              </Link>
            </motion.div>
          </div>

          <motion.div variants={fadeRight} className="flex flex-col gap-4">
            {PROMO_BANNER_CONTENT.features.map((item, i) => {
              const Icon = iconMap[item.iconName as keyof typeof iconMap]
              return (
                <motion.div
                  key={i}
                  variants={fadeRight}
                  className="group flex items-center gap-5 rounded-xl border border-[#181E40] bg-[#0D1230] p-5 transition-colors hover:border-[#2a3a5f] hover:bg-[#101530]"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border ${item.iconBgClass}`}
                  >
                    {Icon && <Icon className={`h-5 w-5 ${item.textClass}`} />}
                  </div>
                  <div>
                    <h4 className="mb-1 text-[13px] font-bold text-white">{item.title}</h4>
                    <p className="text-[12px] text-slate-400">{item.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

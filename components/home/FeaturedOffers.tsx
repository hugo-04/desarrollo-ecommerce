"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeUp, scaleUp, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { FEATURED_OFFERS_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconShield, IconBolt, IconTools, IconArrowRight } from "@/components/icons"

const iconMap = {
  shield: IconShield,
  bolt: IconBolt,
  tools: IconTools,
}

export function FeaturedOffers() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0f2f7] to-[#e8ebf0]" />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/[0.02] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            {FEATURED_OFFERS_CONTENT.badge}
          </span>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-slate-900 lg:text-3xl">
            {FEATURED_OFFERS_CONTENT.title}
          </h2>
          <p className="mx-auto max-w-xl text-sm text-slate-500">
            {FEATURED_OFFERS_CONTENT.subtitle}
          </p>
        </motion.div>
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid gap-6 md:grid-cols-3"
        >
          {FEATURED_OFFERS_CONTENT.offers.map((offer, index) => {
            const Icon = iconMap[offer.iconName as keyof typeof iconMap]
            return (
              <motion.div
                key={index}
                variants={scaleUp}
                whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
              >
                <Link
                  href="/catalogo"
                  className="group relative block overflow-hidden rounded-2xl p-7 text-left transition-all duration-500 hover:shadow-2xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${offer.gradient}`} />
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-[2]" />
                  <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-white/5" />
                  <div className="relative">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/20">
                      {Icon && <Icon className="h-7 w-7 text-white" />}
                    </div>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
                      {offer.subtitle}
                    </p>
                    <h3 className="mb-2 text-xl font-extrabold text-white">{offer.title}</h3>
                    <p className="mb-5 text-sm leading-relaxed text-white/70">
                      {offer.description}
                    </p>
                    <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition-all group-hover:bg-white/20 group-hover:gap-3">
                      Explorar productos
                      <IconArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}

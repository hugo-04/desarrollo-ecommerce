"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeUp, scaleUp, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { FEATURED_OFFERS_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconShield, IconBolt, IconTools, IconArrowRight } from "@/components/icons"
import { useEspecialidadesActivas } from "@/features/especialidades/hooks"

const iconMap = {
  shield: IconShield,
  bolt:   IconBolt,
  tools:  IconTools,
}

const STATIC_OFFERS = FEATURED_OFFERS_CONTENT.offers

export function FeaturedOffers() {
  const { data: dbOffers, isLoading } = useEspecialidadesActivas()

  // Usa datos de la DB si existen; si no, fallback al contenido estático
  const offers = dbOffers && dbOffers.length > 0
    ? dbOffers.map((o) => ({
        id:          o.id,
        title:       o.title,
        subtitle:    o.subtitle,
        description: o.description,
        image:       o.image,
        imageAlt:    o.imageAlt,
        gradient:    o.gradient,
        iconName:    null as string | null,
      }))
    : STATIC_OFFERS.map((o, i) => ({ id: i, ...o, image: "", imageAlt: undefined }))

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-20"
    >
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50/60 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">
            {FEATURED_OFFERS_CONTENT.badge}
          </span>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-foreground lg:text-3xl">
            {FEATURED_OFFERS_CONTENT.title}
          </h2>
          <p className="mx-auto max-w-xl text-sm text-foreground/60">
            {FEATURED_OFFERS_CONTENT.subtitle}
          </p>
        </motion.div>

        {isLoading ? (
          /* Skeleton mientras carga */
          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid gap-6 md:grid-cols-3"
          >
            {offers.map((offer, index) => {
              const Icon = offer.iconName ? iconMap[offer.iconName as keyof typeof iconMap] : null
              const hasImage = offer.image && offer.image.startsWith("http")
              return (
                <motion.div
                  key={offer.id}
                  variants={scaleUp}
                  whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
                >
                  <Link
                    href="/catalogo"
                    className="group relative block overflow-hidden rounded-2xl p-7 text-left transition-all duration-500 hover:shadow-2xl"
                  >
                    {/* Fondo: imagen + gradiente overlay, o solo gradiente */}
                    {hasImage ? (
                      <>
                        <img
                          src={offer.image}
                          alt={offer.imageAlt ?? offer.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${offer.gradient} opacity-80`} />
                      </>
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${offer.gradient}`} />
                    )}

                    {/* Decorativos */}
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-[2]" />
                    <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-white/5" />

                    {/* Contenido */}
                    <div className="relative">
                      <div className="mb-5 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/20">
                        {hasImage ? (
                          <img
                            src={offer.image}
                            alt=""
                            aria-hidden
                            className="h-full w-full object-cover scale-150"
                          />
                        ) : Icon ? (
                          <Icon className="h-7 w-7 text-white" />
                        ) : (
                          <span className="text-lg font-black text-white">{offer.title[0]}</span>
                        )}
                      </div>
                      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
                        {offer.subtitle}
                      </p>
                      <h3 className="mb-2 text-xl font-extrabold text-white">{offer.title}</h3>
                      <p className="mb-5 text-sm leading-relaxed text-white/70">{offer.description}</p>
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
        )}
      </div>
    </motion.section>
  )
}

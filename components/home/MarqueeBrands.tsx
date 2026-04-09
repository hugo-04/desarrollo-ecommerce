"use client"

import { motion } from "framer-motion"
import { fadeUp, blurIn, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { useBrandsCarousel } from "@/features/marcas/hooks"
import { MARQUEE_BRANDS_CONTENT } from "@/lib/data/mock/static-content.mock"
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars"

export function MarqueeBrands() {
  const brands = useBrandsCarousel()

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1035] via-[#121A47] to-[#0B1035]" />
      <StarsBackground
        starColor="#4d7cc7"
        className="absolute inset-0 z-0 bg-transparent opacity-40"
      />
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-red-600/50 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10" />
      <div className="absolute inset-y-0 left-0 z-20 w-32 bg-gradient-to-r from-[#0B1035] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 z-20 w-32 bg-gradient-to-l from-[#0B1035] to-transparent pointer-events-none" />

      <div className="relative z-30 mx-auto max-w-7xl px-4">
        <motion.div variants={fadeUp} className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.07] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-red-400">
            <span className="h-1.5 w-1.5 rounded-full shadow-[0_0_8px_#ef4444] bg-red-500" />
            {MARQUEE_BRANDS_CONTENT.badge}
          </span>
          <h3 className="mb-1.5 text-2xl font-extrabold tracking-tight text-white neon-title">
            {MARQUEE_BRANDS_CONTENT.title}
          </h3>
          <p className="text-xs text-slate-400">{MARQUEE_BRANDS_CONTENT.subtitle}</p>
        </motion.div>

        {brands.length > 0 && (
          <>
            <motion.div variants={blurIn} className="marquee-container mb-6">
              <div className="marquee-content">
                {[...brands, ...brands].map((brand, index) => (
                  <div
                    key={`brand-1-${index}`}
                    className="group mx-3 flex h-[80px] min-w-[220px] items-center gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-6 backdrop-blur-md transition-all duration-300 hover:border-amber-400/20 hover:bg-white/[0.06] hover:shadow-[0_0_20px_-4px_rgba(245,158,11,0.25)]"
                  >
                    <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-white/[0.08] transition-colors group-hover:bg-white/[0.1]">
                      {brand.logo && (
                        <img
                          src={brand.logo}
                          alt={brand.logoAlt ?? brand.name}
                          className="max-h-[22px] max-w-[22px] object-contain brightness-0 invert opacity-60 transition-all group-hover:opacity-100"
                          crossOrigin="anonymous"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).style.display = "none"
                          }}
                        />
                      )}
                    </div>
                    <span className="text-[15px] font-extrabold tracking-wide text-white/80 transition-colors group-hover:text-white">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={blurIn} className="marquee-container-reverse">
              <div className="marquee-content-reverse">
                {[...brands]
                  .reverse()
                  .concat([...brands].reverse())
                  .map((brand, index) => (
                    <div
                      key={`brand-2-${index}`}
                      className="group mx-3 flex h-[80px] min-w-[220px] items-center gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_20px_-4px_rgba(59,130,246,0.20)]"
                    >
                      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-white/[0.08] transition-colors group-hover:bg-white/[0.1]">
                        {brand.logo && (
                          <img
                            src={brand.logo}
                            alt={brand.logoAlt ?? brand.name}
                            className="max-h-[22px] max-w-[22px] object-contain brightness-0 invert opacity-60 transition-all group-hover:opacity-100"
                            crossOrigin="anonymous"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).style.display = "none"
                            }}
                          />
                        )}
                      </div>
                      <span className="text-[15px] font-extrabold tracking-wide text-white/80 transition-colors group-hover:text-white">
                        {brand.name}
                      </span>
                    </div>
                  ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.section>
  )
}

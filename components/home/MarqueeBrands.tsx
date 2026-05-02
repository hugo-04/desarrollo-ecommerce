"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { fadeUp, blurIn, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { MARQUEE_BRANDS_CONTENT } from "@/lib/data/mock/static-content.mock"

import type { Brand } from "@/lib/types"

interface MarqueeBrandsProps {
  brands: Brand[]
}

export function MarqueeBrands({ brands: rawBrands = [] }: MarqueeBrandsProps) {
  const brands = rawBrands.map((b) => ({
    ...b,
    logo: b.logo && (b.logo.startsWith("https://") || b.logo.startsWith("/")) ? b.logo : undefined,
  }))

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-20"
    >
      <div className="absolute inset-0 bg-[#002a52]" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\' stroke=\'%23fff\' stroke-width=\'.5\'/%3E%3C/svg%3E")' }} />
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF6B35]/50 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF6B35]/20 to-transparent z-10" />
      <div className="absolute inset-y-0 left-0 z-20 w-32 bg-gradient-to-r from-[#002a52] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 z-20 w-32 bg-gradient-to-l from-[#002a52] to-transparent pointer-events-none" />

      <div className="relative z-30 mx-auto max-w-7xl px-4">
        <motion.div variants={fadeUp} className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
            {MARQUEE_BRANDS_CONTENT.badge}
          </span>
          <h3 className="mb-1.5 text-2xl font-extrabold tracking-tight text-white neon-title">
            {MARQUEE_BRANDS_CONTENT.title}
          </h3>
          <p className="text-xs text-slate-400">{MARQUEE_BRANDS_CONTENT.subtitle}</p>
        </motion.div>

        {brands.length > 0 && (
          <motion.div variants={blurIn} className="marquee-container-reverse">
            <div className="marquee-content-reverse">
              {[...brands, ...brands].map((brand, index) => (
                <div
                  key={`brand-${index}`}
                  className="group mx-3 flex h-[80px] min-w-[220px] items-center gap-4 rounded-2xl border border-white/5 bg-white/2 px-6 backdrop-blur-md transition-all duration-300 hover:border-[#FF6B35]/30 hover:bg-white/6 hover:shadow-[0_0_20px_-4px_rgba(255,107,53,0.20)]"
                >
                  <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-sm ring-1 ring-white/20">
                    {brand.logo && (
                      <Image
                        src={brand.logo}
                        alt={brand.logoAlt ?? brand.name}
                        width={30}
                        height={30}
                        unoptimized
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
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
        )}
      </div>
    </motion.section>
  )
}

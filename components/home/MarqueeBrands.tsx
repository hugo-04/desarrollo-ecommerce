"use client"

import Image from "next/image"
import { useRef, useEffect } from "react"
import { motion, useMotionValue, useAnimationFrame, useInView } from "framer-motion"
import { fadeUp, blurIn, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { MARQUEE_BRANDS_CONTENT } from "@/lib/data/mock/static-content.mock"
import type { Brand } from "@/lib/types"

const LOCAL_LOGOS: Record<string, string> = {
  SKF:           "/brands/skf.svg",
  Timken:        "/brands/timken.svg",
  INA:           "/brands/ina.svg",
  NSK:           "/brands/nsk.svg",
  FAG:           "/brands/fag.svg",
  Parker:        "/brands/parker.svg",
  Rexroth:       "/brands/rexroth.svg",
  Yuken:         "/brands/yuken.svg",
  Gates:         "/brands/gates.svg",
  Optibelt:      "/brands/optibelt.svg",
  Continental:   "/brands/continental.svg",
  Donaldson:     "/brands/donaldson.svg",
  Fleetguard:    "/brands/fleetguard.svg",
  Caterpillar:   "/brands/caterpillar.svg",
  "Mann+Hummel": "/brands/mann-hummel.svg",
  Kitz:          "/brands/kitz.svg",
  Bray:          "/brands/bray.svg",
  KSB:           "/brands/ksb.svg",
  Velan:         "/brands/velan.svg",
  Racor:         "/brands/racor.svg",
}

interface MarqueeBrandsProps {
  brands: Brand[]
}

export function MarqueeBrands({ brands: rawBrands = [] }: MarqueeBrandsProps) {
  const brands = rawBrands.map((b) => ({
    ...b,
    logo:
      (b.logo && (b.logo.startsWith("http://") || b.logo.startsWith("https://") || b.logo.startsWith("/")) ? b.logo : undefined) ??
      LOCAL_LOGOS[b.name],
  }))

  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const isInView   = useInView(sectionRef, { margin: "0px 0px -100px 0px" })

  const x          = useMotionValue(0)
  const offsetRef  = useRef(0)
  const halfRef    = useRef(0)
  const dragRef    = useRef({ active: false, startX: 0, startOffset: 0 })
  const pausedRef  = useRef(false)

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) halfRef.current = trackRef.current.scrollWidth / 2
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [brands.length])

  useAnimationFrame((_, delta) => {
    if (pausedRef.current || !isInView || halfRef.current === 0) return
    offsetRef.current -= delta * 0.045
    if (offsetRef.current <= -halfRef.current) offsetRef.current += halfRef.current
    x.set(offsetRef.current)
  })

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pausedRef.current = true
    dragRef.current = { active: true, startX: e.clientX, startOffset: offsetRef.current }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return
    const dx = e.clientX - dragRef.current.startX
    let next = dragRef.current.startOffset + dx
    if (next > 0) next = 0
    const hw = halfRef.current
    if (hw > 0 && next < -hw) next = -hw
    offsetRef.current = next
    x.set(next)
  }

  const onPointerUp = () => {
    dragRef.current.active = false
    pausedRef.current = false
  }

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-20"
    >
      <div className="absolute inset-0 bg-[#002a52]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\' stroke=\'%23fff\' stroke-width=\'.5\'/%3E%3C/svg%3E")',
        }}
      />
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
          <motion.div variants={blurIn}>
            <div
              className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <motion.div ref={trackRef} style={{ x }} className="flex">
                {[...brands, ...brands].map((brand, index) => (
                  <div
                    key={`brand-${index}`}
                    className="group mx-3 flex h-[80px] min-w-[220px] items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-6 backdrop-blur-md transition-colors duration-300 hover:border-[#FF6B35]/30 hover:bg-white/[0.06] hover:shadow-[0_0_20px_-4px_rgba(255,107,53,0.20)]"
                  >
                    <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-white/20">
                      {brand.logo ? (
                        <Image
                          src={brand.logo}
                          alt={brand.logoAlt ?? brand.name}
                          width={32}
                          height={32}
                          unoptimized
                          draggable={false}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-[10px] font-black text-[#003D73]">
                          {brand.name.slice(0, 3).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="text-[15px] font-extrabold tracking-wide text-white/80 transition-colors group-hover:text-white">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            <p className="mt-5 text-center text-[11px] text-white/30 select-none">
              ← Arrastra para explorar →
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

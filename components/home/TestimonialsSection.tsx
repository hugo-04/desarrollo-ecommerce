"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { fadeUp, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { MOCK_TESTIMONIALS as testimonials } from "@/lib/data/mock/testimonials.mock"

const StarIcon = () => (
  <svg className="h-4 w-4 fill-amber-400 drop-shadow-sm" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const QuoteBg = () => (
  <svg
    viewBox="0 0 80 60"
    fill="none"
    className="absolute -right-2 -top-2 h-28 w-28 text-[#0066B3]/[0.06] pointer-events-none select-none"
    aria-hidden
  >
    <text
      x="0"
      y="55"
      fontSize="80"
      fontFamily="Georgia, serif"
      fontWeight="bold"
      fill="currentColor"
    >
      &#8220;
    </text>
  </svg>
)

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 1 },
    },
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    onSelect()
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi) return
    const id = setInterval(() => emblaApi.scrollNext(), 5500)
    return () => clearInterval(id)
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* Background — crema cálida: testimonios = proximidad humana */}
      <div className="absolute inset-0 bg-[#FFFBF7]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(180,100,40,0.04) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#FF6B35]/[0.06] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 translate-y-1/4 rounded-full bg-[#0066B3]/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#0066B3]/20 bg-[#0066B3]/[0.06] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#0066B3]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" />
            Testimonios
          </span>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-[#1e293b] lg:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mx-auto max-w-sm text-sm text-slate-500">
            Empresas líderes del sector industrial confían en nosotros desde 2011
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div variants={fadeUp}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="relative flex min-w-0 shrink-0 basis-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:basis-[calc(50%-10px)] lg:basis-[calc(33.333%-14px)]"
                >
                  <QuoteBg />

                  {/* Stars */}
                  <div className="mb-4 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Identity — solo nombre + empresa, sin avatar */}
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-sm font-bold text-[#1e293b]">{t.author}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{t.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                aria-label={`Ir al testimonio ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === selectedIndex
                    ? "w-6 bg-[#0066B3]"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

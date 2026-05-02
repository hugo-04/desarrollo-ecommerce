"use client"

import { motion } from "framer-motion"
import { fadeUp, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { MOCK_TESTIMONIALS as testimonials } from "@/lib/data/mock/testimonials.mock"
import { IconQuote } from "@/components/icons"

const ACCENT_COLORS = [
  { border: "border-l-[#0066B3]", glow: "bg-[#0066B3]/5", badge: "bg-[#0066B3]/10 text-[#0066B3] border-[#0066B3]/20", quote: "text-[#0066B3]/40" },
  { border: "border-l-[#FF6B35]", glow: "bg-[#FF6B35]/5", badge: "bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20", quote: "text-[#FF6B35]/40" },
  { border: "border-l-[#003D73]", glow: "bg-[#003D73]/5", badge: "bg-[#003D73]/10 text-[#003D73] border-[#003D73]/20", quote: "text-[#003D73]/30" },
]

export function TestimonialsSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,51,160,0.06) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute -right-32 bottom-1/3 h-64 w-64 rounded-full bg-slate-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#0066B3]/20 bg-[#0066B3]/[0.06] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#0066B3]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" />
            Testimonios
          </span>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-[#1e293b] lg:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mx-auto max-w-md text-sm text-slate-500">
            Empresas líderes del sector energético confían en nosotros desde 2011
          </p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => {
            const accent = ACCENT_COLORS[index % ACCENT_COLORS.length]
            return (
              <motion.div
                key={testimonial.id}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className={`group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200 transition-shadow duration-500 hover:shadow-xl hover:shadow-slate-200/80 border-l-4 ${accent.border} overflow-hidden`}
              >
                <div className={`absolute inset-0 ${accent.glow} opacity-0 transition-opacity group-hover:opacity-100`} />
                <div className="relative flex flex-1 flex-col p-7">
                  <div className="mb-4 flex items-start justify-between">
                    <IconQuote className={`h-9 w-9 ${accent.quote}`} />
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg key={i} className="h-3.5 w-3.5 fill-amber-400" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mb-6 flex-1 text-sm leading-[1.75] text-slate-600">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100"
                      crossOrigin="anonymous"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-bold text-[#1e293b]">
                        {testimonial.author}
                      </p>
                      <p className="truncate text-xs text-slate-400">{testimonial.position}</p>
                    </div>
                    <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold ${accent.badge}`}>
                      {testimonial.company}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}

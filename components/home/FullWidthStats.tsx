"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { scaleUp, staggerContainer, useCountUp, viewportOnce } from "@/hooks/useAnimations"
import { STATS_CONTENT } from "@/lib/data/mock/static-content.mock"

export function FullWidthStats() {
  const ref = useRef<HTMLElement>(null)

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden voltage-scan-wrap"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80')] bg-cover bg-center bg-fixed" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#07091E]/95 via-[#121A47]/90 to-[#07091E]/95 z-10" />
      <div
        className="absolute inset-0 opacity-100 z-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%2015h30M15%200v30%22%20stroke%3D%22%23ffffff%22%20stroke-opacity%3D%220.03%22%20stroke-width%3D%221%22%2F%3E%3C%2Fsvg%3E\")",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 z-20">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5"
        >
          {(STATS_CONTENT.stats as unknown as Stat[]).map((stat, index) => (
            <StatCounter key={index} stat={stat} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

type Stat = { value: number; label: string; suffix: string }

function StatCounter({ stat }: { stat: Stat }) {
  const { count, ref } = useCountUp(stat.value, 2000)
  return (
    <motion.div ref={ref} variants={scaleUp} className="group text-center">
      <div className="mb-2 flex items-baseline justify-center gap-0.5">
        <span className="neon-title text-4xl font-extrabold tracking-tight text-white lg:text-5xl power-on">
          {count}
        </span>
        <span className="text-xl font-bold text-red-400">{stat.suffix}</span>
      </div>
      <p className="whitespace-pre-line text-xs font-medium uppercase tracking-wider text-slate-400">
        {stat.label}
      </p>
      <div className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
    </motion.div>
  )
}

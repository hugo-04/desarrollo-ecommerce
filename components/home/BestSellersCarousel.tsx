"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { fadeUp, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { useBestSellers } from "@/features/productos/hooks"
import { BEST_SELLERS_CONTENT } from "@/lib/data/mock/static-content.mock"
import { ProductCard } from "@/components/product/ProductCard"
import { IconChevronLeft, IconChevronRight } from "@/components/icons"

export function BestSellersCarousel() {
  const { products: bestSellers, loading } = useBestSellers()
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4
  const maxIndex = Math.max(0, bestSellers.length - itemsPerView)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F0F5] via-[#F3F3F8] to-[#F0F0F5]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/[0.015] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-red-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">
              {BEST_SELLERS_CONTENT.badge}
            </span>
            <div className="h-px w-8 bg-red-500" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#121A47] lg:text-3xl">
            {BEST_SELLERS_CONTENT.title}
          </h2>
          <p className="mt-2 text-sm text-slate-500">{BEST_SELLERS_CONTENT.subtitle}</p>
        </motion.div>
        <motion.div variants={fadeUp} className="overflow-hidden py-2">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {bestSellers.map((product) => (
              <div key={product.id} className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/4">
                <ProductCard product={product} showBadge />
              </div>
            ))}
          </motion.div>
        </motion.div>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={prevSlide}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#121A47]/10 bg-white text-[#121A47] shadow-sm transition-all hover:border-[#121A47] hover:bg-[#121A47] hover:text-white hover:shadow-md"
          >
            <IconChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.max(1, bestSellers.length - itemsPerView + 1) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i ? "w-8 bg-red-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Ir a la diapositiva ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#121A47]/10 bg-white text-[#121A47] shadow-sm transition-all hover:border-[#121A47] hover:bg-[#121A47] hover:text-white hover:shadow-md"
          >
            <IconChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.section>
  )
}

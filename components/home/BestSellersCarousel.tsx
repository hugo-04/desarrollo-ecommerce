"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { fadeUp, staggerContainer, viewportOnce } from "@/hooks/useAnimations"
import { useBestSellers } from "@/features/productos/hooks"
import { BEST_SELLERS_CONTENT } from "@/lib/data/mock/static-content.mock"
import { ProductCard } from "@/components/product/ProductCard"
import { IconChevronLeft, IconChevronRight } from "@/components/icons"

export function BestSellersCarousel() {
  const { data: bestSellersData, isLoading: loading } = useBestSellers()
  const bestSellers = bestSellersData ?? []
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
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-slate-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(204,27,27,0.03)_0,transparent_50%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <motion.div variants={fadeUp} className="mb-8 text-center sm:mb-14">
          <div className="mb-3 flex items-center justify-center gap-3 sm:mb-4">
            <div className="h-px w-8 bg-red-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">
              {BEST_SELLERS_CONTENT.badge}
            </span>
            <div className="h-px w-8 bg-red-500" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-[#121A47] sm:text-2xl lg:text-3xl">
            {BEST_SELLERS_CONTENT.title}
          </h2>
          <p className="mt-2 text-xs text-slate-500 sm:text-sm">{BEST_SELLERS_CONTENT.subtitle}</p>
        </motion.div>
        <motion.div variants={fadeUp} className="overflow-hidden py-2">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {bestSellers.map((product, idx) => (
              <div key={product.id} className="w-1/2 shrink-0 px-1.5 sm:w-1/2 sm:px-2 lg:w-1/4">
                <ProductCard product={product} showBadge priority={idx < 4} />
              </div>
            ))}
          </motion.div>
        </motion.div>
        <div className="mt-8 flex items-center justify-center gap-4 sm:mt-14 sm:gap-6">
          <button
            onClick={prevSlide}
            aria-label="Anterior"
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-[#1C2870] hover:bg-[#1C2870] hover:text-white hover:shadow-xl sm:h-14 sm:w-14 sm:rounded-2xl"
          >
            <IconChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1 sm:h-6 sm:w-6" />
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
            aria-label="Siguiente"
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-300 hover:translate-x-1 hover:border-[#1C2870] hover:bg-[#1C2870] hover:text-white hover:shadow-xl sm:h-14 sm:w-14 sm:rounded-2xl"
          >
            <IconChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>
    </motion.section>
  )
}

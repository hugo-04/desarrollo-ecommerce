"use client"

// Re-exports all remaining home sections from a single file
// Each could be further split if needed (Open/Closed principle)

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  fadeUp, fadeLeft, fadeRight, scaleUp, blurIn, staggerContainer, cardHover, useCountUp, viewportOnce,
  useScrollParallax
} from "@/hooks/useAnimations"
import { products, categories, brands, clients, testimonials } from "@/lib/data"
import { ProductCard } from "@/components/product/ProductCard"
import {
  IconChevronLeft, IconChevronRight, IconArrowRight, IconShield, IconTruck,
  IconHeadphones, IconQuote, IconFire, IconClock, IconBox, IconBolt, IconTools,
  IconPhone, IconCertificate, IconLightning, IconZap, IconBuilding, IconFileText,
  IconDownload, IconWhatsApp, IconCheck,
} from "@/components/icons"
import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars'

// ========== BEST SELLERS CAROUSEL ==========
export function BestSellersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const bestSellers = products.filter((p) => p.bestSeller)
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
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">Destacados</span>
            <div className="h-px w-8 bg-red-500" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#121A47] lg:text-3xl">Productos Mas Vendidos</h2>
          <p className="mt-2 text-sm text-slate-500">Los favoritos de nuestros clientes del sector electrico</p>
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
          <button onClick={prevSlide} className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#121A47]/10 bg-white text-[#121A47] shadow-sm transition-all hover:border-[#121A47] hover:bg-[#121A47] hover:text-white hover:shadow-md">
            <IconChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.max(1, bestSellers.length - itemsPerView + 1) }).map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentIndex(i)} 
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === i ? "w-8 bg-red-600" : "w-2 bg-slate-300 hover:bg-slate-400"}`} 
                aria-label={`Ir a la diapositiva ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#121A47]/10 bg-white text-[#121A47] shadow-sm transition-all hover:border-[#121A47] hover:bg-[#121A47] hover:text-white hover:shadow-md">
            <IconChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.section>
  )
}

// ========== CATEGORY CARD (used by CategoriesGrid) ==========
function CategoryCard({ category, index, isLarge }: {
  category: typeof categories[0]; index: number; isLarge: boolean
}) {
  const Icon = category.icon
  return (
    <motion.div variants={scaleUp} whileHover={cardHover} className="h-full w-full">
      <Link href={`/catalogo?categoria=${encodeURIComponent(category.name)}`}
        className="group relative block h-full w-full overflow-hidden rounded-2xl text-left transition-shadow duration-500 hover:shadow-2xl">
        <div className="relative h-[340px] w-full overflow-hidden">
          <img src={category.image} alt={category.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" crossOrigin="anonymous" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121A47] via-[#121A47]/50 to-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-30 mix-blend-multiply transition-opacity group-hover:opacity-50`} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]" />
          <div className="absolute inset-0 flex flex-col justify-end p-7">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 transition-all group-hover:bg-white/20 group-hover:shadow-lg">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="rounded-full bg-red-500/90 px-3 py-1 text-[10px] font-bold text-white shadow-lg">{category.count} productos</div>
            </div>
            <h3 className="mb-1 text-xl font-extrabold text-white">{category.name}</h3>
            <p className="mb-3 text-xs text-white/60">{category.subcategories.slice(0, 3).join(" · ")}</p>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 transition-all group-hover:gap-3">
              <span>Ver productos</span>
              <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ========== CATEGORIES GRID ==========
export function CategoriesGrid() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F0F5] via-[#E7E7EF] to-[#F0F0F5]" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 51 160 / 0.04) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div variants={fadeUp} className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-red-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">Lineas de Producto</span>
            <div className="h-px w-8 bg-red-500" />
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#121A47] lg:text-4xl">Nuestras Categorias</h2>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-slate-500">Suministro de aisladores, herrajes, conectores, cables, transformadores y ferreteria para lineas de alta y media tension</p>
        </motion.div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.slice(0, 6).map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} isLarge={false} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

// ========== MARQUEE BRANDS ==========
export function MarqueeBrands() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1035] via-[#121A47] to-[#0B1035]" />

      {/* Animated Stars Background */}
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
            <span className="h-1.5 w-1.5 rounded-full shadow-[0_0_8px_#ef4444] bg-red-500" />Distribuidores Autorizados
          </span>
          <h3 className="mb-1.5 text-2xl font-extrabold tracking-tight text-white neon-title">Marcas de Clase Mundial</h3>
          <p className="text-xs text-slate-400">Comercializamos marcas líderes con certificaciones internacionales IEC y ANSI</p>
        </motion.div>
        
        <motion.div variants={blurIn} className="marquee-container mb-6">
          <div className="marquee-content">
            {[...brands, ...brands].map((brand, index) => (
              <div key={`brand-1-${index}`} className="group mx-3 flex h-[80px] min-w-[220px] items-center gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-6 backdrop-blur-md transition-all duration-300 hover:border-amber-400/20 hover:bg-white/[0.06] hover:shadow-[0_0_20px_-4px_rgba(245,158,11,0.25)]">
                <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-white/[0.08] transition-colors group-hover:bg-white/[0.1]">
                  <img src={brand.logo} alt={brand.name} className="max-h-[22px] max-w-[22px] object-contain brightness-0 invert opacity-60 transition-all group-hover:opacity-100" crossOrigin="anonymous" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </div>
                <span className="text-[15px] font-extrabold tracking-wide text-white/80 transition-colors group-hover:text-white">{brand.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div variants={blurIn} className="marquee-container-reverse">
          <div className="marquee-content-reverse">
            {[...brands].reverse().concat([...brands].reverse()).map((brand, index) => (
              <div key={`brand-2-${index}`} className="group mx-3 flex h-[80px] min-w-[220px] items-center gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_20px_-4px_rgba(59,130,246,0.20)]">
                <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-white/[0.08] transition-colors group-hover:bg-white/[0.1]">
                  <img src={brand.logo} alt={brand.name} className="max-h-[22px] max-w-[22px] object-contain brightness-0 invert opacity-60 transition-all group-hover:opacity-100" crossOrigin="anonymous" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </div>
                <span className="text-[15px] font-extrabold tracking-wide text-white/80 transition-colors group-hover:text-white">{brand.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

// ========== BENEFITS SECTION ==========
export function BenefitsSection() {
  const benefits = [
    { icon: IconShield, title: "Certificaciones IEC & ANSI", description: "Todos nuestros productos cumplen normas internacionales IEC, ANSI y NTP para alta y media tension." },
    { icon: IconTruck, title: "Stock Permanente Nacional", description: "Almacen con mas de 1,000 items en stock para despacho inmediato a cualquier region del pais." },
    { icon: IconHeadphones, title: "Ingenieria Especializada", description: "Equipo de ingenieros electricos dedicados a la seleccion y especificacion de materiales AT/MT." },
  ]
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#07091E] via-[#121A47] to-[#0B1035]" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      <div className="absolute -left-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/6 blur-3xl" />
      <div className="absolute -right-40 top-1/3 h-64 w-64 rounded-full bg-red-500/6 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-16 lg:grid-cols-12">

          {/* LEFT — Statement de empresa */}
          <motion.div variants={fadeLeft} className="lg:col-span-5">
            <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-red-400">Por que elegirnos</span>
            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-7xl font-extrabold leading-none tracking-tight text-white lg:text-8xl">20</span>
                <span className="text-4xl font-bold text-red-500">+</span>
              </div>
              <p className="mt-1 text-base font-semibold uppercase tracking-widest text-slate-400">Años de experiencia</p>
            </div>
            <p className="mb-8 text-[0.95rem] leading-[1.8] text-slate-400">
              Somos el socio estrategico de las principales empresas electricas, mineras y de construccion del pais. Cada proyecto cuenta con el respaldo de nuestro equipo tecnico especializado.
            </p>
            <div className="mb-8 flex gap-8">
              <div>
                <p className="text-3xl font-extrabold text-white">350<span className="text-red-500">+</span></p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-slate-500">Proyectos ejecutados</p>
              </div>
              <div className="w-px bg-white/[0.08]" />
              <div>
                <p className="text-3xl font-extrabold text-white">98<span className="text-red-500">%</span></p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-slate-500">Clientes satisfechos</p>
              </div>
            </div>
            <Link
              href="/nosotros"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              Conocer la empresa
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* RIGHT — Benefits list (rows, not cards) */}
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
            className="lg:col-span-7 space-y-0"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeRight}
                className="group flex items-start gap-6 border-b border-white/[0.06] py-7 last:border-0 transition-all duration-300 hover:border-white/[0.12]"
              >
                <motion.div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 text-red-400 transition-all duration-500 group-hover:from-amber-400/20 group-hover:to-amber-600/10 group-hover:text-amber-300 group-hover:[box-shadow:0_0_0_6px_rgba(245,158,11,0.10),0_0_20px_4px_rgba(245,158,11,0.08)]"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <benefit.icon className="h-6 w-6" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="mb-1.5 text-lg font-bold text-white">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{benefit.description}</p>
                </div>
                <IconArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-white/10 transition-all group-hover:translate-x-1 group-hover:text-red-400/60" />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </motion.section>
  )
}

// ========== TESTIMONIALS SECTION ==========
export function TestimonialsSection() {
  const accentColors = [
    { border: "border-l-red-500", glow: "bg-red-500/5", badge: "bg-red-500/10 text-red-400 border-red-500/20", quote: "text-red-400/50" },
    { border: "border-l-blue-500", glow: "bg-blue-500/5", badge: "bg-blue-500/10 text-blue-400 border-blue-500/20", quote: "text-blue-400/50" },
    { border: "border-l-amber-500", glow: "bg-amber-500/5", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20", quote: "text-amber-400/50" },
  ]
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5FA] via-[#f0f2f8] to-[#F5F5FA]" />
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,51,160,0.06) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute -right-32 bottom-1/3 h-64 w-64 rounded-full bg-red-500/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-red-600">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />Testimonios
          </span>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-[#121A47] lg:text-4xl">Lo que dicen nuestros clientes</h2>
          <p className="mx-auto max-w-md text-sm text-slate-500">Empresas líderes del sector energético confían en nosotros desde hace 14 años</p>
        </motion.div>
        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }} className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const accent = accentColors[index % accentColors.length]
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
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} className="h-3.5 w-3.5 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                  </div>
                  <p className="mb-6 flex-1 text-sm leading-[1.75] text-slate-600">{testimonial.text}</p>
                  <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
                    <img src={testimonial.avatar} alt={testimonial.author} className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100" crossOrigin="anonymous" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-bold text-[#121A47]">{testimonial.author}</p>
                      <p className="truncate text-xs text-slate-400">{testimonial.position}</p>
                    </div>
                    <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold ${accent.badge}`}>{testimonial.company}</span>
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

export function PromoBanner() {
  const ref = useRef<HTMLElement>(null)

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden bg-[#080A1C]" // Match exact dark navy background
    >
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#E11D48]/30 to-transparent" /> {/* Subtle red horizon line */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#1E3A8A]/10 to-transparent rounded-full blur-[100px] opacity-50 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-[#E11D48]/5 to-transparent rounded-full blur-[100px] opacity-50 -translate-x-1/2 translate-y-1/2" />

      <div className="relative mx-auto max-w-7xl px-4 py-28 z-20">
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <motion.div variants={fadeLeft} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E11D48]/20 bg-[#E11D48]/[0.03] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E11D48]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
              Cotizaciones para tu proyecto
            </motion.div>
            <motion.h2 variants={fadeLeft} className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white lg:text-[2.8rem]">
              Materiales AT/MT con<br />
              <span className="bg-gradient-to-r from-[#FF6B6B] to-[#F97316] bg-clip-text text-transparent">
                entrega garantizada
              </span>
            </motion.h2>
            <motion.p variants={fadeLeft} className="mb-10 max-w-xl text-[0.95rem] leading-[1.8] text-slate-400">
              Solicita tu cotizacion personalizada y recibe respuesta en 24 horas.<br/> Suministro completo para proyectos de electrificacion, lineas de<br/> transmision y subestaciones.
            </motion.p>
            <motion.div variants={fadeLeft} className="flex flex-wrap items-center gap-4">
              <Link href="/contacto" className="group flex items-center gap-3 rounded-lg bg-[#E60000] px-7 py-3 text-sm font-bold text-white transition-all hover:bg-[#CC0000]">
                Solicitar Cotizacion
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/catalogo" className="flex items-center gap-2 rounded-lg border border-[#1E2848] bg-[#101530] px-7 py-3 text-sm font-semibold text-slate-300 transition-colors hover:bg-[#131B38] hover:text-white">
                Ver Catalogo
              </Link>
            </motion.div>
          </div>
          
          <motion.div variants={fadeRight} className="flex flex-col gap-4">
            {[
              { icon: IconClock, title: "Cotizaciones Express", desc: "Respuesta en menos de 24 horas habiles", text: "text-[#E60000]", iconBg: "bg-[#E60000]/10 border-[#E60000]/20" },
              { icon: IconBox, title: "Stock Permanente", desc: "Mas de 1,162 items listos para despacho", text: "text-[#3B82F6]", iconBg: "bg-[#3B82F6]/10 border-[#3B82F6]/20" },
              { icon: IconHeadphones, title: "Asesoria Tecnica", desc: "Ingenieros especializados en AT/MT", text: "text-[#10B981]", iconBg: "bg-[#10B981]/10 border-[#10B981]/20" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeRight} className="group flex items-center gap-5 rounded-xl border border-[#181E40] bg-[#0D1230] p-5 transition-colors hover:border-[#2a3a5f] hover:bg-[#101530]">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border ${item.iconBg}`}>
                  <item.icon className={`h-5 w-5 ${item.text}`} />
                </div>
                <div>
                  <h4 className="mb-1 text-[13px] font-bold text-white">{item.title}</h4>
                  <p className="text-[12px] text-slate-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

// ========== FEATURED OFFERS ==========
export function FeaturedOffers() {
  const offers = [
    { title: "Aisladores y Herrajes AT/MT", subtitle: "Porcelana, Polimericos y Vidrio", description: "Linea completa de aisladores, grapas, preformados y amortiguadores para lineas de alta y media tension.", gradient: "from-blue-700 to-blue-900", icon: IconShield },
    { title: "Conectores y Cables AT/MT", subtitle: "XLPE, AAAC, EPR hasta 36kV", description: "Conectores a compresion, terminales termocontractiles y cables para redes aereas y subterraneas.", gradient: "from-red-700 to-red-900", icon: IconBolt },
    { title: "Ferreteria Electrica", subtitle: "Crucetas, Pernos, Estructuras", description: "Ferreteria galvanizada en caliente para montaje de estructuras y postes de lineas de potencia.", gradient: "from-zinc-600 to-zinc-800", icon: IconTools },
  ]
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
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-red-600">Lineas de Producto</span>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-slate-900 lg:text-3xl">Nuestras Especialidades</h2>
          <p className="mx-auto max-w-xl text-sm text-slate-500">Soluciones electricas industriales para los sectores mas exigentes</p>
        </motion.div>
        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }} className="grid gap-6 md:grid-cols-3">
          {offers.map((offer, index) => {
            const Icon = offer.icon
            return (
              <motion.div key={index} variants={scaleUp} whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}>
                <Link href="/catalogo" className="group relative block overflow-hidden rounded-2xl p-7 text-left transition-all duration-500 hover:shadow-2xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${offer.gradient}`} />
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-[2]" />
                  <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-white/5" />
                  <div className="relative">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/20">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">{offer.subtitle}</p>
                    <h3 className="mb-2 text-xl font-extrabold text-white">{offer.title}</h3>
                    <p className="mb-5 text-sm leading-relaxed text-white/70">{offer.description}</p>
                    <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition-all group-hover:bg-white/20 group-hover:gap-3">
                      Explorar productos<IconArrowRight className="h-3 w-3" />
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

// ========== SECTORES SECTION ==========
export function SectoresSection() {
  const sectores = [
    { icon: IconLightning, title: "Distribucion Electrica", desc: "Lineas de media tension, subestaciones y redes de distribucion primaria y secundaria.", stat: "22.9 / 10kV" },
    { icon: IconZap, title: "Transmision AT", desc: "Lineas de alta tension, torres de transmision y equipamiento para subestaciones de potencia.", stat: "60 - 220kV" },
    { icon: IconBuilding, title: "Electrificacion Rural", desc: "Proyectos de electrificacion para comunidades rurales con sistemas monopostes y bipostes.", stat: "1,200+ km" },
    { icon: IconFire, title: "Sector Minero", desc: "Suministro de materiales para sistemas electricos en operaciones mineras a cielo abierto y subterraneas.", stat: "24/7" },
  ]
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F0F6] via-white to-[#e8edf5]" />
      <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(0,51,160,0.03) 80px, rgba(0,51,160,0.03) 81px), repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(0,51,160,0.03) 80px, rgba(0,51,160,0.03) 81px)' }} />
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div variants={fadeUp} className="mb-16 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-red-500" /><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">Sectores</span><div className="h-px w-8 bg-red-500" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#121A47] lg:text-4xl">Sectores que Atendemos</h2>
          <p className="mt-3 mx-auto max-w-xl text-sm leading-relaxed text-slate-500">Experiencia comprobada suministrando materiales para los proyectos mas exigentes del sector electrico</p>
        </motion.div>
        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sectores.map((sector, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-red-500 to-primary opacity-0 transition-opacity group-hover:opacity-100" />
              <motion.div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25"
                whileHover={{ rotate: 10 }}
              >
                <sector.icon className="h-6 w-6" />
              </motion.div>
              <h3 className="mb-2 text-lg font-bold text-[#121A47]">{sector.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-slate-500">{sector.desc}</p>
              <div className="flex items-center gap-2 border-t border-slate-100 pt-4"><span className="text-2xl font-extrabold text-primary">{sector.stat}</span></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

// ========== FULL WIDTH STATS ==========
export function FullWidthStats() {
  const ref = useRef<HTMLElement>(null)

  const stats = [
    { value: 20, label: "Años de\nExperiencia", suffix: "+" },
    { value: 1162, label: "Productos\nen Stock", suffix: "+" },
    { value: 350, label: "Proyectos\nEjecutados", suffix: "+" },
    { value: 98, label: "Clientes\nSatisfechos", suffix: "%" },
    { value: 12, label: "Marcas\nLideres", suffix: "+" },
  ]
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden voltage-scan-wrap"
    >
      {/* CSS-only parallax effect (fixed background) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80')] bg-cover bg-center bg-fixed" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#07091E]/95 via-[#121A47]/90 to-[#07091E]/95 z-10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%2015h30M15%200v30%22%20stroke%3D%22%23ffffff%22%20stroke-opacity%3D%220.03%22%20stroke-width%3D%221%22%2F%3E%3C%2Fsvg%3E')] opacity-100 z-10" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 z-20">
        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }} className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, index) => {
            const { count, ref } = useCountUp(stat.value, 2000)
            return (
              <motion.div key={index} ref={ref} variants={scaleUp} className="group text-center">
                <div className="mb-2 flex items-baseline justify-center gap-0.5">
                  <span className="neon-title text-4xl font-extrabold tracking-tight text-white lg:text-5xl power-on">{count}</span>
                  <span className="text-xl font-bold text-red-400">{stat.suffix}</span>
                </div>
                <p className="whitespace-pre-line text-xs font-medium uppercase tracking-wider text-slate-400">{stat.label}</p>
                <div className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}

// ========== COMPANY SHOWCASE ==========
export function CompanyShowcase() {
  const ref = useRef<HTMLElement>(null)

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div variants={fadeLeft} className="order-2 lg:order-1">
            <div className="mb-4 flex items-center gap-3"><div className="h-px w-8 bg-red-500" /><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">Nuestra Empresa</span></div>
            <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-[#121A47] lg:text-4xl">Suministro e Ingenieria<br /><span className="text-primary">Especializada en AT/MT</span></h2>
            <p className="mb-6 text-sm leading-relaxed text-slate-600">Electro Thina es una empresa distribuidora de ferreteria y accesorios electricos para lineas de alta y media tension. Contamos con un amplio stock de aisladores, herrajes, conectores, cables y materiales de ferreteria electrica con certificaciones internacionales.</p>
            <div className="mb-8 grid grid-cols-2 gap-4">
              {[
                { icon: IconShield, title: "Certificaciones", desc: "IEC, ANSI, NTP, ISO 9001", color: "bg-primary/10 text-primary" },
                { icon: IconTruck, title: "Cobertura", desc: "Despachos a nivel nacional", color: "bg-red-500/10 text-red-600" },
                { icon: IconHeadphones, title: "Soporte Tecnico", desc: "Ingenieros especializados", color: "bg-emerald-500/10 text-emerald-600" },
                { icon: IconClock, title: "Cotizaciones", desc: "Respuesta en 24 horas", color: "bg-blue-500/10 text-blue-600" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} whileHover={{ scale: 1.04 }} className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
                  <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg ${item.color}`}><item.icon className="h-5 w-5" /></div>
                  <h4 className="mb-1 text-sm font-bold text-[#121A47]">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-4">
              <Link href="/nosotros" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl">Conocer Mas<IconArrowRight className="h-4 w-4" /></Link>
              <Link href="/contacto" className="inline-flex items-center gap-2 rounded-xl border-2 border-[#121A47] px-6 py-3 text-sm font-bold text-[#121A47] transition-all hover:bg-[#121A47] hover:text-white"><IconPhone className="h-4 w-4" />Contactanos</Link>
            </div>
          </motion.div>
          <motion.div variants={fadeRight} className="order-1 lg:order-2">
            <div className="relative">
              <div
                className="overflow-hidden rounded-3xl shadow-2xl"
              >
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80" 
                  alt="Torres de alta tension" 
                  className="h-[420px] w-full object-cover origin-center" 
                  crossOrigin="anonymous" 
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                className="absolute -bottom-6 -left-6 rounded-2xl border border-white/20 bg-[#121A47] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.3)] backdrop-blur-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20"><IconCertificate className="h-6 w-6 text-red-400" /></div>
                  <div><p className="text-2xl font-extrabold text-white">ISO 9001</p><p className="text-xs text-slate-400">Gestion de Calidad</p></div>
                </div>
              </motion.div>
              
              <div 
                className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl border-2 border-primary/20 -rotate-12" 
              />
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-2xl border-2 border-red-500/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

// ========== SERVICIOS SECTION ==========
export function ServiciosSection() {
  const servicios = [
    { icon: IconFileText, title: "Cotizaciones Especializadas", desc: "Elaboramos presupuestos detallados con especificaciones tecnicas para licitaciones y proyectos." },
    { icon: IconBox, title: "Gestion de Proyectos", desc: "Suministro integral de materiales con despachos programados segun cronograma de obra." },
    { icon: IconDownload, title: "Fichas Tecnicas", desc: "Acceso a documentacion tecnica, fichas de producto y certificados de calidad de cada item." },
    { icon: IconTools, title: "Soporte Post-Venta", desc: "Asistencia tecnica y seguimiento de garantias con respaldo de nuestros fabricantes." },
  ]
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5FA] via-[#EEEEF5] to-[#F5F5FA]" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 51 160 / 0.06) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div variants={fadeUp} className="mb-16 text-center">
          <div className="mb-3 flex items-center justify-center gap-3"><div className="h-px w-8 bg-red-500" /><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">Servicios</span><div className="h-px w-8 bg-red-500" /></div>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-[#121A47] lg:text-4xl">Nuestros Servicios</h2>
          <p className="mx-auto max-w-xl text-sm text-slate-500">Acompanamos cada etapa de su proyecto con soluciones integrales</p>
        </motion.div>
        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((servicio, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl bg-white p-7 shadow-sm shadow-black/[0.04] ring-1 ring-slate-200/80 transition-all duration-500 hover:shadow-xl hover:ring-primary/30"
            >
              <motion.div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#121A47] to-primary text-white shadow-lg shadow-primary/20"
                whileHover={{ scale: 1.15, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <servicio.icon className="h-5 w-5" />
              </motion.div>
              <h3 className="mb-2 text-base font-bold text-[#121A47]">{servicio.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{servicio.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

// ========== PROCESO SECTION ==========
export function ProcesoSection() {
  const pasos = [
    {
      num: "01",
      icon: IconPhone,
      title: "Consulta tu proyecto",
      desc: "Contáctanos con los requerimientos técnicos de tu proyecto AT/MT. Nuestros ingenieros te orientan desde el primer contacto.",
      color: "from-primary/20 to-primary/5",
      text: "text-primary",
      border: "border-primary/20",
    },
    {
      num: "02",
      icon: IconFileText,
      title: "Recibe tu cotización",
      desc: "Elaboramos una cotización detallada con ficha técnica, especificaciones IEC/ANSI y disponibilidad de stock en menos de 24 horas.",
      color: "from-red-500/20 to-red-500/5",
      text: "text-red-500",
      border: "border-red-500/20",
    },
    {
      num: "03",
      icon: IconTruck,
      title: "Despacho a todo el país",
      desc: "Coordinamos el despacho desde nuestro almacén a cualquier región del país, con seguimiento en tiempo real.",
      color: "from-emerald-500/20 to-emerald-500/5",
      text: "text-emerald-600",
      border: "border-emerald-500/20",
    },
  ]
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F5F5FA] to-white" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,51,160,0.05) 1px, transparent 0)', backgroundSize: '36px 36px' }} />
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-red-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">Cómo funciona</span>
            <div className="h-px w-8 bg-red-500" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#121A47] lg:text-4xl">Proceso de Compra</h2>
          <p className="mt-3 mx-auto max-w-lg text-sm text-slate-500">Simple, rápido y respaldado por ingenieros especializados en AT/MT</p>
        </motion.div>
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="relative grid gap-6 md:grid-cols-3"
        >
          <div className="absolute left-[16.66%] right-[16.66%] top-[2.2rem] hidden h-px md:block"
            style={{ background: 'repeating-linear-gradient(90deg, #CBD5E1 0, #CBD5E1 6px, transparent 6px, transparent 14px)' }}
          />
          {pasos.map((paso, i) => (
            <motion.div key={i} variants={scaleUp} className="relative flex flex-col items-center text-center">
              <div className={`relative mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-2 bg-white shadow-lg ${paso.border}`}>
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${paso.color} opacity-60`} />
                <paso.icon className={`relative z-10 h-6 w-6 ${paso.text}`} />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#121A47] text-[9px] font-extrabold text-white">{i + 1}</span>
              </div>
              <span className={`mb-2 text-[11px] font-extrabold tracking-[0.2em] ${paso.text}`}>{paso.num}</span>
              <h3 className="mb-2 text-base font-bold text-[#121A47]">{paso.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{paso.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={fadeUp} className="mt-12 flex justify-center">
          <Link href="/contacto" className="group inline-flex items-center gap-3 rounded-xl bg-[#121A47] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#121A47]/20 transition-all hover:bg-primary hover:shadow-primary/25">
            Iniciar mi consulta
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}

// ========== CERTIFICACIONES STRIP ==========
export function CertificacionesStrip() {
  const certs = [
    { code: "IEC 60305", desc: "Aisladores para lineas aereas", color: "text-blue-700", bg: "bg-blue-50 border-blue-100" },
    { code: "ANSI C29.2", desc: "Aisladores de suspension AT", color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-100" },
    { code: "ISO 9001", desc: "Sistema de Gestion de Calidad", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-100" },
    { code: "NTP 370.043", desc: "Norma Tecnica Peruana AT/MT", color: "text-amber-700", bg: "bg-amber-50 border-amber-100" },
    { code: "IEEE STD", desc: "Estandar internacional AT", color: "text-red-700", bg: "bg-red-50 border-red-100" },
  ]
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className="relative border-y border-slate-200/80 bg-white py-8"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center justify-center gap-3">
          <IconShield className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Certificaciones y Normas que cumplimos</span>
          <IconShield className="h-3.5 w-3.5 text-slate-400" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {certs.map((cert, i) => (
            <div key={i} className={`flex items-center gap-2.5 rounded-lg border px-4 py-2.5 ${cert.bg}`}>
              <IconCertificate className={`h-4 w-4 shrink-0 ${cert.color}`} />
              <div>
                <p className={`text-[12px] font-extrabold tracking-wide ${cert.color}`}>{cert.code}</p>
                <p className="text-[10px] text-slate-500">{cert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// ========== TRUST BAR (compact client logos band) ==========
export function TrustBar() {
  const trustLogos = [
    "Luz del Sur", "Enel Distribución", "Electro Sur Este", "Hidrandina",
    "Electronoroeste", "Minera Antamina", "Anglo American",
  ]
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className="relative border-b border-slate-200/80 bg-gradient-to-r from-slate-50 via-white to-slate-50 py-5"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 sm:text-[10px]">
            Confían en nosotros
          </p>
          <div className="h-px w-full bg-slate-200 sm:hidden" />
          <div className="h-8 w-px bg-slate-200 hidden sm:block shrink-0" />
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-start">
            {trustLogos.map((name, i) => (
              <span key={i} className="text-xs font-semibold text-slate-400 transition-colors hover:text-slate-600">
                {name}
              </span>
            ))}
          </div>
          <div className="shrink-0 ml-auto hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-600">120+ empresas</span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// ========== FABRICACION SECTION ==========
export function FabricacionSection() {
  const lineas = [
    "Conectores y herrajes para AT/MT",
    "Aisladores de porcelana y polímero",
    "Accesorios para cable de energía",
    "Protecciones y seccionadores",
    "Ferretería para líneas aéreas",
  ]
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/80 to-white" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,51,160,0.07) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Left col — 7/12 */}
          <motion.div variants={fadeLeft} className="lg:col-span-7">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-red-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">Fabricación Propia</span>
            </div>
            <h2 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#121A47] lg:text-4xl">
              No solo distribuimos.<br />
              <span className="bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                También fabricamos.
              </span>
            </h2>
            <p className="mb-6 max-w-lg text-sm leading-[1.85] text-slate-600">
              Somos fabricantes de nuestra propia línea de accesorios eléctricos bajo estrictos controles de calidad IEC. Esto nos permite ofrecer trazabilidad completa, personalización técnica y garantías directas — lo que ningún revendedor puede dar.
            </p>
            <ul className="mb-8 space-y-2.5">
              {lineas.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <IconCheck className="h-3 w-3 text-primary" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/catalogo" className="group inline-flex items-center gap-2.5 rounded-xl bg-[#121A47] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#121A47]/20 transition-all hover:bg-primary hover:shadow-primary/25">
                Ver productos propios
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-amber-50 px-4 py-2">
                <IconCertificate className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-bold text-amber-700">Marca Propia ET</span>
              </div>
            </div>
          </motion.div>

          {/* Right col — 5/12 */}
          <motion.div variants={fadeRight} className="lg:col-span-5">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl shadow-slate-200">
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6 }}
                  src="https://images.unsplash.com/photo-1581093196867-ca9b9e02e42e?w=800&q=80"
                  alt="Planta de fabricacion Electro Thina"
                  className="h-[420px] w-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              {/* Badge flotante */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
                className="absolute -bottom-5 -right-5 rounded-2xl border border-emerald-200 bg-white p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                    <IconShield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-800">Fabricante</p>
                    <p className="text-[10px] font-semibold text-emerald-600">Certificado IEC</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

// ========== CTA BAND ==========
export function CtaBand() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden arc-flash-wrap"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#07091E] via-[#121A47] to-[#07091E]" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
      <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-red-600/6 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
          <motion.div variants={fadeLeft} className="max-w-xl text-center lg:text-left">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em] text-red-400">¿Listo para cotizar?</p>
            <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white lg:text-4xl">
              ¿Tienes un proyecto<br />
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">AT/MT en mente?</span>
            </h2>
            <p className="text-[0.95rem] leading-relaxed text-slate-400">Recibe una cotización técnica personalizada en menos de 24 horas. Sin compromisos.</p>
          </motion.div>
          <motion.div variants={fadeRight} className="flex flex-col items-center gap-4 lg:items-end">
            <div className="flex flex-wrap justify-center gap-3 lg:justify-end">
              <Link href="/contacto" className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-600/25 transition-all hover:scale-[1.03] hover:shadow-red-600/40">
                Solicitar Cotización
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/catalogo" className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.05] px-8 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.1] hover:text-white">
                Ver Catálogo
              </Link>
            </div>
            <a href="https://wa.me/51981375196?text=Hola%2C%20quisiera%20cotizar%20materiales%20AT%2FMT" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-slate-400 transition-colors hover:text-green-400">
              <IconWhatsApp className="h-3.5 w-3.5" />
              O escríbenos por WhatsApp: +51 981 375 196
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

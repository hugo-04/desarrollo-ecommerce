"use client"

import {
  HeroSection, BestSellersCarousel, CategoriesGrid, MarqueeBrands, BenefitsSection,
  TestimonialsSection, FeaturedOffers, SectoresSection, FullWidthStats,
  CompanyShowcase, ServiciosSection,
} from "@/components/home"

export function HomeView() {
  return (
    <>
      {/* DARK — Hero principal */}
      <HeroSection />

      {/* LIGHT — Productos: lo que vendemos */}
      <CategoriesGrid />
      <BestSellersCarousel />

      {/* DARK — Marcas */}
      <MarqueeBrands />

      {/* LIGHT — A quién servimos (respiro visual entre los dos oscuros) */}
      <SectoresSection />

      {/* DARK — Números de credibilidad */}
      <FullWidthStats />

      {/* LIGHT — Especialidades y empresa */}
      <FeaturedOffers />
      <CompanyShowcase />

      {/* DARK — Por qué elegirnos */}
      <BenefitsSection />

      {/* LIGHT — Servicios y cierre con prueba social */}
      <ServiciosSection />
      <TestimonialsSection />
    </>
  )
}

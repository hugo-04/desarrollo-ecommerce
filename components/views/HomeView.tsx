"use client"

import {
  HeroSection, BestSellersCarousel, CategoriesGrid, MarqueeBrands, BenefitsSection,
  TestimonialsSection, FeaturedOffers, SectoresSection, FullWidthStats,
  CompanyShowcase, ServiciosSection, ProcesoSection, CertificacionesStrip, CtaBand,
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

      {/* LIGHT — Cómo funciona el proceso */}
      <ProcesoSection />

      {/* LIGHT — A quién servimos */}
      <SectoresSection />

      {/* DARK — Números de credibilidad */}
      <FullWidthStats />

      {/* LIGHT — Especialidades */}
      <FeaturedOffers />

      {/* LIGHT — Strip de certificaciones (banda compacta) */}
      <CertificacionesStrip />

      {/* LIGHT — Empresa */}
      <CompanyShowcase />

      {/* DARK — Por qué elegirnos (2-col narrativo) */}
      <BenefitsSection />

      {/* LIGHT — Servicios y prueba social */}
      <ServiciosSection />
      <TestimonialsSection />

      {/* DARK — CTA final de conversión */}
      <CtaBand />
    </>
  )
}

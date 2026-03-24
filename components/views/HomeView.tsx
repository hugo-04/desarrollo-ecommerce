"use client"

import {
  HeroSection, BestSellersCarousel, CategoriesGrid, MarqueeBrands, BenefitsSection,
  TestimonialsSection, FeaturedOffers, SectoresSection, FullWidthStats,
  CompanyShowcase, ServiciosSection, ProcesoSection, CertificacionesStrip, CtaBand,
  TrustBar, FabricacionSection,
} from "@/components/home"
import type { CategoryDTO } from "@/features/categorias/types"

interface HomeViewProps {
  /** Categorías cargadas server-side en page.tsx para evitar llamada al mock */
  categories: CategoryDTO[]
}

export function HomeView({ categories }: HomeViewProps) {
  return (
    <>
      {/* DARK — Hero principal */}
      <HeroSection />

      {/* LIGHT — Prueba social compacta (trust bar) */}
      <TrustBar />

      {/* LIGHT — Productos: lo que vendemos */}
      <CategoriesGrid categories={categories} />
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

      {/* LIGHT — Fabricación propia (diferenciador clave) */}
      <FabricacionSection />

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

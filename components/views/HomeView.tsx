"use client"

import {
  HeroSection, BestSellersCarousel, CategoriesGrid, MarqueeBrands, BenefitsSection,
  TestimonialsSection, FeaturedOffers, SectoresSection, FullWidthStats,
  CompanyShowcase, ServiciosSection, ProcesoSection, CertificacionesStrip, CtaBand,
  TrustBar, FabricacionSection,
} from "@/components/home"
import { GrupoEmpresarialBand } from "@/components/sections/GrupoEmpresarial"
import type { CategoryDTO } from "@/features/categorias/types"
import type { Brand } from "@/lib/types"

interface HomeViewProps {
  categories: CategoryDTO[]
  brands: Brand[]
}

export function HomeView({ categories, brands }: HomeViewProps) {
  return (
    <>
      {/* DARK — Hero principal */}
      <HeroSection />

      {/* NAVY — Grupo empresarial (identidad temprana, antes de productos) */}
      <GrupoEmpresarialBand />

      {/* LIGHT — Productos: lo que vendemos */}
      <CategoriesGrid categories={categories} />
      <BestSellersCarousel />

      {/* DARK — Marcas */}
      <MarqueeBrands brands={brands} />

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

"use client"

import dynamic from "next/dynamic"

// Sobre el fold — importación estática (JS crítico)
import { HeroSection } from "@/components/home/HeroSection"
import { CategoriesGrid } from "@/components/home/CategoriesGrid"
import { GrupoEmpresarialBand } from "@/components/sections/GrupoEmpresarial"

// Bajo el fold — importación dinámica (JS diferido, HTML igual vía SSR)
const BestSellersCarousel = dynamic(() => import("@/components/home/BestSellersCarousel").then(m => ({ default: m.BestSellersCarousel })))
const MarqueeBrands       = dynamic(() => import("@/components/home/MarqueeBrands").then(m => ({ default: m.MarqueeBrands })))
const ProcesoSection      = dynamic(() => import("@/components/home/ProcesoSection").then(m => ({ default: m.ProcesoSection })))
const SectoresSection     = dynamic(() => import("@/components/home/SectoresSection").then(m => ({ default: m.SectoresSection })))
const FullWidthStats      = dynamic(() => import("@/components/home/FullWidthStats").then(m => ({ default: m.FullWidthStats })))
const FeaturedOffers      = dynamic(() => import("@/components/home/FeaturedOffers").then(m => ({ default: m.FeaturedOffers })))
const CertificacionesStrip = dynamic(() => import("@/components/home/CertificacionesStrip").then(m => ({ default: m.CertificacionesStrip })))
const CompanyShowcase     = dynamic(() => import("@/components/home/CompanyShowcase").then(m => ({ default: m.CompanyShowcase })))
const FabricacionSection  = dynamic(() => import("@/components/home/FabricacionSection").then(m => ({ default: m.FabricacionSection })))
const BenefitsSection     = dynamic(() => import("@/components/home/BenefitsSection").then(m => ({ default: m.BenefitsSection })))
const ServiciosSection    = dynamic(() => import("@/components/home/ServiciosSection").then(m => ({ default: m.ServiciosSection })))
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })))
const CtaBand             = dynamic(() => import("@/components/home/CtaBand").then(m => ({ default: m.CtaBand })))

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

      {/* NAVY — Grupo empresarial (oculto) */}
      {/* <GrupoEmpresarialBand /> */}

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

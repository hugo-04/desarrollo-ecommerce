"use client"

import dynamic from "next/dynamic"

// Sobre el fold — importación estática (JS crítico)
import { HeroSection } from "@/components/home/HeroSection"
import { CatalogShowcase } from "@/components/home/CatalogShowcase"

// Bajo el fold — importación dinámica (JS diferido, HTML igual vía SSR)
const MarqueeBrands        = dynamic(() => import("@/components/home/MarqueeBrands").then(m => ({ default: m.MarqueeBrands })))
const ProcesoSection       = dynamic(() => import("@/components/home/ProcesoSection").then(m => ({ default: m.ProcesoSection })))
const FeaturedOffers       = dynamic(() => import("@/components/home/FeaturedOffers").then(m => ({ default: m.FeaturedOffers })))
const CompanyShowcase      = dynamic(() => import("@/components/home/CompanyShowcase").then(m => ({ default: m.CompanyShowcase })))
const TestimonialsSection  = dynamic(() => import("@/components/home/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })))
const CtaBand              = dynamic(() => import("@/components/home/CtaBand").then(m => ({ default: m.CtaBand })))

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

      {/* LIGHT — Categorías + Productos destacados (unificado) */}
      <CatalogShowcase categories={categories} />

      {/* DARK — Marcas */}
      <MarqueeBrands brands={brands} />

      {/* LIGHT — Cómo funciona el proceso */}
      <ProcesoSection />

      {/* LIGHT — Especialidades */}
      <FeaturedOffers />

      {/* LIGHT — Empresa */}
      <CompanyShowcase />

      {/* LIGHT — Prueba social */}
      <TestimonialsSection />

      {/* DARK — CTA final de conversión */}
      <CtaBand />
    </>
  )
}

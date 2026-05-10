"use client"

import dynamic from "next/dynamic"

// Sobre el fold — importación estática (JS crítico)
import { HeroSection } from "@/components/home/HeroSection"
import { CatalogShowcase } from "@/components/home/CatalogShowcase"

// Bajo el fold — importación dinámica (JS diferido, HTML igual vía SSR)
const MarqueeBrands   = dynamic(() => import("@/components/home/MarqueeBrands").then(m => ({ default: m.MarqueeBrands })))
const ProcesoSection  = dynamic(() => import("@/components/home/ProcesoSection").then(m => ({ default: m.ProcesoSection })))
const FeaturedOffers  = dynamic(() => import("@/components/home/FeaturedOffers").then(m => ({ default: m.FeaturedOffers })))
const CompanyShowcase = dynamic(() => import("@/components/home/CompanyShowcase").then(m => ({ default: m.CompanyShowcase })))
const CtaBand         = dynamic(() => import("@/components/home/CtaBand").then(m => ({ default: m.CtaBand })))

import type { CategoryDTO } from "@/features/categorias/types"
import type { Brand } from "@/lib/types"
import type { HeroSlideDisplay } from "@/features/hero/types"

interface HomeViewProps {
  categories:  CategoryDTO[]
  brands:      Brand[]
  heroSlides?: HeroSlideDisplay[]
}

export function HomeView({ categories, brands, heroSlides }: HomeViewProps) {
  return (
    <>
      {/* DARK — Hero principal */}
      <HeroSection slides={heroSlides} />

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

      {/* DARK — CTA final de conversión */}
      <CtaBand />
    </>
  )
}

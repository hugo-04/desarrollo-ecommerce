"use client"

/**
 * PRODUCTO VIEW — Orquestador de la página de detalle de producto.
 *
 * Responsabilidad: componer los sub-componentes (Gallery, Info, CTA, Tabs, Garantia, Modal).
 * No mezcla lógica de negocio con la presentación.
 */

import { useState } from "react"
import Link from "next/link"
import { ProductGallery } from "@/components/product/ProductGallery"
import { ProductInfo } from "@/components/product/ProductInfo"
import { ProductCTA } from "@/components/product/ProductCTA"
import { ProductTabs } from "@/components/product/ProductTabs"
import { GarantiaStrip } from "@/components/product/GarantiaStrip"
import { QuoteModal } from "@/components/product/QuoteModal"
import { ProductCard } from "@/components/product/ProductCard"
import { PRODUCT_DETAIL_CONTENT } from "@/lib/data/mock/static-content.mock"
import { products } from "@/lib/data"
import { useFadeInOnScroll } from "@/hooks/useAnimations"
import { IconChevronRight, IconChevronLeft, IconWhatsApp } from "@/components/icons"
import type { Product } from "@/lib/types"

interface ProductoViewProps {
  product: Product
}

export function ProductoView({ product }: ProductoViewProps) {
  const { ref, isVisible } = useFadeInOnScroll()
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<"desc" | "specs">("desc")
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const c = PRODUCT_DETAIL_CONTENT

  // Navigation within category
  const categoryProducts = products.filter((p) => p.category === product.category)
  const currentIndex = categoryProducts.findIndex((p) => p.id === product.id)
  const prevProduct = currentIndex > 0 ? categoryProducts[currentIndex - 1] : null
  const nextProduct =
    currentIndex < categoryProducts.length - 1 ? categoryProducts[currentIndex + 1] : null
  const relatedProducts = categoryProducts.filter((p) => p.id !== product.id)

  return (
    <>
      {/* Breadcrumbs + product navigation */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5 text-xs">
              <Link href="/" className="shrink-0 text-slate-500 hover:text-primary">
                Inicio
              </Link>
              <IconChevronRight className="h-3 w-3 shrink-0 text-slate-400" />
              <Link href="/catalogo" className="shrink-0 text-slate-500 hover:text-primary">
                Catalogo
              </Link>
              <IconChevronRight className="h-3 w-3 shrink-0 text-slate-400" />
              <Link
                href={`/catalogo?categoria=${encodeURIComponent(product.category)}`}
                className="shrink-0 text-slate-500 hover:text-primary"
              >
                {product.category}
              </Link>
              <IconChevronRight className="h-3 w-3 shrink-0 text-slate-400" />
              <span className="truncate font-medium text-slate-800">
                {product.name.length > 40
                  ? product.name.substring(0, 40) + "..."
                  : product.name}
              </span>
            </div>

            {/* Prev / Next */}
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="hidden text-[10px] text-slate-400 sm:inline">
                {currentIndex + 1} / {categoryProducts.length}
              </span>
              <Link
                href={prevProduct ? `/producto/${prevProduct.id}` : "#"}
                title={prevProduct?.name}
                className={`flex h-7 w-7 items-center justify-center rounded-lg border text-xs transition-all ${
                  prevProduct
                    ? "border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary"
                    : "pointer-events-none border-slate-100 bg-slate-50 text-slate-300"
                }`}
              >
                <IconChevronLeft className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={nextProduct ? `/producto/${nextProduct.id}` : "#"}
                title={nextProduct?.name}
                className={`flex h-7 w-7 items-center justify-center rounded-lg border text-xs transition-all ${
                  nextProduct
                    ? "border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary"
                    : "pointer-events-none border-slate-100 bg-slate-50 text-slate-300"
                }`}
              >
                <IconChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div ref={ref} className={`bg-white ${isVisible ? "animate-reveal" : "opacity-0"}`}>
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <ProductGallery
              gallery={product.gallery}
              productName={product.name}
              bestSeller={product.bestSeller}
              selectedImage={selectedImage}
              onSelectImage={setSelectedImage}
            />
            <div>
              <ProductInfo product={product} />
              <ProductCTA
                onCotizar={() => setShowQuoteModal(true)}
                onFichaTecnica={() => alert("Descargando ficha tecnica...")}
              />
            </div>
          </div>

          <ProductTabs
            product={product}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <GarantiaStrip />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-2 text-xl font-extrabold text-[#121A47]">
                {c.relatedTitle}
              </h2>
              <p className="mb-6 text-sm text-slate-500">{c.relatedSubtitle}</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.slice(0, 6).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <QuoteModal product={product} onClose={() => setShowQuoteModal(false)} />
      )}

      {/* Sticky mobile bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden">
        <button
          onClick={() => setShowQuoteModal(true)}
          className="flex w-full items-center justify-center gap-3 bg-green-600 py-4 text-sm font-bold text-white shadow-2xl shadow-green-600/40 active:bg-green-700"
        >
          <IconWhatsApp className="h-5 w-5" />
          Cotizar este producto via WhatsApp
        </button>
      </div>
      <div className="h-14 sm:hidden" />
    </>
  )
}

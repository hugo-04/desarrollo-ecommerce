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
import { ProductTabs } from "@/components/product/ProductTabs"
import { GarantiaStrip } from "@/components/product/GarantiaStrip"
import { QuoteModal } from "@/components/product/QuoteModal"
import { ProductCard } from "@/components/product/ProductCard"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { PRODUCT_DETAIL_CONTENT } from "@/lib/data/mock/static-content.mock"
import { IconChevronRight, IconChevronLeft, IconWhatsApp } from "@/components/icons"
import { WA } from "@/lib/contact"
import type { Product } from "@/lib/types"

interface ProductoViewProps {
  product: Product
  initialRelatedProducts?: Product[]
}

export function ProductoView({ product, initialRelatedProducts = [] }: ProductoViewProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<"desc" | "medidas">("desc")
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const c = PRODUCT_DETAIL_CONTENT

  // Productos relacionados — vienen del servidor (SSR) para que Google los vea en el HTML inicial
  const relatedProducts = initialRelatedProducts
  const prevProduct = relatedProducts[0] ?? null
  const nextProduct = relatedProducts[1] ?? null

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
                Catálogo
              </Link>
              <IconChevronRight className="h-3 w-3 shrink-0 text-slate-400" />
              <Link
                href={product.categorySlug ? `/categoria/${product.categorySlug}` : `/catalogo?categoria=${encodeURIComponent(product.category)}`}
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
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <ProductGallery
              gallery={product.gallery.length > 0 ? product.gallery : product.image ? [product.image] : []}
              galleryAlts={product.gallery.length > 0 ? product.galleryAlts : product.image ? [product.imageAlt ?? product.name] : []}
              productName={product.name}
              bestSeller={product.bestSeller}
              selectedImage={selectedImage}
              onSelectImage={setSelectedImage}
              fichaTecnica={product.fichaTecnica}
            />
            <div>
              <ProductInfo product={product} />
            </div>
          </div>

          <ProductTabs
            product={product}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <GarantiaStrip />

          {/* Related Products — Carrusel shadcn */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <div className="mb-6">
                <h2 className="text-xl font-extrabold text-[#121A47]">{c.relatedTitle}</h2>
                <p className="mt-1 text-sm text-slate-500">{c.relatedSubtitle}</p>
              </div>

              {/* Wrapper con padding lateral para que los botones no tapen las cards */}
              <div className="px-10">
                <Carousel
                  opts={{ loop: true, align: "start", dragFree: false }}
                  className="w-full [&_[data-slot=carousel-content]]:cursor-grab [&_[data-slot=carousel-content]:active]:cursor-grabbing"
                >
                  {/* Fade izquierdo */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent" />
                  {/* Fade derecho */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent" />

                  <CarouselContent className="-ml-4">
                    {relatedProducts.map((p) => (
                      <CarouselItem key={p.id} className="pl-4 basis-[285px] sm:basis-[305px]">
                        <ProductCard product={p} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="-left-10 h-9 w-9 border-slate-200 bg-white shadow-md transition-all hover:border-primary hover:text-primary hover:scale-110" />
                  <CarouselNext className="-right-10 h-9 w-9 border-slate-200 bg-white shadow-md transition-all hover:border-primary hover:text-primary hover:scale-110" />
                </Carousel>
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
        <a
          href={WA.producto(product.name, product.brands.join(", "), product.modelo)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-3 bg-[#25D366] py-4 text-sm font-bold text-white shadow-[0_-4px_20px_-10px_rgba(37,211,102,0.5)] active:bg-[#1DA851]"
        >
          <IconWhatsApp className="h-5 w-5" />
          Cotizar este producto
        </a>
      </div>
      <div className="h-14 sm:hidden" />
    </>
  )
}

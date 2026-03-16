"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ProductCard } from "@/components/product/ProductCard"
import { products } from "@/lib/data"
import { useFadeInOnScroll } from "@/hooks/useAnimations"
import {
  IconChevronRight, IconChevronLeft, IconStar, IconWhatsApp, IconDownload,
  IconShield, IconPhone, IconCheck, IconCertificate, IconTools,
} from "@/components/icons"

export default function ProductoPage() {
  const params = useParams()
  const productId = Number(params.id)
  const product = products.find((p) => p.id === productId)
  const { ref, isVisible } = useFadeInOnScroll()

  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<"desc" | "specs">("desc")

  if (!product) {
    return (
      <>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-2xl font-bold text-slate-900">Producto no encontrado</h1>
          <p className="mb-6 text-sm text-slate-500">El producto que buscas no existe o fue removido.</p>
          <Link href="/catalogo" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white">
            Ir al Catalogo
          </Link>
        </div>
      </>
    )
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleWhatsAppQuote = () => {
    const message = encodeURIComponent(
      `Hola, me gustaria solicitar cotizacion del producto:\n*${product.name}*\nSKU: ${product.sku}\nMarca: ${product.brand}`
    )
    window.open(`https://wa.me/51123456789?text=${message}`, "_blank")
  }

  return (
    <>
      {/* Breadcrumbs */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-1.5 text-xs">
            <Link href="/" className="text-slate-500 hover:text-primary">Inicio</Link>
            <IconChevronRight className="h-3 w-3 text-slate-400" />
            <Link href="/catalogo" className="text-slate-500 hover:text-primary">Catalogo</Link>
            <IconChevronRight className="h-3 w-3 text-slate-400" />
            <Link href={`/catalogo?categoria=${encodeURIComponent(product.category)}`} className="text-slate-500 hover:text-primary">{product.category}</Link>
            <IconChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-medium text-slate-800">{product.name.length > 40 ? product.name.substring(0, 40) + "..." : product.name}</span>
          </div>
        </div>
      </div>

      <div ref={ref} className={`bg-white ${isVisible ? "animate-reveal" : "opacity-0"}`}>
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Gallery */}
            <div>
              <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100/50">
                <img src={product.gallery[selectedImage]} alt={product.name} className="h-full w-full object-contain p-8 transition-transform duration-500 hover:scale-105" crossOrigin="anonymous" />
                {product.bestSeller && (
                  <span className="absolute left-4 top-4 rounded-lg bg-red-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">Top Ventas</span>
                )}
                {product.gallery.length > 1 && (
                  <>
                    <button onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : product.gallery.length - 1))} className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:bg-white">
                      <IconChevronLeft className="h-4 w-4" />
                    </button>
                    <button onClick={() => setSelectedImage((prev) => (prev < product.gallery.length - 1 ? prev + 1 : 0))} className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:bg-white">
                      <IconChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
              {product.gallery.length > 1 && (
                <div className="flex gap-2">
                  {product.gallery.map((img, index) => (
                    <button key={index} onClick={() => setSelectedImage(index)} className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-all ${selectedImage === index ? "border-primary" : "border-slate-200 hover:border-slate-300"}`}>
                      <img src={img} alt="" className="h-full w-full object-contain p-1" crossOrigin="anonymous" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">{product.brand}</span>
                <span className="text-xs text-slate-400">SKU: {product.sku}</span>
                <div className="flex items-center gap-1">
                  <IconStar className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                </div>
              </div>
              <h1 className="mb-3 text-xl font-extrabold text-[#121A47] lg:text-2xl">{product.name}</h1>
              {/* En Stock badge */}
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  En Stock — Despacho inmediato
                </span>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-slate-500">{product.fullDescription}</p>

              {/* Specs Tags */}
              <div className="mb-6 flex flex-wrap gap-2">
                {product.specs.map((spec, index) => (
                  <span key={index} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">{spec}</span>
                ))}
              </div>

              {/* Certifications */}
              <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="flex items-center gap-2">
                  <IconShield className="h-5 w-5 text-blue-600" />
                  <span className="text-xs font-bold text-blue-900">Producto Certificado</span>
                </div>
                <p className="mt-1 text-xs text-blue-700">Cumple normas IEC, ANSI y NTP. Respaldado por certificaciones internacionales.</p>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button onClick={handleWhatsAppQuote} className="flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 py-4 text-sm font-bold text-white shadow-lg shadow-green-600/25 transition-all hover:bg-green-700 hover:shadow-xl">
                  <IconWhatsApp className="h-5 w-5" />Solicitar Cotizacion por WhatsApp
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => alert("Descargando ficha tecnica...")} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-semibold text-slate-700 transition-all hover:border-primary/30 hover:text-primary">
                    <IconDownload className="h-4 w-4" />Ficha Tecnica
                  </button>
                  <Link href="/contacto" className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-semibold text-slate-700 transition-all hover:border-primary/30 hover:text-primary">
                    <IconPhone className="h-4 w-4" />Contactar Asesor
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs: Specs / Description */}
          <div className="mt-12">
            <div className="mb-8 flex gap-6 border-b border-slate-200">
              <button onClick={() => setActiveTab("desc")} className={`pb-4 text-sm font-semibold transition-colors ${activeTab === "desc" ? "border-b-2 border-primary text-primary" : "text-slate-500 hover:text-slate-800"}`}>
                Descripcion Completa
              </button>
              <button onClick={() => setActiveTab("specs")} className={`pb-4 text-sm font-semibold transition-colors ${activeTab === "specs" ? "border-b-2 border-primary text-primary" : "text-slate-500 hover:text-slate-800"}`}>
                Especificaciones Tecnicas
              </button>
            </div>
            {activeTab === "desc" ? (
              <div className="max-w-4xl space-y-6">
                <h2 className="scroll-m-20 pb-2 text-3xl justify-center font-semibold tracking-tight transition-colors border-b text-[#121A47]">
                  Acerca de {product.name}
                </h2>
                <div className="leading-7 [&:not(:first-child)]:mt-6 text-slate-700 text-base">
                  <p>{product.fullDescription}</p>
                  <p className="mt-4 font-medium text-slate-800">
                    Perfecto para integraciones industriales y sistemas de distribucion que requieren maxima fiabilidad en condiciones exigentes.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm max-w-4xl">
                {product.technicalSpecs.map((spec, index) => (
                  <div key={index} className={`flex items-center justify-between px-6 py-4 text-sm transition-colors hover:bg-slate-100/50 ${index % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                    <span className="font-medium text-slate-600">{spec.label}</span>
                    <span className="font-bold text-[#121A47]">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Garantia y Soporte */}
          <div className="mt-10 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                <IconShield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Garantía 12 meses</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-500">Por defecto de fabricación, respaldada por el fabricante original.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                <IconCertificate className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Ficha Técnica</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-500">Descarga disponible con especificaciones completas y certificaciones.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                <IconTools className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Soporte Técnico</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-500">Ingenieros AT/MT disponibles para asesoria de seleccion e instalacion.</p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-2 text-xl font-extrabold text-[#121A47]">Clientes que vieron este producto también compraron:</h2>
              <p className="mb-6 text-sm text-slate-500">Productos complementarios del mismo sector</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky WhatsApp bar — mobile only */}
      <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden">
        <button
          onClick={handleWhatsAppQuote}
          className="flex w-full items-center justify-center gap-3 bg-green-600 py-4 text-sm font-bold text-white shadow-2xl shadow-green-600/40 active:bg-green-700"
        >
          <IconWhatsApp className="h-5 w-5" />
          Cotizar este producto vía WhatsApp
        </button>
      </div>
      {/* Bottom padding for mobile sticky bar */}
      <div className="h-14 sm:hidden" />
    </>
  )
}

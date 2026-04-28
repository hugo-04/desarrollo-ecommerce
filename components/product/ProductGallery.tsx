"use client"

import Image from "next/image"
import { IconChevronLeft, IconChevronRight, IconPDF } from "@/components/icons"

interface ProductGalleryProps {
  gallery: string[]
  galleryAlts?: string[]
  productName: string
  bestSeller: boolean
  selectedImage: number
  onSelectImage: (index: number) => void
  fichaTecnica?: string
}

export function ProductGallery({
  gallery,
  galleryAlts,
  productName,
  bestSeller,
  selectedImage,
  onSelectImage,
  fichaTecnica,
}: ProductGalleryProps) {
  const prev = () => onSelectImage(selectedImage > 0 ? selectedImage - 1 : gallery.length - 1)
  const next = () => onSelectImage(selectedImage < gallery.length - 1 ? selectedImage + 1 : 0)

  return (
    <div>
      {/* Main image */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100/50">
        <Image
          src={gallery[selectedImage]}
          alt={galleryAlts?.[selectedImage] ?? productName}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-8 transition-transform duration-500 hover:scale-105"
          priority={selectedImage === 0}
        />
        {bestSeller && (
          <span className="absolute left-4 top-4 rounded-lg bg-slate-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
            Top Ventas
          </span>
        )}
        {fichaTecnica && (
          <button
            type="button"
            onClick={() => window.open(fichaTecnica, "_blank", "noopener,noreferrer")}
            className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-xl bg-white/95 px-3 py-2 text-[10px] font-bold text-[#64748b] shadow-lg ring-1 ring-slate-200/50 backdrop-blur-md transition-all duration-300 hover:bg-[#64748b] hover:text-white"
            title="Descargar Ficha Técnica (PDF)"
          >
            <IconPDF className="h-4 w-4" /> FICHA PDF
          </button>
        )}
        {gallery.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:bg-white"
            >
              <IconChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:bg-white"
            >
              <IconChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {gallery.length > 1 && (
        <div className="flex gap-2">
          {gallery.map((img, index) => (
            <button
              key={index}
              onClick={() => onSelectImage(index)}
              className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === index
                  ? "border-primary"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <Image
                src={img}
                alt={galleryAlts?.[index] ?? `${productName} - imagen ${index + 1}`}
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

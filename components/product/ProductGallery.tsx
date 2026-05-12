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
  gallery: galleryRaw,
  galleryAlts: galleryAltsRaw,
  productName,
  bestSeller,
  selectedImage,
  onSelectImage,
  fichaTecnica,
}: ProductGalleryProps) {
  // Filtra strings vacíos para evitar errores de Next.js Image con src=""
  const gallery = galleryRaw.filter(Boolean)
  const galleryAlts = galleryAltsRaw?.filter((_, i) => Boolean(galleryRaw[i]))

  const idx  = Math.min(selectedImage, Math.max(gallery.length - 1, 0))
  const prev = () => onSelectImage(idx > 0 ? idx - 1 : gallery.length - 1)
  const next = () => onSelectImage(idx < gallery.length - 1 ? idx + 1 : 0)

  return (
    <div>
      {/* Imagen principal */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100/50">

        {gallery.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <Image
            src={gallery[idx]}
            alt={galleryAlts?.[idx] ?? productName}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain !p-8 transition-transform duration-500 hover:scale-105"
            priority={idx === 0}
          />
        )}

        {bestSeller && (
          <span className="absolute left-4 top-4 rounded-lg bg-red-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
            Top Ventas
          </span>
        )}

        {fichaTecnica && (
          <button
            type="button"
            onClick={() => window.open(fichaTecnica, "_blank", "noopener,noreferrer")}
            className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-[#cc1b1b] shadow-xl ring-1 ring-[#cc1b1b]/20 backdrop-blur-md transition-all duration-300 hover:bg-[#cc1b1b] hover:text-white hover:shadow-[#cc1b1b]/30 hover:scale-105"
            title="Descargar Ficha Técnica (PDF)"
          >
            <IconPDF className="h-5 w-5 shrink-0" />
            <span>Descargar Ficha Técnica</span>
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

      {/* Miniaturas */}
      {gallery.length > 1 && (
        <div className="flex gap-2">
          {gallery.map((img, index) => (
            <button
              key={index}
              onClick={() => onSelectImage(index)}
              className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                idx === index
                  ? "border-primary"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <Image
                src={img}
                alt={galleryAlts?.[index] ?? `${productName} vista ${index + 1}`}
                fill
                sizes="64px"
                className="object-contain !p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

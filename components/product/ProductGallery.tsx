"use client"

import { IconChevronLeft, IconChevronRight } from "@/components/icons"

interface ProductGalleryProps {
  gallery: string[]
  productName: string
  bestSeller: boolean
  selectedImage: number
  onSelectImage: (index: number) => void
}

export function ProductGallery({
  gallery,
  productName,
  bestSeller,
  selectedImage,
  onSelectImage,
}: ProductGalleryProps) {
  const prev = () => onSelectImage(selectedImage > 0 ? selectedImage - 1 : gallery.length - 1)
  const next = () => onSelectImage(selectedImage < gallery.length - 1 ? selectedImage + 1 : 0)

  return (
    <div>
      {/* Main image */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100/50">
        <img
          src={gallery[selectedImage]}
          alt={productName}
          className="h-full w-full object-contain p-8 transition-transform duration-500 hover:scale-105"
          crossOrigin="anonymous"
        />
        {bestSeller && (
          <span className="absolute left-4 top-4 rounded-lg bg-red-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
            Top Ventas
          </span>
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
              className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === index
                  ? "border-primary"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <img
                src={img}
                alt=""
                className="h-full w-full object-contain p-1"
                crossOrigin="anonymous"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

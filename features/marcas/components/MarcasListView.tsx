"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Loader2, Package } from "lucide-react"
import { useInfiniteBrands } from "@/features/marcas/hooks"

const PLACEHOLDER_LOGO = "/logo/logotipo.png"

function BrandCard({ brand }: { brand: { id: number; name: string; logo: string; logoAlt?: string; productCount?: number } }) {
  const href = `/marca/${encodeURIComponent(brand.name)}`
  const hasLogo = brand.logo && brand.logo.startsWith("http")

  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#003D73]/30 hover:shadow-md"
    >
      {/* Logo */}
      <div className="flex h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-3 transition-colors group-hover:bg-[#003D73]/[0.04]">
        {hasLogo ? (
          <Image
            src={brand.logo}
            alt={brand.logoAlt ?? brand.name}
            width={160}
            height={80}
            className="h-full w-auto object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-1 text-slate-300">
            <Package className="h-8 w-8" />
            <span className="text-[10px] font-semibold uppercase tracking-widest">{brand.name.slice(0, 3)}</span>
          </div>
        )}
      </div>

      {/* Nombre */}
      <p className="text-center text-sm font-bold text-slate-700 transition-colors group-hover:text-[#003D73]">
        {brand.name}
      </p>

      {/* Contador */}
      {brand.productCount !== undefined && (
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500 transition-colors group-hover:bg-[#003D73]/10 group-hover:text-[#003D73]">
          {brand.productCount} producto{brand.productCount !== 1 ? "s" : ""}
        </span>
      )}
    </Link>
  )
}

export function MarcasListView({ initialBrands, initialTotal }: { initialBrands: any[]; initialTotal: number }) {
  const [search, setSearch]             = useState("")
  const [debouncedSearch, setDebounced] = useState("")
  const observerRef                     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 300)
    return () => clearTimeout(t)
  }, [search])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteBrands(debouncedSearch)

  const brands = debouncedSearch
    ? data?.pages.flatMap((p) => p.data) ?? []
    : (data?.pages.flatMap((p) => p.data) ?? initialBrands)

  const total = debouncedSearch
    ? (data?.pages[0]?.total ?? 0)
    : (data?.pages[0]?.total ?? initialTotal)

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    if (!observerRef.current) return
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 })
    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [handleObserver])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">

      {/* Buscador */}
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#003D73]">
            {debouncedSearch ? `Resultados para "${debouncedSearch}"` : "Todas las marcas"}
          </h2>
          {total > 0 && (
            <p className="mt-0.5 text-sm text-slate-500">{total} marca{total !== 1 ? "s" : ""} disponibles</p>
          )}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar marca..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#003D73]/40 focus:ring-2 focus:ring-[#003D73]/10"
          />
        </div>
      </div>

      {/* Grid */}
      {status === "pending" && !brands.length ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-slate-300" />
        </div>
      ) : brands.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-slate-400">
          <Package className="mb-3 h-10 w-10" />
          <p className="text-base font-semibold">No se encontraron marcas</p>
          {debouncedSearch && (
            <button onClick={() => setSearch("")} className="mt-2 text-sm text-[#003D73] hover:underline">
              Ver todas las marcas →
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      )}

      {/* Infinite scroll trigger */}
      <div ref={observerRef} className="h-8 w-full mt-6 flex justify-center">
        {isFetchingNextPage && <Loader2 className="h-5 w-5 animate-spin text-slate-300" />}
      </div>
    </div>
  )
}

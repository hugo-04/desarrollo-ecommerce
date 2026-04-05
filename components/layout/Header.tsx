"use client"

import { useRef, useCallback, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { X } from "lucide-react"
import { IconSearch, IconWhatsApp } from "@/components/icons"
import { WA } from "@/lib/contact"

interface HeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const router   = useRouter()
  const pathname = usePathname()
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const handleChange = useCallback((value: string) => {
    setSearchQuery(value)
    if (pathname === "/catalogo") {
      if (debounce.current) clearTimeout(debounce.current)
      debounce.current = setTimeout(() => {
        router.replace(`/catalogo?q=${encodeURIComponent(value)}`)
      }, 300)
    }
  }, [pathname, router, setSearchQuery])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(searchQuery)}`)
      setMobileSearchOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
    if (e.key === "Escape") setMobileSearchOpen(false)
  }

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm relative z-50">
      <div className="mx-auto max-w-7xl px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="flex items-center justify-between gap-3">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center transition-transform hover:scale-[1.02]">
            <img
              src="/logotipo.png"
              alt="Electro Thina — Soluciones Eléctricas"
              className="h-9 w-auto object-contain drop-shadow-sm sm:h-10"
            />
          </Link>

          {/* Search — desktop */}
          <div className="relative hidden w-full max-w-xl lg:block">
            <IconSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar productos, SKU, marca..."
              value={searchQuery}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-20 text-sm transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={handleSearch}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Buscar
            </button>
          </div>

          {/* Acciones derecha */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Lupa — mobile/tablet */}
            <button
              onClick={() => setMobileSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:bg-slate-100 lg:hidden"
              aria-label="Buscar"
            >
              <IconSearch className="h-4 w-4" />
            </button>

            {/* WhatsApp Cotizar */}
            <button
              onClick={() => window.open(WA.cotizar, "_blank")}
              className="header-wa-pulse flex shrink-0 items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-green-700 sm:px-4 sm:py-2.5"
            >
              <IconWhatsApp className="h-4 w-4" />
              <span className="hidden sm:inline">Cotizar aquí</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search expandible — mobile */}
      {mobileSearchOpen && (
        <div className="border-t border-slate-100 bg-white px-3 pb-3 pt-2 lg:hidden">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              onClick={handleSearch}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white"
            >
              Buscar
            </button>
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

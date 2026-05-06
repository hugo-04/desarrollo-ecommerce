"use client"

import { useRef, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { X, Search } from "lucide-react"

interface HeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const router   = useRouter()
  const pathname = usePathname()
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = useCallback((value: string) => {
    setSearchQuery(value)
    if (pathname === "/catalogo") {
      if (debounce.current) clearTimeout(debounce.current)
      debounce.current = setTimeout(() => {
        router.replace(
          value.trim() ? `/catalogo?q=${encodeURIComponent(value.trim())}` : "/catalogo",
          { scroll: false },
        )
      }, 300)
    }
  }, [pathname, router, setSearchQuery])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  return (
    <>


      <header className="bg-white text-slate-900 relative z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:py-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 justify-between">
        
        {/* Logo */}
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-90">
          <Image
            src="/logo/insumind-logo.png"
            alt="INSUMIND — Insumos Industriales y Mineros"
            width={180}
            height={36}
            priority
            unoptimized
            className="h-9 sm:h-11 w-auto"
          />
        </Link>

        {/* Search */}
        <div className="w-full sm:max-w-2xl flex-1 relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#1B2B4B] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Buscar productos, marcas o categorías..."
            value={searchQuery}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-12 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl pl-11 pr-24 text-[13px] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#FF6B35]/50 focus:ring-4 focus:ring-[#FF6B35]/20 transition-all outline-none"
          />
          <div className="absolute inset-y-1.5 right-1.5 flex items-center gap-1">
            {searchQuery && (
              <button
                onClick={() => handleChange("")}
                className="h-full px-2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X size={14} />
              </button>
            )}
            <button
              onClick={handleSearch}
              className="h-full bg-[#FF6B35] hover:bg-[#f97316] text-white px-5 rounded-xl text-xs font-bold tracking-wide shadow-sm transition-all"
            >
              Buscar
            </button>
          </div>
        </div>

      </div>
    </header>
    </>
  )
}

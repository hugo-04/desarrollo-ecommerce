"use client"

import { useRef, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
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
      {/* Top Contact Bar */}
      <div className="bg-[#FF6B35] text-white py-1.5 px-4 text-[11px] font-medium hidden md:block">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              EN LÍNEA
            </span>
            <span>L-V: 9am-6pm | Sáb: 9am-3pm</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:contacto@empresa.com" className="hover:text-white/80 transition-colors">
              contacto@empresa.com
            </a>
            <span>xxxxxxxxxxxxxxxx</span>
          </div>
        </div>
      </div>

      <header className="bg-[#1B2B4B] text-white relative z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:py-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 justify-between">
        
        {/* Logo */}
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-90 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 60" fill="none" className="h-9 sm:h-11 w-auto">
            <polygon points="28,4 10,32 22,32 18,56 40,24 28,24" fill="#FF6B35"/>
            <text x="52" y="40" fontFamily="system-ui, -apple-system, sans-serif" fontSize="28" fontWeight="800" letterSpacing="-0.5" fill="currentColor">
              INSU<tspan fill="#FF6B35">MIND</tspan>
            </text>
          </svg>
        </Link>

        {/* Search */}
        <div className="w-full sm:max-w-2xl flex-1 relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-white/40 group-focus-within:text-white transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Buscar productos, marcas o categorías..."
            value={searchQuery}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-12 bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl pl-11 pr-24 text-[13px] text-white placeholder:text-white/50 focus:bg-[#0f1e35] focus:border-[#FF6B35]/50 focus:ring-4 focus:ring-[#FF6B35]/20 transition-all outline-none backdrop-blur-sm"
          />
          <div className="absolute inset-y-1.5 right-1.5 flex items-center gap-1">
            {searchQuery && (
              <button
                onClick={() => handleChange("")}
                className="h-full px-2 text-white/40 hover:text-white transition-colors"
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

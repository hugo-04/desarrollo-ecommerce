"use client"

import { useRef, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { X } from "lucide-react"
import { IconSearch } from "@/components/icons"

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
    <header className="border-b border-slate-200 bg-white shadow-sm relative z-50">
      <div className="mx-auto max-w-7xl px-3 py-2.5 sm:px-4 sm:py-3">

        {/* Mobile: logo arriba, buscador abajo. Desktop: fila única */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center transition-transform hover:scale-[1.02]">
            <Image
              src="/logo/logotipo.png"
              alt="Electro Thina — Soluciones Eléctricas AT/MT"
              width={160}
              height={40}
              className="h-8 w-auto object-contain drop-shadow-sm sm:h-10"
              priority
            />
          </Link>

          {/* Search — full width en móvil, empujado a la derecha en desktop */}
          <div className="relative w-full sm:ml-auto sm:w-[520px] sm:max-w-[60%]">
            <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar producto, marca o categoría…"
              value={searchQuery}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-[5.5rem] text-sm transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-md"
            />
            {searchQuery && (
              <button
                onClick={() => handleChange("")}
                className="absolute right-[4.5rem] top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                aria-label="Limpiar búsqueda"
              >
                <X size={13} />
              </button>
            )}
            <button
              onClick={handleSearch}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Buscar
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}

"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { IconSearch, IconWhatsApp } from "@/components/icons"

interface HeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) router.push(`/catalogo?q=${encodeURIComponent(searchQuery)}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm relative z-50">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5 transition-transform hover:scale-[1.02]">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute inset-0 rotate-45 rounded-md border-2 border-red-600 bg-white" />
              <span className="relative z-10 text-xs font-extrabold text-[#121A47]">ET</span>
            </div>
            <div className="hidden flex-col items-start sm:flex">
              <span className="text-lg font-bold tracking-tight text-[#1C2870]">ELECTRO <span className="text-[#1C2870]">THINA</span></span>
              <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">Soluciones Eléctricas</span>
            </div>
          </Link>

          {/* Search */}
          <div className="relative hidden w-full max-w-xl lg:block">
            <IconSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar productos, SKU, marca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* WhatsApp Cotizar */}
          <button
            onClick={() => {
              const msg = encodeURIComponent("Hola, me gustaria solicitar una cotizacion directa.")
              window.open(`https://wa.me/51981375196?text=${msg}`, "_blank")
            }}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/30"
          >
            <IconWhatsApp className="h-4 w-4" />
            <span className="hidden sm:inline">Cotizar</span>
          </button>

        </div>
      </div>
    </header>
  )
}

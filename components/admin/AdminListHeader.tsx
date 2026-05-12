"use client"

import Link from "next/link"
import { useRef } from "react"
import { Plus, Search, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminListHeaderProps {
  title: string
  subtitle: string
  newHref: string
  newLabel: string
  searchValue: string
  searchPlaceholder: string
  fetching?: boolean
  onSearch: (q: string) => void
  onSearchNow: (q: string) => void
}

export function AdminListHeader({
  title,
  subtitle,
  newHref,
  newLabel,
  searchValue,
  searchPlaceholder,
  fetching = false,
  onSearch,
  onSearchNow,
}: AdminListHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      onSearchNow(searchValue)
    }
    if (e.key === "Escape") {
      onSearchNow("")
      inputRef.current?.blur()
    }
  }

  function handleClear() {
    onSearchNow("")
    inputRef.current?.focus()
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <Button asChild className="bg-[#334155] hover:bg-[#334155]/90">
          <Link href={newHref}>
            <Plus className="h-4 w-4" />
            {newLabel}
          </Link>
        </Button>
      </div>

      <div className="relative mb-4 max-w-md">
        {/* Icono izquierdo — spinner si está buscando, lupa si no */}
        <button
          type="button"
          onClick={() => onSearchNow(searchValue)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-slate-700 transition-colors"
          tabIndex={-1}
          aria-label="Buscar"
        >
          {fetching
            ? <Loader2 className="h-4 w-4 animate-spin" />
            : <Search className="h-4 w-4" />
          }
        </button>

        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={searchPlaceholder}
          className="flex h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-9 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />

        {/* Botón limpiar — solo visible si hay texto */}
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </>
  )
}

"use client"

/**
 * AdminPagination — Paginación reutilizable para todas las listas del panel admin.
 *
 * Siempre muestra el resumen de resultados (página actual / total de páginas).
 * Los botones de navegación solo aparecen cuando hay más de una página.
 */

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminPaginationProps {
  currentPage: number
  totalPages:  number
  /** Total de ítems (opcional — muestra "N resultados" si se pasa) */
  total?:      number
  onPage: (p: number) => void
}

export function AdminPagination({ currentPage, totalPages, total, onPage }: AdminPaginationProps) {
  // Páginas cercanas a la actual (ventana de ±2)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => Math.abs(p - currentPage) <= 2,
  )

  return (
    <div className="mt-4 flex items-center justify-between gap-4 text-sm text-slate-500">

      {/* Info de paginación — siempre visible */}
      <span className="text-xs text-slate-400">
        Página <span className="font-semibold text-slate-600">{currentPage}</span> de{" "}
        <span className="font-semibold text-slate-600">{totalPages}</span>
        {total !== undefined && (
          <> · <span className="font-semibold text-slate-600">{total}</span> resultado{total !== 1 ? "s" : ""}</>
        )}
      </span>

      {/* Botones de navegación — solo cuando hay más de 1 página */}
      {totalPages > 1 && (
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>

          {pages.map((p) => (
            <Button
              key={p}
              size="icon-sm"
              variant={p === currentPage ? "default" : "ghost"}
              onClick={() => onPage(p)}
              aria-current={p === currentPage ? "page" : undefined}
              className={p === currentPage ? "bg-[#1C2870] hover:bg-[#1C2870]/90" : ""}
            >
              {p}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

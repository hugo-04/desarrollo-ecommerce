"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminPaginationProps {
  currentPage: number
  totalPages: number
  onPage: (p: number) => void
}

export function AdminPagination({ currentPage, totalPages, onPage }: AdminPaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => Math.abs(p - currentPage) <= 2,
  )

  return (
    <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
      <span>
        Página {currentPage} de {totalPages}
      </span>
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
    </div>
  )
}

"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  page: number
  totalPages: number
  total: number
  pageSize: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  className?: string
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total]
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total]
  return [1, "...", current - 1, current, current + 1, "...", total]
}

export function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  pageSizeOptions = [12, 20, 50],
  onPageChange,
  onPageSizeChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 0) return null

  const from  = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to    = Math.min(page * pageSize, total)
  const pages = getPageNumbers(page, totalPages)

  return (
    <div className={`mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between ${className}`}>

      {/* Resumen */}
      <p className="order-2 text-xs text-slate-500 sm:order-1">
        Mostrando{" "}
        <span className="font-semibold text-slate-700">{from}–{to}</span>{" "}
        de <span className="font-semibold text-slate-700">{total}</span> productos
      </p>

      {/* Números de página */}
      <div className="order-1 flex items-center gap-1 sm:order-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="flex h-8 w-8 items-center justify-center text-xs text-slate-400">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 text-xs font-semibold transition ${
                p === page
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Página siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Selector de productos por página */}
      <div className="order-3 flex items-center gap-2">
        <label className="text-xs text-slate-500">Por página:</label>
        <select
          value={pageSize}
          onChange={(e) => { onPageSizeChange(Number(e.target.value)); onPageChange(1) }}
          className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700 focus:border-primary focus:outline-none"
        >
          {pageSizeOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

    </div>
  )
}

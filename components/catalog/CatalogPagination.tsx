"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination"

interface CatalogPaginationProps {
  page: number
  totalPages: number
  total?: number
  pageSize?: number
  pageSizeOptions?: number[]
  onPageChange: (p: number) => void
  onPageSizeChange?: (size: number) => void
}

export function CatalogPagination({
  page,
  totalPages,
  total,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: CatalogPaginationProps) {
  // Mostrar selector si hay opciones
  const showSizeSelector = pageSize !== undefined && pageSizeOptions && onPageSizeChange

  // Páginas cercanas a la actual (ventana de ±2)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => Math.abs(p - page) <= 2,
  )

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Izquierda: info + selector de cantidad */}
      <div className="flex w-full items-center justify-between gap-3 sm:w-auto">
        <span className="text-xs text-slate-500">
          Página <span className="font-semibold text-slate-700">{page}</span> de{" "}
          <span className="font-semibold text-slate-700">{totalPages}</span>
          {total !== undefined && (
            <>
              {" "}
              · <span className="font-semibold text-slate-700">{total}</span> resultados
            </>
          )}
        </span>

        {showSizeSelector && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500">Ver</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Derecha: Paginación */}
      {totalPages > 1 && (
        <Pagination className="w-auto mx-0 sm:mx-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(Math.max(1, page - 1))
                }}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {pages[0] > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink href="#" onClick={(e) => { e.preventDefault(); onPageChange(1) }}>1</PaginationLink>
                </PaginationItem>
                {pages[0] > 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            )}

            {pages.map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(p)
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            {pages[pages.length - 1] < totalPages && (
              <>
                {pages[pages.length - 1] < totalPages - 1 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink href="#" onClick={(e) => { e.preventDefault(); onPageChange(totalPages) }}>{totalPages}</PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(Math.min(totalPages, page + 1))
                }}
                className={page === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

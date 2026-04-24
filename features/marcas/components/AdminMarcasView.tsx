"use client"

/**
 * AdminMarcasView — Vista completa del listado de marcas en cards (panel admin).
 *
 * Responsabilidad única (SRP): estado de paginación + grid de cards.
 * Animación: wrapper fade-out + cards con stagger de entrada al cambiar página.
 */

import Link from "next/link"
import { getBrandsPagedAction, deleteBrandAction } from "@/features/marcas/actions"
import type { Brand } from "@/lib/types"
import { Button }          from "@/components/ui/button"
import { AdminListHeader }   from "@/components/admin/AdminListHeader"
import { AdminPagination }   from "@/components/admin/AdminPagination"
import { DeleteDialog }      from "@/components/admin/DeleteDialog"
import { useAdminPagedList } from "@/hooks/admin/use-admin-paged-list"

// ── Constantes ────────────────────────────────────────────────────────────────

const PAGE_SIZE         = 12
const PAGE_SIZE_OPTIONS = [12, 24, 48]
const CARD_STAGGER_MS   = 40

// ── Subcomponente: card de marca ──────────────────────────────────────────────

interface BrandCardProps {
  brand:      Brand
  index:      number
  removingId: number | null
  onDelete:   () => void
}

/** Card individual con animación de entrada y salida al eliminar */
function BrandCard({ brand, index, removingId, onDelete }: BrandCardProps) {
  const isRemoving = removingId === brand.id
  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
      style={{
        // Entrada: fade + scale-up escalonado
        animation: `cardEnter 0.3s ease-out both`,
        animationDelay: `${index * CARD_STAGGER_MS}ms`,
        // Salida al eliminar
        opacity:    isRemoving ? 0 : undefined,
        transform:  isRemoving ? "scale(0.96)" : undefined,
        transition: isRemoving ? "all 0.3s ease" : undefined,
      }}
    >
      {/* Área del logo */}
      <div className="flex h-28 items-center justify-center border-b border-slate-100 bg-slate-50 p-4">
        {brand.logo ? (
          <img
            src={brand.logo}
            alt={brand.name}
            className="max-h-16 max-w-full object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
          />
        ) : (
          <span className="select-none text-3xl font-black text-slate-200">
            {brand.name[0]}
          </span>
        )}
      </div>

      {/* Contenido: nombre + badge carrusel + acciones */}
      <div className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <p className="min-w-0 flex-1 truncate font-bold text-slate-800">{brand.name}</p>
          {brand.showInCarousel && (
            <span className="shrink-0 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-600 ring-1 ring-emerald-200">
              Carrusel
            </span>
          )}
        </div>

        {/* Acciones */}
        <div className="flex gap-2">
          <Button asChild variant="outline" size="xs" className="flex-1 justify-center">
            <Link href={`/marcas/${brand.id}/editar`}>Editar</Link>
          </Button>
          <DeleteDialog
            trigger={
              <Button
                variant="outline" size="xs" disabled={isRemoving}
                className="border-red-100 px-2.5 text-red-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                ✕
              </Button>
            }
            itemName={brand.name}
            onConfirm={onDelete}
          />
        </div>
      </div>
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────

/** Orquesta el estado de paginación y compone el grid de marcas */
export function AdminMarcasView() {
  const {
    items, total, loading, search,
    pageSize, currentPage, totalPages, removingId,
    handleSearch, setPage, setPageSize, handleDelete,
  } = useAdminPagedList<Brand>({
    pageSize: PAGE_SIZE,
    loadFn: ({ page, query, limit }) => getBrandsPagedAction({ page, query, limit }),
  })

  return (
    <div>
      <AdminListHeader
        title="Marcas"
        subtitle={loading ? "Cargando…" : `${total} marca${total !== 1 ? "s" : ""}`}
        newHref="/marcas/nueva"
        newLabel="Nueva marca"
        searchValue={search}
        searchPlaceholder="Buscar marca…"
        onSearch={handleSearch}
      />

      {/* Keyframe de entrada para cards */}
      <style>{`
        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* Estado vacío */}
      {!loading && items.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <p className="text-sm text-slate-400">
            {search ? "Sin resultados para la búsqueda." : "No hay marcas aún."}
          </p>
        </div>
      )}

      {/*
       * Grid animado: atenúa durante carga, cards entran con stagger.
       * key en cada card incluye currentPage para re-montar y disparar cardEnter.
       */}
      {items.length > 0 && (
        <div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          style={{
            opacity:    loading ? 0.45 : 1,
            transform:  loading ? "translateY(4px)" : "translateY(0)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          {items.map((brand, i) => (
            <BrandCard
              key={`${currentPage}-${brand.id}`}
              brand={brand}
              index={i}
              removingId={removingId}
              onDelete={() => handleDelete(brand.id, () => deleteBrandAction(brand.id), brand.name)}
            />
          ))}
        </div>
      )}

      <AdminPagination
        currentPage={currentPage} totalPages={totalPages} total={total}
        onPage={setPage} pageSize={pageSize} pageSizeOptions={PAGE_SIZE_OPTIONS}
        onPageSize={setPageSize}
      />
    </div>
  )
}

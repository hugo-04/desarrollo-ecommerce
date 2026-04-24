/**
 * AdminReclamacionesView — Vista completa del libro de reclamaciones.
 *
 * Server Component: recibe los datos ya obtenidos por page.tsx.
 * Responsabilidad única (SRP): encabezado + lista, sin lógica de fetching.
 */

import { ClipboardList } from "lucide-react"
import { ReclamacionesList } from "@/features/reclamaciones/components/ReclamacionesList"
import type { ReclamacionesData } from "@/features/reclamaciones/components/ReclamacionesList"

interface AdminReclamacionesViewProps {
  data: ReclamacionesData
}

export function AdminReclamacionesView({ data }: AdminReclamacionesViewProps) {
  return (
    <div className="space-y-7 pb-12">

      {/* Cabecera con animación de entrada */}
      <div className="flex animate-in slide-in-from-top-4 flex-col items-start justify-between gap-4 fade-in duration-500 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-slate-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <ClipboardList className="h-5 w-5" />
            </span>
            Libro de Reclamaciones
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Gestión de quejas y reclamaciones — Ley N° 29571 (INDECOPI)
          </p>
        </div>

        {/* Contador total */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Total: {data.total}
          </span>
        </div>
      </div>

      {/* Lista de reclamaciones */}
      <ReclamacionesList data={data} />
    </div>
  )
}

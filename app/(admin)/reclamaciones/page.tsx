export const dynamic = "force-dynamic"

import { getReclamacionesAction } from "@/features/reclamaciones/actions"
import { ReclamacionesList } from "./ReclamacionesList"
import { ClipboardList } from "lucide-react"

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function ReclamacionesPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const page = Math.min(100000, Math.max(1, parseInt(pageParam ?? "1", 10) || 1))

  const data = await getReclamacionesAction(page)

  return (
    <div className="space-y-7 pb-12">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-500 fade-in">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <ClipboardList className="h-5 w-5" />
            </span>
            Libro de Reclamaciones
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Gestión de quejas y reclamaciones — Ley N° 29571 (INDECOPI)
          </p>
        </div>

        {/* Contadores */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Total: {data.total}
          </span>
        </div>
      </div>

      <ReclamacionesList data={data} />
    </div>
  )
}

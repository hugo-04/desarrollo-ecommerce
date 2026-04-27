"use client"

/**
 * ReclamacionesList — Lista de reclamaciones con cards, paginación y acción de resolución.
 *
 * Movido de app/(admin)/reclamaciones/ a features/ para seguir la arquitectura
 * de features-first y mantener app/ como thin shells.
 *
 * Subcomponentes:
 *  - EstadoBadge:    chip visual de estado (Resuelto / Pendiente)
 *  - ResolverBtn:    botón con optimistic transition
 *  - ReclamacionCard: card completo con datos del reclamante
 *  - Pagination:     paginación numérica con router push
 */

import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { resolverReclamacionAction } from "@/features/reclamaciones/actions"
import {
  CheckCircle2, Clock, ChevronLeft, ChevronRight,
  User, Mail, Phone, MapPin, FileText, ShoppingBag, AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ── Tipos ─────────────────────────────────────────────────────────────────────

type Reclamacion = {
  id: number
  nombres: string
  apellidos: string
  tipoDoc: string
  nroDoc: string
  domicilio: string
  email: string
  telefono: string
  tipo: string
  tipoBien: string
  descripcion: string
  pedido: string
  estado: string
  respuesta: string | null
  createdAt: Date
  updatedAt: Date
}

export interface ReclamacionesData {
  items: Reclamacion[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ── EstadoBadge ───────────────────────────────────────────────────────────────

function EstadoBadge({ estado }: { estado: string }) {
  const ok = estado === "RESUELTO"
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider",
      ok ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300"
         : "bg-amber-100 text-amber-700 ring-1 ring-amber-300",
    )}>
      {ok ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
      {ok ? "Resuelto" : "Pendiente"}
    </span>
  )
}

// ── ResolverBtn ───────────────────────────────────────────────────────────────

function ResolverBtn({ id }: { id: number }) {
  const [pending, startTransition] = useTransition()
  return (
    <button
      onClick={() => startTransition(async () => { await resolverReclamacionAction(id) })}
      disabled={pending}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200",
        "bg-emerald-600 text-white shadow-md shadow-emerald-500/20",
        "hover:bg-emerald-700 hover:-translate-y-0.5 hover:shadow-emerald-500/30",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
      )}
    >
      <CheckCircle2 className="h-3.5 w-3.5" />
      {pending ? "Guardando…" : "Marcar como resuelto"}
    </button>
  )
}

// ── ReclamacionCard ───────────────────────────────────────────────────────────

function ReclamacionCard({ r }: { r: Reclamacion }) {
  const ok    = r.estado === "RESUELTO"
  const fecha = new Date(r.createdAt).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-3xl border bg-white/70 backdrop-blur-xl shadow-[0_4px_24px_rgb(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_8px_32px_rgb(0,0,0,0.09)]",
      ok ? "border-emerald-200/60" : "border-amber-200/60",
    )}>
      {/* Barra lateral de color */}
      <div className={cn("absolute bottom-0 left-0 top-0 w-1 rounded-l-3xl", ok ? "bg-emerald-400" : "bg-amber-400")} />

      <div className="px-5 pb-4 pt-5">
        {/* Encabezado: avatar + nombre + chips */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-black",
              ok ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700",
            )}>
              {r.nombres?.[0] ?? "?"}{r.apellidos?.[0] ?? "?"}
            </div>
            <div>
              <p className="text-sm font-extrabold leading-tight text-slate-800">{r.nombres} {r.apellidos}</p>
              <p className="mt-0.5 text-[11px] font-medium text-slate-400">{r.tipoDoc} · {r.nroDoc}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={cn(
              "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
              r.tipo === "RECLAMACION" ? "bg-red-100 text-red-700 ring-1 ring-red-200" : "bg-orange-100 text-orange-700 ring-1 ring-orange-200",
            )}>
              {r.tipo === "RECLAMACION" ? "Reclamación" : "Queja"}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600 ring-1 ring-slate-200">
              {r.tipoBien === "PRODUCTO"
                ? <span className="flex items-center gap-1"><ShoppingBag className="h-2.5 w-2.5" />Producto</span>
                : <span className="flex items-center gap-1"><FileText className="h-2.5 w-2.5" />Servicio</span>}
            </span>
            <EstadoBadge estado={r.estado} />
          </div>
        </div>

        {/* Datos de contacto */}
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" /><span className="truncate">{r.email}</span>
          </div>
          {r.telefono && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" /><span>{r.telefono}</span>
            </div>
          )}
          {r.domicilio && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" /><span className="truncate">{r.domicilio}</span>
            </div>
          )}
        </div>

        <div className="my-4 h-px bg-slate-100" />

        {/* Descripción y pedido */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-1.5 flex items-center gap-1.5">
              <AlertTriangle className="h-3 w-3 text-slate-400" />
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Descripción</p>
            </div>
            <p className="line-clamp-4 text-xs leading-relaxed text-slate-600">{r.descripcion}</p>
          </div>
          <div>
            <div className="mb-1.5 flex items-center gap-1.5">
              <User className="h-3 w-3 text-slate-400" />
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Pedido del consumidor</p>
            </div>
            <p className="line-clamp-4 text-xs leading-relaxed text-slate-600">{r.pedido}</p>
          </div>
        </div>

        {/* Footer: fecha + acción */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] font-medium text-slate-400">Ingresado el {fecha}</p>
          {!ok && <ResolverBtn id={r.id} />}
          {ok && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Resuelto el {new Date(r.updatedAt).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Pagination ────────────────────────────────────────────────────────────────

function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const router       = useRouter()
  const searchParams = useSearchParams()

  function goTo(p: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(p))
    router.push(`?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  return (
    <div className="mt-2 flex items-center justify-center gap-1.5">
      <button onClick={() => goTo(page - 1)} disabled={page <= 1}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-30">
        <ChevronLeft className="h-4 w-4" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button key={p} onClick={() => goTo(p)}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold transition-all",
            p === page
              ? "bg-[#334155] text-white shadow-md shadow-[#334155]/20"
              : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800",
          )}>
          {p}
        </button>
      ))}

      <button onClick={() => goTo(page + 1)} disabled={page >= totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-30">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

// ── ReclamacionesList (export principal) ──────────────────────────────────────

/** Lista paginada de reclamaciones con cards individuales */
export function ReclamacionesList({ data }: { data: ReclamacionesData }) {
  const { items, page, totalPages, total, pageSize } = data
  const start = (page - 1) * pageSize + 1
  const end   = Math.min(page * pageSize, total)

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200/60 bg-white/50 py-24 text-center backdrop-blur-xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
          <FileText className="h-8 w-8" />
        </div>
        <p className="mt-4 text-base font-bold text-slate-600">Sin reclamaciones registradas</p>
        <p className="mt-1 text-sm text-slate-400">Cuando un cliente envíe una reclamación, aparecerá aquí.</p>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 space-y-5 duration-500">
      {/* Info de paginación */}
      <p className="text-xs font-medium text-slate-400">Mostrando {start}–{end} de {total} registros</p>

      {/* Cards con stagger de entrada */}
      <div className="space-y-4">
        {items.map((r, idx) => (
          <div
            key={r.id}
            className="animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "both" }}
          >
            <ReclamacionCard r={r} />
          </div>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} />
    </div>
  )
}

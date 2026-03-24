/**
 * AdminFormHeader — Cabecera estándar para todas las páginas de crear/editar del admin.
 *
 * Provee:
 *  - Botón "Volver" con el label y href correspondiente
 *  - Badge visual que indica si es modo Crear o Editar
 *  - Título de la página + subtítulo opcional
 *
 * Al usar este componente en todas las páginas de formulario se garantiza
 * consistencia visual sin duplicar código de layout.
 */

import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface AdminFormHeaderProps {
  /** Ruta del botón Volver */
  backHref: string
  /** Texto del botón Volver */
  backLabel: string
  /** Título principal (h1) */
  title: string
  /** Subtítulo o contexto extra (ej: "Modificando: Siemens") */
  subtitle?: React.ReactNode
  /** Badge lateral: "Crear" | "Editar" */
  mode?: "crear" | "editar"
}

export function AdminFormHeader({
  backHref,
  backLabel,
  title,
  subtitle,
  mode,
}: AdminFormHeaderProps) {
  return (
    <div className="mb-8">
      {/* Breadcrumb / volver */}
      <Link
        href={backHref}
        className="mb-5 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-700"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        {backLabel}
      </Link>

      {/* Título + badge de modo */}
      <div className="flex items-start gap-3">
        {mode && (
          <span
            className={`mt-1.5 shrink-0 rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
              mode === "editar"
                ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                : "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
            }`}
          >
            {mode}
          </span>
        )}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Separador */}
      <div className="mt-6 h-px bg-slate-200" />
    </div>
  )
}

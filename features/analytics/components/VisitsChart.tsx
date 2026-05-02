"use client"

import { useEffect, useState } from "react"
import { Eye, TrendingUp, Calendar, CalendarDays } from "lucide-react"
import { getViewsStatsAction } from "@/features/analytics/actions"
import type { ViewsStats } from "@/features/analytics/actions"

/** Formatea "YYYY-MM-DD" como "dd/mm" */
function fmtDay(iso: string): string {
  const [, m, d] = iso.split("-")
  return `${d}/${m}`
}

export function VisitsChart() {
  const [stats,   setStats]   = useState<ViewsStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getViewsStatsAction()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const max = stats ? Math.max(...stats.last30Days.map((d) => d.total), 1) : 1

  return (
    <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl">
      {/* Header */}
      <div className="border-b border-slate-200/50 px-6 py-5">
        <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-800">
          <Eye className="h-4 w-4 text-cyan-500" />
          Visitas al sitio
        </h2>
        <p className="mt-0.5 text-xs font-medium text-slate-500">Páginas públicas · últimos 30 días</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1C2870] border-t-transparent" />
        </div>
      ) : !stats ? (
        <div className="py-12 text-center text-sm text-slate-400">Sin datos de visitas aún.</div>
      ) : (
        <>
          {/* Tarjetas de resumen */}
          <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
            <StatPill icon={<CalendarDays className="h-3.5 w-3.5 text-cyan-500" />} label="Hoy"       value={stats.today}     color="text-cyan-600" />
            <StatPill icon={<Calendar     className="h-3.5 w-3.5 text-blue-500" />} label="Este mes"  value={stats.thisMonth}  color="text-blue-600" />
            <StatPill icon={<TrendingUp   className="h-3.5 w-3.5 text-violet-500" />} label="Este año" value={stats.thisYear}  color="text-violet-600" />
          </div>

          {/* Gráfico de barras (30 días) */}
          <div className="px-4 py-4">
            <div className="flex h-28 items-end gap-px">
              {stats.last30Days.map((day) => {
                const pct = max > 0 ? (day.total / max) * 100 : 0
                const isToday = day.date === new Date().toISOString().slice(0, 10)
                return (
                  <div
                    key={day.date}
                    className="group relative flex flex-1 flex-col items-center justify-end"
                    title={`${fmtDay(day.date)}: ${day.total} vista${day.total !== 1 ? "s" : ""}`}
                  >
                    <div
                      className={`w-full min-h-[2px] rounded-t transition-all ${
                        isToday ? "bg-cyan-500" : "bg-[#1C2870]/30 group-hover:bg-[#1C2870]/60"
                      }`}
                      style={{ height: `${Math.max(pct, 2)}%` }}
                    />
                    {/* Tooltip al hover */}
                    {day.total > 0 && (
                      <div className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-bold text-white group-hover:block whitespace-nowrap z-10">
                        {day.total}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            {/* Eje X: primer y último día */}
            <div className="mt-1 flex justify-between text-[9px] text-slate-400">
              <span>{fmtDay(stats.last30Days[0]?.date ?? "")}</span>
              <span className="font-bold text-cyan-600">hoy</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function StatPill({ icon, label, value, color }: {
  icon: React.ReactNode; label: string; value: number; color: string
}) {
  return (
    <div className="flex flex-col items-center py-4">
      <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold text-slate-500">
        {icon}{label}
      </div>
      <span className={`text-2xl font-extrabold tabular-nums ${color}`}>
        {value.toLocaleString("es-PE")}
      </span>
    </div>
  )
}

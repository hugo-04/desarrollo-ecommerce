"use server"

import { db } from "@/lib/db"
import { getSession } from "@/lib/auth/session"

export interface DayStats {
  date:  string  // "YYYY-MM-DD"
  total: number
}

export interface ViewsStats {
  today:      number
  thisMonth:  number
  thisYear:   number
  last30Days: DayStats[]
}

/** Retorna la fecha de hoy como "YYYY-MM-DD" en UTC */
function utcDateStr(d = new Date()) {
  return d.toISOString().slice(0, 10)
}

/** Crea un Date a medianoche UTC de una cadena "YYYY-MM-DD" */
function utcMidnight(iso: string): Date {
  return new Date(`${iso}T00:00:00.000Z`)
}

export async function getViewsStatsAction(): Promise<ViewsStats> {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")

  const todayStr     = utcDateStr()
  const todayStart   = utcMidnight(todayStr)
  const tomorrowStr  = utcDateStr(new Date(todayStart.getTime() + 86_400_000))
  const tomorrowStart = utcMidnight(tomorrowStr)

  const nowY = todayStart.getUTCFullYear()
  const nowM = todayStart.getUTCMonth()
  const monthStart = utcMidnight(`${nowY}-${String(nowM + 1).padStart(2, "0")}-01`)
  const yearStart  = utcMidnight(`${nowY}-01-01`)

  // Día de inicio de la ventana de 30 días (hoy - 29 días)
  const day30Ago = utcMidnight(utcDateStr(new Date(todayStart.getTime() - 29 * 86_400_000)))

  const [todayRows, monthRows, yearRows, last30Rows] = await Promise.all([
    // "Hoy": rango [todayStart, tomorrowStart) — evita problemas con DATE vs TIMESTAMP
    db.dailyView.aggregate({
      where:  { date: { gte: todayStart, lt: tomorrowStart } },
      _sum:   { count: true },
    }),
    db.dailyView.aggregate({
      where:  { date: { gte: monthStart } },
      _sum:   { count: true },
    }),
    db.dailyView.aggregate({
      where:  { date: { gte: yearStart } },
      _sum:   { count: true },
    }),
    db.dailyView.findMany({
      where:   { date: { gte: day30Ago } },
      orderBy: { date: "asc" },
    }),
  ])

  // Agrupar registros por fecha ("YYYY-MM-DD")
  const byDate = new Map<string, number>()
  for (const r of last30Rows) {
    const key = r.date instanceof Date ? r.date.toISOString().slice(0, 10) : String(r.date).slice(0, 10)
    byDate.set(key, (byDate.get(key) ?? 0) + r.count)
  }

  // Serie completa de 30 días (rellena con 0 los días sin visitas)
  const last30Days: DayStats[] = []
  for (let i = 0; i < 30; i++) {
    const ts  = day30Ago.getTime() + i * 86_400_000
    const key = utcDateStr(new Date(ts))
    last30Days.push({ date: key, total: byDate.get(key) ?? 0 })
  }

  return {
    today:     todayRows._sum.count  ?? 0,
    thisMonth: monthRows._sum.count  ?? 0,
    thisYear:  yearRows._sum.count   ?? 0,
    last30Days,
  }
}

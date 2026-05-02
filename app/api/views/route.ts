import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

const ALLOWED_PATHS = /^(\/|\/catalogo|\/nosotros|\/contacto|\/producto\/\d+|\/categoria\/[a-z0-9-]+)$/

/** POST /api/views — Registra (o incrementa) una vista del día para la ruta dada */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const path = typeof body?.path === "string" ? body.path.split("?")[0] : ""

    if (!ALLOWED_PATHS.test(path)) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    await db.dailyView.upsert({
      where:  { path_date: { path, date: today } },
      update: { count: { increment: 1 } },
      create: { path, date: today, count: 1 },
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

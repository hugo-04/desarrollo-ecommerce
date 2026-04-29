/**
 * GET /api/marcas — Endpoint REST público.
 *
 * Devuelve los nombres de marca (sin logo ni ID) para filtros del catálogo.
 * Uso recomendado dentro de la app: `getBrandNamesAction()` directamente.
 * Este endpoint existe para integraciones externas (apps mobile, terceros).
 *
 * Al migrar a DB: solo cambia `features/marcas/actions.ts` — este archivo
 * no necesita modificarse (respeta el principio de inversión de dependencias).
 */

import { NextResponse } from "next/server"
import { log } from "@/lib/logger"
import { getBrandNamesAction } from "@/features/marcas/actions"

export async function GET() {
  try {
    const brands = await getBrandNamesAction()
    return NextResponse.json(brands)
  } catch (error) {
    log.error("[GET /api/marcas]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

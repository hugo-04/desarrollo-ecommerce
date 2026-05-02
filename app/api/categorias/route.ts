/**
 * GET /api/categorias — Endpoint REST público.
 *
 * Uso recomendado dentro de la app: `getCategoriesAction()` directamente.
 * Este endpoint existe para integraciones externas (apps mobile, terceros).
 *
 * Al migrar a DB: solo cambia `features/categorias/actions.ts` — este archivo
 * no necesita modificarse (respeta el principio de inversión de dependencias).
 */

import { NextResponse } from "next/server"
import { log } from "@/lib/logger"
import { getCategoriesAction } from "@/features/categorias/actions"

export async function GET() {
  try {
    const categories = await getCategoriesAction()
    return NextResponse.json(categories)
  } catch (error) {
    log.error("[GET /api/categorias]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

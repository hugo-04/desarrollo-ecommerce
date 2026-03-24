/**
 * GET /api/marcas/carousel — Devuelve solo las marcas con showInCarousel=true.
 *
 * Usado por el home para el carrusel/marquee de marcas.
 * Al migrar a DB: solo cambia `features/marcas/repository.ts` — findCarousel().
 */

import { NextResponse } from "next/server"
import { getBrandsForCarouselAction } from "@/features/marcas/actions"

export async function GET() {
  try {
    const brands = await getBrandsForCarouselAction()
    return NextResponse.json(brands)
  } catch (error) {
    console.error("[GET /api/marcas/carousel]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

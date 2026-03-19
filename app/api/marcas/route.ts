/**
 * GET /api/marcas — API pública REST (para uso externo/mobile futuro).
 * Uso interno: usar getBrandNamesAction() directamente.
 */

import { NextResponse } from "next/server"
import { MockBrandRepository } from "@/features/marcas/repository"
import { BrandService } from "@/features/marcas/service"

const service = new BrandService(new MockBrandRepository())

export async function GET() {
  try {
    const brands = await service.getNames()
    return NextResponse.json(brands)
  } catch (error) {
    console.error("[GET /api/marcas]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * GET /api/marcas
 *
 * Returns the list of brand names available in the product catalog.
 * Used by the catalog filters to populate the brand checkbox list.
 */

import { NextResponse } from "next/server"
import { MockProductRepository } from "@/features/productos/repository"
import { ProductService } from "@/features/productos/service"

const service = new ProductService(new MockProductRepository())

export async function GET() {
  try {
    const brands = await service.getBrandNames()
    return NextResponse.json(brands)
  } catch (error) {
    console.error("[GET /api/marcas]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

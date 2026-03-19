/**
 * GET /api/categorias
 *
 * Returns the full list of product categories.
 *
 * NOTE: The Category type includes an `icon` React component field.
 * When serializing to JSON this field is dropped (functions are not serializable).
 * The frontend resolves the icon from a slug/name mapping.
 * When migrating to DB, store `iconSlug` (string) in the DB instead.
 */

import { NextResponse } from "next/server"
import { MockProductRepository } from "@/features/productos/repository"
import { ProductService } from "@/features/productos/service"

const service = new ProductService(new MockProductRepository())

export async function GET() {
  try {
    const categories = await service.getCategories()

    // Strip non-serializable fields (React component functions)
    const serializable = categories.map(({ icon: _icon, ...rest }) => rest)

    return NextResponse.json(serializable)
  } catch (error) {
    console.error("[GET /api/categorias]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * GET /api/productos/:id
 *
 * Returns a single product by numeric ID.
 * 404 if not found.
 */

import { NextRequest, NextResponse } from "next/server"
import { MockProductRepository } from "@/features/productos/repository"
import { ProductService } from "@/features/productos/service"

const service = new ProductService(new MockProductRepository())

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const productId = Number(id)

    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    const product = await service.getProductById(productId)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("[GET /api/productos/[id]]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

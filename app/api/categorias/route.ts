/**
 * GET /api/categorias — API pública REST (para uso externo/mobile futuro).
 * Uso interno: usar getCategoriesAction() directamente.
 */

import { NextResponse } from "next/server"
import { MockCategoryRepository } from "@/features/categorias/repository"
import { CategoryService } from "@/features/categorias/service"

const service = new CategoryService(new MockCategoryRepository())

export async function GET() {
  try {
    const categories = await service.getAll()
    return NextResponse.json(categories)
  } catch (error) {
    console.error("[GET /api/categorias]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

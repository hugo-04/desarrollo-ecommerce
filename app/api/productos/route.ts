/**
 * GET /api/productos
 *
 * Query params:
 *   cat       - comma-separated category names
 *   brand     - comma-separated brand names
 *   q         - search query
 *   bestSellers - "true" to filter only best sellers
 *   page      - page number (default 1)
 *   limit     - items per page (default 12)
 *   sort      - "az" | "za" | "rating" | "recommended"
 *
 * Currently uses MockProductRepository.
 * To switch to DB: replace MockProductRepository with your ORM-based repository.
 */

import { NextRequest, NextResponse } from "next/server"
import { MockProductRepository } from "@/features/productos/repository"
import { ProductService } from "@/features/productos/service"
import type { ProductFilters } from "@/features/productos/types"

const service = new ProductService(new MockProductRepository())

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl

    const catParam = searchParams.get("cat")
    const brandParam = searchParams.get("brand")

    const filters: ProductFilters = {
      categories: catParam ? catParam.split(",").map((s) => s.trim()) : [],
      brands: brandParam ? brandParam.split(",").map((s) => s.trim()) : [],
      query: searchParams.get("q") ?? "",
      onlyBestSellers: searchParams.get("bestSellers") === "true",
      page: Number(searchParams.get("page") ?? "1"),
      limit: Number(searchParams.get("limit") ?? "12"),
      sortBy: (searchParams.get("sort") as ProductFilters["sortBy"]) ?? "recommended",
    }

    const result = await service.getCatalog(filters)

    return NextResponse.json(result)
  } catch (error) {
    console.error("[GET /api/productos]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * GET /api/productos — Endpoint REST público del catálogo.
 *
 * Uso recomendado dentro de la app: `getCatalogAction()` directamente.
 * Este endpoint existe para integraciones externas (apps mobile, terceros).
 *
 * Query params:
 *   cat         — nombres de categoría separados por coma
 *   brand       — nombres de marca separados por coma
 *   q           — texto de búsqueda libre
 *   bestSellers — "true" para solo más vendidos
 *   page        — número de página (default: 1)
 *   limit       — ítems por página (default: 12, max: 100)
 *   sort        — "az" | "za" | "rating" | "recommended"
 *
 * Al migrar a DB: solo cambia `features/productos/actions.ts` — este archivo
 * no necesita modificarse (respeta el principio de inversión de dependencias).
 */

import { NextRequest, NextResponse } from "next/server"
import { getCatalogAction } from "@/features/productos/actions"
import type { ProductFilters } from "@/features/productos/types"

/** Valores válidos para el parámetro `sort` */
const VALID_SORT = new Set<ProductFilters["sortBy"]>(["recommended", "az", "za", "rating"])

/** Límite máximo de ítems por página para evitar queries masivas */
const MAX_LIMIT = 100

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl

    const catParam   = searchParams.get("cat")
    const brandParam = searchParams.get("brand")
    const sortParam  = searchParams.get("sort") as ProductFilters["sortBy"] | null

    // Validar y sanear parámetros numéricos
    const page  = Math.max(1, Number(searchParams.get("page")  ?? "1")  || 1)
    const limit = Math.min(MAX_LIMIT, Math.max(1, Number(searchParams.get("limit") ?? "12") || 12))

    const filters: ProductFilters = {
      categories:     catParam   ? catParam.split(",").map((s) => s.trim()).filter(Boolean) : [],
      brands:         brandParam ? brandParam.split(",").map((s) => s.trim()).filter(Boolean) : [],
      query:          searchParams.get("q") ?? "",
      onlyBestSellers: searchParams.get("bestSellers") === "true",
      page,
      limit,
      // Solo acepta valores del enum; cualquier otro cae a "recommended"
      sortBy: sortParam && VALID_SORT.has(sortParam) ? sortParam : "recommended",
    }

    const result = await getCatalogAction(filters)
    return NextResponse.json(result)
  } catch (error) {
    console.error("[GET /api/productos]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

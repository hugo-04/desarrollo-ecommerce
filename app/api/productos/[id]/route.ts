/**
 * GET /api/productos/:id — Devuelve un producto por ID numérico.
 *
 * Uso recomendado dentro de la app: `getProductAction(id)` directamente.
 * Este endpoint existe para integraciones externas (apps mobile, terceros).
 *
 * Respuestas:
 *   200 — producto encontrado
 *   400 — ID inválido (no numérico o ≤ 0)
 *   404 — producto no encontrado
 *   500 — error interno
 *
 * Al migrar a DB: solo cambia `features/productos/actions.ts` — este archivo
 * no necesita modificarse (respeta el principio de inversión de dependencias).
 */

import { NextRequest, NextResponse } from "next/server"
import { getProductAction } from "@/features/productos/actions"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const productId = Number(id)

    if (!id || isNaN(productId) || productId < 1) {
      return NextResponse.json({ error: "ID de producto inválido" }, { status: 400 })
    }

    const product = await getProductAction(productId)

    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("[GET /api/productos/[id]]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

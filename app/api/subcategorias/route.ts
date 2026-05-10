/**
 * GET /api/subcategorias — Endpoint REST público.
 *
 * Retorna todas las subcategorías con imagen, SEO y categorías asociadas.
 * Agrega ?withProducts=true para incluir los productos relacionados.
 *
 * Uso recomendado dentro de la app: `getSubcategoriesAction()` directamente.
 * Este endpoint existe para integraciones externas (apps mobile, terceros).
 */

import { NextRequest, NextResponse } from "next/server"
import { log } from "@/lib/logger"
import { db } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const withProducts = req.nextUrl.searchParams.get("withProducts") === "true"

    const rows = await db.subcategory.findMany({
      orderBy: { name: "asc" },
      include: {
        categories: { select: { id: true, name: true, slug: true } },
        ...(withProducts
          ? {
              products: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  imageAlt: true,
                  description: true,
                  featured: true,
                  bestSeller: true,
                },
              },
            }
          : {}),
      },
    })

    const data = rows.map((s: any) => ({
      id:          s.id,
      name:        s.name,
      slug:        s.slug,
      image:       s.image,
      imageAlt:    s.imageAlt   ?? undefined,
      imageTitle:  s.imageTitle ?? undefined,
      description: s.description,
      keywords:    s.keywords,
      categories:  s.categories,
      ...(withProducts ? { products: s.products } : {}),
      createdAt:   s.createdAt instanceof Date ? s.createdAt.toISOString() : s.createdAt,
      updatedAt:   s.updatedAt instanceof Date ? s.updatedAt.toISOString() : s.updatedAt,
    }))

    return NextResponse.json(data)
  } catch (error) {
    log.error("[GET /api/subcategorias]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

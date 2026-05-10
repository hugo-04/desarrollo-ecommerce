/**
 * GET /api/categorias — Endpoint REST público.
 *
 * Retorna todas las categorías con imagen, SEO y subcategorías asociadas.
 * Agrega ?withProducts=true para incluir los productos relacionados.
 *
 * Uso recomendado dentro de la app: `getCategoriesAction()` directamente.
 * Este endpoint existe para integraciones externas (apps mobile, terceros).
 */

import { NextRequest, NextResponse } from "next/server"
import { log } from "@/lib/logger"
import { db } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const withProducts = req.nextUrl.searchParams.get("withProducts") === "true"

    const rows = await db.category.findMany({
      orderBy: { count: "desc" },
      include: {
        subs: true,
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
                  subcategoryId: true,
                },
              },
            }
          : {}),
      },
    })

    const data = rows.map((c: any) => ({
      id:              c.id,
      name:            c.name,
      slug:            c.slug,
      image:           c.image,
      imageAlt:        c.imageAlt    ?? undefined,
      imageTitle:      c.imageTitle  ?? undefined,
      description:     c.description ?? undefined,
      keywords:        c.keywords,
      count:           c.count,
      featured:        c.featured,
      subcategories:   c.subs.map((s: any) => s.name),
      subcategoryItems: c.subs.map((s: any) => ({
        id:         s.id,
        name:       s.name,
        slug:       s.slug,
        image:      s.image,
        imageAlt:   s.imageAlt   ?? undefined,
        imageTitle: s.imageTitle ?? undefined,
      })),
      ...(withProducts ? { products: c.products } : {}),
      createdAt:       c.createdAt instanceof Date ? c.createdAt.toISOString() : c.createdAt,
      updatedAt:       c.updatedAt instanceof Date ? c.updatedAt.toISOString() : c.updatedAt,
    }))

    return NextResponse.json(data)
  } catch (error) {
    log.error("[GET /api/categorias]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

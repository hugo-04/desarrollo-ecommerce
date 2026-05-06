import type { MetadataRoute } from "next"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

const BASE_URL = "https://insumind.pe"

// Fecha fija para páginas cuyo contenido no cambia con cada request.
// Actualizar manualmente cuando se edite el contenido de esas páginas.
const SITE_LAUNCH = new Date("2026-06-06")

// Solo las páginas indexables (noindex excluidas: /terminos, /politica-privacidad, /libro-reclamaciones)
// Google ignora priority y changeFrequency — solo <loc> y <lastmod> son relevantes.
const staticPages: MetadataRoute.Sitemap = [
  { url: BASE_URL,                    lastModified: SITE_LAUNCH },
  { url: `${BASE_URL}/catalogo`,      lastModified: SITE_LAUNCH },
  { url: `${BASE_URL}/nosotros`,      lastModified: SITE_LAUNCH },
  { url: `${BASE_URL}/contacto`,      lastModified: SITE_LAUNCH },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [products, categories] = await Promise.all([
      db.product.findMany({ select: { id: true, updatedAt: true } }),
      db.category.findMany({ select: { slug: true, updatedAt: true } }),
    ])

    const productPages: MetadataRoute.Sitemap = products.map((p: { id: any; updatedAt: any }) => ({
      url: `${BASE_URL}/producto/${p.id}`,
      lastModified: p.updatedAt,
    }))

    const categoryPages: MetadataRoute.Sitemap = categories.map((c: { slug: any; updatedAt: any }) => ({
      url: `${BASE_URL}/categoria/${c.slug}`,
      lastModified: c.updatedAt,
    }))

    return [...staticPages, ...categoryPages, ...productPages]
  } catch {
    return staticPages
  }
}

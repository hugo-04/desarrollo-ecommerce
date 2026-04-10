import type { MetadataRoute } from "next"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

const BASE_URL = "https://electrothina.com"

const staticPages: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/catalogo`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/nosotros`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/contacto`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/libro-reclamaciones`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    url: `${BASE_URL}/terminos`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/politica-privacidad`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [products, categories] = await Promise.all([
      db.product.findMany({ select: { id: true, updatedAt: true } }),
      db.category.findMany({ select: { slug: true, updatedAt: true } }),
    ])

    const productPages: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${BASE_URL}/producto/${p.id}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }))

    const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
      url: `${BASE_URL}/catalogo?categoria=${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }))

    return [...staticPages, ...categoryPages, ...productPages]
  } catch {
    // Si la DB no está disponible, retorna solo las páginas estáticas
    return staticPages
  }
}

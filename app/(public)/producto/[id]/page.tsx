/**
 * /producto/[id] — Server Component de detalle de producto.
 *
 * Llama a la server action en vez de instanciar el repositorio directamente,
 * respetando el principio de inversión de dependencias (DIP):
 * la página no sabe si los datos vienen de mock, DB o API externa.
 *
 * Al migrar a DB: solo cambia `features/productos/actions.ts`.
 */

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ProductoView } from "@/components/views/ProductoView"
import { getProductAction, getRelatedProductsAction } from "@/features/productos/actions"
import { generateProductMeta, buildProductSchema, SITE_URL } from "@/lib/seo"
import { PageViewTracker } from "@/components/analytics/PageViewTracker"

export const revalidate = 3600

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const numId   = Number(id)
  if (!id || isNaN(numId) || numId < 1) return {}

  const product = await getProductAction(numId)
  if (!product) return {}

  return generateProductMeta({ ...product, keywords: product.keywords })
}

export default async function ProductoPage({ params }: PageProps) {
  const { id } = await params
  const numId  = Number(id)

  // Rechazar IDs inválidos antes de consultar
  if (!id || isNaN(numId) || numId < 1) notFound()

  const product = await getProductAction(numId)
  if (!product) notFound()

  // Fetch en servidor para que Google vea los links en el HTML inicial
  const initialRelated = await getRelatedProductsAction(numId, product.category)

  const productSchema = buildProductSchema({ ...product, keywords: product.keywords })

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio",   item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Catálogo", item: `${SITE_URL}/catalogo` },
      { "@type": "ListItem", position: 3, name: product.category, item: product.categorySlug ? `${SITE_URL}/categoria/${product.categorySlug}` : `${SITE_URL}/catalogo?categoria=${encodeURIComponent(product.category)}` },
      { "@type": "ListItem", position: 4, name: product.name,     item: `${SITE_URL}/producto/${product.id}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageViewTracker path={`/producto/${product.id}`} />
      <ProductoView product={product} initialRelatedProducts={initialRelated} />
    </>
  )
}

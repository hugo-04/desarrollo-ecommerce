import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ProductoView } from "@/components/views/ProductoView"
import { getProductAction, getRelatedProductsAction } from "@/features/productos/actions"
import { generateProductMeta, buildProductSchema, SITE_URL } from "@/lib/seo"
import { PageViewTracker } from "@/components/analytics/PageViewTracker"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string; slug: string }>
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

  if (!id || isNaN(numId) || numId < 1) notFound()

  const product = await getProductAction(numId)
  if (!product) notFound()

  const initialRelated = await getRelatedProductsAction(numId, product.category)

  const productSchema = buildProductSchema({ ...product, keywords: product.keywords })

  const canonicalUrl = `${SITE_URL}/producto/${product.id}/${product.slug ?? ""}`

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio",   item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Catálogo", item: `${SITE_URL}/catalogo` },
      { "@type": "ListItem", position: 3, name: product.category, item: product.categorySlug ? `${SITE_URL}/categoria/${product.categorySlug}` : `${SITE_URL}/catalogo` },
      { "@type": "ListItem", position: 4, name: product.name, item: canonicalUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageViewTracker path={`/producto/${product.id}`} />
      <ProductoView product={product} initialRelatedProducts={initialRelated} />
    </>
  )
}

/**
 * /categoria/[slug] — Página pública de categoría.
 *
 * Thin shell (SRP):
 *  - generateMetadata: metadatos SEO de la categoría
 *  - Fetch de category + products en paralelo
 *  - JSON-LD schemas (BreadcrumbList, CategorySchema, FAQPage)
 *  - Renderiza CategoriaView con los datos obtenidos
 */

import { notFound }              from "next/navigation"
import type { Metadata }         from "next"
import { getCategoryBySlugAction } from "@/features/categorias/actions"
import { getCatalogAction }      from "@/features/productos/actions"
import { generateCategoryMeta, buildCategorySchema, SITE_URL } from "@/lib/seo"
import { CategoriaView }         from "@/features/categorias/components/CategoriaView"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ slug: string }>
}

// ── Metadatos SEO ──────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlugAction(slug)
  if (!category) return {}
  return generateCategoryMeta(category)
}

// ── Página ─────────────────────────────────────────────────────────────────────

export default async function CategoriaPage({ params }: PageProps) {
  const { slug } = await params

  const category = await getCategoryBySlugAction(slug)
  if (!category) notFound()

  const { data: products } = await getCatalogAction({
    categories: [category.name],
    page: 1,
    limit: 12,
  })

  // ── Schemas JSON-LD ──────────────────────────────────────────────────────────

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio",   item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Catálogo", item: `${SITE_URL}/catalogo` },
      { "@type": "ListItem", position: 3, name: category.name, item: `${SITE_URL}/categoria/${category.slug}` },
    ],
  }

  const categorySchema = buildCategorySchema(category, products.map((p) => p.name))

  // FAQPage — genera rich snippets si hay ≥ 2 subcategorías
  const faqSchema = category.subcategories.length >= 2 ? {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `¿Qué tipos de ${category.name} tienen disponibles?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Lorem ipsum dolor sit amet: ${category.subcategories.join(", ")}. Lorem ipsum consectetur adipiscing elit sed do eiusmod tempor.`,
        },
      },
      {
        "@type": "Question",
        name: `¿Lorem ipsum ${category.name} dolor sit amet consectetur?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ${category.name}.`,
        },
      },
      {
        "@type": "Question",
        name: `¿Lorem ipsum dolor ${category.name} sit amet adipiscing?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum quis nostrud exercitation.`,
        },
      },
    ],
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <CategoriaView category={category} products={products} />
    </>
  )
}

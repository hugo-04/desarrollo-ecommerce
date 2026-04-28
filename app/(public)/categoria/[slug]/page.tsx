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
          text: `Contamos con: ${category.subcategories.join(", ")}. Consulte nuestro catálogo para ver disponibilidad y especificaciones técnicas de cada variante.`,
        },
      },
      {
        "@type": "Question",
        name: `¿Cómo puedo solicitar una cotización de ${category.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Puede solicitar una cotización de ${category.name} a través de nuestro formulario de contacto o por WhatsApp. Nuestro equipo le responderá con precios y disponibilidad a la brevedad.`,
        },
      },
      {
        "@type": "Question",
        name: `¿Los productos de ${category.name} cuentan con garantía?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Sí, todos nuestros productos de ${category.name} cuentan con garantía del fabricante. Puede consultar los detalles en la ficha técnica descargable de cada producto.`,
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

/**
 * /marca/[nombre] — Página pública de una marca.
 *
 * - generateMetadata: SEO dinámico con logo, description y título
 * - SSR del primer lote de productos filtrado por marca
 * - JSON-LD: BreadcrumbList + CollectionPage + FAQPage
 * - MarcaView (client) gestiona la paginación
 */

import { notFound }               from "next/navigation"
import type { Metadata }           from "next"
import { getBrandByNameAction }    from "@/features/marcas/actions"
import { getCatalogAction }        from "@/features/productos/actions"
import { generateBrandMeta, buildBrandSchema, SITE_URL } from "@/lib/seo"
import { MarcaView }               from "@/features/marcas/components/MarcaView"
import { PageViewTracker }         from "@/components/analytics/PageViewTracker"

export const dynamic = "force-dynamic"

const LIMIT = 20

interface PageProps {
  params: Promise<{ nombre: string }>
}

// ── Metadatos SEO ──────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { nombre } = await params
  const brand = await getBrandByNameAction(decodeURIComponent(nombre))
  if (!brand) return {}
  return generateBrandMeta(brand)
}

// ── Página ─────────────────────────────────────────────────────────────────────

export default async function MarcaPage({ params }: PageProps) {
  const { nombre } = await params
  const brandName  = decodeURIComponent(nombre)

  const brand = await getBrandByNameAction(brandName)
  if (!brand) notFound()

  const { data: initialProducts, total, totalPages } = await getCatalogAction({
    brands: [brand.name],
    page:   1,
    limit:  LIMIT,
  })

  // ── Schemas JSON-LD ──────────────────────────────────────────────────────────

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio",  item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Marcas",  item: `${SITE_URL}/marcas` },
      { "@type": "ListItem", position: 3, name: brand.name, item: `${SITE_URL}/marca/${encodeURIComponent(brand.name)}` },
    ],
  }

  const brandSchema = buildBrandSchema(brand, initialProducts.map((p) => p.name))

  const faqSchema = total > 0 ? {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `¿Dónde comprar productos ${brand.name} en Lima?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `En Insumind Perú encontrará productos originales ${brand.name} con stock permanente en Lima. Distribuimos en toda la ciudad y realizamos despachos a provincias. Contáctenos para cotización inmediata.`,
        },
      },
      {
        "@type": "Question",
        name: `¿Los productos ${brand.name} son originales?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Sí. Insumind Perú S.A.C. distribuye únicamente productos ${brand.name} originales con garantía de fábrica. Podemos entregar certificados de autenticidad y fichas técnicas con cada pedido.`,
        },
      },
      {
        "@type": "Question",
        name: `¿Cómo solicitar una cotización de ${brand.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Puede solicitar cotización de productos ${brand.name} por WhatsApp, mediante nuestro formulario de Contacto o escribiéndonos directamente. Respondemos en menos de 24 horas hábiles con precios y disponibilidad.`,
        },
      },
    ],
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <PageViewTracker path={`/marca/${encodeURIComponent(brand.name)}`} />

      <MarcaView
        brand={brand}
        initialProducts={initialProducts}
        initialTotal={total}
        initialTotalPages={totalPages}
      />
    </>
  )
}

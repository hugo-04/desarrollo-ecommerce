import { Suspense } from "react"
import type { Metadata } from "next"
import { SEO, SITE_URL, SITE_NAME, generateCategoryMeta, buildCategorySchema } from "@/lib/seo"
import { CatalogoView } from "@/components/views/CatalogoView"
import { PageViewTracker } from "@/components/analytics/PageViewTracker"
import { cache } from "react"
import { getActiveFilterOptionsAction } from "@/features/categorias/actions"

// cache() deduplica llamadas idénticas dentro del mismo request (generateMetadata + component)
const getFilterOptions = cache(getActiveFilterOptionsAction)

export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{ categoria?: string; q?: string; bestSellers?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { categoria } = await searchParams
  if (!categoria) return SEO.catalogo

  const { categories } = await getFilterOptions()
  const cat = categories.find((c) => c.name === categoria)
  return cat ? generateCategoryMeta(cat) : SEO.catalogo
}

export default async function CatalogoPage({ searchParams }: PageProps) {
  const params = await searchParams

  const { categories, brandNames } = await getFilterOptions()

  // Schema dinámico: si hay categoría activa → CollectionPage, si no → BreadcrumbList del catálogo
  const selectedCat = params.categoria
    ? categories.find((c) => c.name === params.categoria)
    : null

  const pageSchema = selectedCat
    ? buildCategorySchema(selectedCat)
    : {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `Catálogo de Ferretería Eléctrica AT/MT — ${SITE_NAME}`,
        description: "Herrajes, aisladores, conectores y accesorios eléctricos certificados IEC, ANSI y NTP. Stock permanente en Lima, Perú.",
        url: `${SITE_URL}/catalogo`,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio",   item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Catálogo", item: `${SITE_URL}/catalogo` },
          ],
        },
      }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <PageViewTracker path="/catalogo" />
      <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
        <CatalogoView
          initialCategory={params.categoria}
          initialQuery={params.q}
          initialBestSellers={params.bestSellers === "true"}
          initialCategories={categories}
          initialBrands={brandNames}
        />
      </Suspense>
    </>
  )
}

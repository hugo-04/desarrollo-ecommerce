import { Suspense } from "react"
import type { Metadata } from "next"
import { SEO, SITE_URL, SITE_NAME, generateCategoryMeta, buildCategorySchema } from "@/lib/seo"
import { CatalogoView } from "@/components/views/CatalogoView"
import { cache } from "react"
import { getCategoriesAction } from "@/features/categorias/actions"
import { getBrandNamesAction } from "@/features/marcas/actions"

// cache() deduplica llamadas idénticas dentro del mismo request (generateMetadata + component)
const getCategories = cache(getCategoriesAction)

export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{ categoria?: string; q?: string; bestSellers?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { categoria } = await searchParams
  if (!categoria) return SEO.catalogo

  const cats = await getCategories()
  const cat  = cats.find((c) => c.name === categoria)
  return cat ? generateCategoryMeta(cat) : SEO.catalogo
}

export default async function CatalogoPage({ searchParams }: PageProps) {
  const params = await searchParams

  const [categories, brandNames] = await Promise.all([
    getCategories(),
    getBrandNamesAction(),
  ])

  // Schema dinámico: si hay categoría activa → CollectionPage, si no → BreadcrumbList del catálogo
  const selectedCat = params.categoria
    ? categories.find((c) => c.name === params.categoria)
    : null

  const pageSchema = selectedCat
    ? buildCategorySchema(selectedCat)
    : {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `Catálogo — ${SITE_NAME}`,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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

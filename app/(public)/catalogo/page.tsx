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

  const { categories, brands } = await getFilterOptions()

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
      <PageViewTracker path="/catalogo" />

      {/* Intro editorial — renderizado en servidor para indexación por Google */}
      {!params.categoria && !params.q && !params.bestSellers && (
        <div className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-5">
            <p className="max-w-3xl text-sm leading-relaxed text-slate-500">
              Catálogo completo de ferretería eléctrica para alta y media tensión (AT/MT) en Lima, Perú.
              Distribuimos <strong className="font-semibold text-slate-700">herrajes, aisladores eléctricos, conectores bimetálicos, pernos galvanizados, grapas y abrazaderas</strong> para
              postes de concreto y madera, certificados bajo normas IEC, ANSI y NTP.
              Stock permanente para concesionarias eléctricas, contratistas y proyectos de distribución eléctrica.
              Despacho en Lima en 24–48 h; envíos a todo el Perú.
            </p>
          </div>
        </div>
      )}

      <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
        <CatalogoView
          initialCategory={params.categoria}
          initialQuery={params.q}
          initialBestSellers={params.bestSellers === "true"}
          initialCategories={categories}
          initialBrands={brands}
        />
      </Suspense>
    </>
  )
}

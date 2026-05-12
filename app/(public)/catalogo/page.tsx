import { Suspense } from "react"
import type { Metadata } from "next"
import { SEO, SITE_URL, SITE_NAME, generateCategoryMeta, buildCategorySchema } from "@/lib/seo"
import { CatalogoView } from "@/components/views/CatalogoView"
import { PageViewTracker } from "@/components/analytics/PageViewTracker"
import { cache } from "react"
import { getActiveFilterOptionsAction } from "@/features/categorias/actions"
import { getCatalogAction } from "@/features/productos/actions"

// cache() deduplica llamadas idénticas dentro del mismo request (generateMetadata + component)
const getFilterOptions = cache(getActiveFilterOptionsAction)

// ISR: revalida cada hora — datos del catálogo no cambian por segundo
export const revalidate = 3600

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
  const hasFilters = params.categoria || params.q || params.bestSellers

  // Fetch en paralelo: filtros + primera página de productos (sin filtros activos)
  const [{ categories }, initialProducts] = await Promise.all([
    getFilterOptions(),
    hasFilters ? Promise.resolve(undefined) : getCatalogAction({ page: 1, limit: 24 }),
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
        description: "Catálogo de insumos industriales y mineros originales en Lima, Perú. Rodamientos, filtros, válvulas, correas y componentes hidráulicos de marcas SKF, Parker, Gates, Donaldson y más. Stock permanente y entrega al día siguiente.",
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
              Catálogo completo de insumos industriales y mineros en Lima, Perú.
              Distribuimos <strong className="font-semibold text-slate-700">rodamientos, filtros, válvulas, correas y componentes hidráulicos</strong>{" "}
              100% originales con garantía de fábrica para minería, construcción, manufactura y pesca.
              Marcas SKF, Timken, Parker, Gates, Donaldson, Kitz y más.
              Stock permanente en Lima — entrega al día siguiente de confirmado tu depósito. Despacho nacional.
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
          initialProducts={initialProducts ?? undefined}
        />
      </Suspense>
    </>
  )
}

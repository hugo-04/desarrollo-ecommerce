import { SEO, SITE_URL, SITE_NAME } from "@/lib/seo"
import { HomeView } from "@/components/views/HomeView"
import { getFeaturedCategoriesAction } from "@/features/categorias/actions"
import { getBrandsForCarouselAction } from "@/features/marcas/actions"
import { PageViewTracker } from "@/components/analytics/PageViewTracker"

export const dynamic = "force-dynamic"
export const metadata = SEO.home

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: "Insumind Perú S.A.C. distribuye rodamientos, filtros, válvulas, correas y componentes hidráulicos originales para minería e industria en Lima, Perú. Marcas SKF, Parker, Gates, Timken.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/catalogo?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

export default async function HomePage() {
  const [categories, brands] = await Promise.all([
    getFeaturedCategoriesAction(),
    getBrandsForCarouselAction(),
  ])
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <PageViewTracker path="/" />
      <HomeView categories={categories} brands={brands} />
    </>
  )
}

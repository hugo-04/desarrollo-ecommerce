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
  description: "Fabricantes de ferretería eléctrica AT/MT en Lima, Perú. Aisladores, herrajes, conectores y accesorios certificados IEC, ANSI y NTP.",
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
      {/* Preload banner LCP — descubierto en el HTML inicial sin esperar JS (elimina ~1200ms de retraso) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <link rel="preload" as="image" media="(max-width: 799px)"
        // @ts-ignore
        imageSrcSet="/_next/image?url=%2Fbanner.jpg&w=640&q=60 640w,/_next/image?url=%2Fbanner.jpg&w=750&q=60 750w,/_next/image?url=%2Fbanner.jpg&w=828&q=60 828w"
        imageSizes="100vw"
        fetchPriority="high"
      />
      <link rel="preload" as="image" media="(min-width: 800px)"
        // @ts-ignore
        imageSrcSet="/_next/image?url=%2Fbanner.jpg&w=1080&q=60 1080w,/_next/image?url=%2Fbanner.jpg&w=1200&q=60 1200w,/_next/image?url=%2Fbanner.jpg&w=1366&q=60 1366w,/_next/image?url=%2Fbanner.jpg&w=1440&q=60 1440w,/_next/image?url=%2Fbanner.jpg&w=1920&q=60 1920w"
        imageSizes="100vw"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <PageViewTracker path="/" />
      <HomeView categories={categories} brands={brands} />
    </>
  )
}

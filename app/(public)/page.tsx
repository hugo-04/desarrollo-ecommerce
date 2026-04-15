import { SEO, SITE_URL, SITE_NAME } from "@/lib/seo"
import { HomeView } from "@/components/views/HomeView"
import { getFeaturedCategoriesAction } from "@/features/categorias/actions"

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
  const categories = await getFeaturedCategoriesAction()
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <HomeView categories={categories} />
    </>
  )
}

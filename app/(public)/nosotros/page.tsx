import { SEO, SITE_URL, SITE_NAME } from "@/lib/seo"
import { NosotrosView } from "@/components/views/NosotrosView"

export const metadata = SEO.nosotros

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `Sobre Nosotros — ${SITE_NAME}`,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  url: `${SITE_URL}/nosotros`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Sobre Nosotros", item: `${SITE_URL}/nosotros` },
    ],
  },
}

export default function NosotrosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <NosotrosView />
    </>
  )
}

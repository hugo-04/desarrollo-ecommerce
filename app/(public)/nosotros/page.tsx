import { SEO, SITE_URL, SITE_NAME } from "@/lib/seo"
import { NosotrosView } from "@/components/views/NosotrosView"

export const metadata = SEO.nosotros

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/nosotros#webpage`,
  name: `Sobre Nosotros — ${SITE_NAME}`,
  description: "Insumind es distribuidor de materiales eléctricos para alta y media tensión en Lima, Perú. Fundada en 2010 con más de 15 años de experiencia en el sector eléctrico peruano. Cumple normas ISO, IEC, ANSI y NTP, y atiende concesionarias eléctricas, contratistas y proyectos mineros en todo el Perú.",
  url: `${SITE_URL}/nosotros`,
  inLanguage: "es-PE",
  about: {
    "@type":  "Organization",
    "@id":    `${SITE_URL}/#organization`,
    name:     "Insumind",
    foundingDate: "2010",
    taxID:    "20609410711",
  },
  publisher: { "@id": `${SITE_URL}/#organization` },
  mentions: [
    { "@type": "Thing", name: "Ferretería eléctrica AT/MT" },
    { "@type": "Thing", name: "Aisladores de porcelana IEC ANSI" },
    { "@type": "Thing", name: "Conectores bimetálicos aluminio cobre" },
    { "@type": "Thing", name: "Herrajes galvanizados para postes de concreto" },
    { "@type": "Thing", name: "Distribución eléctrica Perú" },
    { "@type": "Organization", name: "OSINERGMIN" },
  ],
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio",         item: SITE_URL },
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

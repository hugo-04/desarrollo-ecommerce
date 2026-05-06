import { SEO, SITE_URL, SITE_NAME } from "@/lib/seo"
import { NosotrosView } from "@/components/views/NosotrosView"

export const metadata = SEO.nosotros

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/nosotros#webpage`,
  name: `Sobre Nosotros — ${SITE_NAME}`,
  description: "Insumind Perú S.A.C. es una empresa peruana especializada en la distribución de insumos industriales y mineros de alta calidad. Distribuimos rodamientos, filtros, válvulas, correas y componentes hidráulicos de marcas líderes: SKF, Timken, Parker, Gates, Donaldson, Kitz. Todos originales, todos con garantía de fábrica. Stock permanente en Lima y despacho nacional.",
  url: `${SITE_URL}/nosotros`,
  inLanguage: "es-PE",
  about: {
    "@type":  "Organization",
    "@id":    `${SITE_URL}/#organization`,
    name:     "Insumind Perú S.A.C.",
    legalName: "Insumind Perú S.A.C.",
    alternateName: ["INSUMIND", "Insumos Mineros Industriales"],
    slogan: "Garantía y Confianza en cada Insumo",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle 55 Mz WW2 Lote 13, La Floresta de Pro",
      addressLocality: "Los Olivos",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    email: "ventas@insumindperu.pe",
    url: "https://insumindperu.pe",
  },
  publisher: { "@id": `${SITE_URL}/#organization` },
  mentions: [
    { "@type": "Thing", name: "Rodamientos industriales SKF Timken INA NSK FAG" },
    { "@type": "Thing", name: "Filtros industriales Donaldson Fleetguard Caterpillar" },
    { "@type": "Thing", name: "Válvulas industriales Kitz Bray KSB Velan" },
    { "@type": "Thing", name: "Correas industriales Gates Optibelt Continental" },
    { "@type": "Thing", name: "Componentes hidráulicos Parker Rexroth Yuken" },
    { "@type": "Thing", name: "Insumos para minería en Perú" },
    { "@type": "Thing", name: "Distribución de insumos industriales Lima" },
  ],
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio",     item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Nosotros",   item: `${SITE_URL}/nosotros` },
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

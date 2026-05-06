import { SEO, SITE_URL, SITE_NAME } from "@/lib/seo"
import { ContactoView } from "@/components/views/ContactoView"

export const metadata = SEO.contacto

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contacto — ${SITE_NAME}`,
  description: "Cotización inmediata de insumos industriales y mineros en Lima, Perú. Rodamientos, filtros, válvulas, correas y componentes hidráulicos originales. Respuesta en menos de 2 horas. Insumind Perú S.A.C.",
  url: `${SITE_URL}/contacto`,
  inLanguage: "es-PE",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio",   item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contacto", item: `${SITE_URL}/contacto` },
    ],
  },
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Insumind Perú S.A.C.",
    url: SITE_URL,
    email: "ventas@insumindperu.pe",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle 55 Mz WW2 Lote 13, La Floresta de Pro",
      addressLocality: "Los Olivos",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
  },
}

export default function ContactoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContactoView />
    </>
  )
}

import { SEO, SITE_URL, SITE_NAME } from "@/lib/seo"
import { ContactoView } from "@/components/views/ContactoView"

export const metadata = SEO.contacto

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Cotizaciones y Asesoría Técnica AT/MT — ${SITE_NAME}`,
  description: "Solicita cotización de ferretería eléctrica AT/MT en Lima. Ingenieros especializados disponibles. Respondemos en menos de 24 h.",
  url: `${SITE_URL}/contacto`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contacto", item: `${SITE_URL}/contacto` },
    ],
  },
  mainEntity: {
    "@type": "Organization",
    name: "Electro Thina S.A.C.",
    telephone: "+51981375196",
    email: "electrothina522@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Guillermo Dansey N° 481 - Int. 143 - C.C. Loreto",
      addressLocality: "Lima",
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

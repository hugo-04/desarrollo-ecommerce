import { SEO, SITE_URL, SITE_NAME } from "@/lib/seo"
import { ContactoView } from "@/components/views/ContactoView"

export const metadata = SEO.contacto

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contacto — ${SITE_NAME}`,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
    name: "Lorem Ipsum S.A.C.",
    telephone: "+00000000000",
    email: "lorem@ipsum.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lorem Ipsum N° 000 - Int. 000",
      addressLocality: "Lorem",
      addressRegion: "Ipsum",
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

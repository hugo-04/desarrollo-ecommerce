/**
 * SEO — Fuente única de verdad para toda la metadata del sitio.
 *
 * Edita este archivo para actualizar títulos, descripciones y
 * Open Graph en todas las páginas públicas a la vez.
 */

import type { Metadata } from "next"

// ─── Configuración base ────────────────────────────────────────────────────────

export const SITE_URL  = "https://lorem-ipsum.com"
export const SITE_NAME = "Lorem Ipsum"

/** Imagen OG por defecto — redes sociales y WhatsApp */
const OG_IMAGE = `${SITE_URL}/logo/logotipo.png`

/**
 * Keyword principal del negocio — frase corta y real que la gente busca.
 * Aparece en todas las descripciones y schema.
 */
const KW_CORE = "Lorem ipsum dolor sit amet"

const KW_SECONDARY = [
  "lorem ipsum dolor sit amet consectetur",
  "lorem ipsum adipiscing elit sed do",
  "lorem ipsum eiusmod tempor incididunt",
  "lorem ipsum labore et dolore magna",
  "lorem ipsum aliqua ut enim ad",
  "lorem ipsum minim veniam quis nostrud",
  "lorem ipsum exercitation ullamco laboris",
  "lorem ipsum nisi ut aliquip commodo",
  "lorem ipsum consequat duis aute irure",
  "lorem ipsum reprehenderit voluptate velit",
  "Lorem Ipsum SAC",
  "lorem ipsum cotización",
]

const defaultOG = {
  siteName: SITE_NAME,
  locale:   "es_PE",
  type:     "website" as const,
  images:   [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} — Ferretería Eléctrica AT/MT` }],
}

// ─── Schema.org — LocalBusiness ───────────────────────────────────────────────

/**
 * JSON-LD para Google: marca a Electro Thina como negocio local con actividad
 * de fabricación y distribución de materiales eléctricos AT/MT.
 *
 * Incluir en el layout raíz con:
 *   <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
 */
export const organizationSchema = {
  "@context":    "https://schema.org",
  "@type":       ["Organization", "LocalBusiness"],
  "@id":         `${SITE_URL}/#organization`,
  name:          "Lorem Ipsum S.A.C.",
  alternateName: ["Lorem Ipsum", "LoremIpsum"],
  description:   `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${KW_CORE}.`,
  url:           SITE_URL,
  logo: {
    "@type":  "ImageObject",
    "@id":    `${SITE_URL}/#logo`,
    url:      OG_IMAGE,
    caption:  "Lorem Ipsum S.A.C.",
  },
  image:         OG_IMAGE,
  foundingDate:  "2010",
  areaServed:    "PE",
  priceRange:    "$$",
  telephone:     "+00000000000",
  email:         "lorem@ipsum.com",
  address: {
    "@type":         "PostalAddress",
    streetAddress:   "Lorem Ipsum N° 000 - Int. 000",
    addressLocality: "Lorem",
    addressRegion:   "Ipsum",
    addressCountry:  "PE",
    postalCode:      "00000",
  },
  geo: {
    "@type":    "GeoCoordinates",
    latitude:   "0.0000",
    longitude:  "0.0000",
  },
  openingHoursSpecification: [
    {
      "@type":    "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens:     "09:00",
      closes:    "18:00",
    },
    {
      "@type":    "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens:     "09:00",
      closes:    "13:00",
    },
  ],
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "Lorem Ipsum Catálogo",
  },
  knowsAbout: [
    "lorem ipsum dolor sit amet",
    "lorem ipsum consectetur adipiscing",
    "lorem ipsum sed do eiusmod",
    "lorem ipsum tempor incididunt",
    "lorem ipsum labore et dolore",
    "lorem ipsum magna aliqua",
  ],
} as const

/**
 * JSON-LD WebSite — habilita el Sitelinks Searchbox de Google.
 * Incluir en el layout raíz junto al Organization schema.
 */
export const websiteSchema = {
  "@context":  "https://schema.org",
  "@type":     "WebSite",
  "@id":       `${SITE_URL}/#website`,
  name:        SITE_NAME,
  url:         SITE_URL,
  inLanguage:  "es-PE",
  publisher:   { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type":      "SearchAction",
    target:       { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/catalogo?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
} as const

// ─── Metadata por página ───────────────────────────────────────────────────────

export const SEO = {

  /** Root layout — se hereda por todas las páginas que no definen su propia metadata */
  root: {
    metadataBase: new URL(SITE_URL),
    title: {
      default:  `${SITE_NAME} | Lorem Ipsum Dolor Sit Amet`,
      template: `%s | ${SITE_NAME}`,
    },
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`,
    keywords: [KW_CORE, ...KW_SECONDARY],
    authors:  [{ name: "Lorem Ipsum S.A.C." }],
    creator:  "Lorem Ipsum S.A.C.",
    openGraph: {
      ...defaultOG,
      url:         SITE_URL,
      title:       `${SITE_NAME} | Lorem Ipsum Dolor Sit Amet`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    twitter: {
      card:        "summary_large_image" as const,
      title:       `${SITE_NAME} | Lorem Ipsum Dolor Sit Amet`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.`,
      images:      [OG_IMAGE],
    },
    robots: {
      index:     true,
      follow:    true,
      googleBot: { index: true, follow: true },
    },
  } satisfies Metadata,

  /** / — Página principal */
  home: {
    title:       { absolute: `${SITE_NAME} — Lorem Ipsum Dolor Sit Amet` },
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`,
    alternates:  { canonical: "/" },
    openGraph: {
      ...defaultOG,
      url:         SITE_URL,
      title:       `${SITE_NAME} — Lorem Ipsum Dolor Sit Amet`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.`,
    },
    twitter: {
      card:        "summary_large_image" as const,
      title:       `${SITE_NAME} — Lorem Ipsum Dolor Sit Amet`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.`,
      images:      [OG_IMAGE],
    },
  } satisfies Metadata,

  /** /nosotros */
  nosotros: {
    title:       "Lorem Ipsum — Sobre Nosotros",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`,
    alternates:  { canonical: "/nosotros" },
    openGraph: {
      ...defaultOG,
      url:         "/nosotros",
      title:       `Lorem Ipsum Nosotros | ${SITE_NAME}`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.`,
    },
    twitter: {
      card:   "summary_large_image" as const,
      images: [OG_IMAGE],
    },
  } satisfies Metadata,

  /** /contacto */
  contacto: {
    title:       "Lorem Ipsum — Cotizaciones y Asesoría",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`,
    alternates:  { canonical: "/contacto" },
    openGraph: {
      ...defaultOG,
      url:         "/contacto",
      title:       `Lorem Ipsum Cotizaciones | ${SITE_NAME}`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.`,
    },
    twitter: {
      card:   "summary_large_image" as const,
      images: [OG_IMAGE],
    },
  } satisfies Metadata,

  /** /catalogo */
  catalogo: {
    title:       "Lorem Ipsum — Catálogo de Productos",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`,
    alternates:  { canonical: "/catalogo" },
    openGraph: {
      ...defaultOG,
      url:         "/catalogo",
      title:       `Lorem Ipsum Catálogo | ${SITE_NAME}`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.`,
    },
    twitter: {
      card:   "summary_large_image" as const,
      images: [OG_IMAGE],
    },
  } satisfies Metadata,

  /** /terminos — noindex: no aporta SEO y consume crawl budget */
  terminos: {
    title:       "Términos y Condiciones",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    alternates:  { canonical: "/terminos" },
    robots:      { index: false, follow: false },
  } satisfies Metadata,

  /** /politica-privacidad — noindex */
  politicaPrivacidad: {
    title:       "Política de Privacidad",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    alternates:  { canonical: "/politica-privacidad" },
    robots:      { index: false, follow: false },
  } satisfies Metadata,

  /** /libro-reclamaciones — noindex */
  libroReclamaciones: {
    title:       "Libro de Reclamaciones",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    alternates:  { canonical: "/libro-reclamaciones" },
    robots:      { index: false, follow: false },
  } satisfies Metadata,

} as const

// ─── Metadata dinámica por categoría ──────────────────────────────────────────

/**
 * URL canónica para una categoría — ruta limpia con slug.
 * Ejemplo: /categoria/aisladores
 */
export function categoryUrl(slug: string): string {
  return `/categoria/${slug}`
}

/**
 * Genera metadata Next.js para una página de categoría.
 * La `description` se toma del campo `Category.description` almacenado en DB.
 *
 * @example
 * const cat = cats.find(c => c.name === categoria)
 * return cat ? generateCategoryMeta(cat) : SEO.catalogo
 */
export function generateCategoryMeta(category: {
  name: string
  slug: string
  description?: string | null
  image?: string | null
}): Metadata {
  const title       = `${category.name} — Precio y Cotización | ${SITE_NAME}`
  const description = (category.description?.trim())
    || `${category.name} — Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.`
  const url         = categoryUrl(category.slug)
  const ogImage     = (category.image && category.image.startsWith("http")) ? category.image : OG_IMAGE

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...defaultOG,
      url,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${category.name} — ${SITE_NAME}` }],
    },
    twitter: {
      card:        "summary_large_image",
      title,
      description,
      images:      [ogImage],
    },
  }
}

/**
 * Genera metadata Next.js para una página de producto individual.
 * Llamar desde `generateMetadata` en `/producto/[id]/page.tsx`.
 */
export function generateProductMeta(product: {
  id: number
  name: string
  category: string
  description?: string | null
  image?: string | null
}): Metadata {
  const title       = `${product.name} — Precio y Ficha Técnica | ${SITE_NAME}`
  const description = (product.description?.trim() && product.description.trim().length > 30)
    ? `${product.description.trim().slice(0, 160)}. Lorem ipsum dolor sit amet.`
    : `${product.name} — Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.`

  const url         = `/producto/${product.id}`
  const imageUrl    = (product.image && product.image.startsWith("http")) ? product.image : OG_IMAGE

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      siteName: SITE_NAME,
      locale:   "es_PE",
      type:     "website",
      url,
      title,
      description,
      images: [{ url: imageUrl, width: 800, height: 800, alt: product.name }],
    },
    twitter: {
      card:        "summary_large_image",
      title,
      description,
      images:      [imageUrl],
    },
  }
}

/**
 * JSON-LD Schema.org para una página de categoría (CollectionPage + ItemList).
 * Insertar en la página con:
 *   <script type="application/ld+json">{JSON.stringify(buildCategorySchema(cat, products))}</script>
 */
export function buildCategorySchema(
  category: { name: string; slug: string; description?: string | null },
  productNames: string[] = [],
) {
  const catUrl = `${SITE_URL}${categoryUrl(category.slug)}`

  return {
    "@context":   "https://schema.org",
    "@type":      "CollectionPage",
    "@id":        `${catUrl}#collection`,
    name:         category.name,
    description:  category.description ?? undefined,
    url:          catUrl,
    inLanguage:   "es-PE",
    provider:     { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL },
    ...(productNames.length > 0 && {
      mainEntity: {
        "@type":         "ItemList",
        numberOfItems:   productNames.length,
        itemListElement: productNames.map((name, i) => ({
          "@type":   "ListItem",
          position:  i + 1,
          name,
        })),
      },
    }),
  }
}

/**
 * JSON-LD Schema.org para una página de producto (Product).
 * Insertar en `/producto/[id]` para rich results en Google Shopping.
 */
export function buildProductSchema(product: {
  id: number
  name: string
  category: string
  brand?: string
  description?: string | null
  fullDescription?: string | null
  image?: string | null
  rating?: number
}) {
  const productUrl  = `${SITE_URL}/producto/${product.id}`
  const productImage = (product.image && product.image.startsWith("http")) ? product.image : OG_IMAGE
  // fullDescription puede contener HTML — extraemos texto plano como fallback
  const fullDescText = product.fullDescription
    ? product.fullDescription.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
    : ""
  const descriptionText = product.description?.trim() || fullDescText || `${product.name} — ${KW_CORE}`

  return {
    "@context":   "https://schema.org",
    "@type":      "Product",
    "@id":        productUrl,
    name:         product.name,
    description:  descriptionText.slice(0, 500),
    image:        productImage,
    url:          productUrl,
    inLanguage:   "es-PE",
    category:     product.category,
    brand: {
      "@type": "Brand",
      name:    product.brand ?? SITE_NAME,
    },
    offers: {
      "@type":        "Offer",
      url:            productUrl,
      priceCurrency:  "PEN",
      availability:   "https://schema.org/InStock",
      priceSpecification: {
        "@type":       "PriceSpecification",
        description:   "Precio disponible bajo cotización",
        priceCurrency: "PEN",
      },
      seller: {
        "@type": "Organization",
        name:    "Lorem Ipsum S.A.C.",
      },
    },
  }
}

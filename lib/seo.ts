/**
 * SEO — Fuente única de verdad para toda la metadata del sitio.
 *
 * Edita este archivo para actualizar títulos, descripciones y
 * Open Graph en todas las páginas públicas a la vez.
 */

import type { Metadata } from "next"

// ─── Configuración base ────────────────────────────────────────────────────────

export const SITE_URL  = "https://electrothina.com"
export const SITE_NAME = "Electro Thina"

/** Imagen OG por defecto — redes sociales y WhatsApp */
const OG_IMAGE = `${SITE_URL}/logo/logotipo.png`

/**
 * Keyword principal del negocio — frase corta y real que la gente busca.
 * Aparece en todas las descripciones y schema.
 */
const KW_CORE = "ferretería eléctrica AT/MT Lima Perú"

/**
 * Keywords secundarias — cubren intenciones de búsqueda reales.
 * Incluyen variantes de producto, material, uso y ubicación.
 */
const KW_SECONDARY = [
  "herrajes para líneas eléctricas alta tensión",
  "aisladores eléctricos para postes Lima",
  "conectores eléctricos para conductores AT/MT",
  "materiales eléctricos para distribución",
  "pernos y abrazaderas galvanizadas para postes eléctricos",
  "distribuidores ferretería eléctrica Lima",
  "accesorios para postes de concreto distribución eléctrica",
  "ferretería galvanizada para líneas eléctricas Perú",
  "grapas y empalmes para conductores eléctricos",
  "certificaciones IEC ANSI NTP herrajes eléctricos",
  "Electro Thina SAC Lima",
  "cotización ferretería eléctrica Peru",
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
  name:          "Electro Thina S.A.C.",
  alternateName: ["Electro Thina", "ElectroThina"],
  description:   "Fabricante y distribuidor de ferretería eléctrica para alta y media tensión (AT/MT) en Lima, Perú. Fundada en 2010, ofrece herrajes, aisladores de porcelana, conectores bimetálicos, pernos galvanizados, abrazaderas y sistemas de puesta a tierra certificados bajo normas IEC, ANSI C135, ANSI C29 y NTP. Atiende concesionarias eléctricas, contratistas y proyectos de distribución en todo el Perú con despacho en 24 a 48 horas.",
  slogan:        "Ferretería Eléctrica AT/MT certificada — Lima, Perú",
  url:           SITE_URL,
  logo: {
    "@type":      "ImageObject",
    "@id":        `${SITE_URL}/#logo`,
    url:          OG_IMAGE,
    caption:      "Electro Thina S.A.C. — Ferretería Eléctrica AT/MT",
    width:        "400",
    height:       "100",
  },
  image:         OG_IMAGE,
  foundingDate:  "2010",
  foundingLocation: {
    "@type":        "Place",
    name:           "Lima, Perú",
    address: {
      "@type":         "PostalAddress",
      addressLocality: "Lima",
      addressCountry:  "PE",
    },
  },
  taxID:         "20609410711",
  legalName:     "Electro Thina S.A.C.",
  areaServed:    [
    { "@type": "Country", name: "Perú" },
    { "@type": "City",    name: "Lima" },
  ],
  priceRange:    "$$",
  telephone:     "+51981375196",
  email:         "electrothina522@gmail.com",
  address: {
    "@type":         "PostalAddress",
    streetAddress:   "Av. Guillermo Dansey N° 481 - Int. 143 - C.C. Loreto",
    addressLocality: "Lima",
    addressRegion:   "Lima",
    addressCountry:  "PE",
    postalCode:      "15001",
  },
  geo: {
    "@type":    "GeoCoordinates",
    latitude:   "-12.0522",
    longitude:  "-77.0313",
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
      closes:    "15:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/electrothina",
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "Certificación ISO 9001 — Sistema de Gestión de Calidad" },
    { "@type": "EducationalOccupationalCredential", name: "Cumplimiento IEC 61284 — Herrajes para líneas aéreas" },
    { "@type": "EducationalOccupationalCredential", name: "Cumplimiento ANSI C135 — Herrajes de acero galvanizado" },
    { "@type": "EducationalOccupationalCredential", name: "Cumplimiento NTP 370.043 — Ferretería eléctrica Perú" },
  ],
  hasOfferCatalog: {
    "@type":       "OfferCatalog",
    name:          "Catálogo de Ferretería Eléctrica AT/MT",
    numberOfItems: 50,
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Grapas para conductores AT/MT" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Conectores eléctricos bimetálicos Al/Cu y Al/Al" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Pernos de acero galvanizado A°G° para postes" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Aisladores de porcelana ANSI 54-1 y 56-1" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Abrazaderas galvanizadas para postes de distribución" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Herrajes de anclaje para postes de concreto" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Sistemas de puesta a tierra — planchas de cobre tipo J" } },
    ],
  },
  knowsAbout: [
    "ferretería eléctrica para alta tensión AT/MT",
    "herrajes galvanizados para líneas de distribución eléctrica",
    "aisladores de porcelana ANSI C29 e IEC 60305",
    "conectores bimetálicos aluminio cobre a compresión IEC 61238",
    "pernos galvanizados ASTM A153 para postes de concreto",
    "abrazaderas para postes de distribución eléctrica",
    "sistemas de puesta a tierra para instalaciones AT/MT",
    "normas IEC ANSI NTP para distribución eléctrica en Perú",
    "suministro eléctrico para concesionarias eléctricas peruanas",
    "proyectos SEIN Sistema Eléctrico Interconectado Nacional Perú",
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
      default:  `${SITE_NAME} | Ferretería Eléctrica para Alta y Media Tensión`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      `Fabricantes de ferretería eléctrica AT/MT en Lima, Perú. Aisladores, herrajes, conectores y accesorios certificados IEC, ANSI y NTP. Despacho en 48 h.`,
    keywords: [KW_CORE, ...KW_SECONDARY],
    authors:  [{ name: "Electro Thina S.A.C." }],
    creator:  "Electro Thina S.A.C.",
    openGraph: {
      ...defaultOG,
      url:         SITE_URL,
      title:       `${SITE_NAME} | Ferretería Eléctrica para Alta y Media Tensión`,
      description: `Fabricantes de ferretería eléctrica AT/MT en Lima, Perú. Aisladores, herrajes y conectores certificados IEC, ANSI y NTP. Despacho en 48 h.`,
    },
    twitter: {
      card:        "summary_large_image" as const,
      title:       `${SITE_NAME} | Ferretería Eléctrica para Alta y Media Tensión`,
      description: `Fabricantes de ferretería eléctrica AT/MT en Lima. Certificaciones IEC, ANSI y NTP. Despacho en 48 h.`,
      images:      [OG_IMAGE],
    },
    robots: {
      index:     true,
      follow:    true,
      googleBot: { index: true, follow: true },
    },
    verification: {
      google: "TQPQo2oWum6WSo5GuM0eOmYGLiKHmHLbVKRWJSeOq94",
    },
    icons: {
      icon:     [
        { url: "/favicon.ico",  sizes: "32x32",   type: "image/x-icon" },
        { url: "/icon.png",     sizes: "512x512",  type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple:    [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
  } satisfies Metadata,

  /** / — Página principal */
  home: {
    title:       { absolute: `${SITE_NAME} — Ferretería Eléctrica AT/MT | Lima, Perú` },
    description: `Ferretería y accesorios eléctricos AT/MT en Lima, Perú. Stock permanente de aisladores, herrajes y conectores certificados IEC, ANSI y NTP. Despacho 48 h.`,
    alternates:  { canonical: "/" },
    openGraph: {
      ...defaultOG,
      url:         SITE_URL,
      title:       `${SITE_NAME} — Ferretería Eléctrica AT/MT | Lima, Perú`,
      description: `Fabricantes de ferretería eléctrica AT/MT. Aisladores, herrajes y conectores certificados. Stock permanente en Lima. Despacho en 48 h.`,
    },
    twitter: {
      card:        "summary_large_image" as const,
      title:       `${SITE_NAME} — Ferretería Eléctrica AT/MT | Lima, Perú`,
      description: `Ferretería eléctrica AT/MT en Lima. Certificaciones IEC, ANSI y NTP. Despacho en 48 h.`,
      images:      [OG_IMAGE],
    },
  } satisfies Metadata,

  /** /nosotros */
  nosotros: {
    title:       "Sobre Nosotros — Fabricantes de Ferretería Eléctrica en Perú",
    description: `Electro Thina: fabricantes y distribuidores de ferretería eléctrica AT/MT en Lima desde 2010. Certificaciones IEC y ANSI, planta propia e ingenieros especializados.`,
    alternates:  { canonical: "/nosotros" },
    openGraph: {
      ...defaultOG,
      url:         "/nosotros",
      title:       `Sobre Nosotros — Fabricantes AT/MT | ${SITE_NAME}`,
      description: `Más de 15 años fabricando ferretería eléctrica AT/MT en Perú. Herrajes, aisladores y conectores certificados IEC y ANSI.`,
    },
    twitter: {
      card:   "summary_large_image" as const,
      images: [OG_IMAGE],
    },
  } satisfies Metadata,

  /** /contacto */
  contacto: {
    title:       "Cotizaciones y Asesoría Técnica — Ferretería Eléctrica AT/MT",
    description: `Solicita cotización de ferretería eléctrica AT/MT en Lima. Ingenieros especializados disponibles. Respondemos en menos de 24 h.`,
    alternates:  { canonical: "/contacto" },
    openGraph: {
      ...defaultOG,
      url:         "/contacto",
      title:       `Cotizaciones AT/MT | ${SITE_NAME}`,
      description: `Cotizaciones y asesoría técnica para ferretería eléctrica AT/MT en Lima. Ingenieros especializados. Respuesta en menos de 24 h.`,
    },
    twitter: {
      card:   "summary_large_image" as const,
      images: [OG_IMAGE],
    },
  } satisfies Metadata,

  /** /catalogo */
  catalogo: {
    title:       "Catálogo de Ferretería Eléctrica AT/MT — Herrajes, Aisladores y Conectores",
    description: `Catálogo de ferretería eléctrica AT/MT: herrajes, aisladores, conectores y accesorios certificados IEC, ANSI y NTP. Stock permanente en Lima. Cotización en 24 h.`,
    alternates:  { canonical: "/catalogo" },
    openGraph: {
      ...defaultOG,
      url:         "/catalogo",
      title:       `Catálogo Ferretería Eléctrica AT/MT | ${SITE_NAME}`,
      description: `Herrajes, aisladores, conectores y accesorios eléctricos AT/MT. Certificaciones IEC, ANSI y NTP. Stock permanente en Lima, Perú.`,
    },
    twitter: {
      card:   "summary_large_image" as const,
      images: [OG_IMAGE],
    },
  } satisfies Metadata,

  /** /terminos — noindex: no aporta SEO y consume crawl budget */
  terminos: {
    title:       "Términos y Condiciones",
    description: `Términos y condiciones de uso del sitio web y servicios comerciales de Electro Thina S.A.C., fabricante y distribuidor de ferretería eléctrica AT/MT en Lima, Perú.`,
    alternates:  { canonical: "/terminos" },
    robots:      { index: false, follow: false },
  } satisfies Metadata,

  /** /politica-privacidad — noindex */
  politicaPrivacidad: {
    title:       "Política de Privacidad",
    description: `Política de privacidad y tratamiento de datos personales de Electro Thina S.A.C. conforme a la Ley N° 29733 — Ley de Protección de Datos Personales del Perú.`,
    alternates:  { canonical: "/politica-privacidad" },
    robots:      { index: false, follow: false },
  } satisfies Metadata,

  /** /libro-reclamaciones — noindex */
  libroReclamaciones: {
    title:       "Libro de Reclamaciones",
    description: `Libro de Reclamaciones Virtual de Electro Thina S.A.C. conforme a la Ley N° 29571 — Código de Protección y Defensa del Consumidor (INDECOPI). Lima, Perú.`,
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
    || `${category.name} — ferretería eléctrica AT/MT certificada IEC, ANSI y NTP. Stock permanente en Lima, Perú. Cotización en 24 h.`
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
  // Sin el sufijo "| Electro Thina" — el template del root layout lo agrega automáticamente
  const title       = `${product.name} — Precio y Ficha Técnica`
  const description = (product.description?.trim() && product.description.trim().length > 30)
    ? `${product.description.trim().slice(0, 120)}. Cotización en Lima en 24 h.`
    : `${product.name} — Ferretería eléctrica AT/MT certificada IEC, ANSI y NTP. Stock en Lima, Perú. Cotización en 24 h.`

  const url      = `/producto/${product.id}`
  const imageUrl = (product.image && product.image.startsWith("http")) ? product.image : OG_IMAGE

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      siteName: SITE_NAME,
      locale:   "es_PE",
      type:     "website",
      url,
      title:       `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: imageUrl, width: 800, height: 800, alt: product.name }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       `${title} | ${SITE_NAME}`,
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
  const productImage = (product.image && product.image.startsWith("http")) ? product.image : null
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
    ...(productImage && { image: productImage }),
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
        name:    "Electro Thina S.A.C.",
      },
    },
  }
}

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
const OG_IMAGE = `${SITE_URL}/logotipo.png`

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
  name:          "Electro Thina S.A.C.",
  alternateName: ["Electro Thina", "ElectroThina"],
  description:   `Fabricantes y distribuidores de ${KW_CORE}. Aisladores, herrajes, conectores y ferretería galvanizada con certificaciones IEC, ANSI y NTP.`,
  url:           SITE_URL,
  logo:          OG_IMAGE,
  image:         OG_IMAGE,
  foundingDate:  "2010",
  areaServed:    "PE",
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
      closes:    "13:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/electrothina",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "Catálogo de Ferretería Eléctrica AT/MT",
  },
  knowsAbout: [
    "ferretería eléctrica alta tensión",
    "herrajes para líneas de distribución eléctrica",
    "aisladores eléctricos ANSI IEC",
    "conectores bimetálicos para conductores",
    "ferretería galvanizada para postes de concreto",
    "suministro eléctrico para proyectos AT/MT",
  ],
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
 * URL canónica para una categoría.
 * Usa el nombre de la categoría porque así lo construye el frontend
 * (CategoriesGrid, Navigation, ProductoView).
 */
function categoryUrl(categoryName: string): string {
  return `/catalogo?categoria=${encodeURIComponent(categoryName)}`
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
}): Metadata {
  const title       = `${category.name} — Precio y Cotización | ${SITE_NAME}`
  const description = (category.description?.trim())
    || `${category.name} — ferretería eléctrica AT/MT certificada IEC, ANSI y NTP. Stock permanente en Lima, Perú. Cotización en 24 h.`
  const url         = categoryUrl(category.name)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...defaultOG,
      url,
      title,
      description,
    },
    twitter: {
      card:        "summary_large_image",
      title,
      description,
      images:      [OG_IMAGE],
    },
  }
}

/**
 * Genera metadata Next.js para una página de producto individual.
 * Llamar desde `generateMetadata` en `/producto/[id]/page.tsx`.
 */
export function generateProductMeta(product: {
  id: number
  sku: string
  name: string
  category: string
  description?: string | null
  image?: string | null
}): Metadata {
  const title       = `${product.name} — Precio y Ficha Técnica | ${SITE_NAME}`
  const description = (product.description?.trim() && product.description.trim().length > 30)
    ? `${product.description.trim().slice(0, 130)}. SKU ${product.sku}. Cotización en Lima, Perú en menos de 24 h.`
    : `${product.name} — SKU ${product.sku}. Ferretería eléctrica AT/MT certificada IEC, ANSI y NTP. Cotización en Lima, Perú en 24 h.`

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
  return {
    "@context":   "https://schema.org",
    "@type":      "CollectionPage",
    name:         category.name,
    description:  category.description ?? undefined,
    url:          `${SITE_URL}${categoryUrl(category.name)}`,
    provider:     { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
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
  sku: string
  name: string
  category: string
  description?: string | null
  image?: string | null
  rating?: number
}) {
  return {
    "@context":   "https://schema.org",
    "@type":      "Product",
    name:         product.name,
    sku:          product.sku,
    description:  product.description ?? `${product.name} — ${KW_CORE}`,
    image:        (product.image && product.image.startsWith("http")) ? product.image : OG_IMAGE,
    url:          `${SITE_URL}/producto/${product.id}`,
    category:     product.category,
    brand: {
      "@type": "Brand",
      name:    SITE_NAME,
    },
    offers: {
      "@type":       "Offer",
      url:           `${SITE_URL}/producto/${product.id}`,
      priceCurrency: "PEN",
      availability:  "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name:    "Electro Thina S.A.C.",
      },
    },
    ...(product.rating && {
      aggregateRating: {
        "@type":       "AggregateRating",
        ratingValue:   product.rating,
        bestRating:    5,
        worstRating:   1,
        reviewCount:   1,
      },
    }),
  }
}

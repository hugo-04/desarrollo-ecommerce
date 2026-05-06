/**
 * SEO — Fuente única de verdad para toda la metadata del sitio.
 *
 * Edita este archivo para actualizar títulos, descripciones y
 * Open Graph en todas las páginas públicas a la vez.
 */

import type { Metadata } from "next"

// ─── Configuración base ────────────────────────────────────────────────────────

export const SITE_URL  = "https://insumindperu.pe"
export const SITE_NAME = "INSUMIND"

/** Imagen OG por defecto — redes sociales y WhatsApp */
const OG_IMAGE = `${SITE_URL}/logo/logotipo.png`

/**
 * Keyword principal del negocio — frase corta y real que la gente busca.
 */
const KW_CORE = "insumos industriales y mineros Lima Perú"

/**
 * Keywords secundarias — cubren intenciones de búsqueda reales.
 */
const KW_SECONDARY = [
  "rodamientos SKF Timken Lima Perú",
  "filtros industriales Donaldson Fleetguard Lima",
  "válvulas industriales Kitz Bray Lima",
  "correas industriales Gates Optibelt Lima",
  "componentes hidráulicos Parker Rexroth Lima",
  "insumos para minería Perú",
  "insumos para construcción Perú",
  "distribuidora insumos industriales Lima",
  "stock rodamientos Lima entrega rápida",
  "cotización insumos industriales Lima",
  "Insumind Perú SAC",
  "insumindperu.pe",
  "insumos mineros industriales Los Olivos Lima",
]

const defaultOG = {
  siteName: SITE_NAME,
  locale:   "es_PE",
  type:     "website" as const,
  images:   [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} — Insumos Industriales y Mineros` }],
}

// ─── Schema.org — LocalBusiness ───────────────────────────────────────────────

export const organizationSchema = {
  "@context":    "https://schema.org",
  "@type":       ["Organization", "LocalBusiness"],
  "@id":         `${SITE_URL}/#organization`,
  name:          "Insumind Perú S.A.C.",
  alternateName: ["INSUMIND", "Insumos Mineros Industriales"],
  description:   "Insumind Perú S.A.C. es una empresa peruana especializada en la distribución de insumos industriales y mineros de alta calidad. Distribuimos rodamientos, filtros, válvulas, correas y componentes hidráulicos de marcas líderes: SKF, Timken, Parker, Gates, Donaldson, Kitz y más. Todos originales, todos con garantía. Stock permanente en Lima y despacho nacional.",
  slogan:        "Garantía y Confianza en cada Insumo",
  url:           SITE_URL,
  logo: {
    "@type":      "ImageObject",
    "@id":        `${SITE_URL}/#logo`,
    url:          OG_IMAGE,
    caption:      "Insumind Perú S.A.C. — Insumos Mineros Industriales",
    width:        "400",
    height:       "100",
  },
  image:         OG_IMAGE,
  legalName:     "Insumind Perú S.A.C.",
  foundingLocation: {
    "@type":        "Place",
    name:           "Lima, Perú",
    address: {
      "@type":         "PostalAddress",
      addressLocality: "Lima",
      addressCountry:  "PE",
    },
  },
  areaServed: [
    { "@type": "Country", name: "Perú" },
    { "@type": "City",    name: "Lima" },
  ],
  priceRange: "$$",
  email:      "ventas@insumindperu.pe",
  address: {
    "@type":          "PostalAddress",
    streetAddress:    "Calle 55 Mz WW2 Lote 13, La Floresta de Pro",
    addressLocality:  "Los Olivos",
    addressRegion:    "Lima",
    addressCountry:   "PE",
  },
  geo: {
    "@type":    "GeoCoordinates",
    latitude:   "-11.988",
    longitude:  "-77.058",
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
  hasOfferCatalog: {
    "@type":       "OfferCatalog",
    name:          "Catálogo de Insumos Industriales y Mineros",
    numberOfItems: 500,
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Rodamientos industriales SKF · Timken · INA · NSK · FAG" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Filtros industriales Donaldson · Fleetguard · Caterpillar · Mann+Hummel" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Válvulas industriales Kitz · Bray · KSB · Velan" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Correas industriales Gates · Optibelt · Continental" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Componentes hidráulicos Parker · Rexroth · Yuken" } },
    ],
  },
  knowsAbout: [
    "rodamientos industriales para minería y manufactura",
    "filtros industriales para maquinaria pesada",
    "válvulas industriales para procesos",
    "correas industriales para transmisión de potencia",
    "componentes hidráulicos para maquinaria industrial",
    "insumos para minería en Cajamarca, Arequipa, Cusco y Moquegua",
    "insumos para construcción con equipos CAT, Komatsu, Volvo CE",
    "insumos para pesca y agroindustria en el Perú",
    "marcas originales SKF, Timken, Parker, Gates, Donaldson",
    "distribución de insumos industriales con entrega en Lima al día siguiente",
  ],
} as const

/**
 * JSON-LD WebSite — habilita el Sitelinks Searchbox de Google.
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
      default:  `${SITE_NAME} | Insumos Industriales y Mineros en Lima, Perú`,
      template: `%s | ${SITE_NAME}`,
    },
    description: "Insumind Perú S.A.C. distribuye rodamientos, filtros, válvulas, correas y componentes hidráulicos originales para minería e industria. Marcas SKF, Parker, Gates, Timken. Entrega en Lima y despacho nacional.",
    keywords: KW_SECONDARY,
    authors:  [{ name: "Insumind Perú S.A.C." }],
    creator:  "Insumind Perú S.A.C.",
    openGraph: {
      ...defaultOG,
      url:         SITE_URL,
      title:       `${SITE_NAME} | Insumos Industriales y Mineros en Lima, Perú`,
      description: "Distribuidora peruana de insumos industriales y mineros originales. SKF, Parker, Gates, Timken. Stock permanente en Lima. Entrega al día siguiente.",
    },
    twitter: {
      card:        "summary_large_image" as const,
      title:       `${SITE_NAME} | Insumos Industriales y Mineros en Lima, Perú`,
      description: "Distribuidora peruana de insumos industriales y mineros originales. SKF, Parker, Gates, Timken. Stock permanente en Lima. Entrega al día siguiente.",
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
  } satisfies Metadata,

  /** / — Página principal */
  home: {
    title:       { absolute: `${SITE_NAME} | Insumos Industriales y Mineros en Lima, Perú` },
    description: "Insumind Perú S.A.C. distribuye rodamientos, filtros, válvulas, correas y componentes hidráulicos originales para minería e industria. Marcas SKF, Parker, Gates, Timken. Entrega en Lima y despacho nacional.",
    alternates:  { canonical: "/" },
    openGraph: {
      ...defaultOG,
      url:         SITE_URL,
      title:       `${SITE_NAME} | Insumos Industriales y Mineros en Lima, Perú`,
      description: "Distribuidora peruana con stock permanente de insumos industriales y mineros 100% originales. SKF, Timken, Parker, Gates, Donaldson. Entrega en Lima al día siguiente.",
    },
    twitter: {
      card:        "summary_large_image" as const,
      title:       `${SITE_NAME} | Insumos Industriales y Mineros en Lima, Perú`,
      description: "Distribuidora peruana con stock permanente de insumos industriales y mineros 100% originales. SKF, Timken, Parker, Gates, Donaldson. Entrega en Lima al día siguiente.",
      images:      [OG_IMAGE],
    },
  } satisfies Metadata,

  /** /nosotros */
  nosotros: {
    title:       "Nosotros | INSUMIND — Distribuidora Peruana de Insumos Industriales",
    description: "Conoce a Insumind Perú S.A.C., empresa peruana formal especializada en distribución de insumos industriales y mineros originales. Stock en Lima, entregas nacionales. SKF, Parker, Gates y más.",
    alternates:  { canonical: "/nosotros" },
    openGraph: {
      ...defaultOG,
      url:         "/nosotros",
      title:       `Nosotros — Distribuidora Peruana de Insumos Industriales | ${SITE_NAME}`,
      description: "Empresa peruana formal con almacén en Los Olivos, Lima. Distribuimos rodamientos, filtros, válvulas, correas e hidráulicos de marcas líderes mundiales.",
    },
    twitter: {
      card:   "summary_large_image" as const,
      images: [OG_IMAGE],
    },
  } satisfies Metadata,

  /** /contacto */
  contacto: {
    title:       "Contacto | INSUMIND Lima — Cotiza Insumos Industriales por WhatsApp",
    description: "Contáctanos para cotizar rodamientos, filtros, válvulas, correas y componentes hidráulicos en Lima, Perú. Insumind Perú S.A.C. Atención Lun-Vie 9am-6pm y Sáb 9am-1pm.",
    alternates:  { canonical: "/contacto" },
    openGraph: {
      ...defaultOG,
      url:         "/contacto",
      title:       `Contacto — Cotiza Insumos Industriales | ${SITE_NAME}`,
      description: "Cotización inmediata de insumos industriales y mineros en Lima. Respuesta en menos de 2 horas. Atención Lun-Vie 9am-6pm y Sáb 9am-1pm.",
    },
    twitter: {
      card:   "summary_large_image" as const,
      images: [OG_IMAGE],
    },
  } satisfies Metadata,

  /** /catalogo */
  catalogo: {
    title:       "Catálogo de Insumos Industriales y Mineros — Rodamientos, Filtros, Válvulas",
    description: "Catálogo de insumos industriales y mineros originales: rodamientos, filtros, válvulas, correas y componentes hidráulicos. Marcas SKF, Parker, Gates, Donaldson. Stock permanente en Lima.",
    alternates:  { canonical: "/catalogo" },
    openGraph: {
      ...defaultOG,
      url:         "/catalogo",
      title:       `Catálogo Insumos Industriales y Mineros | ${SITE_NAME}`,
      description: "Rodamientos, filtros, válvulas, correas y componentes hidráulicos originales. SKF, Timken, Parker, Gates, Donaldson. Stock permanente en Lima, Perú.",
    },
    twitter: {
      card:   "summary_large_image" as const,
      images: [OG_IMAGE],
    },
  } satisfies Metadata,

  /** /terminos — noindex: no aporta SEO y consume crawl budget */
  terminos: {
    title:       "Términos y Condiciones",
    description: `Términos y condiciones de uso del sitio web y servicios comerciales de Insumind Perú S.A.C., distribuidora de insumos industriales y mineros en Lima, Perú.`,
    alternates:  { canonical: "/terminos" },
    robots:      { index: false, follow: false },
  } satisfies Metadata,

  /** /politica-privacidad — noindex */
  politicaPrivacidad: {
    title:       "Política de Privacidad",
    description: `Política de privacidad y tratamiento de datos personales de Insumind Perú S.A.C. conforme a la Ley N° 29733 — Ley de Protección de Datos Personales del Perú.`,
    alternates:  { canonical: "/politica-privacidad" },
    robots:      { index: false, follow: false },
  } satisfies Metadata,

  /** /libro-reclamaciones — noindex */
  libroReclamaciones: {
    title:       "Libro de Reclamaciones",
    description: `Libro de Reclamaciones Virtual de Insumind Perú S.A.C. conforme a la Ley N° 29571 — Código de Protección y Defensa del Consumidor (INDECOPI). Lima, Perú.`,
    alternates:  { canonical: "/libro-reclamaciones" },
    robots:      { index: false, follow: false },
  } satisfies Metadata,

} as const

// ─── Metadata dinámica por categoría ──────────────────────────────────────────

export function categoryUrl(slug: string): string {
  return `/categoria/${slug}`
}

export function generateCategoryMeta(category: {
  name: string
  slug: string
  description?: string | null
  image?: string | null
  keywords?: string[]
}): Metadata {
  const title       = `${category.name} — Precio y Cotización | ${SITE_NAME}`
  const description = (category.description?.trim())
    || `${category.name} — insumos industriales y mineros originales con garantía. Stock permanente en Lima, Perú. Cotización inmediata.`
  const url         = categoryUrl(category.slug)
  const ogImage     = (category.image && category.image.startsWith("http")) ? category.image : OG_IMAGE
  const keywords    = category.keywords?.length ? category.keywords : undefined

  return {
    title,
    description,
    ...(keywords && { keywords }),
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

export function generateProductMeta(product: {
  id: number
  name: string
  category: string
  description?: string | null
  image?: string | null
  keywords?: string[]
}): Metadata {
  const title       = `${product.name} — Precio y Ficha Técnica`
  const description = (product.description?.trim() && product.description.trim().length > 30)
    ? `${product.description.trim().slice(0, 120)}. Cotización en Lima en menos de 2 horas.`
    : `${product.name} — Insumo industrial original con garantía de fábrica. Stock en Lima, Perú. Cotización inmediata.`

  const url      = `/producto/${product.id}`
  const imageUrl = (product.image && product.image.startsWith("http")) ? product.image : OG_IMAGE
  const keywords = product.keywords?.length ? product.keywords : undefined

  return {
    title,
    description,
    ...(keywords && { keywords }),
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

export function buildCategorySchema(
  category: { name: string; slug: string; description?: string | null; keywords?: string[] },
  productNames: string[] = [],
) {
  const catUrl = `${SITE_URL}${categoryUrl(category.slug)}`

  return {
    "@context":   "https://schema.org",
    "@type":      "CollectionPage",
    "@id":        `${catUrl}#collection`,
    name:         category.name,
    description:  category.description ?? undefined,
    ...(category.keywords?.length && { keywords: category.keywords.join(", ") }),
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

export function buildProductSchema(product: {
  id: number
  name: string
  category: string
  brand?: string
  description?: string | null
  fullDescription?: string | null
  image?: string | null
  keywords?: string[]
  rating?: number
}) {
  const productUrl  = `${SITE_URL}/producto/${product.id}`
  const productImage = (product.image && product.image.startsWith("http")) ? product.image : null
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
    ...(product.keywords?.length && { keywords: product.keywords.join(", ") }),
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
        name:    "Insumind Perú S.A.C.",
      },
    },
  }
}

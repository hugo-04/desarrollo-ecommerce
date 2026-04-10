/**
 * SEO — Fuente única de verdad para toda la metadata del sitio.
 *
 * Edita este archivo para actualizar títulos, descripciones y
 * Open Graph en todas las páginas públicas a la vez.
 *
 * Keyword principal: "ferretería y accesorios eléctricos para alta y media tensión"
 */

import type { Metadata } from "next"

// ─── Configuración base ────────────────────────────────────────────────────────

export const SITE_URL  = "https://electrothina.com"
export const SITE_NAME = "Electro Thina"

/** Frase clave del negocio — aparece en todas las descripciones */
const KW_CORE = "ferretería y accesorios eléctricos para alta y media tensión"

/** Keywords secundarias del negocio */
const KW_SECONDARY = [
  "aisladores eléctricos",
  "herrajes para líneas eléctricas",
  "conectores AT/MT",
  "cables eléctricos media tensión",
  "materiales eléctricos Perú",
  "fabricantes accesorios eléctricos Lima",
  "certificaciones IEC ANSI NTP",
]

const defaultOG = {
  siteName: SITE_NAME,
  locale:   "es_PE",
  type:     "website" as const,
}

// ─── Schema.org — LocalBusiness ───────────────────────────────────────────────

/**
 * JSON-LD para Google: marca a Electro Thina como negocio local con actividad
 * de fabricación y distribución de materiales eléctricos AT/MT.
 *
 * Incluir en el layout raíz o en la home page con:
 *   <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
 */
export const organizationSchema = {
  "@context":       "https://schema.org",
  "@type":          ["Organization", "LocalBusiness"],
  name:             "Electro Thina S.A.C.",
  description:      `Fabricantes y distribuidores de ${KW_CORE} en Perú. Aisladores, herrajes, conectores y cables con certificaciones IEC, ANSI y NTP.`,
  url:              SITE_URL,
  logo:             `${SITE_URL}/logotipo.png`,
  foundingDate:     "2010",
  areaServed:       "PE",
  telephone:        "+51981375196",
  email:            "electrothina522@gmail.com",
  address: {
    "@type":            "PostalAddress",
    streetAddress:      "Av. Guillermo Dansey N° 481 - Int. 143 - C.C. Loreto",
    addressLocality:    "Lima",
    addressRegion:      "Lima",
    addressCountry:     "PE",
  },
  knowsAbout: [
    KW_CORE,
    "aisladores eléctricos AT/MT",
    "herrajes para líneas de alta tensión",
    "conectores para media tensión",
    "ferretería eléctrica certificada IEC",
    "suministro eléctrico para proyectos de obra",
  ],
} as const

// ─── Metadata por página ───────────────────────────────────────────────────────

export const SEO = {

  /** Root layout — se hereda por todas las páginas */
  root: {
    metadataBase: new URL(SITE_URL),
    title: {
      default:  `${SITE_NAME} | Ferretería Eléctrica AT/MT en Perú`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      `Fabricantes de ferretería eléctrica AT/MT en Lima, Perú. Aisladores, herrajes, conectores y cables certificados IEC, ANSI y NTP. Despacho en 48 h.`,
    keywords: [KW_CORE, ...KW_SECONDARY],
    authors:  [{ name: "Electro Thina S.A.C." }],
    creator:  "Electro Thina S.A.C.",
    openGraph: {
      ...defaultOG,
      url:         SITE_URL,
      title:       `${SITE_NAME} | Ferretería Eléctrica AT/MT en Perú`,
      description: `Fabricantes de ferretería eléctrica AT/MT en Lima, Perú. Aisladores, herrajes y conectores certificados IEC, ANSI y NTP. Despacho en 48 h.`,
    },
    twitter: {
      card:        "summary_large_image" as const,
      title:       `${SITE_NAME} | Ferretería Eléctrica AT/MT en Perú`,
      description: `Fabricantes de ferretería eléctrica AT/MT en Lima. Certificaciones IEC, ANSI y NTP. Despacho en 48 h.`,
    },
    robots: {
      index:     true,
      follow:    true,
      googleBot: { index: true, follow: true },
    },
  } satisfies Metadata,

  /** / — Página principal */
  home: {
    title:       { absolute: `${SITE_NAME} — Ferretería Eléctrica AT/MT en Perú` },
    description: `Ferretería y accesorios eléctricos AT/MT en Lima, Perú. Más de 1,000 productos certificados IEC, ANSI y NTP. Despacho en 48 h a nivel nacional.`,
    alternates:  { canonical: "/" },
    openGraph: {
      ...defaultOG,
      url:         "/",
      title:       `${SITE_NAME} — Ferretería Eléctrica AT/MT en Perú`,
      description: `Fabricantes de ferretería eléctrica AT/MT. Stock permanente de aisladores, herrajes y conectores certificados. Despacho en 48 h.`,
    },
  } satisfies Metadata,

  /** /nosotros */
  nosotros: {
    title:       "Fabricantes de Ferretería AT/MT en Perú",
    description: `Electro Thina fabrica y distribuye ferretería eléctrica AT/MT en Lima desde 2010. Planta propia, certificaciones IEC y ANSI, e ingenieros especializados AT/MT.`,
    alternates:  { canonical: "/nosotros" },
    openGraph: {
      ...defaultOG,
      url:         "/nosotros",
      title:       `Fabricantes AT/MT | ${SITE_NAME}`,
      description: `Más de 15 años fabricando ferretería eléctrica AT/MT en Perú. Herrajes, aisladores y conectores certificados IEC y ANSI.`,
    },
  } satisfies Metadata,

  /** /contacto */
  contacto: {
    title:       "Cotizaciones y Asesoría Técnica AT/MT",
    description: `Solicita cotización de ferretería eléctrica AT/MT en Lima. Ingenieros especializados disponibles. Respondemos en menos de 24 h.`,
    alternates:  { canonical: "/contacto" },
    openGraph: {
      ...defaultOG,
      url:         "/contacto",
      title:       `Contacto AT/MT | ${SITE_NAME}`,
      description: `Cotizaciones y asesoría técnica AT/MT en Lima. Ingenieros especializados. Respuesta en menos de 24 h.`,
    },
  } satisfies Metadata,

  /** /catalogo */
  catalogo: {
    title:       "Catálogo AT/MT",
    description: `Catálogo de ferretería eléctrica AT/MT: aisladores, herrajes, conectores y cables certificados IEC, ANSI y NTP. Más de 1,000 referencias. Cotización en 24 h.`,
    alternates:  { canonical: "/catalogo" },
    openGraph: {
      ...defaultOG,
      url:         "/catalogo",
      title:       `Catálogo AT/MT | ${SITE_NAME}`,
      description: `Aisladores, herrajes, conectores y cables AT/MT. Certificaciones IEC, ANSI y NTP. Más de 1,000 productos en stock.`,
    },
  } satisfies Metadata,

  /** /terminos */
  terminos: {
    title:       "Términos y Condiciones",
    description: `Términos y condiciones de uso del sitio web y servicios comerciales de Electro Thina S.A.C., fabricante y distribuidor de ${KW_CORE} en Lima, Perú.`,
    alternates:  { canonical: "/terminos" },
  } satisfies Metadata,

  /** /politica-privacidad */
  politicaPrivacidad: {
    title:       "Política de Privacidad",
    description: `Política de privacidad y tratamiento de datos personales de Electro Thina S.A.C. conforme a la Ley N° 29733 — Ley de Protección de Datos Personales del Perú.`,
    alternates:  { canonical: "/politica-privacidad" },
  } satisfies Metadata,

  /** /libro-reclamaciones */
  libroReclamaciones: {
    title:       "Libro de Reclamaciones",
    description: `Libro de Reclamaciones Virtual de Electro Thina S.A.C. conforme a la Ley N° 29571 — Código de Protección y Defensa del Consumidor (INDECOPI). Lima, Perú.`,
    alternates:  { canonical: "/libro-reclamaciones" },
  } satisfies Metadata,

} as const

// ─── Metadata dinámica por categoría ─────────────────────────────────────────
//
// La descripción viene del campo `description` de la DB (tabla `categories`).
// Se carga vía `getCategoriesAction()` en el Server Component / generateMetadata.
// Fallback: descripción genérica con el nombre de la categoría.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Genera metadata Next.js para una página de categoría.
 * La `description` se toma del campo `Category.description` almacenado en DB.
 *
 * @example
 * // app/(public)/catalogo/page.tsx
 * export async function generateMetadata({ searchParams }) {
 *   const { categoria } = await searchParams
 *   if (!categoria) return SEO.catalogo
 *   const cats = await getCategoriesAction()
 *   const cat  = cats.find(c => c.name === categoria)
 *   return cat ? generateCategoryMeta(cat) : SEO.catalogo
 * }
 */
export function generateCategoryMeta(category: {
  name: string
  slug: string
  description?: string | null
}): Metadata {
  const title       = `${category.name} | ${SITE_NAME}`
  const description = (category.description?.trim())
    || `${category.name} — ferretería eléctrica AT/MT certificada IEC, ANSI y NTP. Stock permanente en Lima, Perú. Cotización en 24 h.`
  const url         = `/catalogo?categoria=${category.slug}`

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
    },
  }
}

/**
 * JSON-LD Schema.org para una página de categoría (ItemList).
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
    url:          `${SITE_URL}/catalogo?categoria=${encodeURIComponent(category.name)}`,
    provider:     { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    ...(productNames.length > 0 && {
      mainEntity: {
        "@type":           "ItemList",
        numberOfItems:     productNames.length,
        itemListElement:   productNames.map((name, i) => ({
          "@type":    "ListItem",
          position:  i + 1,
          name,
        })),
      },
    }),
  }
}

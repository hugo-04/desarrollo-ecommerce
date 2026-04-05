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
      default:  `${SITE_NAME} | Ferretería y Accesorios Eléctricos AT/MT en Perú`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      `Fabricantes y distribuidores de ${KW_CORE} en Perú. Aisladores, herrajes, conectores y cables con certificaciones IEC, ANSI y NTP. Despacho en 48 h a nivel nacional.`,
    keywords: [KW_CORE, ...KW_SECONDARY],
    authors:  [{ name: "Electro Thina S.A.C." }],
    creator:  "Electro Thina S.A.C.",
    openGraph: {
      ...defaultOG,
      url:         SITE_URL,
      title:       `${SITE_NAME} | Ferretería y Accesorios Eléctricos AT/MT en Perú`,
      description: `Fabricantes y distribuidores de ${KW_CORE} en Lima, Perú. Más de 1,000 productos certificados con despacho en 48 h.`,
    },
    twitter: {
      card:        "summary_large_image" as const,
      title:       `${SITE_NAME} | Ferretería y Accesorios Eléctricos AT/MT`,
      description: `Fabricantes y distribuidores de ${KW_CORE} en Perú.`,
    },
    robots: {
      index:     true,
      follow:    true,
      googleBot: { index: true, follow: true },
    },
  } satisfies Metadata,

  /** / — Página principal */
  home: {
    title:       "Inicio",
    description: `${KW_CORE} en Lima, Perú. Más de 1,000 productos certificados IEC, ANSI y NTP con despacho en 48 h a nivel nacional.`,
    alternates:  { canonical: "/" },
    openGraph: {
      ...defaultOG,
      url:         "/",
      title:       `${SITE_NAME} | ${SITE_NAME.toUpperCase()} — Ferretería Eléctrica AT/MT`,
      description: `Fabricantes y distribuidores de ${KW_CORE}. Stock permanente de aisladores, herrajes y conectores certificados. Despacho en 48 h.`,
    },
  } satisfies Metadata,

  /** /nosotros */
  nosotros: {
    title:       "Quiénes Somos",
    description: `Electro Thina fabrica y distribuye ${KW_CORE} desde Lima desde el año 2010. Planta de fabricación propia, certificaciones IEC y ANSI, e ingenieros especializados en AT/MT.`,
    alternates:  { canonical: "/nosotros" },
    openGraph: {
      ...defaultOG,
      url:         "/nosotros",
      title:       `Quiénes Somos | ${SITE_NAME} — Ferretería Eléctrica AT/MT`,
      description: `Más de 15 años fabricando y distribuyendo ${KW_CORE} en Perú. Herrajes, aisladores y conectores con certificaciones IEC y ANSI.`,
    },
  } satisfies Metadata,

  /** /contacto */
  contacto: {
    title:       "Contacto",
    description: `Solicita cotización o asesoría técnica en ${KW_CORE}. Ingenieros especializados en AT/MT disponibles en Lima. Respondemos en menos de 24 h.`,
    alternates:  { canonical: "/contacto" },
    openGraph: {
      ...defaultOG,
      url:         "/contacto",
      title:       `Contacto | ${SITE_NAME} — Ferretería Eléctrica AT/MT`,
      description: `Cotizaciones y asesoría técnica en ${KW_CORE}. Ingenieros especializados. Respuesta en menos de 24 h.`,
    },
  } satisfies Metadata,

  /** /catalogo */
  catalogo: {
    title:       "Catálogo AT/MT",
    description: `Catálogo de ${KW_CORE}: aisladores, herrajes, conectores y cables certificados IEC, ANSI y NTP. Más de 1,000 referencias. Cotización técnica en 24 h.`,
    alternates:  { canonical: "/catalogo" },
    openGraph: {
      ...defaultOG,
      url:         "/catalogo",
      title:       `Catálogo AT/MT | ${SITE_NAME} — Ferretería Eléctrica Certificada`,
      description: `Aisladores, herrajes, conectores y cables para ${KW_CORE}. Certificaciones IEC, ANSI y NTP. Más de 1,000 productos en stock.`,
    },
  } satisfies Metadata,

} as const

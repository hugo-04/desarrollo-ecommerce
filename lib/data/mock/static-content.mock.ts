/**
 * CONTENIDO ESTÁTICO DEL SITIO
 * Todos los textos, listas y datos que aparecen en las secciones del home y otras páginas.
 * Cambia aquí para actualizar cualquier texto en el sitio sin tocar los componentes.
 */

export const FOUNDING_YEAR = 2010
const YEARS_ACTIVE = new Date().getFullYear() - FOUNDING_YEAR

// ─── HERO SECTION ────────────────────────────────────────────────────────────

export const HERO_CONTENT = {
  badge: "Lorem Ipsum · Lorem, Ipsum",
  title: "Lorem Ipsum Dolor Sit Amet",
  titleHighlight: "consectetur adipiscing elit",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  ctaPrimary: "Ver Catálogo",
  ctaPrimaryHref: "/catalogo",
  ctaSecondary: "Solicitar Cotización",
  stats: [
    { value: "50+",               label: "Lorem Ipsum Stock" },
    { value: `${YEARS_ACTIVE}+`, label: "Lorem de Experiencia" },
    { value: "350+",             label: "Lorem Ejecutados" },
  ],
} as const

// ─── TRUST BAR ────────────────────────────────────────────────────────────────

export const TRUST_BAR_CONTENT = {
  label: "Lorem ipsum confianza",
  badge: "120+ lorem",
  companies: [
    "Lorem Ipsum A",
    "Lorem Ipsum B",
    "Lorem Ipsum C",
    "Lorem Ipsum D",
    "Lorem Ipsum E",
    "Lorem Ipsum F",
    "Lorem Ipsum G",
  ],
} as const

// ─── CATEGORIES GRID ─────────────────────────────────────────────────────────

export const CATEGORIES_GRID_CONTENT = {
  badge: "Lorem Ipsum Líneas",
  title: "Lorem Ipsum Categorías",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
} as const

// ─── BEST SELLERS CAROUSEL ───────────────────────────────────────────────────

export const BEST_SELLERS_CONTENT = {
  badge: "Lorem Ipsum",
  title: "Lorem Ipsum Vendidos",
  subtitle: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod",
} as const

// ─── MARQUEE BRANDS ──────────────────────────────────────────────────────────

export const MARQUEE_BRANDS_CONTENT = {
  badge: "Lorem Ipsum Autorizados",
  title: "Lorem Ipsum de Clase Mundial",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
} as const

// ─── PROCESO SECTION ─────────────────────────────────────────────────────────

export const PROCESO_CONTENT = {
  badge: "Lorem ipsum funciona",
  title: "Lorem Ipsum de Compra",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  ctaLabel: "Lorem ipsum consulta",
  ctaHref: "/contacto",
  steps: [
    {
      num: "01",
      title: "Lorem ipsum consulta",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      colorClass: "from-primary/20 to-primary/5",
      textClass: "text-primary",
      borderClass: "border-primary/20",
    },
    {
      num: "02",
      title: "Lorem ipsum cotización",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      colorClass: "from-red-500/20 to-red-500/5",
      textClass: "text-red-500",
      borderClass: "border-red-500/20",
    },
    {
      num: "03",
      title: "Lorem ipsum despacho",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      colorClass: "from-emerald-500/20 to-emerald-500/5",
      textClass: "text-emerald-600",
      borderClass: "border-emerald-500/20",
    },
  ],
} as const

// ─── SECTORES SECTION ─────────────────────────────────────────────────────────

export const SECTORES_CONTENT = {
  badge: "Lorem Ipsum",
  title: "Lorem Ipsum que Atendemos",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  sectors: [
    {
      iconName: "lightning",
      title: "Lorem Ipsum A",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      stat: "Lorem A",
    },
    {
      iconName: "zap",
      title: "Lorem Ipsum B",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      stat: "Lorem B",
    },
    {
      iconName: "building",
      title: "Lorem Ipsum C",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      stat: "Lorem C",
    },
    {
      iconName: "fire",
      title: "Lorem Ipsum D",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      stat: "Lorem D",
    },
  ],
} as const

// ─── FULL WIDTH STATS ─────────────────────────────────────────────────────────

export const STATS_CONTENT = {
  stats: [
    { value: YEARS_ACTIVE, label: "Lorem\nExperiencia", suffix: "+" },
    { value: 50, label: "Lorem\nIpsum Stock", suffix: "+" },
    { value: 350, label: "Lorem\nEjecutados", suffix: "+" },
    { value: 98, label: "Lorem\nSatisfechos", suffix: "%" },
    { value: 12, label: "Lorem\nMarcas", suffix: "+" },
  ],
} as const

// ─── FEATURED OFFERS ──────────────────────────────────────────────────────────

export const FEATURED_OFFERS_CONTENT = {
  badge: "Lorem Ipsum Líneas",
  title: "Lorem Ipsum Especialidades",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  offers: [
    {
      iconName: "shield",
      title: "Lorem Ipsum A",
      subtitle: "Lorem Ipsum, Lorem et Ipsum",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      gradient: "from-blue-700 to-blue-900",
    },
    {
      iconName: "bolt",
      title: "Lorem Ipsum B",
      subtitle: "Lorem Ipsum, Lorem et Ipsum",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      gradient: "from-red-700 to-red-900",
    },
    {
      iconName: "tools",
      title: "Lorem Ipsum C",
      subtitle: "Lorem Ipsum, Lorem, Ipsum",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      gradient: "from-zinc-600 to-zinc-800",
    },
  ],
} as const

// ─── CERTIFICACIONES STRIP ────────────────────────────────────────────────────

export const CERTIFICACIONES_CONTENT = {
  label: "Lorem ipsum certificaciones et normas",
  certs: [
    { code: "Lorem A-001", desc: "Lorem ipsum dolor sit amet", colorClass: "text-blue-700", bgClass: "bg-blue-50 border-blue-100" },
    { code: "Lorem B-002", desc: "Lorem ipsum dolor sit amet", colorClass: "text-indigo-700", bgClass: "bg-indigo-50 border-indigo-100" },
    { code: "Lorem C-003", desc: "Lorem ipsum dolor sit amet", colorClass: "text-emerald-700", bgClass: "bg-emerald-50 border-emerald-100" },
    { code: "Lorem D-004", desc: "Lorem ipsum dolor sit amet", colorClass: "text-amber-700", bgClass: "bg-amber-50 border-amber-100" },
    { code: "Lorem E-005", desc: "Lorem ipsum dolor sit amet", colorClass: "text-red-700", bgClass: "bg-red-50 border-red-100" },
  ],
} as const

// ─── COMPANY SHOWCASE ─────────────────────────────────────────────────────────

export const COMPANY_SHOWCASE_CONTENT = {
  badge: "Lorem Ipsum Empresa",
  title: "Lorem Ipsum y Distribuidores",
  titleHighlight: "de Lorem Ipsum",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  ctaNosotros: "Conocer Más",
  ctaContacto: "Contáctanos",
  image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  imageAlt: "Lorem ipsum dolor sit amet",
  features: [
    { iconName: "shield", title: "Lorem Ipsum", desc: "Lorem, Ipsum, Dolor, Sit", colorClass: "bg-primary/10 text-primary" },
    { iconName: "truck", title: "Lorem Ipsum", desc: "Lorem ipsum dolor sit amet", colorClass: "bg-red-500/10 text-red-600" },
    { iconName: "headphones", title: "Lorem Ipsum", desc: "Lorem ipsum especializados", colorClass: "bg-emerald-500/10 text-emerald-600" },
    { iconName: "clock", title: "Lorem Ipsum", desc: "Lorem ipsum en 24 horas", colorClass: "bg-blue-500/10 text-blue-600" },
  ],
} as const

// ─── FABRICACION SECTION ──────────────────────────────────────────────────────

export const FABRICACION_CONTENT = {
  badge: "Lorem Ipsum Propia",
  title: "Lorem ipsum distribuimos.",
  titleHighlight: "Lorem ipsum fabricamos.",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  ctaLabel: "Lorem ipsum propios",
  ctaHref: "/catalogo",
  badgeLabel: "Lorem Ipsum ET",
  image: "https://images.unsplash.com/photo-1581093196867-ca9b9e02e42e?w=800&q=80",
  imageAlt: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
  productLines: [
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum adipiscing elit",
    "Lorem ipsum accesorios",
    "Lorem ipsum protecciones",
    "Lorem ipsum líneas aéreas",
  ],
} as const

// ─── BENEFITS SECTION ─────────────────────────────────────────────────────────

export const BENEFITS_CONTENT = {
  badge: "Lorem ipsum elegirnos",
  yearsExperience: YEARS_ACTIVE,
  experienceLabel: "Lorem de experiencia",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
  ctaLabel: "Lorem ipsum empresa",
  ctaHref: "/nosotros",
  stats: [
    { value: "350+", label: "Lorem ipsum ejecutados" },
    { value: "98%", label: "Lorem ipsum satisfechos" },
  ],
  benefits: [
    {
      iconName: "shield",
      title: "Lorem Ipsum A",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    },
    {
      iconName: "truck",
      title: "Lorem Ipsum B",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    },
    {
      iconName: "headphones",
      title: "Lorem Ipsum C",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    },
  ],
} as const

// ─── SERVICIOS SECTION ────────────────────────────────────────────────────────

export const SERVICIOS_CONTENT = {
  badge: "Lorem Ipsum",
  title: "Lorem Ipsum Servicios",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit acompañamos",
  services: [
    {
      iconName: "fileText",
      title: "Lorem Ipsum A",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    },
    {
      iconName: "box",
      title: "Lorem Ipsum B",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    },
    {
      iconName: "download",
      title: "Lorem Ipsum C",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    },
    {
      iconName: "tools",
      title: "Lorem Ipsum D",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    },
  ],
} as const

// ─── PROMO BANNER ─────────────────────────────────────────────────────────────

export const PROMO_BANNER_CONTENT = {
  badge: "Lorem ipsum proyecto",
  title: "Lorem Ipsum con",
  titleHighlight: "lorem ipsum garantizada",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  ctaPrimary: "Solicitar Cotización",
  ctaPrimaryHref: "/contacto",
  ctaSecondary: "Ver Catálogo",
  ctaSecondaryHref: "/catalogo",
  features: [
    {
      iconName: "clock",
      title: "Lorem Ipsum Express",
      desc: "Lorem ipsum dolor sit amet menos de 24 horas",
      textClass: "text-[#E60000]",
      iconBgClass: "bg-[#E60000]/10 border-[#E60000]/20",
    },
    {
      iconName: "box",
      title: "Lorem Ipsum Stock",
      desc: "Lorem ipsum dolor sit amet referencias disponibles",
      textClass: "text-[#3B82F6]",
      iconBgClass: "bg-[#3B82F6]/10 border-[#3B82F6]/20",
    },
    {
      iconName: "headphones",
      title: "Lorem Ipsum Técnica",
      desc: "Lorem ipsum especialistas disponibles",
      textClass: "text-[#10B981]",
      iconBgClass: "bg-[#10B981]/10 border-[#10B981]/20",
    },
  ],
} as const

// ─── CTA BAND ─────────────────────────────────────────────────────────────────

export const CTA_BAND_CONTENT = {
  badge: "Lorem ipsum cotizar",
  title: "Lorem ipsum dolor sit",
  titleHighlight: "amet consectetur?",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum sin compromisos.",
  ctaPrimary: "Solicitar Cotización",
  ctaPrimaryHref: "/contacto",
  ctaSecondary: "Ver Catálogo",
  ctaSecondaryHref: "/catalogo",
} as const

// ─── PRODUCT DETAIL ───────────────────────────────────────────────────────────

export const PRODUCT_DETAIL_CONTENT = {
  stockBadge: "Lorem Ipsum — Despacho inmediato",
  certTitle: "Lorem Ipsum Certificado",
  certDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum normas internacionales.",
  requestLabel: "Lorem ipsum información",
  fichaTecnicaLabel: "Lorem Ipsum Técnica",
  fichaTecnicaSubLabel: "PDF · Lorem",
  cotizarLabel: "Lorem Ipsum Cotización",
  cotizarSubLabel: "Lorem ipsum < 2 horas",
  trustSignal: "Lorem ipsum gratuita · Lorem compromiso · Lorem ipsum especializada",
  tabDesc: "Lorem Ipsum Completa",
  tabSpecs: "Lorem Ipsum Técnicas",
  garantia: [
    {
      iconName: "shield",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Lorem Ipsum 12 meses",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    },
    {
      iconName: "certificate",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      title: "Lorem Ipsum Técnica",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    },
    {
      iconName: "tools",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      title: "Lorem Ipsum Técnico",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    },
  ],
  quoteModal: {
    headerLabel: "Lorem Ipsum Cotización",
    noteLabel: "Lorem ipsum nota específica (opcional)",
    notePlaceholder: "Lorem ipsum dolor sit amet, consectetur adipiscing...",
    submitLabel: "Lorem ipsum enviar consulta",
    footer: "Lorem ipsum menos de 24 horas · L-V 9am-6pm · Sáb 9am-3pm",
  },
  relatedTitle: "Lorem ipsum dolor sit amet también compraron:",
  relatedSubtitle: "Lorem ipsum complementarios del mismo sector",
} as const

/**
 * CONTENIDO ESTÁTICO DEL SITIO
 * Todos los textos, listas y datos que aparecen en las secciones del home y otras páginas.
 * Cambia aquí para actualizar cualquier texto en el sitio sin tocar los componentes.
 */

export const FOUNDING_YEAR = 2010
const YEARS_ACTIVE = new Date().getFullYear() - FOUNDING_YEAR

// ─── HERO SECTION ────────────────────────────────────────────────────────────

export const HERO_CONTENT = {
  badge: "Ferretería Eléctrica AT/MT · Lima, Perú",
  title: "Ferretería y Accesorios Eléctricos",
  titleHighlight: "para Alta y Media Tensión",
  subtitle: "Aisladores, grapas, conectores, pernos y herrajes galvanizados para líneas de alta y media tensión. Fabricantes y distribuidores con certificaciones IEC, ANSI y NTP.",
  ctaPrimary: "Ver Catálogo",
  ctaPrimaryHref: "/catalogo",
  ctaSecondary: "Solicitar Cotización",
  stats: [
    { value: "50+",               label: "Productos en Stock" },
    { value: `${YEARS_ACTIVE}+`, label: "Años de Experiencia" },
    { value: "350+",             label: "Proyectos Ejecutados" },
  ],
} as const

// ─── TRUST BAR ────────────────────────────────────────────────────────────────

export const TRUST_BAR_CONTENT = {
  label: "Confían en nosotros",
  badge: "120+ empresas",
  companies: [
    "Luz del Sur",
    "Enel Distribución",
    "Electro Sur Este",
    "Hidrandina",
    "Electronoroeste",
    "Minera Antamina",
    "Anglo American",
  ],
} as const

// ─── CATEGORIES GRID ─────────────────────────────────────────────────────────

export const CATEGORIES_GRID_CONTENT = {
  badge: "Líneas de Producto",
  title: "Nuestras Categorías",
  subtitle: "Ferretería y accesorios eléctricos para alta y media tensión: aisladores, grapas, conectores, pernos, herrajes y más",
} as const

// ─── BEST SELLERS CAROUSEL ───────────────────────────────────────────────────

export const BEST_SELLERS_CONTENT = {
  badge: "Destacados",
  title: "Productos Más Vendidos",
  subtitle: "Los favoritos de nuestros clientes del sector eléctrico",
} as const

// ─── MARQUEE BRANDS ──────────────────────────────────────────────────────────

export const MARQUEE_BRANDS_CONTENT = {
  badge: "Distribuidores Autorizados",
  title: "Marcas de Clase Mundial",
  subtitle: "Comercializamos marcas líderes con certificaciones internacionales IEC y ANSI",
} as const

// ─── PROCESO SECTION ─────────────────────────────────────────────────────────

export const PROCESO_CONTENT = {
  badge: "Cómo funciona",
  title: "Proceso de Compra",
  subtitle: "Simple, rápido y respaldado por ingenieros especializados en AT/MT",
  ctaLabel: "Iniciar mi consulta",
  ctaHref: "/contacto",
  steps: [
    {
      num: "01",
      title: "Consulta tu proyecto",
      desc: "Contáctanos con los requerimientos técnicos de tu proyecto AT/MT. Nuestros ingenieros te orientan desde el primer contacto.",
      colorClass: "from-primary/20 to-primary/5",
      textClass: "text-primary",
      borderClass: "border-primary/20",
    },
    {
      num: "02",
      title: "Recibe tu cotización",
      desc: "Elaboramos una cotización detallada con ficha técnica, especificaciones IEC/ANSI y disponibilidad de stock en menos de 24 horas.",
      colorClass: "from-red-500/20 to-red-500/5",
      textClass: "text-red-500",
      borderClass: "border-red-500/20",
    },
    {
      num: "03",
      title: "Despacho a todo el país",
      desc: "Coordinamos el despacho desde nuestro almacén a cualquier región del país, con seguimiento en tiempo real.",
      colorClass: "from-emerald-500/20 to-emerald-500/5",
      textClass: "text-emerald-600",
      borderClass: "border-emerald-500/20",
    },
  ],
} as const

// ─── SECTORES SECTION ─────────────────────────────────────────────────────────

export const SECTORES_CONTENT = {
  badge: "Sectores",
  title: "Sectores que Atendemos",
  subtitle: "Experiencia comprobada suministrando materiales para los proyectos más exigentes del sector eléctrico",
  sectors: [
    {
      iconName: "lightning",
      title: "Distribución Eléctrica",
      desc: "Líneas de media tensión, subestaciones y redes de distribución primaria y secundaria.",
      stat: "22.9 / 10kV",
    },
    {
      iconName: "zap",
      title: "Transmisión AT",
      desc: "Líneas de alta tensión, torres de transmisión y equipamiento para subestaciones de potencia.",
      stat: "60 - 220kV",
    },
    {
      iconName: "building",
      title: "Electrificación Rural",
      desc: "Proyectos de electrificación para comunidades rurales con sistemas monopostes y bipostes.",
      stat: "1,200+ km",
    },
    {
      iconName: "fire",
      title: "Sector Minero",
      desc: "Suministro de materiales para sistemas eléctricos en operaciones mineras a cielo abierto y subterráneas.",
      stat: "24/7",
    },
  ],
} as const

// ─── FULL WIDTH STATS ─────────────────────────────────────────────────────────

export const STATS_CONTENT = {
  stats: [
    { value: YEARS_ACTIVE, label: "Años de\nExperiencia", suffix: "+" },
    { value: 50, label: "Productos\nen Stock", suffix: "+" },
    { value: 350, label: "Proyectos\nEjecutados", suffix: "+" },
    { value: 98, label: "Clientes\nSatisfechos", suffix: "%" },
    { value: 12, label: "Marcas\nLíderes", suffix: "+" },
  ],
} as const

// ─── FEATURED OFFERS ──────────────────────────────────────────────────────────

export const FEATURED_OFFERS_CONTENT = {
  badge: "Líneas de Producto",
  title: "Nuestras Especialidades",
  subtitle: "Ferretería y accesorios eléctricos para alta y media tensión en los sectores más exigentes del país",
  offers: [
    {
      iconName: "shield",
      title: "Aisladores y Herrajes AT/MT",
      subtitle: "Porcelana, Poliméricos y Vidrio",
      description: "Línea completa de aisladores, grapas, preformados y amortiguadores para líneas de alta y media tensión.",
      gradient: "from-blue-700 to-blue-900",
    },
    {
      iconName: "bolt",
      title: "Conectores y Accesorios AT/MT",
      subtitle: "AB Cobreado, Splitbolt, Bimetálicos Al/Cu",
      description: "Conectores a compresión, bimetálicos Al/Cu y splitbolt para empalmes y derivaciones en redes aéreas y subterráneas.",
      gradient: "from-red-700 to-red-900",
    },
    {
      iconName: "tools",
      title: "Ferretería Eléctrica",
      subtitle: "Crucetas, Pernos, Estructuras",
      description: "Ferretería galvanizada en caliente para montaje de estructuras y postes de líneas de potencia.",
      gradient: "from-zinc-600 to-zinc-800",
    },
  ],
} as const

// ─── CERTIFICACIONES STRIP ────────────────────────────────────────────────────

export const CERTIFICACIONES_CONTENT = {
  label: "Certificaciones y Normas que cumplimos",
  certs: [
    { code: "IEC 60305", desc: "Aisladores para líneas aéreas", colorClass: "text-blue-700", bgClass: "bg-blue-50 border-blue-100" },
    { code: "ANSI C29.2", desc: "Aisladores de suspensión AT", colorClass: "text-indigo-700", bgClass: "bg-indigo-50 border-indigo-100" },
    { code: "ISO 9001", desc: "Sistema de Gestión de Calidad", colorClass: "text-emerald-700", bgClass: "bg-emerald-50 border-emerald-100" },
    { code: "NTP 370.043", desc: "Norma Técnica Peruana AT/MT", colorClass: "text-amber-700", bgClass: "bg-amber-50 border-amber-100" },
    { code: "IEEE STD", desc: "Estándar internacional AT", colorClass: "text-red-700", bgClass: "bg-red-50 border-red-100" },
  ],
} as const

// ─── COMPANY SHOWCASE ─────────────────────────────────────────────────────────

export const COMPANY_SHOWCASE_CONTENT = {
  badge: "Nuestra Empresa",
  title: "Fabricantes y Distribuidores",
  titleHighlight: "de Ferretería Eléctrica AT/MT",
  description: "Electro Thina fabrica y distribuye ferretería y accesorios eléctricos para alta y media tensión en el Perú. Contamos con stock permanente de aisladores, herrajes, conectores, cables y ferretería eléctrica con certificaciones IEC, ANSI y NTP.",
  ctaNosotros: "Conocer Más",
  ctaContacto: "Contáctanos",
  image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  imageAlt: "Torres de alta tensión — Electro Thina",
  features: [
    { iconName: "shield", title: "Certificaciones", desc: "IEC, ANSI, NTP, ISO 9001", colorClass: "bg-primary/10 text-primary" },
    { iconName: "truck", title: "Cobertura", desc: "Despachos a nivel nacional", colorClass: "bg-red-500/10 text-red-600" },
    { iconName: "headphones", title: "Soporte Técnico", desc: "Ingenieros especializados", colorClass: "bg-emerald-500/10 text-emerald-600" },
    { iconName: "clock", title: "Cotizaciones", desc: "Respuesta en 24 horas", colorClass: "bg-blue-500/10 text-blue-600" },
  ],
} as const

// ─── FABRICACION SECTION ──────────────────────────────────────────────────────

export const FABRICACION_CONTENT = {
  badge: "Fabricación Propia",
  title: "No solo distribuimos.",
  titleHighlight: "También fabricamos.",
  description: "Producimos nuestra propia línea de ferretería y accesorios eléctricos para alta y media tensión con control de calidad IEC en cada etapa. Trazabilidad completa por lote, personalización técnica por proyecto y garantía directa de fábrica.",
  ctaLabel: "Ver productos propios",
  ctaHref: "/catalogo",
  badgeLabel: "Marca Propia ET",
  image: "https://images.unsplash.com/photo-1581093196867-ca9b9e02e42e?w=800&q=80",
  imageAlt: "Planta de fabricación Electro Thina — ferretería eléctrica AT/MT",
  productLines: [
    "Conectores y herrajes para AT/MT",
    "Aisladores de porcelana y polímero",
    "Accesorios para cable de energía",
    "Protecciones y seccionadores",
    "Ferretería para líneas aéreas",
  ],
} as const

// ─── BENEFITS SECTION ─────────────────────────────────────────────────────────

export const BENEFITS_CONTENT = {
  badge: "Por qué elegirnos",
  yearsExperience: YEARS_ACTIVE,
  experienceLabel: "Años de experiencia",
  description: "Somos el socio estratégico de las principales empresas eléctricas, mineras y de construcción del país. Cada proyecto cuenta con el respaldo de nuestro equipo técnico especializado.",
  ctaLabel: "Conocer la empresa",
  ctaHref: "/nosotros",
  stats: [
    { value: "350+", label: "Proyectos ejecutados" },
    { value: "98%", label: "Clientes satisfechos" },
  ],
  benefits: [
    {
      iconName: "shield",
      title: "Certificaciones IEC & ANSI",
      description: "Todos nuestros productos cumplen normas internacionales IEC, ANSI y NTP para alta y media tensión.",
    },
    {
      iconName: "truck",
      title: "Stock Permanente Nacional",
      description: "Almacén con más de 50 referencias en stock para despacho inmediato a cualquier región del país.",
    },
    {
      iconName: "headphones",
      title: "Ingeniería Especializada",
      description: "Equipo de ingenieros eléctricos dedicados a la selección y especificación de materiales AT/MT.",
    },
  ],
} as const

// ─── SERVICIOS SECTION ────────────────────────────────────────────────────────

export const SERVICIOS_CONTENT = {
  badge: "Servicios",
  title: "Nuestros Servicios",
  subtitle: "Acompañamos cada etapa de su proyecto con soluciones integrales",
  services: [
    {
      iconName: "fileText",
      title: "Cotizaciones Especializadas",
      desc: "Elaboramos presupuestos detallados con especificaciones técnicas para licitaciones y proyectos.",
    },
    {
      iconName: "box",
      title: "Gestión de Proyectos",
      desc: "Suministro integral de materiales con despachos programados según cronograma de obra.",
    },
    {
      iconName: "download",
      title: "Fichas Técnicas",
      desc: "Acceso a documentación técnica, fichas de producto y certificados de calidad de cada ítem.",
    },
    {
      iconName: "tools",
      title: "Soporte Post-Venta",
      desc: "Asistencia técnica y seguimiento de garantías con respaldo de nuestros fabricantes.",
    },
  ],
} as const

// ─── PROMO BANNER ─────────────────────────────────────────────────────────────

export const PROMO_BANNER_CONTENT = {
  badge: "Cotizaciones para tu proyecto",
  title: "Materiales AT/MT con",
  titleHighlight: "entrega garantizada",
  description: "Solicita tu cotización personalizada y recibe respuesta en 24 horas. Suministro completo para proyectos de electrificación, líneas de transmisión y subestaciones.",
  ctaPrimary: "Solicitar Cotización",
  ctaPrimaryHref: "/contacto",
  ctaSecondary: "Ver Catálogo",
  ctaSecondaryHref: "/catalogo",
  features: [
    {
      iconName: "clock",
      title: "Cotizaciones Express",
      desc: "Respuesta en menos de 24 horas hábiles",
      textClass: "text-[#E60000]",
      iconBgClass: "bg-[#E60000]/10 border-[#E60000]/20",
    },
    {
      iconName: "box",
      title: "Stock Permanente",
      desc: "Más de 50 referencias listas para despacho",
      textClass: "text-[#3B82F6]",
      iconBgClass: "bg-[#3B82F6]/10 border-[#3B82F6]/20",
    },
    {
      iconName: "headphones",
      title: "Asesoría Técnica",
      desc: "Ingenieros especializados en AT/MT",
      textClass: "text-[#10B981]",
      iconBgClass: "bg-[#10B981]/10 border-[#10B981]/20",
    },
  ],
} as const

// ─── CTA BAND ─────────────────────────────────────────────────────────────────

export const CTA_BAND_CONTENT = {
  badge: "¿Listo para cotizar?",
  title: "¿Tienes un proyecto de",
  titleHighlight: "alta y media tensión?",
  subtitle: "Recibe una cotización técnica de ferretería y accesorios eléctricos AT/MT en menos de 24 horas. Sin compromisos.",
  ctaPrimary: "Solicitar Cotización",
  ctaPrimaryHref: "/contacto",
  ctaSecondary: "Ver Catálogo",
  ctaSecondaryHref: "/catalogo",
} as const

// ─── PRODUCT DETAIL ───────────────────────────────────────────────────────────

export const PRODUCT_DETAIL_CONTENT = {
  stockBadge: "En Stock — Despacho inmediato",
  certTitle: "Producto Certificado",
  certDesc: "Cumple normas IEC, ANSI y NTP. Respaldado por certificaciones internacionales.",
  requestLabel: "Solicitar información",
  fichaTecnicaLabel: "Ficha Técnica",
  fichaTecnicaSubLabel: "PDF · Specs",
  cotizarLabel: "Solicitar Cotización",
  cotizarSubLabel: "Respuesta < 2 horas",
  trustSignal: "Cotización gratuita · Sin compromiso · Atención técnica especializada",
  tabDesc: "Descripción Completa",
  tabSpecs: "Especificaciones Técnicas",
  garantia: [
    {
      iconName: "shield",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Garantía 12 meses",
      desc: "Por defecto de fabricación, respaldada por el fabricante original.",
    },
    {
      iconName: "certificate",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      title: "Ficha Técnica",
      desc: "Descarga disponible con especificaciones completas y certificaciones.",
    },
    {
      iconName: "tools",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      title: "Soporte Técnico",
      desc: "Ingenieros AT/MT disponibles para asesoría de selección e instalación.",
    },
  ],
  quoteModal: {
    headerLabel: "Solicitar Cotización",
    noteLabel: "¿Alguna nota o cantidad específica? (opcional)",
    notePlaceholder: "Ej: Necesito 50 unidades para proyecto de subestación...",
    submitLabel: "Enviar consulta por WhatsApp",
    footer: "Respuesta en menos de 24 horas · L-V 9am-6pm · Sáb 9am-3pm",
  },
  relatedTitle: "Clientes que vieron este producto también compraron:",
  relatedSubtitle: "Productos complementarios del mismo sector",
} as const

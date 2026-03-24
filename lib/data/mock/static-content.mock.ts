/**
 * CONTENIDO ESTÁTICO DEL SITIO
 * Todos los textos, listas y datos que aparecen en las secciones del home y otras páginas.
 * Cambia aquí para actualizar cualquier texto en el sitio sin tocar los componentes.
 */

// ─── HERO SECTION ────────────────────────────────────────────────────────────

export const HERO_CONTENT = {
  badge: "Suministro AT/MT · Lima, Peru",
  title: "Materiales Electricos",
  titleHighlight: "de Alta Tension",
  subtitle: "Aisladores, herrajes, conectores, cables y ferreteria electrica certificados IEC/ANSI para distribucion y transmision electrica.",
  ctaPrimary: "Ver Catalogo",
  ctaPrimaryHref: "/catalogo",
  ctaSecondary: "Solicitar Cotizacion",
  stats: [
    { value: "1,162+", label: "Productos en Stock" },
    { value: "20+", label: "Años de Experiencia" },
    { value: "350+", label: "Proyectos Ejecutados" },
  ],
} as const

// ─── TRUST BAR ────────────────────────────────────────────────────────────────

export const TRUST_BAR_CONTENT = {
  label: "Confian en nosotros",
  badge: "120+ empresas",
  companies: [
    "Luz del Sur",
    "Enel Distribucion",
    "Electro Sur Este",
    "Hidrandina",
    "Electronoroeste",
    "Minera Antamina",
    "Anglo American",
  ],
} as const

// ─── CATEGORIES GRID ─────────────────────────────────────────────────────────

export const CATEGORIES_GRID_CONTENT = {
  badge: "Lineas de Producto",
  title: "Nuestras Categorias",
  subtitle: "Suministro de aisladores, herrajes, conectores, cables, transformadores y ferreteria para lineas de alta y media tension",
} as const

// ─── BEST SELLERS CAROUSEL ───────────────────────────────────────────────────

export const BEST_SELLERS_CONTENT = {
  badge: "Destacados",
  title: "Productos Mas Vendidos",
  subtitle: "Los favoritos de nuestros clientes del sector electrico",
} as const

// ─── MARQUEE BRANDS ──────────────────────────────────────────────────────────

export const MARQUEE_BRANDS_CONTENT = {
  badge: "Distribuidores Autorizados",
  title: "Marcas de Clase Mundial",
  subtitle: "Comercializamos marcas lideres con certificaciones internacionales IEC y ANSI",
} as const

// ─── PROCESO SECTION ─────────────────────────────────────────────────────────

export const PROCESO_CONTENT = {
  badge: "Como funciona",
  title: "Proceso de Compra",
  subtitle: "Simple, rapido y respaldado por ingenieros especializados en AT/MT",
  ctaLabel: "Iniciar mi consulta",
  ctaHref: "/contacto",
  steps: [
    {
      num: "01",
      title: "Consulta tu proyecto",
      desc: "Contactanos con los requerimientos tecnicos de tu proyecto AT/MT. Nuestros ingenieros te orientan desde el primer contacto.",
      colorClass: "from-primary/20 to-primary/5",
      textClass: "text-primary",
      borderClass: "border-primary/20",
    },
    {
      num: "02",
      title: "Recibe tu cotizacion",
      desc: "Elaboramos una cotizacion detallada con ficha tecnica, especificaciones IEC/ANSI y disponibilidad de stock en menos de 24 horas.",
      colorClass: "from-red-500/20 to-red-500/5",
      textClass: "text-red-500",
      borderClass: "border-red-500/20",
    },
    {
      num: "03",
      title: "Despacho a todo el pais",
      desc: "Coordinamos el despacho desde nuestro almacen a cualquier region del pais, con seguimiento en tiempo real.",
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
  subtitle: "Experiencia comprobada suministrando materiales para los proyectos mas exigentes del sector electrico",
  sectors: [
    {
      iconName: "lightning",
      title: "Distribucion Electrica",
      desc: "Lineas de media tension, subestaciones y redes de distribucion primaria y secundaria.",
      stat: "22.9 / 10kV",
    },
    {
      iconName: "zap",
      title: "Transmision AT",
      desc: "Lineas de alta tension, torres de transmision y equipamiento para subestaciones de potencia.",
      stat: "60 - 220kV",
    },
    {
      iconName: "building",
      title: "Electrificacion Rural",
      desc: "Proyectos de electrificacion para comunidades rurales con sistemas monopostes y bipostes.",
      stat: "1,200+ km",
    },
    {
      iconName: "fire",
      title: "Sector Minero",
      desc: "Suministro de materiales para sistemas electricos en operaciones mineras a cielo abierto y subterraneas.",
      stat: "24/7",
    },
  ],
} as const

// ─── FULL WIDTH STATS ─────────────────────────────────────────────────────────

export const STATS_CONTENT = {
  stats: [
    { value: 20, label: "Anos de\nExperiencia", suffix: "+" },
    { value: 1162, label: "Productos\nen Stock", suffix: "+" },
    { value: 350, label: "Proyectos\nEjecutados", suffix: "+" },
    { value: 98, label: "Clientes\nSatisfechos", suffix: "%" },
    { value: 12, label: "Marcas\nLideres", suffix: "+" },
  ],
} as const

// ─── FEATURED OFFERS ──────────────────────────────────────────────────────────

export const FEATURED_OFFERS_CONTENT = {
  badge: "Lineas de Producto",
  title: "Nuestras Especialidades",
  subtitle: "Soluciones electricas industriales para los sectores mas exigentes",
  offers: [
    {
      iconName: "shield",
      title: "Aisladores y Herrajes AT/MT",
      subtitle: "Porcelana, Polimericos y Vidrio",
      description: "Linea completa de aisladores, grapas, preformados y amortiguadores para lineas de alta y media tension.",
      gradient: "from-blue-700 to-blue-900",
    },
    {
      iconName: "bolt",
      title: "Conectores y Cables AT/MT",
      subtitle: "XLPE, AAAC, EPR hasta 36kV",
      description: "Conectores a compresion, terminales termocontractiles y cables para redes aereas y subterraneas.",
      gradient: "from-red-700 to-red-900",
    },
    {
      iconName: "tools",
      title: "Ferreteria Electrica",
      subtitle: "Crucetas, Pernos, Estructuras",
      description: "Ferreteria galvanizada en caliente para montaje de estructuras y postes de lineas de potencia.",
      gradient: "from-zinc-600 to-zinc-800",
    },
  ],
} as const

// ─── CERTIFICACIONES STRIP ────────────────────────────────────────────────────

export const CERTIFICACIONES_CONTENT = {
  label: "Certificaciones y Normas que cumplimos",
  certs: [
    { code: "IEC 60305", desc: "Aisladores para lineas aereas", colorClass: "text-blue-700", bgClass: "bg-blue-50 border-blue-100" },
    { code: "ANSI C29.2", desc: "Aisladores de suspension AT", colorClass: "text-indigo-700", bgClass: "bg-indigo-50 border-indigo-100" },
    { code: "ISO 9001", desc: "Sistema de Gestion de Calidad", colorClass: "text-emerald-700", bgClass: "bg-emerald-50 border-emerald-100" },
    { code: "NTP 370.043", desc: "Norma Tecnica Peruana AT/MT", colorClass: "text-amber-700", bgClass: "bg-amber-50 border-amber-100" },
    { code: "IEEE STD", desc: "Estandar internacional AT", colorClass: "text-red-700", bgClass: "bg-red-50 border-red-100" },
  ],
} as const

// ─── COMPANY SHOWCASE ─────────────────────────────────────────────────────────

export const COMPANY_SHOWCASE_CONTENT = {
  badge: "Nuestra Empresa",
  title: "Suministro e Ingenieria",
  titleHighlight: "Especializada en AT/MT",
  description: "Electro Thina es una empresa fabricante y distribuidora de ferreteria y accesorios electricos para lineas de alta y media tension. Contamos con un amplio stock de aisladores, herrajes, conectores, cables y materiales de ferreteria electrica con certificaciones internacionales.",
  ctaNosotros: "Conocer Mas",
  ctaContacto: "Contactanos",
  image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  imageAlt: "Torres de alta tension",
  features: [
    { iconName: "shield", title: "Certificaciones", desc: "IEC, ANSI, NTP, ISO 9001", colorClass: "bg-primary/10 text-primary" },
    { iconName: "truck", title: "Cobertura", desc: "Despachos a nivel nacional", colorClass: "bg-red-500/10 text-red-600" },
    { iconName: "headphones", title: "Soporte Tecnico", desc: "Ingenieros especializados", colorClass: "bg-emerald-500/10 text-emerald-600" },
    { iconName: "clock", title: "Cotizaciones", desc: "Respuesta en 24 horas", colorClass: "bg-blue-500/10 text-blue-600" },
  ],
} as const

// ─── FABRICACION SECTION ──────────────────────────────────────────────────────

export const FABRICACION_CONTENT = {
  badge: "Fabricacion Propia",
  title: "No solo distribuimos.",
  titleHighlight: "Tambien fabricamos.",
  description: "Somos fabricantes de nuestra propia linea de accesorios electricos bajo estrictos controles de calidad IEC. Esto nos permite ofrecer trazabilidad completa, personalizacion tecnica y garantias directas — lo que ningun revendedor puede dar.",
  ctaLabel: "Ver productos propios",
  ctaHref: "/catalogo",
  badgeLabel: "Marca Propia ET",
  image: "https://images.unsplash.com/photo-1581093196867-ca9b9e02e42e?w=800&q=80",
  imageAlt: "Planta de fabricacion Electro Thina",
  productLines: [
    "Conectores y herrajes para AT/MT",
    "Aisladores de porcelana y polimero",
    "Accesorios para cable de energia",
    "Protecciones y seccionadores",
    "Ferreteria para lineas aereas",
  ],
} as const

// ─── BENEFITS SECTION ─────────────────────────────────────────────────────────

export const BENEFITS_CONTENT = {
  badge: "Por que elegirnos",
  yearsExperience: 20,
  experienceLabel: "Anos de experiencia",
  description: "Somos el socio estrategico de las principales empresas electricas, mineras y de construccion del pais. Cada proyecto cuenta con el respaldo de nuestro equipo tecnico especializado.",
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
      description: "Todos nuestros productos cumplen normas internacionales IEC, ANSI y NTP para alta y media tension.",
    },
    {
      iconName: "truck",
      title: "Stock Permanente Nacional",
      description: "Almacen con mas de 1,000 items en stock para despacho inmediato a cualquier region del pais.",
    },
    {
      iconName: "headphones",
      title: "Ingenieria Especializada",
      description: "Equipo de ingenieros electricos dedicados a la seleccion y especificacion de materiales AT/MT.",
    },
  ],
} as const

// ─── SERVICIOS SECTION ────────────────────────────────────────────────────────

export const SERVICIOS_CONTENT = {
  badge: "Servicios",
  title: "Nuestros Servicios",
  subtitle: "Acompanamos cada etapa de su proyecto con soluciones integrales",
  services: [
    {
      iconName: "fileText",
      title: "Cotizaciones Especializadas",
      desc: "Elaboramos presupuestos detallados con especificaciones tecnicas para licitaciones y proyectos.",
    },
    {
      iconName: "box",
      title: "Gestion de Proyectos",
      desc: "Suministro integral de materiales con despachos programados segun cronograma de obra.",
    },
    {
      iconName: "download",
      title: "Fichas Tecnicas",
      desc: "Acceso a documentacion tecnica, fichas de producto y certificados de calidad de cada item.",
    },
    {
      iconName: "tools",
      title: "Soporte Post-Venta",
      desc: "Asistencia tecnica y seguimiento de garantias con respaldo de nuestros fabricantes.",
    },
  ],
} as const

// ─── PROMO BANNER ─────────────────────────────────────────────────────────────

export const PROMO_BANNER_CONTENT = {
  badge: "Cotizaciones para tu proyecto",
  title: "Materiales AT/MT con",
  titleHighlight: "entrega garantizada",
  description: "Solicita tu cotizacion personalizada y recibe respuesta en 24 horas. Suministro completo para proyectos de electrificacion, lineas de transmision y subestaciones.",
  ctaPrimary: "Solicitar Cotizacion",
  ctaPrimaryHref: "/contacto",
  ctaSecondary: "Ver Catalogo",
  ctaSecondaryHref: "/catalogo",
  features: [
    {
      iconName: "clock",
      title: "Cotizaciones Express",
      desc: "Respuesta en menos de 24 horas habiles",
      textClass: "text-[#E60000]",
      iconBgClass: "bg-[#E60000]/10 border-[#E60000]/20",
    },
    {
      iconName: "box",
      title: "Stock Permanente",
      desc: "Mas de 1,162 items listos para despacho",
      textClass: "text-[#3B82F6]",
      iconBgClass: "bg-[#3B82F6]/10 border-[#3B82F6]/20",
    },
    {
      iconName: "headphones",
      title: "Asesoria Tecnica",
      desc: "Ingenieros especializados en AT/MT",
      textClass: "text-[#10B981]",
      iconBgClass: "bg-[#10B981]/10 border-[#10B981]/20",
    },
  ],
} as const

// ─── CTA BAND ─────────────────────────────────────────────────────────────────

export const CTA_BAND_CONTENT = {
  badge: "Listo para cotizar?",
  title: "Tienes un proyecto",
  titleHighlight: "AT/MT en mente?",
  subtitle: "Recibe una cotizacion tecnica personalizada en menos de 24 horas. Sin compromisos.",
  ctaPrimary: "Solicitar Cotizacion",
  ctaPrimaryHref: "/contacto",
  ctaSecondary: "Ver Catalogo",
  ctaSecondaryHref: "/catalogo",
} as const

// ─── PRODUCT DETAIL ───────────────────────────────────────────────────────────

export const PRODUCT_DETAIL_CONTENT = {
  stockBadge: "En Stock — Despacho inmediato",
  certTitle: "Producto Certificado",
  certDesc: "Cumple normas IEC, ANSI y NTP. Respaldado por certificaciones internacionales.",
  requestLabel: "Solicitar informacion",
  fichaTecnicaLabel: "Ficha Tecnica",
  fichaTecnicaSubLabel: "PDF · Specs",
  cotizarLabel: "Solicitar Cotizacion",
  cotizarSubLabel: "Respuesta < 2 horas",
  trustSignal: "Cotizacion gratuita · Sin compromiso · Atencion tecnica especializada",
  tabDesc: "Descripcion Completa",
  tabSpecs: "Especificaciones Tecnicas",
  garantia: [
    {
      iconName: "shield",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Garantia 12 meses",
      desc: "Por defecto de fabricacion, respaldada por el fabricante original.",
    },
    {
      iconName: "certificate",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      title: "Ficha Tecnica",
      desc: "Descarga disponible con especificaciones completas y certificaciones.",
    },
    {
      iconName: "tools",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      title: "Soporte Tecnico",
      desc: "Ingenieros AT/MT disponibles para asesoria de seleccion e instalacion.",
    },
  ],
  quoteModal: {
    headerLabel: "Solicitar Cotizacion",
    noteLabel: "Alguna nota o cantidad especifica? (opcional)",
    notePlaceholder: "Ej: Necesito 50 unidades para proyecto de subestacion...",
    submitLabel: "Enviar consulta por WhatsApp",
    footer: "Respuesta en menos de 24 horas · L-V 9am-6pm · Sab 9am-3pm",
  },
  relatedTitle: "Clientes que vieron este producto tambien compraron:",
  relatedSubtitle: "Productos complementarios del mismo sector",
} as const

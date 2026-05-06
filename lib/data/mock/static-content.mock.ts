/**
 * CONTENIDO ESTÁTICO DEL SITIO — INSUMIND Perú S.A.C.
 * Todos los textos, listas y datos que aparecen en las secciones del home y otras páginas.
 * Cambia aquí para actualizar cualquier texto en el sitio sin tocar los componentes.
 */

// ─── HERO SECTION ────────────────────────────────────────────────────────────

export const HERO_CONTENT = {
  badge: "Insumos Industriales y Mineros · Lima, Perú",
  title: "Soluciones en Insumos",
  titleHighlight: "Industriales y Mineros para el Perú",
  subtitle: "Distribuidora peruana con stock permanente de materiales y accesorios 100% originales y con garantía para minería, construcción, manufactura y pesca. Entrega en Lima y despacho a nivel nacional.",
  ctaPrimary: "Cotiza por WhatsApp",
  ctaPrimaryHref: "/contacto",
  ctaSecondary: "Ver Catálogo",
  ctaSecondaryHref: "/catalogo",
  stats: [
    { value: "500+",  label: "Referencias en Stock" },
    { value: "20+",   label: "Marcas Originales" },
    { value: "24h",   label: "Entrega en Lima" },
    { value: "100%",  label: "Productos Originales" },
  ],
} as const

// ─── TRUST BAR ────────────────────────────────────────────────────────────────

export const TRUST_BAR_CONTENT = {
  label: "Empresas y sectores que confían en INSUMIND",
  badge: "500+ referencias en stock",
  companies: [
    "Minería",
    "Construcción",
    "Manufactura",
    "Pesca",
    "Agroindustria",
    "Proyectos Mineros",
    "Plantas Industriales",
  ],
} as const

// ─── CATEGORIES GRID ─────────────────────────────────────────────────────────

export const CATEGORIES_GRID_CONTENT = {
  badge: "5 Categorías Principales",
  title: "Encuentra el insumo que necesitas",
  subtitle: "Stock permanente de las principales marcas industriales del mundo. Rodamientos, filtros, válvulas, correas y componentes hidráulicos originales.",
} as const

// ─── BEST SELLERS CAROUSEL ───────────────────────────────────────────────────

export const BEST_SELLERS_CONTENT = {
  badge: "Más Consultados",
  title: "Insumos con mayor demanda",
  subtitle: "Los productos que las empresas mineras e industriales del Perú solicitan con mayor frecuencia",
} as const

// ─── MARQUEE BRANDS ──────────────────────────────────────────────────────────

export const MARQUEE_BRANDS_CONTENT = {
  badge: "Distribuidores Autorizados",
  title: "Distribuimos las marcas industriales más confiables del mundo",
  subtitle: "SKF · Timken · INA · NSK · FAG · Parker · Rexroth · Gates · Optibelt · Donaldson · Kitz · Bray y más",
} as const

// ─── PROCESO SECTION ─────────────────────────────────────────────────────────

export const PROCESO_CONTENT = {
  badge: "Así funciona",
  title: "Proceso de cotización y despacho",
  subtitle: "Simple, rápido y transparente. Tu insumo en Lima al día siguiente de confirmado tu depósito.",
  ctaLabel: "Iniciar cotización ahora",
  ctaHref: "/contacto",
  steps: [
    {
      num: "01",
      title: "Escríbenos qué necesitas",
      desc: "Contáctanos por WhatsApp o correo indicando el producto, marca, modelo y cantidad. Si tienes el código o referencia del fabricante, inclúyelo para mayor precisión.",
      colorClass: "from-primary/20 to-primary/5",
      textClass: "text-primary",
      borderClass: "border-primary/20",
    },
    {
      num: "02",
      title: "Recibe tu cotización formal",
      desc: "En menos de 2 horas en horario hábil te enviamos una cotización formal con precios, disponibilidad de stock y tiempo de entrega exacto. Sin compromisos.",
      colorClass: "from-[#FF6B35]/20 to-[#FF6B35]/5",
      textClass: "text-[#FF6B35]",
      borderClass: "border-[#FF6B35]/20",
    },
    {
      num: "03",
      title: "Confirmás y despachamos",
      desc: "Confirmado tu depósito o transferencia, preparamos tu pedido y despachamos al día siguiente hábil en Lima. Despacho nacional coordinado con operadores logísticos confiables.",
      colorClass: "from-emerald-500/20 to-emerald-500/5",
      textClass: "text-emerald-600",
      borderClass: "border-emerald-500/20",
    },
  ],
} as const

// ─── SECTORES SECTION ─────────────────────────────────────────────────────────

export const SECTORES_CONTENT = {
  badge: "Sectores",
  title: "Atendemos a los sectores más exigentes del Perú",
  subtitle: "Stock permanente de insumos originales para minería, construcción, manufactura, pesca y agroindustria en todo el Perú.",
  sectors: [
    {
      iconName: "lightning",
      title: "Minería",
      desc: "Insumos para operaciones mineras en Cajamarca, Arequipa, Cusco, Moquegua y todo el Perú.",
      stat: "Cobertura nacional",
    },
    {
      iconName: "zap",
      title: "Construcción",
      desc: "Materiales para equipos CAT, Komatsu, Volvo CE, JCB y retroexcavadoras en obra.",
      stat: "CAT · Komatsu · Volvo",
    },
    {
      iconName: "building",
      title: "Manufactura",
      desc: "Insumos para líneas de producción, motores eléctricos, compresores y reductores industriales.",
      stat: "Líneas de producción",
    },
    {
      iconName: "fire",
      title: "Pesca y Agroindustria",
      desc: "Rodamientos, correas y filtros para embarcaciones, plantas pesqueras y maquinaria agroindustrial.",
      stat: "Pesca · Agro",
    },
  ],
} as const

// ─── FULL WIDTH STATS ─────────────────────────────────────────────────────────

export const STATS_CONTENT = {
  stats: [
    { value: 500, label: "Referencias\nen Stock",    suffix: "+" },
    { value: 20,  label: "Marcas\nOriginales",       suffix: "+" },
    { value: 5,   label: "Categorías\nPrincipales",  suffix: "" },
    { value: 98,  label: "Clientes\nSatisfechos",    suffix: "%" },
    { value: 1,   label: "Día Entrega\nLima",        suffix: "" },
  ],
} as const

// ─── FEATURED OFFERS ──────────────────────────────────────────────────────────

export const FEATURED_OFFERS_CONTENT = {
  badge: "Líneas Principales",
  title: "Nuestras especialidades en insumos",
  subtitle: "Stock permanente de las categorías más demandadas por la industria y minería peruana",
  offers: [
    {
      iconName: "shield",
      title: "Rodamientos Industriales",
      subtitle: "SKF · Timken · INA · NSK · FAG",
      description: "Rodamientos de bolas, rodillos, cónicos y esféricos de las marcas líderes mundiales. Stock permanente para minería, manufactura y construcción.",
      gradient: "from-primary to-[#00528c]",
    },
    {
      iconName: "bolt",
      title: "Filtros y Correas",
      subtitle: "Donaldson · Gates · Optibelt · Fleetguard",
      description: "Filtros para maquinaria pesada y correas de transmisión de potencia originales con garantía de fábrica. Para equipos CAT, Komatsu y más.",
      gradient: "from-secondary to-[#002a52]",
    },
    {
      iconName: "tools",
      title: "Hidráulicos y Válvulas",
      subtitle: "Parker · Rexroth · Kitz · Bray",
      description: "Componentes hidráulicos y válvulas industriales para procesos de minería, manufactura y tratamiento de fluidos en todo el Perú.",
      gradient: "from-accent to-[#e55b2a]",
    },
  ],
} as const

// ─── CERTIFICACIONES STRIP ────────────────────────────────────────────────────

export const CERTIFICACIONES_CONTENT = {
  label: "Productos originales con garantía de fábrica y trazabilidad de lote",
  certs: [
    { code: "100% Originales", desc: "Solo productos nuevos con garantía", colorClass: "text-blue-700", bgClass: "bg-blue-50 border-blue-100" },
    { code: "Garantía Fábrica", desc: "Trazabilidad de lote certificada", colorClass: "text-indigo-700", bgClass: "bg-indigo-50 border-indigo-100" },
    { code: "RUC Activo SUNAT", desc: "Empresa formal registrada en Perú", colorClass: "text-emerald-700", bgClass: "bg-emerald-50 border-emerald-100" },
    { code: "Factura Electrónica", desc: "Comprobantes electrónicos SUNAT", colorClass: "text-amber-700", bgClass: "bg-amber-50 border-amber-100" },
    { code: "Stock en Lima", desc: "Entrega al día siguiente en Lima", colorClass: "text-red-700", bgClass: "bg-red-50 border-red-100" },
  ],
} as const

// ─── COMPANY SHOWCASE ─────────────────────────────────────────────────────────

export const COMPANY_SHOWCASE_CONTENT = {
  badge: "Quiénes Somos",
  title: "Tu proveedor de insumos industriales",
  titleHighlight: "de confianza en Lima",
  description: "Insumind Perú S.A.C. es una empresa peruana especializada en la distribución de insumos industriales y mineros de alta calidad. Distribuimos rodamientos, filtros, válvulas, correas y componentes hidráulicos de las marcas más reconocidas del mundo: SKF, Timken, Parker, Gates, Donaldson, Kitz y más. Todos originales, todos con garantía, todos disponibles en Lima.",
  ctaNosotros: "Conoce más sobre nosotros",
  ctaContacto: "Contáctanos",
  image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80",
  imageAlt: "Almacén de insumos industriales y mineros en Lima, Perú",
  features: [
    { iconName: "shield",     title: "Productos 100% Originales",  desc: "Garantía de fábrica · Trazabilidad de lote",         colorClass: "bg-primary/10 text-primary" },
    { iconName: "truck",      title: "Entrega en 1 día en Lima",   desc: "Confirmado el depósito, despachamos al día siguiente", colorClass: "bg-[#FF6B35]/10 text-[#FF6B35]" },
    { iconName: "headphones", title: "Asesoría Técnica Gratuita",  desc: "Identificamos el producto correcto para tu equipo",    colorClass: "bg-emerald-500/10 text-emerald-600" },
    { iconName: "clock",      title: "Empresa Formal Registrada",  desc: "RUC activo · Facturas y boletas electrónicas",         colorClass: "bg-blue-500/10 text-blue-600" },
  ],
} as const

// ─── FABRICACION SECTION ──────────────────────────────────────────────────────

export const FABRICACION_CONTENT = {
  badge: "Distribución Especializada",
  title: "No importamos bajo pedido.",
  titleHighlight: "Tenemos stock real en Lima.",
  description: "A diferencia de intermediarios que deben importar bajo pedido, Insumind mantiene stock permanente en su almacén en Los Olivos, Lima. Más de 500 referencias disponibles para entrega al día siguiente de confirmado tu depósito, sin esperas de semanas.",
  ctaLabel: "Ver productos en stock",
  ctaHref: "/catalogo",
  badgeLabel: "Stock Permanente",
  image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  imageAlt: "Almacén con stock permanente de insumos industriales en Lima",
  productLines: [
    "Rodamientos SKF · Timken · INA · NSK · FAG",
    "Filtros Donaldson · Fleetguard · Caterpillar",
    "Válvulas Kitz · Bray · KSB · Velan",
    "Correas Gates · Optibelt · Continental",
    "Hidráulicos Parker · Rexroth · Yuken",
  ],
} as const

// ─── BENEFITS SECTION ─────────────────────────────────────────────────────────

export const BENEFITS_CONTENT = {
  badge: "Por qué elegirnos",
  yearsExperience: 5,
  experienceLabel: "años de experiencia en insumos industriales",
  description: "En un mercado donde abundan las falsificaciones y los productos de dudosa procedencia, INSUMIND se distingue por la garantía de originalidad, el stock real y la atención técnica especializada.",
  ctaLabel: "Conoce nuestra empresa",
  ctaHref: "/nosotros",
  stats: [
    { value: "500+", label: "referencias en stock" },
    { value: "98%",  label: "clientes satisfechos" },
  ],
  benefits: [
    {
      iconName: "shield",
      title: "Garantía de Originalidad",
      description: "Todos nuestros productos son 100% originales con garantía de fábrica y trazabilidad de lote. Nunca vendemos imitaciones ni productos reacondicionados.",
    },
    {
      iconName: "truck",
      title: "Stock Real · Entrega en 24h",
      description: "Almacén propio en Los Olivos, Lima. Más de 500 referencias para entrega al día siguiente de confirmado tu depósito, sin esperas de importación.",
    },
    {
      iconName: "headphones",
      title: "Asesoría Técnica Gratuita",
      description: "Nuestro equipo te ayuda a identificar el producto correcto para tu equipo, modelo y condiciones de operación — sin costo adicional.",
    },
  ],
} as const

// ─── SERVICIOS SECTION ────────────────────────────────────────────────────────

export const SERVICIOS_CONTENT = {
  badge: "Servicios",
  title: "¿Cómo te ayudamos?",
  subtitle: "Acompañamos cada requerimiento desde la consulta hasta la entrega y postventa",
  services: [
    {
      iconName: "fileText",
      title: "Cotización Formal",
      desc: "Recibes una cotización formal con precios, disponibilidad y tiempo de entrega en menos de 2 horas en horario hábil.",
    },
    {
      iconName: "box",
      title: "Despacho Rápido",
      desc: "Confirmado tu depósito, despachamos en Lima al día siguiente. Coordinamos despachos nacionales con operadores logísticos confiables.",
    },
    {
      iconName: "download",
      title: "Comprobantes Electrónicos",
      desc: "Emitimos facturas y boletas electrónicas SUNAT para todas nuestras ventas. Puedes registrarnos como proveedor con total confianza.",
    },
    {
      iconName: "tools",
      title: "Soporte Postventa",
      desc: "Si un producto presenta falla de fabricación, gestionamos la garantía con el fabricante. Responsabilidad postventa garantizada.",
    },
  ],
} as const

// ─── PROMO BANNER ─────────────────────────────────────────────────────────────

export const PROMO_BANNER_CONTENT = {
  badge: "¿Insumo urgente para tu proyecto?",
  title: "Entrega en Lima al",
  titleHighlight: "día siguiente garantizada",
  description: "Stock permanente en nuestro almacén en Los Olivos. Confirmado tu depósito, preparamos y despachamos. Sin esperas de importación, sin pretextos.",
  ctaPrimary: "Solicitar Cotización",
  ctaPrimaryHref: "/contacto",
  ctaSecondary: "Ver Catálogo",
  ctaSecondaryHref: "/catalogo",
  features: [
    {
      iconName: "clock",
      title: "Cotización Express",
      desc: "Respuesta en menos de 2 horas en horario hábil",
      textClass: "text-[#E60000]",
      iconBgClass: "bg-[#E60000]/10 border-[#E60000]/20",
    },
    {
      iconName: "box",
      title: "500+ en Stock",
      desc: "Referencias disponibles para entrega inmediata",
      textClass: "text-[#3B82F6]",
      iconBgClass: "bg-[#3B82F6]/10 border-[#3B82F6]/20",
    },
    {
      iconName: "headphones",
      title: "Asesoría Técnica",
      desc: "Asesores especializados disponibles Lun-Vie 9am-6pm",
      textClass: "text-[#10B981]",
      iconBgClass: "bg-[#10B981]/10 border-[#10B981]/20",
    },
  ],
} as const

// ─── CTA BAND ─────────────────────────────────────────────────────────────────

export const CTA_BAND_CONTENT = {
  badge: "¿Insumo urgente?",
  title: "¿Necesitas un insumo industrial",
  titleHighlight: "o minero urgente?",
  subtitle: "Contáctanos ahora y recibe atención inmediata de nuestro equipo técnico especializado. Entrega en Lima al día siguiente de confirmado tu depósito.",
  ctaPrimary: "Cotizar por WhatsApp",
  ctaPrimaryHref: "/contacto",
  ctaSecondary: "Ver Catálogo",
  ctaSecondaryHref: "/catalogo",
} as const

// ─── PRODUCT DETAIL ───────────────────────────────────────────────────────────

export const PRODUCT_DETAIL_CONTENT = {
  stockBadge: "En stock — Despacho al día siguiente en Lima",
  certTitle: "Producto 100% Original",
  certDesc: "Todos nuestros productos son nuevos, originales y cuentan con garantía de fábrica y trazabilidad de lote.",
  requestLabel: "Solicitar información técnica",
  fichaTecnicaLabel: "Ficha Técnica",
  fichaTecnicaSubLabel: "PDF · Fabricante",
  cotizarLabel: "Solicitar Cotización",
  cotizarSubLabel: "Respuesta en < 2 horas",
  trustSignal: "Asesoría técnica gratuita · Sin compromiso · Producto original garantizado",
  tabDesc: "Descripción Completa",
  tabSpecs: "Especificaciones Técnicas",
  garantia: [
    {
      iconName: "shield",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Garantía de Fábrica",
      desc: "Producto original con garantía del fabricante. Ante cualquier falla de fabricación, gestionamos el reclamo directamente.",
    },
    {
      iconName: "certificate",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      title: "Trazabilidad de Lote",
      desc: "Cada producto tiene documentación de origen y trazabilidad de lote que acredita su autenticidad.",
    },
    {
      iconName: "tools",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      title: "Soporte Técnico",
      desc: "Nuestro equipo técnico te asesora en la selección del producto correcto según tu aplicación y equipo.",
    },
  ],
  quoteModal: {
    headerLabel: "Solicitar Cotización",
    noteLabel: "Nota específica (opcional)",
    notePlaceholder: "Indica marca de preferencia, cantidad exacta o cualquier especificación adicional...",
    submitLabel: "Enviar solicitud de cotización",
    footer: "Respuesta en menos de 2 horas · L-V 9am-6pm · Sáb 9am-1pm",
  },
  relatedTitle: "Clientes que vieron este producto también consultaron:",
  relatedSubtitle: "Insumos complementarios de la misma categoría",
} as const

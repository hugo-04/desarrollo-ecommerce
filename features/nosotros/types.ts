export type NosotrosIconKey = "shield" | "truck" | "bolt" | "headphones"

export interface NosotrosStat {
  end: number
  suffix: string
  label: string
}

export interface NosotrosValor {
  iconKey: NosotrosIconKey
  title: string
  description: string
}

export interface NosotrosData {
  hero: {
    badge: string
    h1: string
    subtitle: string
  }
  stats: NosotrosStat[]
  historia: {
    sectionLabel: string
    h2: string
    p1: string
    p2: string
    trustBadges: string[]
    imageUrl: string
    imageAlt: string
    overlayCity: string
    overlayStock: string
  }
  mision: {
    badge: string
    h3: string
    description: string
    bullets: string[]
  }
  vision: {
    badge: string
    h3: string
    description: string
    bullets: string[]
  }
  valores: NosotrosValor[]
  cta: {
    h2: string
    description: string
  }
}

export const DEFAULT_NOSOTROS: NosotrosData = {
  hero: {
    badge: "Quiénes somos",
    h1: "Somos INSUMIND — Tu Distribuidora Peruana de Insumos Industriales y Mineros",
    subtitle:
      "Insumind Perú S.A.C. — Insumos Mineros Industriales. Empresa peruana especializada en la distribución de insumos industriales y mineros de alta calidad con garantía de originalidad.",
  },
  stats: [
    { end: 500, suffix: "+", label: "Referencias en Stock" },
    { end: 20,  suffix: "+", label: "Marcas Originales" },
    { end: 5,   suffix: "",  label: "Categorías" },
    { end: 98,  suffix: "%", label: "Clientes Satisfechos" },
  ],
  historia: {
    sectionLabel: "Nuestra Historia",
    h2: "Empresa peruana con un propósito claro: ser el proveedor más confiable de insumos industriales",
    p1: "Insumind Perú S.A.C. — cuyo nombre significa Insumos Mineros Industriales — es una empresa peruana fundada con un propósito claro: ser el proveedor más confiable y eficiente de materiales y accesorios industriales para las empresas mineras, constructoras, manufactureras y pesqueras del Perú.",
    p2: "Nacimos de la experiencia directa en el sector industrial peruano, comprendiendo la necesidad crítica que tienen las empresas de contar con un proveedor serio, formal y rápido que garantice la autenticidad de cada producto. En el mercado industrial, una pieza falsa o de baja calidad no solo genera pérdidas económicas — puede paralizar operaciones completas y comprometer la seguridad de los trabajadores. Por eso, en INSUMIND solo distribuimos productos 100% originales con garantía de fábrica y trazabilidad de lote.",
    trustBadges: ["Productos 100% Originales", "RUC Activo SUNAT", "Factura Electrónica", "Stock Lima"],
    imageUrl: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=900&q=80",
    imageAlt: "Almacén de insumos industriales y mineros en Lima, Perú — INSUMIND",
    overlayCity: "Los Olivos",
    overlayStock: "500+",
  },
  mision: {
    badge: "Misión",
    h3: "Proveer a la industria y minería peruana con insumos originales y de calidad",
    description:
      "Ser el socio estratégico de abastecimiento más confiable del Perú — proveyendo insumos originales con entrega oportuna, precios competitivos y asesoría técnica especializada para que las operaciones industriales nunca se detengan.",
    bullets: [
      "Productos 100% originales con garantía de fábrica",
      "Asesoría técnica especializada sin costo adicional",
      "Stock permanente · entrega al día siguiente en Lima",
    ],
  },
  vision: {
    badge: "Visión",
    h3: "Ser la distribuidora industrial de referencia a nivel nacional",
    description:
      "Ser reconocidos por la garantía, confianza y calidad de cada producto que distribuimos, expandiendo nuestra presencia en los principales sectores productivos del Perú: minería, construcción, manufactura, pesca y agroindustria.",
    bullets: [
      "Cobertura nacional en proyectos industriales y mineros",
      "Referente en distribución de insumos originales en el Perú",
      "Socio estratégico de empresas de todos los sectores productivos",
    ],
  },
  valores: [
    {
      iconKey: "shield",
      title: "Garantía de Originalidad",
      description:
        "Todos nuestros productos son 100% originales con certificado de autenticidad y trazabilidad de lote. Nunca vendemos imitaciones ni productos reacondicionados.",
    },
    {
      iconKey: "truck",
      title: "Entrega Oportuna",
      description:
        "Almacén propio en Los Olivos, Lima. Más de 500 referencias disponibles para entrega al día siguiente de confirmado tu depósito. Sin esperas de importación.",
    },
    {
      iconKey: "bolt",
      title: "Asesoría Técnica Gratuita",
      description:
        "Nuestros asesores te ayudan a identificar el producto correcto para tu equipo, modelo y condiciones de operación — sin costo adicional.",
    },
    {
      iconKey: "headphones",
      title: "Responsabilidad Postventa",
      description:
        "Si un producto presenta alguna falla de fabricación, gestionamos la garantía con el fabricante. Comprometidos con la satisfacción total de nuestros clientes.",
    },
  ],
  cta: {
    h2: "¿Listo para trabajar con una distribuidora industrial de confianza?",
    description:
      "Contáctanos hoy y descubre por qué las empresas industriales y mineras del Perú confían en Insumind Perú S.A.C.",
  },
}

/**
 * Fuente única de verdad para categorías y subcategorías.
 * Importado por seed.ts (DB).
 *
 * Campos SEO:
 *   - name          → H1 de la página de categoría
 *   - description   → meta description (Google, 130-155 chars)
 *   - subcategories → palabras clave long-tail visibles en la tarjeta
 */

export interface CategoryData {
  name: string
  slug: string
  description: string
  colorHex: string
  colorClass: string
  subcategories: string[]
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    name: "Grapas para Conductores AT/MT",
    slug: "grapas",
    description: "Grapas de anclaje tipo pistola, suspensión tipo barquito y preformadas para conductores AAAC y cable ABC en líneas de alta y media tensión.",
    colorHex: "#374151",
    colorClass: "from-slate-600 to-slate-800",
    subcategories: [
      "Grapa de Anclaje Tipo Pistola de Aluminio 25/70mm²",
      "Grapa de Suspensión Tipo Barquito 50/120mm²",
      "Grapa Forjada 3/8\" para Líneas Eléctricas",
      "Grapas Preformadas para Conductores AAAC/MT",
    ],
  },
  {
    name: "Conectores Eléctricos Bimetálicos",
    slug: "conectores",
    description: "Conectores AB cobreados, splitbolt y bimetálicos Al/Cu a compresión para empalmes y derivaciones en redes de alta y media tensión. Certificados IEC.",
    colorHex: "#B91C1C",
    colorClass: "from-red-700 to-red-900",
    subcategories: [
      "Conector AB Cobreado 5/8\" para Conductores AT/MT",
      "Conector Splitbolt Tipo Perno Partido 16mm²",
      "Conectores Bimetálicos Al/Cu a Compresión",
      "Conectores Doble Vía Aluminio-Aluminio",
    ],
  },
  {
    name: "Pernos de Acero Galvanizado",
    slug: "pernos",
    description: "Pernos angulares, ojo y gancho de acero galvanizado en caliente para montaje de herrajes y crucetas en postes de distribución eléctrica. Stock en Lima.",
    colorHex: "#52525B",
    colorClass: "from-zinc-600 to-zinc-800",
    subcategories: [
      "Perno Angular A°G° 5/8Ø × 6\" con Tuerca",
      "Perno Ojo A°G° 5/8Ø × 6\" con Tuerca y Contratuerca",
      "Perno Gancho A°G° 5/8Ø × 6\" con 2 Arandelas",
      "Pernos Doble Armado para Crucetas Eléctricas",
    ],
  },
  {
    name: "Sistemas de Puesta a Tierra",
    slug: "puesta-a-tierra",
    description: "Varillas Copperweld, soldadura exotérmica y accesorios para sistemas de puesta a tierra en instalaciones de alta y media tensión. Normas IEC y NTP.",
    colorHex: "#047857",
    colorClass: "from-emerald-700 to-emerald-900",
    subcategories: [
      "Disco Antirrobo 5/8\" para Sistema de Puesta a Tierra",
      "Varillas Copperweld para Puesta a Tierra",
      "Soldadura Exotérmica para Puesta a Tierra",
      "Cables de Cobre Desnudo para PAT",
    ],
  },
  {
    name: "Aisladores Eléctricos de Porcelana",
    slug: "aisladores",
    description: "Aisladores pin ANSI, carrete 53-1 y tracción ANSI 54-1 de porcelana para líneas de media y baja tensión en distribución eléctrica. Normas ANSI e IEC.",
    colorHex: "#1D4ED8",
    colorClass: "from-blue-700 to-blue-900",
    subcategories: [
      "Aislador de Tracción ANSI 54-1 de Porcelana para Líneas MT",
      "Aislador Carrete 53-1 de Porcelana para Baja Tensión",
      "Aisladores Pin ANSI para Líneas de Media Tensión",
      "Aisladores de Suspensión para Líneas AT",
    ],
  },
  {
    name: "Varillas de Anclaje y Conductor",
    slug: "varillas",
    description: "Varillas de anclaje galvanizadas, de armar de aluminio y de cobre para puesta a tierra en líneas eléctricas aéreas y subestaciones de distribución.",
    colorHex: "#92400E",
    colorClass: "from-amber-700 to-amber-900",
    subcategories: [
      "Varilla de Anclaje A°G° 5/8Ø × 1.80m con Tuerca",
      "Varilla de Armar de Aluminio Simple 25mm² para Líneas BT",
      "Varilla de Cobre 5/8\" × 2.40m para Puesta a Tierra",
      "Varillas de Acero Galvanizado para Retenidas",
    ],
  },
  {
    name: "Herrajes de Anclaje para Postes",
    slug: "herrajes-anclaje",
    description: "Planchas gancho, clevis portalínea, guardacables y kits de retenida de acero galvanizado para anclaje en postes de concreto de líneas AT/MT.",
    colorHex: "#4B5563",
    colorClass: "from-slate-700 to-slate-900",
    subcategories: [
      "Plancha Gancho A°G° 1/2\" para Anclaje en Postes de Concreto",
      "Clevis Portalinea Unipolar 53-1 para Líneas Eléctricas",
      "Guardacable de Acero Forjado 3/8\" para Retenidas",
      "Guardacabo de Acero Forjado 3/8\" para Retenidas",
      "Kits Completos de Retenida para Postes",
    ],
  },
  {
    name: "Tuercas de Acero Galvanizado",
    slug: "tuercas",
    description: "Tuercas ojo, gancho y de fijación de acero galvanizado en caliente para ensamblaje de herrajes en líneas de alta y media tensión. Despacho inmediato.",
    colorHex: "#3F3F46",
    colorClass: "from-zinc-700 to-zinc-900",
    subcategories: [
      "Tuerca Ojo A°G° 16mm 5/8Ø para Líneas Eléctricas",
      "Tuercas Gancho para Estructuras Eléctricas AT/MT",
      "Tuercas de Fijación para Herrajes de Alta Tensión",
    ],
  },
  {
    name: "Pararrayos Tipo Franklin y Descargadores",
    slug: "pararrayos",
    description: "Pararrayos tetrapuntales tipo Franklin y descargadores de sobretensión para protección de estructuras e instalaciones industriales de media tensión.",
    colorHex: "#DC2626",
    colorClass: "from-red-600 to-red-800",
    subcategories: [
      "Pararrayo Tetrapuntal Tipo Franklin 1/2\" con Base",
      "Descargadores de Sobretensión para Media Tensión",
      "Pararrayos para Edificios e Instalaciones Industriales",
      "Accesorios para Sistemas de Pararrayos",
    ],
  },
  {
    name: "Amarres Preformados para Cables",
    slug: "amarres",
    description: "Amarres preformados de aluminio para conductores AAAC y cable ABC en postes de anclaje y suspensión de líneas de baja y media tensión.",
    colorHex: "#0369A1",
    colorClass: "from-blue-600 to-blue-800",
    subcategories: [
      "Amarre Preformado 3/8\" Naranja 80cm para Conductores",
      "Amarres de Retención para Conductor AAAC",
      "Amarres de Suspensión para Líneas de Media Tensión",
      "Preformados de Aluminio para Cable ABC BT",
    ],
  },
  {
    name: "Abrazaderas de Acero para Postes",
    slug: "abrazaderas",
    description: "Abrazaderas tipo cash, pastoral y retenida de acero galvanizado en caliente para fijación de accesorios en postes de concreto de distribución eléctrica.",
    colorHex: "#6D28D9",
    colorClass: "from-violet-700 to-violet-900",
    subcategories: [
      "Abrazadera A°G° para Pastoral Simple 1-1/2 × 3/16 × 125mm",
      "Abrazadera A°G° 150/200mm de 4 Sectores para Postes",
      "Abrazadera A°G° para Retenida 2 × 3/16 × 130mm",
      "Abrazadera Tipo Cash A°G° 2 × 1/4 × 180mm Doble",
    ],
  },
  {
    name: "Adaptadores y Grilletes Metálicos",
    slug: "adaptadores",
    description: "Adaptadores tipo lira, horquillas bola y conectores de herrajes metálicos para ensamblaje de estructuras en líneas de alta y media tensión.",
    colorHex: "#475569",
    colorClass: "from-slate-600 to-slate-800",
    subcategories: [
      "Adaptadores Grillete Tipo Lira para Herrajes AT",
      "Horquillas Bola para Herrajes de Alta Tensión",
      "Adaptadores Ojo para Líneas Eléctricas MT",
      "Conectores de Herrajes para Líneas de Media Tensión",
    ],
  },
  {
    name: "Accesorios para Retenidas y Vientos",
    slug: "retenidas",
    description: "Canaletas guardacable, herrajes de viento y kits completos de retenida galvanizados para postes de distribución eléctrica AT/MT. Stock en Lima, Perú.",
    colorHex: "#78350F",
    colorClass: "from-amber-600 to-amber-800",
    subcategories: [
      "Accesorios de Retenida para Postes de Concreto",
      "Canaletas Guardacable para Retenidas Eléctricas",
      "Herrajes de Viento para Torres y Estructuras",
      "Kits Completos de Retenida para Líneas AT/MT",
    ],
  },
  {
    name: "Cintas de Acero Inoxidable para Fijación",
    slug: "cintas-acero",
    description: "Cintas y flejes de acero inoxidable 3/4\" para fijación de herrajes y accesorios en postes eléctricos. Alta resistencia a la corrosión y a la intemperie.",
    colorHex: "#1E3A5F",
    colorClass: "from-slate-500 to-slate-700",
    subcategories: [
      "Cinta de Acero Inoxidable 3/4\" para Fijación de Herrajes en Postes",
      "Fleje Metálico para Fijación de Herrajes Eléctricos",
      "Cintas de Amarre para Cables y Postes de Distribución",
    ],
  },
  {
    name: "Accesorios para Fibra Óptica ADSS",
    slug: "fibra-optica",
    description: "Soportes pasantes, crucetas y herrajes para tendido de cable fibra óptica ADSS autosoportado en postes de distribución eléctrica. Lima, Perú.",
    colorHex: "#0E7490",
    colorClass: "from-cyan-700 to-cyan-900",
    subcategories: [
      "Soportes Pasantes ADSS para Postes de Distribución",
      "Crucetas de Reserva para Tendido de Fibra Óptica",
      "Clevis y Herrajes para Cable ADSS Autosoportado",
      "Accesorios de Suspensión para Fibra Óptica ADSS",
    ],
  },
  {
    name: "Empalmes para Conductores Eléctricos",
    slug: "empalmes",
    description: "Empalmes de aluminio a compresión, manguitos y conectores bimetálicos Al/Cu para unión de conductores desnudos en líneas de alta y media tensión.",
    colorHex: "#065F46",
    colorClass: "from-emerald-600 to-emerald-800",
    subcategories: [
      "Empalme de Aluminio 25mm² para Conductores Eléctricos",
      "Manguitos de Empalme para Conductor Desnudo",
      "Empalmes para Cable Desnudo AT/MT a Compresión",
      "Conectores de Empalme Bimetálicos Al/Cu",
    ],
  },
  {
    name: "Herramientas de Enzunchado",
    slug: "enzunchadora",
    description: "Enzunchadoras manuales y herramientas de tensado de fleje metálico para fijación de herrajes eléctricos en postes de distribución. Envío a todo el Perú.",
    colorHex: "#92400E",
    colorClass: "from-amber-700 to-orange-900",
    subcategories: [
      "Enzunchadoras Manuales para Fleje Metálico",
      "Herramientas de Tensado de Cinta para Postes",
      "Accesorios para Enzunchado de Herrajes en Postes",
    ],
  },
  {
    name: "Espigas para Crucetas y Postes",
    slug: "espigas",
    description: "Espigas galvanizadas 3/4\" y 1\" para crucetas de madera y punta de poste de concreto, compatibles con aisladores pin ANSI en redes de distribución MT.",
    colorHex: "#374151",
    colorClass: "from-slate-600 to-zinc-800",
    subcategories: [
      "Espiga para Cruceta 3/4\" × 12\" de Acero Galvanizado",
      "Espiga para Punta de Poste 508mm de Acero Galvanizado",
      "Espigas Troncocónicas para Punta de Poste de Concreto",
      "Espigas Galvanizadas para Aisladores Pin",
    ],
  },
  {
    name: "Fusibles de Media Tensión",
    slug: "fusibles",
    description: "Fusibles tipo K y H, portafusibles y fusibles de expulsión para protección de líneas y equipos de distribución de media tensión. Norma IEC y NTP.",
    colorHex: "#B45309",
    colorClass: "from-orange-600 to-orange-800",
    subcategories: [
      "Fusible Chicote Tipo K Cabeza Removible 1A para Media Tensión",
      "Fusibles Tipo H para Protección de Líneas MT",
      "Porta Fusibles para Sistemas de Media Tensión",
      "Fusibles de Expulsión para Líneas de Distribución MT",
    ],
  },
  {
    name: "Grilletes Forjados de Acero",
    slug: "grilletes",
    description: "Grilletes de arco y tornillo forjados galvanizados en caliente para ensamblaje de herrajes de suspensión y anclaje en líneas de alta y media tensión.",
    colorHex: "#4B5563",
    colorClass: "from-zinc-600 to-zinc-800",
    subcategories: [
      "Grillete Forjado 1/2\" Pin Rojo para Líneas Eléctricas",
      "Grilletes de Arco Forjado Galvanizado para AT",
      "Grilletes de Tornillo para Líneas de Alta Tensión",
      "Grilletes de Seguridad para Herrajes de Suspensión",
    ],
  },
  {
    name: "Hebillas para Cintas Metálicas",
    slug: "hebillas",
    description: "Hebillas de acero inoxidable para cierre y tensado de cintas metálicas en fijación de herrajes eléctricos en postes y estructuras de distribución.",
    colorHex: "#475569",
    colorClass: "from-slate-500 to-slate-700",
    subcategories: [
      "Hebilla de Acero Inoxidable para Cinta de Fleje Metálico",
      "Hebillas de Cierre para Cinta Metálica de Fijación",
      "Accesorios de Tensado para Fleje en Postes",
    ],
  },
  {
    name: "Accesorios para Iluminación Pública",
    slug: "iluminacion",
    description: "Pastorales, brazos y soportes de fierro galvanizado para montaje de luminarias viales en postes de alumbrado público. Distribución en Lima y provincias.",
    colorHex: "#D97706",
    colorClass: "from-amber-500 to-orange-700",
    subcategories: [
      "Pastorales de Fierro Galvanizado para Alumbrado Público",
      "Brazos para Luminaria Vial en Postes de Distribución",
      "Accesorios de Montaje para Postes de Iluminación",
      "Soportes para Farolas de Alumbrado Público",
    ],
  },
  {
    name: "Templadores para Retenidas y Acometidas",
    slug: "templadores",
    description: "Templadores forjados ojo/gancho, ojo/ojo y tipo sapito de acero galvanizado para tensado de retenidas y acometidas eléctricas monofásicas y trifásicas.",
    colorHex: "#1F2937",
    colorClass: "from-slate-700 to-slate-900",
    subcategories: [
      "Templador Tipo Sapito Monofásico para Acometida Eléctrica",
      "Templador Forjado Ojo/Gancho A°G° 1/2\" para Retenidas",
      "Templador Forjado Ojo/Ojo A°G° 1/2\" para Retenidas",
      "Templador Ojo/Gancho A°G° 5/8\" × 10\" para Retenidas AT",
    ],
  },
  {
    name: "Terminales a Compresión para Cables",
    slug: "terminales",
    description: "Terminales y zapatas de aluminio y cobre a compresión, bimetálicas Al/Cu, para conexión de conductores en sistemas de media tensión. Certificadas IEC.",
    colorHex: "#1C3A5F",
    colorClass: "from-blue-700 to-blue-900",
    subcategories: [
      "Terminal a Compresión de 10mm² Largo para Cables Eléctricos",
      "Terminales de Cobre a Compresión para Cables MT",
      "Zapatas a Compresión para Conductores Eléctricos",
      "Terminales Bimetálicas Al/Cu para Media Tensión",
    ],
  },
  {
    name: "Accesorios para Acometida Eléctrica",
    slug: "acometida",
    description: "Tubos bastón galvanizados 2\", herrajes y soportes para instalación de acometidas eléctricas domiciliarias mono y trifásicas en postes de distribución.",
    colorHex: "#374151",
    colorClass: "from-slate-600 to-slate-800",
    subcategories: [
      "Tubo Bastón A°G° 2\" × 3m para Acometida Eléctrica",
      "Accesorios de Acometida Monofásica Domiciliaria",
      "Herrajes para Acometida Domiciliaria en Postes",
      "Soportes y Abrazaderas para Acometida Eléctrica",
    ],
  },
  {
    name: "Seccionadores y Enlace Metálico",
    slug: "seccionadores",
    description: "Enlace metálico, seccionadores de línea y accesorios de corte para seccionamiento de conductores en sistemas de media tensión. Stock permanente en Lima.",
    colorHex: "#1E3A5F",
    colorClass: "from-slate-700 to-blue-900",
    subcategories: [
      "Enlace Metálico para Seccionadores de Alta Tensión",
      "Seccionadores de Línea para Media Tensión",
      "Accesorios de Seccionamiento para Líneas Eléctricas",
      "Herrajes para Corte y Seccionamiento de Línea AT/MT",
    ],
  },
]

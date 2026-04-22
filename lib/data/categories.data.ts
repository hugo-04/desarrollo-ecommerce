/**
 * Fuente única de verdad para categorías y subcategorías.
 * Importado por seed.ts (DB).
 *
 * Campos SEO:
 *   - name          → H1 de la página de categoría
 *   - description   → meta description (Google, 130-155 chars)
 *   - subcategories → palabras clave long-tail visibles en la tarjeta
 *
 * Fuente de datos: public/PRODUCTOS PÁGINA WEB.xlsx
 * Última sincronización: 2026-04-14
 *
 * Nota: el gradiente de color se asigna automáticamente en el frontend
 * a partir del slug (función autoGradient), sin necesidad de almacenarlo.
 */

export interface CategoryData {
  name: string
  slug: string
  description: string
  subcategories: string[]
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    name: "Grapas para Conductores AT/MT",
    slug: "grapas",
    description: "Grapas de anclaje cónica, tipo pistola y suspensión tipo barquito para conductores 16-120mm² en líneas de alta y media tensión. Despacho en Lima.",
    subcategories: [
      "Grapa de Anclaje Cónica 16-35mm Tipo Cocodrilo",
      "Grapa de Suspensión 16-35mm² Tipo Manito",
      "Grapa de Suspensión Angular 16-120mm²",
      "Grapa de Anclaje Tipo Pistola de Aluminio 25/70mm² 2 Pernos",
      "Grapa de Suspensión Tipo Barquito 50/120mm²",
      "Grapa Forjada de 3/8\" para Líneas Eléctricas",
    ],
  },
  {
    name: "Conectores Eléctricos Bimetálicos",
    slug: "conectores",
    description: "Conectores AB cobreados, splitbolt y bimetálicos Al/Cu doble vía a compresión para conductores 16-300mm² en redes AT/MT. Stock en Lima, Perú.",
    subcategories: [
      "Conector AB Cobreado 5/8\" para Conductores AT/MT",
      "Conector Splitbolt Tipo Perno Partido 16mm²",
      "Conector Doble Vía Al/Al 16-150 / 16-150mm² 2 Pernos",
      "Conector Doble Vía Al/Al 25-240 / 25-240mm² 3 Pernos",
      "Conector Doble Bimetálico Al/Cu 25-150 / 10-95mm² 2 Pernos",
      "Conector Doble Bimetálico Al/Cu 35-240 / 25-185mm² 3 Pernos",
      "Conector Doble Bimetálico Al/Cu 35-300 / 35-240mm² 3 Pernos",
    ],
  },
  {
    name: "Pernos de Acero Galvanizado",
    slug: "pernos",
    description: "Pernos angular, ojo, gancho, maquinado y doble armado A°G° para montaje de herrajes en postes de distribución eléctrica. Stock Lima, Perú.",
    subcategories: [
      "Perno Angular A°G° 5/8Ø × 6\" con Tuerca",
      "Perno Ojo A°G° 5/8Ø × 6\" con Tuerca y Contratuerca",
      "Perno Gancho A°G° 5/8Ø × 6\" con 2 Arandelas",
      "Perno Maquinado A°G° 1/2Ø × 2\" con Tuerca y Contratuerca",
      "Perno Doble Armado A°G° 5/8Ø × 8\" con 4 Tuercas",
    ],
  },
  {
    name: "Sistemas de Puesta a Tierra",
    slug: "puesta-a-tierra",
    description: "Planchas de cobre tipo J y accesorios para sistemas de puesta a tierra en instalaciones eléctricas AT/MT. Normas IEC y NTP. Lima, Perú.",
    subcategories: [
      "Plancha de Cobre Tipo J para Puesta a Tierra",
      "Disco Antirrobo 5/8\" para Sistema de Puesta a Tierra",
    ],
  },
  {
    name: "Aisladores Eléctricos de Porcelana",
    slug: "aisladores",
    description: "Aisladores de tracción ANSI 54-1 y carrete 53-1 de porcelana para líneas de distribución eléctrica AT/MT. Stock en Lima, Perú. Normas ANSI e IEC.",
    subcategories: [
      "Aislador de Tracción ANSI 54-1 de Porcelana para Líneas MT",
      "Aislador Carrete 53-1 de Porcelana para Baja Tensión",
    ],
  },
  {
    name: "Varillas de Anclaje y Conductor",
    slug: "varillas",
    description: "Varillas de anclaje galvanizadas 5/8\" × 1.80m y de armar de aluminio 25mm² para líneas eléctricas aéreas de baja tensión. Despacho Lima, Perú.",
    subcategories: [
      "Varilla de Anclaje A°G° 5/8Ø × 1.80m con Tuerca",
      "Varilla de Armar de Aluminio Simple 25mm² para Líneas BT",
    ],
  },
  {
    name: "Herrajes de Anclaje para Postes",
    slug: "herrajes-anclaje",
    description: "Planchas gancho y clevis portalínea de acero galvanizado para anclaje y sujeción de conductores en postes de concreto de líneas AT/MT. Lima, Perú.",
    subcategories: [
      "Plancha Gancho A°G° 1/2\" para Anclaje en Postes de Concreto",
      "Clevis Portalinea Unipolar 53-1 para Líneas Eléctricas",
    ],
  },
  {
    name: "Tuercas de Acero Galvanizado",
    slug: "tuercas",
    description: "Tuercas ojo y gancho de acero galvanizado en caliente para ensamblaje de herrajes en líneas de alta y media tensión. Despacho inmediato Lima, Perú.",
    subcategories: [
      "Tuerca Ojo A°G° 16mm 5/8Ø para Líneas Eléctricas",
      "Tuerca Gancho A°G° 5/8\" para Estructuras Eléctricas AT/MT",
    ],
  },
  {
    name: "Accesorios para Aisladores y Pararrayos",
    slug: "pararrayos",
    description: "Bracitos y accesorios de soporte para aisladores carrete 53-1 en líneas de distribución eléctrica de media y baja tensión. Stock disponible en Lima.",
    subcategories: [
      "Bracito para Aislador Carrete 53-1 en Líneas Eléctricas",
      "Accesorios de Soporte para Aisladores en Postes BT/MT",
      "Herrajes para Aisladores de Distribución Eléctrica",
    ],
  },
  {
    name: "Amarres Preformados para Cables",
    slug: "amarres",
    description: "Amarres preformados de aluminio 3/8\" para conductores AAAC y cable ABC en postes de anclaje y suspensión de líneas BT/MT. Lima, Perú.",
    subcategories: [
      "Amarre Preformado 3/8\" Naranja 80cm para Conductores",
      "Amarres de Retención para Conductor AAAC en Líneas BT",
      "Amarres de Suspensión para Líneas de Media Tensión",
      "Preformados de Aluminio para Cable ABC BT",
    ],
  },
  {
    name: "Abrazaderas de Acero para Postes",
    slug: "abrazaderas",
    description: "Abrazaderas pastoral, unifix, N2XSY, mástil, tipo cash y retenida de A°G° para fijación en postes de distribución eléctrica. Lima, Perú.",
    subcategories: [
      "Abrazadera A°G° para Pastoral Simple 1-1/2 × 3/16 × 125mm",
      "Abrazadera Unifix para Postes de Distribución",
      "Abrazadera A°G° 150/200mm de 4 Sectores para Postes",
      "Abrazadera A°G° para Cable N2XSY",
      "Abrazadera A°G° para Mástil",
      "Abrazadera A°G° para Retenida 2 × 3/16 × 130mm",
      "Abrazadera Tipo Cash A°G° 2 × 1/4 × 180mm Doble",
    ],
  },
  {
    name: "Adaptadores y Grilletes Metálicos",
    slug: "adaptadores",
    description: "Adaptadores grillete tipo lira, recto, horquilla bola y horquilla ojo de acero para ensamblaje de herrajes en líneas AT/MT. Stock en Lima, Perú.",
    subcategories: [
      "Adaptador Grillete Tipo Lira 5/8\" para Herrajes AT",
      "Adaptador Grillete Recto 5/8\" para Líneas Eléctricas",
      "Adaptador Horquilla Bola para Herrajes de Alta Tensión",
      "Adaptador Horquilla Ojo para Líneas Eléctricas MT",
    ],
  },
  {
    name: "Accesorios para Retenidas y Vientos",
    slug: "retenidas",
    description: "Canaletas guardacable de 2.40m y herrajes galvanizados para sistemas de retenida en postes de distribución eléctrica AT/MT. Stock en Lima, Perú.",
    subcategories: [
      "Canaletas Guardacable 2.40m para Retenidas Eléctricas",
      "Herrajes de Retenida para Postes de Concreto AT/MT",
      "Accesorios de Viento para Torres y Estructuras Eléctricas",
      "Kits Completos de Retenida para Líneas AT/MT",
    ],
  },
  {
    name: "Cintas de Acero Inoxidable para Fijación",
    slug: "cintas-acero",
    description: "Cintas y flejes de acero inoxidable para fijación de herrajes en postes de distribución eléctrica. Alta resistencia a la corrosión. Lima, Perú.",
    subcategories: [
      "Cinta de Acero Inoxidable para Fijación de Herrajes en Postes",
      "Fleje Metálico para Fijación de Herrajes Eléctricos",
      "Cintas de Amarre para Cables y Postes de Distribución",
    ],
  },
  {
    name: "Accesorios para Fibra Óptica ADSS",
    slug: "fibra-optica",
    description: "Crucetas de reserva y herrajes para tendido de cable fibra óptica ADSS autosoportado en postes de distribución eléctrica. Lima, Perú.",
    subcategories: [
      "Cruceta de Reserva para Tendido de Fibra Óptica ADSS",
      "Soportes Pasantes ADSS para Postes de Distribución",
      "Clevis y Herrajes para Cable ADSS Autosoportado",
      "Accesorios de Suspensión para Fibra Óptica ADSS",
    ],
  },
  {
    name: "Empalmes para Conductores Eléctricos",
    slug: "empalmes",
    description: "Empalmes de aluminio 25mm² a compresión y manguitos para unión de conductores desnudos en líneas de alta y media tensión. Distribución Lima, Perú.",
    subcategories: [
      "Empalme de Aluminio 25mm² para Conductores Eléctricos",
      "Manguitos de Empalme para Conductor Desnudo AT/MT",
      "Empalmes para Cable Desnudo a Compresión",
      "Conectores de Empalme Bimetálicos Al/Cu",
    ],
  },
  {
    name: "Herramientas de Enzunchado",
    slug: "enzunchadora",
    description: "Enzunchadoras manuales para tensado de fleje metálico en fijación de herrajes eléctricos en postes de distribución. Envío a todo el Perú.",
    subcategories: [
      "Enzunchadora Manual para Fleje Metálico en Postes",
      "Herramientas de Tensado de Cinta para Postes Eléctricos",
      "Accesorios para Enzunchado de Herrajes en Postes",
    ],
  },
  {
    name: "Espigas para Crucetas y Postes",
    slug: "espigas",
    description: "Espigas galvanizadas 3/4\" y 1\" troncocónicas para crucetas de madera y punta de poste de concreto con aisladores pin ANSI. Stock en Lima, Perú.",
    subcategories: [
      "Espiga para Cruceta 3/4\" × 12\" de Acero Galvanizado",
      "Espiga para Punta de Poste 508mm de Acero Galvanizado",
      "Espiga para Cruceta 1\" × 17P Troncocónica de A°G°",
    ],
  },
  {
    name: "Fusibles de Media Tensión",
    slug: "fusibles",
    description: "Fusibles tipo K cabeza removible para protección de líneas y equipos de distribución de media tensión. Norma IEC y NTP. Stock disponible en Lima, Perú.",
    subcategories: [
      "Fusible Chicote Tipo K Cabeza Removible 1A para Media Tensión",
      "Fusibles Tipo H para Protección de Líneas MT",
      "Porta Fusibles para Sistemas de Media Tensión",
      "Fusibles de Expulsión para Líneas de Distribución MT",
    ],
  },
]

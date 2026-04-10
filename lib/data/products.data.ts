/**
 * Fuente única de verdad para productos.
 * Productos marcados en AMARILLO del XLSX — los que se seedean a la DB.
 * Importado por seed.ts (DB).
 */

export interface ProductSeedData {
  sku: string
  name: string
  catSlug: string
}

export const PRODUCTS_DATA: ProductSeedData[] = [
  // GRAPAS (3)
  { sku: "ET-GRP-001", name: "Grapa de Anclaje Tipo Pistola de Aluminio 25/70mm² 2 Pernos",   catSlug: "grapas" },
  { sku: "ET-GRP-002", name: "Grapa de Suspensión Tipo Barquito 50/120mm²",                   catSlug: "grapas" },
  { sku: "ET-GRP-003", name: "Grapa Forjada de 3/8\" para Líneas Eléctricas",                 catSlug: "grapas" },
  // CONECTORES (2)
  { sku: "ET-CON-001", name: "Conector AB Cobreado 5/8\" para Conductores AT/MT",             catSlug: "conectores" },
  { sku: "ET-CON-002", name: "Conector Splitbolt Tipo Perno Partido 16mm²",                   catSlug: "conectores" },
  // PERNOS (3)
  { sku: "ET-PRN-001", name: "Perno Angular de A°G° 5/8Ø x 6\" con Tuerca",                  catSlug: "pernos" },
  { sku: "ET-PRN-002", name: "Perno Ojo de A°G° 5/8Ø x 6\" con Tuerca y Contratuerca",       catSlug: "pernos" },
  { sku: "ET-PRN-003", name: "Perno Gancho de A°G° 5/8Ø x 6\" con Tuerca y 2 Arandelas",     catSlug: "pernos" },
  // PUESTA A TIERRA (1)
  { sku: "ET-PAT-001", name: "Disco Antirrobo 5/8\" para Sistema de Puesta a Tierra",         catSlug: "puesta-a-tierra" },
  // AISLADORES (2)
  { sku: "ET-AIS-001", name: "Aislador de Tracción ANSI 54-1 de Porcelana para Líneas MT",    catSlug: "aisladores" },
  { sku: "ET-AIS-002", name: "Aislador Carrete 53-1 de Porcelana para Baja Tensión",          catSlug: "aisladores" },
  // VARILLAS (3)
  { sku: "ET-VAR-001", name: "Varilla de Anclaje de A°G° 5/8Ø x 1.80m con Tuerca",           catSlug: "varillas" },
  { sku: "ET-VAR-002", name: "Varilla de Armar de Aluminio Simple 25mm² para Líneas BT",      catSlug: "varillas" },
  { sku: "ET-VAR-003", name: "Varilla de Cobre 5/8\" x 2.40m para Puesta a Tierra",           catSlug: "varillas" },
  // HERRAJES DE ANCLAJE (4)
  { sku: "ET-ANC-001", name: "Plancha Gancho de A°G° 1/2\" para Anclaje en Postes",           catSlug: "herrajes-anclaje" },
  { sku: "ET-ANC-002", name: "Clevis Portalinea Unipolar 53-1 para Líneas Eléctricas",        catSlug: "herrajes-anclaje" },
  { sku: "ET-ANC-003", name: "Guardacable de Acero Forjado 3/8\" para Retenidas",             catSlug: "herrajes-anclaje" },
  { sku: "ET-ANC-004", name: "Guardacabo de Acero Forjado 3/8\" para Retenidas",              catSlug: "herrajes-anclaje" },
  // TUERCAS (1)
  { sku: "ET-TRC-001", name: "Tuerca Ojo de A°G° 16mm 5/8Ø para Líneas Eléctricas",          catSlug: "tuercas" },
  // PARARRAYOS (1)
  { sku: "ET-PAR-001", name: "Pararrayo Tetrapuntal Tipo Franklin 1/2\" con Base",            catSlug: "pararrayos" },
  // AMARRES (1)
  { sku: "ET-AMR-001", name: "Amarre Preformado 3/8\" Color Naranja 80cm para Conductores",   catSlug: "amarres" },
  // ABRAZADERAS (4)
  { sku: "ET-ABR-001", name: "Abrazadera de A°G° para Pastoral Simple 1-1/2 x 3/16 x 125mm", catSlug: "abrazaderas" },
  { sku: "ET-ABR-002", name: "Abrazadera de A°G° 150/200mm de 4 Sectores para Postes",        catSlug: "abrazaderas" },
  { sku: "ET-ABR-003", name: "Abrazadera de A°G° para Retenida 2 x 3/16 x 130mm",            catSlug: "abrazaderas" },
  { sku: "ET-ABR-004", name: "Abrazadera Tipo Cash de A°G° 2 x 1/4 x 180mm Doble",           catSlug: "abrazaderas" },
  // CINTAS (1)
  { sku: "ET-CNT-001", name: "Cinta de Acero Inoxidable para Fijación de Herrajes en Postes", catSlug: "cintas-acero" },
  // EMPALMES (1)
  { sku: "ET-EMP-001", name: "Empalme de Aluminio 25mm² para Conductores Eléctricos",         catSlug: "empalmes" },
  // ESPIGAS (2)
  { sku: "ET-ESP-001", name: "Espiga para Cruceta 3/4\" x 12\" de Acero Galvanizado",         catSlug: "espigas" },
  { sku: "ET-ESP-002", name: "Espiga para Punta de Poste 508mm de Acero Galvanizado",         catSlug: "espigas" },
  // FUSIBLES (1)
  { sku: "ET-FUS-001", name: "Fusible Chicote Tipo K Cabeza Removible 1A para Media Tensión", catSlug: "fusibles" },
  // GRILLETES (1)
  { sku: "ET-GRL-001", name: "Grillete Forjado de 1/2\" Pin Rojo para Líneas Eléctricas",    catSlug: "grilletes" },
  // HEBILLAS (1)
  { sku: "ET-HBL-001", name: "Hebilla de Acero Inoxidable para Cinta de Fleje Metálico",      catSlug: "hebillas" },
  // TEMPLADORES (4)
  { sku: "ET-TMP-001", name: "Templador Tipo Sapito Monofásico para Acometida Eléctrica",     catSlug: "templadores" },
  { sku: "ET-TMP-002", name: "Templador Forjado Ojo/Gancho de A°G° 1/2\" para Retenidas",    catSlug: "templadores" },
  { sku: "ET-TMP-003", name: "Templador Forjado Ojo/Ojo de A°G° 1/2\" para Retenidas",       catSlug: "templadores" },
  { sku: "ET-TMP-004", name: "Templador Ojo/Gancho de A°G° 5/8\" x 10\" para Retenidas",     catSlug: "templadores" },
  // TERMINALES (1)
  { sku: "ET-TRM-001", name: "Terminal a Compresión de 10mm² Largo para Cables Eléctricos",   catSlug: "terminales" },
  // ACOMETIDA (1)
  { sku: "ET-ACM-001", name: "Tubo Bastón de A°G° 2\" x 3m para Acometida Eléctrica",        catSlug: "acometida" },
]

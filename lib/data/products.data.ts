/**
 * Fuente única de verdad para productos.
 * Sincronizado con public/PRODUCTOS PÁGINA WEB.xlsx
 * Importado por seed.ts (DB).
 *
 * Última sincronización: 2026-04-14
 */

export interface ProductSeedData {
  sku: string
  name: string
  catSlug: string
}

export const PRODUCTS_DATA: ProductSeedData[] = [
  // ── GRAPAS (6) ────────────────────────────────────────────────────────────
  { sku: "ET-GRP-001", name: "Grapa de Anclaje Tipo Pistola de Aluminio 25/70mm² 2 Pernos",   catSlug: "grapas" },
  { sku: "ET-GRP-002", name: "Grapa de Suspensión Tipo Barquito 50/120mm²",                   catSlug: "grapas" },
  { sku: "ET-GRP-003", name: "Grapa Forjada de 3/8\" para Líneas Eléctricas",                 catSlug: "grapas" },
  { sku: "ET-GRP-004", name: "Grapa de Anclaje Cónica 16-35mm Tipo Cocodrilo",                catSlug: "grapas" },
  { sku: "ET-GRP-005", name: "Grapa de Suspensión 16-35mm² Tipo Manito",                      catSlug: "grapas" },
  { sku: "ET-GRP-006", name: "Grapa de Suspensión Angular 16-120mm²",                         catSlug: "grapas" },

  // ── CONECTORES (7) ────────────────────────────────────────────────────────
  { sku: "ET-CON-001", name: "Conector AB Cobreado 5/8\" para Conductores AT/MT",             catSlug: "conectores" },
  { sku: "ET-CON-002", name: "Conector Splitbolt Tipo Perno Partido 16mm²",                   catSlug: "conectores" },
  { sku: "ET-CON-003", name: "Conector Doble Vía Al/Al 16-150 / 16-150mm² 2 Pernos",         catSlug: "conectores" },
  { sku: "ET-CON-004", name: "Conector Doble Vía Al/Al 25-240 / 25-240mm² 3 Pernos",         catSlug: "conectores" },
  { sku: "ET-CON-005", name: "Conector Doble Bimetálico Al/Cu 25-150 / 10-95mm² 2 Pernos",   catSlug: "conectores" },
  { sku: "ET-CON-006", name: "Conector Doble Bimetálico Al/Cu 35-240 / 25-185mm² 3 Pernos",  catSlug: "conectores" },
  { sku: "ET-CON-007", name: "Conector Doble Bimetálico Al/Cu 35-300 / 35-240mm² 3 Pernos",  catSlug: "conectores" },

  // ── PERNOS (5) ────────────────────────────────────────────────────────────
  { sku: "ET-PRN-001", name: "Perno Angular de A°G° 5/8Ø × 6\" con Tuerca",                  catSlug: "pernos" },
  { sku: "ET-PRN-002", name: "Perno Ojo de A°G° 5/8Ø × 6\" con Tuerca y Contratuerca",       catSlug: "pernos" },
  { sku: "ET-PRN-003", name: "Perno Gancho de A°G° 5/8Ø × 6\" con Tuerca y 2 Arandelas",     catSlug: "pernos" },
  { sku: "ET-PRN-004", name: "Perno Maquinado de A°G° 1/2Ø × 2\" con Tuerca y Contratuerca", catSlug: "pernos" },
  { sku: "ET-PRN-005", name: "Perno Doble Armado de A°G° 5/8Ø × 8\" con 4 Tuercas",          catSlug: "pernos" },

  // ── PUESTA A TIERRA (2) ───────────────────────────────────────────────────
  { sku: "ET-PAT-001", name: "Disco Antirrobo 5/8\" para Sistema de Puesta a Tierra",         catSlug: "puesta-a-tierra" },
  { sku: "ET-PAT-002", name: "Plancha de Cobre Tipo J para Puesta a Tierra",                  catSlug: "puesta-a-tierra" },

  // ── AISLADORES (2) ────────────────────────────────────────────────────────
  { sku: "ET-AIS-001", name: "Aislador de Tracción ANSI 54-1 de Porcelana para Líneas MT",    catSlug: "aisladores" },
  { sku: "ET-AIS-002", name: "Aislador Carrete 53-1 de Porcelana para Baja Tensión",          catSlug: "aisladores" },

  // ── VARILLAS (2) ──────────────────────────────────────────────────────────
  { sku: "ET-VAR-001", name: "Varilla de Anclaje de A°G° 5/8Ø × 1.80m con Tuerca",           catSlug: "varillas" },
  { sku: "ET-VAR-002", name: "Varilla de Armar de Aluminio Simple 25mm² para Líneas BT",      catSlug: "varillas" },

  // ── HERRAJES DE ANCLAJE (2) ───────────────────────────────────────────────
  { sku: "ET-ANC-001", name: "Plancha Gancho de A°G° 1/2\" para Anclaje en Postes",           catSlug: "herrajes-anclaje" },
  { sku: "ET-ANC-002", name: "Clevis Portalinea Unipolar 53-1 para Líneas Eléctricas",        catSlug: "herrajes-anclaje" },

  // ── TUERCAS (2) ───────────────────────────────────────────────────────────
  { sku: "ET-TRC-001", name: "Tuerca Ojo de A°G° 16mm 5/8Ø para Líneas Eléctricas",          catSlug: "tuercas" },
  { sku: "ET-TRC-002", name: "Tuerca Gancho de A°G° 5/8\" para Líneas Eléctricas",            catSlug: "tuercas" },

  // ── PARARRAYOS / ACCESORIOS AISLADORES (1) ────────────────────────────────
  { sku: "ET-PAR-001", name: "Bracito para Aislador Carrete 53-1",                            catSlug: "pararrayos" },

  // ── AMARRES (1) ───────────────────────────────────────────────────────────
  { sku: "ET-AMR-001", name: "Amarre Preformado 3/8\" Color Naranja 80cm para Conductores",   catSlug: "amarres" },

  // ── ABRAZADERAS (7) ───────────────────────────────────────────────────────
  { sku: "ET-ABR-001", name: "Abrazadera de A°G° para Pastoral Simple 1-1/2 × 3/16 × 125mm", catSlug: "abrazaderas" },
  { sku: "ET-ABR-002", name: "Abrazadera de A°G° 150/200mm de 4 Sectores para Postes",        catSlug: "abrazaderas" },
  { sku: "ET-ABR-003", name: "Abrazadera de A°G° para Retenida 2 × 3/16 × 130mm",            catSlug: "abrazaderas" },
  { sku: "ET-ABR-004", name: "Abrazadera Tipo Cash de A°G° 2 × 1/4 × 180mm Doble",           catSlug: "abrazaderas" },
  { sku: "ET-ABR-005", name: "Abrazadera Unifix para Postes de Distribución",                 catSlug: "abrazaderas" },
  { sku: "ET-ABR-006", name: "Abrazadera de A°G° para Cable N2XSY",                           catSlug: "abrazaderas" },
  { sku: "ET-ABR-007", name: "Abrazadera de A°G° para Mástil",                                catSlug: "abrazaderas" },

  // ── ADAPTADORES (4) ───────────────────────────────────────────────────────
  { sku: "ET-ADP-001", name: "Adaptador Grillete Tipo Lira 5/8\" para Herrajes AT",           catSlug: "adaptadores" },
  { sku: "ET-ADP-002", name: "Adaptador Grillete Recto 5/8\" para Líneas Eléctricas",         catSlug: "adaptadores" },
  { sku: "ET-ADP-003", name: "Adaptador Horquilla Bola para Herrajes de Alta Tensión",        catSlug: "adaptadores" },
  { sku: "ET-ADP-004", name: "Adaptador Horquilla Ojo para Líneas Eléctricas MT",             catSlug: "adaptadores" },

  // ── RETENIDAS (1) ─────────────────────────────────────────────────────────
  { sku: "ET-RET-001", name: "Canaletas Guardacable 2.40m para Retenidas Eléctricas",         catSlug: "retenidas" },

  // ── CINTAS (1) ────────────────────────────────────────────────────────────
  { sku: "ET-CNT-001", name: "Cinta de Acero Inoxidable para Fijación de Herrajes en Postes", catSlug: "cintas-acero" },

  // ── FIBRA ÓPTICA (1) ──────────────────────────────────────────────────────
  { sku: "ET-FOP-001", name: "Cruceta de Reserva para Tendido de Fibra Óptica ADSS",          catSlug: "fibra-optica" },

  // ── EMPALMES (1) ──────────────────────────────────────────────────────────
  { sku: "ET-EMP-001", name: "Empalme de Aluminio 25mm² para Conductores Eléctricos",         catSlug: "empalmes" },

  // ── ENZUNCHADORA (1) ──────────────────────────────────────────────────────
  { sku: "ET-ENZ-001", name: "Enzunchadora Manual para Fleje Metálico en Postes",             catSlug: "enzunchadora" },

  // ── ESPIGAS (3) ───────────────────────────────────────────────────────────
  { sku: "ET-ESP-001", name: "Espiga para Cruceta 3/4\" × 12\" de Acero Galvanizado",         catSlug: "espigas" },
  { sku: "ET-ESP-002", name: "Espiga para Punta de Poste 508mm de Acero Galvanizado",         catSlug: "espigas" },
  { sku: "ET-ESP-003", name: "Espiga para Cruceta 1\" × 17P Troncocónica de A°G°",            catSlug: "espigas" },

  // ── FUSIBLES (1) ──────────────────────────────────────────────────────────
  { sku: "ET-FUS-001", name: "Fusible Chicote Tipo K Cabeza Removible 1A para Media Tensión", catSlug: "fusibles" },
]

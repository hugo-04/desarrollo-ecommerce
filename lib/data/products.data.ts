/**
 * Fuente única de verdad para productos.
 * Sincronizado con public/PRODUCTOS PÁGINA WEB.xlsx
 * Importado por seed.ts (DB).
 *
 * Última sincronización: 2026-04-14
 */

export interface ProductSeedData {
  name: string
  catSlug: string
}

export const PRODUCTS_DATA: ProductSeedData[] = [
  // ── GRAPAS (6) ────────────────────────────────────────────────────────────
  { name: "Grapa de Anclaje Tipo Pistola de Aluminio 25/70mm² 2 Pernos",   catSlug: "grapas" },
  { name: "Grapa de Suspensión Tipo Barquito 50/120mm²",                   catSlug: "grapas" },
  { name: "Grapa Forjada de 3/8\" para Líneas Eléctricas",                 catSlug: "grapas" },
  { name: "Grapa de Anclaje Cónica 16-35mm Tipo Cocodrilo",                catSlug: "grapas" },
  { name: "Grapa de Suspensión 16-35mm² Tipo Manito",                      catSlug: "grapas" },
  { name: "Grapa de Suspensión Angular 16-120mm²",                         catSlug: "grapas" },

  // ── CONECTORES (7) ────────────────────────────────────────────────────────
  { name: "Conector AB Cobreado 5/8\" para Conductores AT/MT",             catSlug: "conectores" },
  { name: "Conector Splitbolt Tipo Perno Partido 16mm²",                   catSlug: "conectores" },
  { name: "Conector Doble Vía Al/Al 16-150 / 16-150mm² 2 Pernos",         catSlug: "conectores" },
  { name: "Conector Doble Vía Al/Al 25-240 / 25-240mm² 3 Pernos",         catSlug: "conectores" },
  { name: "Conector Doble Bimetálico Al/Cu 25-150 / 10-95mm² 2 Pernos",   catSlug: "conectores" },
  { name: "Conector Doble Bimetálico Al/Cu 35-240 / 25-185mm² 3 Pernos",  catSlug: "conectores" },
  { name: "Conector Doble Bimetálico Al/Cu 35-300 / 35-240mm² 3 Pernos",  catSlug: "conectores" },

  // ── PERNOS (5) ────────────────────────────────────────────────────────────
  { name: "Perno Angular de A°G° 5/8Ø × 6\" con Tuerca",                  catSlug: "pernos" },
  { name: "Perno Ojo de A°G° 5/8Ø × 6\" con Tuerca y Contratuerca",       catSlug: "pernos" },
  { name: "Perno Gancho de A°G° 5/8Ø × 6\" con Tuerca y 2 Arandelas",     catSlug: "pernos" },
  { name: "Perno Maquinado de A°G° 1/2Ø × 2\" con Tuerca y Contratuerca", catSlug: "pernos" },
  { name: "Perno Doble Armado de A°G° 5/8Ø × 8\" con 4 Tuercas",          catSlug: "pernos" },

  // ── PUESTA A TIERRA (2) ───────────────────────────────────────────────────
  { name: "Disco Antirrobo 5/8\" para Sistema de Puesta a Tierra",         catSlug: "puesta-a-tierra" },
  { name: "Plancha de Cobre Tipo J para Puesta a Tierra",                  catSlug: "puesta-a-tierra" },

  // ── AISLADORES (2) ────────────────────────────────────────────────────────
  { name: "Aislador de Tracción ANSI 54-1 de Porcelana para Líneas MT",    catSlug: "aisladores" },
  { name: "Aislador Carrete 53-1 de Porcelana para Baja Tensión",          catSlug: "aisladores" },

  // ── VARILLAS (2) ──────────────────────────────────────────────────────────
  { name: "Varilla de Anclaje de A°G° 5/8Ø × 1.80m con Tuerca",           catSlug: "varillas" },
  { name: "Varilla de Armar de Aluminio Simple 25mm² para Líneas BT",      catSlug: "varillas" },

  // ── HERRAJES DE ANCLAJE (2) ───────────────────────────────────────────────
  { name: "Plancha Gancho de A°G° 1/2\" para Anclaje en Postes",           catSlug: "herrajes-anclaje" },
  { name: "Clevis Portalinea Unipolar 53-1 para Líneas Eléctricas",        catSlug: "herrajes-anclaje" },

  // ── TUERCAS (2) ───────────────────────────────────────────────────────────
  { name: "Tuerca Ojo de A°G° 16mm 5/8Ø para Líneas Eléctricas",          catSlug: "tuercas" },
  { name: "Tuerca Gancho de A°G° 5/8\" para Líneas Eléctricas",            catSlug: "tuercas" },

  // ── PARARRAYOS / ACCESORIOS AISLADORES (1) ────────────────────────────────
  { name: "Bracito para Aislador Carrete 53-1",                            catSlug: "pararrayos" },

  // ── AMARRES (1) ───────────────────────────────────────────────────────────
  { name: "Amarre Preformado 3/8\" Color Naranja 80cm para Conductores",   catSlug: "amarres" },

  // ── ABRAZADERAS (7) ───────────────────────────────────────────────────────
  { name: "Abrazadera de A°G° para Pastoral Simple 1-1/2 × 3/16 × 125mm", catSlug: "abrazaderas" },
  { name: "Abrazadera de A°G° 150/200mm de 4 Sectores para Postes",        catSlug: "abrazaderas" },
  { name: "Abrazadera de A°G° para Retenida 2 × 3/16 × 130mm",            catSlug: "abrazaderas" },
  { name: "Abrazadera Tipo Cash de A°G° 2 × 1/4 × 180mm Doble",           catSlug: "abrazaderas" },
  { name: "Abrazadera Unifix para Postes de Distribución",                 catSlug: "abrazaderas" },
  { name: "Abrazadera de A°G° para Cable N2XSY",                           catSlug: "abrazaderas" },
  { name: "Abrazadera de A°G° para Mástil",                                catSlug: "abrazaderas" },

  // ── ADAPTADORES (4) ───────────────────────────────────────────────────────
  { name: "Adaptador Grillete Tipo Lira 5/8\" para Herrajes AT",           catSlug: "adaptadores" },
  { name: "Adaptador Grillete Recto 5/8\" para Líneas Eléctricas",         catSlug: "adaptadores" },
  { name: "Adaptador Horquilla Bola para Herrajes de Alta Tensión",        catSlug: "adaptadores" },
  { name: "Adaptador Horquilla Ojo para Líneas Eléctricas MT",             catSlug: "adaptadores" },

  // ── RETENIDAS (1) ─────────────────────────────────────────────────────────
  { name: "Canaletas Guardacable 2.40m para Retenidas Eléctricas",         catSlug: "retenidas" },

  // ── CINTAS (1) ────────────────────────────────────────────────────────────
  { name: "Cinta de Acero Inoxidable para Fijación de Herrajes en Postes", catSlug: "cintas-acero" },

  // ── FIBRA ÓPTICA (1) ──────────────────────────────────────────────────────
  { name: "Cruceta de Reserva para Tendido de Fibra Óptica ADSS",          catSlug: "fibra-optica" },

  // ── EMPALMES (1) ──────────────────────────────────────────────────────────
  { name: "Empalme de Aluminio 25mm² para Conductores Eléctricos",         catSlug: "empalmes" },

  // ── ENZUNCHADORA (1) ──────────────────────────────────────────────────────
  { name: "Enzunchadora Manual para Fleje Metálico en Postes",             catSlug: "enzunchadora" },

  // ── ESPIGAS (3) ───────────────────────────────────────────────────────────
  { name: "Espiga para Cruceta 3/4\" × 12\" de Acero Galvanizado",         catSlug: "espigas" },
  { name: "Espiga para Punta de Poste 508mm de Acero Galvanizado",         catSlug: "espigas" },
  { name: "Espiga para Cruceta 1\" × 17P Troncocónica de A°G°",            catSlug: "espigas" },

  // ── FUSIBLES (1) ──────────────────────────────────────────────────────────
  { name: "Fusible Chicote Tipo K Cabeza Removible 1A para Media Tensión", catSlug: "fusibles" },
]

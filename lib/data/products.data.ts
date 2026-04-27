/**
 * Fuente única de verdad para productos.
 * Importado por seed.ts (DB).
 */

export interface ProductSeedData {
  name:             string
  catSlug:          string
  description?:     string
  fullDescription?: string
  medidas?:         string[]
  technicalSpecs?:  Record<string, string>
  fichaTecnica?:    string
}

const DESC_SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem."
const DESC_LONG  = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur."

const SPECS_A = {
  "Lorem Ipsum A": "Lorem ipsum dolor",
  "Lorem Ipsum B": "Lorem ipsum amet",
  "Lorem Ipsum C": "Lorem ipsum sit",
  "Lorem Ipsum D": "Lorem ipsum consectetur",
  "Lorem Ipsum E": "Lorem ipsum adipiscing",
}

const SPECS_B = {
  "Lorem Ipsum A": "Lorem ipsum dolor",
  "Lorem Ipsum B": "Lorem ipsum amet",
  "Lorem Ipsum C": "Lorem ipsum sit",
  "Lorem Ipsum D": "Lorem ipsum consectetur",
  "Lorem Ipsum E": "Lorem ipsum adipiscing",
  "Lorem Ipsum F": "Lorem ipsum elit",
  "Lorem Ipsum G": "Lorem ipsum sed",
}

const SPECS_C = {
  "Lorem Ipsum A": "Lorem ipsum dolor",
  "Lorem Ipsum B": "Lorem ipsum amet",
  "Lorem Ipsum C": "Lorem ipsum sit",
  "Lorem Ipsum D": "Lorem ipsum consectetur",
  "Lorem Ipsum E": "Lorem ipsum adipiscing",
  "Lorem Ipsum F": "Lorem ipsum elit",
  "Lorem Ipsum G": "Lorem ipsum sed",
  "Lorem Ipsum H": "Lorem ipsum do",
}

const MEDIDAS_3 = ["Lorem A", "Lorem B", "Lorem C"]
const MEDIDAS_4 = ["Lorem A", "Lorem B", "Lorem C", "Lorem D"]
const MEDIDAS_6 = ["Lorem A", "Lorem B", "Lorem C", "Lorem D", "Lorem E", "Lorem F"]

export const PRODUCTS_DATA: ProductSeedData[] = [

  // ── GRAPAS (6) ────────────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 01",
    catSlug:         "grapas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
    fichaTecnica:    "/fichas-tecnicas/FT-GRAPA DE ANCLAJE TIPO PISTOLA 2 P..pdf",
  },
  {
    name:            "Lorem Ipsum Producto 02",
    catSlug:         "grapas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_4,
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 36",
    catSlug:         "grapas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
    fichaTecnica:    "/fichas-tecnicas/FT-GRAPA FORJADA.pdf",
  },
  {
    name:            "Lorem Ipsum Producto 03",
    catSlug:         "grapas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 04",
    catSlug:         "grapas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 05",
    catSlug:         "grapas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
  },

  // ── CONECTORES (7) ────────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 37",
    catSlug:         "conectores",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A"],
    technicalSpecs:  SPECS_A,
    fichaTecnica:    "/fichas-tecnicas/FT-GRAPA TIPO U.pdf",
  },
  {
    name:            "Lorem Ipsum Producto 06",
    catSlug:         "conectores",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_4,
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 07",
    catSlug:         "conectores",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_C,
    fichaTecnica:    "/fichas-tecnicas/FT-CONECTOR DOBLE VÍA AL-AL 2P.pdf",
  },
  {
    name:            "Lorem Ipsum Producto 08",
    catSlug:         "conectores",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_B,
    fichaTecnica:    "/fichas-tecnicas/FT-CONECTOR DOBLE VÍA AL-AL 3P 25-240MM.pdf",
  },
  {
    name:            "Lorem Ipsum Producto 09",
    catSlug:         "conectores",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 10",
    catSlug:         "conectores",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_B,
    fichaTecnica:    "/fichas-tecnicas/FT-CONECTOR DOBLE VÍA AL-CU 3P.pdf",
  },
  {
    name:            "Lorem Ipsum Producto 11",
    catSlug:         "conectores",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_C,
    fichaTecnica:    "/fichas-tecnicas/FT-CONECTOR DOBLE VÍA AL-AL DE 3P 35-300MM.pdf",
  },

  // ── PERNOS (5) ────────────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 38",
    catSlug:         "pernos",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_6,
    technicalSpecs:  SPECS_A,
    fichaTecnica:    "/fichas-tecnicas/FT-PERNO ANGULAR 5-8 (SM).pdf",
  },
  {
    name:            "Lorem Ipsum Producto 39",
    catSlug:         "pernos",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_6,
    technicalSpecs:  SPECS_B,
    fichaTecnica:    "/fichas-tecnicas/FT-PERNO OJO 5-8.pdf",
  },
  {
    name:            "Lorem Ipsum Producto 40",
    catSlug:         "pernos",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_4,
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 41",
    catSlug:         "pernos",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_6,
    technicalSpecs:  SPECS_B,
    fichaTecnica:    "/fichas-tecnicas/FT-PERNO MAQUINADO 5-8.pdf",
  },
  {
    name:            "Lorem Ipsum Producto 42",
    catSlug:         "pernos",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_6,
    technicalSpecs:  SPECS_C,
    fichaTecnica:    "/fichas-tecnicas/FT-PERNO DOBLE ARMADO 5-8.pdf",
  },

  // ── PUESTA A TIERRA (2) ───────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 43",
    catSlug:         "puesta-a-tierra",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A"],
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 12",
    catSlug:         "puesta-a-tierra",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A", "Lorem B"],
    technicalSpecs:  SPECS_A,
  },

  // ── AISLADORES (2) ────────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 13",
    catSlug:         "aisladores",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A"],
    technicalSpecs:  SPECS_B,
    fichaTecnica:    "/fichas-tecnicas/FT-AISLADOR TRACCIÓN 54-1.pdf",
  },
  {
    name:            "Lorem Ipsum Producto 14",
    catSlug:         "aisladores",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A"],
    technicalSpecs:  SPECS_B,
    fichaTecnica:    "/fichas-tecnicas/FT-AISLADOR CARRETE 53-1.pdf",
  },

  // ── VARILLAS (2) ──────────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 15",
    catSlug:         "varillas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_C,
    fichaTecnica:    "/fichas-tecnicas/FT-VARILLA DE ANCLAJE.pdf",
  },
  {
    name:            "Lorem Ipsum Producto 16",
    catSlug:         "varillas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
  },

  // ── HERRAJES DE ANCLAJE (2) ───────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 44",
    catSlug:         "herrajes-anclaje",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A", "Lorem B"],
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 17",
    catSlug:         "herrajes-anclaje",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A", "Lorem B"],
    technicalSpecs:  SPECS_A,
  },

  // ── TUERCAS (2) ───────────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 18",
    catSlug:         "tuercas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A", "Lorem B"],
    technicalSpecs:  SPECS_B,
    fichaTecnica:    "/fichas-tecnicas/FT-TUERCA OJO.pdf",
  },
  {
    name:            "Lorem Ipsum Producto 45",
    catSlug:         "tuercas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A"],
    technicalSpecs:  SPECS_B,
    fichaTecnica:    "/fichas-tecnicas/FT-TUERCA GANCHO.pdf",
  },

  // ── PARARRAYOS / ACCESORIOS AISLADORES (1) ────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 19",
    catSlug:         "pararrayos",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
  },

  // ── AMARRES (1) ───────────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 46",
    catSlug:         "amarres",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_6,
    technicalSpecs:  SPECS_A,
    fichaTecnica:    "/fichas-tecnicas/FT-AMARRE PREFORMADO.pdf",
  },

  // ── ABRAZADERAS (7) ───────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 20",
    catSlug:         "abrazaderas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_6,
    technicalSpecs:  SPECS_A,
    fichaTecnica:    "/fichas-tecnicas/FT-ABRAZADERA PARA PASTORAL SIMPLE 125-135-155MM.pdf",
  },
  {
    name:            "Lorem Ipsum Producto 21",
    catSlug:         "abrazaderas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 22",
    catSlug:         "abrazaderas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 23",
    catSlug:         "abrazaderas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 24",
    catSlug:         "abrazaderas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 25",
    catSlug:         "abrazaderas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_4,
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 26",
    catSlug:         "abrazaderas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_4,
    technicalSpecs:  SPECS_A,
  },

  // ── ADAPTADORES (4) ───────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 47",
    catSlug:         "adaptadores",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A"],
    technicalSpecs:  SPECS_B,
    fichaTecnica:    "/fichas-tecnicas/FT-GRILLETE LIRA.pdf",
  },
  {
    name:            "Lorem Ipsum Producto 48",
    catSlug:         "adaptadores",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A", "Lorem B"],
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 27",
    catSlug:         "adaptadores",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 28",
    catSlug:         "adaptadores",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A", "Lorem B"],
    technicalSpecs:  SPECS_A,
  },

  // ── RETENIDAS (1) ─────────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 29",
    catSlug:         "retenidas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A"],
    technicalSpecs:  SPECS_A,
  },

  // ── CINTAS (1) ────────────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 30",
    catSlug:         "cintas-acero",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
  },

  // ── FIBRA ÓPTICA (1) ──────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 31",
    catSlug:         "fibra-optica",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
  },

  // ── EMPALMES (1) ──────────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 32",
    catSlug:         "empalmes",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_4,
    technicalSpecs:  SPECS_A,
  },

  // ── ENZUNCHADORA (1) ──────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 33",
    catSlug:         "enzunchadora",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_3,
    technicalSpecs:  SPECS_A,
  },

  // ── ESPIGAS (3) ───────────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 49",
    catSlug:         "espigas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A", "Lorem B"],
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 34",
    catSlug:         "espigas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A"],
    technicalSpecs:  SPECS_A,
  },
  {
    name:            "Lorem Ipsum Producto 50",
    catSlug:         "espigas",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         ["Lorem A", "Lorem B"],
    technicalSpecs:  SPECS_A,
  },

  // ── FUSIBLES (1) ──────────────────────────────────────────────────────────
  {
    name:            "Lorem Ipsum Producto 35",
    catSlug:         "fusibles",
    description:     DESC_SHORT,
    fullDescription: DESC_LONG,
    medidas:         MEDIDAS_6,
    technicalSpecs:  SPECS_A,
  },
]

/**
 * Fuente única de verdad para categorías y subcategorías.
 * Importado por seed.ts (DB).
 */

export interface CategoryData {
  name:          string
  slug:          string
  description:   string
  keywords?:     string[]
  imageAlt?:     string
  imageTitle?:   string
  featured?:     boolean
  subcategories: string[]
}

export const CATEGORIES_DATA: CategoryData[] = [
  // ── 1 ──────────────────────────────────────────────────────────────────────
  {
    name:        "Rodamientos",
    slug:        "rodamientos",
    description: "",
    keywords:    [],
    imageAlt:    "Rodamientos industriales SKF Timken NSK Lima Peru",
    imageTitle:  "Rodamientos Industriales – Stock Lima",
    featured:    true,
    subcategories: [
      "Rígido Bolas",
      "Esférico Rodillos",
      "Cónico",
      "Cilíndrico",
      "Axial Bolas",
      "Agujas",
      "Chumaceras",
    ],
  },
  // ── 2 ──────────────────────────────────────────────────────────────────────
  {
    name:        "Filtros Industriales",
    slug:        "filtros-industriales",
    description: "",
    keywords:    [],
    imageAlt:    "Filtros industriales Donaldson Fleetguard CAT Lima Peru",
    imageTitle:  "Filtros Industriales – Stock Lima",
    featured:    true,
    subcategories: [
      "Aire",
      "Combustible",
      "Separador",
      "Hidráulicos",
      "Aceite Motor",
    ],
  },
  // ── 3 ──────────────────────────────────────────────────────────────────────
  {
    name:        "Válvulas",
    slug:        "valvulas",
    description: "",
    keywords:    [],
    imageAlt:    "Válvulas industriales KiTZ Bray de bola y mariposa Lima Peru",
    imageTitle:  "Válvulas Industriales – Stock Lima",
    featured:    true,
    subcategories: [
      "Bola",
      "Compuerta",
      "Mariposa",
      "Check",
      "Globo",
    ],
  },
  // ── 4 ──────────────────────────────────────────────────────────────────────
  {
    name:        "Componentes Hidráulicos",
    slug:        "componentes-hidraulicos",
    description: "",
    keywords:    [],
    imageAlt:    "Componentes hidráulicos Parker bombas y motores Lima Peru",
    imageTitle:  "Componentes Hidráulicos Parker – Stock Lima",
    featured:    false,
    subcategories: [
      "Bombas",
      "Válvula",
      "Manguera Hidráulica",
      "Acoples",
      "Filtro Hidráulico Succión",
    ],
  },
  // ── 5 ──────────────────────────────────────────────────────────────────────
  {
    name:        "Correas Industriales",
    slug:        "correas-industriales",
    description: "",
    keywords:    [],
    imageAlt:    "Correas de transmisión Gates Optibelt perfil A B C Lima Peru",
    imageTitle:  "Correas de Transmisión – Stock Lima",
    featured:    false,
    subcategories: [
      "Clásica",
      "Estrecha",
      "Dentada",
      "Variable",
      "Sincrónica",
    ],
  },
]

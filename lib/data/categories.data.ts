/**
 * Fuente única de verdad para categorías y subcategorías.
 * Importado por seed.ts (DB).
 */

export interface CategoryData {
  name: string
  slug: string
  description: string
  subcategories: string[]
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    name: "Lorem Ipsum Categoría A",
    slug: "grapas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet A1",
      "Lorem ipsum dolor sit amet A2",
      "Lorem ipsum dolor sit amet A3",
      "Lorem ipsum dolor sit amet A4",
      "Lorem ipsum dolor sit amet A5",
      "Lorem ipsum dolor sit amet A6",
    ],
  },
  {
    name: "Lorem Ipsum Categoría B",
    slug: "conectores",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet B1",
      "Lorem ipsum dolor sit amet B2",
      "Lorem ipsum dolor sit amet B3",
      "Lorem ipsum dolor sit amet B4",
      "Lorem ipsum dolor sit amet B5",
      "Lorem ipsum dolor sit amet B6",
      "Lorem ipsum dolor sit amet B7",
    ],
  },
  {
    name: "Lorem Ipsum Categoría C",
    slug: "pernos",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet C1",
      "Lorem ipsum dolor sit amet C2",
      "Lorem ipsum dolor sit amet C3",
      "Lorem ipsum dolor sit amet C4",
      "Lorem ipsum dolor sit amet C5",
    ],
  },
  {
    name: "Lorem Ipsum Categoría D",
    slug: "puesta-a-tierra",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet D1",
      "Lorem ipsum dolor sit amet D2",
    ],
  },
  {
    name: "Lorem Ipsum Categoría E",
    slug: "aisladores",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet E1",
      "Lorem ipsum dolor sit amet E2",
    ],
  },
  {
    name: "Lorem Ipsum Categoría F",
    slug: "varillas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet F1",
      "Lorem ipsum dolor sit amet F2",
    ],
  },
  {
    name: "Lorem Ipsum Categoría G",
    slug: "herrajes-anclaje",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet G1",
      "Lorem ipsum dolor sit amet G2",
    ],
  },
  {
    name: "Lorem Ipsum Categoría H",
    slug: "tuercas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet H1",
      "Lorem ipsum dolor sit amet H2",
    ],
  },
  {
    name: "Lorem Ipsum Categoría I",
    slug: "pararrayos",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet I1",
      "Lorem ipsum dolor sit amet I2",
      "Lorem ipsum dolor sit amet I3",
    ],
  },
  {
    name: "Lorem Ipsum Categoría J",
    slug: "amarres",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet J1",
      "Lorem ipsum dolor sit amet J2",
      "Lorem ipsum dolor sit amet J3",
      "Lorem ipsum dolor sit amet J4",
    ],
  },
  {
    name: "Lorem Ipsum Categoría K",
    slug: "abrazaderas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet K1",
      "Lorem ipsum dolor sit amet K2",
      "Lorem ipsum dolor sit amet K3",
      "Lorem ipsum dolor sit amet K4",
      "Lorem ipsum dolor sit amet K5",
      "Lorem ipsum dolor sit amet K6",
      "Lorem ipsum dolor sit amet K7",
    ],
  },
  {
    name: "Lorem Ipsum Categoría L",
    slug: "adaptadores",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet L1",
      "Lorem ipsum dolor sit amet L2",
      "Lorem ipsum dolor sit amet L3",
      "Lorem ipsum dolor sit amet L4",
    ],
  },
  {
    name: "Lorem Ipsum Categoría M",
    slug: "retenidas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet M1",
      "Lorem ipsum dolor sit amet M2",
      "Lorem ipsum dolor sit amet M3",
      "Lorem ipsum dolor sit amet M4",
    ],
  },
  {
    name: "Lorem Ipsum Categoría N",
    slug: "cintas-acero",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet N1",
      "Lorem ipsum dolor sit amet N2",
      "Lorem ipsum dolor sit amet N3",
    ],
  },
  {
    name: "Lorem Ipsum Categoría O",
    slug: "fibra-optica",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet O1",
      "Lorem ipsum dolor sit amet O2",
      "Lorem ipsum dolor sit amet O3",
      "Lorem ipsum dolor sit amet O4",
    ],
  },
  {
    name: "Lorem Ipsum Categoría P",
    slug: "empalmes",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet P1",
      "Lorem ipsum dolor sit amet P2",
      "Lorem ipsum dolor sit amet P3",
      "Lorem ipsum dolor sit amet P4",
    ],
  },
  {
    name: "Lorem Ipsum Categoría Q",
    slug: "enzunchadora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet Q1",
      "Lorem ipsum dolor sit amet Q2",
      "Lorem ipsum dolor sit amet Q3",
    ],
  },
  {
    name: "Lorem Ipsum Categoría R",
    slug: "espigas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet R1",
      "Lorem ipsum dolor sit amet R2",
      "Lorem ipsum dolor sit amet R3",
    ],
  },
  {
    name: "Lorem Ipsum Categoría S",
    slug: "fusibles",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam lorem ipsum.",
    subcategories: [
      "Lorem ipsum dolor sit amet S1",
      "Lorem ipsum dolor sit amet S2",
      "Lorem ipsum dolor sit amet S3",
      "Lorem ipsum dolor sit amet S4",
    ],
  },
]

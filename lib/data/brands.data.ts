/**
 * Fuente única de verdad para marcas.
 * Importado por seed.ts (DB).
 */

export interface BrandSeedData {
  name:           string
  logo:           string
  logoAlt?:       string
  showInCarousel: boolean
}

export const BRANDS_DATA: BrandSeedData[] = [
  { name: "Asahi", logo: "", logoAlt: "Marca Asahi", showInCarousel: false },
  { name: "Bray", logo: "", logoAlt: "Marca Bray", showInCarousel: false },
  { name: "CAT/Caterpillar", logo: "", logoAlt: "Marca CAT/Caterpillar", showInCarousel: false },
  { name: "Continental", logo: "", logoAlt: "Marca Continental", showInCarousel: false },
  { name: "Donaldson", logo: "", logoAlt: "Marca Donaldson", showInCarousel: true },
  { name: "Eaton", logo: "", logoAlt: "Marca Eaton", showInCarousel: false },
  { name: "FAG", logo: "", logoAlt: "Marca FAG", showInCarousel: false },
  { name: "FYH", logo: "", logoAlt: "Marca FYH", showInCarousel: false },
  { name: "Fleetguard", logo: "", logoAlt: "Marca Fleetguard", showInCarousel: false },
  { name: "Fleetguard/Cummins", logo: "", logoAlt: "Marca Fleetguard/Cummins", showInCarousel: false },
  { name: "Flowserve", logo: "", logoAlt: "Marca Flowserve", showInCarousel: false },
  { name: "Gates", logo: "", logoAlt: "Marca Gates", showInCarousel: true },
  { name: "INA/FAG", logo: "", logoAlt: "Marca INA/FAG", showInCarousel: false },
  { name: "KSB", logo: "", logoAlt: "Marca KSB", showInCarousel: false },
  { name: "Kitz", logo: "", logoAlt: "Marca Kitz", showInCarousel: false },
  { name: "Komatsu", logo: "", logoAlt: "Marca Komatsu", showInCarousel: false },
  { name: "Koyo", logo: "", logoAlt: "Marca Koyo", showInCarousel: false },
  { name: "Mann+Hummel", logo: "", logoAlt: "Marca Mann+Hummel", showInCarousel: false },
  { name: "NSK", logo: "", logoAlt: "Marca NSK", showInCarousel: false },
  { name: "NTN", logo: "", logoAlt: "Marca NTN", showInCarousel: false },
  { name: "Nibco", logo: "", logoAlt: "Marca Nibco", showInCarousel: false },
  { name: "Optibelt", logo: "", logoAlt: "Marca Optibelt", showInCarousel: false },
  { name: "Parker", logo: "", logoAlt: "Marca Parker", showInCarousel: true },
  { name: "Racor/Parker", logo: "", logoAlt: "Marca Racor/Parker", showInCarousel: false },
  { name: "Rexroth", logo: "", logoAlt: "Marca Rexroth", showInCarousel: true },
  { name: "SKF", logo: "", logoAlt: "Marca SKF", showInCarousel: true },
  { name: "Timken", logo: "", logoAlt: "Marca Timken", showInCarousel: true },
  { name: "Velan", logo: "", logoAlt: "Marca Velan", showInCarousel: false },
  { name: "Yuken", logo: "", logoAlt: "Marca Yuken", showInCarousel: false },
]

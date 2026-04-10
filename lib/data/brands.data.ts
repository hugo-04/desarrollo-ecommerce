/**
 * Fuente única de verdad para marcas.
 * Importado por seed.ts (DB).
 * El frontend consume marcas desde la DB vía useBrandsCarousel().
 */

export interface BrandSeedData {
  name: string
  logo: string
  showInCarousel: boolean
}

export const BRANDS_DATA: BrandSeedData[] = [
  { name: "ABB",       logo: "https://logo.clearbit.com/abb.com",        showInCarousel: true  },
  { name: "Siemens",   logo: "https://logo.clearbit.com/siemens.com",    showInCarousel: true  },
  { name: "Schneider", logo: "https://logo.clearbit.com/se.com",         showInCarousel: true  },
  { name: "3M",        logo: "https://logo.clearbit.com/3m.com",         showInCarousel: true  },
  { name: "Nexans",    logo: "https://logo.clearbit.com/nexans.com",     showInCarousel: true  },
  { name: "Burndy",    logo: "https://logo.clearbit.com/burndy.com",     showInCarousel: true  },
  { name: "Sicame",    logo: "https://logo.clearbit.com/sicame.com",     showInCarousel: false },
  { name: "NGK",       logo: "https://logo.clearbit.com/ngk.de",         showInCarousel: false },
  { name: "Sediver",   logo: "https://logo.clearbit.com/sediver.com",    showInCarousel: false },
  { name: "PLP",       logo: "https://logo.clearbit.com/plp.com",        showInCarousel: false },
  { name: "Hubbell",   logo: "https://logo.clearbit.com/hubbell.com",    showInCarousel: false },
  { name: "Eaton",     logo: "https://logo.clearbit.com/eaton.com",      showInCarousel: false },
  { name: "Prodac",    logo: "",                                          showInCarousel: false },
]

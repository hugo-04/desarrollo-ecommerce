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
  { name: "Marca A",  logo: "", showInCarousel: true  },
  { name: "Marca B",  logo: "", showInCarousel: true  },
  { name: "Marca C",  logo: "", showInCarousel: true  },
  { name: "Marca D",  logo: "", showInCarousel: true  },
  { name: "Marca E",  logo: "", showInCarousel: true  },
  { name: "Marca F",  logo: "", showInCarousel: true  },
  { name: "Marca G",  logo: "", showInCarousel: false },
  { name: "Marca H",  logo: "", showInCarousel: false },
  { name: "Marca I",  logo: "", showInCarousel: false },
  { name: "Marca J",  logo: "", showInCarousel: false },
  { name: "Marca K",  logo: "", showInCarousel: false },
  { name: "Marca L",  logo: "", showInCarousel: false },
  { name: "Marca M",  logo: "", showInCarousel: false },
]

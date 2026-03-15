// ========== TYPE DEFINITIONS ==========

export interface TechnicalSpec {
  label: string
  value: string
}

export interface Product {
  id: number
  sku: string
  name: string
  brand: string
  category: string
  image: string
  specs: string[]
  description: string
  fullDescription: string
  technicalSpecs: TechnicalSpec[]
  gallery: string[]
  featured: boolean
  bestSeller: boolean
  rating: number
}

export interface Category {
  id: number
  name: string
  slug: string
  image: string
  subcategories: string[]
  count: number
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export interface Brand {
  name: string
  logo: string
}

export interface Client {
  name: string
  logo: string
}

export interface Testimonial {
  id: number
  text: string
  author: string
  position: string
  company: string
  avatar: string
}

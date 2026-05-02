/**
 * TIPOS GLOBALES DE DOMINIO
 *
 * Estas interfaces representan las entidades del negocio de Electro Thina.
 * Son usadas en toda la app: features, components, API routes y mocks.
 *
 * Principio clave: los tipos son independientes de la fuente de datos.
 * Al migrar a Prisma/PostgreSQL, estas interfaces seguirán siendo las mismas;
 * solo cambiarán los repositorios que las implementan.
 */

/** Subcategoría como entidad — id + name para el editor admin */
export interface SubcategoryItem {
  id:   number
  name: string
}

/** Par clave-valor para la ficha técnica de un producto (ej: Tensión → 22 kV) */
export interface TechnicalSpec {
  label: string
  value: string
}

/**
 * Producto del catálogo.
 * Representa un item eléctrico AT/MT con toda su información comercial y técnica.
 */
export interface Product {
  id: number
  name: string
  /** Nombre de la marca (referencia por nombre, no por ID) */
  brand: string
  /** Nombre de la categoría (referencia por nombre, no por ID) */
  category: string
  /** Slug URL de la categoría — para construir /categoria/[slug] */
  categorySlug?: string
  /** URL de la imagen principal */
  image: string
  /** Texto alternativo SEO de la imagen principal */
  imageAlt?: string
  /** Título de la imagen (atributo title, tooltip en hover) */
  imageTitle?: string
  /** Etiquetas técnicas cortas para mostrar como badges (ej: "22kV", "DN 50mm") */
  medidas: string[]
  /** Descripción corta — aparece en la tarjeta del catálogo */
  description: string
  /** Descripción completa en HTML (generada por el editor TipTap) */
  fullDescription: string
  /** Parámetros técnicos detallados para la ficha técnica */
  technicalSpecs: TechnicalSpec[]
  /** URLs de imágenes adicionales para el carrusel */
  gallery: string[]
  /** Textos alt SEO para cada imagen de la galería (mismo orden que gallery) */
  galleryAlts?: string[]
  /** Palabras clave SEO para metatag keywords y búsqueda interna */
  keywords?: string[]
  featured: boolean
  bestSeller: boolean
  /** Calificación de 0 a 5 */
  rating: number
  /** URL al PDF de la ficha técnica descargable (opcional) */
  fichaTecnica?: string
  /** Fechas de auditoría (ISO string tras serialización de Server Action) */
  createdAt?: string
  updatedAt?: string
}

/**
 * Categoría del catálogo (versión con icono React — solo para client-side).
 * El campo `icon` no es serializable a JSON; para la API usar `CategoryDTO`
 * definido en `features/categorias/types.ts`.
 */
export interface Category {
  id: number
  name: string
  /** Identificador de URL (ej: "aisladores") */
  slug: string
  /** URL de imagen representativa */
  image: string
  /** Meta description SEO (~155 chars) mostrada en resultados de Google */
  description?: string
  /** Nombres de subcategorías — para páginas públicas y SEO */
  subcategories: string[]
  /** Subcategorías con ID — solo disponible en respuestas del admin */
  subcategoryItems?: SubcategoryItem[]
  /** Cantidad de productos en esta categoría */
  count: number
  /** Componente icono — solo válido en el cliente, resuelto con getCategoryIcon(slug) */
  icon?: React.ComponentType<{ className?: string }>
  /** Alt text SEO de la imagen */
  imageAlt?: string
  /** Título de la imagen (atributo title, tooltip en hover) */
  imageTitle?: string
  /** Palabras clave SEO para metatag keywords y búsqueda interna */
  keywords?: string[]
  /** Si aparece en la grilla del home */
  featured: boolean
  createdAt?: string
  updatedAt?: string
}

/** Marca fabricante o distribuidora de productos */
export interface Brand {
  id: number
  name: string
  /** URL del logo (vacío si no tiene logo cargado) */
  logo: string
  /** Texto alternativo SEO del logo */
  logoAlt?: string
  /** Si true, el logo aparece en el carrusel de marcas del home */
  showInCarousel?: boolean
  createdAt?: string
  updatedAt?: string
}

/** Cliente/empresa que aparece en la sección de clientes del home */
export interface Client {
  name: string
  /** URL del logo del cliente */
  logo: string
}

/** Testimonio de un cliente para la sección de testimonios */
export interface Testimonial {
  id: number
  text: string
  author: string
  /** Cargo del autor (ej: "Jefe de Proyectos") */
  position: string
  company: string
  /** URL de foto de perfil */
  avatar: string
}

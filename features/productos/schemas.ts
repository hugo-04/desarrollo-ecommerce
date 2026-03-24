/**
 * features/productos/schemas.ts — Validación Zod del dominio de productos.
 *
 * Principio SOLID (SRP): la lógica de validación vive aquí, en la capa de
 * feature, separada del componente UI que la consume.
 *
 * Exporta:
 *  - productSchema    → schema principal (campos obligatorios para crear/editar)
 *  - ProductErrors    → tipo derivado para los errores por campo en el formulario
 */

import { z } from "zod"

// ---------------------------------------------------------------------------
// Schema principal
// ---------------------------------------------------------------------------

/**
 * Reglas de validación para crear o editar un producto.
 * Todos los campos aquí son los mínimos exigidos antes de persistir.
 */
export const productSchema = z.object({
  sku:         z.string().min(1, "SKU requerido"),
  name:        z.string().min(2, "Nombre del producto requerido"),
  brand:       z.string().min(1, "Seleccioná una marca"),
  category:    z.string().min(1, "Seleccioná una categoría"),
  description: z.string().min(10, "Descripción requerida (mín. 10 caracteres)"),
  image:       z.string().min(1, "Imagen principal requerida"),
  imageAlt:    z.string().min(3, "Nombre SEO de la imagen requerido"),
})

// ---------------------------------------------------------------------------
// Tipos derivados
// ---------------------------------------------------------------------------

/** Mapa de errores por campo — todos opcionales porque pueden no existir */
export type ProductErrors = Partial<Record<keyof z.infer<typeof productSchema>, string>>

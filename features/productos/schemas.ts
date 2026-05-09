/**
 * features/productos/schemas.ts — Validación Zod del dominio de productos.
 */

import { z } from "zod"

export const productSchema = z.object({
  name:        z.string().min(2, "Nombre del producto requerido"),
  brands:      z.array(z.string()).min(1, "Seleccioná al menos una marca"),
  category:    z.string().min(1, "Seleccioná una categoría"),
  description: z.string().optional(),
  image:       z.string().min(1, "Imagen principal requerida"),
  imageAlt:    z.string().min(3, "Nombre SEO de la imagen requerido (mín. 3 caracteres)"),
})

export type ProductErrors = Partial<Record<keyof z.infer<typeof productSchema>, string>>

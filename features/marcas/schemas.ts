/**
 * features/marcas/schemas.ts — Validación Zod del dominio de marcas.
 */

import { z } from "zod"

export const brandSchema = z.object({
  name:           z.string().min(2, "El nombre de la marca debe tener al menos 2 caracteres"),
  logo:           z.string().optional(),
  logoAlt:        z.string().max(125, "Máximo 125 caracteres para el alt text").optional(),
  showInCarousel: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.showInCarousel && !data.logo?.trim()) {
    ctx.addIssue({
      code:    z.ZodIssueCode.custom,
      message: "El logo es requerido para mostrar la marca en el carrusel",
      path:    ["logo"],
    })
  }
  if (data.logo?.trim() && !data.logoAlt?.trim()) {
    ctx.addIssue({
      code:    z.ZodIssueCode.custom,
      message: "Agregá un texto alternativo SEO para el logo",
      path:    ["logoAlt"],
    })
  }
})

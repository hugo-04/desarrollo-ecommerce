/**
 * features/marcas/schemas.ts — Validación Zod del dominio de marcas.
 *
 * Principio SOLID (SRP): la lógica de validación vive aquí, en la capa de
 * feature, separada del componente UI que la consume.
 *
 * Lógica del carrusel:
 *   showInCarousel OFF → logo opcional, la marca no aparece en el home
 *   showInCarousel ON  → logo REQUERIDO via superRefine, la marca aparece en el carrusel
 *
 * Exporta:
 *  - brandSchema   → schema con validación condicional del logo
 */

import { z } from "zod"

// ---------------------------------------------------------------------------
// Schema principal
// ---------------------------------------------------------------------------

/**
 * Reglas de validación para crear o editar una marca.
 * El logo es requerido SOLO cuando `showInCarousel` está activado.
 * Se usa `superRefine` para implementar esa dependencia condicional.
 */
export const brandSchema = z.object({
  name:           z.string().min(2, "El nombre de la marca debe tener al menos 2 caracteres"),
  logo:           z.string().optional(),
  logoAlt:        z.string().min(3, "Nombre SEO del logo requerido").optional(),
  showInCarousel: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.showInCarousel && !data.logo?.trim()) {
    ctx.addIssue({
      code:    z.ZodIssueCode.custom,
      message: "El logo es requerido para mostrar la marca en el carrusel",
      path:    ["logo"],
    })
  }
  if (data.showInCarousel && !data.logoAlt?.trim()) {
    ctx.addIssue({
      code:    z.ZodIssueCode.custom,
      message: "El nombre SEO del logo es requerido para el carrusel",
      path:    ["logoAlt"],
    })
  }
})

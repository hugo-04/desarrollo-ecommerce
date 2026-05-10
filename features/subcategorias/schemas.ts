import { z } from "zod"

export const subcategorySchema = z.object({
  name: z.string().min(2, "Nombre de la subcategoría requerido"),
  slug: z
    .string()
    .min(2, "Slug requerido")
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones")
    .nullable()
    .optional(),
  description: z
    .string()
    .max(160, "Máximo 160 caracteres — Google trunca a partir de aquí")
    .refine(
      (v) => v.trim().length === 0 || v.trim().length >= 100,
      "Muy corta para SEO — mínimo 100 caracteres o dejá vacío"
    )
    .optional(),
  imageAlt: z
    .string()
    .max(125, "Máximo 125 caracteres para el alt text")
    .optional(),
})

export type SubcatErrors = Partial<Record<"name" | "slug" | "description" | "imageAlt", string>>

/**
 * features/categorias/schemas.ts — Validación Zod del dominio de categorías.
 *
 * Principio SOLID (SRP): la lógica de validación vive aquí, en la capa de
 * feature, separada del componente UI que la consume.
 *
 * Exporta:
 *  - categorySchema  → schema principal (nombre y slug obligatorios)
 *  - CatErrors       → tipo derivado para los errores por campo en el formulario
 */

import { z } from "zod"

// ---------------------------------------------------------------------------
// Schema principal
// ---------------------------------------------------------------------------

/**
 * Reglas de validación para crear o editar una categoría.
 * El slug debe contener solo caracteres URL-safe: minúsculas, números y guiones.
 */
export const categorySchema = z.object({
  name: z.string().min(2, "Nombre de la categoría requerido"),
  slug: z.string()
    .min(2, "Slug requerido")
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
})

// ---------------------------------------------------------------------------
// Tipos derivados
// ---------------------------------------------------------------------------

/** Mapa de errores por campo — todos opcionales porque pueden no existir */
export type CatErrors = Partial<Record<"name" | "slug", string>>

import { z } from "zod"

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")
    .slice(0, 100)
}

export const blogPostSchema = z.object({
  title:      z.string().min(3, "El título debe tener al menos 3 caracteres"),
  slug:       z.string().min(3, "El slug debe tener al menos 3 caracteres")
               .regex(/^[a-z0-9-]+$/, "Solo letras minúsculas, números y guiones"),
  excerpt:    z.string().optional().default(""),
  content:    z.string().optional().default(""),
  coverImage: z.string().optional().default(""),
  coverAlt:   z.string().optional(),
  metaTitle:  z.string().max(70, "Máx. 70 caracteres para SEO").optional(),
  metaDesc:   z.string().max(160, "Máx. 160 caracteres para SEO").optional(),
  keywords:   z.array(z.string()).optional().default([]),
  published:  z.boolean().optional().default(false),
})

export type BlogPostFormData = z.infer<typeof blogPostSchema>

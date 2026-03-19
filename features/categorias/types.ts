import type { Category } from "@/lib/types"

// DTO: Category sin icon (React component, no serializable a JSON / DB)
// En DB: guardar iconSlug (string) y resolver el componente en el cliente
export type CategoryDTO = Omit<Category, "icon">

// ─── CRUD DTOs ─────────────────────────────────────────────────────────────────

export type CreateCategoryDTO = Omit<CategoryDTO, "id">
export type UpdateCategoryDTO = Partial<CreateCategoryDTO>

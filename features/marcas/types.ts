import type { Brand } from "@/lib/types"

export type { Brand }

// ─── CRUD DTOs ─────────────────────────────────────────────────────────────────

export type CreateBrandDTO = Omit<Brand, "id">
export type UpdateBrandDTO = Partial<CreateBrandDTO>

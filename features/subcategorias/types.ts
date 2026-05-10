export interface SubcategoryDTO {
  id:          number
  name:        string
  slug:        string | null
  image:       string
  imageAlt?:   string
  imageTitle?: string
  description: string
  keywords:    string[]
  categories?: { id: number; name: string }[]
  createdAt?:  string
  updatedAt?:  string
}

export type CreateSubcategoryDTO = Omit<SubcategoryDTO, "id" | "categories">
export type UpdateSubcategoryDTO = Partial<CreateSubcategoryDTO>

export interface SubcategoryFilters {
  query?: string
  page?:  number
  limit?: number
}

export interface SubcategoryPaginatedResult {
  data:       SubcategoryDTO[]
  total:      number
  page:       number
  totalPages: number
}

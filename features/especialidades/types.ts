export interface EspecialidadDTO {
  id:          number
  title:       string
  subtitle:    string
  description: string
  image:       string
  imageAlt?:   string
  gradient:    string
  order:       number
  active:      boolean
  createdAt?:  string
  updatedAt?:  string
}

export type CreateEspecialidadDTO = Omit<EspecialidadDTO, "id" | "createdAt" | "updatedAt">
export type UpdateEspecialidadDTO = Partial<CreateEspecialidadDTO>

export interface EspecialidadFilters {
  query?: string
  page?:  number
  limit?: number
}

export interface EspecialidadPaginatedResult {
  data:       EspecialidadDTO[]
  total:      number
  page:       number
  totalPages: number
}

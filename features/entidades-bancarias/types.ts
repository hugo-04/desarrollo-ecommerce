export interface EntidadBancariaDTO {
  id:          number
  name:        string
  logo:        string
  logoAlt?:    string
  nroCuenta?:  string
  nroCci?:     string
  order:       number
  active:      boolean
  createdAt?:  string
  updatedAt?:  string
}

export type CreateEntidadBancariaDTO = Omit<EntidadBancariaDTO, "id" | "createdAt" | "updatedAt">
export type UpdateEntidadBancariaDTO = Partial<CreateEntidadBancariaDTO>

export interface EntidadBancariaFilters {
  query?: string
  page?:  number
  limit?: number
}

export interface EntidadBancariaPaginatedResult {
  data:       EntidadBancariaDTO[]
  total:      number
  page:       number
  totalPages: number
}

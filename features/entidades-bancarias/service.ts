import type { IEntidadBancariaRepository } from "./repository"
import type { CreateEntidadBancariaDTO, UpdateEntidadBancariaDTO, EntidadBancariaFilters } from "./types"

export class EntidadBancariaService {
  constructor(private repo: IEntidadBancariaRepository) {}
  getAll()                                            { return this.repo.findAll() }
  getActive()                                         { return this.repo.findActive() }
  getPaged(filters: EntidadBancariaFilters)           { return this.repo.findPaged(filters) }
  getById(id: number)                                 { return this.repo.findById(id) }
  create(data: CreateEntidadBancariaDTO)              { return this.repo.create(data) }
  update(id: number, data: UpdateEntidadBancariaDTO)  { return this.repo.update(id, data) }
  delete(id: number)                                  { return this.repo.delete(id) }
}

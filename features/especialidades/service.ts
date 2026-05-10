import type { IEspecialidadRepository } from "./repository"
import type { CreateEspecialidadDTO, UpdateEspecialidadDTO, EspecialidadFilters } from "./types"

export class EspecialidadService {
  constructor(private repo: IEspecialidadRepository) {}
  getAll()                                        { return this.repo.findAll() }
  getActive()                                     { return this.repo.findActive() }
  getPaged(filters: EspecialidadFilters)          { return this.repo.findPaged(filters) }
  getById(id: number)                             { return this.repo.findById(id) }
  create(data: CreateEspecialidadDTO)             { return this.repo.create(data) }
  update(id: number, data: UpdateEspecialidadDTO) { return this.repo.update(id, data) }
  delete(id: number)                              { return this.repo.delete(id) }
}

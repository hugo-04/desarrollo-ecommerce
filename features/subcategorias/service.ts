import type { ISubcategoryRepository } from "./repository"
import type {
  SubcategoryDTO,
  CreateSubcategoryDTO,
  UpdateSubcategoryDTO,
  SubcategoryFilters,
  SubcategoryPaginatedResult,
} from "./types"

export class SubcategoryService {
  constructor(private readonly repo: ISubcategoryRepository) {}

  getAll(): Promise<SubcategoryDTO[]>                                         { return this.repo.findAll() }
  getPaged(f: SubcategoryFilters): Promise<SubcategoryPaginatedResult>        { return this.repo.findPaged(f) }
  getById(id: number): Promise<SubcategoryDTO | null>                         { return this.repo.findById(id) }
  create(data: CreateSubcategoryDTO): Promise<SubcategoryDTO>                 { return this.repo.create(data) }
  update(id: number, data: UpdateSubcategoryDTO): Promise<SubcategoryDTO>     { return this.repo.update(id, data) }
  delete(id: number): Promise<void>                                           { return this.repo.delete(id) }
}

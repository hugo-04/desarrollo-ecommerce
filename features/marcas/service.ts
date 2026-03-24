/**
 * BRAND SERVICE — Lógica de negocio para marcas.
 */

import type { Brand } from "@/lib/types"
import type { IBrandRepository } from "./repository"
import type { CreateBrandDTO, UpdateBrandDTO, BrandFilters, BrandPaginatedResult } from "./types"

export class BrandService {
  constructor(private readonly repo: IBrandRepository) {}

  getAll(): Promise<Brand[]>                                        { return this.repo.findAll() }
  getPaged(filters: BrandFilters): Promise<BrandPaginatedResult>    { return this.repo.findPaged(filters) }
  getById(id: number): Promise<Brand | null>                        { return this.repo.findById(id) }
  getNames(): Promise<string[]>                                     { return this.repo.findNames() }
  getCarousel(): Promise<Brand[]>                                   { return this.repo.findCarousel() }
  create(data: CreateBrandDTO): Promise<Brand>                      { return this.repo.create(data) }
  update(id: number, data: UpdateBrandDTO): Promise<Brand>          { return this.repo.update(id, data) }
  delete(id: number): Promise<void>                                 { return this.repo.delete(id) }
}

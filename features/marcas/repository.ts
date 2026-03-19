/**
 * BRAND REPOSITORY
 *
 * IBrandRepository: contrato que el servicio usa.
 * MockBrandRepository: implementación con datos mock (actual).
 *
 * Al migrar a DB:
 *   export class DbBrandRepository implements IBrandRepository { ... }
 */

import type { Brand } from "@/lib/types"
import type { CreateBrandDTO, UpdateBrandDTO } from "./types"
import { MOCK_BRANDS } from "@/lib/data/mock/brands.mock"

// ─── Interface ─────────────────────────────────────────────────────────────────

export interface IBrandRepository {
  findAll(): Promise<Brand[]>
  findById(id: number): Promise<Brand | null>
  findNames(): Promise<string[]>
  create(data: CreateBrandDTO): Promise<Brand>
  update(id: number, data: UpdateBrandDTO): Promise<Brand>
  delete(id: number): Promise<void>
}

// ─── Mock implementation ───────────────────────────────────────────────────────

export class MockBrandRepository implements IBrandRepository {
  private brands = [...MOCK_BRANDS]

  async findAll(): Promise<Brand[]>                    { return this.brands }
  async findById(id: number): Promise<Brand | null>    { return this.brands.find((b) => b.id === id) ?? null }
  async findNames(): Promise<string[]>                 { return this.brands.map((b) => b.name) }

  async create(data: CreateBrandDTO): Promise<Brand> {
    const id    = Math.max(...this.brands.map((b) => b.id)) + 1
    const brand = { id, ...data }
    this.brands.push(brand)
    return brand
  }

  async update(id: number, data: UpdateBrandDTO): Promise<Brand> {
    const index = this.brands.findIndex((b) => b.id === id)
    if (index === -1) throw new Error(`Marca ${id} no encontrada`)
    this.brands[index] = { ...this.brands[index], ...data }
    return this.brands[index]
  }

  async delete(id: number): Promise<void> {
    const index = this.brands.findIndex((b) => b.id === id)
    if (index === -1) throw new Error(`Marca ${id} no encontrada`)
    this.brands.splice(index, 1)
  }
}

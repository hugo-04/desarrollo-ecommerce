/**
 * PRODUCT REPOSITORY
 *
 * IProductRepository: contrato (interfaz) que el servicio usa.
 * MockProductRepository: implementación con datos mock (actual).
 *
 * Al migrar a DB:
 *   export class DbProductRepository implements IProductRepository { ... }
 *   Usar en actions.ts: new DbProductRepository(db)
 */

import type { Product } from "@/lib/types"
import type { ProductFilters, PaginatedResult, CreateProductDTO, UpdateProductDTO } from "./types"
import { MOCK_PRODUCTS } from "@/lib/data/mock/products.mock"

// ─── Interface ─────────────────────────────────────────────────────────────────

export interface IProductRepository {
  // Lectura
  findAll(filters: ProductFilters): Promise<PaginatedResult<Product>>
  findById(id: number): Promise<Product | null>
  findBestSellers(): Promise<Product[]>
  findFeatured(): Promise<Product[]>
  findRelated(productId: number, categoryName: string): Promise<Product[]>
  // CRUD (admin)
  create(data: CreateProductDTO): Promise<Product>
  update(id: number, data: UpdateProductDTO): Promise<Product>
  delete(id: number): Promise<void>
}

// ─── Mock implementation ───────────────────────────────────────────────────────

/**
 * Calcula el próximo ID disponible.
 * Usa `reduce` en lugar de spread + Math.max para evitar `-Infinity`
 * cuando el array está vacío, lo que causaría IDs `NaN`.
 */
function nextId(items: { id: number }[]): number {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1
}

export class MockProductRepository implements IProductRepository {
  private products = [...MOCK_PRODUCTS]

  async findAll(filters: ProductFilters): Promise<PaginatedResult<Product>> {
    const {
      categories = [],
      brands = [],
      query = "",
      onlyBestSellers = false,
      page = 1,
      limit = 12,
      sortBy = "recommended",
    } = filters

    const lq = query.toLowerCase()

    let result = this.products.filter((p) => {
      const matchesCategory   = categories.length === 0 || categories.includes(p.category)
      const matchesBrand      = brands.length === 0     || brands.includes(p.brand)
      // Busca en nombre, SKU, marca y descripción corta para mayor relevancia
      const matchesQuery      = !query || [p.name, p.sku, p.brand, p.description]
        .some((f) => f.toLowerCase().includes(lq))
      const matchesBestSeller = !onlyBestSellers || p.bestSeller
      return matchesCategory && matchesBrand && matchesQuery && matchesBestSeller
    })

    if (sortBy === "az")     result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    if (sortBy === "za")     result = [...result].sort((a, b) => b.name.localeCompare(a.name))
    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating)

    const total      = result.length
    const totalPages = Math.ceil(total / limit)
    const data       = result.slice((page - 1) * limit, page * limit)

    return { data, total, page, totalPages }
  }

  async findById(id: number): Promise<Product | null> {
    return this.products.find((p) => p.id === id) ?? null
  }

  async findBestSellers(): Promise<Product[]> {
    return this.products.filter((p) => p.bestSeller)
  }

  async findFeatured(): Promise<Product[]> {
    return this.products.filter((p) => p.featured)
  }

  async findRelated(productId: number, categoryName: string): Promise<Product[]> {
    return this.products.filter((p) => p.category === categoryName && p.id !== productId)
  }

  // ─── CRUD (en mock: sin persistencia — con DB: persistente) ─────────────────

  async create(data: CreateProductDTO): Promise<Product> {
    const id      = nextId(this.products)
    const product = { id, ...data }
    this.products.push(product)
    return product
  }

  async update(id: number, data: UpdateProductDTO): Promise<Product> {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) throw new Error(`Producto ${id} no encontrado`)
    this.products[index] = { ...this.products[index], ...data }
    return this.products[index]
  }

  async delete(id: number): Promise<void> {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) throw new Error(`Producto ${id} no encontrado`)
    this.products.splice(index, 1)
  }
}

/**
 * PRODUCT SERVICE — Lógica de negocio.
 * Orquesta llamadas al repository. No conoce la fuente de datos.
 */

import type { Product } from "@/lib/types"
import type { IProductRepository } from "./repository"
import type { ProductFilters, PaginatedResult, CreateProductDTO, UpdateProductDTO } from "./types"

export class ProductService {
  constructor(private readonly repo: IProductRepository) {}

  // ─── Lectura ──────────────────────────────────────────────────────────────────

  getCatalog(filters: ProductFilters): Promise<PaginatedResult<Product>> {
    return this.repo.findAll(filters)
  }

  getProductById(id: number): Promise<Product | null> {
    return this.repo.findById(id)
  }

  getBestSellers(): Promise<Product[]> {
    return this.repo.findBestSellers()
  }

  getFeatured(): Promise<Product[]> {
    return this.repo.findFeatured()
  }

  getRelatedProducts(productId: number, categoryName: string): Promise<Product[]> {
    return this.repo.findRelated(productId, categoryName)
  }

  // ─── CRUD (admin) ─────────────────────────────────────────────────────────────

  createProduct(data: CreateProductDTO): Promise<Product> {
    return this.repo.create(data)
  }

  updateProduct(id: number, data: UpdateProductDTO): Promise<Product> {
    return this.repo.update(id, data)
  }

  deleteProduct(id: number): Promise<void> {
    return this.repo.delete(id)
  }
}

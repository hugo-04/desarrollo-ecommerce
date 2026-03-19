/**
 * PRODUCT SERVICE — Business logic layer
 *
 * Sits between the repository (data) and the hooks (UI).
 * Orchestrates calls, applies business rules.
 * Components never call the repository directly — they go through the service.
 */

import type { Product, Category, Brand } from "@/lib/types"
import type { IProductRepository } from "./repository"
import type { ProductFilters, PaginatedResult } from "./types"

export class ProductService {
  constructor(private readonly repository: IProductRepository) {}

  getCatalog(filters: ProductFilters): Promise<PaginatedResult<Product>> {
    return this.repository.findAll(filters)
  }

  getProductById(id: number): Promise<Product | null> {
    return this.repository.findById(id)
  }

  getBestSellers(): Promise<Product[]> {
    return this.repository.findBestSellers()
  }

  getFeatured(): Promise<Product[]> {
    return this.repository.findFeatured()
  }

  getProductsByCategory(categoryName: string): Promise<Product[]> {
    return this.repository.findByCategory(categoryName)
  }

  getRelatedProducts(productId: number, categoryName: string): Promise<Product[]> {
    return this.repository.findRelated(productId, categoryName)
  }

  getCategories(): Promise<Category[]> {
    return this.repository.findCategories()
  }

  getBrands(): Promise<Brand[]> {
    return this.repository.findBrands()
  }

  getBrandNames(): Promise<string[]> {
    return this.repository.findBrandNames()
  }
}

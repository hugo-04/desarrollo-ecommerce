/**
 * REPOSITORY PATTERN — Productos
 *
 * IProductRepository defines the contract.
 * MockProductRepository implements it with local mock data.
 * ApiProductRepository will implement it with real HTTP calls when DB is ready.
 *
 * Principle: Dependency Inversion — components depend on the interface,
 * not on the concrete implementation.
 */

import type { Product, Category, Brand } from "@/lib/types"
import type { ProductFilters, PaginatedResult } from "./types"
import {
  MOCK_PRODUCTS,
} from "@/lib/data/mock/products.mock"
import {
  MOCK_CATEGORIES,
} from "@/lib/data/mock/categories.mock"
import {
  MOCK_BRANDS,
} from "@/lib/data/mock/brands.mock"

// ─── Interface (contract) ─────────────────────────────────────────────────────

export interface IProductRepository {
  findAll(filters: ProductFilters): Promise<PaginatedResult<Product>>
  findById(id: number): Promise<Product | null>
  findBestSellers(): Promise<Product[]>
  findFeatured(): Promise<Product[]>
  findByCategory(categoryName: string): Promise<Product[]>
  findRelated(productId: number, categoryName: string): Promise<Product[]>
  findCategories(): Promise<Category[]>
  findBrands(): Promise<Brand[]>
  findBrandNames(): Promise<string[]>
}

// ─── Mock implementation (current) ────────────────────────────────────────────

export class MockProductRepository implements IProductRepository {
  private products = MOCK_PRODUCTS
  private categories = MOCK_CATEGORIES
  private brands = MOCK_BRANDS

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

    let result = this.products.filter((p) => {
      const matchesCategory = categories.length === 0 || categories.includes(p.category)
      const matchesBrand = brands.length === 0 || brands.includes(p.brand)
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      const matchesBestSeller = !onlyBestSellers || p.bestSeller
      return matchesCategory && matchesBrand && matchesQuery && matchesBestSeller
    })

    if (sortBy === "az") result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    else if (sortBy === "za") result = [...result].sort((a, b) => b.name.localeCompare(a.name))
    else if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating)

    const total = result.length
    const totalPages = Math.ceil(total / limit)
    const data = result.slice((page - 1) * limit, page * limit)

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

  async findByCategory(categoryName: string): Promise<Product[]> {
    return this.products.filter((p) => p.category === categoryName)
  }

  async findRelated(productId: number, categoryName: string): Promise<Product[]> {
    return this.products.filter((p) => p.category === categoryName && p.id !== productId)
  }

  async findCategories(): Promise<Category[]> {
    return this.categories
  }

  async findBrands(): Promise<Brand[]> {
    return this.brands
  }

  async findBrandNames(): Promise<string[]> {
    return [...new Set(this.products.map((p) => p.brand))]
  }
}

// ─── Future: API implementation skeleton ──────────────────────────────────────
// Uncomment and complete when the backend is ready.
//
// export class ApiProductRepository implements IProductRepository {
//   constructor(private baseUrl: string) {}
//
//   async findAll(filters: ProductFilters): Promise<PaginatedResult<Product>> {
//     const params = new URLSearchParams()
//     if (filters.categories?.length) params.set("cat", filters.categories.join(","))
//     if (filters.brands?.length) params.set("brand", filters.brands.join(","))
//     if (filters.query) params.set("q", filters.query)
//     if (filters.onlyBestSellers) params.set("bestSellers", "true")
//     if (filters.page) params.set("page", String(filters.page))
//     if (filters.limit) params.set("limit", String(filters.limit))
//     if (filters.sortBy) params.set("sort", filters.sortBy)
//     const res = await fetch(`${this.baseUrl}/api/productos?${params}`)
//     return res.json()
//   }
//   ... etc
// }

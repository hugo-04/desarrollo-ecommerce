"use server"

/**
 * PRODUCT SERVER ACTIONS
 *
 * Punto de entrada para todo acceso a productos desde el cliente o Server Components.
 * No hay fetch(), no hay HTTP manual.
 *
 * MIGRACIÓN A DB: cambiar MockProductRepository → DbProductRepository aquí.
 * El resto del código no necesita cambios.
 */

import { MockProductRepository } from "./repository"
import { ProductService } from "./service"
import type { ProductFilters, CreateProductDTO, UpdateProductDTO } from "./types"

// Singleton: una sola instancia compartida entre todas las llamadas del proceso.
const _service = new ProductService(new MockProductRepository())
// TODO DB: const _service = new ProductService(new DbProductRepository(db))

function getService() { return _service }

// ─── Lectura ──────────────────────────────────────────────────────────────────

export async function getCatalogAction(filters: ProductFilters) {
  return getService().getCatalog(filters)
}

export async function getProductAction(id: number) {
  return getService().getProductById(id)
}

export async function getBestSellersAction() {
  return getService().getBestSellers()
}

export async function getRelatedProductsAction(productId: number, categoryName: string) {
  return getService().getRelatedProducts(productId, categoryName)
}

// ─── CRUD admin ───────────────────────────────────────────────────────────────

export async function createProductAction(data: CreateProductDTO) {
  // TODO: validar sesión admin antes de crear
  return getService().createProduct(data)
}

export async function updateProductAction(id: number, data: UpdateProductDTO) {
  // TODO: validar sesión admin
  return getService().updateProduct(id, data)
}

export async function deleteProductAction(id: number) {
  // TODO: validar sesión admin
  return getService().deleteProduct(id)
}

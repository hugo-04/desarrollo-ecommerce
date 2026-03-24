"use server"

/**
 * PRODUCT SERVER ACTIONS
 *
 * Punto de entrada para todo acceso a productos desde el cliente o Server Components.
 * No hay fetch(), no hay HTTP manual.
 */

import { DbProductRepository } from "./repository"
import { ProductService } from "./service"
import type { ProductFilters, CreateProductDTO, UpdateProductDTO } from "./types"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth/session"

// Singleton: una sola instancia compartida entre todas las llamadas del proceso.
const _service = new ProductService(new DbProductRepository(db))

function getService() { return _service }

// ─── Lectura (sin auth — datos públicos) ──────────────────────────────────────

export async function getCatalogAction(filters: ProductFilters) {
  return getService().getCatalog(filters)
}

/** Versión paginada simplificada para el listado admin.
 *  Acepta { page, query, limit } y delega a getCatalog. */
export async function getProductsPagedAction(params: { page: number; query: string; limit: number }) {
  return getService().getCatalog(params)
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

// ─── CRUD admin (requieren sesión activa) ─────────────────────────────────────

export async function createProductAction(data: CreateProductDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  return getService().createProduct(data)
}

export async function updateProductAction(id: number, data: UpdateProductDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  return getService().updateProduct(id, data)
}

export async function deleteProductAction(id: number) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  return getService().deleteProduct(id)
}

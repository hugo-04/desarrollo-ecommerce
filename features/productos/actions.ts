"use server"

/**
 * PRODUCT SERVER ACTIONS
 *
 * Punto de entrada para todo acceso a productos desde el cliente o Server Components.
 */

import { revalidatePath } from "next/cache"
import { DbProductRepository } from "./repository"
import { ProductService } from "./service"
import type { ProductFilters, CreateProductDTO, UpdateProductDTO } from "./types"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth/session"
import { deleteFromS3 } from "@/lib/storage/s3"

const _service = new ProductService(new DbProductRepository(db))

function getService() { return _service }

// ─── Lectura (sin auth — datos públicos) ──────────────────────────────────────

export async function getCatalogAction(filters: ProductFilters) {
  return getService().getCatalog(filters)
}

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
  const result = await getService().createProduct(data)
  revalidatePath("/catalogo")
  revalidatePath("/producto/[id]", "page")
  revalidatePath("/categoria/[slug]", "page")
  revalidatePath("/productos")
  revalidatePath("/")
  return result
}

export async function updateProductAction(id: number, data: UpdateProductDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const old = await getService().getProductById(id)
  const result = await getService().updateProduct(id, data)
  if (old) {
    const toDelete: string[] = []
    if (data.image !== undefined && old.image !== data.image) toDelete.push(old.image)
    if (data.fichaTecnica !== undefined && old.fichaTecnica && old.fichaTecnica !== data.fichaTecnica)
      toDelete.push(old.fichaTecnica)
    if (data.gallery !== undefined && old.gallery?.length) {
      const newSet = new Set(data.gallery)
      old.gallery.forEach((url) => { if (!newSet.has(url)) toDelete.push(url) })
    }
    await Promise.all(toDelete.map((url) => deleteFromS3(url)))
  }
  revalidatePath("/catalogo")
  revalidatePath("/producto/[id]", "page")
  revalidatePath("/categoria/[slug]", "page")
  revalidatePath("/productos")
  revalidatePath("/")
  return result
}

export async function deleteProductAction(id: number) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const product = await getService().getProductById(id)
  const result = await getService().deleteProduct(id)
  if (product) {
    const files = [product.image, ...(product.gallery ?? []), product.fichaTecnica].filter(Boolean) as string[]
    await Promise.all(files.map((url) => deleteFromS3(url)))
  }
  revalidatePath("/catalogo")
  revalidatePath("/producto/[id]", "page")
  revalidatePath("/categoria/[slug]", "page")
  revalidatePath("/productos")
  revalidatePath("/")
  return result
}

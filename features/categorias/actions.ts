"use server"

/**
 * CATEGORY SERVER ACTIONS
 * Punto de entrada para todo acceso a categorías desde el cliente o Server Components.
 */

import { revalidatePath } from "next/cache"
import { DbCategoryRepository } from "./repository"
import { CategoryService } from "./service"
import type { CreateCategoryDTO, UpdateCategoryDTO, CategoryFilters } from "./types"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth/session"

// Singleton: una sola instancia compartida entre todas las llamadas del proceso.
const _service = new CategoryService(new DbCategoryRepository(db))

function getService() { return _service }

// ─── Lectura (sin auth — datos públicos) ──────────────────────────────────────

export async function getCategoriesAction() {
  return getService().getAll()
}

/** Solo las categorías marcadas como destacadas — para la grilla del home */
export async function getFeaturedCategoriesAction() {
  return getService().getFeatured()
}

/** Versión paginada — solo devuelve la página solicitada.
 *  Usar en el listado admin para no cargar todas las categorías de una vez. */
export async function getCategoriesPagedAction(filters: CategoryFilters) {
  return getService().getPaged(filters)
}

export async function getCategoryByIdAction(id: number) {
  return getService().getById(id)
}

export async function getCategoryBySlugAction(slug: string) {
  return getService().getBySlug(slug)
}

// ─── CRUD admin (requieren sesión activa) ─────────────────────────────────────

export async function createCategoryAction(data: CreateCategoryDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const result = await getService().create(data)
  revalidatePath("/catalogo")
  revalidatePath("/")
  return result
}

export async function updateCategoryAction(id: number, data: UpdateCategoryDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const result = await getService().update(id, data)
  revalidatePath("/catalogo")
  revalidatePath("/")
  return result
}

export async function deleteCategoryAction(id: number) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const result = await getService().delete(id)
  revalidatePath("/catalogo")
  revalidatePath("/")
  return result
}

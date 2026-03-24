"use server"

/**
 * CATEGORY SERVER ACTIONS
 * Punto de entrada para todo acceso a categorías desde el cliente o Server Components.
 */

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

/** Versión paginada — solo devuelve la página solicitada.
 *  Usar en el listado admin para no cargar todas las categorías de una vez. */
export async function getCategoriesPagedAction(filters: CategoryFilters) {
  return getService().getPaged(filters)
}

export async function getCategoryByIdAction(id: number) {
  return getService().getById(id)
}

// ─── CRUD admin (requieren sesión activa) ─────────────────────────────────────

export async function createCategoryAction(data: CreateCategoryDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  return getService().create(data)
}

export async function updateCategoryAction(id: number, data: UpdateCategoryDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  return getService().update(id, data)
}

export async function deleteCategoryAction(id: number) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  return getService().delete(id)
}

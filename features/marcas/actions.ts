"use server"

/**
 * BRAND SERVER ACTIONS
 * Punto de entrada para todo acceso a marcas desde el cliente o Server Components.
 */

import { DbBrandRepository } from "./repository"
import { BrandService } from "./service"
import type { CreateBrandDTO, UpdateBrandDTO, BrandFilters } from "./types"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth/session"

// Singleton: una sola instancia compartida entre todas las llamadas del proceso.
const _service = new BrandService(new DbBrandRepository(db))

function getService() { return _service }

// ─── Lectura (sin auth — datos públicos) ──────────────────────────────────────

export async function getBrandsAction() {
  return getService().getAll()
}

/** Solo las marcas con showInCarousel=true — para el carrusel/marquee del home */
export async function getBrandsForCarouselAction() {
  return getService().getCarousel()
}

/** Versión paginada — solo devuelve la página solicitada.
 *  Usar en el listado admin para no cargar todas las marcas de una vez. */
export async function getBrandsPagedAction(filters: BrandFilters) {
  return getService().getPaged(filters)
}

export async function getBrandNamesAction() {
  return getService().getNames()
}

export async function getBrandByIdAction(id: number) {
  return getService().getById(id)
}

// ─── CRUD admin (requieren sesión activa) ─────────────────────────────────────

export async function createBrandAction(data: CreateBrandDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  return getService().create(data)
}

export async function updateBrandAction(id: number, data: UpdateBrandDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  return getService().update(id, data)
}

export async function deleteBrandAction(id: number) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  return getService().delete(id)
}

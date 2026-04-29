"use server"

/**
 * BRAND SERVER ACTIONS
 * Punto de entrada para todo acceso a marcas desde el cliente o Server Components.
 */

import { revalidatePath } from "next/cache"
import { DbBrandRepository } from "./repository"
import { BrandService } from "./service"
import type { CreateBrandDTO, UpdateBrandDTO, BrandFilters } from "./types"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth/session"

const _service = new BrandService(new DbBrandRepository(db))

function getService() { return _service }

// ─── Lectura (sin auth — datos públicos) ──────────────────────────────────────

export async function getBrandsAction() {
  return getService().getAll()
}

export async function getBrandsForCarouselAction() {
  return getService().getCarousel()
}

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
  const result = await getService().create(data)
  revalidatePath("/catalogo")
  revalidatePath("/marcas")
  revalidatePath("/")
  return result
}

export async function updateBrandAction(id: number, data: UpdateBrandDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const result = await getService().update(id, data)
  revalidatePath("/catalogo")
  revalidatePath("/marcas")
  revalidatePath("/producto/[id]", "page")
  revalidatePath("/")
  return result
}

export async function deleteBrandAction(id: number) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const result = await getService().delete(id)
  revalidatePath("/catalogo")
  revalidatePath("/marcas")
  revalidatePath("/")
  return result
}

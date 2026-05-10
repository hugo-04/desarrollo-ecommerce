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
import { deleteFromS3 } from "@/lib/storage/s3"

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

export async function getBrandByNameAction(name: string) {
  return getService().getByName(name)
}

// ─── CRUD admin (requieren sesión activa) ─────────────────────────────────────

export async function createBrandAction(data: CreateBrandDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const result = await getService().create(data)
  revalidatePath("/catalogo")
  revalidatePath("/marcas")
  revalidatePath("/marca/[nombre]", "page")
  revalidatePath("/")
  return result
}

export async function updateBrandAction(id: number, data: UpdateBrandDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const old = await getService().getById(id)
  const result = await getService().update(id, data)
  if (old?.logo && data.logo !== undefined && old.logo !== data.logo)
    await deleteFromS3(old.logo)
  revalidatePath("/catalogo")
  revalidatePath("/marcas")
  revalidatePath("/marca/[nombre]", "page")
  revalidatePath("/producto/[id]", "page")
  revalidatePath("/")
  return result
}

export async function deleteBrandAction(id: number) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const brand = await getService().getById(id)
  const result = await getService().delete(id)
  if (brand?.logo) await deleteFromS3(brand.logo)
  revalidatePath("/catalogo")
  revalidatePath("/marcas")
  revalidatePath("/marca/[nombre]", "page")
  revalidatePath("/")
  return result
}

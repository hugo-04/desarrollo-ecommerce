"use server"

/**
 * BRAND SERVER ACTIONS
 * MIGRACIÓN A DB: cambiar MockBrandRepository → DbBrandRepository.
 */

import { MockBrandRepository } from "./repository"
import { BrandService } from "./service"
import type { CreateBrandDTO, UpdateBrandDTO } from "./types"

function getService() {
  return new BrandService(new MockBrandRepository())
  // TODO DB: return new BrandService(new DbBrandRepository(db))
}

// ─── Lectura ──────────────────────────────────────────────────────────────────

export async function getBrandsAction() {
  return getService().getAll()
}

export async function getBrandNamesAction() {
  return getService().getNames()
}

export async function getBrandByIdAction(id: number) {
  return getService().getById(id)
}

// ─── CRUD admin ───────────────────────────────────────────────────────────────

export async function createBrandAction(data: CreateBrandDTO) {
  return getService().create(data)
}

export async function updateBrandAction(id: number, data: UpdateBrandDTO) {
  return getService().update(id, data)
}

export async function deleteBrandAction(id: number) {
  return getService().delete(id)
}

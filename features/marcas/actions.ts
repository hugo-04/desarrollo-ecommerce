"use server"

/**
 * BRAND SERVER ACTIONS
 * MIGRACIÓN A DB: cambiar MockBrandRepository → DbBrandRepository.
 */

import { MockBrandRepository } from "./repository"
import { BrandService } from "./service"
import type { CreateBrandDTO, UpdateBrandDTO } from "./types"

// Singleton: una sola instancia compartida entre todas las llamadas del proceso.
// Sin esto, cada acción creaba un repo nuevo y los cambios se perdían al instante.
const _service = new BrandService(new MockBrandRepository())
// TODO DB: const _service = new BrandService(new DbBrandRepository(db))

function getService() { return _service }

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

"use server"

/**
 * CATEGORY SERVER ACTIONS
 * MIGRACIÓN A DB: cambiar MockCategoryRepository → DbCategoryRepository.
 */

import { MockCategoryRepository } from "./repository"
import { CategoryService } from "./service"
import type { CreateCategoryDTO, UpdateCategoryDTO } from "./types"

function getService() {
  return new CategoryService(new MockCategoryRepository())
  // TODO DB: return new CategoryService(new DbCategoryRepository(db))
}

// ─── Lectura ──────────────────────────────────────────────────────────────────

export async function getCategoriesAction() {
  return getService().getAll()
}

export async function getCategoryByIdAction(id: number) {
  return getService().getById(id)
}

// ─── CRUD admin ───────────────────────────────────────────────────────────────

export async function createCategoryAction(data: CreateCategoryDTO) {
  return getService().create(data)
}

export async function updateCategoryAction(id: number, data: UpdateCategoryDTO) {
  return getService().update(id, data)
}

export async function deleteCategoryAction(id: number) {
  return getService().delete(id)
}

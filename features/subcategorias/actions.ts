"use server"

import { revalidatePath } from "next/cache"
import { DbSubcategoryRepository } from "./repository"
import { SubcategoryService } from "./service"
import type { CreateSubcategoryDTO, UpdateSubcategoryDTO, SubcategoryFilters } from "./types"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth/session"
import { deleteFromS3 } from "@/lib/storage/s3"

const _service = new SubcategoryService(new DbSubcategoryRepository(db))
function getService() { return _service }

// ─── Lectura pública ──────────────────────────────────────────────────────────

export async function getSubcategoriesAction() {
  return getService().getAll()
}

export async function getSubcategoriesPagedAction(filters: SubcategoryFilters) {
  return getService().getPaged(filters)
}

export async function getSubcategoryByIdAction(id: number) {
  return getService().getById(id)
}

// ─── CRUD admin (requieren sesión) ────────────────────────────────────────────

export async function createSubcategoryFullAction(data: CreateSubcategoryDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const result = await getService().create(data)
  revalidatePath("/subcategorias")
  revalidatePath("/catalogo")
  return result
}

export async function updateSubcategoryAction(id: number, data: UpdateSubcategoryDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const old = await getService().getById(id)
  const result = await getService().update(id, data)
  if (old?.image && data.image !== undefined && old.image !== data.image)
    await deleteFromS3(old.image)
  revalidatePath("/subcategorias")
  revalidatePath("/catalogo")
  return result
}

export async function getSubcategoryProductCountAction(id: number): Promise<number> {
  return db.product.count({ where: { subcategoryId: id } })
}

export async function deleteSubcategoryAction(id: number) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const sub = await getService().getById(id)
  await getService().delete(id)
  if (sub?.image) await deleteFromS3(sub.image)
  revalidatePath("/subcategorias")
  revalidatePath("/catalogo")
}

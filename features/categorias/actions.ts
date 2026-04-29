"use server"

/**
 * CATEGORY SERVER ACTIONS
 * Punto de entrada para todo acceso a categorías desde el cliente o Server Components.
 */

import { revalidatePath } from "next/cache"
import { DbCategoryRepository } from "./repository"
import { CategoryService } from "./service"
import type { CreateCategoryDTO, UpdateCategoryDTO, CategoryFilters } from "./types"
import type { SubcategoryItem } from "@/lib/types"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth/session"

const _service = new CategoryService(new DbCategoryRepository(db))

function getService() { return _service }

// ─── Lectura (sin auth — datos públicos) ──────────────────────────────────────

export async function getCategoriesAction() {
  return getService().getAll()
}

export async function getFeaturedCategoriesAction() {
  return getService().getFeatured()
}

export async function getCategoriesPagedAction(filters: CategoryFilters) {
  return getService().getPaged(filters)
}

export async function getCategoryByIdAction(id: number) {
  return getService().getById(id)
}

export async function getCategoryBySlugAction(slug: string) {
  return getService().getBySlug(slug)
}

/**
 * Retorna solo las opciones de filtro que tienen ≥ 1 producto asociado.
 * Usa una sola round-trip a la DB con dos queries en paralelo.
 *
 *  - categories: categorías con count > 0 (ya calculado en el campo denormalizado)
 *  - brandNames: marcas que tienen al menos un producto referenciado
 */
export async function getActiveFilterOptionsAction(): Promise<{
  categories: import("./types").CategoryDTO[]
  brandNames: string[]
}> {
  const INCLUDE_SUBS = { subs: true } as const

  const [categoryRows, brandRows] = await Promise.all([
    // Categorías con al menos 1 producto (field denormalizado)
    db.category.findMany({
      where: { count: { gt: 0 } },
      orderBy: { count: "desc" },
      include: INCLUDE_SUBS,
    }),
    // Marcas que tienen al menos 1 producto (JOIN real)
    db.brand.findMany({
      where: { products: { some: {} } },
      orderBy: { name: "asc" },
      select: { name: true },
    }),
  ])

  // Mapear a CategoryDTO
  const categories = categoryRows.map((c: any) => ({
    id:              c.id,
    name:            c.name,
    slug:            c.slug,
    image:           c.image,
    imageAlt:        c.imageAlt    ?? undefined,
    imageTitle:      c.imageTitle  ?? undefined,
    description:     c.description ?? undefined,
    subcategories:   c.subs.map((s: any) => s.name),
    subcategoryItems: c.subs.map((s: any) => ({ id: s.id, name: s.name })),
    keywords:        c.keywords,
    count:           c.count,
    featured:        c.featured,
    createdAt:       c.createdAt instanceof Date ? c.createdAt.toISOString() : c.createdAt,
    updatedAt:       c.updatedAt instanceof Date ? c.updatedAt.toISOString() : c.updatedAt,
  }))

  const brandNames = brandRows.map((b: { name: string }) => b.name)

  return { categories, brandNames }
}

// ─── Subcategorías ────────────────────────────────────────────────────────────

/** Devuelve todas las subcategorías registradas en DB, ordenadas por nombre */
export async function getAllSubcategoriesAction(): Promise<SubcategoryItem[]> {
  const rows = await db.subcategory.findMany({ orderBy: { name: "asc" } })
  return rows.map((r) => ({ id: r.id, name: r.name }))
}

/**
 * Crea una subcategoría si no existe (case-insensitive).
 * Si ya existe devuelve la existente — idempotente.
 * Requiere sesión admin.
 */
export async function createSubcategoryAction(name: string): Promise<SubcategoryItem> {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")

  const trimmed = name.trim()
  if (!trimmed) throw new Error("El nombre es requerido")

  // Buscar case-insensitive para evitar duplicados
  const existing = await db.subcategory.findFirst({
    where: { name: { equals: trimmed, mode: "insensitive" } },
  })
  if (existing) return { id: existing.id, name: existing.name }

  const created = await db.subcategory.create({ data: { name: trimmed } })
  return { id: created.id, name: created.name }
}

// ─── CRUD admin (requieren sesión activa) ─────────────────────────────────────

export async function createCategoryAction(data: CreateCategoryDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const result = await getService().create(data)
  revalidatePath("/catalogo")
  revalidatePath("/categoria/[slug]", "page")
  revalidatePath("/categorias")
  revalidatePath("/")
  return result
}

export async function updateCategoryAction(id: number, data: UpdateCategoryDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const result = await getService().update(id, data)
  revalidatePath("/catalogo")
  revalidatePath("/categoria/[slug]", "page")
  revalidatePath("/categorias")
  revalidatePath("/")
  return result
}

export async function deleteCategoryAction(id: number) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const result = await getService().delete(id)
  revalidatePath("/catalogo")
  revalidatePath("/categoria/[slug]", "page")
  revalidatePath("/categorias")
  revalidatePath("/")
  return result
}

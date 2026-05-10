"use server"

import { revalidatePath } from "next/cache"
import { DbBlogRepository } from "./repository"
import { BlogService } from "./service"
import type { BlogPostFilters, CreateBlogPostDTO, UpdateBlogPostDTO } from "./types"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth/session"
import { deleteFromS3 } from "@/lib/storage/s3"

const _service = new BlogService(new DbBlogRepository(db))

function getService() { return _service }

// ─── Lectura pública (sin auth) ───────────────────────────────────────────────

export async function getBlogPostsPagedAction(params: { page: number; query: string; limit: number }) {
  return getService().getPaged(params)
}

export async function getPublishedBlogPostsAction(limit?: number) {
  return getService().getPublished(limit)
}

export async function getBlogPostBySlugAction(slug: string) {
  return getService().getBySlug(slug)
}

export async function getBlogPostByIdAction(id: number) {
  return getService().getById(id)
}

// ─── CRUD admin (requieren sesión) ────────────────────────────────────────────

export async function createBlogPostAction(data: CreateBlogPostDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const result = await getService().create(data)
  revalidatePath("/blog")
  revalidatePath("/blog/[slug]", "page")
  revalidatePath("/blogs")
  return result
}

export async function updateBlogPostAction(id: number, data: UpdateBlogPostDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const old = await getService().getById(id)
  const result = await getService().update(id, data)
  if (old) {
    const toDelete: string[] = []
    if (data.coverImage !== undefined && old.coverImage && old.coverImage !== data.coverImage) toDelete.push(old.coverImage)
    if (data.image2 !== undefined && old.image2 && old.image2 !== data.image2) toDelete.push(old.image2)
    if (data.image3 !== undefined && old.image3 && old.image3 !== data.image3) toDelete.push(old.image3)
    await Promise.all(toDelete.map((url) => deleteFromS3(url)))
  }
  revalidatePath("/blog")
  revalidatePath("/blog/[slug]", "page")
  revalidatePath("/blogs")
  return result
}

export async function deleteBlogPostAction(id: number) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const post = await getService().getById(id)
  await getService().delete(id)
  if (post) {
    const urls = [post.coverImage, post.image2, post.image3].filter(Boolean) as string[]
    await Promise.all(urls.map((url) => deleteFromS3(url)))
  }
  revalidatePath("/blog")
  revalidatePath("/blog/[slug]", "page")
  revalidatePath("/blogs")
}

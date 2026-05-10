"use server"

import { revalidatePath } from "next/cache"
import { DbHeroRepository } from "./repository"
import { HeroService } from "./service"
import type { CreateHeroSlideDTO, UpdateHeroSlideDTO } from "./types"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth/session"
import { deleteFromS3 } from "@/lib/storage/s3"

const _service = new HeroService(new DbHeroRepository(db))
function svc() { return _service }

// ─── Pública (sin auth) ───────────────────────────────────────────────────────

export async function getHeroSlidesAction() {
  return svc().getActive()
}

export async function getAllHeroSlidesAction() {
  return svc().getAll()
}

export async function getHeroSlideByIdAction(id: number) {
  return svc().getById(id)
}

// ─── Admin (requieren sesión) ─────────────────────────────────────────────────

function invalidate() {
  revalidatePath("/")
  revalidatePath("/hero")
}

export async function createHeroSlideAction(data: CreateHeroSlideDTO) {
  const s = await getSession(); if (!s) throw new Error("No autorizado")
  const result = await svc().create(data)
  invalidate()
  return result
}

export async function updateHeroSlideAction(id: number, data: UpdateHeroSlideDTO) {
  const s = await getSession(); if (!s) throw new Error("No autorizado")
  const old = await svc().getById(id)
  const result = await svc().update(id, data)
  if (old?.image && data.image !== undefined && old.image !== data.image && old.image.startsWith("http"))
    await deleteFromS3(old.image)
  invalidate()
  return result
}

export async function reorderHeroSlideAction(id: number, direction: "up" | "down") {
  const s = await getSession(); if (!s) throw new Error("No autorizado")
  await svc().reorder(id, direction)
  invalidate()
}

export async function deleteHeroSlideAction(id: number) {
  const s = await getSession(); if (!s) throw new Error("No autorizado")
  const slide = await svc().getById(id)
  await svc().delete(id)
  if (slide?.image && slide.image.startsWith("http")) await deleteFromS3(slide.image)
  invalidate()
}

"use server"

import { revalidatePath } from "next/cache"
import { DbEntidadBancariaRepository } from "./repository"
import { EntidadBancariaService } from "./service"
import type { CreateEntidadBancariaDTO, UpdateEntidadBancariaDTO, EntidadBancariaFilters } from "./types"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth/session"
import { deleteFromS3 } from "@/lib/storage/s3"

const _service = new EntidadBancariaService(new DbEntidadBancariaRepository(db))
function svc() { return _service }

// ─── Lectura pública ──────────────────────────────────────────────────────────

export async function getEntidadesBancariasActivasAction() {
  return svc().getActive()
}

export async function getEntidadesBancariasPagedAction(filters: EntidadBancariaFilters) {
  return svc().getPaged(filters)
}

export async function getEntidadBancariaByIdAction(id: number) {
  return svc().getById(id)
}

// ─── CRUD admin ───────────────────────────────────────────────────────────────

export async function createEntidadBancariaAction(data: CreateEntidadBancariaDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const result = await svc().create(data)
  revalidatePath("/")
  return result
}

export async function updateEntidadBancariaAction(id: number, data: UpdateEntidadBancariaDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const old = await svc().getById(id)
  const result = await svc().update(id, data)
  if (old?.logo && data.logo !== undefined && old.logo !== data.logo)
    await deleteFromS3(old.logo)
  revalidatePath("/")
  return result
}

export async function deleteEntidadBancariaAction(id: number) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const ent = await svc().getById(id)
  await svc().delete(id)
  if (ent?.logo) await deleteFromS3(ent.logo)
  revalidatePath("/")
}

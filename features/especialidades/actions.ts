"use server"

import { revalidatePath } from "next/cache"
import { DbEspecialidadRepository } from "./repository"
import { EspecialidadService } from "./service"
import type { CreateEspecialidadDTO, UpdateEspecialidadDTO, EspecialidadFilters } from "./types"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth/session"
import { deleteFromS3 } from "@/lib/storage/s3"

const _service = new EspecialidadService(new DbEspecialidadRepository(db))
function svc() { return _service }

// ─── Lectura pública ──────────────────────────────────────────────────────────

export async function getEspecialidadesActivasAction() {
  return svc().getActive()
}

export async function getEspecialidadesPagedAction(filters: EspecialidadFilters) {
  return svc().getPaged(filters)
}

export async function getEspecialidadByIdAction(id: number) {
  return svc().getById(id)
}

// ─── CRUD admin ───────────────────────────────────────────────────────────────

export async function createEspecialidadAction(data: CreateEspecialidadDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const result = await svc().create(data)
  revalidatePath("/")
  return result
}

export async function updateEspecialidadAction(id: number, data: UpdateEspecialidadDTO) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const old = await svc().getById(id)
  const result = await svc().update(id, data)
  if (old?.image && data.image !== undefined && old.image !== data.image)
    await deleteFromS3(old.image)
  revalidatePath("/")
  return result
}

export async function deleteEspecialidadAction(id: number) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")
  const esp = await svc().getById(id)
  await svc().delete(id)
  if (esp?.image) await deleteFromS3(esp.image)
  revalidatePath("/")
}

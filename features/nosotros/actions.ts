"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth/session"
import { DbNosotrosRepository } from "./repository"
import { NosotrosService } from "./service"
import type { NosotrosData } from "./types"

const _svc = new NosotrosService(new DbNosotrosRepository(db))
function svc() { return _svc }

export async function getNosotrosDataAction(): Promise<NosotrosData> {
  return svc().get()
}

export async function saveNosotrosDataAction(data: NosotrosData): Promise<NosotrosData> {
  const s = await getSession(); if (!s) throw new Error("No autorizado")
  const result = await svc().save(data)
  revalidatePath("/nosotros")
  revalidatePath("/admin/nosotros")
  return result
}

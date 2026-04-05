"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export interface ReclamacionInput {
  nombres:     string
  apellidos:   string
  tipoDoc:     string
  nroDoc:      string
  domicilio:   string
  email:       string
  telefono:    string
  tipo:        "RECLAMACION" | "QUEJA"
  tipoBien:    "PRODUCTO" | "SERVICIO"
  descripcion: string
  pedido:      string
}

export async function createReclamacionAction(data: ReclamacionInput) {
  await db.reclamacion.create({
    data: { ...data, estado: "PENDIENTE" },
  })
}

const PAGE_SIZE = 10

export async function getReclamacionesAction(page = 1) {
  const skip = (page - 1) * PAGE_SIZE

  const [items, total] = await Promise.all([
    db.reclamacion.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
    }),
    db.reclamacion.count(),
  ])

  return {
    items,
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil(total / PAGE_SIZE),
  }
}

export async function resolverReclamacionAction(id: number) {
  await db.reclamacion.update({
    where: { id },
    data: { estado: "RESUELTO" },
  })
  revalidatePath("/reclamaciones")
}

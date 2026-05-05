/**
 * POST /api/upload — Subida de imágenes y archivos.
 *
 * Cuando las variables de entorno de AWS S3 están configuradas, sube a S3 y
 * devuelve la URL pública del bucket (o CDN si CDN_URL está definida).
 * Sin variables de S3, hace fallback a /public/uploads/ (desarrollo local).
 *
 * FormData esperado:
 *   file     — archivo binario
 *   seoName  — nombre SEO para el filename (opcional)
 *   folder   — carpeta S3 destino (whitelist: UPLOAD_FOLDERS de lib/storage/s3.ts)
 */

import { writeFile, mkdir } from "fs/promises"
import { log } from "@/lib/logger"
import { join } from "path"
import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { uploadToS3, isS3Configured, UPLOAD_FOLDERS } from "@/lib/storage/s3"

const UPLOAD_DIR      = join(process.cwd(), "public", "uploads")
const MAX_IMAGE_SIZE  = 2 * 1024 * 1024  // 2 MB — imágenes ya llegan comprimidas a WebP
const MAX_PDF_SIZE    = 10 * 1024 * 1024 // 10 MB — PDFs de ficha técnica
const ALLOWED         = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "application/pdf"]

export async function POST(request: NextRequest) {
  // Auth guard
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file     = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 })
    }

    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Tipo de archivo no permitido" }, { status: 400 })
    }

    const isPdf   = file.type === "application/pdf"
    const maxSize = isPdf ? MAX_PDF_SIZE : MAX_IMAGE_SIZE
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: isPdf ? "El PDF excede 10 MB" : "La imagen excede 2 MB — redimensionala antes de subir" },
        { status: 400 },
      )
    }

    // Nombre SEO único: timestamp + slug limpio derivado del alt text
    const ext      = file.name.split(".").pop()?.toLowerCase() ?? "bin"
    const rawName  = (formData.get("seoName") as string | null)?.trim() ||
                     file.name.replace(`.${file.name.split(".").pop() ?? ""}`, "")
    const safeName = rawName
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 80)
    const uniqueName = `${Date.now()}-${safeName}.${ext}`

    const buffer = Buffer.from(await file.arrayBuffer())

    // ── S3 (producción) ────────────────────────────────────────────────────
    if (isS3Configured()) {
      // Sube siempre a temp/ — se finaliza con el nombre SEO correcto al guardar el formulario
      const key = `temp/${uniqueName}`
      const url = await uploadToS3(buffer, key, file.type)
      return NextResponse.json({ url, tempKey: key })
    }

    // ── Fallback local (desarrollo sin S3 configurado) ────────────────────
    await mkdir(UPLOAD_DIR, { recursive: true })
    const filepath = join(UPLOAD_DIR, uniqueName)
    await writeFile(filepath, buffer)
    return NextResponse.json({ url: `/uploads/${uniqueName}` })

  } catch (error) {
    log.error("[POST /api/upload]", error)
    return NextResponse.json({ error: "Error al subir el archivo" }, { status: 500 })
  }
}

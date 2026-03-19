/**
 * POST /api/upload — Subida de imágenes y archivos.
 *
 * Guarda en /public/uploads/ (desarrollo).
 * En producción (Vercel) usar Cloudinary o S3:
 *   npm install cloudinary
 *   Reemplazar writeFile con cloudinary.uploader.upload()
 */

import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"

const UPLOAD_DIR = join(process.cwd(), "public", "uploads")
const MAX_SIZE   = 5 * 1024 * 1024 // 5 MB
const ALLOWED    = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "application/pdf"]

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

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "El archivo excede 5 MB" }, { status: 400 })
    }

    // Crear directorio si no existe
    await mkdir(UPLOAD_DIR, { recursive: true })

    // Nombre único: timestamp + nombre limpio
    const ext      = file.name.split(".").pop() ?? "bin"
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").replace(`.${ext}`, "")
    const filename = `${Date.now()}-${safeName}.${ext}`
    const filepath = join(UPLOAD_DIR, filename)

    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filepath, buffer)

    return NextResponse.json({ url: `/uploads/${filename}` })
  } catch (error) {
    console.error("[POST /api/upload]", error)
    return NextResponse.json({ error: "Error al subir el archivo" }, { status: 500 })
  }
}

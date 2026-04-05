/**
 * POST /api/upload/finalize
 *
 * Mueve un archivo de temp/ a su carpeta final con nombre SEO.
 * Se llama al momento de guardar el formulario, cuando el alt text ya está completo.
 *
 * Body JSON:
 *   tempKey  — key actual en temp/ (ej: "temp/1714234567-foto.jpg")
 *   seoName  — alt text del usuario, se convierte a slug para el filename
 *   folder   — carpeta destino (whitelist: UPLOAD_FOLDERS)
 */

import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { moveS3Object, isS3Configured, UPLOAD_FOLDERS } from "@/lib/storage/s3"

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80)
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  if (!isS3Configured()) {
    return NextResponse.json({ error: "Storage no configurado" }, { status: 500 })
  }

  try {
    const { tempKey, seoName, folder } = await request.json() as {
      tempKey: string
      seoName?: string
      folder?: string
    }

    if (!tempKey?.startsWith("temp/")) {
      return NextResponse.json({ error: "tempKey inválido" }, { status: 400 })
    }

    // Validar carpeta destino
    const destFolder = (UPLOAD_FOLDERS as readonly string[]).includes(folder ?? "")
      ? folder!
      : "productos/imagenes"

    // Extraer extensión del archivo temporal
    const ext      = tempKey.split(".").pop()?.toLowerCase() ?? "bin"
    const slug     = seoName ? toSlug(seoName) : "archivo"
    const finalKey = `${destFolder}/${Date.now()}-${slug}.${ext}`

    await moveS3Object(tempKey, finalKey)

    const baseUrl =
      process.env.CDN_URL?.replace(/\/$/, "") ||
      process.env.AWS_S3_PUBLIC_URL?.replace(/\/$/, "") ||
      `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`

    const url = `${baseUrl}/${finalKey}`
    return NextResponse.json({ url })

  } catch (error: unknown) {
    // Si el archivo ya no existe en temp/ (doble submit o ya fue finalizado),
    // devolvemos 409 para que el cliente lo ignore en lugar de fallar.
    const code = (error as { Code?: string; name?: string })?.Code ?? (error as { name?: string })?.name
    if (code === "NoSuchKey" || code === "NotFound") {
      return NextResponse.json({ error: "already_finalized" }, { status: 409 })
    }
    console.error("[POST /api/upload/finalize]", error)
    return NextResponse.json({ error: "Error al finalizar subida" }, { status: 500 })
  }
}

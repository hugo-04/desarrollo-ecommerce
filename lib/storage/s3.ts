/**
 * lib/storage/s3.ts — Cliente AWS S3 para subida de archivos.
 *
 * Exporta `uploadToS3` que sube un buffer al bucket configurado
 * y devuelve la URL pública del archivo.
 *
 * Variables de entorno requeridas (ver .env.example):
 *   AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,
 *   AWS_S3_BUCKET, AWS_S3_PUBLIC_URL
 *
 * Opcional: CDN_URL — si está definida, la URL pública usará
 *   ese dominio en lugar del endpoint directo de S3.
 *
 * MIGRACIÓN A DB: este archivo no cambia — solo la capa de repository.
 */

import { S3Client, PutObjectCommand, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

/**
 * Carpetas válidas dentro del bucket.
 * Actúan como whitelist en el endpoint /api/upload.
 */
export const UPLOAD_FOLDERS = [
  "marcas/logos",
  "productos/imagenes",
  "productos/galeria",
  "productos/fichas",
] as const

export type UploadFolder = (typeof UPLOAD_FOLDERS)[number]

/**
 * Crea el cliente S3 con las credenciales del entorno.
 * Se instancia lazy para evitar errores en entornos sin variables configuradas.
 */
function createS3Client() {
  return new S3Client({
    region: process.env.AWS_REGION ?? "auto",
    endpoint: process.env.AWS_ENDPOINT, // Requerido para Cloudflare R2
    credentials: {
      accessKeyId:     process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })
}

/**
 * Sube un buffer a S3 y retorna la URL pública del archivo.
 *
 * @param buffer      - Contenido del archivo
 * @param key         - Ruta completa dentro del bucket (ej: "productos/imagenes/123-nombre.jpg")
 * @param contentType - MIME type del archivo
 * @returns URL pública accesible desde internet
 */
export async function uploadToS3(
  buffer:      Buffer,
  key:         string,
  contentType: string,
): Promise<string> {
  const client = createS3Client()

  await client.send(
    new PutObjectCommand({
      Bucket:      process.env.AWS_S3_BUCKET!,
      Key:         key,
      Body:        buffer,
      ContentType: contentType,
      // R2 no soporta ACLs — el acceso público se habilita en el dashboard de Cloudflare.
    }),
  )

  // CDN_URL tiene prioridad sobre AWS_S3_PUBLIC_URL para cacheo de edge
  const baseUrl =
    process.env.CDN_URL?.replace(/\/$/, "") ||
    process.env.AWS_S3_PUBLIC_URL?.replace(/\/$/, "") ||
    `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`

  return `${baseUrl}/${key}`
}

/**
 * Mueve un objeto dentro del mismo bucket (copy + delete).
 * Usado para renombrar archivos temporales al nombre SEO final.
 */
export async function moveS3Object(sourceKey: string, destKey: string): Promise<void> {
  const client = createS3Client()
  await client.send(
    new CopyObjectCommand({
      Bucket:     process.env.AWS_S3_BUCKET!,
      CopySource: `${process.env.AWS_S3_BUCKET}/${sourceKey}`,
      Key:        destKey,
    }),
  )
  await client.send(
    new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key:    sourceKey,
    }),
  )
}

/** Devuelve true si las variables de entorno de S3 están configuradas */
export function isS3Configured(): boolean {
  return Boolean(
    process.env.AWS_S3_BUCKET &&
    process.env.AWS_REGION &&
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY,
  )
}

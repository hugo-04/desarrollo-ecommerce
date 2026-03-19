/**
 * SESSION UTILITIES — Gestión de sesión sin dependencias externas.
 *
 * Usa HMAC-SHA256 para firmar el token de sesión.
 * Al migrar a next-auth: reemplazar este archivo y features/auth/actions.ts.
 *
 * Variables de entorno:
 *   AUTH_SECRET      — clave de firma (obligatoria en producción)
 *   ADMIN_EMAIL      — email del administrador
 *   ADMIN_PASSWORD   — contraseña del administrador
 */

import crypto from "crypto"
import { cookies } from "next/headers"

const SECRET       = process.env.AUTH_SECRET      ?? "electro-thina-dev-secret-2024"
const ADMIN_EMAIL  = process.env.ADMIN_EMAIL      ?? "admin@electrothina.com"
const ADMIN_PASS   = process.env.ADMIN_PASSWORD   ?? "admin123"
const COOKIE_NAME  = "et_admin_session"
const COOKIE_MAX_AGE = 60 * 60 * 8 // 8 horas

function sign(value: string): string {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex")
}

export function validateCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASS
}

export async function createSession(email: string): Promise<void> {
  const token = sign(email)
  const jar   = await cookies()
  jar.set(COOKIE_NAME, `${email}:${token}`, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   COOKIE_MAX_AGE,
    path:     "/",
  })
}

export async function getSession(): Promise<{ email: string } | null> {
  const jar    = await cookies()
  const cookie = jar.get(COOKIE_NAME)?.value
  if (!cookie) return null

  const [email, token] = cookie.split(":")
  if (!email || !token) return null
  if (token !== sign(email)) return null

  return { email }
}

export async function clearSession(): Promise<void> {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
}

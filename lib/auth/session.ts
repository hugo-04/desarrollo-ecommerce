/**
 * SESSION UTILITIES — JWT + bcrypt
 *
 * Usa JWT (jose) para firmar tokens y bcryptjs para validar contraseñas.
 *
 * Variables de entorno:
 *   AUTH_SECRET           — clave de firma JWT (obligatoria en producción)
 *   ADMIN_EMAIL           — email del administrador
 *   ADMIN_PASSWORD_HASH   — hash bcrypt de la contraseña (recomendado)
 *   ADMIN_PASSWORD        — contraseña en texto plano (solo desarrollo)
 *
 * Para generar un hash bcrypt:
 *   node -e "const b=require('bcryptjs'); b.hash('tu_contraseña', 12).then(console.log)"
 */

import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

const SECRET       = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "electro-thina-dev-secret-2024"
)
const ADMIN_EMAIL  = process.env.ADMIN_EMAIL ?? "admin@electrothina.com"
const COOKIE_NAME  = "et_admin_session"
const COOKIE_MAX_AGE = 60 * 60 * 8 // 8 horas

export async function validateCredentials(email: string, password: string): Promise<boolean> {
  if (email !== ADMIN_EMAIL) return false

  const hash = process.env.ADMIN_PASSWORD_HASH
  if (hash) {
    return bcrypt.compare(password, hash)
  }

  // Fallback texto plano (solo desarrollo)
  const plain = process.env.ADMIN_PASSWORD ?? "admin123"
  return password === plain
}

export async function createSession(email: string): Promise<void> {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(SECRET)

  const jar = await cookies()
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   COOKIE_MAX_AGE,
    path:     "/",
  })
}

export async function getSession(): Promise<{ email: string } | null> {
  const jar   = await cookies()
  const token = jar.get(COOKIE_NAME)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, SECRET)
    const email = payload.email as string
    if (!email) return null
    return { email }
  } catch {
    return null
  }
}

export async function clearSession(): Promise<void> {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
}

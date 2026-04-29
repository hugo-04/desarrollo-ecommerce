import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { db } from "@/lib/db"

// NOTA: Se evita arrojar error a nivel de archivo para que `next build` no falle.
// El error se dispara en `createSession` en tiempo de ejecución.
const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "et-local-dev-only-not-for-production"
)
const COOKIE_NAME    = "et_admin_session"
const COOKIE_MAX_AGE = 60 * 60 * 8 // 8 horas

// Verifica credenciales contra la DB — única vez que se consulta isActive
export async function validateCredentials(email: string, password: string): Promise<boolean> {
  const user = await db.adminUser.findUnique({ where: { email } })
  if (!user || !user.isActive) return false
  return bcrypt.compare(password, user.passwordHash)
}

// Crea el JWT y lo guarda en cookie httpOnly (inaccesible desde JS)
export async function createSession(email: string): Promise<void> {
  if (process.env.NODE_ENV === "production" && !process.env.AUTH_SECRET) {
    throw new Error("CRÍTICO: AUTH_SECRET no definido en producción. No se pueden crear sesiones seguras.")
  }

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

// Lee y verifica el JWT — NO consulta la DB para evitar bucles de redirección.
// El JWT es la fuente de verdad (firmado, con expiración de 8h).
export async function getSession(): Promise<{ email: string } | null> {
  const jar   = await cookies()
  const token = jar.get(COOKIE_NAME)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, SECRET)
    const email = payload.email as string
    if (!email || typeof email !== "string") return null
    return { email }
  } catch {
    // Token expirado o corrupto
    return null
  }
}

export async function clearSession(): Promise<void> {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
}

import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "lorem-ipsum-dev-secret"
)
const COOKIE_NAME = "et_admin_session"

// Rutas del panel admin que requieren sesión válida
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/productos",
  "/categorias",
  "/marcas",
  "/reclamaciones",
]

// Rutas de autenticación (si ya hay sesión, redirigir al dashboard)
const AUTH_ROUTES = ["/login"]

async function getSessionFromRequest(req: NextRequest): Promise<{ email: string } | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, SECRET)
    const email = payload.email as string
    if (!email || typeof email !== "string") return null
    return { email }
  } catch {
    return null
  }
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  // Evitar clickjacking
  response.headers.set("X-Frame-Options", "DENY")
  // Evitar MIME sniffing
  response.headers.set("X-Content-Type-Options", "nosniff")
  // Referrer controlado
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  // Deshabilitar funciones sensibles del navegador
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
  // XSS legacy
  response.headers.set("X-XSS-Protection", "1; mode=block")
  // HSTS solo en producción
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    )
  }
  return response
}

export async function authMiddleware(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))
  const isAuthRoute  = AUTH_ROUTES.some((p) => pathname.startsWith(p))

  const session = await getSessionFromRequest(req)

  // Ruta protegida sin sesión → /login (sin exponer el destino en la URL para evitar open redirect)
  if (isProtected && !session) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    url.search   = ""
    const res = NextResponse.redirect(url)
    // Limpiar cookie corrupta si existe
    res.cookies.delete(COOKIE_NAME)
    return addSecurityHeaders(res)
  }

  // Ya logueado intentando entrar al login → /dashboard
  if (isAuthRoute && session) {
    const url = req.nextUrl.clone()
    url.pathname = "/dashboard"
    url.search   = ""
    return addSecurityHeaders(NextResponse.redirect(url))
  }

  return addSecurityHeaders(NextResponse.next())
}

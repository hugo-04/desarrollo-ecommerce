import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

// Misma clave que lib/auth/session.ts — ambos DEBEN usar AUTH_SECRET
const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "electro-thina-dev-secret-2024"
)
const COOKIE_NAME = "et_admin_session"

const PROTECTED_PREFIXES = ["/dashboard", "/categorias", "/marcas", "/productos"]
const AUTH_ROUTES = ["/login"]

async function getSessionFromRequest(req: NextRequest): Promise<{ email: string } | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value
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

export async function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  if (!isProtected && !isAuthRoute) return NextResponse.next()

  const session = await getSessionFromRequest(req)

  if (isProtected && !session) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = "/login"
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && session) {
    const dashboardUrl = req.nextUrl.clone()
    dashboardUrl.pathname = "/dashboard"
    dashboardUrl.search = ""
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

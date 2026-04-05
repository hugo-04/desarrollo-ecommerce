import { type NextRequest } from "next/server"
import { authMiddleware } from "@/lib/middleware/auth"

export function proxy(req: NextRequest) {
  return authMiddleware(req)
}

export const config = {
  matcher: [
    /*
     * Aplica a todas las rutas excepto:
     * - _next/static  → archivos estáticos de Next.js
     * - _next/image   → optimización de imágenes
     * - favicon.ico y archivos con extensión (imágenes, fuentes, PDFs)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf|woff2?|ttf|otf)).*)",
  ],
}

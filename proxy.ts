/**
 * PROXY DE AUTENTICACIÓN — Electro Thina
 *
 * Este archivo DEBE estar en la raíz del proyecto (junto a package.json).
 * Next.js lo ejecuta automáticamente en el Edge Runtime para cada petición
 * que coincida con `config.matcher`.
 *
 * Lógica delegada a lib/middleware/auth.ts para separar responsabilidades.
 *
 * Rutas protegidas: /dashboard, /categorias, /marcas, /productos
 * Rutas de auth:    /login  (redirige al dashboard si ya hay sesión)
 */

export { authMiddleware as proxy } from "./lib/middleware/auth"

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/categorias/:path*",
    "/marcas/:path*",
    "/productos/:path*",
    "/login",
  ],
}

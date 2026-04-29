/**
 * LOGGER — Logging estructurado y seguro.
 *
 * Reglas:
 *  - En desarrollo: imprime en consola con nivel y contexto.
 *  - En producción: silencia todo EXCEPTO errores críticos.
 *    Los errores críticos se loguean sin exponer stack traces ni datos sensibles.
 *
 * USO:
 *   import { log } from "@/lib/logger"
 *   log.error("[AuthService]", error)   // solo visible en servidor, nunca en cliente
 *   log.warn("[Catalog]", "no results") // solo en dev
 *   log.info("[Seed]", "done")          // solo en dev
 */

const isDev  = process.env.NODE_ENV !== "production"
const isEdge = process.env.RUNTIME === "edge"

function sanitize(args: unknown[]): unknown[] {
  // En producción, no exponer objetos de error completos (pueden contener paths, queries, etc.)
  if (isDev) return args
  return args.map((a) => {
    if (a instanceof Error) return `[Error: ${a.message}]`
    if (typeof a === "object" && a !== null) return "[object]"
    return a
  })
}

export const log = {
  /** Solo visible en desarrollo */
  info: (...args: unknown[]) => {
    if (isDev) console.log("[INFO]", ...args)
  },

  /** Solo visible en desarrollo */
  warn: (...args: unknown[]) => {
    if (isDev) console.warn("[WARN]", ...args)
  },

  /** Siempre visible en servidor — pero sanitizado en producción */
  error: (...args: unknown[]) => {
    if (isEdge) return // Edge runtime: sin console en producción
    console.error("[ERROR]", ...sanitize(args))
  },

  /** Solo en desarrollo — para depuración temporal */
  debug: (...args: unknown[]) => {
    if (isDev) console.debug("[DEBUG]", ...args)
  },
}

/**
 * DATABASE CLIENT — Electro Thina
 *
 * Punto único de conexión a PostgreSQL vía Prisma.
 * Actualmente comentado — se activa en 3 pasos.
 *
 * ── PLAN DE MIGRACIÓN ──────────────────────────────────────
 *
 *  Paso 1: Instalar dependencias
 *    npm install prisma @prisma/client
 *
 *  Paso 2: Variables de entorno (.env)
 *    DATABASE_URL="postgresql://user:password@host:5432/electrothina"
 *    AUTH_SECRET="cambia-esto-por-una-cadena-aleatoria-larga"
 *    ADMIN_EMAIL="admin@electrothina.com"
 *    ADMIN_PASSWORD="tu-contraseña-segura"
 *
 *  Paso 3: Migrar base de datos
 *    npx prisma migrate dev --name init
 *
 *  Paso 4: Activar cliente (descomentar abajo)
 *
 *  Paso 5: Crear DbXxxRepository implements IXxxRepository
 *    usando db.product / db.category / db.brand
 *    y reemplazar Mock en features/xxx/actions.ts
 *
 * ──────────────────────────────────────────────────────────
 */

// import { PrismaClient } from "@prisma/client"
//
// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
//
// export const db = globalForPrisma.prisma ?? new PrismaClient({
//   log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
// })
//
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db

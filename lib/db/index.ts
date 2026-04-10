import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createClient() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL no está configurada")
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  const log = process.env.NODE_ENV === "development"
    ? ["query", "warn", "error"] as const
    : ["error"] as const
  // @ts-expect-error — Prisma 7: adapter no está en Subset<PrismaClientOptions> pero sí en runtime
  return new PrismaClient({ adapter, log })
}

function getClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma
  const client = createClient()
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client
  return client
}

// Proxy lazy: createClient() solo se ejecuta cuando se accede a una propiedad
// (ej: db.product.findMany), no al importar el módulo. Esto evita que el build
// de Next.js falle por ausencia de DATABASE_URL en tiempo de compilación.
export const db = new Proxy({} as PrismaClient, {
  get(_, prop: string) {
    return (getClient() as any)[prop]
  },
})

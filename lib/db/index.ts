import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
  const log = process.env.NODE_ENV === "development"
    ? ["query", "warn", "error"] as const
    : ["error"] as const
  // @ts-expect-error — Prisma 7: adapter no está en Subset<PrismaClientOptions> pero sí en runtime
  return new PrismaClient({ adapter, log })
}

export const db = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db

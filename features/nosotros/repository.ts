import type { PrismaClient } from "@prisma/client"
import type { NosotrosData } from "./types"
import { DEFAULT_NOSOTROS } from "./types"

export class DbNosotrosRepository {
  constructor(private readonly db: PrismaClient) {}

  async get(): Promise<NosotrosData> {
    const row = await this.db.nosotrosConfig.findUnique({ where: { id: 1 } })
    if (!row) return DEFAULT_NOSOTROS
    return row.data as unknown as NosotrosData
  }

  async save(data: NosotrosData): Promise<NosotrosData> {
    await this.db.nosotrosConfig.upsert({
      where:  { id: 1 },
      update: { data: data as any },
      create: { id: 1, data: data as any },
    })
    return data
  }
}

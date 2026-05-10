import type { DbNosotrosRepository } from "./repository"
import type { NosotrosData } from "./types"

export class NosotrosService {
  constructor(private readonly repo: DbNosotrosRepository) {}

  get()                        { return this.repo.get() }
  save(data: NosotrosData)     { return this.repo.save(data) }
}

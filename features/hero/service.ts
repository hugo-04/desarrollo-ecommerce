import type { DbHeroRepository } from "./repository"
import type { HeroSlide, CreateHeroSlideDTO, UpdateHeroSlideDTO } from "./types"

export class HeroService {
  constructor(private readonly repo: DbHeroRepository) {}

  getAll():    Promise<HeroSlide[]>       { return this.repo.findAll()  }
  getActive(): Promise<HeroSlide[]>       { return this.repo.findActive() }
  getById(id: number): Promise<HeroSlide | null> { return this.repo.findById(id) }

  create(data: CreateHeroSlideDTO): Promise<HeroSlide>            { return this.repo.create(data)  }
  update(id: number, data: UpdateHeroSlideDTO): Promise<HeroSlide> { return this.repo.update(id, data) }
  reorder(id: number, dir: "up" | "down"): Promise<void>          { return this.repo.reorder(id, dir) }
  delete(id: number): Promise<void>                               { return this.repo.delete(id)  }
}

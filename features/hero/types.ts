export interface HeroSlide {
  id:        number
  label:     string
  image:     string
  imageAlt?: string
  gradient:  string
  order:     number
  active:    boolean
  createdAt: string
  updatedAt: string
}

export interface CreateHeroSlideDTO {
  label:     string
  image?:    string
  imageAlt?: string
  gradient?: string
  order?:    number
  active?:   boolean
}

export type UpdateHeroSlideDTO = Partial<CreateHeroSlideDTO>

/** Versión ligera que usa HeroSection para renderizar */
export interface HeroSlideDisplay {
  label:    string
  image:    string
  gradient: string
}

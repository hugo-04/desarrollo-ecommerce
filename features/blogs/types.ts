export interface BlogPost {
  id:          number
  title:       string
  slug:        string
  excerpt:     string
  content:     string
  coverImage:  string
  coverAlt?:   string
  image2?:     string
  image2Alt?:  string
  image3?:     string
  image3Alt?:  string
  tag?:         string
  tagCategory?: string
  metaTitle?:  string
  metaDesc?:   string
  keywords:    string[]
  published:   boolean
  createdAt:   string
  updatedAt:   string
}

export interface CreateBlogPostDTO {
  title:        string
  slug:         string
  excerpt?:     string
  content?:     string
  coverImage?:  string
  coverAlt?:    string
  image2?:      string
  image2Alt?:   string
  image3?:      string
  image3Alt?:   string
  tag?:         string
  tagCategory?: string
  metaTitle?:   string
  metaDesc?:    string
  keywords?:    string[]
  published?:   boolean
}

export type UpdateBlogPostDTO = Partial<CreateBlogPostDTO>

export interface BlogPostFilters {
  page?:         number
  query?:        string
  limit?:        number
  publishedOnly?: boolean
}

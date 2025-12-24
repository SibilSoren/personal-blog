export interface BlogFrontmatter {
  title: string
  description: string
  image?: string
  publishedAt: string
  updatedAt: string
  author: string
  isPublished: boolean
  tags: string[]
}

export interface BlogPost extends BlogFrontmatter {
  slug: string
  content: string
}

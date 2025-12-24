import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { BlogPost, BlogFrontmatter } from "@/types/blog"

const BLOG_CONTENT_PATH = path.join(process.cwd(), "src/content/blog")

export function getBlogSlugs() {
  if (!fs.existsSync(BLOG_CONTENT_PATH)) {
    return []
  }
  return fs.readdirSync(BLOG_CONTENT_PATH).filter((file) => file.endsWith(".mdx"))
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const realSlug = slug.replace(/\.mdx$/, "")
  const filePath = path.join(BLOG_CONTENT_PATH, `${realSlug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)

  return {
    ...data,
    slug: realSlug,
    content,
  } as BlogPost
}

export function getAllBlogPosts(): BlogPost[] {
  const slugs = getBlogSlugs()
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .filter((post) => post.isPublished)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return posts
}

export function getAllTags(): string[] {
  const posts = getAllBlogPosts()
  const tags = new Set<string>()
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

import fs from "fs"
import path from "path"
import { cache } from "react"
import matter from "gray-matter"
import readingTime from "reading-time"
import GithubSlugger from "github-slugger"
import { BlogPost, BlogSearchItem, blogFrontmatterSchema } from "@/types/blog"

const BLOG_CONTENT_PATH = path.join(process.cwd(), "src/content/blog")

/** Slugs come from the URL, so constrain them before they reach path.join. */
const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function getBlogSlugs() {
  if (!fs.existsSync(BLOG_CONTENT_PATH)) {
    return []
  }
  return fs.readdirSync(BLOG_CONTENT_PATH).filter((file) => file.endsWith(".mdx"))
}

export function getBlogPostBySlug(slug: string | undefined): BlogPost | null {
  if (!slug) {
    return null
  }

  const realSlug = slug.replace(/\.mdx$/, "")

  if (!SAFE_SLUG.test(realSlug)) {
    return null
  }

  const filePath = path.join(BLOG_CONTENT_PATH, `${realSlug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  let raw: string
  try {
    raw = fs.readFileSync(filePath, "utf8")
  } catch (error) {
    throw new Error(`Could not read blog post "${realSlug}.mdx": ${(error as Error).message}`)
  }

  let parsed: matter.GrayMatterFile<string>
  try {
    parsed = matter(raw)
  } catch (error) {
    throw new Error(
      `Malformed frontmatter in "${realSlug}.mdx": ${(error as Error).message}`
    )
  }

  const result = blogFrontmatterSchema.safeParse(parsed.data)

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n")
    throw new Error(`Invalid frontmatter in "${realSlug}.mdx":\n${issues}`)
  }

  return {
    ...result.data,
    slug: realSlug,
    content: parsed.content,
    readingTime: Math.max(1, Math.round(readingTime(parsed.content).minutes)),
  }
}

/**
 * cache() dedupes this within a single render pass. It was previously called
 * once in the root layout and again in each page, re-reading and re-parsing
 * every post each time.
 */
export const getAllBlogPosts = cache((): BlogPost[] => {
  return getBlogSlugs()
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .filter((post) => post.isPublished)
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
})

/** The trimmed shape the client-side search needs - no post bodies. */
export const getBlogSearchIndex = cache((): BlogSearchItem[] => {
  return getAllBlogPosts().map(({ slug, title, description }) => ({
    slug,
    title,
    description,
  }))
})

export const getAllTags = cache((): string[] => {
  const tags = new Set<string>()
  getAllBlogPosts().forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort((a, b) => a.localeCompare(b))
})

export function tagToSlug(tag: string): string {
  return new GithubSlugger().slug(tag)
}

export const getPostsByTag = cache((tagSlug: string): BlogPost[] => {
  return getAllBlogPosts().filter((post) =>
    post.tags.some((tag) => tagToSlug(tag) === tagSlug)
  )
})

export interface Heading {
  id: string
  text: string
  level: number
}

/**
 * Headings are extracted server-side with the same github-slugger that
 * rehype-slug uses on the rendered output, so the table of contents and the
 * real anchor ids cannot drift apart. The previous client-side regex
 * hand-rolled its own slug algorithm and produced a dead link on every heading
 * containing an emoji or a duplicate title.
 */
export function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger()
  const withoutCodeFences = content.replace(/```[\s\S]*?```/g, "")

  return Array.from(withoutCodeFences.matchAll(/^(#{2,3})\s+(.+?)\s*$/gm)).map(
    (match) => {
      const text = match[2].replace(/[*_`]/g, "").trim()
      return {
        id: slugger.slug(text),
        text,
        level: match[1].length,
      }
    }
  )
}

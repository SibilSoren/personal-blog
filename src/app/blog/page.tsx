import type { Metadata } from "next"
import Link from "next/link"
import { Rss } from "lucide-react"

import { getAllBlogPosts, getAllTags, getPostsByTag, tagToSlug } from "@/lib/blog"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { PostRegister } from "@/components/blog/post-register"
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld"
import { absoluteUrl } from "@/config/site"
import type { BlogPost } from "@/types/blog"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on distributed systems, Node.js and TypeScript — CAP theorem, availability patterns, rate limiting with Redis Lua, and API design.",
  alternates: {
    canonical: absoluteUrl("/blog"),
    types: { "application/rss+xml": absoluteUrl("/feed.xml") },
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/blog"),
    title: "Blog | Sibil Sarjam Soren",
    description: "Writing on distributed systems, Node.js and TypeScript.",
  },
}

/** Posts are already newest first; this keeps that order inside each year. */
function groupByYear(posts: BlogPost[]): [string, BlogPost[]][] {
  const groups = new Map<string, BlogPost[]>()
  for (const post of posts) {
    const year = post.publishedAt.slice(0, 4)
    groups.set(year, [...(groups.get(year) ?? []), post])
  }
  return [...groups.entries()]
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
  const tags = getAllTags()

  return (
    <div className="pb-24">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <section aria-labelledby="blog-title" className="border-b border-ink-line bg-grid">
        <Container className="py-14 md:py-20">
          <p className="font-mono text-xs text-muted-foreground md:text-sm">
            Writing · {posts.length} posts
          </p>
          <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1
                id="blog-title"
                className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-[0.01em] text-primary-text md:text-6xl"
              >
                Blog
              </h1>
              <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-body">
                Things I have had to work out properly — distributed systems, Node.js and the
                design decisions that only show up when something goes wrong.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0 self-start rounded-sm border-ink-line md:self-auto">
              <Link href="/feed.xml">
                <Rss className="h-4 w-4" aria-hidden="true" />
                RSS
              </Link>
            </Button>
          </div>

          {tags.length > 0 && (
            <nav aria-label="Browse by tag" className="mt-10">
              <h2 className="sr-only">Browse by tag</h2>
              <ul className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/blog/tags/${tagToSlug(tag)}`}
                      className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-2.5 py-1 font-mono text-xs text-foreground transition-colors hover:border-ink-line hover:text-primary-text"
                    >
                      {tag}
                      <span className="text-muted-foreground">{getPostsByTag(tagToSlug(tag)).length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </Container>
      </section>

      <Container className="mt-14 grid gap-14">
        {groupByYear(posts).map(([year, yearPosts]) => (
          <section key={year} aria-labelledby={`year-${year}`} className="grid gap-2">
            <h2
              id={`year-${year}`}
              className="border-b-2 border-ink-line pb-2 font-display text-2xl font-semibold uppercase tracking-[0.06em] text-primary-text md:text-3xl"
            >
              {year}
            </h2>
            <PostRegister posts={yearPosts} detailed />
          </section>
        ))}
      </Container>
    </div>
  )
}

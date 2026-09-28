import type { Metadata } from "next"
import Link from "next/link"
import { Rss } from "lucide-react"

import { getAllBlogPosts, getAllTags, tagToSlug } from "@/lib/blog"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/blog/post-card"
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld"
import { absoluteUrl } from "@/config/site"

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

export default function BlogPage() {
  const posts = getAllBlogPosts()
  const tags = getAllTags()

  return (
    <div className="py-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-muted-foreground text-lg">
              Things I have had to work out properly — distributed systems, Node.js and
              the design decisions that only show up when something goes wrong.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full shrink-0">
            <Link href="/feed.xml">
              <Rss className="mr-2 h-4 w-4" aria-hidden="true" />
              RSS
            </Link>
          </Button>
        </div>

        {tags.length > 0 && (
          <nav aria-label="Browse by tag" className="mb-12">
            <h2 className="sr-only">Browse by tag</h2>
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <Link href={`/blog/tags/${tagToSlug(tag)}`}>
                    <Badge
                      variant="outline"
                      className="text-xs hover:border-primary/50 hover:text-primary-text transition-colors"
                    >
                      {tag}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </div>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { getAllTags, getPostsByTag, tagToSlug } from "@/lib/blog"
import { Container } from "@/components/layout/container"
import { PostCard } from "@/components/blog/post-card"
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld"
import { absoluteUrl } from "@/config/site"

interface TagPageProps {
  params: Promise<{ tag: string }>
}

/** Resolves a slug back to the tag as it is actually written in frontmatter. */
function findTagLabel(slug: string): string | undefined {
  return getAllTags().find((tag) => tagToSlug(tag) === slug)
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tagToSlug(tag) }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const label = findTagLabel(tag)

  if (!label) return {}

  const count = getPostsByTag(tag).length
  const title = `${label} — ${count} ${count === 1 ? "post" : "posts"}`

  return {
    title: label,
    description: `Posts tagged ${label} by Sibil Sarjam Soren.`,
    alternates: { canonical: absoluteUrl(`/blog/tags/${tag}`) },
    openGraph: {
      type: "website",
      url: absoluteUrl(`/blog/tags/${tag}`),
      title,
      description: `Posts tagged ${label}.`,
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const label = findTagLabel(tag)

  if (!label) {
    notFound()
  }

  const posts = getPostsByTag(tag)

  return (
    <div className="py-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: label, path: `/blog/tags/${tag}` },
        ])}
      />
      <Container>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary-text transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All posts
        </Link>

        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Tagged <span className="text-primary-text">{label}</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {posts.length} {posts.length === 1 ? "post" : "posts"}.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </div>
  )
}

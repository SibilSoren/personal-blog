import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { getAllTags, getPostsByTag, tagToSlug } from "@/lib/blog"
import { Container } from "@/components/layout/container"
import { PostRegister } from "@/components/blog/post-register"
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
    <div className="pb-24">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: label, path: `/blog/tags/${tag}` },
        ])}
      />

      <section aria-labelledby="tag-title" className="border-b border-ink-line bg-grid">
        <Container className="py-12 md:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary-text"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All posts
          </Link>
          <p className="mt-6 font-mono text-xs text-muted-foreground md:text-sm">
            Tag · {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
          <h1
            id="tag-title"
            className="mt-3 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.01em] text-primary-text md:text-6xl"
          >
            {label}
          </h1>
        </Container>
      </section>

      <Container className="mt-12">
        <PostRegister posts={posts} detailed headingLevel="h2" />
      </Container>
    </div>
  )
}

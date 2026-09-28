import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import { CalendarDays, Clock, RefreshCw } from "lucide-react"

import { getBlogPostBySlug, getBlogSlugs, extractHeadings, tagToSlug } from "@/lib/blog"
import { MDXComponents } from "@/components/mdx/mdx-components"
import { TableOfContents } from "@/components/blog/toc"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld"
import { siteConfig, absoluteUrl } from "@/config/site"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

const prettyCodeOptions = {
  // One dark theme in both colour modes: the code container is dark in both,
  // which keeps the highlighting legible without a second theme's worth of CSS.
  theme: "github-dark-dimmed",
  keepBackground: false,
} as const

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

// Per-post metadata. Without this every blog post shared the site-wide title,
// so all posts looked identical on LinkedIn/Twitter/WhatsApp.
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {}
  }

  const url = absoluteUrl(`/blog/${post.slug}`)

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    authors: [{ name: post.author, url: siteConfig.url }],
    keywords: post.tags,
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug: slug.replace(/\.mdx$/, "") }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Computed server-side with the same slugger rehype-slug uses, so the table
  // of contents ids always match the rendered anchors.
  const headings = extractHeadings(post.content)
  const url = absoluteUrl(`/blog/${post.slug}`)
  const showUpdated = post.updatedAt && post.updatedAt !== post.publishedAt

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: post.author, url: siteConfig.url },
    publisher: { "@id": absoluteUrl("/#person") },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", "),
    image: post.image ? absoluteUrl(post.image) : absoluteUrl("/opengraph-image"),
    wordCount: post.content.split(/\s+/).length,
    inLanguage: "en",
  }

  return (
    <article className="py-10">
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <div className="relative py-20 mb-10 overflow-hidden border-b bg-muted/30">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <Container className="relative">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/blog/tags/${tagToSlug(tag)}`}>
                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 border-none px-3 py-1 text-xs uppercase tracking-wider font-bold">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight max-w-4xl animate-slide-up">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed animate-slide-up [animation-delay:200ms]">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10 text-sm font-medium animate-fade-in [animation-delay:400ms]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="text-primary-text text-xs font-bold" aria-hidden="true">
                  SS
                </span>
              </div>
              <span className="font-semibold">{post.author}</span>
            </div>

            <span className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>

            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readingTime} min read
            </span>

            {showUpdated && (
              <span className="flex items-center gap-2 text-muted-foreground">
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt!)}</time>
              </span>
            )}
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex flex-col lg:flex-row gap-12 relative">
          <div className="flex-1 prose prose-neutral dark:prose-invert max-w-none order-2 lg:order-1">
            <MDXRemote
              source={post.content}
              components={MDXComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypePrettyCode, prettyCodeOptions],
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ],
                },
              }}
            />
          </div>

          <aside className="w-full lg:w-[300px] order-1 lg:order-2">
            <div className="sticky top-24 space-y-8">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </Container>
    </article>
  )
}

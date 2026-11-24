import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import { ArrowLeft, ArrowRight } from "lucide-react"

import {
  getBlogPostBySlug,
  getBlogSlugs,
  extractHeadings,
  tagToSlug,
  getDocNumbers,
  formatDocNumber,
} from "@/lib/blog"
import { remarkNoteCallouts } from "@/lib/mdx/remark-note-callouts"
import { MDXComponents } from "@/components/mdx/mdx-components"
import { TableOfContents } from "@/components/blog/toc"
import { Container } from "@/components/layout/container"
import { formatPostDate } from "@/components/blog/post-register"
import { cn } from "@/lib/utils"
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld"
import { siteConfig, absoluteUrl } from "@/config/site"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

const prettyCodeOptions = {
  // Both themes are written into the HTML as --shiki-light / --shiki-dark, and
  // globals.css picks one by colour mode: GitHub Light on vellum, Night Owl on
  // the blueprint. The block's background comes from --code-bg, not Shiki.
  theme: { light: "github-light", dark: "night-owl" },
  keepBackground: false,
} as const

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
  const doc = formatDocNumber(getDocNumbers().get(post.slug))

  // The post's title block: the same cells a drawing's title block has, in the
  // order a reader wants them.
  const docCells: { label: string; value: React.ReactNode }[] = [
    { label: "Doc", value: doc.replace("Doc ", "") },
    {
      label: "Date",
      value: <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>,
    },
    ...(showUpdated
      ? [
          {
            label: "Revised",
            value: <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt!)}</time>,
          },
        ]
      : []),
    { label: "Read", value: `${post.readingTime} min` },
    { label: "By", value: post.author },
    {
      label: "Tags",
      value: (
        <span className="flex flex-wrap gap-x-2">
          {post.tags.map((tag, i) => (
            <span key={tag}>
              <Link
                href={`/blog/tags/${tagToSlug(tag)}`}
                className="underline decoration-border underline-offset-4 hover:text-primary-text hover:decoration-primary-text"
              >
                {tag}
              </Link>
              {i < post.tags.length - 1 && <span aria-hidden="true"> ·</span>}
            </span>
          ))}
        </span>
      ),
    },
  ]

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
    <article className="pb-24">
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <header className="border-b border-ink-line bg-grid">
        <Container className="py-10 md:py-14">
          <Link
            href="/blog"
            className="flex w-fit items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary-text"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All posts
          </Link>

          <dl className="mt-6 flex flex-wrap border-l border-t border-ink-line font-mono text-xs text-foreground sm:inline-flex">
            {docCells.map((cell) => (
              <div key={cell.label} className="min-w-0 border-b border-r border-ink-line bg-card/60 px-3 py-1.5">
                <dt className="font-display text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {cell.label}
                </dt>
                <dd className="mt-0.5">{cell.value}</dd>
              </div>
            ))}
          </dl>

          <h1 className="mt-6 max-w-[24ch] font-display text-4xl font-bold uppercase leading-[1] tracking-[0.01em] text-primary-text text-balance md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-body md:text-xl">
            {post.description}
          </p>
        </Container>
      </header>

      <Container className="mt-10 md:mt-12">
        {/* The panel is sized to a comfortable line length (about 70 characters),
            so the text fills it instead of leaving a blank strip on the right. */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,49rem)_16rem] lg:gap-10">
          {/* Long reading happens on a plain panel; the grid paper stays on the frame. */}
          <div className="min-w-0 border border-ink-line bg-card px-5 py-8 sm:px-10 sm:py-12 max-lg:order-2">
            <div
              className={cn(
                "prose prose-neutral dark:prose-invert max-w-none md:prose-lg",
                post.numberedSections && "prose-numbered"
              )}
            >
              <MDXRemote
                source={post.content}
                components={MDXComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkNoteCallouts],
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypePrettyCode, prettyCodeOptions],
                      [
                        rehypeAutolinkHeadings,
                        // The class lets globals.css style these as headings rather
                        // than as prose links, which are underlined.
                        { behavior: "wrap", properties: { className: ["heading-anchor"] } },
                      ],
                    ],
                  },
                }}
              />
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink-line pt-4 font-mono text-xs text-muted-foreground">
              <span>End of {doc.toLowerCase()}</span>
              <Link href="/blog" className="inline-flex items-center gap-1 text-primary-text hover:underline hover:underline-offset-4">
                All posts <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="max-lg:order-1">
            <div className="lg:sticky lg:top-24">
              <TableOfContents headings={headings} numbered={post.numberedSections} />
            </div>
          </aside>
        </div>
      </Container>
    </article>
  )
}

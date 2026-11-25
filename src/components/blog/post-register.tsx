import Link from "next/link"

import { formatDocNumber, getDocNumbers, tagToSlug } from "@/lib/blog"
import type { BlogPost } from "@/types/blog"

export function formatPostDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}

interface PostRegisterProps {
  posts: BlogPost[]
  /** Description and tags under each title. Off for the short list on the home page. */
  detailed?: boolean
  /** Heading level for post titles, so each page keeps a sound outline. */
  headingLevel?: "h2" | "h3"
}

/**
 * Posts as a drawing register: doc number, date, title, reading time. Doc
 * numbers come from publishing order across all posts, so a post shows the
 * same number on the home page, the blog index and a tag page.
 */
export function PostRegister({ posts, detailed = false, headingLevel = "h3" }: PostRegisterProps) {
  const docNumbers = getDocNumbers()
  const Heading = headingLevel

  return (
    <ol className="border-b border-ink-line">
      {posts.map((post) => (
        <li
          key={post.slug}
          className="relative grid grid-cols-[4rem_minmax(0,1fr)] gap-x-4 gap-y-1 border-t border-border py-4 first:border-t-0 sm:grid-cols-[4rem_7.5rem_minmax(0,1fr)_3.5rem]"
        >
          <span className="pt-0.5 font-mono text-xs text-primary-text">
            {formatDocNumber(docNumbers.get(post.slug))}
          </span>
          <time
            dateTime={post.publishedAt}
            className="pt-0.5 font-mono text-xs tabular-nums text-muted-foreground max-sm:col-start-2 max-sm:row-start-1"
          >
            {formatPostDate(post.publishedAt)}
          </time>
          <div className="min-w-0 max-sm:col-start-2">
            <Heading className="font-sans text-base font-medium leading-snug text-foreground">
              {/* The title link covers the row, so the whole entry is clickable;
                  tag links sit above it on their own layer. */}
              <Link
                href={`/blog/${post.slug}`}
                className="after:absolute after:inset-0 hover:text-primary-text hover:underline hover:underline-offset-4"
              >
                {post.title}
              </Link>
            </Heading>
            {detailed && (
              <>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                {post.tags.length > 0 && (
                  <ul className="relative z-10 mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px]">
                    {post.tags.map((tag) => (
                      <li key={tag}>
                        <Link
                          href={`/blog/tags/${tagToSlug(tag)}`}
                          className="text-muted-foreground underline decoration-border underline-offset-4 hover:text-primary-text hover:decoration-primary-text"
                        >
                          {tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
          <span className="pt-0.5 font-mono text-xs text-muted-foreground max-sm:col-start-2 sm:text-right">
            {post.readingTime} min
          </span>
        </li>
      ))}
    </ol>
  )
}

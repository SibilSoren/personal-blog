"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import type { Heading } from "@/lib/blog"

interface TableOfContentsProps {
  /**
   * Headings are computed on the server with the same github-slugger instance
   * that rehype-slug uses, so these ids always match the rendered anchors.
   */
  headings: Heading[]
  /** Show section numbers; only for posts with numberedSections in frontmatter. */
  numbered?: boolean
}

/**
 * Section numbers, counted the same way as the CSS counters on .prose-numbered
 * (h2 is 1, 2, 3; h3 under the second h2 is 2.1, 2.2), so the contents and the
 * headings in the post always agree.
 */
function numberHeadings(headings: Heading[]) {
  let section = 0
  let subsection = 0
  return headings.map((heading) => {
    if (heading.level === 2) {
      section += 1
      subsection = 0
      return { ...heading, number: `${section}.` }
    }
    subsection += 1
    return { ...heading, number: `${section}.${subsection}` }
  })
}

export function TableOfContents({ headings, numbered = false }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>("")
  const [isOpen, setIsOpen] = React.useState(true)
  const items = React.useMemo(() => numberHeadings(headings), [headings])

  React.useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-labelledby="toc-heading" className="border border-ink-line bg-card text-card-foreground">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="toc-list"
        className="flex w-full items-center justify-between px-4 py-2.5 transition-colors hover:bg-muted/60"
      >
        <span
          id="toc-heading"
          className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-primary-text"
        >
          Contents
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn("h-4 w-4 text-muted-foreground transition-transform", !isOpen && "-rotate-90")}
        />
      </button>

      {isOpen && (
        <ol id="toc-list" className="border-t border-ink-line py-2">
          {items.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={activeId === heading.id ? "location" : undefined}
                className={cn(
                  "grid gap-1 px-4 py-1.5 text-sm leading-snug transition-colors hover:bg-muted/60 hover:text-primary-text",
                  numbered && "grid-cols-[2.25rem_minmax(0,1fr)]",
                  heading.level === 3 && (numbered ? "pl-8" : "pl-7"),
                  // Current section: ink, weight and a fill, so it isn't marked by
                  // colour alone. Red pencil stays reserved for the post's note.
                  activeId === heading.id
                    ? "bg-muted/60 font-semibold text-primary-text"
                    : "text-muted-foreground"
                )}
              >
                {numbered && (
                  <span className="font-mono text-xs leading-5 tabular-nums">{heading.number}</span>
                )}
                <span>{heading.text}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  )
}

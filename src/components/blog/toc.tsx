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
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>("")
  const [isOpen, setIsOpen] = React.useState(true)

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
    <nav
      aria-labelledby="toc-heading"
      className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="toc-list"
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-muted/50"
      >
        <span id="toc-heading" className="flex items-center gap-2">
          <ChevronDown
            aria-hidden="true"
            className={cn("h-4 w-4 transition-transform", !isOpen && "-rotate-90")}
          />
          Table Of Content
        </span>
      </button>

      {isOpen && (
        <div id="toc-list" className="border-t px-2 py-4">
          <ul className="space-y-1">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 1.5}rem` }}
              >
                <a
                  href={`#${heading.id}`}
                  aria-current={activeId === heading.id ? "location" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-1.5 text-sm transition-all hover:bg-primary/10 hover:text-primary-text",
                    activeId === heading.id
                      ? "bg-primary/10 font-bold text-primary-text"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="mr-2 opacity-50" aria-hidden="true">
                    •
                  </span>
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

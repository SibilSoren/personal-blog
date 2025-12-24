"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = React.useState<TOCItem[]>([])
  const [activeId, setActiveId] = React.useState<string>("")
  const [isOpen, setIsOpen] = React.useState(true)

  React.useEffect(() => {
    // Extract headings from MDX content
    // This matches ## Heading and ### Heading
    const headingRegex = /^(#{2,3})\s+(.*)$/gm
    const matches = Array.from(content.matchAll(headingRegex))
    
    const extractedHeadings = matches.map((match) => {
      const level = match[1].length
      const text = match[2]
      // Create slug from text (should match rehype-slug)
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
      
      return { id, text, level }
    })
    
    setHeadings(extractedHeadings)
  }, [content])

  React.useEffect(() => {
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
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-muted/50"
      >
        <span className="flex items-center gap-2">
          <ChevronDown className={cn("h-4 w-4 transition-transform", !isOpen && "-rotate-90")} />
          Table Of Content
        </span>
      </button>

      {isOpen && (
        <div className="border-t px-2 py-4">
          <ul className="space-y-1">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 1.5}rem` }}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }}
                  className={cn(
                    "block rounded-md px-3 py-1.5 text-sm transition-all hover:bg-primary/10 hover:text-primary",
                    activeId === heading.id
                      ? "bg-primary/10 font-bold text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="mr-2 opacity-50">•</span>
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

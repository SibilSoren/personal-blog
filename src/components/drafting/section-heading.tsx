import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface SectionHeadingProps {
  id: string
  title: string
  /** A short mono line under the title: a count, a date range, a label. */
  caption?: string
  href?: string
  linkLabel?: string
}

/** Section title in drafting capitals over a heavy ink rule. */
export function SectionHeading({ id, title, caption, href, linkLabel }: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-4 border-b-2 border-ink-line pb-2">
      <div className="min-w-0">
        <h2
          id={id}
          className="font-display text-2xl font-semibold uppercase tracking-[0.06em] text-primary-text md:text-3xl"
        >
          {title}
        </h2>
        {caption && <p className="mt-1 font-mono text-xs text-muted-foreground">{caption}</p>}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="flex shrink-0 items-center gap-1 font-mono text-xs text-primary-text hover:underline hover:underline-offset-4"
        >
          {linkLabel} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

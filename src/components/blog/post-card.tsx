import Link from "next/link"
import { CalendarDays, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { tagToSlug } from "@/lib/blog"
import type { BlogPost } from "@/types/blog"

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

/**
 * The title is a real heading. Previously the whole card was wrapped in one
 * <Link> and CardTitle rendered a <div>, so /blog had a single <h1> and then no
 * heading structure at all - the post list was invisible to a screen reader's
 * heading rotor, and each link's accessible name was the entire card's text.
 */
export function PostCard({ post, headingLevel = "h2" }: { post: BlogPost; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel

  return (
    <Card className="relative h-full hover:shadow-md transition-shadow group flex flex-col">
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/blog/tags/${tagToSlug(tag)}`} className="relative z-10">
              <Badge
                variant="outline"
                className="text-[10px] uppercase tracking-wider hover:border-primary/50 transition-colors"
              >
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
        <Heading className="text-2xl font-semibold leading-tight">
          <Link
            href={`/blog/${post.slug}`}
            className="group-hover:text-primary-text transition-colors after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </Heading>
        <CardDescription className="line-clamp-2 mt-2">{post.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readingTime} min
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

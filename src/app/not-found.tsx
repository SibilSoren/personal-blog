import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileQuestion } from "lucide-react"

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <FileQuestion className="h-14 w-14 text-muted-foreground/40 mb-6" aria-hidden="true" />
        <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-3">
          404
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-4">This page does not exist</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          The link may be out of date, or the page may have moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild className="rounded-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Back home
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/blog">Read the blog</Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}

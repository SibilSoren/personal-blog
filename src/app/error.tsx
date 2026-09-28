"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { RotateCcw, TriangleAlert } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Surfaced in the hosting platform's function logs.
    console.error(error)
  }, [error])

  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <TriangleAlert className="h-14 w-14 text-muted-foreground/40 mb-6" aria-hidden="true" />
        <h1 className="text-4xl font-bold tracking-tight mb-4">Something broke</h1>
        <p className="text-muted-foreground max-w-md mb-2">
          An unexpected error stopped this page from rendering.
        </p>
        {error.digest && (
          <p className="font-mono text-xs text-muted-foreground/70 mb-8">
            Reference: {error.digest}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Button onClick={reset} className="rounded-full">
            <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" /> Try again
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}

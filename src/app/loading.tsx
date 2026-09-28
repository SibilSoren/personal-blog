import { Container } from "@/components/layout/container"

export default function Loading() {
  return (
    <Container>
      <div className="py-20" role="status" aria-live="polite">
        <span className="sr-only">Loading</span>
        <div className="max-w-2xl space-y-4">
          <div className="h-10 w-2/3 animate-pulse rounded-lg bg-muted" />
          <div className="h-5 w-full animate-pulse rounded bg-muted" />
          <div className="h-5 w-4/5 animate-pulse rounded bg-muted" />
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl border bg-muted/40" />
          ))}
        </div>
      </div>
    </Container>
  )
}

import { cn } from "@/lib/utils"

/**
 * A red-pencil dimension: extension lines at both ends, arrows, and the
 * measurement in the middle. The red pencil marks the one thing on a page that
 * should stand out, so use this at most once per page.
 */
export function DimensionLine({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("dimension", className)}>
      <span className="dimension-arrows" aria-hidden="true" />
      <span className="dimension-label">{label}</span>
    </div>
  )
}

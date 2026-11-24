import { Fragment } from "react"
import type { Contribution } from "@/content/oss"

export function formatDay(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}

/** Titles use backticks for commands, as in commit messages. */
function withInlineCode(text: string) {
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.85em]">
        {part}
      </code>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )
}

interface ContributionTableProps {
  items: Contribution[]
  caption: string
  /** Hide the project column when the rows are already grouped by project. */
  showRepo?: boolean
  showDetail?: boolean
}

/**
 * Merged pull requests as a drawing table. On a phone each row becomes its own
 * ruled block instead of a table that scrolls sideways.
 */
export function ContributionTable({
  items,
  caption,
  showRepo = true,
  showDetail = false,
}: ContributionTableProps) {
  return (
    <table className="w-full border-collapse text-left text-sm max-sm:block">
      <caption className="sr-only">{caption}</caption>
      <thead className="max-sm:hidden">
        <tr>
          <th scope="col" className="w-32 border border-ink-line px-3 py-2 font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-primary-text">
            Merged
          </th>
          {showRepo && (
            <th scope="col" className="border border-ink-line px-3 py-2 font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-primary-text">
              Project
            </th>
          )}
          <th scope="col" className="border border-ink-line px-3 py-2 font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-primary-text">
            Change
          </th>
          <th scope="col" className="w-20 border border-ink-line px-3 py-2 font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-primary-text">
            PR
          </th>
        </tr>
      </thead>
      <tbody className="max-sm:block">
        {items.map((item) => (
          <tr
            key={item.url}
            className="bg-card max-sm:mb-[-1px] max-sm:grid max-sm:grid-cols-[minmax(0,1fr)_auto] max-sm:gap-x-3 max-sm:border max-sm:border-ink-line max-sm:px-3 max-sm:py-2.5"
          >
            <td className="whitespace-nowrap border border-ink-line px-3 py-2.5 align-top font-mono text-xs tabular-nums text-muted-foreground max-sm:border-0 max-sm:p-0">
              {formatDay(item.mergedAt)}
            </td>
            {showRepo && (
              <td className="border border-ink-line px-3 py-2.5 align-top font-mono text-xs text-foreground max-sm:col-span-2 max-sm:row-start-2 max-sm:mt-1 max-sm:border-0 max-sm:p-0 [overflow-wrap:anywhere]">
                {item.repo}
              </td>
            )}
            <td className="border border-ink-line px-3 py-2.5 align-top max-sm:col-span-2 max-sm:mt-1 max-sm:border-0 max-sm:p-0">
              <span className="font-medium text-foreground">{withInlineCode(item.title)}</span>
              {showDetail && <p className="mt-1 text-muted-foreground">{item.detail}</p>}
            </td>
            <td className="border border-ink-line px-3 py-2.5 align-top font-mono text-xs max-sm:col-start-2 max-sm:row-start-1 max-sm:border-0 max-sm:p-0 max-sm:text-right">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-primary-text underline decoration-border underline-offset-4 hover:decoration-primary-text"
                aria-label={`Pull request ${item.number} in ${item.repo}`}
              >
                #{item.number}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

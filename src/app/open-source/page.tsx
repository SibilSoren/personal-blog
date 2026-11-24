import type { Metadata } from "next"
import { ExternalLink } from "lucide-react"

import { Container } from "@/components/layout/container"
import { ContributionTable, formatDay } from "@/components/drafting/contribution-table"
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld"
import { allMergedUrl, contributionSummary, getContributions, upstreamProjects } from "@/content/oss"
import { absoluteUrl } from "@/config/site"

export const metadata: Metadata = {
  title: "Open source",
  description:
    "Merged pull requests by Sibil Sarjam Soren to node-redis, openship, node-rate-limiter-flexible and notifkit: bug fixes with tests, and two email providers.",
  alternates: { canonical: absoluteUrl("/open-source") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/open-source"),
    title: "Open source | Sibil Sarjam Soren",
    description: "Merged pull requests to node-redis, openship, node-rate-limiter-flexible and notifkit.",
  },
}

export default function OpenSourcePage() {
  const summary = contributionSummary()
  const all = getContributions()

  // Projects in the order of their most recent merge.
  const groups = upstreamProjects
    .map((project) => ({ project, items: all.filter((c) => c.repo === project.repo) }))
    .filter((g) => g.items.length > 0)
    .sort((a, b) => b.items[0].mergedAt.localeCompare(a.items[0].mergedAt))

  return (
    <div className="pb-24">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Open source", path: "/open-source" },
        ])}
      />

      <section aria-labelledby="oss-title" className="border-b border-ink-line bg-grid">
        <Container className="py-14 md:py-20">
          <p className="font-mono text-xs text-muted-foreground md:text-sm">Upstream fixes</p>
          <h1
            id="oss-title"
            className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] tracking-[0.01em] text-primary-text md:text-6xl"
          >
            Open source
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-body">
            Bug fixes and two email providers for other people&apos;s projects, each with tests and
            merged by the project&apos;s maintainers. For the bugs, I reproduced the problem against
            the real service before changing any code.
          </p>
          <dl className="mt-8 inline-grid grid-cols-3 border-l border-t border-ink-line font-mono text-xs">
            {[
              { label: "Merged", value: summary.merged },
              { label: "Projects", value: summary.projects },
              { label: "Since", value: formatDay(summary.since) },
            ].map((cell) => (
              <div key={cell.label} className="border-b border-r border-ink-line bg-card px-4 py-2">
                <dt className="font-display text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {cell.label}
                </dt>
                <dd className="mt-0.5 text-sm tabular-nums text-foreground">{cell.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container className="mt-14 grid gap-16">
        {groups.map(({ project, items }) => {
          const headingId = `project-${project.repo.replace("/", "-")}`
          return (
            <section key={project.repo} aria-labelledby={headingId} className="grid gap-4">
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b-2 border-ink-line pb-2">
                <div className="min-w-0">
                  <h2
                    id={headingId}
                    className="font-mono text-lg font-medium text-primary-text [overflow-wrap:anywhere] md:text-xl"
                  >
                    {project.repo}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{project.about}</p>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex shrink-0 items-center gap-1 font-mono text-xs text-primary-text hover:underline hover:underline-offset-4"
                >
                  Repository <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
              <ContributionTable
                items={items}
                caption={`Merged pull requests in ${project.repo}`}
                showRepo={false}
                showDetail
              />
            </section>
          )
        })}

        <p className="text-sm text-muted-foreground">
          This list starts in November 2026.{" "}
          <a
            href={allMergedUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary-text underline decoration-border underline-offset-4 hover:decoration-primary-text"
          >
            Every merged pull request on GitHub
          </a>
          .
        </p>
      </Container>
    </div>
  )
}

import Link from "next/link"
import { ArrowRight, FileDown } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/drafting/section-heading"
import { DimensionLine } from "@/components/drafting/dimension-line"
import { ContributionTable, formatDay } from "@/components/drafting/contribution-table"
import { PostRegister } from "@/components/blog/post-register"
import { getAllBlogPosts } from "@/lib/blog"
import { projects } from "@/content/projects"
import { contributionSummary, getContributions } from "@/content/oss"
import { siteConfig } from "@/config/site"

const cellHead =
  "border border-ink-line px-3 py-2 font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-primary-text"

/** Projects as a drawing's parts list: item number, part, specification, references. */
function PartsList() {
  const parts = projects.filter((p) => p.featured && p.status === "shipped")

  return (
    <table className="w-full border-collapse text-left text-sm max-sm:block">
      <caption className="sr-only">Featured projects</caption>
      <thead className="max-sm:hidden">
        <tr>
          <th scope="col" className={`w-14 ${cellHead}`}>Item</th>
          <th scope="col" className={cellHead}>Part</th>
          <th scope="col" className={cellHead}>Specification</th>
          <th scope="col" className={`w-40 ${cellHead}`}>Ref</th>
        </tr>
      </thead>
      <tbody className="max-sm:block">
        {parts.map((part, i) => {
          const refs = [
            part.github && { label: "Code", href: part.github },
            part.npm && { label: "npm", href: part.npm },
            part.demo && { label: "Demo", href: part.demo },
          ].filter((r): r is { label: string; href: string } => Boolean(r))

          return (
            <tr
              key={part.title}
              className="bg-card max-sm:mb-[-1px] max-sm:grid max-sm:grid-cols-[auto_minmax(0,1fr)] max-sm:gap-x-3 max-sm:border max-sm:border-ink-line max-sm:px-3 max-sm:py-2.5"
            >
              <td className="border border-ink-line px-3 py-3 align-top font-mono text-xs text-primary-text max-sm:border-0 max-sm:p-0 max-sm:pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </td>
              <td className="border border-ink-line px-3 py-3 align-top font-semibold text-foreground max-sm:border-0 max-sm:p-0">
                {part.title}
              </td>
              <td className="border border-ink-line px-3 py-3 align-top text-body max-sm:col-span-2 max-sm:mt-1 max-sm:border-0 max-sm:p-0">
                {part.description}
                <span className="mt-1 block font-mono text-xs text-muted-foreground">
                  {part.tech.join(" · ")}
                </span>
              </td>
              <td className="border border-ink-line px-3 py-3 align-top font-mono text-xs max-sm:col-span-2 max-sm:mt-2 max-sm:border-0 max-sm:p-0">
                <ul className="flex flex-wrap gap-x-3 gap-y-1">
                  {refs.map((ref) => (
                    <li key={ref.label}>
                      <a
                        href={ref.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary-text underline decoration-border underline-offset-4 hover:decoration-primary-text"
                        aria-label={`${part.title}: ${ref.label}`}
                      >
                        {ref.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default function Home() {
  const posts = getAllBlogPosts()
  const latest = posts[0]
  const recent = posts.slice(0, 4)
  const summary = contributionSummary()
  const recentPrs = getContributions().slice(0, 5)

  return (
    <div className="pb-24">
      <section aria-labelledby="hero-heading" className="border-b border-ink-line bg-grid">
        <Container className="py-16 md:py-24">
          <p className="font-mono text-xs text-muted-foreground md:text-sm">
            {siteConfig.name} · Backend engineer ({siteConfig.jobTitle}) at {siteConfig.employer} ·{" "}
            {siteConfig.location.split(",")[0]}
          </p>
          <h1
            id="hero-heading"
            className="mt-4 max-w-[14ch] font-display text-5xl font-bold uppercase leading-[0.95] tracking-[0.01em] text-primary-text text-balance md:text-7xl"
          >
            Designed for the failure case first.
          </h1>
          <DimensionLine label="fail-open after 500 ms" className="mt-8 max-w-md" />
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-body">
            I build backends: rate limiters, job queues, notification pipelines. I came into
            software from mechanical engineering, where a part is sized for the load it fails at,
            and I design APIs the same way. Then I break them on purpose and write down what
            happened.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {latest && (
              <Button asChild size="lg" className="rounded-sm">
                <Link href={`/blog/${latest.slug}`}>
                  Read the latest post <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            )}
            <Button asChild size="lg" variant="outline" className="rounded-sm border-ink-line">
              <a href={siteConfig.resume} target="_blank" rel="noreferrer">
                <FileDown className="h-4 w-4" aria-hidden="true" /> Resume (PDF)
              </a>
            </Button>
          </div>
        </Container>
      </section>

      <Container className="mt-16 grid gap-20 md:mt-20">
        <section aria-labelledby="projects-heading" className="grid gap-4">
          <SectionHeading
            id="projects-heading"
            title="Projects"
            caption="Parts list · things I built and maintain"
            href="/projects"
            linkLabel="All projects"
          />
          <PartsList />
        </section>

        <section aria-labelledby="oss-heading" className="grid gap-4">
          <SectionHeading
            id="oss-heading"
            title="Open source"
            caption={`${summary.merged} merged pull requests in ${summary.projects} projects since ${formatDay(summary.since)}`}
            href="/open-source"
            linkLabel="All of them"
          />
          <ContributionTable items={recentPrs} caption="Most recent merged pull requests" />
        </section>

        <section aria-labelledby="writing-heading" className="grid gap-4">
          <SectionHeading
            id="writing-heading"
            title="Writing"
            caption="Newest first"
            href="/blog"
            linkLabel="All posts"
          />
          <PostRegister posts={recent} />
        </section>
      </Container>
    </div>
  )
}

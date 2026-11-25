import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

import { Container } from "@/components/layout/container"
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld"
import { projects, projectSlug, type Project } from "@/content/projects"
import { absoluteUrl } from "@/config/site"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Open-source work by Sibil Sarjam Soren — a distributed rate limiter for Express, a Node.js API scaffolding CLI, a browser-based multi-track audio editor, and a React spinner library.",
  alternates: { canonical: absoluteUrl("/projects") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/projects"),
    title: "Projects | Sibil Sarjam Soren",
    description:
      "Open-source work — distributed rate limiting, API scaffolding, browser audio, and UI libraries.",
  },
}

function references(project: Project) {
  return [
    project.github && { label: "Code", href: project.github },
    project.npm && { label: "npm", href: project.npm },
    project.demo && { label: "Demo", href: project.demo },
  ].filter((r): r is { label: string; href: string } => Boolean(r))
}

/** One project laid out like a part sheet: number and title, figure, then the spec. */
function ProjectSheet({ project, item }: { project: Project; item: number }) {
  const slug = projectSlug(project)
  const refs = references(project)
  const status = project.status === "designed" ? "Design write-up" : "Shipped"

  return (
    <article id={slug} aria-labelledby={`${slug}-title`} className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b-2 border-ink-line pb-2">
        <div className="min-w-0">
          <p className="font-mono text-xs text-muted-foreground">
            Item {String(item).padStart(2, "0")} · {status}
          </p>
          <h2
            id={`${slug}-title`}
            className="mt-1 font-display text-2xl font-semibold uppercase tracking-[0.04em] text-primary-text md:text-3xl"
          >
            {project.title}
          </h2>
        </div>
        {refs.length > 0 && (
          <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
            {refs.map((ref) => (
              <li key={ref.label}>
                <a
                  href={ref.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-primary-text underline decoration-border underline-offset-4 hover:decoration-primary-text"
                  aria-label={`${project.title}: ${ref.label}`}
                >
                  {ref.label} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <figure className="relative aspect-[3/2] self-start overflow-hidden border border-ink-line bg-card">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          ) : (
            // No screenshot yet: a plain drawing frame with the project's icon
            // rather than an empty box.
            <div className="flex h-full flex-col items-center justify-center gap-3 bg-grid text-muted-foreground">
              <project.icon className="h-10 w-10" aria-hidden="true" />
              <span className="font-mono text-xs">No screenshot</span>
            </div>
          )}
        </figure>

        <div className="min-w-0">
          <p className="max-w-[65ch] text-base leading-relaxed text-body md:text-lg">
            {project.longDescription}
          </p>

          <h3 className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.1em] text-primary-text">
            Key decisions
          </h3>
          <ul className="mt-2 grid gap-x-6 border-t border-border sm:grid-cols-2">
            {project.architecture.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 border-b border-border py-2 text-sm text-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-primary-text" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-4 font-mono text-xs text-muted-foreground">{project.tech.join(" · ")}</p>

          {project.status === "designed" && (
            <p className="mt-4 text-sm text-muted-foreground">
              Architecture write-up, not a shipped service. There is no code to link to.
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export default function ProjectsPage() {
  return (
    <div className="pb-24">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />

      <section aria-labelledby="projects-title" className="border-b border-ink-line bg-grid">
        <Container className="py-14 md:py-20">
          <p className="font-mono text-xs text-muted-foreground md:text-sm">
            Parts list · {projects.length} entries
          </p>
          <h1
            id="projects-title"
            className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] tracking-[0.01em] text-primary-text md:text-6xl"
          >
            Projects
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-body">
            Things I&apos;ve built, mostly because I kept solving the same problem by hand. Each
            entry covers what it does, the decisions that mattered, and where to find it.
          </p>
        </Container>
      </section>

      <Container className="mt-14 grid gap-20">
        {projects.map((project, i) => (
          <ProjectSheet key={project.title} project={project} item={i + 1} />
        ))}

        <p className="border-t border-ink-line pt-6 text-sm text-muted-foreground">
          Want to talk about one of these?{" "}
          <Link
            href="/contact"
            className="text-primary-text underline decoration-border underline-offset-4 hover:decoration-primary-text"
          >
            Get in touch
          </Link>
          . Fixes I&apos;ve made to other people&apos;s projects are on the{" "}
          <Link
            href="/open-source"
            className="text-primary-text underline decoration-border underline-offset-4 hover:decoration-primary-text"
          >
            open source
          </Link>{" "}
          page.
        </p>
      </Container>
    </div>
  )
}

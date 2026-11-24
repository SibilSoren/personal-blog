import Link from "next/link"
import { Container } from "./container"
import { Github, Linkedin, Twitter, Youtube, Rss } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig, socialLinks } from "@/config/site"

const socialIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  youtube: Youtube,
} as const

/**
 * The revision is the date this version of the site was built. Pages are
 * prerendered, so this runs at build time, not on each request.
 */
function revisionDate(): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  })
    .format(new Date())
    .replaceAll("/", ".")
}

/**
 * Footer as a drawing's title block: the cells say who drew the sheet, where,
 * and which revision this is. The cells share borders, so the block is drawn
 * with a top and left edge on the grid and a right and bottom edge per cell.
 */
function TitleBlock() {
  // Ordered and spanned so the long values (address, email) get a full row
  // and never break mid-word: three columns from sm up, two on a phone.
  const cells = [
    { label: "Title", value: siteConfig.url.replace("https://", ""), span: "col-span-2" },
    { label: "Rev", value: revisionDate(), span: "" },
    { label: "Drawn by", value: siteConfig.name, span: "" },
    { label: "Location", value: siteConfig.location, span: "" },
    { label: "Scale", value: "1:1", span: "" },
    {
      label: "Contact",
      value: (
        <a href={`mailto:${siteConfig.email}`} className="hover:text-primary-text hover:underline">
          {siteConfig.email}
        </a>
      ),
      span: "col-span-2 sm:col-span-3",
    },
  ]

  return (
    <dl className="grid grid-cols-2 border-l border-t border-ink-line font-mono text-xs text-foreground sm:grid-cols-3">
      {cells.map((cell) => (
        <div key={cell.label} className={`min-w-0 border-b border-r border-ink-line px-3 py-2 ${cell.span}`}>
          <dt className="font-display text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {cell.label}
          </dt>
          <dd className="mt-0.5 [overflow-wrap:anywhere]">{cell.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-ink-line bg-grid text-muted-foreground">
      <Container>
        <div className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-end">
          <div className="max-w-md">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-[0.06em] text-primary-text">
              Notes on backends and how they fail
            </h2>
            <p className="mt-3 text-sm leading-relaxed md:text-base">
              New posts on Node.js, Redis and distributed systems. Follow by RSS, or watch the
              longer walkthroughs on YouTube.
            </p>

            {/*
              This used to be an email <form> with no action and no onSubmit, so
              submitting it reloaded the page and silently discarded the address.
              Until there is a real list to send to, these are two subscribe routes
              that actually work.
            */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild className="rounded-sm px-5 font-semibold">
                <Link href="/feed.xml">
                  <Rss className="h-4 w-4" aria-hidden="true" />
                  Subscribe via RSS
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-sm border-ink-line px-5">
                <Link href={siteConfig.links.youtube} target="_blank" rel="noreferrer">
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                  YouTube
                </Link>
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-1">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.key]
                return (
                  <Link
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-sm p-2 transition-colors hover:bg-muted hover:text-primary-text"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                )
              })}
            </div>
          </div>

          <TitleBlock />
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/sitemap.xml"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
              sitemap.xml
            </Link>
            <Link
              href="/feed.xml"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
              rss
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

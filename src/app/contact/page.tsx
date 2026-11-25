import type { Metadata } from "next"
import { ExternalLink } from "lucide-react"

import { Container } from "@/components/layout/container"
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld"
import { absoluteUrl, siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sibil Sarjam Soren — backend engineer in Kolkata. Email, LinkedIn, GitHub and YouTube.",
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/contact"),
    title: "Contact | Sibil Sarjam Soren",
    description: "Get in touch — email, LinkedIn, GitHub and YouTube.",
  },
}

/** The visible part of a profile URL, e.g. "/in/sibilsarjamsoren". */
function shortUrl(url: string): string {
  const { hostname, pathname } = new URL(url)
  return `${hostname.replace(/^www\./, "")}${pathname.replace(/\/$/, "")}`
}

const channels = [
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "GitHub", href: siteConfig.links.github },
  { label: "YouTube", href: siteConfig.links.youtube },
  { label: "X", href: siteConfig.links.twitter },
]

const cellLabel =
  "font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-primary-text"

export default function ContactPage() {
  return (
    <div className="pb-24">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section aria-labelledby="contact-title" className="border-b border-ink-line bg-grid">
        <Container className="py-14 md:py-20">
          <p className="font-mono text-xs text-muted-foreground md:text-sm">Contact</p>
          <h1
            id="contact-title"
            className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] tracking-[0.01em] text-primary-text md:text-6xl"
          >
            Get in touch
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-body">
            Email is the best way to reach me, whether it&apos;s about work, a post, or one of my
            projects.
          </p>
        </Container>
      </section>

      {/* Left-aligned with the header text above, not centred: max width on an
          inner block rather than on the container. */}
      <Container className="mt-14">
        <div className="grid max-w-3xl gap-10">
          {/* Email gets its own block: it's the one channel most people want. */}
          <div className="border border-ink-line bg-card px-5 py-5 sm:px-6">
            <p className={cellLabel}>Email</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 block font-mono text-lg text-foreground underline decoration-border underline-offset-4 [overflow-wrap:anywhere] hover:text-primary-text hover:decoration-primary-text sm:text-xl"
            >
              {siteConfig.email}
            </a>
            {siteConfig.availability && (
              <p className="mt-3 text-sm text-muted-foreground">{siteConfig.availability}</p>
            )}
          </div>

          <dl className="border-l border-t border-ink-line">
            {channels.map((channel) => (
              <div
                key={channel.label}
                className="grid border-b border-r border-ink-line bg-card sm:grid-cols-[9rem_minmax(0,1fr)]"
              >
                <dt className={`px-4 pt-3 sm:border-r sm:border-ink-line sm:py-3 ${cellLabel}`}>
                  {channel.label}
                </dt>
                <dd className="px-4 pb-3 pt-1 sm:py-3">
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-sm text-foreground underline decoration-border underline-offset-4 [overflow-wrap:anywhere] hover:text-primary-text hover:decoration-primary-text"
                  >
                    {shortUrl(channel.href)}
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </a>
                </dd>
              </div>
            ))}
            <div className="grid border-b border-r border-ink-line bg-card sm:grid-cols-[9rem_minmax(0,1fr)]">
              <dt className={`px-4 pt-3 sm:border-r sm:border-ink-line sm:py-3 ${cellLabel}`}>Location</dt>
              <dd className="px-4 pb-3 pt-1 font-mono text-sm text-foreground sm:py-3">
                {siteConfig.location} · IST, UTC+5:30
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </div>
  )
}

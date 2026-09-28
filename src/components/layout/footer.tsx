import Link from "next/link"
import { Container } from "./container"
import { Github, Linkedin, Twitter, Youtube, Heart, Rss } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig, socialLinks } from "@/config/site"

const socialIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  youtube: Youtube,
} as const

export function Footer() {
  return (
    <footer className="border-t bg-zinc-950 text-zinc-400">
      <Container>
        <div className="py-16 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4">
            Interesting Stories | Updates | Guides
          </h2>
          <p className="text-zinc-400 max-w-lg mb-8 text-sm md:text-base">
            New posts on distributed systems, Node.js and TypeScript. Subscribe by RSS, or
            watch the deep dives on YouTube.
          </p>

          {/*
            This used to be an email <form> with no action and no onSubmit, so
            submitting it reloaded the page and silently discarded the address.
            Until there is a real list to send to, these are two subscribe routes
            that actually work.
          */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
            <Button
              asChild
              className="bg-zinc-100 text-zinc-950 hover:bg-zinc-300 font-bold px-6 rounded-full"
            >
              <Link href="/feed.xml">
                <Rss className="mr-2 h-4 w-4" aria-hidden="true" />
                Subscribe via RSS
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-zinc-700 bg-transparent text-zinc-200 hover:bg-zinc-900 hover:text-zinc-100 px-6"
            >
              <Link href={siteConfig.links.youtube} target="_blank" rel="noreferrer">
                <Youtube className="mr-2 h-4 w-4" aria-hidden="true" />
                YouTube
              </Link>
            </Button>
          </div>

          <div className="flex items-center space-x-6">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.key]
              return (
                <Link
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-zinc-100 transition-all hover:scale-110"
                  aria-label={social.label}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              )
            })}
          </div>
        </div>

        <div className="border-t border-zinc-900 py-8 text-xs md:text-sm font-medium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="order-2 md:order-1">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </div>

            <div className="flex items-center gap-4 order-1 md:order-2">
              <Link
                href="/sitemap.xml"
                className="hover:text-zinc-100 transition-colors underline underline-offset-4 decoration-zinc-800"
              >
                sitemap.xml
              </Link>
              <Link
                href="/feed.xml"
                className="hover:text-zinc-100 transition-colors underline underline-offset-4 decoration-zinc-800"
              >
                rss
              </Link>
            </div>

            <div className="flex items-center gap-1 order-3 text-zinc-400">
              Made with{" "}
              <Heart className="h-3 w-3 text-red-500 fill-red-500" aria-hidden="true" />
              <span className="sr-only">love</span> by{" "}
              <Link
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-300 hover:text-zinc-100 transition-colors font-bold"
              >
                {siteConfig.name}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

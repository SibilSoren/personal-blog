"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useCallback } from "react"
import { createPortal } from "react-dom"
import { Github, Linkedin, Twitter, Youtube, Menu, X, FileText } from "lucide-react"

import { ModeToggle } from "@/components/mode-toggle"
import { SpotlightSearch } from "@/components/search/spotlight-search"
import { useModalBehavior } from "@/hooks/use-modal-behavior"
import { cn } from "@/lib/utils"
import { siteConfig, socialLinks } from "@/config/site"
import { BlogSearchItem } from "@/types/blog"

// No "Home": the name at the top left links there.
const navItems = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Open source", href: "/open-source" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

const socialIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  youtube: Youtube,
} as const

/** A section's own pages count as that section: a post is under Blog. */
function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)
}

interface HeaderProps {
  posts: BlogSearchItem[]
}

function Wordmark() {
  return (
    <span className="flex flex-col leading-none">
      <span className="font-display text-lg font-semibold uppercase tracking-[0.08em] text-primary-text">
        {siteConfig.name}
      </span>
      <span className="mt-1 hidden font-mono text-[11px] text-muted-foreground sm:block">
        Backend engineer · {siteConfig.location.split(",")[0]}
      </span>
    </span>
  )
}

export function Header({ posts }: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMobileMenuOpen(false), [])
  const menuRef = useModalBehavior({ open: mobileMenuOpen, onClose: closeMenu })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink-line bg-grid">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link href="/" className="relative z-50 shrink-0" onClick={closeMenu}>
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  // The underline marks the current page as well as the colour,
                  // so the state doesn't rely on colour alone.
                  "border-b-2 py-1 font-display text-[15px] font-semibold uppercase tracking-[0.08em] transition-colors",
                  active
                    ? "border-redline text-redline"
                    : "border-transparent text-muted-foreground hover:text-primary-text"
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <SpotlightSearch posts={posts} />

          <div className="hidden h-6 w-px bg-border sm:block" />

          <div className="hidden items-center sm:flex">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.key]
              return (
                <Link
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary-text"
                  aria-label={social.label}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              )
            })}
          </div>
          <div className="hidden h-6 w-px bg-border sm:block" />
          <ModeToggle />

          <button
            type="button"
            className="p-2 text-muted-foreground hover:text-primary-text lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* The portal only ever renders after a click, so it cannot run during SSR
          and does not need a `mounted` flag to gate it. */}
      {mobileMenuOpen &&
        createPortal(
          <div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[100] flex flex-col bg-grid animate-in fade-in slide-in-from-top-5 duration-200"
          >
            <div className="container mx-auto flex h-16 items-center justify-between border-b border-ink-line px-4">
              <Link href="/" onClick={closeMenu}>
                <Wordmark />
              </Link>
              <button
                type="button"
                className="p-2 text-muted-foreground hover:text-primary-text"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col overflow-y-auto px-6 pt-8">
              <nav aria-label="Mobile" className="flex flex-col gap-5">
                {navItems.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "font-display text-4xl font-semibold uppercase tracking-[0.04em] transition-colors hover:text-primary-text",
                        active ? "text-redline underline decoration-2 underline-offset-8" : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                })}
                <a
                  href={siteConfig.resume}
                  onClick={closeMenu}
                  className="flex items-center gap-3 font-display text-4xl font-semibold uppercase tracking-[0.04em] text-muted-foreground transition-colors hover:text-primary-text"
                >
                  <FileText className="h-7 w-7" aria-hidden="true" />
                  Resume
                </a>
              </nav>

              <div className="mt-12 space-y-4 border-t border-ink-line pb-12 pt-10">
                <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Connect
                </h2>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => {
                    const Icon = socialIcons[social.key]
                    return (
                      <Link
                        key={social.key}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-sm border border-border bg-card p-4 text-muted-foreground transition-colors hover:border-ink-line hover:text-primary-text"
                        aria-label={social.label}
                      >
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
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

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

const socialIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  youtube: Youtube,
} as const

interface HeaderProps {
  posts: BlogSearchItem[]
}

export function Header({ posts }: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMobileMenuOpen(false), [])
  const menuRef = useModalBehavior({ open: mobileMenuOpen, onClose: closeMenu })

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex-1 flex justify-start items-center overflow-hidden">
          <Link href="/" className="flex items-center space-x-2 z-50 relative shrink-0" onClick={closeMenu}>
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary">
              <Image src="/avatar.png" alt="" width={40} height={40} className="object-cover" />
            </div>
            <span className="hidden font-bold sm:inline-block truncate">{siteConfig.name}</span>
          </Link>
        </div>

        {/* Navigation Pill (Desktop) */}
        <nav aria-label="Main" className="hidden lg:flex items-center justify-center px-4">
          <div className="flex items-center space-x-1 rounded-full border bg-muted/50 p-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:text-primary-text whitespace-nowrap",
                  pathname === item.href
                    ? "bg-background text-primary-text shadow-sm"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-end gap-2 sm:gap-4">
          <SpotlightSearch posts={posts} />

          <div className="h-6 w-px bg-border hidden sm:block" />

          <div className="hidden items-center space-x-1 sm:flex">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.key]
              return (
                <Link
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-primary-text transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              )
            })}
          </div>
          <div className="h-6 w-px bg-border hidden sm:block mx-1" />
          <ModeToggle />

          <button
            type="button"
            className="lg:hidden ml-2 p-2 text-muted-foreground hover:text-primary-text"
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
            className="fixed inset-0 z-[100] bg-background flex flex-col animate-in fade-in slide-in-from-top-5 duration-200"
          >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 border-b">
              <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary">
                  <Image src="/avatar.png" alt="" width={40} height={40} className="object-cover" />
                </div>
                <span className="font-bold">{siteConfig.name}</span>
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

            <div className="flex flex-col pt-8 px-6 overflow-y-auto">
              <nav aria-label="Mobile" className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "text-3xl font-bold transition-colors hover:text-primary-text",
                      pathname === item.href ? "text-primary-text" : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <a
                  href={siteConfig.resume}
                  onClick={closeMenu}
                  className="flex items-center gap-3 text-3xl font-bold text-muted-foreground transition-colors hover:text-primary-text"
                >
                  <FileText className="h-7 w-7" aria-hidden="true" />
                  Résumé
                </a>
              </nav>

              <div className="mt-12 pt-12 border-t space-y-4 pb-12">
                <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-widest">
                  Connect
                </h4>
                <div className="flex items-center gap-6">
                  {socialLinks.map((social) => {
                    const Icon = socialIcons[social.key]
                    return (
                      <Link
                        key={social.key}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-muted p-4 text-muted-foreground hover:bg-primary/10 hover:text-primary-text transition-colors"
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

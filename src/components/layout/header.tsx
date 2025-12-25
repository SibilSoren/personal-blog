"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { Github, Linkedin, Twitter, Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/sibilsarjamsoren/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/sibil_soren_dev", label: "Twitter" },
  { icon: Github, href: "https://github.com/SibilSoren", label: "GitHub" },
]

import { SpotlightSearch } from "@/components/search/spotlight-search"
import { BlogPost } from "@/types/blog"
import Image from "next/image"

interface HeaderProps {
  posts: BlogPost[]
}

import { createPortal } from "react-dom"
import { useState, useEffect } from "react"

export function Header({ posts }: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex-1 flex justify-start items-center overflow-hidden">
          <Link href="/" className="flex items-center space-x-2 z-50 relative shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary">
              <Image 
                src="/avatar.png" 
                alt="Sibil Sarjam Soren" 
                width={40} 
                height={40} 
                className="object-cover"
              />
            </div>
            <span className="hidden font-bold sm:inline-block truncate">Sibil Sarjam Soren</span>
          </Link>
        </div>

        {/* Navigation Pill (Desktop) */}
        <nav className="hidden lg:flex items-center justify-center px-4">
          <div className="flex items-center space-x-1 rounded-full border bg-muted/50 p-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:text-primary whitespace-nowrap",
                  pathname === item.href
                    ? "bg-background text-primary shadow-sm"
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
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
          <div className="h-6 w-px bg-border hidden sm:block mx-1" />
          <ModeToggle />

          {/* Mobile Menu Trigger */}
          <button 
            className="lg:hidden ml-2 p-2 text-muted-foreground hover:text-primary"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Portal */}
      {mounted && mobileMenuOpen && createPortal(
        <div className="fixed inset-0 z-[100] bg-background flex flex-col animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 border-b">
             <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary">
                <Image 
                  src="/avatar.png" 
                  alt="Sibil Sarjam Soren" 
                  width={40} 
                  height={40} 
                  className="object-cover"
                />
              </div>
              <span className="font-bold">Sibil Sarjam Soren</span>
            </Link>
            <button 
              className="p-2 text-muted-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex flex-col pt-8 px-6">
            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-3xl font-bold transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-12 pt-12 border-t space-y-4">
              <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-widest">Connect</h4>
              <div className="flex items-center gap-6">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-muted p-4 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  )
}

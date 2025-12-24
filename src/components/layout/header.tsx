"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { Github, Linkedin, Twitter } from "lucide-react"

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

export function Header({ posts }: HeaderProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo/Avatar */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary">
            <Image 
              src="/avatar.png" 
              alt="Sibil Soren" 
              width={40} 
              height={40} 
              className="object-cover"
            />
          </div>
          <span className="hidden font-bold sm:inline-block">Sibil Soren</span>
        </Link>

        {/* Centered Navigation Pill */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
          <div className="flex items-center space-x-1 rounded-full border bg-muted/50 p-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:text-primary",
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

        {/* Right side: Search, Theme Toggle & Socials */}
        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </header>
  )
}

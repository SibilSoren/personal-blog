"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { Search, FileText, User, Mail, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { BlogPost } from "@/types/blog"

interface SpotlightSearchProps {
  posts: BlogPost[]
}

export function SpotlightSearch({ posts }: SpotlightSearchProps) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key === "Escape" && open) {
        setOpen(false)
      }
    }

    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    document.addEventListener("keydown", down)
    return () => {
      document.removeEventListener("keydown", down)
      document.body.style.overflow = "auto"
    }
  }, [open])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted md:w-40 lg:w-64"
      >
        <Search className="h-4 w-4" />
        <span className="hidden md:inline-block">Search...</span>
        <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
          {/* Backdrop - Sibilng to content */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          
          {/* Content */}
          <div className="relative z-10 w-full max-w-[640px] overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
            <Command 
              loop 
              shouldFilter={true}
              className="w-full flex-col overflow-hidden rounded-xl bg-transparent"
            >
              <div className="flex items-center border-b px-3 bg-transparent">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search..."
                  className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
                <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>
                
                <Command.Group heading="Pages" className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider px-2 py-1">
                  <Command.Item
                    value="page-home"
                    onSelect={() => runCommand(() => router.push("/"))}
                    className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2.5 text-sm outline-none hover:bg-primary/10 aria-selected:bg-primary/20 aria-selected:text-primary transition-colors data-[disabled]:opacity-50"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </Command.Item>
                  <Command.Item
                    value="page-about"
                    onSelect={() => runCommand(() => router.push("/about"))}
                    className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2.5 text-sm outline-none hover:bg-primary/10 aria-selected:bg-primary/20 aria-selected:text-primary transition-colors data-[disabled]:opacity-50"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>About</span>
                  </Command.Item>
                  <Command.Item
                    value="page-contact"
                    onSelect={() => runCommand(() => router.push("/contact"))}
                    className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2.5 text-sm outline-none hover:bg-primary/10 aria-selected:bg-primary/20 aria-selected:text-primary transition-colors data-[disabled]:opacity-50"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Contact</span>
                  </Command.Item>
                </Command.Group>
                
                {posts.length > 0 && (
                  <Command.Group heading="Blog Posts" className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider px-2 py-1 mt-2">
                    {posts.map((post) => (
                      <Command.Item
                        key={post.slug}
                        value={`blog-${post.title}`}
                        onSelect={() => runCommand(() => router.push(`/blog/${post.slug}`))}
                        className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2.5 text-sm outline-none hover:bg-primary/10 aria-selected:bg-primary/20 aria-selected:text-primary transition-colors data-[disabled]:opacity-50"
                      >
                        <FileText className="mr-2 h-4 w-4 shrink-0" />
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-foreground group-aria-selected:text-primary">{post.title}</span>
                          <span className="text-[10px] text-muted-foreground line-clamp-1">{post.description}</span>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}
              </Command.List>
              
              <div className="flex items-center justify-between border-t bg-muted/20 px-4 py-2 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-2 font-sans">
                  <span className="rounded border bg-background px-1 border-border/50">↑↓</span> navigate
                  <span className="rounded border bg-background px-1 border-border/50">↵</span> select
                  <span className="rounded border bg-background px-1 border-border/50">esc</span> close
                </div>
                <div className="font-mono opacity-50">Spotlight Search</div>
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  )
}

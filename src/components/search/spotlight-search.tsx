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
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

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
      
      <Command.Dialog 
        open={open} 
        onOpenChange={setOpen}
        label="Global Search"
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
      >
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div className="relative w-full max-w-[640px] overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl transition-all">
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              placeholder="Type a command or search..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>
            
            <Command.Group heading="Pages">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/"))}
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/about"))}
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <User className="mr-2 h-4 w-4" />
                <span>About</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/contact"))}
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <Mail className="mr-2 h-4 w-4" />
                <span>Contact</span>
              </Command.Item>
            </Command.Group>
            
            {posts.length > 0 && (
              <Command.Group heading="Blog Posts">
                {posts.map((post) => (
                  <Command.Item
                    key={post.slug}
                    onSelect={() => runCommand(() => router.push(`/blog/${post.slug}`))}
                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{post.title}</span>
                      <span className="text-[10px] text-muted-foreground line-clamp-1">{post.description}</span>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
          
          <div className="flex items-center justify-between border-t bg-muted/20 px-4 py-2 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="rounded border bg-background px-1">↑↓</span> to navigate
              <span className="rounded border bg-background px-1">↵</span> to select
              <span className="rounded border bg-background px-1">esc</span> to close
            </div>
            <div className="font-mono">Spotlight Search</div>
          </div>
        </div>
      </Command.Dialog>
    </>
  )
}

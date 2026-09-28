"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { Search, FileText, User, Mail, Home, FolderGit2 } from "lucide-react"
import { useModalBehavior } from "@/hooks/use-modal-behavior"
import { BlogSearchItem } from "@/types/blog"

interface SpotlightSearchProps {
  /** Trimmed index - passing full BlogPost objects shipped every post body to the client. */
  posts: BlogSearchItem[]
}

const ITEM_CLASS =
  "relative flex cursor-pointer select-none items-center rounded-md px-2 py-2.5 text-sm outline-none hover:bg-primary/10 aria-selected:bg-primary/20 aria-selected:text-primary-text transition-colors data-[disabled]:opacity-50"

const PAGES = [
  { value: "page-home", href: "/", label: "Home", icon: Home },
  { value: "page-about", href: "/about", label: "About", icon: User },
  { value: "page-projects", href: "/projects", label: "Projects", icon: FolderGit2 },
  { value: "page-contact", href: "/contact", label: "Contact", icon: Mail },
]

export function SpotlightSearch({ posts }: SpotlightSearchProps) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const close = React.useCallback(() => setOpen(false), [])
  const dialogRef = useModalBehavior({
    open,
    onClose: close,
    initialFocusRef: inputRef,
  })

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
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
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Search the site"
        className="flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted md:w-40 lg:w-64"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span className="hidden md:inline-block">Search...</span>
        <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={close}
            aria-hidden="true"
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
            className="relative z-10 w-full max-w-[640px] overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200"
          >
            <Command
              loop
              shouldFilter={true}
              className="w-full flex-col overflow-hidden rounded-xl bg-transparent"
            >
              <div className="flex items-center border-b px-3 bg-transparent">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
                <Command.Input
                  ref={inputRef}
                  placeholder="Type a command or search..."
                  className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
                <Command.Empty className="py-6 text-center text-sm">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading="Pages"
                  className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider px-2 py-1"
                >
                  {PAGES.map((page) => (
                    <Command.Item
                      key={page.value}
                      value={page.value}
                      onSelect={() => runCommand(() => router.push(page.href))}
                      className={ITEM_CLASS}
                    >
                      <page.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                      <span>{page.label}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                {posts.length > 0 && (
                  <Command.Group
                    heading="Blog Posts"
                    className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider px-2 py-1 mt-2"
                  >
                    {posts.map((post) => (
                      <Command.Item
                        key={post.slug}
                        value={`blog-${post.title}`}
                        onSelect={() =>
                          runCommand(() => router.push(`/blog/${post.slug}`))
                        }
                        className={ITEM_CLASS}
                      >
                        <FileText className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-foreground group-aria-selected:text-primary-text">
                            {post.title}
                          </span>
                          <span className="text-[10px] text-muted-foreground line-clamp-1">
                            {post.description}
                          </span>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}
              </Command.List>

              <div className="flex items-center justify-between border-t bg-muted/20 px-4 py-2 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-2 font-sans">
                  <span className="rounded border bg-background px-1 border-border/50">↑↓</span>{" "}
                  navigate
                  <span className="rounded border bg-background px-1 border-border/50">↵</span>{" "}
                  select
                  <span className="rounded border bg-background px-1 border-border/50">esc</span>{" "}
                  close
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

"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, FileText, User, Mail, Home, FolderGit2, GitPullRequest, BookOpen } from "lucide-react"
import {
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogShortcut,
  DialogTitle,
  DialogTrigger,
} from "@ui-sdk/react/dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandItemIcon,
  CommandList,
} from "@ui-sdk/react/command"

import type { BlogSearchItem } from "@/types/blog"

interface SpotlightSearchProps {
  /** Trimmed index - passing full BlogPost objects shipped every post body to the client. */
  posts: BlogSearchItem[]
}

// Each command's value is the path it opens, so running one is a router.push.
const PAGES = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: FolderGit2 },
  { href: "/open-source", label: "Open source", icon: GitPullRequest },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: Mail },
]

const ITEM_CLASS =
  "flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-2.5 text-sm outline-none transition-colors data-highlighted:bg-muted data-highlighted:text-primary-text data-disabled:opacity-50"

const GROUP_LABEL_CLASS =
  "px-2 pb-1 pt-2 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"

/**
 * Site search on UI SDK's Dialog and Command.
 *
 * The dialog brings what this used to do by hand in use-modal-behavior: the
 * page behind goes inert and stops scrolling, Tab stays inside, Escape and an
 * outside press close it, and focus returns to the search button. Command
 * brings fuzzy matching, arrow-key highlighting and Enter to run. ⌘K (Ctrl+K
 * elsewhere) comes from the trigger's shortcut, and DialogShortcut shows the
 * right keys for the platform.
 */
export function SpotlightSearch({ posts }: SpotlightSearchProps) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        shortcut="mod+k"
        aria-label="Search the site"
        className="flex items-center gap-2 rounded-sm border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-ink-line hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:w-40 lg:w-56"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span className="hidden md:inline-block">Search...</span>
        <DialogShortcut className="pointer-events-none ml-auto hidden h-5 select-none items-center rounded-sm border bg-background px-1.5 font-mono text-[10px] font-medium md:inline-flex" />
      </DialogTrigger>

      <DialogBackdrop className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />

      <DialogContent className="fixed inset-x-0 top-[15vh] z-[101] m-0 mx-auto w-[calc(100%-2rem)] max-w-[640px] overflow-hidden border border-ink-line bg-popover p-0 text-popover-foreground shadow-2xl transition-[opacity,translate] duration-150 data-ending-style:translate-y-2 data-ending-style:opacity-0 data-starting-style:translate-y-2 data-starting-style:opacity-0 motion-reduce:transition-none sm:top-[20vh]">
        <DialogTitle className="sr-only">Search the site</DialogTitle>
        <Command
          onAction={(href) => {
            setOpen(false)
            router.push(href)
          }}
        >
          <div className="flex items-center gap-2 border-b border-ink-line px-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <CommandInput
              aria-label="Search pages and posts"
              placeholder="Search pages and posts..."
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* CommandEmpty stays in the page and fills in only when nothing
              matches, so its spacing applies only then (data-empty). */}
          <CommandEmpty className="text-center text-sm text-muted-foreground data-empty:px-4 data-empty:py-6">
            No results found.
          </CommandEmpty>

          <CommandList className="max-h-[min(400px,60vh)] overflow-y-auto p-2">
            <CommandGroup>
              <CommandGroupLabel className={GROUP_LABEL_CLASS}>Pages</CommandGroupLabel>
              {PAGES.map((page) => (
                <CommandItem key={page.href} value={page.href} label={page.label} className={ITEM_CLASS}>
                  <CommandItemIcon>
                    <page.icon className="h-4 w-4" aria-hidden="true" />
                  </CommandItemIcon>
                  {page.label}
                </CommandItem>
              ))}
            </CommandGroup>

            {posts.length > 0 && (
              <CommandGroup>
                <CommandGroupLabel className={`${GROUP_LABEL_CLASS} mt-2`}>Posts</CommandGroupLabel>
                {posts.map((post) => (
                  <CommandItem
                    key={post.slug}
                    value={`/blog/${post.slug}`}
                    // The item holds a title and a description; search the title.
                    label={post.title}
                    className={ITEM_CLASS}
                  >
                    <CommandItemIcon>
                      <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </CommandItemIcon>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="font-medium text-foreground">{post.title}</span>
                      <span className="line-clamp-1 text-[11px] text-muted-foreground">
                        {post.description}
                      </span>
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>

          <div className="flex items-center gap-2 border-t border-ink-line bg-muted/40 px-4 py-2 font-mono text-[10px] text-muted-foreground">
            <span className="rounded-sm border bg-background px-1">↑↓</span> navigate
            <span className="rounded-sm border bg-background px-1">↵</span> open
            <span className="rounded-sm border bg-background px-1">esc</span> close
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
}

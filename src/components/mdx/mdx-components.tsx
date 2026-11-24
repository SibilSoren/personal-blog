import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { CodeBlock } from "./code-block"

export const MDXComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        // Numbered by the .prose-numbered counters in globals.css.
        "mt-12 scroll-m-24 border-b border-ink-line pb-2 font-display text-2xl font-semibold uppercase tracking-[0.04em] first:mt-0 md:text-[1.75rem]",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-9 scroll-m-24 font-display text-xl font-semibold md:text-2xl",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-8 scroll-m-24 font-display text-lg font-semibold",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  // A plain blockquote is a quotation: an ink rule, not italics. A GitHub-style
  // "> [!NOTE]" arrives tagged with data-callout (see remark-note-callouts.ts)
  // and becomes the post's red-pencil note.
  blockquote: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement> & { "data-callout"?: string }) => {
    const callout = props["data-callout"]
    if (callout) {
      return (
        <aside
          className={cn(
            "not-prose my-8 border border-dashed border-redline px-4 py-3 text-redline [&_p]:m-0 [&_p]:leading-relaxed",
            className
          )}
          aria-label={callout}
        >
          <span className="mb-1 block font-mono text-xs font-bold uppercase tracking-[0.08em]">
            {callout}
          </span>
          <div className="text-[0.95em]">{children}</div>
        </aside>
      )
    }
    return (
      <blockquote
        className={cn("mt-6 border-l-2 border-ink-line pl-5 not-italic text-foreground", className)}
        {...props}
      >
        {children}
      </blockquote>
    )
  },
  img: ({
    className,
    alt,
    src,
    width,
    height,
  }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (typeof src !== "string") return null
    return (
      <Image
        className={cn("rounded-sm border border-ink-line", className)}
        src={src}
        alt={alt ?? ""}
        width={Number(width) || 1024}
        height={Number(height) || 1024}
        sizes="(max-width: 768px) 100vw, 768px"
      />
    )
  },
  hr: ({ ...props }) => <hr className="my-8 border-border md:my-10" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 w-full overflow-x-auto">
      <table className={cn("w-full border-collapse font-[inherit]", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 p-0", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border border-ink-line px-2 py-1.5 text-left font-display text-[0.8em] sm:px-3 sm:py-2 font-semibold uppercase tracking-[0.08em] text-primary-text [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border border-ink-line px-2 py-1.5 text-left align-top text-[0.95em] sm:px-3 sm:py-2 sm:text-[1em] [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: CodeBlock,
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative font-mono text-sm",
        // data-language is only present on highlighted blocks, which bring
        // their own colours from Shiki.
        !props["data-language" as keyof typeof props] &&
          "rounded bg-muted px-[0.3rem] py-[0.2rem] font-semibold text-foreground",
        className
      )}
      {...props}
    />
  ),
}

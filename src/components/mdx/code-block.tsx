"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Wraps the <pre> that rehype-pretty-code produces so the block gets a language
 * label and a copy button. The text is read off the DOM node rather than
 * reconstructed from children, which keeps it correct regardless of how the
 * highlighter nests its spans.
 */
export function CodeBlock({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement> & { "data-language"?: string }) {
  const preRef = React.useRef<HTMLPreElement>(null)
  const [copied, setCopied] = React.useState(false)
  const language = props["data-language"]

  const copy = React.useCallback(async () => {
    const text = preRef.current?.textContent ?? ""
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked (insecure context, denied permission).
      // Failing silently is fine here - the code is still selectable.
    }
  }, [])

  return (
    <div className="group relative my-6">
      {language && (
        <span className="absolute left-4 top-3 z-10 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          {language}
        </span>
      )}
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
        className="absolute right-3 top-2.5 z-10 rounded-md border border-zinc-700/60 bg-zinc-800/80 p-2 text-zinc-400 opacity-0 transition-all hover:text-zinc-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>
      <pre
        ref={preRef}
        className={cn(
          "overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 py-4 font-mono text-sm leading-relaxed",
          language && "pt-9",
          className
        )}
        {...props}
      >
        {children}
      </pre>
      <span aria-live="polite" className="sr-only">
        {copied ? "Code copied to clipboard" : ""}
      </span>
    </div>
  )
}

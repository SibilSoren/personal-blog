"use client"

import * as React from "react"

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",")

interface ModalBehaviorOptions {
  open: boolean
  onClose: () => void
  /** Focus this element when the modal opens. Defaults to the first focusable child. */
  initialFocusRef?: React.RefObject<HTMLElement | null>
}

/**
 * The four things a modal owes a keyboard or screen-reader user: Escape closes
 * it, Tab stays inside it, the page behind it does not scroll, and focus returns
 * to whatever opened it. Both the spotlight search and the mobile menu were
 * missing most of these, so a keyboard user could tab straight out into the page
 * behind the backdrop and be dropped at <body> on close.
 */
export function useModalBehavior({
  open,
  onClose,
  initialFocusRef,
}: ModalBehaviorOptions) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const restoreFocusRef = React.useRef<HTMLElement | null>(null)

  // Remember the trigger before the modal steals focus.
  React.useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null
    }
  }, [open])

  React.useEffect(() => {
    if (!open) return

    const container = containerRef.current

    // Move focus in, so the first Tab lands inside the modal rather than behind it.
    const target =
      initialFocusRef?.current ??
      container?.querySelector<HTMLElement>(FOCUSABLE) ??
      container
    target?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== "Tab" || !container) return

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null || el === document.activeElement)

      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || !container.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    // Restore the previous overflow rather than clobbering it with "auto".
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      restoreFocusRef.current?.focus()
    }
  }, [open, onClose, initialFocusRef])

  return containerRef
}

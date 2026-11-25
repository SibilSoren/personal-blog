import { readFile } from "node:fs/promises"
import { join } from "node:path"

/**
 * Shared pieces for the Open Graph images. next/og renders outside the page,
 * so CSS variables and next/font aren't available: colours are the blueprint
 * tokens from globals.css written out, and the fonts are read from disk.
 */

export const OG_SIZE = { width: 1200, height: 630 }

// The dark (blueprint) theme from globals.css. Share images use it in both
// modes: light lines on Prussian blue read clearly in a feed.
export const BLUEPRINT = {
  background: "#0e2a47",
  grid: "rgba(173, 214, 255, 0.09)",
  ink: "#bcd8f5",
  text: "#eaf2fb",
  body: "#cddcec",
  muted: "#93abc6",
  redline: "#ff9f8a",
  panel: "#102f50",
} as const

// Barlow and Barlow Condensed, SIL Open Font License (see src/assets/fonts/OFL.txt).
const FONT_DIR = join(process.cwd(), "src/assets/fonts")

export async function loadOgFonts() {
  const [condensedBold, condensedSemiBold, regular, medium] = await Promise.all([
    readFile(join(FONT_DIR, "BarlowCondensed-Bold.ttf")),
    readFile(join(FONT_DIR, "BarlowCondensed-SemiBold.ttf")),
    readFile(join(FONT_DIR, "Barlow-Regular.ttf")),
    readFile(join(FONT_DIR, "Barlow-Medium.ttf")),
  ])
  return [
    { name: "Barlow Condensed", data: condensedBold, weight: 700 as const, style: "normal" as const },
    { name: "Barlow Condensed", data: condensedSemiBold, weight: 600 as const, style: "normal" as const },
    { name: "Barlow", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Barlow", data: medium, weight: 500 as const, style: "normal" as const },
  ]
}

/** Drawing-style date, as in the footer's title block: 19.11.2026. */
export function sheetDate(value: string | Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(value))
    .replaceAll("/", ".")
}

export interface TitleCell {
  label: string
  value: string
  /** Relative width; cells share the row in proportion. */
  grow?: number
}

/**
 * The card: grid paper inside a double drawing frame, a header line, the
 * content, and a title block along the bottom.
 */
export function SheetCard({
  eyebrow,
  children,
  cells,
}: {
  eyebrow: [string, string]
  children: React.ReactNode
  cells: TitleCell[]
}) {
  const label = {
    fontFamily: "Barlow Condensed",
    fontWeight: 600,
    fontSize: 18,
    letterSpacing: 2.5,
    textTransform: "uppercase" as const,
    color: BLUEPRINT.muted,
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 24,
        backgroundColor: BLUEPRINT.background,
        backgroundImage: `linear-gradient(${BLUEPRINT.grid} 1px, transparent 1px), linear-gradient(90deg, ${BLUEPRINT.grid} 1px, transparent 1px)`,
        backgroundSize: "30px 30px",
        fontFamily: "Barlow",
      }}
    >
      {/* Outer frame line, then the heavier inner one, as on a drawing sheet. */}
      <div style={{ display: "flex", flex: 1, padding: 6, border: `1px solid ${BLUEPRINT.ink}` }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            border: `2px solid ${BLUEPRINT.ink}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "18px 36px",
              borderBottom: `1px solid ${BLUEPRINT.ink}`,
            }}
          >
            <div style={{ display: "flex", ...label, color: BLUEPRINT.ink }}>{eyebrow[0]}</div>
            <div style={{ display: "flex", ...label }}>{eyebrow[1]}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "34px 36px 0" }}>
            {children}
          </div>

          <div style={{ display: "flex", borderTop: `2px solid ${BLUEPRINT.ink}` }}>
            {cells.map((cell, i) => (
              <div
                key={cell.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: cell.grow ?? 1,
                  flexBasis: 0,
                  padding: "12px 18px",
                  borderLeft: i === 0 ? "none" : `1px solid ${BLUEPRINT.ink}`,
                  backgroundColor: BLUEPRINT.panel,
                }}
              >
                <div style={{ display: "flex", ...label, fontSize: 14, letterSpacing: 2 }}>{cell.label}</div>
                <div style={{ display: "flex", fontSize: 22, color: BLUEPRINT.text, marginTop: 4 }}>
                  {cell.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Cuts text at a word boundary so it fits the card; the ellipsis says it was cut. */
export function clip(text: string, max: number): string {
  if (text.length <= max) return text
  return `${text.slice(0, text.lastIndexOf(" ", max)).replace(/[,.;:—-]+$/, "")}…`
}

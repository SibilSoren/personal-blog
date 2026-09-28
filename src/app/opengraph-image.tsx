import { ImageResponse } from "next/og"
import { siteConfig } from "@/config/site"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// next/og renders outside the DOM, so CSS variables are unavailable. These are
// the theme's dark-mode tokens resolved to hex:
//   background oklch(0.2244 0.0074 67.4370) -> #1e1b18
//   primary    oklch(0.6801 0.1583 276.9349) -> #818cf8
//   foreground oklch(0.9288 0.0126 255.5078) -> #e2e8f0
//   muted-fg   oklch(0.7137 0.0192 261.3246) -> #9ca3af
const THEME = {
  background: "#1e1b18",
  primary: "#818cf8",
  foreground: "#e2e8f0",
  muted: "#9ca3af",
} as const
export const alt = siteConfig.title

/**
 * Every share used to fall back to the avatar, which was portrait (819x918) and
 * cropped badly - which is why the Twitter card was downgraded to "summary".
 * A real 1200x630 card lets every route use summary_large_image.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: THEME.background,
          padding: 80,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 28, color: THEME.primary, letterSpacing: 2 }}>
            {siteConfig.jobTitle.toUpperCase()} · {siteConfig.employer.toUpperCase()}
          </div>
          <div style={{ display: "flex", fontSize: 76, color: THEME.foreground, fontWeight: 700 }}>
            {siteConfig.name}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: THEME.muted, maxWidth: 900, lineHeight: 1.4 }}>
            Distributed systems, Node.js and TypeScript.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 56, height: 8, background: THEME.primary }} />
          <div style={{ display: "flex", fontSize: 26, color: THEME.muted }}>
            {siteConfig.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size
  )
}

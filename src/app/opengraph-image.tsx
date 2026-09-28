import { ImageResponse } from "next/og"
import { siteConfig } from "@/config/site"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = siteConfig.title

/**
 * Every share used to fall back to avatar.png, which is portrait (819x918) and
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
          background: "#0a0a0a",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 28, color: "#fdc700", letterSpacing: 2 }}>
            {siteConfig.jobTitle.toUpperCase()} · {siteConfig.employer.toUpperCase()}
          </div>
          <div style={{ display: "flex", fontSize: 76, color: "#fafafa", fontWeight: 700 }}>
            {siteConfig.name}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#a1a1aa", maxWidth: 900, lineHeight: 1.4 }}>
            Distributed systems, Node.js and TypeScript.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 56, height: 8, background: "#fdc700" }} />
          <div style={{ display: "flex", fontSize: 26, color: "#71717a" }}>
            {siteConfig.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size
  )
}

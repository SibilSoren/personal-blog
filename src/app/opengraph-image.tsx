import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"
import { BLUEPRINT, OG_SIZE, SheetCard, loadOgFonts, sheetDate } from "@/lib/og"

export const size = OG_SIZE
export const contentType = "image/png"
export const alt = siteConfig.title

/**
 * The site's share card: the home page's headline and its one red-pencil
 * dimension on the blueprint sheet, with the title block along the bottom.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <SheetCard
        eyebrow={[siteConfig.url.replace("https://", ""), `Backend engineer · ${siteConfig.location.split(",")[0]}`]}
        cells={[
          { label: "Drawn by", value: siteConfig.name, grow: 1.6 },
          { label: "Role", value: `${siteConfig.jobTitle}, ${siteConfig.employer}`, grow: 1.6 },
          { label: "Rev", value: sheetDate(new Date()) },
          { label: "Scale", value: "1:1", grow: 0.6 },
        ]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Barlow Condensed",
            fontWeight: 700,
            fontSize: 104,
            lineHeight: 0.95,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: BLUEPRINT.text,
          }}
        >
          <div style={{ display: "flex" }}>Designed for</div>
          <div style={{ display: "flex" }}>the failure case first.</div>
        </div>

        {/* Dimension line: extension lines, the measure, and the figure on it. */}
        <div style={{ display: "flex", alignItems: "center", width: 560, height: 26, marginTop: 30 }}>
          <div style={{ display: "flex", width: 2, height: 26, backgroundColor: BLUEPRINT.redline }} />
          <div style={{ display: "flex", flex: 1, height: 2, backgroundColor: BLUEPRINT.redline }} />
          <div
            style={{
              display: "flex",
              padding: "0 14px",
              fontSize: 22,
              color: BLUEPRINT.redline,
              fontFamily: "Barlow",
              fontWeight: 500,
            }}
          >
            fail-open after 500 ms
          </div>
          <div style={{ display: "flex", flex: 1, height: 2, backgroundColor: BLUEPRINT.redline }} />
          <div style={{ display: "flex", width: 2, height: 26, backgroundColor: BLUEPRINT.redline }} />
        </div>

        <div style={{ display: "flex", marginTop: 26, fontSize: 28, color: BLUEPRINT.body, maxWidth: 900 }}>
          Rate limiters, job queues and notification pipelines, and what they do when a dependency
          stops answering.
        </div>
      </SheetCard>
    ),
    { ...size, fonts: await loadOgFonts() }
  )
}

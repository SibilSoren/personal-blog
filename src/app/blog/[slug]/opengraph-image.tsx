import { ImageResponse } from "next/og"
import { getBlogPostBySlug } from "@/lib/blog"
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

export const alt = "Blog post by Sibil Sarjam Soren"

// One image per post, so no generateImageMetadata: declaring it would add a
// [__metadata_id__] segment for Next to enumerate, which is not needed here.
interface OgProps {
  params: Promise<{ slug: string }>
}

export default async function PostOpengraphImage({ params }: OgProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

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
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", gap: 12 }}>
            {(post?.tags ?? []).slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: 22,
                  color: THEME.background,
                  background: THEME.primary,
                  padding: "6px 18px",
                  borderRadius: 999,
                  fontWeight: 700,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: post && post.title.length > 52 ? 58 : 70,
              color: THEME.foreground,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: 1000,
            }}
          >
            {post?.title ?? siteConfig.title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 56, height: 8, background: THEME.primary }} />
          <div style={{ display: "flex", fontSize: 26, color: THEME.foreground, fontWeight: 600 }}>
            {siteConfig.name}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: THEME.muted }}>
            · {post ? `${post.readingTime} min read` : siteConfig.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size
  )
}

import { ImageResponse } from "next/og"
import { getBlogPostBySlug } from "@/lib/blog"
import { siteConfig } from "@/config/site"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

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
          background: "#0a0a0a",
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
                  color: "#0a0a0a",
                  background: "#fdc700",
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
              color: "#fafafa",
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: 1000,
            }}
          >
            {post?.title ?? siteConfig.title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 56, height: 8, background: "#fdc700" }} />
          <div style={{ display: "flex", fontSize: 26, color: "#fafafa", fontWeight: 600 }}>
            {siteConfig.name}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#71717a" }}>
            · {post ? `${post.readingTime} min read` : siteConfig.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size
  )
}

import { ImageResponse } from "next/og"

import { formatDocNumber, getBlogPostBySlug, getBlogSlugs, getDocNumbers } from "@/lib/blog"
import { siteConfig } from "@/config/site"
import { BLUEPRINT, OG_SIZE, SheetCard, clip, loadOgFonts, sheetDate } from "@/lib/og"

export const size = OG_SIZE
export const contentType = "image/png"
export const alt = "Blog post by Sibil Sarjam Soren"

// Render every post's card at build time, like the posts themselves. That
// keeps share previews fast and means the fonts are only read during the build.
export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug: slug.replace(/\.mdx$/, "") }))
}

// One image per post, so no generateImageMetadata: declaring it would add a
// [__metadata_id__] segment for Next to enumerate, which is not needed here.
interface OgProps {
  params: Promise<{ slug: string }>
}

export default async function PostOpengraphImage({ params }: OgProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  const title = post?.title ?? siteConfig.title

  // Long titles step down so they stay within three lines of the card.
  const titleSize = title.length > 60 ? 62 : title.length > 40 ? 74 : 88

  return new ImageResponse(
    (
      <SheetCard
        eyebrow={[siteConfig.url.replace("https://", ""), "Blog"]}
        cells={
          post
            ? [
                { label: "Doc", value: formatDocNumber(getDocNumbers().get(post.slug)).replace("Doc ", ""), grow: 0.5 },
                { label: "Date", value: sheetDate(post.publishedAt), grow: 0.9 },
                { label: "Read", value: `${post.readingTime} min`, grow: 0.6 },
                { label: "Tags", value: post.tags.slice(0, 2).join(" · "), grow: 1.7 },
                { label: "By", value: siteConfig.name, grow: 1.4 },
              ]
            : [{ label: "By", value: siteConfig.name }]
        }
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Barlow Condensed",
            fontWeight: 700,
            fontSize: titleSize,
            lineHeight: 1,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: BLUEPRINT.text,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        {post && (
          <div style={{ display: "flex", marginTop: 24, fontSize: 28, lineHeight: 1.35, color: BLUEPRINT.body, maxWidth: 980 }}>
            {clip(post.description, 200)}
          </div>
        )}
      </SheetCard>
    ),
    { ...size, fonts: await loadOgFonts() }
  )
}

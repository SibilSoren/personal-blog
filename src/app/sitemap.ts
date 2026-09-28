import type { MetadataRoute } from "next"
import { getAllBlogPosts, getAllTags, tagToSlug } from "@/lib/blog"
import { siteConfig, absoluteUrl } from "@/config/site"

/**
 * Replaces scripts/generate-sitemap.mjs, which hardcoded the netlify.app mirror
 * while every canonical pointed at the apex domain (a duplicate-index split),
 * omitted /projects entirely, and stamped every static route with "modified
 * today" on each build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts()

  // Derived from real content dates rather than new Date(), which crawlers
  // learn to distrust when it changes on every deploy.
  const lastPostDate = posts.length
    ? new Date(posts[0].updatedAt ?? posts[0].publishedAt)
    : new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1.0, lastModified: lastPostDate },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.8, lastModified: lastPostDate },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.5 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const tagRoutes: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: absoluteUrl(`/blog/tags/${tagToSlug(tag)}`),
    lastModified: lastPostDate,
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes, ...tagRoutes]
}

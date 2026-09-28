import { z } from "zod"

/**
 * Frontmatter is parsed from disk, so it is untrusted input as far as the type
 * system is concerned. Validating it here means a malformed post fails the build
 * with the offending filename and field, instead of throwing something opaque
 * like "Cannot read properties of undefined (reading 'forEach')" further down.
 */
export const blogFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional(),
  publishedAt: z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
    message: "must be a parseable date, e.g. 2026-01-11",
  }),
  updatedAt: z
    .string()
    .refine((v) => !Number.isNaN(Date.parse(v)), {
      message: "must be a parseable date, e.g. 2026-01-11",
    })
    .optional(),
  author: z.string().min(1),
  isPublished: z.boolean(),
  tags: z.array(z.string()).default([]),
})

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>

export interface BlogPost extends BlogFrontmatter {
  slug: string
  content: string
  /** Estimated minutes to read, derived from the body at load time. */
  readingTime: number
}

/**
 * The shape the client-side search needs. The full BlogPost carries `content`
 * (the entire raw MDX), and passing that across the server/client boundary put
 * every post's body into the HTML of every page on the site.
 */
export interface BlogSearchItem {
  slug: string
  title: string
  description: string
}

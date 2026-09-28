# Sibil Sarjam Soren | Personal Blog & Portfolio

Personal site and engineering blog. Live at **[sibilsarjamsoren.in](https://sibilsarjamsoren.in)**.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with CSS custom properties
- **UI**: [shadcn/ui](https://ui.shadcn.com/) primitives, [Lucide](https://lucide.dev/) icons
- **Content**: [MDX](https://mdxjs.com/) via `next-mdx-remote`, validated with [Zod](https://zod.dev/)
- **Highlighting**: [Shiki](https://shiki.style/) through `rehype-pretty-code`
- **Fonts**: [Geist Sans & Mono](https://vercel.com/font)

## Features

- **MDX blog** with Zod-validated frontmatter — a malformed post fails the build with the
  offending filename and field rather than an opaque stack trace.
- **Syntax highlighting** with per-block language labels and copy-to-clipboard.
- **Tag archives** at `/blog/tags/[tag]`, generated from frontmatter.
- **Dynamic OG images** rendered per post with `next/og`.
- **Structured data** — `Person`, `WebSite`, `BlogPosting` and `BreadcrumbList` JSON-LD.
- **RSS feed** at `/feed.xml`.
- **Native sitemap and robots** from `app/sitemap.ts` and `app/robots.ts`, sharing one base URL.
- **Spotlight search** (`⌘K`) over a trimmed index — post bodies never cross to the client.
- **Accessible by default** — dialog semantics and focus traps on both modals, a skip link,
  `prefers-reduced-motion` support, and AA-contrast colour tokens in both themes.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run check-links` | Verifies every outbound URL the site advertises still resolves |

CI runs typecheck, lint, build and the link check on every push and pull request.

## Writing a Post

Add an `.mdx` file under `src/content/blog/`:

```yaml
---
title: "Post title"
description: "One sentence, used for SEO and the card."
publishedAt: "2026-01-11"
updatedAt: "2026-01-11"   # optional
image: "/images/cover.png" # optional
author: "Sibil Sarjam Soren"
isPublished: true
tags: ["Architecture", "Node.js"]
---
```

Reading time, the table of contents, tag pages, the sitemap entry and the OG image are
all derived automatically.

## License & Contribution

Free to use as a base for your own portfolio. If it helps, a ⭐ is appreciated.

---

Built by [Sibil Sarjam Soren](https://www.linkedin.com/in/sibilsarjamsoren/)

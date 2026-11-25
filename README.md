# Sibil Sarjam Soren | Personal Blog & Portfolio

Personal site and engineering blog. Live at **[sibilsarjamsoren.in](https://sibilsarjamsoren.in)**.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with CSS custom properties
- **UI**: [UI SDK](https://ui-sdk.dev/) for the search and mobile menu dialogs (pinned beta), a shadcn/ui button, [Lucide](https://lucide.dev/) icons
- **Content**: [MDX](https://mdxjs.com/) via `next-mdx-remote`, validated with [Zod](https://zod.dev/)
- **Highlighting**: [Shiki](https://shiki.style/) through `rehype-pretty-code`, one theme per colour mode
- **Fonts**: [Barlow, Barlow Condensed](https://fonts.google.com/specimen/Barlow) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/), self-hosted through `next/font`
- **Theme**: a drafting sheet. Vellum in light mode, a blueprint in dark mode; code in GitHub Light and Night Owl

## Features

- **Drafting sheet design.** The page sits in a sheet border with a title block in the footer.
  Projects are a parts list, posts are numbered docs, and one red-pencil mark per page points
  at the thing to notice.
- **MDX blog** with Zod-validated frontmatter. A malformed post fails the build with the
  offending filename and field, not an opaque stack trace.
- **Post pages** with a title block, a plain reading panel, a contents box, optional section
  numbers, and `> [!NOTE]` callouts.
- **Open source page** at `/open-source`, built from `src/content/oss.ts`.
- **Syntax highlighting** with per-block language labels and copy-to-clipboard, in GitHub Light
  or Night Owl depending on the colour mode.
- **Tag archives** at `/blog/tags/[tag]`, generated from frontmatter.
- **Share images** for the site and for every post, drawn as a blueprint sheet with `next/og`
  and rendered at build time.
- **Structured data**: `Person`, `WebSite`, `BlogPosting` and `BreadcrumbList` JSON-LD.
- **RSS feed** at `/feed.xml`, plus a native sitemap and robots sharing one base URL.
- **Search** (`⌘K` / `Ctrl+K`) over pages and post titles. Post bodies never reach the client.
- **Accessible.** Both dialogs trap focus, close on Escape and return focus to their button. There's
  a skip link, `prefers-reduced-motion` is respected, and every text colour clears WCAG AA in both
  themes.

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

## Site Settings

`src/config/site.ts` holds the name, title, links, email and resume path. Two settings change
what visitors see:

- `availability`: the line under the email on `/contact`. Set it to `null` to hide it.
- `jobTitle` and `employer`: shown in the home page hero, on About and on the share card.

Colours live as tokens at the top of `src/app/globals.css`: light mode (vellum) on `:root`,
dark mode (blueprint) on `.dark`. The share images use the blueprint values written out in
`src/lib/og.tsx`, since `next/og` can't read CSS variables.

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
numberedSections: false   # optional; true numbers the sections 1., 2., 2.1
---
```

A blockquote that starts with `[!NOTE]` (or `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`)
renders as the post's red-pencil note. Use one at most per post.

Reading time, the table of contents, tag pages, the sitemap entry and the OG image are
all derived automatically.

## Adding a Merged Pull Request

Add an entry to `src/content/oss.ts` with the full PR URL, a plain-words title, one line on
what it fixed, and the merge date. The home page shows the five newest and `/open-source`
lists all of them by project. The link check covers every URL in that file.

## License & Contribution

Free to use as a base for your own portfolio. If it helps, a ⭐ is appreciated.

The Barlow and Barlow Condensed files in `src/assets/fonts/` are under the SIL Open Font
License; see `src/assets/fonts/OFL.txt`.

---

Built by [Sibil Sarjam Soren](https://www.linkedin.com/in/sibilsarjamsoren/)

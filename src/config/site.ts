/**
 * Single source of truth for anything that needs the site's identity or URL.
 *
 * The base URL used to be hardcoded in three places with two different values
 * (layout.tsx and blog/[slug] said sibilsarjamsoren.in, the sitemap script said
 * sibilsarjamsoren.netlify.app). Both resolve, so the sitemap was advertising the
 * mirror domain while the canonicals pointed at the apex - a duplicate-index split.
 */
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sibilsarjamsoren.in",
  name: "Sibil Sarjam Soren",
  title: "Sibil Sarjam Soren | Backend Engineer",
  description:
    "Backend engineer writing about distributed systems, Node.js and TypeScript — CAP theorem, availability patterns, caching and API design.",
  locale: "en_IN",
  jobTitle: "Senior Analyst",
  employer: "Accenture",
  location: "Kolkata, India",
  email: "soren.sibilsarjam@gmail.com",
  resume: "/Sibil_Sarjam_Soren_Resume.pdf",
  links: {
    github: "https://github.com/SibilSoren",
    linkedin: "https://www.linkedin.com/in/sibilsarjamsoren/",
    twitter: "https://x.com/sibil_soren_dev",
    youtube: "https://www.youtube.com/@CodewithSibil",
  },
} as const

/** Social links in the order they appear in the header and footer. */
export const socialLinks = [
  { key: "linkedin", href: siteConfig.links.linkedin, label: "LinkedIn" },
  { key: "twitter", href: siteConfig.links.twitter, label: "Twitter" },
  { key: "github", href: siteConfig.links.github, label: "GitHub" },
  { key: "youtube", href: siteConfig.links.youtube, label: "YouTube" },
] as const

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString()
}

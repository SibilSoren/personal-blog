import { siteConfig, absoluteUrl } from "@/config/site"

/**
 * Structured data. `Person` with `sameAs` is what ties the profiles together
 * into one entity for a name search; `BlogPosting` is what gets a post its
 * author byline and date in search results.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own config and frontmatter, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": absoluteUrl("/#person"),
  name: siteConfig.name,
  url: siteConfig.url,
  image: absoluteUrl("/avatar.jpg"),
  email: `mailto:${siteConfig.email}`,
  jobTitle: siteConfig.jobTitle,
  worksFor: { "@type": "Organization", name: siteConfig.employer },
  address: { "@type": "PostalAddress", addressLocality: "Kolkata", addressCountry: "IN" },
  knowsAbout: [
    "Distributed Systems",
    "Node.js",
    "TypeScript",
    "Redis",
    "System Design",
    "API Design",
  ],
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.twitter,
    siteConfig.links.youtube,
  ],
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: "en",
  publisher: { "@id": absoluteUrl("/#person") },
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

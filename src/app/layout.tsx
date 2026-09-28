import type { Metadata } from "next"
import { Open_Sans, Roboto_Mono } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { JsonLd, personSchema, websiteSchema } from "@/components/seo/json-ld"
import { getBlogSearchIndex } from "@/lib/blog"
import { siteConfig } from "@/config/site"

// Variable names match the tokens globals.css reads (--font-sans / --font-mono),
// so next/font's generated families override the plain-name fallbacks on :root.
const fontSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

const fontMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  // metadataBase lets Next resolve the relative image paths below into the
  // absolute URLs that Open Graph requires.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Sibil Sarjam Soren",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${siteConfig.url}/feed.xml` },
  },
  // Without openGraph/twitter, every share of this site on LinkedIn, Twitter,
  // WhatsApp or Slack renders as a bare URL - no title, description or image.
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: siteConfig.locale,
    // opengraph-image.tsx renders a proper 1200x630 card, so the portrait
    // avatar is no longer the share image and the card can be large.
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Only {slug, title, description} - the full posts carry every post body and
  // this prop crosses into a client component.
  const posts = getBlogSearchIndex()

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Skip to content
          </a>
          <div className="relative flex min-h-screen flex-col">
            <Header posts={posts} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://sibilsarjamsoren.in";
const SITE_TITLE = "Sibil Sarjam Soren | Backend Engineer";
const SITE_DESCRIPTION =
  "Backend engineer writing about distributed systems, Node.js and TypeScript — CAP theorem, availability patterns, caching and API design.";

export const metadata: Metadata = {
  // metadataBase lets Next resolve the relative image paths below into the
  // absolute URLs that Open Graph requires.
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Sibil Sarjam Soren",
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/avatar.png",
  },
  // Without openGraph/twitter, every share of this site on LinkedIn, Twitter,
  // WhatsApp or Slack renders as a bare URL - no title, description or image.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sibil Sarjam Soren",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
    images: [
      {
        url: "/avatar.png",
        width: 819,
        height: 918,
        alt: "Sibil Sarjam Soren",
      },
    ],
  },
  twitter: {
    // "summary" rather than "summary_large_image": avatar.png is portrait
    // (819x918) and would be cropped badly in a large card.
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/avatar.png"],
  },
};

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllBlogPosts } from "@/lib/blog";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllBlogPosts();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header posts={posts} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

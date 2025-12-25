import Link from "next/link"
import { Container } from "./container"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Heart } from "lucide-react"

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/sibilsarjamsoren/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/sibil_soren_dev", label: "Twitter" },
  { icon: Github, href: "https://github.com/SibilSoren", label: "GitHub" },
]

export function Footer() {
  return (
    <footer className="border-t bg-zinc-950 text-zinc-400">
      <Container>
        <div className="py-16 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4">
            Interesting Stories | Updates | Guides
          </h2>
          <p className="text-zinc-500 max-w-lg mb-8 text-sm md:text-base">
            Subscribe to learn about new technology and updates. Join my community to stay up to date with latest news.
          </p>

          <form className="flex w-full max-w-md items-center space-x-2 mb-10 bg-zinc-900 p-1 rounded-lg border border-zinc-800 shadow-xl focus-within:border-primary/50 transition-colors">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-200"
              required
            />
            <Button type="submit" className="bg-zinc-100 text-zinc-950 hover:bg-zinc-300 font-bold px-6">
              Submit
            </Button>
          </form>

          <div className="flex items-center space-x-6">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-500 hover:text-zinc-100 transition-all hover:scale-110"
                aria-label={social.label}
              >
                <social.icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-900 py-8 text-xs md:text-sm font-medium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="order-2 md:order-1">
              &copy; {new Date().getFullYear()} Sibil Sarjam Soren. All rights reserved.
            </div>
            
            <Link 
              href="/sitemap.xml" 
              className="hover:text-zinc-100 transition-colors order-1 md:order-2 underline underline-offset-4 decoration-zinc-800"
            >
              sitemap.xml
            </Link>

            <div className="flex items-center gap-1 order-3 text-zinc-500">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by{" "}
              <Link 
                href="https://www.linkedin.com/in/sibilsarjamsoren/" 
                target="_blank"
                className="text-zinc-300 hover:text-primary transition-colors font-bold"
              >
                Sibil Sarjam Soren
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

import Link from "next/link"
import { Container } from "./container"

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 py-8 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Sibil Sarjam Soren. Built with{" "}
              <Link
                href="https://nextjs.org"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                Next.js
              </Link>
              ,{" "}
              <Link
                href="https://tailwindcss.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                Tailwind CSS
              </Link>
              , and{" "}
              <Link
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                shadcn/ui
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

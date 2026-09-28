import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, MoveRight, CheckCircle2, Package, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/content/projects";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Open-source work by Sibil Sarjam Soren — a distributed rate limiter for Express, a Node.js API scaffolding CLI, a browser-based multi-track audio editor, and a React spinner library.",
  alternates: { canonical: absoluteUrl("/projects") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/projects"),
    title: "Projects | Sibil Sarjam Soren",
    description:
      "Open-source work — distributed rate limiting, API scaffolding, browser audio, and UI libraries.",
  },
};

export default function ProjectsPage() {
  return (
    <div className="py-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <Container>
        <div className="max-w-3xl mb-16">
          <Badge variant="outline" className="mb-4 text-primary-text bg-primary/10 border-primary/20">
            Showcase
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Architecting <span className="text-primary-text italic">Systems.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A selection of my professional work and engineering experiments, focused on distributed systems, high-throughput pipelines, and robust backend architectures.
          </p>
        </div>

        <div className="grid gap-12">
          {projects.map((project, index) => (
            <div key={project.title} className="group relative">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Visual Icon Side */}
                <div className="w-full lg:w-1/3 aspect-video lg:aspect-square bg-muted/20 border border-muted-foreground/10 rounded-2xl flex items-center justify-center group-hover:border-primary/50 transition-all overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                   {project.image ? (
                     <Image
                       src={project.image}
                       alt={`${project.title} screenshot`}
                       fill
                       sizes="(max-width: 1024px) 100vw, 33vw"
                       className="object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                   ) : (
                     <project.icon className="w-20 h-20 text-muted-foreground/40 group-hover:text-primary-text group-hover:scale-110 transition-all duration-500 relative z-10" />
                   )}
                </div>

                {/* Content Side */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="bg-muted/50 text-foreground font-medium">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h2 className="text-3xl font-bold group-hover:text-primary-text transition-colors">
                      {project.title}
                    </h2>
                    {project.status === "designed" && (
                      <Badge
                        variant="outline"
                        className="border-muted-foreground/30 text-muted-foreground font-medium"
                      >
                        <FileText className="mr-1.5 h-3 w-3" aria-hidden="true" />
                        Design write-up
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {project.longDescription}
                  </p>

                  <div className="bg-muted/30 border border-muted-foreground/10 rounded-xl p-6 mb-8">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                      Architecture Highlights
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {project.architecture.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                          <CheckCircle2 className="h-4 w-4 text-primary-text shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {project.github && (
                      <Button asChild variant="default" className="rounded-full px-6">
                        <Link href={project.github} target="_blank" rel="noreferrer">
                          <Github className="mr-2 h-4 w-4" aria-hidden="true" /> View Code
                        </Link>
                      </Button>
                    )}
                    {project.demo && (
                      <Button asChild variant="outline" className="rounded-full px-6">
                        <Link href={project.demo} target="_blank" rel="noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" /> Live Demo
                        </Link>
                      </Button>
                    )}
                    {project.npm && (
                      <Button asChild variant="outline" className="rounded-full px-6">
                        <Link href={project.npm} target="_blank" rel="noreferrer">
                          <Package className="mr-2 h-4 w-4" aria-hidden="true" /> npm
                        </Link>
                      </Button>
                    )}
                    {project.status === "designed" && (
                      <p className="text-sm text-muted-foreground self-center">
                        Architecture write-up — not a shipped service.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Divider if not last */}
              {index !== projects.length - 1 && (
                <div className="h-px bg-muted-foreground/10 w-full mt-12" />
              )}
            </div>
          ))}
        </div>
        
        {/* Contact CTA */}
        <div className="mt-24 p-12 bg-zinc-950 rounded-3xl border border-zinc-800 text-center">
             <h2 className="text-3xl font-bold text-white mb-4">Have a complex problem to solve?</h2>
             <p className="text-zinc-400 mb-8 max-w-xl mx-auto">I specialize in high-stakes backend architecture and distributed systems. Let&apos;s talk about your next project.</p>
             <Button asChild size="lg" className="rounded-full font-bold">
                <Link href="/contact">Get in Touch <MoveRight className="ml-2 h-4 w-4" /></Link>
             </Button>
        </div>
      </Container>
    </div>
  );
}

import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink, MoveRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { projects } from "@/content/projects";

export default function ProjectsPage() {
  return (
    <div className="py-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <Container>
        <div className="max-w-3xl mb-16">
          <Badge variant="outline" className="mb-4 text-primary bg-primary/10 border-primary/20">
            Showcase
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Architecting <span className="text-primary italic">Systems.</span>
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
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <project.icon className="w-20 h-20 text-muted-foreground/40 group-hover:text-primary group-hover:scale-110 transition-all duration-500" />
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
                  
                  <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                  
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
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    {project.github && (
                      <Button asChild variant="default" className="rounded-full px-6">
                        <Link href={project.github} target="_blank">
                          <Github className="mr-2 h-4 w-4" /> View Code
                        </Link>
                      </Button>
                    )}
                     {project.demo && (
                      <Button asChild variant="outline" className="rounded-full px-6">
                        <Link href={project.demo} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                        </Link>
                      </Button>
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

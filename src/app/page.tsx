import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Youtube, FileDown } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/blog/post-card";
import { getAllBlogPosts } from "@/lib/blog";
import { projects } from "@/content/projects";
import { siteConfig } from "@/config/site";

/**
 * Kept in step with the résumé - the marquee previously advertised AWS,
 * Kubernetes, Terraform, Java, Spring Boot and Kafka, none of which appear
 * there. Icons are served from public/logos/skills rather than skillicons.dev,
 * which was 60 third-party requests on this page alone.
 */
const skills = [
  { name: "TypeScript", id: "ts" },
  { name: "JavaScript", id: "js" },
  { name: "Node.js", id: "nodejs" },
  { name: "Express", id: "express" },
  { name: "NestJS", id: "nestjs" },
  { name: "React", id: "react" },
  { name: "Next.js", id: "nextjs" },
  { name: "Redux", id: "redux" },
  { name: "Tailwind CSS", id: "tailwind" },
  { name: "PostgreSQL", id: "postgres" },
  { name: "Redis", id: "redis" },
  { name: "MongoDB", id: "mongodb" },
  { name: "GraphQL", id: "graphql" },
  { name: "Docker", id: "docker" },
  { name: "Azure", id: "azure" },
  { name: "Jest", id: "jest" },
  { name: "Git", id: "git" },
];

function SkillIcon({ id, name, size }: { id: string; name: string; size: "sm" | "lg" }) {
  return (
    <div className={size === "lg" ? "relative h-7 w-7 md:h-10 md:w-10 shrink-0" : "relative h-7 w-7 shrink-0"}>
      <Image
        src={`/logos/skills/${id}.svg`}
        alt=""
        fill
        // Local SVGs: there is nothing for the raster optimizer to do.
        unoptimized
        className="object-contain transition-transform group-hover:rotate-12"
      />
      <span className="sr-only">{name}</span>
    </div>
  );
}

export default function Home() {
  const allPosts = getAllBlogPosts();
  const featuredPosts = allPosts.slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured && p.status === "shipped").slice(0, 3);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="pt-20 md:pt-32">
        <Container>
          <div className="max-w-3xl">
            <Badge
              variant="outline"
              className="mb-4 text-primary-text bg-primary/10 border-primary/20 hover:bg-primary/20 px-3 py-1"
            >
              {siteConfig.jobTitle} @ {siteConfig.employer}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Building software that{" "}
              <span className="text-primary-text italic">matters.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Hi, I&apos;m{" "}
              <span className="text-foreground font-semibold">{siteConfig.name}</span>. I build
              backends — caching layers, job queues, notification pipelines, rate limiters. I&apos;m
              most interested in what a system does when something goes wrong, which is usually
              where the real design decisions are.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href={siteConfig.resume} target="_blank" rel="noreferrer">
                  <FileDown className="mr-2 h-4 w-4" aria-hidden="true" /> Résumé
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/blog">Read the Blog</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="rounded-full bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20"
              >
                <Link href={siteConfig.links.youtube} target="_blank" rel="noreferrer">
                  <Youtube className="mr-2 h-5 w-5" aria-hidden="true" /> YouTube
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Posts */}
      <section>
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Featured Posts</h2>
            <Link
              href="/blog"
              className="text-primary-text hover:underline flex items-center gap-1 font-medium"
            >
              View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} headingLevel="h3" />
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="bg-muted/10 py-10">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
            <Link
              href="/projects"
              className="text-primary-text hover:underline flex items-center gap-1 font-medium"
            >
              See all projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <Card
                key={project.title}
                className="group relative h-full border-muted-foreground/10 hover:border-primary/50 transition-all hover:translate-y-[-4px] shadow-none bg-background/50 overflow-hidden border-2 flex flex-col"
              >
                <div className="aspect-video bg-muted/20 flex items-center justify-center border-b border-muted-foreground/10 group-hover:bg-primary/5 transition-colors relative overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <project.icon
                      className="h-12 w-12 text-muted-foreground/30 group-hover:text-primary-text transition-colors duration-500 relative z-10"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="group-hover:text-primary-text transition-colors text-xl font-semibold leading-none">
                    <Link href="/projects" className="after:absolute after:inset-0">
                      {project.title}
                    </Link>
                  </h3>
                  <CardDescription className="line-clamp-2 mt-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex items-center text-sm font-bold text-primary-text opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                    Architecture Details{" "}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Skills Marquee Section */}
      <section className="bg-muted/30 py-24 overflow-hidden border-y border-muted-foreground/5">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The stack I work in.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              What I reach for day to day, building and running backend services in production.
            </p>
          </div>
        </Container>

        <div className="relative space-y-2 lg:space-y-0" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Row 1 */}
          <div className="flex animate-marquee w-max py-2 md:py-4">
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={`${skill.id}-row1-${index}`}
                className="mx-3 md:mx-6 flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-2xl border bg-background/50 transition-all hover:scale-110 hover:border-primary/50 group cursor-default shadow-sm"
              >
                <SkillIcon id={skill.id} name={skill.name} size="lg" />
                <span className="font-bold text-sm md:text-lg text-foreground/80 group-hover:text-primary-text transition-colors italic">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2 - mobile and tablet only */}
          <div className="flex animate-marquee-reverse w-max py-2 lg:hidden">
            {[...skills].reverse().concat([...skills].reverse()).map((skill, index) => (
              <div
                key={`${skill.id}-row2-${index}`}
                className="mx-3 flex items-center gap-3 px-4 py-3 rounded-2xl border bg-background/50 transition-all hover:scale-110 hover:border-primary/50 group cursor-default shadow-sm"
              >
                <SkillIcon id={skill.id} name={skill.name} size="sm" />
                <span className="font-bold text-sm text-foreground/80 group-hover:text-primary-text transition-colors italic">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* The marquee is decorative; this is the accessible list of the same content. */}
        <h3 className="sr-only">Technologies</h3>
        <ul className="sr-only">
          {skills.map((skill) => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

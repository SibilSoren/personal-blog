import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getAllBlogPosts } from "@/lib/blog";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const skills = [
  { name: "Java", id: "java" },
  { name: "Spring Boot", id: "spring" },
  { name: "NestJS", id: "nestjs" },
  { name: "Node.js", id: "nodejs" },
  { name: "Kafka", id: "kafka" },
  { name: "PostgreSQL", id: "postgres" },
  { name: "MongoDB", id: "mongodb" },
  { name: "Redis", id: "redis" },
  { name: "React", id: "react" },
  { name: "Next.js", id: "nextjs" },
  { name: "TypeScript", id: "ts" },
  { name: "AWS", id: "aws" },
  { name: "Docker", id: "docker" },
  { name: "Kubernetes", id: "kubernetes" },
  { name: "Terraform", id: "terraform" },
];

export default function Home() {
  const allPosts = getAllBlogPosts();
  const featuredPosts = allPosts.slice(0, 3);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="pt-20 md:pt-32">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 text-primary bg-primary/10 border-primary/20 hover:bg-primary/20 px-3 py-1">
              Senior Software Engineer @ Accenture
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Building software that <span className="text-primary italic">matters.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Hi, I'm <span className="text-foreground font-semibold">Sibil Sarjam Soren</span>. I specialize in building high-performance web applications and scalable architectural solutions. Explore my thoughts on engineering in my blog or learn more about my journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/blog">
                  Read My Blog <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/about">About Me</Link>
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
            <Link href="/blog" className="text-primary hover:underline flex items-center gap-1 font-medium">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="h-full border-muted-foreground/10 hover:border-primary/50 transition-colors shadow-none bg-muted/20">
                  <CardHeader>
                    <div className="flex gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                       {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Skills Marquee Section */}
      <section className="bg-muted/30 py-24 overflow-hidden border-y border-muted-foreground/5">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Mastering the stack.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A curated collection of technologies I use to build high-performance, enterprise-scale applications and distributed systems.
            </p>
          </div>
        </Container>

        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex animate-marquee w-max py-4">
            {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
              <div 
                key={`${skill.id}-${index}`}
                className="mx-6 flex items-center gap-4 px-6 py-4 rounded-2xl border bg-background/50 backdrop-blur-sm transition-all hover:scale-110 hover:border-primary/50 group cursor-default shadow-sm"
              >
                <div className="relative h-10 w-10 shrink-0">
                  <Image
                    src={`https://skillicons.dev/icons?i=${skill.id}`}
                    alt={skill.name}
                    fill
                    unoptimized
                    className="object-contain transition-transform group-hover:rotate-12"
                  />
                </div>
                <span className="font-bold text-lg text-foreground/80 group-hover:text-primary transition-colors italic">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

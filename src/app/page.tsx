import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getAllBlogPosts } from "@/lib/blog";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Briefcase, GraduationCap } from "lucide-react";

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
              Hi, I'm <span className="text-foreground font-semibold">Sibil Soren</span>. I specialize in building high-performance web applications and scalable architectural solutions. Explore my thoughts on engineering in my blog or learn more about my journey.
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

      {/* Quick Skills/About Preview */}
      <section className="bg-muted/30 py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Mastering the stack.</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                With years of experience in the industry, I've developed a deep understanding of modern web technologies and best practices in software architecture.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 bg-primary/20 p-2 rounded-lg">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Full Stack Excellence</h3>
                    <p className="text-sm text-muted-foreground">React, Next.js, Node.js, and TypeScript specialist.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="mt-1 bg-primary/20 p-2 rounded-lg">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Enterprise Experience</h3>
                    <p className="text-sm text-muted-foreground">Scaling systems and leading teams at Accenture.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-transparent rounded-2xl border border-primary/10 flex items-center justify-center overflow-hidden">
               <div className="text-8xl font-black text-primary/10 select-none">ENGINEER</div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-primary-foreground">SS</div>
               </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

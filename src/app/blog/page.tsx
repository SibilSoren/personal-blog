import { getAllBlogPosts } from "@/lib/blog"
import { Container } from "@/components/layout/container"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="py-20">
      <Container>
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg">
            Thoughts, tutorials, and insights on software engineering, web development, and career growth.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow group">
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px] uppercase tracking-wider">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-2">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
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
    </div>
  )
}

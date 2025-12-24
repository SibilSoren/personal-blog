import { notFound } from "next/navigation"
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blog"
import { MDXRemote } from "next-mdx-remote/rsc"
import { MDXComponents } from "@/components/mdx/mdx-components"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import remarkGfm from "remark-gfm"

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs()
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="py-10">
      {/* Hero Section */}
      <div className="bg-primary/10 py-20 mb-10">
        <Container>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-primary/20 hover:bg-primary/30 text-primary-foreground border-none">
                #{tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">{post.description}</p>
          <div className="flex items-center gap-4 mt-8 text-sm text-muted-foreground">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}</span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXRemote 
              source={post.content} 
              components={MDXComponents} 
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                }
              }}
            />
          </div>
          
          {/* Sidebar / TOC placeholder */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-muted-foreground">Table of Contents</h4>
              {/* TOC logic will go here in a separate component */}
              <div className="text-sm text-muted-foreground">
                Coming soon...
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  )
}

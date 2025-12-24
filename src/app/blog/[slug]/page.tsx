import { notFound } from "next/navigation"
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blog"
import { MDXRemote } from "next-mdx-remote/rsc"
import { MDXComponents } from "@/components/mdx/mdx-components"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

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

import { TableOfContents } from "@/components/blog/toc"

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
        <div className="flex flex-col lg:flex-row gap-12 relative">
          <div className="flex-1 prose prose-neutral dark:prose-invert max-w-none order-2 lg:order-1">
            <MDXRemote 
              source={post.content} 
              components={MDXComponents} 
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }]
                  ],
                }
              }}
            />
          </div>
          
          <aside className="w-full lg:w-[300px] order-1 lg:order-2">
            <div className="sticky top-24 space-y-8">
              <TableOfContents content={post.content} />
            </div>
          </aside>
        </div>
      </Container>
    </article>
  )
}

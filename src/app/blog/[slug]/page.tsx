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
      <div className="relative py-20 mb-10 overflow-hidden border-b bg-muted/30">
        {/* Decorative background elements for better contrast/depth */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <Container className="relative">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} className="bg-primary text-primary-foreground hover:bg-primary/90 border-none px-3 py-1 text-xs uppercase tracking-wider font-bold">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight max-w-4xl animate-slide-up">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed animate-slide-up [animation-delay:200ms]">
            {post.description}
          </p>
          <div className="flex items-center gap-6 mt-10 text-sm font-medium animate-fade-in [animation-delay:400ms]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="text-primary text-xs font-bold">SS</span>
              </div>
              <span className="font-semibold">{post.author}</span>
            </div>
            <div className="h-4 w-px bg-border sm:block hidden" />
            <span className="text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
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

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_CONTENT_PATH = path.join(process.cwd(), 'src/content/blog');
const PUBLIC_PATH = path.join(process.cwd(), 'public');
const BASE_URL = 'https://sibilsarjamsoren.netlify.app';

function getAllBlogPosts() {
  if (!fs.existsSync(BLOG_CONTENT_PATH)) {
    return [];
  }
  const files = fs.readdirSync(BLOG_CONTENT_PATH).filter((file) => file.endsWith('.mdx'));
  
  return files.map((file) => {
    const fileContent = fs.readFileSync(path.join(BLOG_CONTENT_PATH, file), 'utf8');
    const { data } = matter(fileContent);
    const slug = file.replace(/\.mdx$/, '');
    
    return {
      slug,
      publishedAt: data.publishedAt,
      isPublished: data.isPublished,
    };
  }).filter(post => post.isPublished);
}

function generateSitemap() {
  const posts = getAllBlogPosts();
  
  const blogUrls = posts.map((post) => `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>${blogUrls}
</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_PATH, 'sitemap.xml'), sitemap.trim());
  console.log('✅ sitemap.xml generated successfully in public folder');
}

generateSitemap();

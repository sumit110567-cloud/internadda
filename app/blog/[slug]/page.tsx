// app/blog/[slug]/page.tsx
import { blogs } from '@/data/blogs';
import { authors } from '@/data/authors';
import { categories } from '@/data/categories';
import { notFound } from 'next/navigation';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { AuthorBox } from '@/components/blog/AuthorBox';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { ConversionCTA } from '@/components/blog/ConversionCTA';
import { NewsletterSection } from '@/components/blog/NewsletterSection';
import { FAQSchema } from '@/components/blog/FAQSchema';
import { ArticleSchema } from '@/components/blog/ArticleSchema';
import { BreadcrumbSchema } from '@/components/blog/BreadcrumbSchema';
import { HeroSection } from '@/components/HeroSection';
import Link from 'next/link';

// SEO: Static Params generate karne se page pehle hi build ho jayega (Low Latency)
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// SEO: Dynamic Metadata for Google Ranking
export async function generateMetadata({ params }: { params: { slug: string } }) {
  // decodeURIComponent added to match slugs correctly from URL
  const slug = decodeURIComponent(params.slug);
  const blog = blogs.find((b) => b.slug === slug);
  
  if (!blog) return { title: 'Post Not Found' };

  return {
    title: blog.meta.title,
    description: blog.meta.description,
    keywords: blog.meta.keywords.join(', '),
    openGraph: {
      title: blog.meta.title,
      description: blog.meta.description,
      url: `https://internadda.com/blog/${blog.slug}`,
      images: [{ url: blog.featuredImage }],
      type: 'article',
    },
    alternates: {
      canonical: `https://internadda.com/blog/${blog.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  // decodeURIComponent ensures the slug matches the one in data/blogs.ts
  const slug = decodeURIComponent(params.slug);
  const blog = blogs.find((b) => b.slug === slug);
  
  if (!blog) notFound();

  const author = authors.find((a) => a.id === blog.authorId)!;
  const category = categories.find((c) => c.id === blog.categoryId)!;
  const related = blogs
    .filter((b) => b.categoryId === blog.categoryId && b.slug !== blog.slug)
    .slice(0, 3);

  // TOC ke liye headings extract karna
  const headingRegex = /<h2>(.*?)<\/h2>/g;
  const headings: string[] = [];
  let match;
  while ((match = headingRegex.exec(blog.content)) !== null) {
    headings.push(match[1].replace(/<[^>]*>/g, ''));
  }

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Schemas */}
      <ArticleSchema blog={blog} author={author} category={category} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: blog.title, url: `/blog/${blog.slug}` }
      ]} />
      {blog.content.includes('Frequently Asked Questions') && <FAQSchema content={blog.content} />}

      <ReadingProgress />

      <HeroSection
        title={blog.title}
        subtitle={blog.excerpt}
        image={blog.featuredImage}
      />

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        {/* Left Sidebar: TOC & CTA */}
        <aside className="lg:w-1/4 order-2 lg:order-1">
          <div className="sticky top-28 space-y-8">
            <TableOfContents headings={headings} />
            <ConversionCTA
              title="Apply for Internship"
              buttonText="View All"
              link="/internships"
              variant="sidebar"
            />
          </div>
        </aside>

        {/* Main Content: Article */}
        <article className="lg:w-2/4 order-1 lg:order-2">
          <div 
            className="prose prose-blue prose-lg max-w-none prose-headings:scroll-mt-28"
            dangerouslySetInnerHTML={{
              __html: blog.content.replace(
                /<h2>(.*?)<\/h2>/g,
                (_, text) => `<h2 id="${text.toLowerCase().replace(/\s+/g, '-')}">${text}</h2>`
              )
            }}
          />

          <div className="mt-10 flex flex-wrap gap-2">
            {blog.tags.map(tag => (
              <Link key={tag} href={`/blog?search=${tag}`} className="text-sm bg-gray-100 px-4 py-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition">
                #{tag}
              </Link>
            ))}
          </div>

          <hr className="my-12" />
          <AuthorBox author={author} publishedAt={blog.publishedAt} readingTime={blog.readingTime} />
          <NewsletterSection />
        </article>

        {/* Right Sidebar: Related Posts */}
        <aside className="lg:w-1/4 order-3">
          <div className="sticky top-28">
            <RelatedPosts posts={related} />
          </div>
        </aside>
      </div>
    </div>
  );
}

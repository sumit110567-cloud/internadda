
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
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export async function generateStaticParams() {
  return blogs.map(blog => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = blogs.find(b => b.slug === params.slug);
  if (!blog) return {};

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
      publishedTime: blog.publishedAt,
      authors: [authors.find(a => a.id === blog.authorId)?.name || 'Internadda'],
      tags: blog.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.meta.title,
      description: blog.meta.description,
      images: [blog.featuredImage],
    },
    alternates: {
      canonical: `https://internadda.com/blog/${blog.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = blogs.find(b => b.slug === params.slug);
  if (!blog) notFound();

  const author = authors.find(a => a.id === blog.authorId)!;
  const category = categories.find(c => c.id === blog.categoryId)!;
  const related = blogs
    .filter(b => b.categoryId === blog.categoryId && b.slug !== blog.slug)
    .slice(0, 3);

  // Extract headings for TOC (only h2)
  const headingRegex = /<h2.*?>(.*?)<\/h2>/g;
  const headings: string[] = [];
  let match;
  while ((match = headingRegex.exec(blog.content)) !== null) {
    headings.push(match[1].replace(/<[^>]*>/g, '')); // strip inner HTML tags if any
  }

  // Check if blog contains FAQ section
  const hasFAQ = blog.content.includes('Frequently Asked Questions');

  return (
    <>
      <ArticleSchema blog={blog} author={author} category={category} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: blog.title, url: `/blog/${blog.slug}` }
      ]} />
      {hasFAQ && <FAQSchema content={blog.content} />}

      <ReadingProgress />

      {/* Hero Section (unchanged style, but with blog title and image) */}
      <HeroSection
        title={blog.title}
        subtitle={blog.excerpt}
        image={blog.featuredImage}
      />

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sticky TOC Sidebar (left) */}
        <aside className="lg:w-1/4 order-2 lg:order-1">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
            <div className="mt-6">
              <ConversionCTA
                title="Apply for Internship Now"
                buttonText="View Opportunities"
                link="/internships"
                variant="sidebar"
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <article className="lg:w-2/4 order-1 lg:order-2 prose prose-lg max-w-none">
          {/* Add ids to h2 for TOC linking */}
          <div
            dangerouslySetInnerHTML={{
              __html: blog.content.replace(
                /<h2>(.*?)<\/h2>/g,
                (_, text) => `<h2 id="${text.toLowerCase().replace(/\s+/g, '-')}">${text}</h2>`
              )
            }}
          />

          <div className="my-8 flex gap-2 flex-wrap">
            {blog.tags.map(tag => (
              <Link
                key={tag}
                href={`/blog?search=${encodeURIComponent(tag)}`}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <AuthorBox author={author} publishedAt={blog.publishedAt} readingTime={blog.readingTime} />

          {/* Social Share */}
          <div className="flex items-center gap-4 my-6">
            <span className="font-medium">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=https://internadda.com/blog/${blog.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://internadda.com/blog/${blog.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              LinkedIn
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://internadda.com/blog/${blog.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-800"
            >
              Facebook
            </a>
          </div>

          <NewsletterSection />

          {/* Conversion CTA after content */}
          <div className="my-8">
            <ConversionCTA
              title="Explore Free Courses with Certificates"
              buttonText="Browse Courses"
              link="/free-courses"
              variant="banner"
            />
          </div>
        </article>

        {/* Right Sidebar */}
        <aside className="lg:w-1/4 order-3">
          <div className="sticky top-24 space-y-6">
            <RelatedPosts posts={related} />
            <ConversionCTA
              title="Government Internships"
              buttonText="See List"
              link="/government-internships"
              variant="sidebar"
            />
          </div>
        </aside>
      </div>

      {/* Comments placeholder */}
      <div className="container mx-auto px-4 py-12 border-t">
        <h3 className="text-2xl font-bold mb-4">Comments</h3>
        <p className="text-gray-500">We'd love to hear your thoughts! Please log in to comment.</p>
        {/* Placeholder for future Disqus or custom comment system */}
      </div>
    </>
  );
}

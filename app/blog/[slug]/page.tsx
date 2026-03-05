// app/blog/[slug]/page.tsx

import { blogs } from '@/data/blogs'
import { authors } from '@/data/authors'
import { categories } from '@/data/categories'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { AuthorBox } from '@/components/blog/AuthorBox'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { ConversionCTA } from '@/components/blog/ConversionCTA'
import { NewsletterSection } from '@/components/blog/NewsletterSection'
import { ArticleSchema } from '@/components/blog/ArticleSchema'
import { BreadcrumbSchema } from '@/components/blog/BreadcrumbSchema'
import { HeroSection } from '@/components/HeroSection'
import Link from 'next/link'

// ── Tell Next.js all valid slugs at build time ──────────────────────────────
export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }))
}

// ── Per-page metadata for SEO ────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = blogs.find(
    (b) => b.slug.toLowerCase() === slug.toLowerCase()
  )
  if (!blog) return {}
  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: [{ url: blog.ogImage }],
      type: 'article',
      publishedTime: blog.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: [blog.ogImage],
    },
    alternates: {
      canonical: `https://www.internadda.com/blog/${blog.slug}`,
    },
  }
}

// ── Page component ────────────────────────────────────────────────────────────
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // In Next.js 14+ App Router, params is a Promise — must be awaited
  const { slug } = await params

  if (!slug) notFound()

  const blog = blogs.find(
    (b) => b.slug.toLowerCase() === slug.toLowerCase()
  )

  if (!blog) notFound()

  const author   = authors.find((a) => a.id === blog.authorId)
  const category = categories.find((c) => c.id === blog.categoryId)
  const related  = blogs
    .filter((b) => b.categoryId === blog.categoryId && b.slug !== blog.slug)
    .slice(0, 3)

  // Extract H2 headings for Table of Contents
  const headingRegex = /<h2>(.*?)<\/h2>/g
  const headings: string[] = []
  let match: RegExpExecArray | null
  while ((match = headingRegex.exec(blog.content)) !== null) {
    headings.push(match[1].replace(/<[^>]*>/g, ''))
  }

  // Add id anchors to h2 tags for TOC scrolling
  const contentWithAnchors = blog.content.replace(
    /<h2>(.*?)<\/h2>/g,
    (_, text: string) =>
      `<h2 id="${text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}">${text}</h2>`
  )

  return (
    <div className="min-h-screen bg-white">
      <ArticleSchema blog={blog} author={author!} category={category!} />
      <BreadcrumbSchema
        items={[
          { name: 'Home',  url: 'https://www.internadda.com/' },
          { name: 'Blog',  url: 'https://www.internadda.com/blog' },
          { name: blog.title, url: `https://www.internadda.com/blog/${blog.slug}` },
        ]}
      />

      <ReadingProgress />

      <HeroSection
        title={blog.title}
        subtitle={blog.excerpt}
        image={blog.featuredImage}
      />

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">

        {/* Left sidebar — TOC */}
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

        {/* Main article */}
        <article className="lg:w-2/4 order-1 lg:order-2">
          <div
            className="prose prose-blue prose-lg max-w-none prose-headings:scroll-mt-28"
            dangerouslySetInnerHTML={{ __html: contentWithAnchors }}
          />

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?search=${encodeURIComponent(tag)}`}
                className="text-sm bg-gray-100 px-4 py-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <hr className="my-12" />

          <AuthorBox
            author={author!}
            publishedAt={blog.publishedAt}
            readingTime={blog.readingTime}
          />

          <NewsletterSection />
        </article>

        {/* Right sidebar — Related posts */}
        <aside className="lg:w-1/4 order-3">
          <div className="sticky top-28">
            <RelatedPosts posts={related} />
          </div>
        </aside>
      </div>
    </div>
  )
}

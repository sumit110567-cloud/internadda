// app/blog/[slug]/page.tsx
// Place at: app/blog/[slug]/page.tsx

import { blogs } from '@/data/blogs'
import { authors } from '@/data/authors'
import { categories } from '@/data/categories'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArticleSchema } from '@/components/blog/ArticleSchema'
import { BreadcrumbSchema } from '@/components/blog/BreadcrumbSchema'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { NewsletterSection } from '@/components/blog/NewsletterSection'
import { ConversionCTA } from '@/components/blog/ConversionCTA'
import {
  Clock, Calendar, ArrowLeft, Twitter, Linkedin,
  BookOpen, Tag, ChevronRight,
} from 'lucide-react'

// ── Static params — tells Next.js every valid slug ──────────────────────────
export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }))
}

// ── SEO Metadata per article ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = blogs.find((b) => b.slug.toLowerCase() === slug.toLowerCase())
  if (!blog) return {}

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: [{ url: blog.ogImage, width: 1200, height: 630 }],
      type: 'article',
      publishedTime: blog.publishedAt,
      authors: [blog.authorId],
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

// ── Category colour map ───────────────────────────────────────────────────────
const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  'internship-tips': { bg: 'bg-violet-50',  text: 'text-violet-700',  border: 'border-violet-200' },
  'tech-careers':    { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'resume-linkedin': { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200' },
  'career-advice':   { bg: 'bg-indigo-50',  text: 'text-indigo-700',  border: 'border-indigo-200' },
  'interview-prep':  { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200' },
  'industry-trends': { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200' },
}
const fallbackCat = { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' }

// ── Format date ───────────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!slug) notFound()

  const blog = blogs.find((b) => b.slug.toLowerCase() === slug.toLowerCase())
  if (!blog) notFound()

  const author   = authors.find((a) => a.id === blog.authorId)
  const category = categories.find((c) => c.id === blog.categoryId)
  const catStyle = CATEGORY_STYLES[blog.categoryId] ?? fallbackCat

  // Related posts — same category, different slug, max 3
  const related = blogs
    .filter((b) => b.categoryId === blog.categoryId && b.slug !== blog.slug)
    .slice(0, 3)

  // All blogs for "More from InternAdda" (different category)
  const morePosts = blogs
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 4)

  // Extract H2 headings for TOC
  const headingRegex = /<h2[^>]*>(.*?)<\/h2>/g
  const headings: string[] = []
  let match: RegExpExecArray | null
  while ((match = headingRegex.exec(blog.content)) !== null) {
    headings.push(match[1].replace(/<[^>]*>/g, ''))
  }

  // Inject id anchors into h2 tags for scroll-to navigation
  const contentWithAnchors = blog.content.replace(
    /<h2>(.*?)<\/h2>/g,
    (_, text: string) => {
      const id = text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
      return `<h2 id="${id}">${text}</h2>`
    }
  )

  const shareUrl = `https://www.internadda.com/blog/${blog.slug}`
  const shareText = encodeURIComponent(`${blog.title} — ${blog.excerpt}`)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured data */}
      {author && category && (
        <ArticleSchema blog={blog} author={author} category={category} />
      )}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.internadda.com/' },
          { name: 'Blog', url: 'https://www.internadda.com/blog' },
          { name: blog.title, url: shareUrl },
        ]}
      />

      {/* Reading progress bar */}
      <ReadingProgress />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        {/* Breadcrumb */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
            <ChevronRight size={14} />
            <span className="text-gray-600 font-medium truncate max-w-[200px]">{blog.title}</span>
          </nav>
        </div>

        {/* Article header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          {/* Category badge */}
          <div className="flex items-center gap-3 mb-5">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
              <Tag size={10} />
              {category?.name ?? blog.categoryId}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-5">
            {blog.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-gray-500 leading-relaxed mb-7 max-w-3xl font-light">
            {blog.excerpt}
          </p>

          {/* Author + meta row */}
          <div className="flex flex-wrap items-center gap-5">
            {author && (
              <div className="flex items-center gap-3">
                {/* Author avatar — uses Unsplash or placeholder */}
                <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-indigo-100 flex-shrink-0 bg-indigo-50">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                    onError={undefined}
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{author.name}</p>
                  <p className="text-xs text-gray-400">{author.role}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 text-xs text-gray-400 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-indigo-400" />
                {formatDate(blog.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-indigo-400" />
                {blog.readingTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={13} className="text-indigo-400" />
                {headings.length} sections
              </span>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-sky-500 bg-gray-50 hover:bg-sky-50 border border-gray-200 hover:border-sky-200 px-3 py-1.5 rounded-lg transition-all"
              >
                <Twitter size={12} /> Share
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 px-3 py-1.5 rounded-lg transition-all"
              >
                <Linkedin size={12} /> Share
              </a>
            </div>
          </div>
        </div>

        {/* ── FEATURED IMAGE ─────────────────────────────────────────────── */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-0">
          <div className="relative w-full h-[320px] sm:h-[440px] lg:h-[520px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              priority
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
            {/* Subtle gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">

          {/* ── LEFT SIDEBAR — TOC (sticky) ────────────────────────────── */}
          <aside className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0 order-2 lg:order-1">
            <div className="sticky top-24 space-y-6">
              {/* TOC */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-[#1a1063] px-5 py-3.5">
                  <p className="text-white text-xs font-bold uppercase tracking-widest">Table of Contents</p>
                </div>
                <nav className="p-4 space-y-1">
                  {headings.map((heading, i) => {
                    const id = heading
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/[^a-z0-9-]/g, '')
                    return (
                      <a
                        key={i}
                        href={`#${id}`}
                        className="flex items-start gap-2.5 px-3 py-2 rounded-xl text-[12.5px] text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 transition-all group"
                      >
                        <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          {i + 1}
                        </span>
                        <span className="leading-snug">{heading}</span>
                      </a>
                    )
                  })}
                </nav>
              </div>

              {/* Internship CTA */}
              <div className="bg-gradient-to-br from-[#1a1063] to-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-indigo-900/20">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200 mb-2">Free for Students</p>
                <h3 className="text-base font-bold leading-snug mb-3">Browse 500+ Paid Internships in India</h3>
                <p className="text-indigo-200 text-xs leading-relaxed mb-4">Curated roles at top startups, MNCs, and unicorns. Apply in 60 seconds.</p>
                <Link
                  href="/internships"
                  className="block text-center bg-white text-[#1a1063] text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  Browse Internships →
                </Link>
              </div>

              {/* Share sticky */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Share this article</p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#0077b5] text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#006097] transition-colors"
                  >
                    <Linkedin size={13} /> Share on LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    <Twitter size={13} /> Share on X
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* ── ARTICLE BODY ───────────────────────────────────────────── */}
          <article className="flex-1 min-w-0 order-1 lg:order-2">
            {/* The article content */}
            <div
              className="
                bg-white rounded-2xl shadow-sm border border-gray-100
                px-6 sm:px-10 lg:px-14 py-10 sm:py-14
                prose prose-lg max-w-none
                prose-headings:font-extrabold
                prose-headings:text-gray-900
                prose-headings:tracking-tight
                prose-headings:scroll-mt-28
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-3
                prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-[1.85] prose-p:text-[1.0625rem]
                prose-p:mb-5
                prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-em:text-gray-600
                prose-ul:my-4 prose-ol:my-4
                prose-li:text-gray-700 prose-li:leading-relaxed prose-li:my-1.5
                prose-blockquote:border-indigo-400 prose-blockquote:bg-indigo-50/60
                prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                prose-blockquote:text-indigo-800 prose-blockquote:py-2
                prose-code:bg-indigo-50 prose-code:text-indigo-700
                prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
                prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-gray-900 prose-pre:rounded-xl
              "
              dangerouslySetInnerHTML={{ __html: contentWithAnchors }}
            />

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="w-full text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Tagged in</p>
              {blog.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?search=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1 text-sm bg-gray-50 border border-gray-200 text-gray-600 px-3.5 py-1.5 rounded-full hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all font-medium"
                >
                  <Tag size={10} />
                  {tag}
                </Link>
              ))}
            </div>

            {/* ── Author box ─────────────────────────────────────────── */}
            {author && (
              <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-indigo-50 ring-2 ring-indigo-100">
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">About the author</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-0.5">{author.name}</h3>
                    <p className="text-sm text-indigo-600 font-medium mb-3">{author.role}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{author.bio}</p>
                    <div className="flex gap-3 mt-4">
                      {author.linkedin && (
                        <a href={author.linkedin} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#0077b5] px-3 py-1.5 rounded-lg hover:bg-[#006097] transition-colors">
                          <Linkedin size={11} /> LinkedIn
                        </a>
                      )}
                      {author.twitter && (
                        <a href={author.twitter} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                          <Twitter size={11} /> Follow
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Newsletter ─────────────────────────────────────────── */}
            <div className="mt-8">
              <NewsletterSection />
            </div>

            {/* ── Back to blog ───────────────────────────────────────── */}
            <div className="mt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-700 transition-colors group"
              >
                <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                Back to all articles
              </Link>
            </div>
          </article>

          {/* ── RIGHT SIDEBAR ─────────────────────────────────────────── */}
          <aside className="lg:w-64 xl:w-72 flex-shrink-0 order-3">
            <div className="sticky top-24 space-y-6">

              {/* Related posts */}
              {related.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="px-5 py-3.5 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-800 uppercase tracking-widest">Related Articles</p>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {related.map((post) => {
                      const pCat = CATEGORY_STYLES[post.categoryId] ?? fallbackCat
                      return (
                        <Link
                          key={post.slug}
                          href={`/blog/${post.slug}`}
                          className="flex gap-3 p-4 hover:bg-gray-50 transition-colors group"
                        >
                          <div className="relative w-16 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                            <Image
                              src={post.featuredImage}
                              alt={post.title}
                              fill
                              unoptimized
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`text-[9px] font-bold uppercase tracking-widest ${pCat.text}`}>
                              {categories.find(c => c.id === post.categoryId)?.name}
                            </span>
                            <p className="text-[12px] font-semibold text-gray-800 leading-snug mt-0.5 line-clamp-2 group-hover:text-indigo-700 transition-colors">
                              {post.title}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                              <Clock size={9} /> {post.readingTime} min
                            </p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* More from InternAdda */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-5 py-3.5 border-b border-gray-100">
                  <p className="text-xs font-bold text-gray-800 uppercase tracking-widest">More from InternAdda</p>
                </div>
                <div className="p-4 space-y-3">
                  {morePosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="flex items-start gap-2 group"
                    >
                      <ChevronRight size={13} className="text-indigo-400 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      <p className="text-[12.5px] text-gray-700 leading-snug group-hover:text-indigo-700 transition-colors font-medium">
                        {post.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Resume CTA */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-5 text-white shadow-lg">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-100 mb-2">Free Tool</p>
                <h3 className="text-sm font-bold leading-snug mb-2">Build an ATS-Ready Resume in 10 Minutes</h3>
                <p className="text-emerald-100 text-xs leading-relaxed mb-4">Used by 7,200+ students who landed internships at top companies.</p>
                <Link
                  href="/resume-builder"
                  className="block text-center bg-white text-emerald-700 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  Build My Resume →
                </Link>
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* ── BOTTOM — More posts grid ─────────────────────────────────────── */}
      <div className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">Keep Reading</p>
              <h2 className="text-2xl font-extrabold text-gray-900">More Career Insights</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-indigo-600 hover:underline flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {morePosts.map((post) => {
              const pCat = CATEGORY_STYLES[post.categoryId] ?? fallbackCat
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${pCat.text}`}>
                      {categories.find(c => c.id === post.categoryId)?.name}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug mt-1 mb-2 line-clamp-2 group-hover:text-indigo-700 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] text-gray-400">
                      <span className="flex items-center gap-1"><Clock size={9} />{post.readingTime} min</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

    </div>
  )
}

'use client'
// app/blog/page.tsx

import { useState, useMemo } from 'react'
import { blogs } from '@/data/blogs'
import { categories } from '@/data/categories'
import { BlogCard } from '@/components/blog/BlogCard'
import { FeaturedPost } from '@/components/blog/FeaturedPost'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { BlogSearch } from '@/components/blog/BlogSearch'
import { BlogSchema } from '@/components/blog/BlogSchema'
import { NewsletterSection } from '@/components/blog/NewsletterSection'
import { TrustBadges } from '@/components/blog/TrustBadges'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Sparkles, Search, X, TrendingUp, BookOpen } from 'lucide-react'

const CONTAINER = "max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8"

export default function BlogPage({ searchParams }: { searchParams: { category?: string; search?: string } }) {
  const [visibleCount, setVisibleCount] = useState(6)
  const [localSearch, setLocalSearch] = useState(searchParams.search ?? '')

  const categorySlug = searchParams.category
  const searchQuery  = localSearch.toLowerCase()

  const { featuredPost, remainingPosts, popularTags } = useMemo(() => {
    let filtered = blogs

    if (categorySlug) {
      filtered = filtered.filter(b => b.categoryId === categorySlug)
    }

    if (searchQuery) {
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(searchQuery) ||
        b.tags.some(t => t.toLowerCase().includes(searchQuery))
      )
    }

    const sorted = [...filtered].sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    const allTags  = blogs.flatMap(b => b.tags)
    const tagMap   = allTags.reduce((acc, tag) => { acc[tag] = (acc[tag] ?? 0) + 1; return acc }, {} as Record<string, number>)
    const tags     = Object.entries(tagMap).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([t]) => t)

    return { featuredPost: sorted[0], remainingPosts: sorted.slice(1), popularTags: tags }
  }, [categorySlug, searchQuery])

  const displayedPosts = remainingPosts.slice(0, visibleCount)
  const hasMore        = visibleCount < remainingPosts.length

  const clearFilters = () => {
    setLocalSearch('')
    setVisibleCount(6)
  }

  const isFiltered = !!localSearch || !!categorySlug

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden">
        <BlogSchema />

        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <section className="relative bg-white overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[360px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.06) 0%, transparent 70%)' }} />
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.02 }}>
              <defs><pattern id="bg" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#4f46e5" strokeWidth="0.6" />
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#bg)" />
            </svg>
          </div>

          <div className={`relative ${CONTAINER}`}>
            <div className="flex flex-col items-center text-center pt-12 pb-10 sm:pt-14 sm:pb-12 lg:pt-16 lg:pb-14">

              <div className="inline-flex items-center gap-2 border border-indigo-100 bg-indigo-50 rounded-full px-3 py-1.5 mb-5">
                <BookOpen size={11} className="text-indigo-600" />
                <span className="text-[10.5px] font-bold text-indigo-700 uppercase tracking-[0.13em]">Internadda Journal</span>
              </div>

              <h1 className="text-[2rem] sm:text-[2.6rem] xl:text-[3rem] 2xl:text-[3.3rem] font-extrabold text-slate-900 leading-[1.07] tracking-tight mb-4">
                Career <span style={{ color: '#1a1063' }}>Insights & Trends.</span>
              </h1>

              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-[1.75] max-w-lg mb-7">
                Expert advice, student success stories, and industry trends to help you land your dream role in 2026.
              </p>

              {/* Inline search */}
              <div className="w-full max-w-md">
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl shadow-sm px-4 py-2.5 focus-within:border-indigo-300 focus-within:shadow-md transition-all">
                  <Search size={15} className="text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search articles, topics…"
                    value={localSearch}
                    onChange={e => { setLocalSearch(e.target.value); setVisibleCount(6) }}
                    className="flex-1 text-[13.5px] text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
                  />
                  {localSearch && (
                    <button onClick={clearFilters} className="text-slate-400 hover:text-slate-600 transition-colors">
                      <X size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CATEGORY FILTER BAR
        ════════════════════════════════════════ */}
        <div className="border-b border-slate-100 bg-white sticky top-[56px] z-30">
          <div className={CONTAINER}>
            <div className="flex items-center justify-between gap-4 py-3 overflow-x-auto scrollbar-none">
              <CategoryFilter categories={categories} selected={categorySlug} />
              {isFiltered && (
                <button onClick={clearFilters}
                  className="flex-shrink-0 text-[11.5px] font-semibold text-indigo-600 flex items-center gap-1 hover:text-indigo-800 transition-colors whitespace-nowrap">
                  <X size={11} /> Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            CONTENT
        ════════════════════════════════════════ */}
        <div className={`${CONTAINER} py-10 sm:py-12`}>

          {/* Featured post */}
          {featuredPost && !isFiltered && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles size={14} className="text-indigo-500" />
                <h2 className="text-[13px] font-bold text-slate-700 uppercase tracking-[0.13em]">Featured Story</h2>
              </div>
              <FeaturedPost post={featuredPost} />
            </div>
          )}

          {/* Two-col layout: feed + sidebar */}
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">

            {/* ── Main feed ── */}
            <div className="flex-1 min-w-0">

              {/* Results label */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-[12.5px] font-medium text-slate-500">
                  {isFiltered
                    ? <><span className="font-bold text-slate-800">{remainingPosts.length + (featuredPost ? 1 : 0)}</span> result{remainingPosts.length !== 0 ? 's' : ''} found</>
                    : <><span className="font-bold text-slate-800">{remainingPosts.length}</span> articles</>
                  }
                </p>
              </div>

              {displayedPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                    {displayedPosts.map((blog, idx) => (
                      <BlogCard key={blog.slug} blog={blog} priority={idx < 2} />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="flex justify-center mt-10">
                      <button
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="inline-flex items-center gap-2 bg-[#1a1063] hover:bg-indigo-900 text-white text-[13.5px] font-bold px-7 py-3 rounded-xl shadow-sm shadow-indigo-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Load More Articles <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <Search size={22} className="text-slate-300" />
                  </div>
                  <h3 className="text-[14.5px] font-bold text-slate-800 mb-1">No articles found</h3>
                  <p className="text-[13px] text-slate-500 mb-4">Try a different keyword or browse all categories.</p>
                  <button onClick={clearFilters}
                    className="text-[12.5px] font-bold text-indigo-600 border border-indigo-200 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className="lg:w-72 xl:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-28 space-y-5">

                {/* Newsletter */}
                <NewsletterSection />

                {/* Trending topics */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={13} className="text-indigo-500" />
                    <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-[0.14em]">Trending Topics</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {popularTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => { setLocalSearch(tag); setVisibleCount(6) }}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trust badges */}
                <TrustBadges />

              </div>
            </aside>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}

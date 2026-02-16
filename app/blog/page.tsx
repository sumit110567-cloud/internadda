'use client'

import { useState, useMemo } from 'react';
import { blogs } from '@/data/blogs';
import { categories } from '@/data/categories';
import { BlogCard } from '@/components/blog/BlogCard';
import { FeaturedPost } from '@/components/blog/FeaturedPost';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogSchema } from '@/components/blog/BlogSchema';
import { NewsletterSection } from '@/components/blog/NewsletterSection';
import { ConversionCTA } from '@/components/blog/ConversionCTA';
import { TrustBadges } from '@/components/blog/TrustBadges';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function BlogPage({ searchParams }: { searchParams: { category?: string; search?: string } }) {
  const [visibleCount, setVisibleCount] = useState(6);
  
  const categorySlug = searchParams.category;
  const searchQuery = searchParams.search?.toLowerCase();

  const { featuredPost, remainingPosts, popularTags } = useMemo(() => {
    let filtered = blogs;
    
    if (categorySlug) {
      filtered = filtered.filter(b => b.categoryId === categorySlug);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(searchQuery) ||
        b.tags.some(t => t.toLowerCase().includes(searchQuery))
      );
    }

    const sorted = [...filtered].sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const allTags = blogs.flatMap(blog => blog.tags);
    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const tags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);

    return {
      featuredPost: sorted[0],
      remainingPosts: sorted.slice(1),
      popularTags: tags
    };
  }, [categorySlug, searchQuery]);

  const displayedPosts = remainingPosts.slice(0, visibleCount);
  const hasMore = visibleCount < remainingPosts.length;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white font-sans overflow-x-hidden">
        <BlogSchema />

        {/* Unified Hero Section - Matches Home & Courses */}
        <section className="relative bg-gradient-to-b from-indigo-50 via-white to-white pt-12 pb-10 md:pt-20 md:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-indigo-100 text-indigo-700 border-none px-4 py-1.5 rounded-full mb-6 text-xs font-semibold">
              Internadda Journal
            </Badge>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Career <span className="text-indigo-600">Insights & Trends.</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert advice, student success stories, and industry trends to help you 
              land your dream role in 2026.
            </p>
          </div>
        </section>

        {/* Floating Filter Bar - Matches Internship Search Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-gray-100 mb-16">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            
            {/* Desktop Filter: Hidden on mobile, flex on large screens */}
            <div className="hidden lg:flex items-center w-full lg:w-auto">
              <CategoryFilter categories={categories} selected={categorySlug} />
            </div>
      
            {/* Search Bar: Full width on mobile, 1/3 width on desktop */}
            <div className="w-full lg:w-1/3">
              <BlogSearch initialQuery={searchQuery} />
            </div>
      
            {/* Mobile-only Hint (Optional): If you want to show users they are searching all categories */}
            <div className="lg:hidden w-full text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                Searching all categories
              </p>
            </div>
      
          </div>
        </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-24">
              <div className="flex items-center gap-2 mb-8">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Sparkles className="text-indigo-600" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Story</h2>
              </div>
              <FeaturedPost post={featuredPost} />
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Main Blog Feed */}
            <div className="lg:w-2/3">
              {displayedPosts.length > 0 ? (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {displayedPosts.map((blog, idx) => (
                      <BlogCard key={blog.slug} blog={blog} priority={idx < 2} />
                    ))}
                  </div>

                  {/* Unified Button Style */}
                  {hasMore && (
                    <div className="flex justify-center pt-12">
                      <button 
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="group flex items-center gap-2 px-10 py-5 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
                      >
                        Load More Articles
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-3xl border border-dashed border-gray-200 py-20 text-center">
                  <p className="text-gray-400 font-medium">No matches found for your search.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-10 pb-20">
              <div className="sticky top-28 space-y-10">
                <NewsletterSection />

                <ConversionCTA
                  title="Professional Resume Builder"
                  description="Stand out to 500+ hiring partners with our ATS-optimized templates."
                  buttonText="Build My Resume"
                  link="/resume-builder"
                  variant="sidebar"
                />

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-6">Trending Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map(tag => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-medium border border-gray-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <TrustBadges />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

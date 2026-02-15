'use client'

import { useState, useMemo } from 'react';
import { blogs } from '@/data/blogs';
import { categories } from '@/data/categories';
import { HeroSection } from '@/components/HeroSection';
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
import { ArrowRight, Sparkles } from 'lucide-react';

export default function BlogPage({ searchParams }: { searchParams: { category?: string; search?: string } }) {
  const [visibleCount, setVisibleCount] = useState(6);
  
  const categorySlug = searchParams.category;
  const searchQuery = searchParams.search?.toLowerCase();

  // Memoized filtering logic for better performance
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
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen pb-20">
        <BlogSchema />

        <HeroSection
          title="Career Insights & Journal"
          subtitle="Expert advice and industry trends to help you land your dream role in 2026."
          image="/Tech Comp.png"
        />

        {/* Floating search/filter card with glassmorphism */}
        <div className="container mx-auto px-4 -mt-12 relative z-20">
          <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/40 p-6 md:p-10 mb-16">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <CategoryFilter categories={categories} selected={categorySlug} />
              <div className="w-full md:w-auto">
                <BlogSearch initialQuery={searchQuery} />
              </div>
            </div>
          </div>

          {/* Featured post section */}
          {featuredPost && (
            <div className="mb-20">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-blue-600" size={20} />
                <h2 className="text-2xl font-black text-[#0A2647] uppercase tracking-tight">Featured Story</h2>
              </div>
              <FeaturedPost post={featuredPost} />
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Main content area */}
            <main className="lg:w-2/3">
              {displayedPosts.length > 0 ? (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {displayedPosts.map((blog, idx) => (
                      <BlogCard key={blog.slug} blog={blog} priority={idx < 2} />
                    ))}
                  </div>

                  {/* Premium Load More Button */}
                  {hasMore && (
                    <div className="flex justify-center pt-12">
                      <button 
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="group relative px-10 py-5 bg-[#0A2647] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-blue-600 transition-all active:scale-95"
                      >
                        <span className="flex items-center gap-3">
                          Load More Articles
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 py-20 text-center">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No matches found for your search.</p>
                </div>
              )}
            </main>

            {/* Sidebar with specialized conversion elements */}
            <aside className="lg:w-1/3 space-y-10">
              <div className="sticky top-28 space-y-10">
                <NewsletterSection />

                <ConversionCTA
                  title="Professional Resume Builder"
                  description="Stand out to 500+ hiring partners with our ATS-optimized templates."
                  buttonText="Build My Resume"
                  link="/resume-builder"
                  variant="sidebar"
                />

                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
                  <h3 className="font-black text-[#0A2647] uppercase tracking-widest text-xs mb-6">Trending Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map(tag => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-[11px] font-black uppercase border border-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
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
      </div>
      <Footer />
    </>
  );
}

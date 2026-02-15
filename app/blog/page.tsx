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

export default async function BlogPage({ searchParams }: { searchParams: { category?: string; search?: string } }) {
  const categorySlug = searchParams.category;
  const searchQuery = searchParams.search?.toLowerCase();

  let filteredBlogs = blogs;
  if (categorySlug) filteredBlogs = filteredBlogs.filter(b => b.categoryId === categorySlug);
  if (searchQuery) {
    filteredBlogs = filteredBlogs.filter(b =>
      b.title.toLowerCase().includes(searchQuery) ||
      b.tags.some(t => t.toLowerCase().includes(searchQuery))
    );
  }

  // Sort by date (newest first) and pick first as featured (or you can manually set)
  const sorted = [...filteredBlogs].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const featuredPost = sorted[0];
  const remainingPosts = sorted.slice(1);

  // Extract popular tags from all blogs (not just filtered)
  const allTags = blogs.flatMap(blog => blog.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([tag]) => tag);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <BlogSchema />

      <HeroSection
        title="Career Insights & Internships"
        subtitle="Expert advice to help you land your dream role in 2025."
        image="/images/blog-hero.jpg"
      />

      {/* Floating search/filter card */}
      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 mb-16">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <CategoryFilter categories={categories} selected={categorySlug} />
            <BlogSearch initialQuery={searchQuery} />
          </div>
        </div>

        {/* Featured post (if exists) */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Post</h2>
            <FeaturedPost post={featuredPost} />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <main className="lg:w-2/3">
            {remainingPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {remainingPosts.map((blog, idx) => (
                  <BlogCard key={blog.slug} blog={blog} priority={idx < 2} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-12">No posts found.</p>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            <NewsletterSection />

            <ConversionCTA
              title="Need a Professional Resume?"
              buttonText="Get Free Template"
              link="/resume-builder"
              variant="sidebar"
            />

            <TrustBadges />

            {/* Popular Tags */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-lg mb-4 text-gray-900">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 hover:shadow-md transition cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

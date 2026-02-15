// app/blog/page.tsx
import { blogs } from '@/data/blogs';
import { categories } from '@/data/categories';
import { HeroSection } from '@/components/HeroSection';
import { BlogCard } from '@/components/blog/BlogCard';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogSchema } from '@/components/blog/BlogSchema';
import { NewsletterSection } from '@/components/blog/NewsletterSection';
import { ConversionCTA } from '@/components/blog/ConversionCTA';

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

  return (
    <div className="bg-gray-50 min-h-screen">
      <BlogSchema />
      
      <HeroSection 
        title="Career Insights & Internships"
        subtitle="Expert advice to help you land your dream role in 2025."
        image="/images/blog-hero.jpg" 
      />

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <CategoryFilter categories={categories} selected={categorySlug} />
            <BlogSearch initialQuery={searchQuery} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <main className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredBlogs.map((blog, idx) => (
                <BlogCard key={blog.slug} blog={blog} priority={idx < 2} />
              ))}
            </div>
          </main>

          <aside className="lg:w-1/3 space-y-8">
            <NewsletterSection />
            <ConversionCTA 
              title="Need a Professional Resume?" 
              buttonText="Get Template" 
              link="/resume-builder" 
              variant="sidebar"
            />
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Trending Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {['Google Internship', 'Remote Work', 'Free Certificate', 'Government Jobs'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">#{tag}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

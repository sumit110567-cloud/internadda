// app/blog/page.tsx
import { blogs } from '@/data/blogs';
import { categories } from '@/data/categories';
import { FeaturedPost } from '@/components/blog/FeaturedPost';
import { BlogCard } from '@/components/blog/BlogCard';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { Pagination } from '@/components/blog/Pagination';
import { NewsletterSection } from '@/components/blog/NewsletterSection';
import { ConversionCTA } from '@/components/blog/ConversionCTA';
import { TrustBadges } from '@/components/blog/TrustBadges';
import { BlogSchema } from '@/components/blog/BlogSchema';
import { BreadcrumbSchema } from '@/components/blog/BreadcrumbSchema';
import { HeroSection } from '@/components/HeroSection'; // existing hero (unchanged)
import { notFound } from 'next/navigation';

const POSTS_PER_PAGE = 9;

type SearchParams = { page?: string; category?: string; search?: string };

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const page = Number(searchParams.page) || 1;
  const categorySlug = searchParams.category;
  const searchQuery = searchParams.search;

  let title = 'Internship Blog - Internadda';
  let description = 'Explore the latest internships, free courses, and career tips for Indian students.';

  if (categorySlug) {
    const cat = categories.find(c => c.slug === categorySlug);
    if (cat) {
      title = `${cat.name} - Internship Blog | Internadda`;
      description = cat.description;
    }
  }
  if (searchQuery) {
    title = `Search results for "${searchQuery}" - Internadda Blog`;
    description = `Find internships and courses related to "${searchQuery}".`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'Internadda',
      type: 'website',
      url: `https://internadda.com/blog${categorySlug ? `?category=${categorySlug}` : ''}${page > 1 ? `&page=${page}` : ''}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://internadda.com/blog${categorySlug ? `?category=${categorySlug}` : ''}${page > 1 ? `&page=${page}` : ''}`,
    },
  };
}

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const page = Number(searchParams.page) || 1;
  const categorySlug = searchParams.category;
  const searchQuery = searchParams.search?.toLowerCase();

  let filteredBlogs = blogs;

  if (categorySlug) {
    filteredBlogs = filteredBlogs.filter(blog => blog.categoryId === categorySlug);
  }

  if (searchQuery) {
    filteredBlogs = filteredBlogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery) ||
      blog.excerpt.toLowerCase().includes(searchQuery) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    );
  }

  // Sort by published date (newest first)
  filteredBlogs.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const featuredPost = blogs[0]; // pick the most recent or a manually featured one

  // Get unique tags from all blogs for popular tags section
  const allTags = blogs.flatMap(blog => blog.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);

  return (
    <>
      <BlogSchema />
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]} />

      {/* Existing Hero Section (unchanged) */}
      <HeroSection
        title="Internadda Blog"
        subtitle="Your guide to internships, free courses, and career success in India"
        image="/images/blog-hero.jpg"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <FeaturedPost post={featuredPost} />

            <div className="my-8">
              <CategoryFilter categories={categories} selected={categorySlug} />
            </div>

            <div className="my-8">
              <BlogSearch initialQuery={searchQuery} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedBlogs.map(blog => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>

            {paginatedBlogs.length === 0 && (
              <div className="text-center py-12 text-gray-500">No blogs found.</div>
            )}

            <Pagination currentPage={page} totalPages={totalPages} baseUrl="/blog" />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-6">
            <NewsletterSection />
            <ConversionCTA
              title="Ready to start your internship?"
              buttonText="Browse Internships"
              link="/internships"
            />
            <TrustBadges />

            {/* Popular Tags */}
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-3">Popular Tags</h4>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <a
                    key={tag}
                    href={`/blog?search=${encodeURIComponent(tag)}`}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

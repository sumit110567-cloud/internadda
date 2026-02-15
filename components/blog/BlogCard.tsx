// components/blog/BlogCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/data/blogs';
import { formatDate } from '@/lib/utils';

export function BlogCard({ blog }: { blog: BlogPost }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <div className="relative h-52 w-full overflow-hidden">
        <Image 
          src={blog.featuredImage} 
          alt={blog.title} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {blog.categoryId.toUpperCase()}
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-400 text-xs font-medium mb-2">{formatDate(blog.publishedAt)} • {blog.readingTime} min read</p>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {blog.excerpt}
        </p>
        <div className="flex items-center text-blue-600 font-bold text-sm">
          Read Article <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}

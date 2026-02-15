import { BlogPost } from '@/data/blogs';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export function BlogCard({ blog, priority = false }: { blog: BlogPost; priority?: boolean }) {
  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-transparent">
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
            <span className="mx-2">•</span>
            <span>{blog.readingTime} min read</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{blog.excerpt}</p>
          <span className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
            Read More
            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}

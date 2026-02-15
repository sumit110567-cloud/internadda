'use client'; // optional if using client-side interactions, but can be server if no interactivity

import { BlogPost } from '@/data/blogs';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export function BlogCard({ blog }: { blog: BlogPost }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
            <span className="mx-2">•</span>
            <span>{blog.readingTime} min read</span>
          </div>
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-blue-600 transition">
            {blog.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
          <span className="text-blue-600 font-medium inline-flex items-center">
            Read More
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}

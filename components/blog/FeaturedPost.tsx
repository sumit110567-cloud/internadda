import { BlogPost } from '@/data/blogs';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <div className="relative h-80 md:h-96 w-full">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-center text-sm text-gray-200 mb-3">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span className="mx-2">•</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 group-hover:text-blue-300 transition-colors">
            {post.title}
          </h2>
          <p className="text-lg text-gray-200 mb-4 max-w-2xl line-clamp-2">{post.excerpt}</p>
          <span className="inline-flex items-center text-white bg-blue-600 px-6 py-3 rounded-full font-medium group-hover:bg-blue-700 transition">
            Read Featured Article
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

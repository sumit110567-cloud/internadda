import { BlogPost } from '@/data/blogs';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl overflow-hidden">
        <Link href={`/blog/${post.slug}`} className="block md:flex">
          <div className="md:w-1/2 relative h-64 md:h-auto">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            <div className="text-sm text-gray-500 mb-2">
              {formatDate(post.publishedAt)} • {post.readingTime} min read
            </div>
            <h3 className="text-2xl font-bold mb-3 hover:text-blue-600 transition">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <span className="text-blue-600 font-medium inline-flex items-center">
              Read full article
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

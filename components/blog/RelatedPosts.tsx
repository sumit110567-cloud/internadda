import { BlogPost } from '@/data/blogs';
import Link from 'next/link';
import Image from 'next/image';

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200">
      <h4 className="font-semibold mb-3">Related Posts</h4>
      <div className="space-y-4">
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
            <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
              <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
            </div>
            <div>
              <h5 className="font-medium text-sm group-hover:text-blue-600 line-clamp-2">{post.title}</h5>
              <p className="text-xs text-gray-500 mt-1">{post.readingTime} min read</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

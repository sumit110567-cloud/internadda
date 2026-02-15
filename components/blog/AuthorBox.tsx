import { Author } from '@/data/authors';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export function AuthorBox({ author, publishedAt, readingTime }: { author: Author; publishedAt: string; readingTime: number }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg my-6">
      <div className="relative w-16 h-16 rounded-full overflow-hidden">
        <Image src={author.avatar} alt={author.name} fill className="object-cover" />
      </div>
      <div>
        <Link href={`/author/${author.id}`} className="font-semibold hover:text-blue-600">
          {author.name}
        </Link>
        <p className="text-sm text-gray-600">{author.role}</p>
        <p className="text-sm text-gray-500 mt-1">
          {formatDate(publishedAt)} • {readingTime} min read
        </p>
      </div>
    </div>
  );
}

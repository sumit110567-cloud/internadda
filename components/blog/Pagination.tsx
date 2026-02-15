'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Pagination({ currentPage, totalPages, baseUrl }: { currentPage: number; totalPages: number; baseUrl: string }) {
  const searchParams = useSearchParams();

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center items-center space-x-2 my-8">
      {currentPage > 1 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Previous
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <Link
          key={page}
          href={createPageURL(page)}
          className={cn(
            'px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50',
            page === currentPage && 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
          )}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={createPageURL(currentPage + 1)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Next
        </Link>
      )}
    </nav>
  );
}

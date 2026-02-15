'use client';

import { useState, FormEvent } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function BlogSearch({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set('search', query.trim());
    } else {
      params.delete('search');
    }
    params.delete('category');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="flex-1 min-w-[240px] px-5 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white/80"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-md hover:shadow-lg"
      >
        Search
      </button>
    </form>
  );
}

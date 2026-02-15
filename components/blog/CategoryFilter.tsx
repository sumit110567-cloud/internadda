'use client';

import { Category } from '@/data/categories';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export function CategoryFilter({ categories, selected }: { categories: Category[]; selected?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCategoryChange = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    params.delete('search');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => handleCategoryChange(null)}
        className={cn(
          'px-5 py-2 rounded-full text-sm font-medium transition-all border',
          !selected
            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
            : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
        )}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat.slug}
          onClick={() => handleCategoryChange(cat.slug)}
          className={cn(
            'px-5 py-2 rounded-full text-sm font-medium transition-all border',
            selected === cat.slug
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

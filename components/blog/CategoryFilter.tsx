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
    params.delete('page'); // reset to page 1
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleCategoryChange(null)}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition',
          !selected
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        )}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat.slug}
          onClick={() => handleCategoryChange(cat.slug)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition',
            selected === cat.slug
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

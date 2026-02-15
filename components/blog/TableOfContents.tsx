'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function TableOfContents({ headings }: { headings: string[] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const id = heading.toLowerCase().replace(/\s+/g, '-');
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (headings.length === 0) return null;

  return (
    <nav className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h4 className="font-semibold mb-3">Table of Contents</h4>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => {
          const id = heading.toLowerCase().replace(/\s+/g, '-');
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={cn(
                  'block hover:text-blue-600 transition',
                  activeId === id ? 'text-blue-600 font-medium' : 'text-gray-700'
                )}
              >
                {heading}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

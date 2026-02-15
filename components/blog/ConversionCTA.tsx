import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  buttonText: string;
  link: string;
  variant?: 'sidebar' | 'banner' | 'inline';
}

export function ConversionCTA({ title, buttonText, link, variant = 'banner' }: Props) {
  const styles = {
    banner: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl text-center',
    sidebar: 'bg-gray-100 p-5 rounded-lg border border-gray-200',
    inline: 'bg-blue-50 p-4 rounded-lg flex items-center justify-between flex-wrap gap-4',
  };

  return (
    <div className={cn(styles[variant], 'my-6')}>
      <h3 className={cn('font-bold', variant === 'banner' ? 'text-2xl mb-4' : 'text-lg mb-3')}>{title}</h3>
      <Link
        href={link}
        className={cn(
          'inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition',
          variant === 'sidebar' && 'bg-blue-600 text-white hover:bg-blue-700',
          variant === 'banner' && 'bg-white text-blue-600'
        )}
      >
        {buttonText}
      </Link>
    </div>
  );
}

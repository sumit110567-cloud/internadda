import { BlogPost, Author, Category } from '@/data/types';

export function ArticleSchema({ blog, author, category }: { blog: BlogPost; author: Author; category: Category }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blog.featuredImage,
    "datePublished": blog.publishedAt,
    "dateModified": blog.updatedAt || blog.publishedAt,
    "author": {
      "@type": "Person",
      "name": author.name,
      "url": `https://internadda.com/author/${author.id}`,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Internadda",
      "logo": {
        "@type": "ImageObject",
        "url": "https://internadda.com/logo.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://internadda.com/blog/${blog.slug}`,
    },
    "keywords": blog.tags.join(', '),
    "articleSection": category.name,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

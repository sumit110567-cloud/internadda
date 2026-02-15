export function BlogSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Internadda Blog",
    "description": "Your guide to internships, free courses, and career success in India",
    "url": "https://internadda.com/blog",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

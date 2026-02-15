export function FAQSchema({ content }: { content: string }) {
  // Extract FAQ from content (simplified)
  const faqSection = content.match(/<h2.*?>Frequently Asked Questions<\/h2>(.*?)($|<\/h2>)/s);
  if (!faqSection) return null;

  const faqRegex = /<h3.*?>(.*?)<\/h3>\s*<p.*?>(.*?)<\/p>/gs;
  const faqs: { question: string; answer: string }[] = [];
  let match;
  while ((match = faqRegex.exec(faqSection[1])) !== null) {
    faqs.push({ question: match[1].replace(/<[^>]*>/g, ''), answer: match[2].replace(/<[^>]*>/g, '') });
  }

  if (faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

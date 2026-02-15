// data/outlines.ts
export interface BlogOutline {
  title: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  category: string;
  outline: string[]; // section headings
  faqs: { q: string; a: string }[];
}

export const outlines: BlogOutline[] = [
  {
    title: 'How to Get a Remote Internship in India: Complete Guide',
    primaryKeyword: 'remote internship india',
    secondaryKeywords: ['work from home internship', 'virtual internship india'],
    category: 'remote-work',
    outline: [
      'Introduction: The rise of remote work in India',
      'Top platforms to find remote internships',
      'Essential skills for remote internships',
      'How to ace a virtual interview',
      '5 companies hiring remote interns in 2025',
      'Tips for staying productive while working from home',
      'FAQs'
    ],
    faqs: [
      { q: 'Are remote internships paid?', a: 'Yes, most remote internships in India are paid, though stipends may vary.' },
      { q: 'How to apply for remote internships?', a: 'Use platforms like Internshala, LinkedIn, and company career pages with "remote" filter.' },
      // ...
    ]
  },
  // 19 more outlines...
];

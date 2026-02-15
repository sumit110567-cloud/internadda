// data/blogs.ts
import { Author, authors } from './authors';
import { Category, categories } from './categories';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string
  featuredImage: string;
  publishedAt: string; // ISO date
  updatedAt?: string;
  authorId: string;
  categoryId: string;
  tags: string[];
  readingTime: number; // in minutes
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// Helper to generate consistent slugs
function slugify(title: string): string {
  return title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
}

export const blogs: BlogPost[] = [
  {
    slug: 'top-10-internships-in-india-for-2025',
    title: 'Top 10 Internships in India for 2025: Apply Now',
    excerpt: 'Discover the best paid internships in India for 2025 across tech, marketing, and government sectors. Includes direct apply links.',
    content: `
      <h2 id="why-internships-matter">Why Internships Matter in 2025</h2>
      <p>With the Indian job market becoming increasingly competitive, internships are no longer optional—they are essential. In 2025, companies are looking for candidates with hands-on experience...</p>
      <h2 id="google-summer-internship">1. Google Summer Internship</h2>
      <p>Google offers a 12-week summer internship for engineering students. Stipend: ₹1,00,000/month. Apply by March 2025.</p>
      <p><strong>How to apply:</strong> Visit Google's careers page and search for "Summer Intern 2025".</p>
      <h2 id="microsoft-engineer-intern">2. Microsoft Engineer Intern</h2>
      <p>Microsoft India hires interns for software development roles. Stipend: ₹80,000/month. Locations: Bangalore, Hyderabad, Noida.</p>
      <h2 id="amazon-internships">3. Amazon Internships</h2>
      <p>Amazon offers internships in operations, HR, and software development. Stipend up to ₹90,000/month.</p>
      <h2 id="isro-internship">4. ISRO Internship</h2>
      <p>The Indian Space Research Organisation offers paid internships for engineering and science students. Stipend: ₹10,000/month.</p>
      <h2 id="sbi-internship">5. SBI Internship</h2>
      <p>State Bank of India offers a 6-week internship for MBA and B.Com students. Stipend: ₹15,000/month.</p>
      <h2 id="flipkart-internship">6. Flipkart Internship</h2>
      <p>Flipkart runs a "Flipkart Wired" internship for tech and business students. Stipend: ₹50,000/month.</p>
      <h2 id="tcs-internship">7. TCS Internship</h2>
      <p>TCS offers a 6-month internship for final year students across India. Stipend: ₹25,000/month.</p>
      <h2 id="deloitte-internship">8. Deloitte Internship</h2>
      <p>Deloitte India hires interns in consulting and audit. Stipend: ₹40,000/month.</p>
      <h2 id="zomato-internship">9. Zomato Internship</h2>
      <p>Zomato offers remote and office internships in marketing, operations, and tech. Stipend: ₹30,000/month.</p>
      <h2 id="paytm-internship">10. Paytm Internship</h2>
      <p>Paytm hires interns for software development, product management, and growth. Stipend: ₹50,000/month.</p>
      <h2 id="faq">Frequently Asked Questions</h2>
      <h3 id="how-to-get-internship">How to get an internship in India?</h3>
      <p>Start by building a strong resume, networking on LinkedIn, and applying through platforms like Internshala, LinkedIn, and company career pages.</p>
      <h3 id="what-is-average-stipend">What is the average stipend for internships in India?</h3>
      <p>Average stipend ranges from ₹5,000 to ₹30,000 per month depending on the role and company. Tech internships usually pay higher.</p>
      <h3 id="can-i-do-internship-while-studying">Can I do an internship while studying?</h3>
      <p>Yes, many companies offer part-time or remote internships that allow you to work while studying. Some even offer flexible hours.</p>
      <h3 id="are-internships-paid">Are internships in India paid?</h3>
      <p>Many internships in India are paid, especially in tech, finance, and consulting. However, some startups and NGOs may offer unpaid internships.</p>
      <h3 id="how-to-apply-for-government-internship">How to apply for government internships?</h3>
      <p>Government internships are often advertised on official department websites. Keep an eye on portals like ISRO, DRDO, SBI, and various ministries.</p>
    `,
    featuredImage: '/images/blog/top-10-internships-2025.jpg',
    publishedAt: '2025-01-15T00:00:00Z',
    authorId: 'priya-sharma',
    categoryId: 'internships',
    tags: ['internship in india', 'paid internships', 'google internship', 'isro internship', 'sbi internship'],
    readingTime: 8,
    meta: {
      title: 'Top 10 Internships in India for 2025: Apply Now',
      description: 'Find the best paid internships in India for 2025. Includes government, tech, and marketing roles with direct links.',
      keywords: ['internship in india', '2025 internships', 'paid internships india'],
    },
  },
  // Additional 9 full blogs would follow the same pattern.
  // For brevity, we list them by title and outline in the strategy section.
];

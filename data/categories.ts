// data/categories.ts

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  color: string
}

export const categories: Category[] = [
  {
    id: 'career-advice',
    name: 'Career Advice',
    slug: 'career-advice',
    description: 'Actionable tips to accelerate your career growth in India',
    color: 'indigo',
  },
  {
    id: 'internship-tips',
    name: 'Internship Tips',
    slug: 'internship-tips',
    description: 'Everything you need to land and ace your internship',
    color: 'violet',
  },
  {
    id: 'resume-linkedin',
    name: 'Resume & LinkedIn',
    slug: 'resume-linkedin',
    description: 'Craft a profile that gets noticed by recruiters',
    color: 'blue',
  },
  {
    id: 'tech-careers',
    name: 'Tech Careers',
    slug: 'tech-careers',
    description: 'Breaking into product, engineering, and data roles',
    color: 'emerald',
  },
  {
    id: 'industry-trends',
    name: 'Industry Trends',
    slug: 'industry-trends',
    description: 'What\'s shaping the Indian job market in 2025-26',
    color: 'amber',
  },
  {
    id: 'interview-prep',
    name: 'Interview Prep',
    slug: 'interview-prep',
    description: 'Strategies and frameworks to crack any interview',
    color: 'rose',
  },
]

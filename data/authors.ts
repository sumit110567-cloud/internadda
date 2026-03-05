// data/authors.ts

export interface Author {
  id: string
  name: string
  role: string
  bio: string
  avatar: string
  linkedin?: string
  twitter?: string
}

export const authors: Author[] = [
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'Career Coach & Co-founder, InternAdda',
    bio: 'Priya has spent 8 years helping Indian students break into top companies. She has personally mentored 2,000+ students from tier-2 and tier-3 cities land internships at Google, Swiggy, KPMG and more. Former HR at Flipkart.',
    // Reliable professional portrait — Unsplash stable URL
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces&q=80',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  {
    id: 'arjun-mehta',
    name: 'Arjun Mehta',
    role: 'Tech Careers Specialist',
    bio: 'Ex-software engineer at Razorpay and Zepto. Arjun writes about breaking into product and engineering roles right out of college. He has conducted 300+ mock interviews and knows exactly what hiring managers look for.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&q=80',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'kavya-nair',
    name: 'Kavya Nair',
    role: 'Content & Marketing Lead',
    bio: 'Kavya covers career trends, resume writing, and the changing landscape of internships in India. With a background in journalism and 5 years in EdTech, she translates complex hiring data into actionable advice for students.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces&q=80',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'rahul-gupta',
    name: 'Rahul Gupta',
    role: 'Data Science & AI Careers Writer',
    bio: 'Rahul is a data scientist who transitioned into career writing after seeing too many brilliant students fail interviews for lack of guidance. He covers everything AI, ML, and analytics-related for the Indian job market.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces&q=80',
    linkedin: 'https://linkedin.com',
  },
]

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import BlogClientContent from './blog-client-content'

// Enable ultra-low latency via ISR (revalidates every hour)
// This is now safe because we removed 'use client' from this file
export const revalidate = 3600

const blogPosts = [
  {
    id: 1,
    slug: 'getting-started-internship',
    title: 'Getting Started With Your First Internship',
    excerpt: 'A complete guide to landing and succeeding in your first internship opportunity. Learn how to navigate the professional world from day one.',
    category: 'Career Tips',
    author: 'Rajesh Kumar',
    date: '2024-02-01',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
    featured: true,
  },
  {
    id: 2,
    slug: 'resume-tips-2024',
    title: 'Resume Tips That Actually Get You Noticed in 2024',
    excerpt: 'Learn what hiring managers look for in resumes and how to stand out from the crowd with modern formatting.',
    category: 'Job Search',
    author: 'Priya Singh',
    date: '2024-01-28',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    slug: 'interview-questions',
    title: 'Top 20 Interview Questions You\'ll Definitely Get Asked',
    excerpt: 'Prepare for your interviews with these common questions and expert answers curated by HR leaders.',
    category: 'Interview Prep',
    author: 'Aditya Singh',
    date: '2024-01-25',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    slug: 'skills-employers-want',
    title: 'The Top Skills Employers Want in 2024',
    excerpt: 'Discover which soft and hard skills will make you most attractive to employers this year.',
    category: 'Skill Development',
    author: 'Neha Gupta',
    date: '2024-01-20',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70504ac0?w=600&h=400&fit=crop',
  },
]

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Pass the data to the client component for interactivity */}
        <BlogClientContent blogPosts={blogPosts} />
      </main>
      <Footer />
    </>
  )
}

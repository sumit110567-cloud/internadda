import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import BlogPostClient from './blog-post-client'

// Mock Data - In production, this would be a database fetch
const blogPostsData: Record<string, any> = {
  'getting-started-internship': {
    title: 'Getting Started With Your First Internship',
    author: 'Rajesh Kumar',
    date: '2024-02-01',
    readTime: '5 min read',
    category: 'Career Tips',
    excerpt: 'A complete guide to landing and succeeding in your first internship opportunity.',
    content: `
      <h2>Introduction</h2>
      <p>Starting your first internship can be both exciting and overwhelming. This comprehensive guide will help you navigate every step of the journey, from preparation to success.</p>
      <h2>Before You Start</h2>
      <h3>1. Research Your Company</h3>
      <p>Before your first day, spend time understanding your company's mission, values, and recent achievements. This shows genuine interest and helps you align with company culture.</p>
      <h2>Conclusion</h2>
      <p>Your first internship is a stepping stone to your career. Approach it with enthusiasm, stay curious, and don't be afraid to ask questions.</p>
    `,
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPostsData[params.slug]
  return {
    title: post ? `${post.title} | InternAdda Blog` : 'Post Not Found',
    description: post?.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPostsData[params.slug]

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A2647] text-white p-6">
        <h1 className="text-4xl font-black mb-4">Post Not Found</h1>
        <p className="opacity-70 mb-8 text-center">The article you are looking for has moved or does not exist.</p>
        <a href="/blog" className="bg-[#FFD700] text-[#0A2647] px-8 py-3 rounded-xl font-bold">Back to Journal</a>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <BlogPostClient post={post} />
      </main>
      <Footer />
    </>
  )
}

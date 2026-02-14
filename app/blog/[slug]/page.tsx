'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { Calendar, User, Share2, ArrowLeft, Clock, Bookmark } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const blogPostsData: Record<string, any> = {
  'getting-started-internship': {
    title: 'Getting Started With Your First Internship',
    author: 'Rajesh Kumar',
    date: '2024-02-01',
    readTime: '5 min read',
    category: 'Career Tips',
    excerpt: 'A complete guide to landing and succeeding in your first internship opportunity.',
    content: `<h2>Introduction</h2><p>Starting your first internship can be both exciting and overwhelming. This guide will help you navigate the journey.</p><h3>Key Tips</h3><p>Research the company and set clear professional goals.</p>`,
  },
  'resume-tips-2024': {
    title: 'Resume Tips That Actually Get You Noticed in 2024',
    author: 'Priya Singh',
    date: '2024-01-28',
    readTime: '7 min read',
    category: 'Job Search',
    excerpt: 'Learn what hiring managers look for in resumes and how to stand out from the crowd.',
    content: `<h2>Mastering Your Resume</h2><p>In 2024, AI-driven ATS systems are the first hurdle. Use keywords from the job description to pass the filter.</p>`,
  },
  'interview-questions': {
    title: 'Top 20 Interview Questions You\'ll Definitely Get Asked',
    author: 'Aditya Singh',
    date: '2024-01-25',
    readTime: '8 min read',
    category: 'Interview Prep',
    excerpt: 'Prepare for your interviews with these common questions and expert answers.',
    content: `<h2>Common Questions</h2><p>Be ready for "Tell me about yourself" and "Why do you want to work here?".</p>`,
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPostsData[params.slug]

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A2647] text-white p-6">
        <h1 className="text-4xl font-black mb-4">Post Not Found</h1>
        <Link href="/blog" className="bg-[#FFD700] text-[#0A2647] px-8 py-3 rounded-xl font-bold">Back to Journal</Link>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="bg-[#0A2647] pt-24 pb-40 px-4 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <Link href="/blog" className="text-yellow-400 font-bold text-sm uppercase tracking-widest"><ArrowLeft className="inline mr-2" size={16} /> The Journal</Link>
              <Badge className="bg-white/10 text-[#FFD700] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">{post.category}</Badge>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">{post.title}</h1>
              <div className="flex items-center justify-center gap-6 pt-10 border-t border-white/5">
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-[#0A2647] font-black">{post.author[0]}</div><p className="text-white font-black text-sm">{post.author}</p></div>
                <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest"><Calendar size={14} className="text-[#FFD700]" /> {post.date}</div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative -mt-20 px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[3.5rem] shadow-2xl p-8 md:p-16 border border-slate-100">
              <div className="prose prose-blue prose-lg max-w-none prose-headings:text-[#0A2647] prose-headings:font-black prose-p:text-slate-500" dangerouslySetInnerHTML={{ __html: post.content }} />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

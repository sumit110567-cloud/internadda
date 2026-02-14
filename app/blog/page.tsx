'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

// Enable ultra-low latency via ISR (revalidates every hour)
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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
}

export default function BlogPage() {
  const categories = ['All', ...new Set(blogPosts.map((p) => p.category))]
  const featuredPost = blogPosts.find(p => p.featured) || blogPosts[0]
  const regularPosts = blogPosts.filter(p => p.id !== featuredPost.id)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Modern Page Header */}
        <section className="bg-[#0A2647] pt-20 pb-32 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/10 blur-[100px] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto relative z-10">
            <motion.div className="flex flex-col items-center text-center space-y-6" {...fadeInUp}>
              <Badge className="bg-yellow-400/10 text-yellow-400 border-yellow-400/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                The InternAdda Journal
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                Career Insights & <span className="text-yellow-400">Expert Advice.</span>
              </h1>
              <p className="text-blue-100/70 text-lg max-w-2xl font-light">
                Bridging the gap between learning and earning with weekly industry deep-dives.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className={category === 'All' 
                      ? 'bg-white text-[#0A2647] hover:bg-white/90 font-bold rounded-xl' 
                      : 'text-white border border-white/10 hover:bg-white/5 rounded-xl'}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Post Hero */}
        <section className="-mt-16 pb-20 px-4">
          <div className="max-w-[1400px] mx-auto">
            <motion.div 
              className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 grid lg:grid-cols-2 group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative h-64 lg:h-full overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-6 left-6">
                  <Badge className="bg-white/90 backdrop-blur-md text-[#0A2647] font-black px-4 py-2 rounded-xl border-none">
                    FEATURED STORY
                  </Badge>
                </div>
              </div>
              <div className="p-10 lg:p-20 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-blue-600 font-black text-[10px] uppercase tracking-widest mb-6">
                  <Sparkles size={14} /> {featuredPost.category}
                </div>
                <h2 className="text-3xl lg:text-5xl font-black text-[#0A2647] mb-6 leading-tight group-hover:text-blue-700 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-500 text-lg mb-8 font-medium leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 p-2.5 rounded-full text-[#0A2647]">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#0A2647]">{featuredPost.author}</p>
                      <p className="text-xs text-slate-400 font-bold">{featuredPost.readTime}</p>
                    </div>
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Button className="bg-[#0A2647] hover:bg-blue-900 text-white p-4 rounded-2xl h-14 w-14 shadow-xl">
                      <ArrowRight />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Regular Posts Grid */}
        <section className="py-20 bg-slate-50/50">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-12">
               <h3 className="text-2xl font-black text-[#0A2647]">Latest Updates</h3>
               <div className="h-0.5 flex-1 bg-slate-200 mx-8 hidden md:block" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {regularPosts.map((post) => (
                <motion.article
                  key={post.id}
                  className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all group"
                  {...fadeInUp}
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#0A2647] text-white font-bold border-none px-3 py-1.5 rounded-lg">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                    </div>
                    <h4 className="text-xl font-black text-[#0A2647] mb-4 group-hover:text-blue-700 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h4>
                    <p className="text-slate-500 text-sm mb-8 line-clamp-2 font-medium">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[#0A2647] font-black text-sm group-hover:gap-4 transition-all"
                    >
                      Read Full Article <ArrowRight size={18} className="text-blue-600" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Newsletter Section */}
        <section className="py-24 px-4 bg-white flex flex-col items-center">
          <div className="max-w-[1400px] w-full">
            <div className="bg-[#0A2647] rounded-[3.5rem] p-10 md:p-20 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-400/5 blur-[100px] pointer-events-none" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                    Stay Ahead of the <br />
                    <span className="text-yellow-400">Career Curve.</span>
                  </h2>
                  <p className="text-blue-100/70 text-lg font-light">
                    Join 7,200+ students receiving curated internship alerts and career growth hacks every Tuesday.
                  </p>
                </div>
                <form className="bg-white/10 backdrop-blur-md p-3 rounded-[2rem] border border-white/10 flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-5 bg-transparent text-white placeholder:text-blue-100/40 focus:outline-none font-medium"
                  />
                  <Button className="bg-yellow-400 text-[#0A2647] hover:bg-white px-8 py-5 rounded-2xl font-black shadow-xl transition-all active:scale-95">
                    Subscribe Now
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

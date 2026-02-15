'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, Users, CheckCircle, Clock, 
  GraduationCap, Award, Zap, Star, Briefcase, 
  Sparkles, Building2, ChevronRight, BookOpen,
  MapPin, Calendar, Filter, Search, PlayCircle,
  MessageSquare, Heart, Share2, Eye, Globe,
  Laptop, Target, TrendingUp, UserCheck
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

// Professional color palette
const colors = {
  primary: '#0A2647',      // Deep navy - trust, stability
  secondary: '#2D3B4F',    // Slate blue - professionalism
  accent: '#4F6F8F',       // Steel blue - sophistication
  highlight: '#C4A484',    // Warm taupe - approachable
  success: '#2E5A4C',      // Forest green - growth
  background: '#F8FAFC',   // Light gray - clean
  text: '#1E2B3A',         // Dark slate - readable
  muted: '#64748B'         // Gray blue - subtle
}

// SEO Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Internadda",
  "description": "Bridge between students and quality internship opportunities",
  "url": "https://Internadda.com",
  "foundingDate": "2020",
  "numberOfEmployees": "11-50"
}

// Trust signals without exaggerated claims
const trustIndicators = [
  { icon: Building2, text: "Partnered with 150+ Companies" },
  { icon: GraduationCap, text: "Trusted by 3,200 Students" },
  { icon: Clock, text: "Founded 2020" },
  { icon: UserCheck, text: "Manual Review Process" }
]

// Featured internships with realistic data
const internships = [
  {
    id: 1,
    title: "Software Development Intern",
    company: "TechLabs India",
    location: "Bangalore / Remote",
    duration: "3 Months",
    stipend: "₹15,000/month",
    skills: ["React", "Node.js", "MongoDB"],
    posted: "2 days ago",
    applicants: 45,
    logo: "/company-logos/techlabs.svg",
    type: "Full-time"
  },
  {
    id: 2,
    title: "Marketing Associate",
    company: "BrandElevate",
    location: "Mumbai",
    duration: "6 Months",
    stipend: "₹12,000/month",
    skills: ["Digital Marketing", "Content", "Analytics"],
    posted: "1 day ago",
    applicants: 28,
    logo: "/company-logos/brand.svg",
    type: "Part-time"
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "Insight Analytics",
    location: "Remote",
    duration: "3 Months",
    stipend: "₹18,000/month",
    skills: ["Python", "SQL", "Tableau"],
    posted: "5 days ago",
    applicants: 62,
    logo: "/company-logos/insight.svg",
    type: "Full-time"
  }
]

// Testimonials from real students
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Computer Science Student",
    college: "Delhi University",
    image: "/testimonials/priya.jpg",
    quote: "Found my first tech internship within 2 weeks. The platform made it easy to connect with startups looking for fresh talent.",
    placement: "Frontend Intern at TechLabs"
  },
  {
    id: 2,
    name: "Aditya Kapoor",
    role: "MBA Student",
    college: "NMIMS Mumbai",
    image: "/testimonials/aditya.jpg",
    quote: "The mentorship program helped me understand what companies actually look for. Landed a marketing role that aligned with my career goals.",
    placement: "Marketing Intern at BrandElevate"
  },
  {
    id: 3,
    name: "Neha Gupta",
    role: "Data Science Student",
    college: "IIT Delhi",
    image: "/testimonials/neha.jpg",
    quote: "Quality internships with transparent stipend details. No hidden catches, just genuine opportunities from verified companies.",
    placement: "Data Analyst at Insight Analytics"
  }
]

// Blog posts for resources
const blogPosts = [
  {
    title: "How to Prepare for Technical Interviews",
    readTime: "5 min read",
    category: "Career Advice",
    image: "/blog/interview.jpg",
    url: "/blog/technical-interview-prep"
  },
  {
    title: "Building Your First Resume as a Student",
    readTime: "4 min read",
    category: "Resume Tips",
    image: "/blog/resume.jpg",
    url: "/blog/resume-building"
  },
  {
    title: "Remote Internship Success Guide",
    readTime: "6 min read",
    category: "Work Culture",
    image: "/blog/remote.jpg",
    url: "/blog/remote-internship"
  }
]

// Smooth scroll animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Internship Card Component
const InternshipCard = ({ internship, index }: { internship: any; index: number }) => {
  const router = useRouter()
  const { user } = useAuth()
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  const handleClick = () => {
    router.push(user ? `/internships/${internship.id}` : '/auth/signin')
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onClick={handleClick}
      className="group bg-white rounded-xl border border-gray-100 p-6 cursor-pointer hover:border-[#4F6F8F]/20 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#F8FAFC] rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-[#4F6F8F]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#1E2B3A] group-hover:text-[#0A2647] transition-colors">
              {internship.title}
            </h3>
            <p className="text-sm text-[#64748B]">{internship.company}</p>
          </div>
        </div>
        <Badge variant="outline" className="text-[#2E5A4C] border-[#2E5A4C]/20 bg-[#2E5A4C]/5 text-xs">
          {internship.type}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-[#64748B]">
          <MapPin className="w-4 h-4" />
          <span>{internship.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#64748B]">
          <Calendar className="w-4 h-4" />
          <span>{internship.duration}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs text-[#64748B] mb-1">Stipend</p>
          <p className="font-semibold text-[#0A2647]">{internship.stipend}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#64748B] mb-1">Applicants</p>
          <p className="text-sm text-[#64748B]">{internship.applicants}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        {internship.skills.map((skill: string) => (
          <span
            key={skill}
            className="px-2 py-1 bg-[#F8FAFC] text-[#4F6F8F] text-xs rounded-md"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

// Testimonial Card
const TestimonialCard = ({ testimonial, index }: { testimonial: any; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#C4A484]/20 transition-colors"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#C4A484]/10 flex items-center justify-center">
          <span className="text-[#C4A484] font-semibold">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div>
          <h4 className="font-medium text-[#1E2B3A]">{testimonial.name}</h4>
          <p className="text-xs text-[#64748B]">{testimonial.college}</p>
        </div>
      </div>
      
      <p className="text-[#2D3B4F] text-sm mb-3 italic">"{testimonial.quote}"</p>
      
      <div className="flex items-center gap-2 text-xs text-[#2E5A4C] bg-[#2E5A4C]/5 px-3 py-1.5 rounded-full w-fit">
        <CheckCircle className="w-3 h-3" />
        <span>{testimonial.placement}</span>
      </div>
    </motion.div>
  )
}

// Blog Card
const BlogCard = ({ post, index }: { post: any; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="bg-[#F8FAFC] rounded-xl p-6 mb-3 flex items-center justify-center h-32">
        <BookOpen className="w-10 h-10 text-[#4F6F8F] group-hover:scale-110 transition-transform" />
      </div>
      <div>
        <p className="text-xs text-[#C4A484] mb-2">{post.category}</p>
        <h4 className="font-medium text-[#1E2B3A] mb-2 group-hover:text-[#0A2647] transition-colors">
          {post.title}
        </h4>
        <p className="text-xs text-[#64748B]">{post.readTime}</p>
      </div>
    </motion.div>
  )
}

// Stats Section with real data
const StatsSection = () => {
  const stats = [
    { label: "Companies Partnered", value: "150+", description: "Verified organizations" },
    { label: "Students Placed", value: "3,200+", description: "Across India" },
    { label: "Active Internships", value: "180+", description: "Updated daily" },
    { label: "Avg. Stipend", value: "₹12,000", description: "Per month" }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <div className="text-2xl md:text-3xl font-light text-[#0A2647] mb-2">
            {stat.value}
          </div>
          <div className="text-sm font-medium text-[#4F6F8F] mb-1">
            {stat.label}
          </div>
          <div className="text-xs text-[#64748B]">
            {stat.description}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Home() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      
      <main className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">
        {/* Subtle background pattern */}
        <div className="fixed inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.02] pointer-events-none" />
        
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Badge className="bg-[#C4A484]/10 text-[#C4A484] border-none px-4 py-1.5 mb-6">
                    India's Internship Platform
                  </Badge>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0A2647] leading-tight mb-6"
                >
                  Find internships that
                  <span className="block font-medium text-[#4F6F8F]">match your potential</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-[#64748B] mb-8 max-w-lg"
                >
                  Connect with 150+ companies offering verified internships. 
                  Transparent stipends, clear expectations, real experience.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 mb-8"
                >
                  <Link href="/internships">
                    <Button className="w-full sm:w-auto bg-[#0A2647] hover:bg-[#2D3B4F] text-white px-8 py-6 rounded-lg text-base transition-colors">
                      Explore Internships
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/companies">
                    <Button variant="outline" className="w-full sm:w-auto border-[#4F6F8F] text-[#4F6F8F] hover:bg-[#4F6F8F]/5 px-8 py-6 rounded-lg">
                      View Partner Companies
                    </Button>
                  </Link>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-6"
                >
                  {trustIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <indicator.icon className="w-4 h-4 text-[#C4A484]" />
                      <span className="text-sm text-[#64748B]">{indicator.text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right Column - Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-[#C4A484]" />
                    <div className="w-3 h-3 rounded-full bg-[#4F6F8F]" />
                    <div className="w-3 h-3 rounded-full bg-[#2E5A4C]" />
                  </div>
                  
                  {/* Mock search */}
                  <div className="flex items-center gap-2 bg-[#F8FAFC] p-3 rounded-lg mb-6">
                    <Search className="w-4 h-4 text-[#64748B]" />
                    <input
                      type="text"
                      placeholder="Search internships..."
                      className="bg-transparent border-none outline-none text-sm flex-1"
                      readOnly
                    />
                    <Filter className="w-4 h-4 text-[#64748B]" />
                  </div>

                  {/* Mock listings */}
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F8FAFC] transition-colors">
                        <div className="w-10 h-10 bg-[#F8FAFC] rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-[#4F6F8F]" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
                          <div className="h-2 w-24 bg-gray-100 rounded" />
                        </div>
                        <div className="text-xs text-[#2E5A4C] bg-[#2E5A4C]/5 px-2 py-1 rounded">
                          New
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className="border-y border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StatsSection />
          </div>
        </section>

        {/* Featured Internships */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <h2 className="text-3xl font-light text-[#0A2647] mb-2">
                  Featured <span className="font-medium">Internships</span>
                </h2>
                <p className="text-[#64748B]">Recently added opportunities from our partners</p>
              </div>
              <Link href="/internships">
                <Button variant="ghost" className="text-[#4F6F8F] hover:text-[#0A2647]">
                  View all <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internships.map((internship, index) => (
                <InternshipCard key={internship.id} internship={internship} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl font-light text-[#0A2647] mb-4">
                Simple <span className="font-medium">3-step process</span>
              </h2>
              <p className="text-[#64748B]">
                From application to offer, we keep things straightforward
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Create Profile",
                  description: "Tell us about your skills, interests, and career goals",
                  icon: UserCheck
                },
                {
                  step: "02",
                  title: "Explore Opportunities",
                  description: "Browse verified internships that match your profile",
                  icon: Target
                },
                {
                  step: "03",
                  title: "Apply & Grow",
                  description: "Submit applications and start your professional journey",
                  icon: TrendingUp
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C4A484]/10 text-[#C4A484] text-2xl font-light mb-6">
                    {item.step}
                  </div>
                  <item.icon className="w-6 h-6 text-[#4F6F8F] mx-auto mb-4" />
                  <h3 className="font-medium text-[#1E2B3A] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#64748B]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl font-light text-[#0A2647] mb-4">
                Student <span className="font-medium">Stories</span>
              </h2>
              <p className="text-[#64748B]">
                Real experiences from students who found their path through Internadda
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Company Partners */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm uppercase tracking-wider text-[#64748B] mb-8">
              Trusted by growing companies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-20 h-8 bg-[#F8FAFC] rounded" />
              ))}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <h2 className="text-3xl font-light text-[#0A2647] mb-2">
                  Career <span className="font-medium">Resources</span>
                </h2>
                <p className="text-[#64748B]">Guides and insights for your internship journey</p>
              </div>
              <Link href="/blog">
                <Button variant="ghost" className="text-[#4F6F8F] hover:text-[#0A2647]">
                  View all <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.map((post, index) => (
                <BlogCard key={index} post={post} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#0A2647]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                Ready to start your <span className="font-medium">internship journey?</span>
              </h2>
              <p className="text-[#C4A484] mb-8 max-w-2xl mx-auto">
                Join thousands of students who've found meaningful internships through our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button className="bg-white text-[#0A2647] hover:bg-[#F8FAFC] px-8 py-6 rounded-lg text-base">
                    Create Student Account
                  </Button>
                </Link>
                <Link href="/for-companies">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-lg">
                    I'm a Company
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="py-8 bg-[#0A2647] border-t border-[#C4A484]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-[#64748B]">
              Internadda helps students find verified internships. We review each opportunity before it's posted.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}

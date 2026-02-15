'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight, Users, CheckCircle, Shield, Zap,
  GraduationCap, Award, Star, Briefcase, Sparkles,
  Building2, ChevronRight, TrendingUp, Globe2,
  Target, Brain, Code2, Palette, Mic, Rocket,
  BookOpen, Laptop, BarChart3, MessageSquare, Coffee,
  HeartHandshake, Infinity, Workflow, Binary, Hexagon
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

// --- Data (kept exactly as original) ---
const featuredInternships = [
  {
    id: '1',
    title: 'Senior Python Developer',
    company: 'Arjuna AI Solutions',
    stipend: '₹50,000 - ₹80,000',
    location: 'Remote',
    skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    applicants: 45,
    image: '/python.jpg',
    otherCompaniesCount: 12,
    companyLogos: ['/company1.jpg', '/company2.jpg', '/company3.jpg'],
    matchScore: 96
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'TechCorp India',
    stipend: '₹60,000 - ₹90,000',
    location: 'Hybrid',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    applicants: 32,
    image: '/react.jpg',
    otherCompaniesCount: 8,
    companyLogos: ['/company4.jpg', '/company5.jpg', '/company1.jpg'],
    matchScore: 94
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    stipend: '₹70,000 - ₹1,00,000',
    location: 'Remote',
    skills: ['Python', 'TensorFlow', 'SQL', 'PyTorch'],
    applicants: 28,
    image: '/datascience.jpg',
    otherCompaniesCount: 15,
    companyLogos: ['/company2.jpg', '/company3.jpg', '/company4.jpg'],
    matchScore: 92
  },
]

const features = [
  { icon: Shield, title: 'Verified Opportunities', desc: 'Every internship is manually vetted for quality' },
  { icon: Zap, title: 'Quick Apply', desc: 'Apply in seconds with your smart profile' },
  { icon: Brain, title: 'AI Matching', desc: 'Get personalized recommendations' },
  { icon: GraduationCap, title: 'Skill Development', desc: 'Access curated learning resources' },
  { icon: Users, title: 'Mentor Network', desc: 'Connect with industry experts' },
  { icon: Award, title: 'Certification', desc: 'Earn verifiable credentials' },
]

const successStories = [
  {
    name: 'Rahul Sharma',
    role: 'SDE at InternAdda',
    image: '/student1.jpg',
    quote: 'The personalized mentorship and skill assessments helped me crack my first job.'
  },
  {
    name: 'siddhant chaturvedi',
    role: 'Researcher at LAREX',
    image: '/student2.jpg',
    quote: 'Found opportunities I never knew existed. The platform is a game-changer!'
  },
  {
    name: 'Anjali Patel',
    role: 'Ai Developer Manager at Arjuna-Ai',
    image: '/student3.jpg',
    quote: 'From intern to full-time – the journey was seamless with InternAdda.'
  },
]

// --- Helper Components ---
const Counter = ({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) => (
  <div className="text-center">
    <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
      {value.toLocaleString()}{suffix}
    </div>
    <div className="text-sm text-slate-600">{label}</div>
  </div>
)

const HeroVisual = () => (
  <div className="relative w-full h-full min-h-[400px] lg:min-h-0">
    {/* Clean grid of subtle cards */}
    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-3xl border border-slate-200 shadow-sm">
      <div className="space-y-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <Briefcase className="text-blue-600 mb-2" size={24} />
          <div className="h-2 w-16 bg-slate-200 rounded-full mb-2" />
          <div className="h-2 w-12 bg-slate-100 rounded-full" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <Users className="text-blue-600 mb-2" size={24} />
          <div className="h-2 w-16 bg-slate-200 rounded-full mb-2" />
          <div className="h-2 w-12 bg-slate-100 rounded-full" />
        </div>
      </div>
      <div className="space-y-3 mt-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <Target className="text-blue-600 mb-2" size={24} />
          <div className="h-2 w-16 bg-slate-200 rounded-full mb-2" />
          <div className="h-2 w-12 bg-slate-100 rounded-full" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <TrendingUp className="text-blue-600 mb-2" size={24} />
          <div className="h-2 w-16 bg-slate-200 rounded-full mb-2" />
          <div className="h-2 w-12 bg-slate-100 rounded-full" />
        </div>
      </div>
    </div>
    {/* Very subtle floating card (optional, minimal) */}
    <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-lg border border-slate-200 shadow-md hidden lg:block">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
          <Sparkles className="text-blue-600" size={16} />
        </div>
        <div>
          <p className="text-xs text-slate-400">AI Match</p>
          <p className="text-sm font-medium text-slate-900">94% compatibility</p>
        </div>
      </div>
    </div>
  </div>
)

const InternshipCard = ({ id, title, company, stipend, location, skills, applicants, image }: any) => {
  const { user } = useAuth()
  const router = useRouter()

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`)
  }

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative h-40 w-full bg-slate-100">
        {image && (
          <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-600 flex items-center gap-1 mb-3">
          <Building2 size={14} className="text-slate-400" />
          {company}
        </p>
        <div className="flex justify-between items-center mb-3 text-sm">
          <span className="font-semibold text-slate-900">{stipend}</span>
          <span className="text-slate-500">{location}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {skills.slice(0, 3).map((skill: string) => (
            <span key={skill} className="bg-slate-100 px-2 py-0.5 rounded-full text-xs text-slate-700">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
          <span className="flex items-center gap-1"><Users size={14} /> {applicants} applicants</span>
        </div>
        <Button onClick={handleApply} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl font-medium">
          {user ? 'Apply Now' : 'Get Started'}
          <ArrowRight className="ml-2" size={16} />
        </Button>
      </div>
    </article>
  )
}

const SuccessStory = ({ name, role, image, quote }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex items-center gap-4 mb-4">
      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-100">
        {image && <Image src={image} alt={name} fill className="object-cover" sizes="56px" />}
      </div>
      <div>
        <h4 className="font-semibold text-slate-900">{name}</h4>
        <p className="text-sm text-blue-600">{role}</p>
      </div>
    </div>
    <p className="text-slate-600 text-sm leading-relaxed">"{quote}"</p>
    <div className="flex gap-1 mt-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  </div>
)

// --- Main Page ---
export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* 1. Minimal Trust Header Strip */}
        <div className="border-b border-slate-200 bg-slate-50 py-2">
          <p className="text-center text-sm text-slate-600 font-medium">
            Trusted by <span className="text-blue-600 font-semibold">7,200+ students</span> across India
          </p>
        </div>

        {/* 2. Full-Screen Hero */}
        <section className="min-h-screen flex items-center py-28 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 rounded-full mb-6 inline-flex items-center gap-1">
                    <Sparkles size={14} />
                    India's #1 Internship Platform
                  </Badge>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-4"
                >
                  India's Largest Dedicated{' '}
                  <span className="text-blue-600">Internship Ecosystem.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0"
                >
                  Connect with 200+ verified companies. Get personalized matches, skill assessments, and mentorship from industry experts.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                >
                  <Link href="/internships">
                    <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base rounded-xl shadow-md">
                      Explore Opportunities
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button variant="outline" className="w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-6 text-base rounded-xl">
                      Explore Courses
                    </Button>
                  </Link>
                </motion.div>

                {/* Inline Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap items-center gap-6 justify-center lg:justify-start"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">7,200+</span> students placed
                  </p>
                  <div className="w-px h-6 bg-slate-200 hidden sm:block" />
                  <div className="flex gap-4">
                    <div>
                      <span className="font-bold text-slate-900">500+</span>
                      <span className="text-xs text-slate-500 ml-1">Active Roles</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">48h</span>
                      <span className="text-xs text-slate-500 ml-1">Avg Response</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:block"
              >
                <HeroVisual />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Authority Stats Section */}
        <section className="py-24 border-y border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Counter value={200} label="Active Companies" suffix="+" />
              <Counter value={7200} label="Students Placed" suffix="+" />
              <Counter value={500} label="Live Internships" suffix="+" />
              <Counter value={6500} label="Avg. Stipend" suffix="+" />
            </div>
          </div>
        </section>

        {/* 4. Featured Internships Section */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 mb-3">
                Curated Opportunities
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Premium Internships
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Hand-picked opportunities from top companies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredInternships.map((internship) => (
                <InternshipCard key={internship.id} {...internship} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/internships">
                <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50">
                  View All Opportunities <ChevronRight className="ml-1" size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Why InternAdda Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 mb-3">
                Why InternAdda
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Comprehensive platform designed to accelerate your career growth
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Social Proof / Success Stories */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 mb-3">
                Success Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Real Stories, Real Success
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Hear from students who transformed their careers with InternAdda
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {successStories.map((story, idx) => (
                <SuccessStory key={idx} {...story} />
              ))}
            </div>
          </div>
        </section>

        {/* 7. Strong Final CTA */}
        <section className="bg-blue-600 py-28">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Launch Your Career?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join 7,200+ students who have already found their dream internships
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-base rounded-xl shadow-lg">
                  Create Free Account
                  <Rocket className="ml-2" size={18} />
                </Button>
              </Link>
              <Link href="/internships">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700 px-8 py-6 text-base rounded-xl">
                  Browse Internships
                </Button>
              </Link>
            </div>
            <p className="text-sm text-blue-200 mt-6">
              No credit card required • Free forever • 94% placement rate
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

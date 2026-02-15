'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight, Users, CheckCircle, Shield, Clock,
  GraduationCap, Award, Zap, Star, Briefcase,
  Sparkles, TrendingUp, Globe2, Rocket, Target,
  Brain, Code2, Palette, Mic, Building2, Network,
  Gem, Crown, ChevronRight, Play, BookOpen, Laptop,
  BarChart3, MessageSquare, Coffee, HeartHandshake,
  Infinity, Orbit, Workflow, Binary, CandlestickChart,
  Waves, Crosshair, GanttChartSquare, Hexagon,
  MapPin, Clock3, Wifi, WifiOff, Briefcase as BriefcaseIcon,
  Medal, ThumbsUp, ChevronDown, FileCheck, LayoutGrid,
  ExternalLink, CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

// ---------- Data (unchanged from original) ----------
const featuredInternships = [
  {
    id: '1',
    title: 'Senior Python Developer',
    company: 'Arjuna AI Solutions',
    stipend: '₹5,000 - ₹8,000',
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
    stipend: '₹4,000 - ₹7,000',
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
    stipend: '₹4,000 - ₹10,000',
    location: 'Remote',
    skills: ['Python', 'TensorFlow', 'SQL', 'PyTorch'],
    applicants: 28,
    image: '/datascience.jpg',
    otherCompaniesCount: 15,
    companyLogos: ['/company2.jpg', '/company3.jpg', '/company4.jpg'],
    matchScore: 92
  },
]

const partners = [
  { name: 'Microsoft', logo: '/microsoft.svg', category: 'Technology' },
  { name: 'Google', logo: '/google.svg', category: 'Technology' },
  { name: 'Amazon', logo: '/amazon.svg', category: 'E-commerce' },
  { name: 'Meta', logo: '/meta.svg', category: 'Social Media' },
  { name: 'Adobe', logo: '/adobe.svg', category: 'Creative' },
  { name: 'Salesforce', logo: '/salesforce.svg', category: 'CRM' },
]

const successStories = [
  {
    name: 'Rahul Sharma',
    role: 'SDE at Internadda',
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
    quote: 'From intern to full-time - the journey was seamless with Internadda.'
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

const students = [
  { name: 'Ravi', img: 'https://iili.io/fmKACQa.md.jpg' },
  { name: 'Priya', img: 'https://iili.io/fmKMLV2.md.jpg' },
  { name: 'Amit', img: 'https://iili.io/fmKMQPS.jpg' },
  { name: 'Neha', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop' }
]

// ---------- Reusable Motion Components ----------
const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
)

// ---------- Counter Component (fixed IntersectionObserver) ----------
const Counter = ({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [hasTriggered, setHasTriggered] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!ref.current || hasTriggered) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true)
          let start: number
          const duration = 2000
          const step = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            setCount(Math.floor(progress * value))
            if (progress < 1) {
              requestAnimationFrame(step)
            }
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasTriggered, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">{count}{suffix}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  )
}

// ---------- FAQ Accordion ----------
const faqs = [
  { q: 'How does InternAdda verify internships?', a: 'We manually review every opportunity and verify company credentials before listing.' },
  { q: 'Is there any cost to use InternAdda?', a: 'No, the platform is completely free for students. We earn from partner companies.' },
  { q: 'How long does it take to get a response?', a: 'Average response time is under 24 hours for verified applications.' },
  { q: 'Can I apply to multiple internships?', a: 'Yes, you can apply to unlimited opportunities with your smart profile.' },
]

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full justify-between items-center text-left font-medium text-slate-900 hover:text-blue-700"
      >
        <span>{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="mt-2 text-slate-600 text-sm">{answer}</p>}
    </div>
  )
}

// ---------- Main Home Component ----------
export default function Home() {
  const router = useRouter()
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('All Internships')

  const handleApply = (id: string) => {
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden">
        {/* 1️⃣ SEO-Friendly Top Bar + Trust Bar */}
        <div className="bg-slate-50 border-b border-slate-200 py-2 text-xs text-slate-600">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-1">
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-blue-700" /> 7,200+ students placed</span>
            <span className="flex items-center gap-1"><Medal size={14} className="text-blue-700" /> 12,000+ internships matched</span>
            <span className="flex items-center gap-1"><ThumbsUp size={14} className="text-blue-700" /> 98% satisfaction</span>
          </div>
        </div>

        {/* 2️⃣ Hero Section — Full Bleed Visual */}
        <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <FadeUp>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 px-3 py-1 text-xs font-semibold">
                  <CheckCircle2 size={14} className="inline mr-1" /> MSME Registered: UDYAM-MH-08-XXXXXXXX
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4">
                  India's Largest Dedicated{' '}
                  <span className="text-violet-600">Internship Ecosystem.</span>
                </h1>
                <p className="text-base text-slate-500 max-w-xl mb-6 leading-relaxed">
                  Skip the generic job boards. Access a streamlined pipeline of verified corporate partners.
                  Focus on skill-based hiring with transparent stipends and direct interviews.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link href="/internships">
                    <Button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-base rounded-lg shadow-sm">
                      Find Internships <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button variant="outline" className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-base rounded-lg">
                      Practice Mode
                    </Button>
                  </Link>
                </div>

                {/* Social proof */}
                <div className="flex flex-col items-start gap-4 text-slate-400">
                  <div className="flex -space-x-2">
                    {students.map((s, i) => (
                      <img
                        key={i}
                        src={s.img}
                        alt={s.name}
                        className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${s.name}&background=random`
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">7,000+ Students Placed</p>
                </div>
              </FadeUp>

              {/* Right visual - gradient graphic with floating elements */}
              <FadeUp delay={0.2} className="hidden lg:block">
                <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl aspect-[4/3]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-violet-100">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                  </div>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur shadow-sm rounded text-[10px] font-bold text-violet-600 uppercase tracking-widest">
                      Our Collaborations
                    </span>
                  </div>
                  {/* Floating icons */}
                  <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-white/30 backdrop-blur rounded-xl rotate-12 flex items-center justify-center shadow-lg border border-white/50">
                    <Briefcase className="text-violet-600 w-10 h-10" />
                  </div>
                  <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/30 backdrop-blur rounded-xl -rotate-6 flex items-center justify-center shadow-lg border border-white/50">
                    <GraduationCap className="text-blue-700 w-10 h-10" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-tr from-violet-500 to-blue-500 rounded-full opacity-20 blur-2xl" />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 3️⃣ Category Quick Filter */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: Wifi, label: 'Remote' },
                { icon: WifiOff, label: 'Hybrid' },
                { icon: BriefcaseIcon, label: 'Full-Time' },
                { icon: Clock3, label: 'Part-Time' },
                { icon: Crown, label: 'Premium' }
              ].map((cat, idx) => (
                <motion.button
                  key={cat.label}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-slate-700 hover:border-violet-300 hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 transition-all"
                >
                  <cat.icon size={16} className="text-blue-700" />
                  <span className="text-sm font-medium">{cat.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* 4️⃣ Featured Internships Grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Featured Opportunities</h2>
                <p className="text-sm text-slate-500">Top internships this week • View all for more</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {['All Internships', 'Tech', 'Marketing', 'Design'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      selectedCategory === cat
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredInternships.map((job, idx) => (
                <FadeUp key={job.id} delay={idx * 0.1}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md overflow-hidden transition-all group"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image src={job.image} alt={job.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 400px" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-violet-600 text-white border-0 text-xs">Featured</Badge>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">{job.title}</h3>
                      <p className="text-sm text-slate-500 mb-3 flex items-center gap-1"><Building2 size={14} className="text-slate-400" /> {job.company}</p>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-slate-50 p-2 rounded-lg">
                          <p className="text-xs text-slate-400">Stipend</p>
                          <p className="font-semibold text-sm text-slate-900">{job.stipend}</p>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg">
                          <p className="text-xs text-slate-400">Location</p>
                          <p className="font-semibold text-sm text-slate-900">{job.location}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.slice(0,3).map(skill => (
                          <span key={skill} className="bg-slate-100 px-2 py-1 rounded-full text-xs text-slate-700">{skill}</span>
                        ))}
                      </div>
                      <Button
                        onClick={() => handleApply(job.id)}
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-lg font-semibold text-sm"
                      >
                        {user ? 'Apply Now' : 'Get Started'} <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </motion.article>
                </FadeUp>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/internships"
                className="group flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-lg font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
              >
                <LayoutGrid size={16} className="text-violet-600" />
                View All Internships
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* 5️⃣ Why InternAdda (Feature Highlights) */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">Why choose InternAdda?</h2>
              <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">Everything you need to launch your career</p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, idx) => (
                <FadeUp key={idx} delay={idx * 0.1}>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-violet-200 transition-all group">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-violet-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feat.icon className="text-violet-600 w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{feat.title}</h3>
                    <p className="text-slate-500 text-sm">{feat.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 6️⃣ Verification Workflow (inspired by second design) */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">How we ensure quality.</h2>
                <div className="space-y-6">
                  {[
                    { title: 'Manual Employer Audit', desc: 'Every company is verified through MCA/MSME records before listing.', icon: FileCheck },
                    { title: 'Direct Interview Routing', desc: 'Our platform routes your assessment directly to the decision maker.', icon: Zap },
                    { title: 'Certificate Ledger', desc: 'Blockchain-ready certificates recognized by 150+ companies.', icon: Award }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1 text-violet-400"><step.icon size={20} /></div>
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider">{step.title}</h4>
                        <p className="text-slate-400 text-sm mt-1 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-left">
                <div className="flex items-center gap-2 mb-6">
                  <Globe2 size={16} className="text-violet-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Global Recognition</span>
                </div>
                <p className="text-xl font-medium text-slate-300 leading-relaxed italic">
                  "InternAdda has built a transparent ecosystem that significantly reduces hiring friction for early-stage startups."
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <img
                    src="https://s3-symbol-logo.tradingview.com/tracxn-technologies-ltd--600.png"
                    alt="Tracxn"
                    className="w-12 h-12 rounded-full object-cover border-2 border-violet-500"
                  />
                  <div>
                    <div className="text-sm font-bold">Tracxn</div>
                    <div className="text-xs text-slate-500 font-medium">Leading Startup Data Platform</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7️⃣ Testimonials + Success Stories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">Success Stories</h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {successStories.map((story, idx) => (
                <FadeUp key={idx} delay={idx * 0.2}>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative">
                    <div className="absolute -top-3 -left-3 text-6xl text-blue-100">"</div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow">
                          <Image src={story.image} alt={story.name} fill className="object-cover" sizes="64px" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{story.name}</h3>
                          <p className="text-sm text-blue-700">{story.role}</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">"{story.quote}"</p>
                      <div className="flex gap-1 mt-4">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-amber-400 fill-amber-400" />)}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 8️⃣ Partners / Logos */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">Trusted by leading companies</p>
            </FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {partners.map((partner, idx) => (
                <FadeUp key={partner.name} delay={idx * 0.05}>
                  <div className="flex justify-center grayscale hover:grayscale-0 transition-all hover:scale-105">
                    <Image src={partner.logo} alt={partner.name} width={120} height={40} className="max-h-10 w-auto object-contain" />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 9️⃣ Stats Counter + FAQ Accordion */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <Counter value={300} label="Active Roles" suffix="+" />
              <Counter value={7200} label="Students Placed" suffix="+" />
              <Counter value={150} label="Corporate Partners" suffix="+" />
              <Counter value={98} label="Satisfaction Rate" suffix="%" />
            </div>

            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-8">Frequently Asked Questions</h2>
            </FadeUp>
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, idx) => (
                <FadeUp key={idx} delay={idx * 0.1}>
                  <FAQItem question={faq.q} answer={faq.a} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 🔟 Strong Bottom CTA */}
        <section className="py-16 bg-violet-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to launch your career?</h2>
              <p className="text-violet-100 mb-8 text-lg">Join 7,200+ students who found their dream internships.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button className="bg-white text-violet-700 hover:bg-slate-100 px-8 py-6 text-base rounded-lg shadow-lg font-semibold">
                    Create Free Account <Rocket className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/internships">
                  <Button variant="outline" className="border-white text-white hover:bg-violet-700 px-8 py-6 text-base rounded-lg font-semibold">
                    Browse Internships
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-violet-200 mt-6">No credit card required • Free forever • 94% placement rate</p>
            </FadeUp>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

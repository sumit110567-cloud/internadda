'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import {
  ArrowRight, Users, Shield, Clock, Award,
  Star, MapPin, CheckCircle, TrendingUp,
  GraduationCap, BookOpen, Globe, Verified, Sparkles,
  Building2, Briefcase, Calendar, Linkedin,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { GlobeHero } from '@/components/globe-hero'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── SEO Structured Data ──────────────────────────────

const featuredInternships = [
  {
    id: '1', title: 'Python Developer Intern', company: 'Arjuna AI Solutions',
    stipend: '₹2,000 – ₹8,000/mo', location: 'Remote', tag: 'AI & ML',
    skills: ['Python', 'Django', 'PostgreSQL'], applicants: 131,
    image: '/python.jpg', otherCompaniesCount: 36,
    companyLogos: ['/company1.jpg', '/company2.jpg', '/company3.jpg'],
  },
  {
    id: '2', title: 'Web Development Intern', company: 'Internadda Enterprises',
    stipend: '₹2,500 – ₹5,000/mo', location: 'Remote', tag: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind'], applicants: 150,
    image: '/react.jpg', otherCompaniesCount: 21,
    companyLogos: ['/company4.jpg', '/company5.jpg', '/company1.jpg'],
  },
  {
    id: '3', title: 'Data Science Intern', company: 'Larex Systems',
    stipend: '₹3,000 – ₹7,000/mo', location: 'Remote', tag: 'Data Science',
    skills: ['Python', 'Pandas', 'Matplotlib'], applicants: 130,
    image: '/datascience.jpg', otherCompaniesCount: 21,
    companyLogos: ['/company2.jpg', '/company3.jpg', '/company4.jpg'],
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Featured Global Internships – InternAdda',
  description: 'Discover verified internships worldwide.',
  itemListElement: featuredInternships.map((job, i) => ({
    '@type': 'ListItem', position: i + 1,
    item: {
      '@type': 'JobPosting', title: job.title,
      description: `${job.title} at ${job.company}. Skills: ${job.skills.join(', ')}.`,
      hiringOrganization: { '@type': 'Organization', name: job.company },
      jobLocationType: 'TELECOMMUTE',
      employmentType: 'INTERN',
    },
  })),
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'InternAdda',
  url: 'https://www.internadda.com',
  description: "Global internship discovery platform. Partnered with Upforge.",
  foundingDate: '2020',
  sameAs: ['https://upforge.org'],
  address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
}

// ─── Global Data ───────────────────────────────────────

const GLOBAL_CITIES = [
  { name: 'Mumbai', flag: '🇮🇳', internships: 2340 },
  { name: 'Bangalore', flag: '🇮🇳', internships: 1890 },
  { name: 'San Francisco', flag: '🇺🇸', internships: 1200 },
  { name: 'New York', flag: '🇺🇸', internships: 980 },
  { name: 'London', flag: '🇬🇧', internships: 870 },
  { name: 'Berlin', flag: '🇩🇪', internships: 650 },
  { name: 'Singapore', flag: '🇸🇬', internships: 540 },
  { name: 'Toronto', flag: '🇨🇦', internships: 490 },
  { name: 'Sydney', flag: '🇦🇺', internships: 420 },
  { name: 'Dubai', flag: '🇦🇪', internships: 380 },
]

const PARTNER_UNIVERSITIES = [
  'Stanford University', 'University of Cambridge', 'IIT Bombay', 
  'National University of Singapore', 'University of Toronto', 'ETH Zurich'
]

const TRUST_BADGES = [
  { label: 'Verified Opportunities', icon: Shield, color: '#4f46e5' },
  { label: 'Global Network', icon: Globe, color: '#1a1063' },
  { label: 'Student First', icon: Users, color: '#059669' },
]

const WHY_CHOOSE = [
  { icon: Shield, title: 'Vetted Opportunities', description: 'Every internship listing is manually verified for legitimacy and quality standards.', color: '#4f46e5' },
  { icon: Globe, title: 'Borderless Access', description: 'Remote internships from 40+ countries. Work with international teams without relocation.', color: '#059669' },
  { icon: Verified, title: 'Credential Verification', description: 'Partnered with Upforge for tamper-proof student identity and portfolio authentication.', color: '#7c3aed' },
  { icon: TrendingUp, title: 'Career Acceleration', description: 'Track applications, receive feedback, and build a verified professional profile.', color: '#d97706' },
]

const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Data Science Intern', university: 'IIT Bombay', quote: 'The platform connected me with a global team. Within two weeks, I was contributing to production-level code.', rating: 5 },
  { name: 'Aryan Kumar', role: 'Web Developer', university: 'DTU', quote: 'InternAdda changed my career trajectory. The verification system gives employers immediate trust.', rating: 5 },
  { name: 'Sneha Rathi', role: 'Product Intern', university: 'University of Delhi', quote: 'Found my dream internship within days. The platform is intuitive and the opportunities are genuine.', rating: 5 },
]

const CONTAINER = "max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8"

// ─── Animations ────────────────────────────────────────

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.98, 0.35, 1.0] }}
      className={className}>
      {children}
    </motion.div>
  )
}

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ─── Internship Card ───────────────────────────────────

function InternshipCard({ id, title, company, stipend, location, skills, applicants, otherCompaniesCount, image, companyLogos, tag }: any) {
  const { user } = useAuth()
  const router = useRouter()
  const go = () => router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`)
  
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300 cursor-pointer"
      onClick={go}
    >
      <div className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-sm">{tag}</span>
        <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {applicants} applied
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex -space-x-1.5">
              {companyLogos.slice(0, 3).map((l: string, i: number) => (
                <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-slate-100 overflow-hidden relative shadow-sm">
                  <Image src={l} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">{company} +{otherCompaniesCount} more</p>
          </div>
          <h3 className="text-[16px] font-bold text-slate-900 leading-tight">{title}</h3>
        </div>
        <div className="flex items-center justify-between text-[13px] text-slate-600">
          <span className="font-semibold text-indigo-700">{stipend}</span>
          <span className="flex items-center gap-1"><MapPin size={12} />{location}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {skills.slice(0, 3).map((s: string) => (
            <span key={s} className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-md">{s}</span>
          ))}
        </div>
        <button className="mt-2 w-full bg-[#1a1063] hover:bg-indigo-900 text-white text-[13px] font-semibold rounded-xl py-2.5 transition-all shadow-md hover:shadow-lg active:scale-[0.98]">
          {user ? 'Apply Now →' : 'Sign in to Apply'}
        </button>
      </div>
    </motion.article>
  )
}

// ─── Google Form Review Modal ──────────────────────────

function ReviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSe5kcuI-RHmKB1ZF4ik2hFK5Qq4iQEC2fBP4kAjR3taTATp6g/viewform?embedded=true"
          className="w-full h-[550px]"
          style={{ border: 0 }}
          title="Share Your Experience"
        />
      </motion.div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────

export default function Home() {
  const [tickerIndex, setTickerIndex] = useState(0)
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  
  const tickerMessages = [
    'Rahul M. · Placed at Arjuna AI · Python Developer',
    'Ananya P. · Received offer from Larex Systems',
    'Vikram S. · Hired as Data Science Intern · Singapore',
    'Sneha R. · Joined global team at Microsoft',
  ]

  useEffect(() => {
    const interval = setInterval(() => setTickerIndex(i => (i + 1) % tickerMessages.length), 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Header />

      <main className="w-full overflow-x-hidden">

        {/* ═══════════════════════════════════════════════════════════
            HERO SECTION — PREMIUM, EXPANSIVE, GLOBAL
        ═══════════════════════════════════════════════════════════ */}
        <section className="relative bg-white min-h-[90vh] flex items-center overflow-hidden">
          
          {/* Premium Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[30%] -right-[10%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-indigo-50/40 via-transparent to-transparent blur-3xl" />
            <div className="absolute -bottom-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-slate-100/60 via-transparent to-transparent blur-3xl" />
            <svg className="absolute inset-0 w-full h-full opacity-[0.015]">
              <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a1063" strokeWidth="0.5" />
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className={`relative ${CONTAINER}`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 xl:gap-20 py-12 lg:py-20">
              
              {/* Left Content */}
              <motion.div 
                className="flex-1 max-w-[680px] mx-auto lg:mx-0 text-center lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.21, 0.98, 0.35, 1.0] }}
              >
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 mb-6 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full px-3.5 py-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-semibold text-slate-600 tracking-wide">TRUSTED BY 15,000+ STUDENTS WORLDWIDE</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-[2.5rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4rem] font-bold tracking-tight text-slate-900 leading-[1.08] mb-5">
                  Discover Internships
                  <span className="text-indigo-700"> Globally.</span>
                </h1>
                
                <p className="text-[1.1rem] sm:text-[1.2rem] text-slate-600 leading-relaxed mb-6 max-w-[560px] mx-auto lg:mx-0">
                  Access 10,000+ verified opportunities across 40+ countries. 
                  Build your global career with InternAdda.
                </p>

                {/* Upforge Innovation Message — Inspiring, Not Promotional */}
                <div className="bg-gradient-to-r from-indigo-50/80 to-slate-50/80 border border-indigo-100 rounded-xl p-4 mb-8 max-w-lg mx-auto lg:mx-0">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Sparkles size={18} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-slate-800 mb-0.5">Powered by Upforge Innovation</p>
                      <p className="text-[12px] text-slate-500 leading-relaxed">
                        Visit <Link href="https://upforge.org" target="_blank" className="text-indigo-600 font-semibold hover:underline">Upforge</Link> to discover the latest advancements in student credential verification 
                        and portfolio authentication — shaping the future of professional identity.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-8">
                  <Link href="/internships">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1a1063] hover:bg-indigo-900 text-white px-7 py-3.5 text-[14px] font-semibold rounded-xl shadow-lg shadow-indigo-900/25 transition-all hover:scale-[1.02] active:scale-[0.98]">
                      Explore Internships <ArrowRight size={15} />
                    </button>
                  </Link>
                  <Link href="https://upforge.org" target="_blank">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:text-indigo-700 px-7 py-3.5 text-[14px] font-semibold rounded-xl transition-all shadow-sm">
                      Learn About Upforge <Sparkles size={14} />
                    </button>
                  </Link>
                </div>

                {/* Live Activity Ticker */}
                <div className="flex items-center justify-center lg:justify-start gap-3 bg-slate-50 border border-slate-100 rounded-full px-4 py-2.5 w-full max-w-md mx-auto lg:mx-0">
                  <div className="flex -space-x-1.5">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-white" />
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={tickerIndex}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[12px] text-slate-500 font-medium"
                    >
                      {tickerMessages[tickerIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Trust Badges Row */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6">
                  {TRUST_BADGES.map((badge) => (
                    <div key={badge.label} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <badge.icon size={12} style={{ color: badge.color }} />
                      <span>{badge.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Globe Visual — Premium, Expansive */}
              <motion.div 
                className="flex-1 w-full max-w-xl mx-auto lg:max-w-none mt-12 lg:mt-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.98, 0.35, 1.0] }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-indigo-500/5 rounded-full blur-2xl" />
                  <GlobeHero />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            STATS SECTION — GLOBAL REACH
        ═══════════════════════════════════════════════════════════ */}
        <section className="border-y border-slate-100 bg-white">
          <div className={CONTAINER}>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
              {[
                { icon: Briefcase, label: 'Live Internships', value: 8450, suffix: '+' },
                { icon: Users, label: 'Students Placed', value: 15234, suffix: '+' },
                { icon: Globe, label: 'Countries', value: 42, suffix: '' },
                { icon: Building2, label: 'Partner Companies', value: 1250, suffix: '+' },
              ].map((stat, i) => (
                <div key={i} className="text-center py-6 px-4">
                  <stat.icon size={24} className="mx-auto mb-2 text-indigo-500" />
                  <p className="text-[28px] font-bold text-slate-800">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[12px] text-slate-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            PARTNER UNIVERSITIES
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-8 bg-slate-50/40">
          <div className={CONTAINER}>
            <p className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-[0.2em] mb-4">TRUSTED BY STUDENTS FROM</p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {PARTNER_UNIVERSITIES.map((uni, i) => (
                <span key={i} className="text-[13px] font-medium text-slate-500">{uni}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            FEATURED INTERNSHIPS
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-20 bg-white">
          <div className={CONTAINER}>
            <FadeUp className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-2">Featured Opportunities</p>
              <h2 className="text-[2rem] sm:text-[2.4rem] font-bold text-slate-900 tracking-tight mb-3">Top Internships This Week</h2>
              <p className="text-slate-500">Hand-picked opportunities from our network of verified global employers</p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredInternships.map((item, i) => (
                <FadeUp key={item.id} delay={i * 0.1}>
                  <InternshipCard {...item} />
                </FadeUp>
              ))}
            </div>

            <FadeUp className="text-center mt-10">
              <Link href="/internships">
                <button className="inline-flex items-center gap-2 border border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:text-indigo-700 px-6 py-3 text-[13px] font-semibold rounded-xl transition-all">
                  View All Opportunities <ArrowRight size={14} />
                </button>
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            GLOBAL HUBS — EXPANDED
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-12 bg-slate-50/60 border-y border-slate-100">
          <div className={CONTAINER}>
            <FadeUp className="text-center mb-8">
              <h3 className="text-[18px] font-bold text-slate-800 mb-1">Global Internship Hubs</h3>
              <p className="text-[13px] text-slate-500">Connect with opportunities across the world</p>
            </FadeUp>
            <div className="flex flex-wrap justify-center gap-2.5">
              {GLOBAL_CITIES.map(city => (
                <Link 
                  key={city.name} 
                  href={`/internships?location=${encodeURIComponent(city.name)}`}
                  className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 hover:border-indigo-300 hover:shadow-sm transition-all group"
                >
                  <span className="text-[16px]">{city.flag}</span>
                  <span className="text-[12px] font-medium text-slate-600 group-hover:text-indigo-700">{city.name}</span>
                  <span className="text-[10px] text-slate-400">{city.internships}+</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            WHY CHOOSE US
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-20 bg-white">
          <div className={CONTAINER}>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <FadeUp>
                <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-2">Why InternAdda</p>
                <h2 className="text-[2rem] sm:text-[2.4rem] font-bold text-slate-900 tracking-tight mb-4">Built for the<br />Global Student</h2>
                <p className="text-slate-500 leading-relaxed mb-6">
                  We combine verified opportunities with credential authentication to create 
                  a trusted bridge between talented students and global employers.
                </p>
                <div className="space-y-4">
                  {WHY_CHOOSE.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}10` }}>
                        <item.icon size={18} style={{ color: item.color }} />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-slate-800">{item.title}</h4>
                        <p className="text-[12px] text-slate-500">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield size={18} className="text-indigo-600" />
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wide">Partnered with Upforge</span>
                  </div>
                  <p className="text-[14px] text-slate-600 leading-relaxed mb-4">
                    Upforge represents the next generation of student credential verification. 
                    Their blockchain-secured platform ensures your academic achievements and 
                    project portfolios are tamper-proof and globally recognized.
                  </p>
                  <Link href="https://upforge.org" target="_blank" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-indigo-600 hover:text-indigo-800">
                    Discover Upforge Innovations <ArrowRight size={13} />
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            TESTIMONIALS
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-20 bg-slate-50/40">
          <div className={CONTAINER}>
            <FadeUp className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-2">Student Success</p>
              <h2 className="text-[2rem] sm:text-[2.4rem] font-bold text-slate-900 tracking-tight mb-3">Trusted by Students Worldwide</h2>
              <p className="text-slate-500">Real experiences from students who launched their careers with InternAdda</p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <FadeUp key={t.name} delay={i * 0.1}>
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-[13px] text-slate-600 leading-relaxed mb-4">"{t.quote}"</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-[12px] font-bold">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-slate-800">{t.name}</p>
                        <p className="text-[11px] text-slate-500">{t.role} · {t.university}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <div className="text-center mt-10">
              <button
                onClick={() => setIsReviewOpen(true)}
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Share Your Experience <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            FINAL CTA
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1520px] mx-auto">
            <FadeUp>
              <div className="relative rounded-2xl overflow-hidden bg-[#1a1063]">
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%">
                    <defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="white" />
                    </pattern></defs>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                  </svg>
                </div>
                <div className="relative py-12 px-6 sm:px-10 text-center">
                  <h2 className="text-[1.8rem] sm:text-[2.2rem] font-bold text-white mb-3">Ready to Launch Your Global Career?</h2>
                  <p className="text-indigo-200 max-w-lg mx-auto mb-8 text-[14px]">
                    Join 15,000+ students who found their path through InternAdda
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link href="/internships">
                      <button className="inline-flex items-center gap-2 bg-white text-[#1a1063] hover:bg-slate-100 px-6 py-3 text-[13px] font-semibold rounded-xl transition-all">
                        Browse Internships <ArrowRight size={14} />
                      </button>
                    </Link>
                    <Link href="https://upforge.org" target="_blank">
                      <button className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 text-[13px] font-semibold rounded-xl transition-all">
                        <Sparkles size={14} /> Explore Upforge
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>

      <Footer />
      <ReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} />
    </>
  )
}

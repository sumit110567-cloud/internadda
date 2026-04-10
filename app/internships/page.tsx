'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import {
  ArrowRight, Users, Shield, Clock, Award,
  Zap, Star, MapPin, CheckCircle, TrendingUp,
  GraduationCap, BookOpen, Globe, Verified, X,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { GlobeHero } from '@/components/globe-hero'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── SEO structured data (UPGRADED with Upforge & global scope) ──────────────

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

// UPGRADED: Enhanced JSON-LD with global scope & Upforge partnership
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Featured Global Internships – InternAdda',
  description: 'Discover verified internships worldwide. Build your credibility on Upforge.',
  itemListElement: featuredInternships.map((job, i) => ({
    '@type': 'ListItem', position: i + 1,
    item: {
      '@type': 'JobPosting', title: job.title,
      description: `${job.title} at ${job.company}. Skills: ${job.skills.join(', ')}. Stipend: ${job.stipend}. Get your profile verified on Upforge for priority applications.`,
      hiringOrganization: { '@type': 'Organization', name: job.company, sameAs: 'https://www.internadda.com' },
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: { '@type': 'Country', name: 'Worldwide' },
      employmentType: 'INTERN',
    },
  })),
}

// UPGRADED: Organization schema with Upforge sameAs reference
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'InternAdda',
  url: 'https://www.internadda.com',
  logo: 'https://www.internadda.com/logo.jpg',
  description: "Global internship discovery platform. Partnered with Upforge for verified student profiles and portfolio identity.",
  foundingDate: '2020',
  sameAs: [
    'https://upforge.org',
    'https://twitter.com/internadda',
    'https://linkedin.com/company/internadda',
  ],
  address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
}

// NEW: Upforge partnership schema
const upforgeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Upforge',
  url: 'https://upforge.org',
  description: 'Student profile verification and portfolio identity platform. Official verification partner of InternAdda.',
  parentOrganization: { '@type': 'Organization', name: 'InternAdda', url: 'https://www.internadda.com' },
}

// ─── NEW: Global cities data for authority signals ───────────────────────────
const GLOBAL_CITIES = [
  { name: 'Mumbai', country: 'India', flag: '🇮🇳', internships: 2340 },
  { name: 'Bangalore', country: 'India', flag: '🇮🇳', internships: 1890 },
  { name: 'San Francisco', country: 'USA', flag: '🇺🇸', internships: 1200 },
  { name: 'New York', country: 'USA', flag: '🇺🇸', internships: 980 },
  { name: 'London', country: 'UK', flag: '🇬🇧', internships: 870 },
  { name: 'Berlin', country: 'Germany', flag: '🇩🇪', internships: 650 },
  { name: 'Singapore', country: 'Singapore', flag: '🇸🇬', internships: 540 },
  { name: 'Toronto', country: 'Canada', flag: '🇨🇦', internships: 490 },
]

// ─── NEW: Upforge trust badges data ──────────────────────────────────────────
const TRUST_BADGES = [
  { label: 'Verified Student Ecosystem', platform: 'Upforge', color: '#4f46e5', icon: Verified },
  { label: 'Global Internship Network', platform: 'InternAdda', color: '#1a1063', icon: Globe },
  { label: 'Portfolio Credibility Engine', platform: 'Upforge', color: '#059669', icon: Shield },
]

// ─── Shared container — mirrors Header's max-w-[1520px] ──────────────────────
const CONTAINER = "max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8"

// ─── Primitives ───────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  )
}

function Counter({ raw }: { raw: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const num = parseInt(raw.replace(/\D/g, ''))
  const hasSuffix = raw.includes('+')
  const suffix = raw.replace(/[\d,]/g, '').replace('+', '')
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView || isNaN(num)) return
    let c = 0
    const step = Math.ceil(num / 60)
    const t = setInterval(() => { c = Math.min(c + step, num); setN(c); if (c >= num) clearInterval(t) }, 18)
    return () => clearInterval(t)
  }, [inView, num])
  if (isNaN(num)) return <span ref={ref}>{raw}</span>
  return <span ref={ref}>{n.toLocaleString('en-IN')}{hasSuffix ? '+' : ''}{suffix}</span>
}

// ─── NEW: Upforge CTA component for reuse ────────────────────────────────────
function UpforgeBadge({ variant = 'inline', className = '' }: { variant?: 'inline' | 'card'; className?: string }) {
  if (variant === 'inline') {
    return (
      <Link href="https://upforge.org" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-full px-3 py-1 transition-all group ${className}`}>
        <Verified size={12} className="text-indigo-600" />
        <span className="text-[10px] font-semibold text-indigo-700">Get Verified on Upforge</span>
        <ArrowRight size={10} className="text-indigo-500 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    )
  }
  return (
    <div className={`bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
          <Verified size={20} className="text-indigo-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-[13px] font-bold text-slate-800 mb-0.5">Build Your Verified Profile</h4>
          <p className="text-[11px] text-slate-500 mb-2">Students with verified Upforge profiles receive 3x more interview calls</p>
          <Link href="https://upforge.org/signup" target="_blank" className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800">
            Create Free Profile → 
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Internship Card (UPGRADED with Upforge verification badge) ──────────────

function InternshipCard({ id, title, company, stipend, location, skills, applicants, otherCompaniesCount, image, companyLogos, tag }: any) {
  const { user } = useAuth()
  const router = useRouter()
  const go = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`)
  }
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 relative"
    >
      {/* NEW: Upforge preferred badge */}
      <div className="absolute top-3 right-3 z-10">
        <Link href="https://upforge.org" target="_blank" className="bg-white/95 backdrop-blur-sm text-[9px] font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1 text-indigo-700 border border-indigo-200">
          <Verified size={10} /> Upforge Preferred
        </Link>
      </div>

      <div className="relative h-40 bg-slate-100 overflow-hidden flex-shrink-0">
        <Image src={image} alt={title} fill sizes="(max-width:640px)100vw,(max-width:1280px)50vw,33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-white/95 text-slate-700 text-[10.5px] font-semibold px-2.5 py-1 rounded-lg shadow-sm tracking-wide">{tag}</span>
        <span className="absolute top-3 right-3 bg-white/95 text-[10.5px] font-medium px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />{applicants} applied
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1 gap-3.5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex -space-x-1.5">
              {companyLogos.map((l: string, i: number) => (
                <div key={i} className="w-[18px] h-[18px] rounded-full border-2 border-white bg-slate-100 overflow-hidden relative shadow-sm">
                  <Image src={l} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 truncate font-medium">
              {company} <span className="text-slate-300">+{otherCompaniesCount} more</span>
            </p>
          </div>
          <h3 className="text-[15px] font-bold text-slate-900 leading-snug">{title}</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3">
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Stipend</p>
            <p className="text-[12.5px] font-bold text-slate-800">{stipend}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Location</p>
            <p className="text-[12.5px] font-bold text-slate-800 flex items-center gap-1">
              <MapPin size={9} className="text-indigo-400 flex-shrink-0" />{location}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((s: string) => (
            <span key={s} className="bg-indigo-50 text-indigo-600 text-[10.5px] font-semibold px-2.5 py-0.5 rounded-md border border-indigo-100">{s}</span>
          ))}
        </div>
        
        {/* NEW: Upforge verification note before apply button */}
        <p className="text-[9px] text-slate-400 text-center">
          <Link href="https://upforge.org" target="_blank" className="text-indigo-500 hover:underline">Verified on Upforge</Link> candidates get priority
        </p>
        
        <button onClick={go}
          className="mt-auto w-full bg-[#1a1063] hover:bg-indigo-900 text-white text-[13px] font-semibold rounded-xl h-10 shadow-sm shadow-indigo-900/20 transition-all hover:shadow-md hover:shadow-indigo-900/30 active:scale-[0.98]">
          {user ? 'Apply Now →' : 'Sign in to Apply →'}
        </button>
      </div>
    </motion.article>
  )
}

// ─── Constants (UPGRADED with global scope) ──────────────────────────────────

const AVATARS = ['/student1.jpg', '/student2.jpg', '/student3.jpg', '/student4.jpg']

const TICKER = [
  'Rahul M. applied to Python Developer Intern · 2 min ago',
  'Ananya P. received an offer from Larex Systems · 5 min ago',
  'Vikram S. enrolled in React Fundamentals · 9 min ago',
  'Sneha R. landed a Data Science internship · 12 min ago',
]

// UPGRADED: Metrics with global reach
const METRICS = [
  { icon: Shield,       label: 'Verified Companies', value: '500+',  color: '#4f46e5' },
  { icon: Users,        label: 'Students Placed',    value: '15000+', color: '#7c3aed' },
  { icon: Globe,        label: 'Countries',          value: '40+',   color: '#059669' },
  { icon: Award,        label: 'Trust Score',        value: '4.9',   color: '#d97706' },
]

// UPGRADED: Partners including Upforge as primary
const PARTNERS = ['Delhi University', 'IIT Bombay', 'Upforge', 'Google Career Certificates', 'Microsoft Learn']

const WHY = [
  { icon: Shield,        title: '100% Verified Employers',  body: 'Every company is vetted for legitimacy before listing. No fake roles, no misleading offers.',                         accent: '#4f46e5', bg: '#eef2ff' },
  { icon: Verified,      title: 'Upforge Verified Profiles', body: 'Build your portfolio identity and get verified. Recruiters trust Upforge-verified candidates 3x more.',               accent: '#7c3aed', bg: '#f5f3ff' },
  { icon: GraduationCap, title: 'Global Opportunities',     body: 'Remote internships from 40+ countries. Work with international teams without leaving home.',                    accent: '#059669', bg: '#ecfdf5' },
  { icon: TrendingUp,    title: 'Career Progress Tracking', body: 'Monitor every application, collect structured feedback, and build a verified professional profile.',                 accent: '#d97706', bg: '#fffbeb' },
]

const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Data Science Intern · Larex Systems', av: 'PS', color: '#4f46e5', quote: 'Applied on Monday, offer letter by Wednesday. The company was exactly as described — completely professional. The smoothest hiring process I have experienced.' },
  { name: 'Aryan Kumar',  role: 'Web Dev Intern · Arjuna AI',          av: 'AK', color: '#7c3aed', quote: 'As a second-year student I was sceptical. InternAdda placed me with a real product team where I write production code and learn every single day.' },
  { name: 'Sneha Rathi',  role: 'UI/UX Intern · Delhi Startup',        av: 'SR', color: '#059669', quote: 'Completed the UI/UX course, built my portfolio, and landed an internship all through InternAdda — in under a month. Best platform for students.' },
]

// ─── NEW: Global Cities Widget ────────────────────────────────────────────────
function GlobalCitiesWidget() {
  return (
    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
      <div className="flex items-center gap-2 mb-4">
        <Globe size={16} className="text-indigo-600" />
        <h3 className="text-[13px] font-bold text-slate-700">Global Internship Hubs</h3>
        <span className="text-[9px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">40+ Countries</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {GLOBAL_CITIES.map(city => (
          <Link 
            key={city.name} 
            href={`/internships?location=${encodeURIComponent(city.name)}`}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5 hover:border-indigo-300 hover:shadow-sm transition-all group"
          >
            <span className="text-[14px]">{city.flag}</span>
            <span className="text-[11px] font-medium text-slate-600 group-hover:text-indigo-700">{city.name}</span>
            <span className="text-[9px] text-slate-400">{city.internships}+</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─── NEW: Google Form Review Modal ────────────────────────────────────────────
function ReviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X size={18} className="text-slate-500" />
        </button>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSe5kcuI-RHmKB1ZF4ik2hFK5Qq4iQEC2fBP4kAjR3taTATp6g/viewform?embedded=true"
          className="w-full h-[600px]"
          style={{ border: 0 }}
          title="Review Form"
        >
          Loading…
        </iframe>
      </motion.div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [tick, setTick] = useState(0)
  const [isReviewOpen, setIsReviewOpen] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setTick(i => (i + 1) % TICKER.length), 3600)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(upforgeSchema) }} />
      <Header />

      <main className="w-full overflow-x-hidden">

        {/* ════════════════════════════════════════
            HERO WITH GLOBE - EXPANDED CONTENT
        ════════════════════════════════════════ */}
        <section className="relative bg-white overflow-hidden">

          <div aria-hidden className="pointer-events-none select-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 68%)' }} />
            <div className="absolute top-0 right-0 w-[45%] h-full"
              style={{ background: 'linear-gradient(135deg, transparent 45%, rgba(238,242,255,0.4) 100%)' }} />
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.02 }}>
              <defs><pattern id="hg" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#4f46e5" strokeWidth="0.6" />
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#hg)" />
            </svg>
          </div>

          <div className={`relative ${CONTAINER}`}>
            <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-left lg:gap-12 xl:gap-16 pt-10 pb-0 lg:pt-14">

              {/* Copy - Expanded Global Messaging */}
              <motion.div
                className="flex-1 max-w-[640px] w-full pb-10 lg:pb-16"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 mb-5 border border-indigo-100 bg-indigo-50 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                  <span className="text-[10.5px] font-bold text-indigo-700 uppercase tracking-[0.13em]">Global Platform · 40+ Countries</span>
                </div>

                <h1 className="text-[2.2rem] sm:text-[2.8rem] xl:text-[3.3rem] 2xl:text-[3.6rem] font-extrabold text-slate-900 leading-[1.07] tracking-tight mb-5">
                  Launch Your Career<br />
                  <span className="text-indigo-700">Globally.</span><br />
                  <span className="text-slate-500 text-[1.4rem] sm:text-[1.7rem] xl:text-[2rem] font-semibold">With Verified Credibility.</span>
                </h1>

                <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
                  InternAdda connects students with 10,000+ verified internships across 40+ countries. 
                  <strong className="font-semibold text-indigo-800"> Upforge</strong> powers your professional identity — 
                  verify your skills, build your portfolio, and stand out to top global employers.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-7 max-w-md mx-auto lg:mx-0">
                  <p className="text-[12px] font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                    <Verified size={14} className="text-indigo-600" />
                    Why Upforge exists:
                  </p>
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    Upforge provides students with a tamper-proof digital identity that authenticates academic credentials, 
                    project portfolios, and professional skills. Recruiters trust Upforge-verified candidates, 
                    leading to faster hiring and higher success rates.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-8">
                  <Link href="/internships" className="w-full sm:w-auto">
                    <button className="w-full inline-flex items-center justify-center gap-2 bg-[#1a1063] hover:bg-indigo-900 text-white px-6 py-3 text-[13.5px] font-bold rounded-xl shadow-lg shadow-indigo-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                      Browse Internships <ArrowRight size={14} />
                    </button>
                  </Link>
                  <Link href="https://upforge.org/signup" target="_blank" className="w-full sm:w-auto">
                    <button className="w-full inline-flex items-center justify-center gap-2 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-6 py-3 text-[13.5px] font-bold rounded-xl transition-all bg-white">
                      <Verified size={14} /> Create Verified Profile
                    </button>
                  </Link>
                </div>

                {/* Social proof */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {AVATARS.map((src, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200 relative shadow-md flex-shrink-0">
                          <Image src={src} alt="Student" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                    <div className="text-left">
                      <p className="text-[13px] font-bold text-slate-800">15,000+ placed globally</p>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-amber-400 text-amber-400" />)}
                        <span className="text-[10.5px] text-slate-400 ml-1 font-medium">4.9 / 5</span>
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3.5 py-2 shadow-sm max-w-xs overflow-hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse flex-shrink-0" />
                    <AnimatePresence mode="wait">
                      <motion.span key={tick}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="text-[11px] text-slate-500 font-medium truncate">
                        {TICKER[tick]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-6">
                  {TRUST_BADGES.map((badge) => (
                    <div key={badge.label} className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1">
                      <badge.icon size={10} style={{ color: badge.color }} />
                      <span className="text-[9px] font-medium text-slate-500">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="flex-1 w-full max-w-lg mx-auto lg:max-w-none"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlobeHero />
              </motion.div>
            </div>
          </div>

          {/* Metrics strip */}
          <div className="border-t border-slate-100 bg-slate-50/60">
            <div className={CONTAINER}>
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">
                {METRICS.map((m) => (
                  <div key={m.label} className="flex items-center justify-center lg:justify-start gap-3 px-4 sm:px-6 py-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: m.color + '14', border: `1px solid ${m.color}28` }}>
                      <m.icon size={16} style={{ color: m.color }} />
                    </div>
                    <div>
                      <p className="text-[18px] font-extrabold leading-none tabular-nums" style={{ color: m.color }}>
                        <Counter raw={m.value} />
                      </p>
                      <p className="text-[10.5px] text-slate-400 mt-0.5 font-medium">{m.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            PARTNERS + GOOGLE/MICROSOFT SECTION
        ════════════════════════════════════════ */}
        <section className="border-b border-slate-100 bg-white">
          <div className={CONTAINER}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 py-4">
              <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-[0.18em]">Trusted by</p>
              {PARTNERS.map(n => (
                n === 'Upforge' ? (
                  <Link key={n} href="https://upforge.org" target="_blank" className="text-[12px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">
                    <Verified size={10} /> {n}
                  </Link>
                ) : (
                  <span key={n} className="text-[12px] font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-default">{n}</span>
                )
              ))}
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                <CheckCircle size={10} className="text-emerald-500" />
                <span className="text-[10.5px] text-emerald-700 font-bold">MSME · Govt. of India</span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            GOOGLE & MICROSOFT CERTIFICATION SECTION
        ════════════════════════════════════════ */}
        <section className="py-12 bg-gradient-to-r from-blue-50 via-white to-indigo-50 border-y border-slate-100">
          <div className={CONTAINER}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <FadeUp>
                  <p className="text-[10.5px] font-bold text-indigo-600 uppercase tracking-widest mb-2">Industry Recognized Certifications</p>
                  <h2 className="text-[1.6rem] sm:text-[1.9rem] font-extrabold text-slate-900 tracking-tight mb-4">
                    Power Your Profile with<br />Google & Microsoft Credentials
                  </h2>
                  <p className="text-slate-600 text-[14px] leading-relaxed mb-5">
                    Complement your verified Upforge identity with globally recognized certifications from Google Career Certificates 
                    and Microsoft Learn. These credentials demonstrate real-world skills that employers actively seek.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-[13px] text-slate-700"><CheckCircle size={14} className="text-emerald-500 flex-shrink-0" /> Google IT Support, Data Analytics, UX Design, and more</li>
                    <li className="flex items-center gap-2 text-[13px] text-slate-700"><CheckCircle size={14} className="text-emerald-500 flex-shrink-0" /> Microsoft Azure, Power Platform, Security, and AI fundamentals</li>
                    <li className="flex items-center gap-2 text-[13px] text-slate-700"><CheckCircle size={14} className="text-emerald-500 flex-shrink-0" /> Showcase certifications on your Upforge verified profile</li>
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <Link href="https://grow.google/certificates/" target="_blank" className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 text-[12px] font-semibold px-4 py-2 rounded-lg transition-all">
                      Explore Google Certificates <ArrowRight size={12} />
                    </Link>
                    <Link href="https://learn.microsoft.com/en-us/training/" target="_blank" className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 text-[12px] font-semibold px-4 py-2 rounded-lg transition-all">
                      Explore Microsoft Learn <ArrowRight size={12} />
                    </Link>
                  </div>
                </FadeUp>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 max-w-sm">
                  <div className="flex items-center justify-between mb-4">
                    <Image src="/google-logo.png" alt="Google" width={80} height={30} className="opacity-90" />
                    <Image src="/microsoft-logo.png" alt="Microsoft" width={80} height={30} className="opacity-90" />
                  </div>
                  <div className="text-center">
                    <p className="text-[13px] font-semibold text-slate-800 mb-2">Claim Your Career Advantage</p>
                    <p className="text-[11px] text-slate-500">Add certification badges to your Upforge portfolio and increase interview calls by 2.5x.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            INTERNSHIPS + UPFORGE BANNER
        ════════════════════════════════════════ */}
        <section className="py-12 sm:py-14 lg:py-16 bg-white">
          <div className={CONTAINER}>

            <FadeUp className="flex flex-col items-center text-center lg:flex-row lg:items-end lg:justify-between lg:text-left gap-4 mb-9">
              <div>
                <p className="text-[10.5px] font-bold text-indigo-600 uppercase tracking-widest mb-1.5">Handpicked for you</p>
                <h2 className="text-[1.6rem] sm:text-[1.85rem] xl:text-[2rem] font-extrabold text-slate-900 tracking-tight">Top internships this week</h2>
                <p className="text-slate-500 text-[13.5px] mt-1.5 max-w-sm mx-auto lg:mx-0">Verified roles at trusted companies worldwide.</p>
              </div>
              <Link href="/internships"
                className="hidden lg:inline-flex items-center gap-1.5 text-[12.5px] font-bold text-indigo-600 hover:text-indigo-800 border border-indigo-200 hover:border-indigo-300 px-4 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-all whitespace-nowrap flex-shrink-0">
                View all <ArrowRight size={13} />
              </Link>
            </FadeUp>

            {/* Upforge banner above internships - Professional tone */}
            <FadeUp delay={0.05}>
              <div className="mb-6 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border border-indigo-100 rounded-xl p-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Verified size={22} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-slate-800">Before applying, establish your professional identity on <span className="text-indigo-700">Upforge</span></p>
                      <p className="text-[11px] text-slate-500 max-w-md">Upforge verifies academic credentials, project portfolios, and technical skills — building trust with recruiters before the first interview.</p>
                    </div>
                  </div>
                  <Link href="https://upforge.org/signup" target="_blank" className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all">
                    Create Free Verified Profile →
                  </Link>
                </div>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {featuredInternships.map((item, i) => (
                <FadeUp key={item.id} delay={i * 0.07}>
                  <InternshipCard {...item} />
                </FadeUp>
              ))}
            </div>

            <FadeUp className="mt-7 flex justify-center lg:hidden">
              <Link href="/internships"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-indigo-600 border border-indigo-200 px-5 py-2.5 rounded-lg bg-indigo-50">
                View all internships <ArrowRight size={13} />
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* ════════════════════════════════════════
            GLOBAL CITIES SECTION - REMOVED VIEW ALL LINK
        ════════════════════════════════════════ */}
        <section className="py-8 bg-slate-50/40 border-y border-slate-100">
          <div className={CONTAINER}>
            <FadeUp>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <Globe size={16} className="text-indigo-600" />
                  <h3 className="text-[13px] font-bold text-slate-700">Global Internship Hubs</h3>
                  <span className="text-[9px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">40+ Countries</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {GLOBAL_CITIES.map(city => (
                    <Link 
                      key={city.name} 
                      href={`/internships?location=${encodeURIComponent(city.name)}`}
                      className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5 hover:border-indigo-300 hover:shadow-sm transition-all group"
                    >
                      <span className="text-[14px]">{city.flag}</span>
                      <span className="text-[11px] font-medium text-slate-600 group-hover:text-indigo-700">{city.name}</span>
                      <span className="text-[9px] text-slate-400">{city.internships}+</span>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ════════════════════════════════════════
            WHY INTERNADDA + UPFORGE
        ════════════════════════════════════════ */}
        <section className="py-12 sm:py-14 lg:py-16 bg-slate-50 border-y border-slate-100">
          <div className={CONTAINER}>
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 xl:gap-20">

              <FadeUp className="text-center lg:text-left lg:w-64 xl:w-72 flex-shrink-0 mb-8 lg:mb-0 lg:sticky lg:top-24">
                <p className="text-[10.5px] font-bold text-indigo-600 uppercase tracking-widest mb-2">Why InternAdda + Upforge</p>
                <h2 className="text-[1.6rem] sm:text-[1.85rem] font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                  Built for students,<br />backed by verification.
                </h2>
                <p className="text-slate-500 text-[13.5px] leading-relaxed mb-5 max-w-sm mx-auto lg:mx-0">
                  Every employer is vetted. Every candidate gets verified credentials. The result: faster, more reliable placements.
                </p>
                <div className="flex justify-center lg:justify-start">
                  <Link href="/about">
                    <button className="inline-flex items-center gap-1.5 border border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:text-indigo-700 text-[12.5px] font-bold rounded-xl px-4 py-2.5 transition-all">
                      About InternAdda <ArrowRight size={13} />
                    </button>
                  </Link>
                </div>
              </FadeUp>

              <div className="flex-1 grid sm:grid-cols-2 gap-3.5">
                {WHY.map((w, i) => (
                  <FadeUp key={w.title} delay={i * 0.06}>
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white border border-slate-200 rounded-2xl p-5 h-full hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/40 transition-all duration-300"
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3.5"
                        style={{ background: w.bg, border: `1px solid ${w.accent}22` }}>
                        <w.icon size={16} style={{ color: w.accent }} />
                      </div>
                      <h3 className="text-[13.5px] font-bold text-slate-900 mb-1.5 leading-snug">{w.title}</h3>
                      <p className="text-[12.5px] text-slate-500 leading-relaxed">{w.body}</p>
                    </motion.div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            TESTIMONIALS WITH REVIEW BUTTON
        ════════════════════════════════════════ */}
        <section className="py-12 sm:py-14 lg:py-16 bg-white">
          <div className={CONTAINER}>

            <FadeUp className="text-center lg:text-left mb-9">
              <p className="text-[10.5px] font-bold text-indigo-600 uppercase tracking-widest mb-1.5">Student Stories</p>
              <h2 className="text-[1.6rem] sm:text-[1.85rem] xl:text-[2rem] font-extrabold text-slate-900 tracking-tight">What our students say</h2>
              <p className="text-slate-500 text-[13.5px] mt-1.5 max-w-sm mx-auto lg:mx-0">Real students, real results — no paid reviews.</p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {TESTIMONIALS.map((t, i) => (
                <FadeUp key={t.name} delay={i * 0.07}>
                  <motion.figure
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white border border-slate-200 rounded-2xl p-5 h-full flex flex-col hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/30 transition-all duration-300"
                  >
                    <div className="flex gap-0.5 mb-3.5">
                      {[...Array(5)].map((_, j) => <Star key={j} size={12} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <blockquote className="text-[13px] text-slate-600 leading-relaxed flex-1 mb-4">"{t.quote}"</blockquote>
                    <figcaption className="flex items-center gap-2.5 pt-3.5 border-t border-slate-100">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 shadow-sm"
                        style={{ background: t.color }}>{t.av}</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12.5px] font-bold text-slate-900 leading-none mb-0.5">{t.name}</p>
                        <p className="text-[10.5px] text-slate-400 truncate font-medium">{t.role}</p>
                      </div>
                      <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                    </figcaption>
                  </motion.figure>
                </FadeUp>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <button
                onClick={() => setIsReviewOpen(true)}
                className="inline-flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all"
              >
                Share Your Experience → <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FINAL CTA BANNER
        ════════════════════════════════════════ */}
        <section className="pb-12 sm:pb-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1520px] mx-auto">
            <FadeUp>
              <div className="relative rounded-2xl overflow-hidden" style={{ background: '#1a1063' }}>
                <div aria-hidden className="absolute inset-0 opacity-[0.04] pointer-events-none">
                  <svg width="100%" height="100%">
                    <defs><pattern id="dp2" width="24" height="24" patternUnits="userSpaceOnUse">
                      <circle cx="1.5" cy="1.5" r="1" fill="white" />
                    </pattern></defs>
                    <rect width="100%" height="100%" fill="url(#dp2)" />
                  </svg>
                </div>
                <div aria-hidden className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
                  style={{ background: 'linear-gradient(to left, rgba(99,102,241,0.28), transparent)' }} />

                <div className="relative flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left gap-7 px-6 sm:px-10 xl:px-14 py-10">
                  <div className="max-w-lg">
                    <p className="text-indigo-300 text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2">Ready to begin?</p>
                    <h2 className="text-[1.55rem] sm:text-[1.85rem] xl:text-[2.1rem] font-extrabold text-white leading-tight tracking-tight mb-2.5">
                      Launch your career<br />with InternAdda + Upforge.
                    </h2>
                    <p className="text-indigo-200/80 text-[13.5px] leading-relaxed max-w-md mx-auto lg:mx-0">
                      Discover internships globally. Get verified on Upforge. Stand out to recruiters worldwide.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 flex-shrink-0 w-full sm:w-auto">
                    <Link href="/internships" className="w-full sm:w-auto">
                      <button className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#1a1063] hover:bg-slate-50 font-bold px-6 py-3 text-[13.5px] rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                        Browse Internships <ArrowRight size={14} />
                      </button>
                    </Link>
                    <Link href="https://upforge.org/signup" target="_blank" className="w-full sm:w-auto">
                      <button className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3 text-[13.5px] rounded-xl transition-all">
                        <Verified size={13} /> Create Verified Profile
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="relative border-t border-white/10 px-6 sm:px-10 xl:px-14 py-3.5 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-1.5">
                  {['Free to register', 'MSME · Govt. of India', '500+ verified companies', '40+ countries', 'Upforge verified'].map(item => (
                    <span key={item} className="flex items-center gap-1.5 text-indigo-300/70 text-[11px] font-medium">
                      <CheckCircle size={9} className="text-indigo-400/60 flex-shrink-0" />{item}
                    </span>
                  ))}
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

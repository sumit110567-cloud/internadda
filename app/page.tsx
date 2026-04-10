'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import {
  ArrowRight, Users, Shield, Clock, Award,
  Zap, Star, MapPin, CheckCircle, TrendingUp,
  GraduationCap, BookOpen, Globe, Verified,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { HeroVisual } from './page-client-components'
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
      <Link href="/locations" className="inline-flex items-center gap-1 text-[10px] font-medium text-indigo-600 mt-3 hover:underline">
        View all countries <ArrowRight size={10} />
      </Link>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [tick, setTick] = useState(0)
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
            HERO (UPGRADED with Upforge & Global focus)
        ════════════════════════════════════════ */}
        <section className="relative bg-white overflow-hidden">

          {/* Background accents */}
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

              {/* Copy - UPGRADED with global messaging */}
              <motion.div
                className="flex-1 max-w-[580px] w-full pb-10 lg:pb-16"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 mb-5 border border-indigo-100 bg-indigo-50 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                  <span className="text-[10.5px] font-bold text-indigo-700 uppercase tracking-[0.13em]">Global Platform · 40+ Countries</span>
                </div>

                <h1 className="text-[2.1rem] sm:text-[2.6rem] xl:text-[3rem] 2xl:text-[3.4rem] font-extrabold text-slate-900 leading-[1.07] tracking-tight mb-4">
                  Discover Internships<br />
                  <span style={{ color: '#1a1063' }}>Globally.</span><br />
                  <span className="text-slate-400 font-semibold text-[1.3rem] sm:text-[1.55rem] xl:text-[1.8rem]">Get Verified on Upforge.</span>
                </h1>

                <p className="text-slate-500 text-[14px] sm:text-[15px] leading-[1.75] mb-7 max-w-[460px] mx-auto lg:mx-0">
                  Find 10,000+ verified internships across 40+ countries. Build your portfolio identity on <strong className="text-indigo-700">Upforge</strong> and get noticed by top global employers.
                </p>

                {/* CTAs - UPGRADED with Upforge CTA */}
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

                {/* Social proof - UPGRADED with Upforge mention */}
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

                  {/* Live ticker */}
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

                {/* NEW: Trust badges row */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-6">
                  {TRUST_BADGES.map((badge) => (
                    <div key={badge.label} className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1">
                      <badge.icon size={10} style={{ color: badge.color }} />
                      <span className="text-[9px] font-medium text-slate-500">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Visual */}
              <motion.div
                className="flex-1 w-full max-w-lg mx-auto lg:max-w-none"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <HeroVisual />
              </motion.div>
            </div>
          </div>

          {/* Metrics strip — UPGRADED with 4 global metrics */}
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
            PARTNERS (UPGRADED with Upforge highlighted)
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
                  <span key={n} className="text-[12px] font-semibold text-slate-400 hover:text-slate-700 transition-colors cursor-default">{n}</span>
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

            {/* NEW: Upforge banner above internships */}
            <FadeUp delay={0.05}>
              <div className="mb-6 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border border-indigo-100 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Verified size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-slate-800">✨ Students with verified Upforge profiles receive <strong className="text-indigo-700">3x more interview calls</strong></p>
                      <p className="text-[10px] text-slate-500">Build your portfolio identity — free and verified</p>
                    </div>
                  </div>
                  <Link href="https://upforge.org/signup" target="_blank" className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold px-4 py-2 rounded-lg transition-all">
                    Verify for Free →
                  </Link>
                </div>
              </div>
            </FadeUp>

            {/* 1 col → 2 col sm → 3 col xl */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {featuredInternships.map((item, i) => (
                <FadeUp key={item.id} delay={i * 0.07}>
                  <InternshipCard {...item} />
                </FadeUp>
              ))}
            </div>

            <FadeUp

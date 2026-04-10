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

// ─── Featured internships data ───────────────────────────────────────────────

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

// ─── SEO: JobPosting structured data ─────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Featured Global Internships – InternAdda',
  description:
    'Discover verified internships worldwide across technology, business, research, and design. Build a verified professional identity on Upforge before applying.',
  url: 'https://www.internadda.com',
  numberOfItems: featuredInternships.length,
  itemListElement: featuredInternships.map((job, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'JobPosting',
      title: job.title,
      description: `${job.title} opportunity at ${job.company}. Required skills: ${job.skills.join(', ')}. Stipend range: ${job.stipend}. Remote opportunity available to students globally. Candidates with verified Upforge profiles receive priority consideration.`,
      hiringOrganization: {
        '@type': 'Organization',
        name: job.company,
        sameAs: 'https://www.internadda.com',
      },
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'Canada' },
        { '@type': 'Country', name: 'Germany' },
        { '@type': 'Country', name: 'Singapore' },
        { '@type': 'AdministrativeArea', name: 'Worldwide' },
      ],
      employmentType: 'INTERN',
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'INR',
        value: { '@type': 'QuantitativeValue', minValue: 2000, maxValue: 8000, unitText: 'MONTH' },
      },
      datePosted: new Date().toISOString().split('T')[0],
      validThrough: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      skills: job.skills.join(', '),
    },
  })),
}

// ─── SEO: Organization schema (InternAdda) ───────────────────────────────────
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'InternAdda',
  alternateName: 'Intern Adda',
  url: 'https://www.internadda.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.internadda.com/logo.jpg',
    width: 200,
    height: 60,
  },
  description:
    'InternAdda is a global internship discovery and career readiness infrastructure platform connecting students with verified employers across 40+ countries. Official verification partner: Upforge.',
  foundingDate: '2020',
  foundingLocation: {
    '@type': 'Place',
    address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Worldwide',
  },
  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 50 },
  knowsAbout: [
    'Internship placement',
    'Career readiness',
    'Student employment',
    'Remote work',
    'Skills verification',
    'Professional identity',
  ],
  sameAs: [
    'https://upforge.org',
    'https://twitter.com/internadda',
    'https://linkedin.com/company/internadda',
    'https://instagram.com/internadda',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: ['English', 'Hindi'],
    areaServed: 'Worldwide',
  },
}

// ─── SEO: Upforge partner schema ──────────────────────────────────────────────
const upforgeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Upforge',
  url: 'https://upforge.org',
  description:
    'Upforge is a verified portfolio identity system for students. It provides tamper-proof verification of academic credentials, technical skills, and project portfolios in a structured professional identity format trusted by recruiters.',
  knowsAbout: [
    'Student profile verification',
    'Portfolio identity',
    'Academic credential verification',
    'Skills validation',
    'Career readiness infrastructure',
  ],
  parentOrganization: {
    '@type': 'Organization',
    name: 'InternAdda',
    url: 'https://www.internadda.com',
  },
  sameAs: ['https://www.internadda.com'],
}

// ─── SEO: WebSite schema with SearchAction ───────────────────────────────────
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'InternAdda',
  url: 'https://www.internadda.com',
  description:
    'Global internship discovery platform. Find verified remote internships across 40+ countries. Build your professional identity with Upforge verification.',
  inLanguage: ['en-IN', 'en-US', 'en-GB'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.internadda.com/internships?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

// ─── SEO: BreadcrumbList ──────────────────────────────────────────────────────
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.internadda.com' },
    { '@type': 'ListItem', position: 2, name: 'Internships', item: 'https://www.internadda.com/internships' },
    { '@type': 'ListItem', position: 3, name: 'Verified Profile', item: 'https://upforge.org/signup' },
  ],
}

// ─── SEO: FAQPage schema ──────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is InternAdda?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'InternAdda is a global internship discovery infrastructure platform connecting students with verified employers across 40+ countries. It provides structured career readiness pathways for students in technology, business, design, and research.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Upforge and why do I need a verified profile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upforge is a verified portfolio identity system for students. It provides tamper-proof verification of academic credentials, technical skills, and project portfolios. Students with verified Upforge profiles receive priority consideration from recruiters during the application review process.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are internships on InternAdda available internationally?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. InternAdda provides access to remote internship opportunities across 40+ countries including India, United States, United Kingdom, Canada, Germany, Singapore, and more. Most opportunities are remote-first and open to students globally.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is InternAdda free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Registration and browsing on InternAdda are completely free. The platform is registered under MSME, Government of India.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does InternAdda verify employers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every company listed on InternAdda undergoes a verification process before their roles are published. This includes checking business legitimacy, role authenticity, and stipend accuracy to ensure students only see genuine opportunities.',
      },
    },
  ],
}

// ─── SEO: EducationalOrganization signal ─────────────────────────────────────
const educationalSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'InternAdda Career Readiness Platform',
  url: 'https://www.internadda.com',
  description:
    'Structured career readiness infrastructure for students preparing for early professional experience across global industries.',
  educationalCredentialAwarded: 'Internship Completion Certificate',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Global Internship Opportunities',
    numberOfItems: '10000+',
  },
}

// ─── Global cities data ───────────────────────────────────────────────────────
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

// ─── Trust badges ─────────────────────────────────────────────────────────────
const TRUST_BADGES = [
  { label: 'Verified student ecosystem', icon: Verified, color: '#4f46e5' },
  { label: 'Global internship network', icon: Globe, color: '#059669' },
  { label: 'Portfolio credibility infrastructure', icon: Shield, color: '#7c3aed' },
]

// ─── Shared container ─────────────────────────────────────────────────────────
const CONTAINER = 'max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8'

// ─── Primitives ───────────────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
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
    const t = setInterval(() => {
      c = Math.min(c + step, num)
      setN(c)
      if (c >= num) clearInterval(t)
    }, 18)
    return () => clearInterval(t)
  }, [inView, num])
  if (isNaN(num)) return <span ref={ref}>{raw}</span>
  return (
    <span ref={ref}>
      {n.toLocaleString('en-IN')}
      {hasSuffix ? '+' : ''}
      {suffix}
    </span>
  )
}

// ─── Internship Card ──────────────────────────────────────────────────────────

function InternshipCard({
  id, title, company, stipend, location,
  skills, applicants, otherCompaniesCount, image, companyLogos, tag,
}: any) {
  const { user } = useAuth()
  const router = useRouter()
  const go = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`)
  }
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 relative"
    >
      <div className="relative h-40 bg-slate-100 overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={`${title} internship opportunity`}
          fill
          sizes="(max-width:640px)100vw,(max-width:1280px)50vw,33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-white/95 text-slate-700 text-[10.5px] font-semibold px-2.5 py-1 rounded-lg shadow-sm tracking-wide">
          {tag}
        </span>
        <span className="absolute top-3 right-3 bg-white/95 text-[10.5px] font-medium px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          {applicants} reviewing
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3.5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex -space-x-1.5">
              {companyLogos.map((l: string, i: number) => (
                <div
                  key={i}
                  className="w-[18px] h-[18px] rounded-full border-2 border-white bg-slate-100 overflow-hidden relative shadow-sm"
                >
                  <Image src={l} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 truncate font-medium">
              {company}{' '}
              <span className="text-slate-300">+{otherCompaniesCount} more</span>
            </p>
          </div>
          <h3 className="text-[15px] font-bold text-slate-900 leading-snug">{title}</h3>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3">
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Stipend
            </p>
            <p className="text-[12.5px] font-bold text-slate-800">{stipend}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Location
            </p>
            <p className="text-[12.5px] font-bold text-slate-800 flex items-center gap-1">
              <MapPin size={9} className="text-indigo-400 flex-shrink-0" />
              {location}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {skills.map((s: string) => (
            <span
              key={s}
              className="bg-indigo-50 text-indigo-600 text-[10.5px] font-semibold px-2.5 py-0.5 rounded-md border border-indigo-100"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Credibility note */}
        <div className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
          <p className="text-[10px] text-slate-500 leading-relaxed">
            <Link
              href="https://upforge.org"
              target="_blank"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Verified Upforge profiles
            </Link>{' '}
            receive priority consideration during application review.
          </p>
        </div>

        <button
          onClick={go}
          className="mt-auto w-full bg-[#1a1063] hover:bg-indigo-900 text-white text-[13px] font-semibold rounded-xl h-10 shadow-sm shadow-indigo-900/20 transition-all hover:shadow-md hover:shadow-indigo-900/30 active:scale-[0.98]"
        >
          {user ? 'Apply with verified profile →' : 'Sign in to apply →'}
        </button>
      </div>
    </motion.article>
  )
}

// ─── Constants ────────────────────────────────────────────────────────────────

const AVATARS = ['/student1.jpg', '/student2.jpg', '/student3.jpg', '/student4.jpg']

const TICKER = [
  'Rahul M. submitted an application for Python Developer Intern · 2 min ago',
  'Ananya P. received an offer from Larex Systems · 5 min ago',
  'Vikram S. completed a React Fundamentals module · 9 min ago',
  'Sneha R. established a verified Upforge profile · 12 min ago',
]

const METRICS = [
  {
    icon: Users,
    label: 'Students supported in building early career experience globally',
    value: '15000+',
    color: '#4f46e5',
  },
  {
    icon: Shield,
    label: 'Verified employers across multiple industries',
    value: '500+',
    color: '#7c3aed',
  },
  {
    icon: Globe,
    label: 'Countries with active remote opportunities',
    value: '40+',
    color: '#059669',
  },
  {
    icon: Award,
    label: 'Student satisfaction rating',
    value: '4.9',
    color: '#d97706',
  },
]

const PARTNERS = [
  'Delhi University',
  'IIT Bombay',
  'Upforge',
  'Google Career Certificates',
  'Microsoft Learn',
]

const WHY = [
  {
    icon: Shield,
    title: 'Employer verification standard',
    body: 'Every company is assessed for legitimacy before listing. Only verified employers with authentic roles and accurate stipends appear on the platform.',
    accent: '#4f46e5',
    bg: '#eef2ff',
  },
  {
    icon: Verified,
    title: 'Upforge verified profile identity',
    body: 'Establish a tamper-proof professional identity before applying. Upforge verifies academic credentials, skills, and portfolios — building recruiter trust before the first interview.',
    accent: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    icon: GraduationCap,
    title: 'Global remote opportunities',
    body: 'Access internship pathways across 40+ countries. Gain structured early professional experience with international teams without relocating.',
    accent: '#059669',
    bg: '#ecfdf5',
  },
  {
    icon: TrendingUp,
    title: 'Structured career progress',
    body: 'Track every application stage, collect structured recruiter feedback, and build a verified professional profile that grows with your career.',
    accent: '#d97706',
    bg: '#fffbeb',
  },
]

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Data Science Intern · Larex Systems',
    av: 'PS',
    color: '#4f46e5',
    quote:
      'Applied on Monday, offer letter by Wednesday. The company was exactly as described — completely professional. The most structured hiring process I have experienced as a student.',
  },
  {
    name: 'Aryan Kumar',
    role: 'Web Dev Intern · Arjuna AI',
    av: 'AK',
    color: '#7c3aed',
    quote:
      'As a second-year student I was sceptical. InternAdda placed me with a real product team where I contribute to production code and build genuine professional experience every day.',
  },
  {
    name: 'Sneha Rathi',
    role: 'UI/UX Intern · Delhi Startup',
    av: 'SR',
    color: '#059669',
    quote:
      'Completed a UI/UX certification, established my Upforge identity, and landed a structured internship — all through InternAdda in under a month. The platform genuinely supports early career development.',
  },
]

// ─── Review Modal ─────────────────────────────────────────────────────────────

function ReviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
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
          title="Share your InternAdda experience"
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
      {/* ── Structured data: 6 schemas for global SEO authority ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(upforgeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalSchema) }}
      />

      <Header />

      <main className="w-full overflow-x-hidden">

        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <section className="relative bg-white overflow-hidden">

          {/* Background decorations */}
          <div aria-hidden className="pointer-events-none select-none absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 68%)' }}
            />
            <div
              className="absolute top-0 right-0 w-[45%] h-full"
              style={{ background: 'linear-gradient(135deg, transparent 45%, rgba(238,242,255,0.4) 100%)' }}
            />
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.02 }}>
              <defs>
                <pattern id="hg" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#4f46e5" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hg)" />
            </svg>
          </div>

          <div className={`relative ${CONTAINER}`}>
            <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-left lg:gap-12 xl:gap-16 pt-10 pb-0 lg:pt-14">

              {/* Hero copy */}
              <motion.div
                className="flex-1 max-w-[640px] w-full pb-10 lg:pb-16"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Platform badge */}
                <div className="inline-flex items-center gap-2 mb-5 border border-indigo-100 bg-indigo-50 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                  <span className="text-[10.5px] font-bold text-indigo-700 uppercase tracking-[0.13em]">
                    Global career platform · 40+ countries
                  </span>
                </div>

                {/* Headline — authority tone, not hype */}
                <h1 className="text-[2.2rem] sm:text-[2.8rem] xl:text-[3.3rem] 2xl:text-[3.6rem] font-extrabold text-slate-900 leading-[1.07] tracking-tight mb-4">
                  Build a verified<br />
                  <span className="text-indigo-700">career identity.</span><br />
                  <span className="text-slate-500 text-[1.4rem] sm:text-[1.7rem] xl:text-[2rem] font-semibold">
                    Discover internships worldwide.
                  </span>
                </h1>

                {/* Subheadline — ecosystem explanation */}
                <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed mb-4 max-w-lg mx-auto lg:mx-0">
                  InternAdda connects students with structured internship opportunities across 40+ countries.{' '}
                  <strong className="font-semibold text-indigo-800">Upforge</strong> provides the verified
                  professional identity layer that helps you stand out before your first application.
                </p>

                {/* Trust strip */}
                <p className="text-[12px] text-slate-500 italic mb-6 max-w-lg mx-auto lg:mx-0">
                  Supporting students preparing for careers in technology, business, research, and design
                  at universities worldwide.
                </p>

                {/* Upforge identity-first block — appears BEFORE CTAs intentionally */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 max-w-md mx-auto lg:mx-0">
                  <p className="text-[12px] font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Verified size={13} className="text-indigo-600" />
                    Establish your professional identity first
                  </p>
                  <p className="text-[12px] text-slate-500 leading-relaxed mb-2">
                    Upforge provides a structured portfolio identity system — verifying academic credentials,
                    technical skills, and project portfolios in a format trusted by recruiters.
                    Students with verified profiles receive priority consideration during application review.
                  </p>
                  <Link
                    href="https://upforge.org/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                  >
                    Start building your profile →
                  </Link>
                </div>

                {/* Primary + secondary CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-8">
                  <Link href="/internships" className="w-full sm:w-auto">
                    <button className="w-full inline-flex items-center justify-center gap-2 bg-[#1a1063] hover:bg-indigo-900 text-white px-6 py-3 text-[13.5px] font-bold rounded-xl shadow-lg shadow-indigo-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                      Browse internships <ArrowRight size={14} />
                    </button>
                  </Link>
                  <Link href="https://upforge.org/signup" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <button className="w-full inline-flex items-center justify-center gap-2 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-6 py-3 text-[13.5px] font-bold rounded-xl transition-all bg-white">
                      <Verified size={14} /> Create verified profile
                    </button>
                  </Link>
                </div>

                {/* Social proof */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {AVATARS.map((src, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200 relative shadow-md flex-shrink-0"
                        >
                          <Image src={src} alt="Student" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                    <div className="text-left">
                      <p className="text-[13px] font-bold text-slate-800">
                        15,000+ students supported globally
                      </p>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-[10.5px] text-slate-400 ml-1 font-medium">4.9 / 5</span>
                      </div>
                    </div>
                  </div>

                  {/* Live activity ticker */}
                  <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3.5 py-2 shadow-sm max-w-xs overflow-hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse flex-shrink-0" />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={tick}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="text-[11px] text-slate-500 font-medium truncate"
                      >
                        {TICKER[tick]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Trust chips */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-5">
                  {TRUST_BADGES.map(badge => (
                    <div
                      key={badge.label}
                      className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1"
                    >
                      <badge.icon size={10} style={{ color: badge.color }} />
                      <span className="text-[9px] font-medium text-slate-500">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Globe */}
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
                {METRICS.map(m => (
                  <div
                    key={m.label}
                    className="flex items-center justify-center lg:justify-start gap-3 px-4 sm:px-6 py-4"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: m.color + '14', border: `1px solid ${m.color}28` }}
                    >
                      <m.icon size={16} style={{ color: m.color }} />
                    </div>
                    <div>
                      <p
                        className="text-[18px] font-extrabold leading-none tabular-nums"
                        style={{ color: m.color }}
                      >
                        <Counter raw={m.value} />
                      </p>
                      <p className="text-[10.5px] text-slate-400 mt-0.5 font-medium leading-snug max-w-[160px]">
                        {m.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            PARTNER / LEARNING ECOSYSTEM STRIP
        ════════════════════════════════════════ */}
        <section className="border-b border-slate-100 bg-white">
          <div className={CONTAINER}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 py-4">
              <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-[0.18em]">
                Students preparing through
              </p>
              {PARTNERS.map(n =>
                n === 'Upforge' ? (
                  <Link
                    key={n}
                    href="https://upforge.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
                  >
                    <Verified size={10} /> {n}
                  </Link>
                ) : (
                  <span
                    key={n}
                    className="text-[12px] font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-default"
                  >
                    {n}
                  </span>
                )
              )}
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                <CheckCircle size={10} className="text-emerald-500" />
                <span className="text-[10.5px] text-emerald-700 font-bold">MSME · Govt. of India</span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CERTIFICATIONS SECTION
        ════════════════════════════════════════ */}
        <section className="py-12 bg-gradient-to-r from-blue-50 via-white to-indigo-50 border-y border-slate-100">
          <div className={CONTAINER}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <FadeUp>
                  <p className="text-[10.5px] font-bold text-indigo-600 uppercase tracking-widest mb-2">
                    Industry-recognized certifications
                  </p>
                  <h2 className="text-[1.6rem] sm:text-[1.9rem] font-extrabold text-slate-900 tracking-tight mb-4">
                    Strengthen your verified profile<br />with career-readiness credentials
                  </h2>
                  <p className="text-slate-600 text-[14px] leading-relaxed mb-3">
                    Complement your Upforge professional identity with globally recognized certifications
                    from Google Career Certificates and Microsoft Learn. These credentials serve as
                    career-readiness signals recognized by employers worldwide.
                  </p>
                  <p className="text-slate-500 text-[13px] leading-relaxed mb-5">
                    Adding industry certifications to your verified Upforge profile provides
                    structured evidence of skill proficiency — moving beyond academic qualifications
                    to demonstrate practical, role-relevant competency.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Google IT Support, Data Analytics, UX Design, Project Management, and more',
                      'Microsoft Azure, Power Platform, Security fundamentals, and AI essentials',
                      'Certifications displayed on your Upforge verified professional identity',
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2 text-[13px] text-slate-700">
                        <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="https://grow.google/certificates/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 text-[12px] font-semibold px-4 py-2 rounded-lg transition-all"
                    >
                      Explore Google Certificates <ArrowRight size={12} />
                    </Link>
                    <Link
                      href="https://learn.microsoft.com/en-us/training/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 text-[12px] font-semibold px-4 py-2 rounded-lg transition-all"
                    >
                      Explore Microsoft Learn <ArrowRight size={12} />
                    </Link>
                  </div>
                </FadeUp>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 max-w-sm w-full">
                  <div className="flex items-center justify-between mb-4">
                    <Image
                      src="/google-logo.png"
                      alt="Google Career Certificates"
                      width={80}
                      height={30}
                      className="opacity-90"
                    />
                    <Image
                      src="/microsoft-logo.png"
                      alt="Microsoft Learn"
                      width={80}
                      height={30}
                      className="opacity-90"
                    />
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-[13px] font-semibold text-slate-800 mb-2">
                      Career-readiness signals for recruiters
                    </p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Certification credentials on your Upforge profile demonstrate
                      structured, verifiable skill development to prospective employers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FEATURED INTERNSHIPS
        ════════════════════════════════════════ */}
        <section className="py-12 sm:py-14 lg:py-16 bg-white">
          <div className={CONTAINER}>

            <FadeUp className="flex flex-col items-center text-center lg:flex-row lg:items-end lg:justify-between lg:text-left gap-4 mb-9">
              <div>
                <p className="text-[10.5px] font-bold text-indigo-600 uppercase tracking-widest mb-1.5">
                  Handpicked for you
                </p>
                <h2 className="text-[1.6rem] sm:text-[1.85rem] xl:text-[2rem] font-extrabold text-slate-900 tracking-tight">
                  Active internship opportunities
                </h2>
                <p className="text-slate-500 text-[13.5px] mt-1.5 max-w-sm mx-auto lg:mx-0">
                  Verified roles at assessed employers. Remote opportunities available worldwide.
                </p>
              </div>
              <Link
                href="/internships"
                className="hidden lg:inline-flex items-center gap-1.5 text-[12.5px] font-bold text-indigo-600 hover:text-indigo-800 border border-indigo-200 hover:border-indigo-300 px-4 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-all whitespace-nowrap flex-shrink-0"
              >
                View all opportunities <ArrowRight size={13} />
              </Link>
            </FadeUp>

            {/* Identity-first banner above listings */}
            <FadeUp delay={0.05}>
              <div className="mb-6 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border border-indigo-100 rounded-xl p-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Verified size={22} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-slate-800">
                        Before applying, establish your professional identity on{' '}
                        <span className="text-indigo-700">Upforge</span>
                      </p>
                      <p className="text-[11px] text-slate-500 max-w-md leading-relaxed">
                        A verified Upforge profile — with validated credentials, skills, and portfolio — 
                        creates a trusted professional identity that recruiters can rely on before the first interview.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="https://upforge.org/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all"
                  >
                    Create free verified profile →
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
              <Link
                href="/internships"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-indigo-600 border border-indigo-200 px-5 py-2.5 rounded-lg bg-indigo-50"
              >
                View all opportunities <ArrowRight size={13} />
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* ════════════════════════════════════════
            GLOBAL INTERNSHIP HUBS
        ════════════════════════════════════════ */}
        <section className="py-8 bg-slate-50/40 border-y border-slate-100">
          <div className={CONTAINER}>
            <FadeUp>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-center gap-2 mb-1.5">
                  <Globe size={16} className="text-indigo-600" />
                  <h3 className="text-[13px] font-bold text-slate-700">Global internship hubs</h3>
                  <span className="text-[9px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
                    40+ countries
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mb-4">
                  Remote opportunities across international markets. Gain early career experience with global teams.
                </p>
                <div className="flex flex-wrap gap-2">
                  {GLOBAL_CITIES.map(city => (
                    <Link
                      key={city.name}
                      href={`/internships?location=${encodeURIComponent(city.name)}`}
                      className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5 hover:border-indigo-300 hover:shadow-sm transition-all group"
                    >
                      <span className="text-[14px]">{city.flag}</span>
                      <span className="text-[11px] font-medium text-slate-600 group-hover:text-indigo-700">
                        {city.name}
                      </span>
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
                <p className="text-[10.5px] font-bold text-indigo-600 uppercase tracking-widest mb-2">
                  Platform infrastructure
                </p>
                <h2 className="text-[1.6rem] sm:text-[1.85rem] font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                  Built for students.<br />Backed by verification.
                </h2>
                <p className="text-slate-500 text-[13.5px] leading-relaxed mb-5 max-w-sm mx-auto lg:mx-0">
                  Every employer is assessed. Every student profile can be verified.
                  The result is a structured, reliable career readiness pathway.
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
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3.5"
                        style={{ background: w.bg, border: `1px solid ${w.accent}22` }}
                      >
                        <w.icon size={16} style={{ color: w.accent }} />
                      </div>
                      <h3 className="text-[13.5px] font-bold text-slate-900 mb-1.5 leading-snug">
                        {w.title}
                      </h3>
                      <p className="text-[12.5px] text-slate-500 leading-relaxed">{w.body}</p>
                    </motion.div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            INSPIRATION MESSAGING SECTION
        ════════════════════════════════════════ */}
        <section className="py-10 bg-white border-b border-slate-100">
          <div className={CONTAINER}>
            <FadeUp>
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-[10.5px] font-bold text-indigo-600 uppercase tracking-widest mb-3">
                  Your career foundation
                </p>
                <h2 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-slate-900 tracking-tight mb-4">
                  Start building a career-ready identity<br />before your first interview.
                </h2>
                <p className="text-slate-500 text-[14px] leading-relaxed mb-2">
                  Your verified profile becomes your professional foundation.
                  Recruiters reviewing applications from students with structured, 
                  verified identities have a basis for trust before the conversation begins.
                </p>
                <p className="text-slate-400 text-[13px] leading-relaxed">
                  Early career professionals who establish a verified professional identity 
                  before their first application are better positioned for structured career pathways 
                  across global industries.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ════════════════════════════════════════
            TESTIMONIALS
        ════════════════════════════════════════ */}
        <section className="py-12 sm:py-14 lg:py-16 bg-white">
          <div className={CONTAINER}>

            <FadeUp className="text-center lg:text-left mb-9">
              <p className="text-[10.5px] font-bold text-indigo-600 uppercase tracking-widest mb-1.5">
                Student experience
              </p>
              <h2 className="text-[1.6rem] sm:text-[1.85rem] xl:text-[2rem] font-extrabold text-slate-900 tracking-tight">
                What our students say
              </h2>
              <p className="text-slate-500 text-[13.5px] mt-1.5 max-w-sm mx-auto lg:mx-0">
                Real students, documented results.
              </p>
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
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <blockquote className="text-[13px] text-slate-600 leading-relaxed flex-1 mb-4">
                      "{t.quote}"
                    </blockquote>
                    <figcaption className="flex items-center gap-2.5 pt-3.5 border-t border-slate-100">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 shadow-sm"
                        style={{ background: t.color }}
                      >
                        {t.av}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12.5px] font-bold text-slate-900 leading-none mb-0.5">
                          {t.name}
                        </p>
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
                Share your experience <ArrowRight size={13} />
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
                {/* Dot texture */}
                <div aria-hidden className="absolute inset-0 opacity-[0.04] pointer-events-none">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="dp2" width="24" height="24" patternUnits="userSpaceOnUse">
                        <circle cx="1.5" cy="1.5" r="1" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dp2)" />
                  </svg>
                </div>
                <div
                  aria-hidden
                  className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
                  style={{ background: 'linear-gradient(to left, rgba(99,102,241,0.28), transparent)' }}
                />

                <div className="relative flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left gap-7 px-6 sm:px-10 xl:px-14 py-10">
                  <div className="max-w-lg">
                    <p className="text-indigo-300 text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2">
                      Begin your career pathway
                    </p>
                    <h2 className="text-[1.55rem] sm:text-[1.85rem] xl:text-[2.1rem] font-extrabold text-white leading-tight tracking-tight mb-2.5">
                      Launch your career with<br />InternAdda + Upforge.
                    </h2>
                    <p className="text-indigo-200/80 text-[13.5px] leading-relaxed max-w-md mx-auto lg:mx-0">
                      Discover verified internship opportunities globally. Establish your professional identity on Upforge.
                      Build the career readiness foundation that early-stage professionals need.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 flex-shrink-0 w-full sm:w-auto">
                    <Link href="/internships" className="w-full sm:w-auto">
                      <button className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#1a1063] hover:bg-slate-50 font-bold px-6 py-3 text-[13.5px] rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                        Browse internships <ArrowRight size={14} />
                      </button>
                    </Link>
                    <Link href="https://upforge.org/signup" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                      <button className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3 text-[13.5px] rounded-xl transition-all">
                        <Verified size={13} /> Create verified profile
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="relative border-t border-white/10 px-6 sm:px-10 xl:px-14 py-3.5 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-1.5">
                  {[
                    'Free to register',
                    'MSME · Govt. of India',
                    '500+ verified employers',
                    '40+ countries',
                    'Upforge identity verification',
                    'No placement guarantees',
                  ].map(item => (
                    <span
                      key={item}
                      className="flex items-center gap-1.5 text-indigo-300/70 text-[11px] font-medium"
                    >
                      <CheckCircle size={9} className="text-indigo-400/60 flex-shrink-0" />
                      {item}
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
}s

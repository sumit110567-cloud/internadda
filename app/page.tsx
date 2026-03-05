//app/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
  ArrowRight, Users, Shield, Clock, Award,
  Zap, Star, MapPin, CheckCircle, TrendingUp,
  GraduationCap, BookOpen, Briefcase, ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { HeroVisual } from './page-client-components'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── SEO structured data ──────────────────────────────────────────────────────

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
  '@context': 'https://schema.org', '@type': 'ItemList',
  name: 'Featured Internships – InternAdda',
  itemListElement: featuredInternships.map((job, i) => ({
    '@type': 'ListItem', position: i + 1,
    item: {
      '@type': 'JobPosting', title: job.title,
      description: `${job.title} at ${job.company}. Skills: ${job.skills.join(', ')}. Stipend: ${job.stipend}.`,
      hiringOrganization: { '@type': 'Organization', name: job.company, sameAs: 'https://www.internadda.com' },
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: { '@type': 'Country', name: 'India' },
      employmentType: 'INTERN',
    },
  })),
}

const orgSchema = {
  '@context': 'https://schema.org', '@type': 'Organization',
  name: 'InternAdda', url: 'https://www.internadda.com',
  logo: 'https://www.internadda.com/logo.jpg',
  description: "India's largest dedicated internship ecosystem. MSME Registered, Govt. of India.",
  foundingDate: '2020',
  address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
}

// ─── Reusable primitives ──────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
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
    let c = 0; const step = Math.ceil(num / 60)
    const t = setInterval(() => { c = Math.min(c + step, num); setN(c); if (c >= num) clearInterval(t) }, 18)
    return () => clearInterval(t)
  }, [inView, num])
  if (isNaN(num)) return <span ref={ref}>{raw}</span>
  return <span ref={ref}>{n.toLocaleString('en-IN')}{hasSuffix ? '+' : ''}{suffix}</span>
}

// ─── Internship Card ─────────────────────────────────────────────────────────

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
      className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-40 bg-slate-100 overflow-hidden flex-shrink-0">
        <Image src={image} alt={title} fill sizes="(max-width:640px)100vw,(max-width:1024px)50vw,400px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-white/95 text-slate-700 text-[10.5px] font-semibold px-2.5 py-1 rounded-lg shadow-sm tracking-wide">{tag}</span>
        <span className="absolute top-3 right-3 bg-white/95 text-[10.5px] font-medium px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />{applicants} applied
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3.5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex -space-x-1.5">
              {companyLogos.map((l: string, i: number) => (
                <div key={i} className="w-4.5 h-4.5 w-[18px] h-[18px] rounded-full border-2 border-white bg-slate-100 overflow-hidden relative shadow-sm">
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

        <button onClick={go}
          className="mt-auto w-full bg-[#1a1063] hover:bg-indigo-900 text-white text-[13px] font-semibold rounded-xl h-10 shadow-sm shadow-indigo-900/20 transition-all hover:shadow-md hover:shadow-indigo-900/30 active:scale-[0.98]">
          {user ? 'Apply Now →' : 'Sign in to Apply →'}
        </button>
      </div>
    </motion.article>
  )
}

// ─── Page constants ───────────────────────────────────────────────────────────

const AVATARS = ['/student1.jpg', '/student2.jpg', '/student3.jpg', '/student4.jpg']

const TICKER = [
  'Rahul M. applied to Python Developer Intern · 2 min ago',
  'Ananya P. received an offer from Larex Systems · 5 min ago',
  'Vikram S. enrolled in the React Fundamentals course · 9 min ago',
  'Sneha R. landed a Data Science internship · 12 min ago',
]

const METRICS = [
  { icon: Shield,  label: 'Verified Companies', value: '200+',  color: '#4f46e5' },
  { icon: Users,   label: 'Students Placed',    value: '7200+', color: '#7c3aed' },
  { icon: Clock,   label: 'Avg. Offer Time',    value: '48h',   color: '#059669' },
  { icon: Award,   label: 'Est.',               value: '2020',  color: '#d97706' },
]

const PARTNERS = ['Delhi University', 'LAREX', 'Tracxn', 'Arjuna AI']

const WHY = [
  {
    icon: Shield, title: '100% Verified Employers',
    body: 'Every company is vetted for legitimacy before listing. No fake roles, no misleading offers.',
    accent: '#4f46e5', bg: '#eef2ff',
  },
  {
    icon: Zap, title: 'Offers Within 48 Hours',
    body: 'Our process connects you directly with hiring managers. Average time from apply to offer: 48 hours.',
    accent: '#d97706', bg: '#fffbeb',
  },
  {
    icon: GraduationCap, title: 'Skill Certifications',
    body: 'Industry-aligned courses with partner-recognised certificates that make your profile stand out.',
    accent: '#7c3aed', bg: '#f5f3ff',
  },
  {
    icon: TrendingUp, title: 'Career Progress Tracking',
    body: 'Monitor every application, collect structured feedback, and build a verified professional profile.',
    accent: '#059669', bg: '#ecfdf5',
  },
]

const TESTIMONIALS = [
  {
    name: 'Priya Sharma', role: 'Data Science Intern · Larex Systems', av: 'PS', color: '#4f46e5',
    quote: 'Applied on Monday, offer letter by Wednesday. The company was exactly as described — completely professional. The smoothest hiring process I have experienced.',
  },
  {
    name: 'Aryan Kumar', role: 'Web Dev Intern · Arjuna AI', av: 'AK', color: '#7c3aed',
    quote: 'As a second-year student I was sceptical. InternAdda placed me with a real product team where I write production code and learn every single day.',
  },
  {
    name: 'Sneha Rathi', role: 'UI/UX Intern · Delhi Startup', av: 'SR', color: '#059669',
    quote: 'Completed the UI/UX course, built my portfolio, and landed an internship all through InternAdda — in under a month. Best platform for students.',
  },
]

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

      <Header />

      <main className="w-full overflow-x-hidden">

        {/* ══════════════════════════════════════════════
            HERO — tight, editorial, no wasted space
        ══════════════════════════════════════════════ */}
        <section className="relative bg-white overflow-hidden">

          {/* Subtle top-left accent */}
          <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden">
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)' }} />
            <div className="absolute top-0 right-0 w-[40%] h-full"
              style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(238,242,255,0.5) 100%)' }} />
            {/* Fine grid */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.025 }}>
              <defs>
                <pattern id="hg" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#4f46e5" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hg)" />
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-16 pt-10 pb-0 lg:pt-14">

              {/* ── Left copy ── */}
              <motion.div
                className="flex-1 max-w-2xl w-full pb-10 lg:pb-16"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 mb-5 border border-indigo-100 bg-indigo-50 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                  <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-[0.14em]">#1 Internship Platform · MSME Registered</span>
                </div>

                <h1 className="text-[2.35rem] sm:text-[2.8rem] xl:text-[3.2rem] font-extrabold text-slate-900 leading-[1.06] tracking-tight mb-4">
                  India's Largest<br />
                  <span style={{ color: '#1a1063' }}>Internship Ecosystem</span><br />
                  <span className="text-slate-500 font-semibold text-[1.5rem] sm:text-[1.8rem] xl:text-[2rem] leading-snug">for ambitious students.</span>
                </h1>

                <p className="text-slate-500 text-[15px] leading-[1.7] mb-7 max-w-[460px]">
                  Find verified internships at 200+ trusted companies. Join 7,200 students who landed real roles — free, fast, and fully legitimate.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
                  <Link href="/internships">
                    <button className="inline-flex items-center justify-center gap-2 bg-[#1a1063] hover:bg-indigo-900 text-white px-6 py-3 text-[13.5px] font-bold rounded-xl shadow-lg shadow-indigo-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
                      Browse Internships <ArrowRight size={14} />
                    </button>
                  </Link>
                  <Link href="/courses">
                    <button className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 hover:border-indigo-200 hover:text-indigo-700 px-6 py-3 text-[13.5px] font-bold rounded-xl transition-all w-full sm:w-auto bg-white">
                      <BookOpen size={14} /> Explore Courses
                    </button>
                  </Link>
                </div>

                {/* Social proof row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {AVATARS.map((src, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200 relative shadow-md flex-shrink-0">
                          <Image src={src} alt="Student" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-slate-800">7,200+ placed</p>
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
              </motion.div>

              {/* ── Right visual ── */}
              <motion.div
                className="flex-1 w-full max-w-xl mx-auto lg:max-w-none"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <HeroVisual />
              </motion.div>
            </div>
          </div>

          {/* ── Metrics strip ── */}
          <div className="border-t border-slate-100 bg-slate-50/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">
                {METRICS.map((m) => (
                  <div key={m.label} className="flex items-center gap-3 px-5 py-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: m.color + '14', border: `1px solid ${m.color}28` }}>
                      <m.icon size={16} style={{ color: m.color }} />
                    </div>
                    <div>
                      <p className="text-[19px] font-extrabold leading-none tabular-nums" style={{ color: m.color }}>
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

        {/* ══════════════════════════════════════════════
            PARTNERS — minimal bar
        ══════════════════════════════════════════════ */}
        <section className="border-b border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
              <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-[0.18em]">Recognised by</p>
              {PARTNERS.map(n => (
                <span key={n} className="text-[12px] font-semibold text-slate-400 hover:text-slate-700 transition-colors cursor-default">{n}</span>
              ))}
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                <CheckCircle size={10} className="text-emerald-500" />
                <span className="text-[10.5px] text-emerald-700 font-bold">MSME · Govt. of India</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            FEATURED INTERNSHIPS
        ══════════════════════════════════════════════ */}
        <section className="py-14 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <FadeUp className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <p className="text-[10.5px] font-bold text-indigo-600 uppercase tracking-widest mb-1.5">Handpicked for you</p>
                <h2 className="text-[1.75rem] sm:text-[2rem] font-extrabold text-slate-900 tracking-tight">Top internships this week</h2>
                <p className="text-slate-500 text-[13.5px] mt-1.5 max-w-sm">Verified roles at India's most trusted startups.</p>
              </div>
              <Link href="/internships" className="hidden sm:inline-flex items-center gap-1.5 text-[12.5px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors border border-indigo-200 hover:border-indigo-300 px-4 py-2 rounded-lg whitespace-nowrap bg-indigo-50 hover:bg-indigo-100">
                View all <ArrowRight size={13} />
              </Link>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredInternships.map((item, i) => (
                <FadeUp key={item.id} delay={i * 0.07}>
                  <InternshipCard {...item} />
                </FadeUp>
              ))}
            </div>

            <FadeUp className="mt-8 text-center sm:hidden">
              <Link href="/internships">
                <button className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-indigo-600 border border-indigo-200 px-5 py-2.5 rounded-lg bg-indigo-50">
                  View all internships <ArrowRight size={13} />
                </button>
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            WHY INTERNADDA
        ══════════════════════════════════════════════ */}
        <section className="py-14 sm:py-16 lg:py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 xl:gap-20">

              {/* Left heading */}
              <FadeUp className="lg:w-64 xl:w-72 flex-shrink-0 mb-8 lg:mb-0 lg:sticky lg:top-24">
                <p className="text-[10.5px] font-bold text-indigo-600 uppercase tracking-widest mb-2">Why InternAdda</p>
                <h2 className="text-[1.75rem] sm:text-[2rem] font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                  Built for students,<br />not just listings.
                </h2>
                <p className="text-slate-500 text-[13.5px] leading-relaxed mb-5">
                  We verify every employer, accelerate every hire, and support your growth all the way.
                </p>
                <Link href="/about">
                  <button className="inline-flex items-center gap-1.5 border border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:text-indigo-700 text-[12.5px] font-bold rounded-xl px-4 py-2.5 transition-all">
                    About InternAdda <ArrowRight size={13} />
                  </button>
                </Link>
              </FadeUp>

              {/* Right grid */}
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

        {/* ══════════════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════════════ */}
        <section className="py-14 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <FadeUp className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <p className="text-[10.5px] font-bold text-indigo-600 uppercase tracking-widest mb-1.5">Student Stories</p>
                <h2 className="text-[1.75rem] sm:text-[2rem] font-extrabold text-slate-900 tracking-tight">What our students say</h2>
                <p className="text-slate-500 text-[13.5px] mt-1.5">Real students, real results — no paid reviews.</p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
                    <blockquote className="text-[13px] text-slate-600 leading-relaxed flex-1 mb-4">
                      "{t.quote}"
                    </blockquote>
                    <figcaption className="flex items-center gap-2.5 pt-3.5 border-t border-slate-100">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 shadow-sm"
                        style={{ background: t.color }}>
                        {t.av}
                      </div>
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
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CTA BANNER — refined, not loud
        ══════════════════════════════════════════════ */}
        <section className="pb-12 sm:pb-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FadeUp>
              <div className="relative rounded-2xl overflow-hidden" style={{ background: '#1a1063' }}>

                {/* Texture */}
                <div aria-hidden className="absolute inset-0 opacity-[0.045] pointer-events-none">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="dp2" width="24" height="24" patternUnits="userSpaceOnUse">
                        <circle cx="1.5" cy="1.5" r="1" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dp2)" />
                  </svg>
                </div>
                <div aria-hidden className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
                  style={{ background: 'linear-gradient(to left, rgba(99,102,241,0.3), transparent)' }} />

                {/* Content */}
                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7 px-7 sm:px-10 md:px-12 py-10">
                  <div className="max-w-lg">
                    <p className="text-indigo-300 text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2">Ready to begin?</p>
                    <h2 className="text-[1.7rem] sm:text-[2rem] font-extrabold text-white leading-tight tracking-tight mb-2.5">
                      Launch your career<br />with InternAdda.
                    </h2>
                    <p className="text-indigo-200/80 text-[14px] leading-relaxed max-w-md">
                      Thousands of students found their first real work experience here. Verified listings, fast hiring, zero cost.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                    <Link href="/internships">
                      <button className="w-full sm:w-auto bg-white text-[#1a1063] hover:bg-slate-50 font-bold px-6 py-3 text-[13.5px] rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center gap-2">
                        Browse Internships <ArrowRight size={14} />
                      </button>
                    </Link>
                    <Link href="/auth/signup">
                      <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3 text-[13.5px] rounded-xl transition-all inline-flex items-center justify-center gap-2">
                        <Zap size={13} className="fill-amber-400 text-amber-400" /> Create Free Account
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Trust footnote */}
                <div className="relative border-t border-white/10 px-7 sm:px-10 md:px-12 py-3.5 flex flex-wrap items-center gap-x-5 gap-y-1.5">
                  {['Free to register', 'MSME · Govt. of India', '200+ verified companies', '48h avg. offer time'].map(item => (
                    <span key={item} className="flex items-center gap-1.5 text-indigo-300/70 text-[11px] font-medium">
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
    </>
  )
}

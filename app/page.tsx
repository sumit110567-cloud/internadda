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
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
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
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-md shadow-gray-200/60 overflow-hidden flex flex-col cursor-pointer"
      style={{ boxShadow: '0 4px 24px 0 rgba(99,102,241,0.07), 0 1px 4px 0 rgba(0,0,0,0.05)' }}
    >
      {/* Image */}
      <div className="relative h-44 bg-gray-100 overflow-hidden flex-shrink-0">
        <Image src={image} alt={title} fill sizes="(max-width:640px)100vw,(max-width:1024px)50vw,400px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-gray-700 text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-sm">{tag}</span>
        <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 text-gray-600">
          <Zap size={10} className="text-amber-500 fill-amber-400" />{applicants} applied
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {companyLogos.map((l: string, i: number) => (
              <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-gray-100 overflow-hidden relative shadow-sm">
                <Image src={l} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 truncate leading-none">
            {company} <span className="text-gray-300">+{otherCompaniesCount}</span>
          </p>
        </div>

        <h3 className="text-[15px] font-semibold text-gray-900 leading-snug tracking-tight">{title}</h3>

        <div className="grid grid-cols-2 gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3">
          <div>
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Stipend</p>
            <p className="text-[13px] font-semibold text-gray-800">{stipend}</p>
          </div>
          <div>
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Location</p>
            <p className="text-[13px] font-semibold text-gray-800 flex items-center gap-1">
              <MapPin size={10} className="text-indigo-400 flex-shrink-0" />{location}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {skills.map((s: string) => (
            <span key={s} className="border border-gray-200 bg-gray-50 text-gray-500 text-[11px] px-2.5 py-0.5 rounded-md">{s}</span>
          ))}
        </div>

        <Button onClick={go}
          className="mt-auto w-full bg-[#1a1063] hover:bg-indigo-900 text-white text-sm font-medium rounded-xl h-11 shadow-sm shadow-indigo-900/20 transition-all">
          {user ? 'Apply Now' : 'Sign in to Apply'}
        </Button>
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
  { icon: Shield, label: 'Verified Companies', value: '200+', tc: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  { icon: Users, label: 'Students Placed', value: '7200+', tc: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
  { icon: Clock, label: 'Avg. Offer Time', value: '48h', tc: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  { icon: Award, label: 'Established', value: '2020', tc: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
]

const PARTNERS = ['Delhi University', 'LAREX', 'Tracxn', 'Arjuna-AI']

const WHY = [
  {
    icon: Shield, title: '100% Verified Employers',
    body: 'Every company is vetted for legitimacy before listing. No fake roles, no misleading offers.',
    tc: 'text-indigo-600', bg: 'bg-indigo-50',
  },
  {
    icon: Zap, title: 'Offers Within 48 Hours',
    body: 'Our process connects you directly with hiring managers. Average time from apply to offer: 48 hours.',
    tc: 'text-amber-600', bg: 'bg-amber-50',
  },
  {
    icon: GraduationCap, title: 'Skill Certifications',
    body: 'Industry-aligned courses with partner-recognised certificates that make your profile stand out.',
    tc: 'text-violet-600', bg: 'bg-violet-50',
  },
  {
    icon: TrendingUp, title: 'Career Progress Tracking',
    body: 'Monitor every application, collect structured feedback, and build a verified professional profile.',
    tc: 'text-emerald-600', bg: 'bg-emerald-50',
  },
]

const TESTIMONIALS = [
  {
    name: 'Priya Sharma', role: 'Data Science Intern · Larex Systems', av: 'PS',
    quote: 'Applied on Monday, offer letter by Wednesday. The company was exactly as described — completely professional. The smoothest hiring process I have experienced.',
  },
  {
    name: 'Aryan Kumar', role: 'Web Dev Intern · Arjuna AI', av: 'AK',
    quote: 'As a second-year student I was sceptical. InternAdda placed me with a real product team where I write production code and learn every single day.',
  },
  {
    name: 'Sneha Rathi', role: 'UI/UX Intern · Delhi Startup', av: 'SR',
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

        {/* ═══════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-br from-[#eef0ff] via-[#f5f6ff] to-white overflow-hidden">

          {/* Decorative blobs — desktop only, aria-hidden */}
          <div aria-hidden className="pointer-events-none select-none absolute inset-0">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 right-0 w-80 h-80 bg-violet-200/20 rounded-full blur-3xl" />
            {/* subtle grid */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
              <defs>
                <pattern id="hg" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4f46e5" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hg)" />
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-0 lg:pt-20">
            <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-left lg:gap-14 xl:gap-20">

              {/* ── Left copy ── */}
              <motion.div
                className="flex-1 max-w-2xl w-full pb-12 lg:pb-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 rounded-full pl-1.5 pr-4 py-1.5 mb-7 shadow-sm shadow-indigo-100/60">
                  <span className="bg-indigo-600 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full tracking-wide">#1 IN INDIA</span>
                  <span className="text-gray-600 text-xs font-medium">Dedicated Internship Platform · MSME Registered</span>
                </div>

                <h1 className="text-[2.4rem] sm:text-5xl xl:text-[3.5rem] font-bold text-gray-900 leading-[1.08] tracking-tight mb-5">
                  India's Largest<br />
                  <span className="text-indigo-600">Internship Ecosystem</span><br />
                  for Students.
                </h1>

                <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-[500px] mx-auto lg:mx-0">
                  Find verified internships at 200+ trusted companies. Join 7,200 students who landed real roles — free, fast, and fully legitimate.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10">
                  <Link href="/internships" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-[#1a1063] hover:bg-indigo-900 text-white px-7 py-5 text-sm font-semibold rounded-xl shadow-lg shadow-indigo-900/20 inline-flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
                      Browse Internships <ArrowRight size={15} />
                    </Button>
                  </Link>
                  <Link href="/courses" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-white hover:border-indigo-300 px-7 py-5 text-sm font-semibold rounded-xl transition-all">
                      Explore Courses
                    </Button>
                  </Link>
                </div>

                {/* Social proof */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2.5">
                      {AVATARS.map((src, i) => (
                        <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-gray-200 relative shadow-md flex-shrink-0">
                          <Image src={src} alt="Student" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800">7,200+ students placed</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}
                        <span className="text-xs text-gray-400 ml-1">4.9 / 5</span>
                      </div>
                    </div>
                  </div>

                  {/* Live activity ticker */}
                  <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow-sm max-w-xs w-full sm:w-auto overflow-hidden"
                    style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse flex-shrink-0" />
                    <AnimatePresence mode="wait">
                      <motion.span key={tick}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.25 }}
                        className="text-xs text-gray-500 truncate">
                        {TICKER[tick]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* ── Right visual ── */}
              <motion.div
                className="flex-1 w-full max-w-xl mx-auto lg:max-w-none"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <HeroVisual />
              </motion.div>
            </div>
          </div>

          {/* ── Metrics strip ── */}
          <div className="relative border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
                {METRICS.map((m) => (
                  <div key={m.label} className="flex items-center justify-center lg:justify-start gap-3.5 px-4 sm:px-6 py-5">
                    <div className={`w-10 h-10 ${m.bg} border ${m.border} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <m.icon size={18} className={m.tc} />
                    </div>
                    <div>
                      <p className={`text-xl font-bold leading-none ${m.tc} tabular-nums`}><Counter raw={m.value} /></p>
                      <p className="text-[11px] text-gray-400 mt-1 leading-tight">{m.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            PARTNERS
        ═══════════════════════════════════════════════════ */}
        <section className="bg-slate-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.18em]">Recognised by</p>
              {PARTNERS.map(n => (
                <span key={n} className="text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors cursor-default">{n}</span>
              ))}
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
                <Shield size={11} className="text-emerald-600" />
                <span className="text-[11px] text-emerald-700 font-semibold">MSME · Govt. of India</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            FEATURED INTERNSHIPS
        ═══════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <FadeUp className="text-center mb-12">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">Handpicked for you</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">Top internships this week</h2>
              <p className="text-gray-500 text-base max-w-md mx-auto">Secure your future with positions at India's most trusted startups and companies.</p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {featuredInternships.map((item, i) => (
                <FadeUp key={item.id} delay={i * 0.08}>
                  <InternshipCard {...item} />
                </FadeUp>
              ))}
            </div>

            <FadeUp className="mt-10 text-center">
              <Link href="/internships">
                <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-semibold px-7 py-5 text-sm rounded-xl inline-flex items-center gap-2 transition-all">
                  View all internships <ArrowRight size={14} />
                </Button>
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            WHY INTERNADDA  — left/right split on desktop
        ═══════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 md:py-24 bg-[#f7f8ff] border-y border-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Mobile heading — centered */}
            <FadeUp className="text-center mb-10 lg:hidden">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">Why InternAdda</p>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">Built for students,<br />not just listings.</h2>
              <p className="text-gray-500 text-base max-w-sm mx-auto">We verify every employer, accelerate every hire, and support your growth all the way.</p>
            </FadeUp>

            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 xl:gap-24">

              {/* Left heading — desktop only */}
              <FadeUp className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0 sticky top-28">
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Why InternAdda</p>
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
                  Built for students,<br />not just listings.
                </h2>
                <p className="text-gray-500 text-[15px] leading-relaxed mb-7">
                  We verify every employer, accelerate every hire, and support your growth with courses and community.
                </p>
                <Link href="/about">
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-white text-sm font-medium rounded-xl px-5 py-4 inline-flex items-center gap-1.5 transition-all">
                    About InternAdda <ArrowRight size={13} />
                  </Button>
                </Link>
              </FadeUp>

              {/* Right grid */}
              <div className="flex-1 grid sm:grid-cols-2 gap-4">
                {WHY.map((w, i) => (
                  <FadeUp key={w.title} delay={i * 0.07}>
                    <motion.div
                      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(99,102,241,0.12)' }}
                      transition={{ duration: 0.22 }}
                      className="bg-white border border-gray-200 rounded-2xl p-6 h-full transition-colors duration-200 hover:border-indigo-200"
                      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                    >
                      <div className={`w-10 h-10 ${w.bg} rounded-xl flex items-center justify-center mb-4`}>
                        <w.icon size={18} className={w.tc} />
                      </div>
                      <h3 className="text-[14px] font-semibold text-gray-900 mb-1.5 leading-snug">{w.title}</h3>
                      <p className="text-[13px] text-gray-500 leading-relaxed">{w.body}</p>
                    </motion.div>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* Mobile CTA */}
            <FadeUp className="mt-10 text-center lg:hidden">
              <Link href="/about">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-white text-sm font-medium rounded-xl px-5 py-4 inline-flex items-center gap-1.5">
                  About InternAdda <ArrowRight size={13} />
                </Button>
              </Link>
            </FadeUp>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            TESTIMONIALS
        ═══════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <FadeUp className="text-center mb-12">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">Student Stories</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">What our students say</h2>
              <p className="text-gray-500 text-base max-w-md mx-auto">Real students, real results. No paid reviews, no manufactured testimonials.</p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {TESTIMONIALS.map((t, i) => (
                <FadeUp key={t.name} delay={i * 0.08}>
                  <motion.figure
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.22 }}
                    className="bg-white border border-gray-200 rounded-2xl p-6 h-full flex flex-col"
                    style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
                  >
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, j) => <Star key={j} size={13} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <blockquote className="text-[13.5px] text-gray-600 leading-relaxed flex-1 mb-5">
                      "{t.quote}"
                    </blockquote>
                    <figcaption className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0 shadow-sm">
                        {t.av}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-gray-900 leading-none mb-0.5">{t.name}</p>
                        <p className="text-[11px] text-gray-400 truncate">{t.role}</p>
                      </div>
                      <CheckCircle size={15} className="text-emerald-500 ml-auto flex-shrink-0" />
                    </figcaption>
                  </motion.figure>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            CTA BANNER
        ═══════════════════════════════════════════════════ */}
        <section className="pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FadeUp>
              <div className="relative bg-[#1a1063] rounded-2xl overflow-hidden">

                {/* Dot texture */}
                <div aria-hidden className="absolute inset-0 opacity-[0.055] pointer-events-none select-none">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="dp2" width="28" height="28" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.3" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dp2)" />
                  </svg>
                </div>

                {/* Right glow — decorative */}
                <div aria-hidden className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-indigo-500/35 to-transparent pointer-events-none" />
                <div aria-hidden className="absolute -bottom-16 -right-16 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Main content — centered on mobile, split on desktop */}
                <div className="relative flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left gap-8 px-6 sm:px-10 md:px-14 py-12">
                  <div className="max-w-lg">
                    <p className="text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-2.5">Ready to begin?</p>
                    <h2 className="text-[1.85rem] sm:text-[2.2rem] font-bold text-white leading-tight tracking-tight mb-3">
                      Launch your career<br />with InternAdda.
                    </h2>
                    <p className="text-indigo-200 text-[15px] leading-relaxed max-w-md mx-auto lg:mx-0">
                      Thousands of students found their first real work experience here. Verified listings, fast hiring, zero cost.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 flex-shrink-0 w-full sm:w-auto">
                    <Link href="/internships" className="w-full sm:w-auto">
                      <Button className="w-full sm:w-auto bg-white text-[#1a1063] hover:bg-indigo-50 font-semibold px-7 py-5 text-sm rounded-xl shadow-lg inline-flex items-center justify-center gap-2 transition-all">
                        Browse Internships <ArrowRight size={15} />
                      </Button>
                    </Link>
                    <Link href="/auth/signup" className="w-full sm:w-auto">
                      <Button className="w-full sm:w-auto bg-indigo-500/80 hover:bg-indigo-500 text-white border border-white/20 font-semibold px-7 py-5 text-sm rounded-xl transition-all">
                        Create Free Account
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Trust footnote */}
                <div className="relative border-t border-white/10 px-6 sm:px-10 md:px-14 py-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2">
                  {['Free to register', 'MSME Registered · Govt. of India', '200+ verified companies', '48 h average offer time'].map(item => (
                    <span key={item} className="flex items-center gap-1.5 text-indigo-300/80 text-xs">
                      <CheckCircle size={10} className="text-indigo-400/70 flex-shrink-0" />
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

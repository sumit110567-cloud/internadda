'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
  ArrowRight, Users, Shield, Clock, Award, Zap,
  Star, MapPin, CheckCircle, TrendingUp, GraduationCap,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { HeroVisual } from './page-client-components'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ── Structured Data ───────────────────────────────────────────────────────────

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
  name: 'Featured Internships on InternAdda',
  itemListElement: featuredInternships.map((job, index) => ({
    '@type': 'ListItem', position: index + 1,
    item: {
      '@type': 'JobPosting', title: job.title,
      description: `${job.title} at ${job.company}. Skills: ${job.skills.join(', ')}. Stipend: ${job.stipend}.`,
      hiringOrganization: { '@type': 'Organization', name: job.company, sameAs: 'https://www.internadda.com' },
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: { '@type': 'Country', name: 'India' },
      employmentType: 'INTERN',
      baseSalary: { '@type': 'MonetaryAmount', currency: 'INR', value: { '@type': 'QuantitativeValue', value: job.stipend, unitText: 'MONTH' } },
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
  sameAs: ['https://www.linkedin.com/company/Internadda-india', 'https://www.instagram.com/Internadda.india', 'https://www.youtube.com/@theInternadda'],
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  )
}

function Counter({ value }: { value: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const num = parseInt(value.replace(/\D/g, ''))
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView || isNaN(num)) return
    let c = 0; const step = Math.ceil(num / 60)
    const t = setInterval(() => { c = Math.min(c + step, num); setCount(c); if (c >= num) clearInterval(t) }, 20)
    return () => clearInterval(t)
  }, [inView, num])
  if (isNaN(num)) return <span ref={ref}>{value}</span>
  return <span ref={ref}>{count.toLocaleString()}{value.includes('+') ? '+' : ''}</span>
}

// ── Internship Card ───────────────────────────────────────────────────────────

function InternshipCard({ id, title, company, stipend, location, skills, applicants, otherCompaniesCount, image, companyLogos, tag }: any) {
  const { user } = useAuth()
  const router = useRouter()
  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`)
  }
  return (
    <article className="bg-white rounded-2xl border border-gray-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50/50 transition-all duration-300 flex flex-col overflow-hidden group">
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <Image src={image} alt={`${title} internship at ${company}`} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover group-hover:scale-[1.04] transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span className="absolute top-3 left-3 bg-white/95 text-gray-700 text-[11px] font-medium px-2.5 py-1 rounded-md shadow-sm">{tag}</span>
        <span className="absolute top-3 right-3 bg-white/95 text-gray-600 text-[11px] px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
          <span className="text-amber-500 text-xs">⚡</span>{applicants} applied
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="flex -space-x-1.5">
            {companyLogos.map((logo: string, i: number) => (
              <div key={i} className="w-5 h-5 rounded-full border-2 border-white overflow-hidden bg-gray-100 relative shadow-sm">
                <Image src={logo} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 truncate">{company} <span className="text-gray-300">+{otherCompaniesCount} more</span></p>
        </div>
        <h3 className="text-[15px] font-semibold text-gray-900 mb-3 leading-snug">{title}</h3>
        <div className="grid grid-cols-2 gap-2 bg-gray-50 rounded-xl p-3 mb-3.5 border border-gray-100">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Stipend</p>
            <p className="text-sm font-semibold text-gray-800">{stipend}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Location</p>
            <p className="text-sm font-semibold text-gray-800 flex items-center gap-1">
              <MapPin size={11} className="text-indigo-400 flex-shrink-0" />{location}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills.map((s: string) => (
            <span key={s} className="bg-white border border-gray-200 text-gray-500 text-[11px] px-2.5 py-0.5 rounded-md">{s}</span>
          ))}
        </div>
        <Button onClick={handleApply} className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl py-5 shadow-sm transition-all">
          {user ? 'Apply Now' : 'Sign in to Apply'}
        </Button>
      </div>
    </article>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const studentAvatars = ['/student1.jpg', '/student2.jpg', '/student3.jpg', '/student4.jpg']

const liveActivities = [
  'Rahul M. applied to Python Dev Intern · 2m ago',
  'Ananya P. received an offer from Larex Systems · 5m ago',
  'Vikram S. enrolled in the React course · 9m ago',
  'Sneha R. landed a Data Science internship · 12m ago',
]

const metrics = [
  { icon: Shield, label: 'Verified Companies', value: '200+', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { icon: Users, label: 'Students Placed', value: '7200+', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Clock, label: 'Avg. Offer Time', value: '48h', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Award, label: 'Trusted Since', value: '2020', color: 'text-amber-600', bg: 'bg-amber-50' },
]

const advantages = [
  { icon: Shield, title: '100% Verified Listings', desc: 'Every company is vetted before listing. No fake roles, no spam, ever.', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { icon: Zap, title: 'Offers Within 48 Hours', desc: 'Our streamlined hiring connects you with decision-makers fast.', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: TrendingUp, title: 'Real Career Growth', desc: 'Track applications, gather structured feedback, and build your profile.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: GraduationCap, title: 'Skill Certifications', desc: 'Industry-aligned courses with certificates our hiring partners recognise.', color: 'text-violet-600', bg: 'bg-violet-50' },
]

const testimonials = [
  { name: 'Priya Sharma', role: 'Data Science Intern, Larex Systems', text: 'Applied on Monday, offer letter by Wednesday. The company was exactly as listed — completely legitimate. The process was the smoothest I have seen.', avatar: 'PS' },
  { name: 'Aryan Kumar', role: 'Web Dev Intern, Arjuna AI', text: 'As a second-year student I was sceptical. InternAdda connected me with a real product team where I write production code and actually learn on the job.', avatar: 'AK' },
  { name: 'Sneha Rathi', role: 'UI/UX Intern, Delhi Startup', text: 'Completed the UI/UX course, built my portfolio, and landed an internship — all through InternAdda in one month. Genuinely the best platform for students.', avatar: 'SR' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [actIdx, setActIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActIdx(i => (i + 1) % liveActivities.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Header />
      <main>

        {/* ══ HERO ════════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 lg:pt-20 lg:pb-16">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14 xl:gap-20">

              {/* Left */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 max-w-2xl"
              >
                {/* Trust pill */}
                <div className="inline-flex items-center gap-2 border border-indigo-100 bg-indigo-50 rounded-full px-3.5 py-1.5 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-indigo-700 text-xs font-medium">India's #1 Internship Platform · MSME Registered</span>
                </div>

                <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-5">
                  India's Largest<br />
                  <span className="text-indigo-600">Dedicated Internship</span><br />
                  Ecosystem.
                </h1>

                <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
                  Connect with 200+ verified companies. Join 7,200 students who found real internships — fast, trusted, and free to start.
                </p>

                <div className="flex flex-wrap gap-3 mb-9">
                  <Link href="/internships">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-5 text-sm font-semibold rounded-xl shadow-md shadow-indigo-100">
                      Browse Internships <ArrowRight size={15} className="ml-2" />
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-7 py-5 text-sm font-semibold rounded-xl">
                      Explore Courses
                    </Button>
                  </Link>
                </div>

                {/* Social proof */}
                <div className="flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {studentAvatars.map((src, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200 relative shadow-sm">
                          <Image src={src} alt="Student" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">7,200+ students placed</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-amber-400 text-amber-400" />)}
                        <span className="text-xs text-gray-400 ml-1">4.9 / 5</span>
                      </div>
                    </div>
                  </div>

                  {/* Live ticker */}
                  <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3.5 py-2 shadow-sm max-w-xs overflow-hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse flex-shrink-0" />
                    <AnimatePresence mode="wait">
                      <motion.span key={actIdx}
                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.25 }}
                        className="text-xs text-gray-500 truncate">
                        {liveActivities[actIdx]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Right — Hero Visual */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="flex-1 w-full mt-10 lg:mt-0"
              >
                <HeroVisual />
              </motion.div>
            </div>
          </div>

          {/* Metrics bar */}
          <div className="border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
                {metrics.map((m) => (
                  <div key={m.label} className="flex items-center gap-3.5 px-6 py-5">
                    <div className={`w-9 h-9 ${m.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <m.icon size={17} className={m.color} />
                    </div>
                    <div>
                      <p className={`text-xl font-bold ${m.color} leading-none mb-0.5`}><Counter value={m.value} /></p>
                      <p className="text-xs text-gray-400">{m.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ PARTNERS ════════════════════════════════════════════════════ */}
        <section className="bg-gray-50 border-y border-gray-100 py-7">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              <span className="text-[11px] text-gray-400 uppercase tracking-widest">Recognised by</span>
              {['Delhi University', 'LAREX', 'Tracxn', 'Arjuna-AI'].map((n) => (
                <span key={n} className="text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors cursor-default">{n}</span>
              ))}
              <div className="flex items-center gap-1.5 border border-emerald-200 bg-emerald-50 rounded-full px-3 py-1">
                <Shield size={11} className="text-emerald-600" />
                <span className="text-[11px] text-emerald-700 font-medium">MSME · Govt. of India</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══ INTERNSHIPS ═════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-9">
              <div>
                <p className="text-xs text-indigo-600 font-medium uppercase tracking-widest mb-1.5">Handpicked for you</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Top internships this week</h2>
              </div>
              <Link href="/internships" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 flex-shrink-0 whitespace-nowrap">
                View all <ArrowRight size={14} />
              </Link>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredInternships.map((item, i) => (
                <FadeIn key={item.id} delay={i * 0.07}><InternshipCard {...item} /></FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ADVANTAGE ═══════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-slate-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:gap-20 xl:gap-28">
              <FadeIn className="lg:w-80 xl:w-96 flex-shrink-0 mb-10 lg:mb-0">
                <p className="text-xs text-indigo-600 font-medium uppercase tracking-widest mb-3">Why InternAdda</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">Built for students,<br />not just listings.</h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  We verify every listing, accelerate every hire, and support your growth with courses and a student community.
                </p>
                <Link href="/about">
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-white text-sm font-medium rounded-xl px-5 py-4">
                    About us <ArrowRight size={13} className="ml-1.5" />
                  </Button>
                </Link>
              </FadeIn>
              <div className="flex-1 grid sm:grid-cols-2 gap-4">
                {advantages.map((item, i) => (
                  <FadeIn key={item.title} delay={i * 0.07}>
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all duration-200 h-full">
                      <div className={`w-9 h-9 ${item.bg} rounded-lg flex items-center justify-center mb-3.5`}>
                        <item.icon size={17} className={item.color} />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="mb-9">
              <p className="text-xs text-indigo-600 font-medium uppercase tracking-widest mb-1.5">Student Stories</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">What our students say</h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <FadeIn key={t.name} delay={i * 0.07}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all h-full flex flex-col">
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, j) => <Star key={j} size={13} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">"{t.text}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                        {t.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                        <p className="text-xs text-gray-400 truncate">{t.role}</p>
                      </div>
                      <CheckCircle size={15} className="text-emerald-500 ml-auto flex-shrink-0" />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ═════════════════════════════════════════════════════════ */}
        <section className="pb-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="relative bg-indigo-600 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
                  <svg width="100%" height="100%">
                    <defs><pattern id="cp" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white" /></pattern></defs>
                    <rect width="100%" height="100%" fill="url(#cp)" />
                  </svg>
                </div>
                <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/40 to-transparent pointer-events-none" />

                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 px-8 md:px-12 py-11">
                  <div className="max-w-lg">
                    <p className="text-indigo-200 text-xs font-medium uppercase tracking-widest mb-2.5">Ready to begin?</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight leading-tight">
                      Launch your career<br />with InternAdda.
                    </h2>
                    <p className="text-indigo-200 text-base leading-relaxed">
                      Thousands of students found their first real work experience here. Verified listings, fast hiring, no registration fee.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 flex-shrink-0">
                    <Link href="/internships">
                      <Button className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-indigo-50 font-semibold px-7 py-5 text-sm rounded-xl shadow-md">
                        Browse Internships <ArrowRight size={15} className="ml-1.5" />
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-400 text-white border border-indigo-400/60 font-semibold px-7 py-5 text-sm rounded-xl">
                        Create Free Account
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="border-t border-indigo-500/40 px-8 md:px-12 py-3.5 flex flex-wrap items-center gap-x-6 gap-y-2">
                  {['No registration fee', 'MSME Registered · Govt. of India', '200+ verified companies', '48h average offer time'].map((item) => (
                    <span key={item} className="flex items-center gap-1.5 text-indigo-200 text-xs">
                      <CheckCircle size={11} className="text-indigo-300 flex-shrink-0" />{item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

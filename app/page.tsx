'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Users,
  Shield,
  Clock,
  Award,
  Zap,
  Star,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  GraduationCap,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { HeroVisual } from './page-client-components'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── Data ────────────────────────────────────────────────────────────────────

const featuredInternships = [
  {
    id: '1',
    title: 'Python Developer Intern',
    company: 'Arjuna AI Solutions',
    stipend: '₹2,000 – ₹8,000',
    location: 'Remote',
    skills: ['Python', 'Django', 'PostgreSQL'],
    applicants: 131,
    image: '/python.jpg',
    otherCompaniesCount: 36,
    companyLogos: ['/company1.jpg', '/company2.jpg', '/company3.jpg'],
    tag: 'AI & ML',
    tagColor: 'bg-violet-100 text-violet-700',
  },
  {
    id: '2',
    title: 'Web Development Intern',
    company: 'Internadda Enterprises',
    stipend: '₹2,500 – ₹5,000',
    location: 'Remote',
    skills: ['React', 'Next.js', 'Tailwind'],
    applicants: 150,
    image: '/react.jpg',
    otherCompaniesCount: 21,
    companyLogos: ['/company4.jpg', '/company5.jpg', '/company1.jpg'],
    tag: 'Frontend',
    tagColor: 'bg-cyan-100 text-cyan-700',
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Larex Systems',
    stipend: '₹3,000 – ₹7,000',
    location: 'Remote',
    skills: ['Python', 'Pandas', 'Matplotlib'],
    applicants: 130,
    image: '/datascience.jpg',
    otherCompaniesCount: 21,
    companyLogos: ['/company2.jpg', '/company3.jpg', '/company4.jpg'],
    tag: 'Data',
    tagColor: 'bg-emerald-100 text-emerald-700',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: featuredInternships.map((job, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'JobPosting',
      title: job.title,
      description: `Join ${job.company} as a ${job.title}. Skills required: ${job.skills.join(', ')}. Stipend: ${job.stipend}.`,
      hiringOrganization: { '@type': 'Organization', name: job.company, logo: 'https://Internadda.com/logo.jpg' },
      jobLocationType: 'TELECOMMUTE',
      baseSalary: { '@type': 'MonetaryAmount', currency: 'INR', value: { '@type': 'QuantitativeValue', value: job.stipend, unitText: 'MONTH' } },
    },
  })),
}

const trustMetrics = [
  { icon: Shield, title: 'Verified Companies', value: '200+', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { icon: Users, title: 'Active Students', value: '7,200+', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Award, title: 'Trusted Since', value: '2020', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Clock, title: 'Avg. Hiring Time', value: '48h', color: 'text-emerald-600', bg: 'bg-emerald-50' },
]

const advantages = [
  { icon: Shield, title: '100% Verified', description: 'Every company undergoes a rigorous vetting process. No fake roles, ever.', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  { icon: Zap, title: 'Lightning Fast', description: 'From application to offer letter in as little as 48 hours. Speed matters.', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  { icon: Star, title: 'Smart Matching', description: 'Our AI connects you to roles that match your skills, not just keywords.', color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
  { icon: GraduationCap, title: 'Skill Courses', description: 'Upskill with industry-relevant courses and earn verified certificates.', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  { icon: TrendingUp, title: 'Career Growth', description: 'Track your applications, get feedback, and grow with every step.', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
  { icon: Users, title: 'Peer Community', description: 'Connect with 7,200+ students across India who are on the same journey.', color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100' },
]

const partners = ['Delhi University', 'LAREX', 'Tracxn', 'Arjuna-AI']

const studentAvatars = ['/student1.jpg', '/student2.jpg', '/student3.jpg', '/student4.jpg']

const liveActivity = [
  { name: 'Rahul M.', action: 'applied to Python Dev Intern', time: '2m ago', avatar: 'RM' },
  { name: 'Ananya P.', action: 'got offer from Larex Systems', time: '5m ago', avatar: 'AP' },
  { name: 'Vikram S.', action: 'enrolled in React course', time: '9m ago', avatar: 'VS' },
  { name: 'Sneha R.', action: 'landed Data Science Intern role', time: '12m ago', avatar: 'SR' },
]

// ─── Counter Component ───────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const numericValue = parseInt(value.replace(/\D/g, ''))
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView || isNaN(numericValue)) return
    let start = 0
    const duration = 1400
    const step = Math.ceil(numericValue / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= numericValue) { setCount(numericValue); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, numericValue])

  if (isNaN(numericValue)) return <span ref={ref}>{value}</span>
  return <span ref={ref}>{count.toLocaleString()}{value.includes('+') ? '+' : ''}{suffix}</span>
}

// ─── Internship Card ─────────────────────────────────────────────────────────

const InternshipCard = ({ id, title, company, stipend, location, skills, applicants, otherCompaniesCount, image, companyLogos, tag, tagColor }: any) => {
  const { user } = useAuth()
  const router = useRouter()

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) { router.push(`/auth/signin?callbackUrl=/apply/${id}`); return }
    router.push(`/apply/${id}`)
  }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/40 transition-all duration-300 w-full flex flex-col group overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <Image
          src={image}
          alt={`${title} at ${company}`}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        {/* Tag */}
        <div className={`absolute top-4 left-4 ${tagColor} text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm`}>
          {tag}
        </div>
        {/* Applicants */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <span className="text-amber-500 text-xs">⚡</span>
          <span className="text-gray-700 text-xs font-bold">{applicants} applied</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Company */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex -space-x-1.5">
            {companyLogos.map((logo: string, idx: number) => (
              <div key={idx} className="relative w-5 h-5 rounded-full border-2 border-white bg-white shadow-sm overflow-hidden">
                <Image src={logo} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
          <p className="text-xs font-semibold text-gray-400 truncate">
            {company} <span className="text-gray-300">+{otherCompaniesCount} more</span>
          </p>
        </div>

        <h3 className="text-lg font-black text-gray-900 mb-4 leading-snug tracking-tight">{title}</h3>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 p-3.5 bg-gray-50/70 rounded-2xl mb-4">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">Stipend</p>
            <p className="text-sm font-black text-gray-900">{stipend}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">Location</p>
            <p className="text-sm font-black text-gray-900 flex items-center gap-1">
              <MapPin size={11} className="text-indigo-400" />{location}
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {skills.map((skill: string) => (
            <span key={skill} className="bg-white border border-gray-200 px-2.5 py-1 rounded-lg text-xs font-bold text-gray-600">
              {skill}
            </span>
          ))}
        </div>

        <motion.div whileTap={{ scale: 0.98 }} className="mt-auto">
          <Button
            onClick={handleApply}
            className="w-full bg-[#1a1063] hover:bg-indigo-900 text-white py-5 rounded-2xl font-black text-sm shadow-lg shadow-indigo-900/10 transition-all"
          >
            {user ? (
              <span className="flex items-center gap-2">Apply Now <ArrowRight size={15} /></span>
            ) : (
              <span className="flex items-center gap-2">Sign in to Apply <ArrowRight size={15} /></span>
            )}
          </Button>
        </motion.div>
      </div>
    </motion.article>
  )
}

// ─── Section Fade In ─────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activityIndex, setActivityIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setActivityIndex(i => (i + 1) % liveActivity.length), 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="min-h-screen bg-white overflow-x-hidden">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section className="relative bg-[#f7f8ff] overflow-hidden">
          {/* Mesh background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[700px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-violet-200/20 rounded-full blur-3xl" />
            <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
              <defs>
                <pattern id="herogrid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#4f46e5" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#herogrid)" />
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-0 lg:pt-24">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

              {/* LEFT */}
              <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

                {/* Live badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 bg-white border border-indigo-100 rounded-full px-4 py-2 mb-6 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-black text-gray-600 uppercase tracking-widest">India's #1 Internship Platform</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-5xl md:text-6xl xl:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6"
                >
                  India's <br className="hidden lg:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500">
                    Largest Dedicated
                  </span>
                  <br />
                  Internship Ecosystem.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg xl:text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
                >
                  Join 7,200+ students who landed internships at 200+ top companies.
                  Verified, fast, and trusted since 2020.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10"
                >
                  <Link href="/internships">
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Button className="w-full sm:w-auto bg-[#1a1063] hover:bg-indigo-900 text-white px-8 py-6 text-base font-black rounded-2xl shadow-xl shadow-indigo-900/20 flex items-center gap-2">
                        <Zap size={16} className="fill-amber-400 text-amber-400" />
                        Browse Internships
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/courses">
                    <Button variant="outline" className="w-full sm:w-auto border-gray-200 text-gray-700 hover:bg-white hover:border-indigo-200 px-8 py-6 text-base font-bold rounded-2xl">
                      Explore Courses
                    </Button>
                  </Link>
                </motion.div>

                {/* Social proof */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2.5">
                      {studentAvatars.map((src, i) => (
                        <div key={i} className="relative w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-gray-200 shadow-sm">
                          <Image src={src} alt="Student" fill className="object-cover" />
                        </div>
                      ))}
                      <div className="w-9 h-9 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white">+</div>
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900">7,200+ students placed</p>
                      <div className="flex gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-amber-400 text-amber-400" />)}
                        <span className="text-[10px] text-gray-400 ml-1 font-bold">4.9/5</span>
                      </div>
                    </div>
                  </div>

                  {/* Live activity pill */}
                  <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm overflow-hidden max-w-[220px]">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={activityIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="text-[11px] font-bold text-gray-600 truncate"
                      >
                        {liveActivity[activityIndex].name} {liveActivity[activityIndex].action}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT — Hero Visual */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex-1 w-full max-w-lg mx-auto lg:max-w-none"
              >
                <HeroVisual />
              </motion.div>
            </div>
          </div>

          {/* Trust Metrics — overlapping bottom */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-8 mt-8 lg:mt-12">
            <FadeIn>
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/80 p-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
                {trustMetrics.map((metric, i) => (
                  <div key={metric.title} className="flex flex-col items-center justify-center px-6 py-4 text-center gap-1">
                    <div className={`w-10 h-10 ${metric.bg} rounded-xl flex items-center justify-center mb-2`}>
                      <metric.icon size={20} className={metric.color} />
                    </div>
                    <p className={`text-2xl font-black ${metric.color}`}>
                      <AnimatedCounter value={metric.value} />
                    </p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{metric.title}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PARTNER STRIP
        ══════════════════════════════════════════ */}
        <section className="bg-gray-50 border-y border-gray-100 mt-8 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-7">
              Trusted & Recognized By
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {partners.map((name, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-gray-400 hover:text-gray-700 transition-colors font-black text-base tracking-tight cursor-default"
                >
                  {name}
                </motion.div>
              ))}
              <div className="flex items-center gap-1.5 bg-white border border-emerald-100 rounded-full px-4 py-2 shadow-sm">
                <Shield size={13} className="text-emerald-600" />
                <span className="text-[11px] font-black text-emerald-700 uppercase tracking-wider">MSME · Govt. of India</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FEATURED INTERNSHIPS
        ══════════════════════════════════════════ */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <FadeIn className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-2 mb-5">
                <Sparkles size={13} className="text-indigo-500" />
                <span className="text-xs font-black text-indigo-700 uppercase tracking-widest">Handpicked for you</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                Top internships this week
              </h2>
              <p className="text-gray-500 text-lg">Secure your future with positions at India's best startups and companies.</p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {featuredInternships.map((internship, i) => (
                <FadeIn key={internship.id} delay={i * 0.1}>
                  <InternshipCard {...internship} />
                </FadeIn>
              ))}
            </div>

            <FadeIn className="flex justify-center mt-14">
              <Link href="/internships">
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button className="bg-white text-[#1a1063] border-2 border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200 px-10 py-6 text-base font-black rounded-2xl shadow-sm flex items-center gap-2">
                    View all internships
                    <ArrowRight size={17} />
                  </Button>
                </motion.div>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            THE INTERNADDA ADVANTAGE
        ══════════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-[#f7f8ff]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <FadeIn className="max-w-2xl mb-14">
              <p className="text-xs font-black text-indigo-500 uppercase tracking-[0.2em] mb-4">Why Choose Us</p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                The Internadda<br />advantage.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                We're not just another job board. We're your dedicated career launchpad — built for Indian students, by people who understand the struggle.
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {advantages.map((item, idx) => (
                <FadeIn key={idx} delay={idx * 0.08}>
                  <div className={`bg-white border ${item.border} rounded-3xl p-7 hover:shadow-lg transition-all duration-300 group h-full`}>
                    <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <item.icon size={22} className={item.color} />
                    </div>
                    <h3 className="font-black text-lg text-gray-900 mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SOCIAL PROOF — TESTIMONIALS
        ══════════════════════════════════════════ */}
        <section className="py-20 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
                Students love Internadda
              </h2>
              <p className="text-gray-500 text-lg">Real stories from real students who launched their careers here.</p>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                { name: 'Priya Sharma', role: 'Data Science Intern @ Larex Systems', text: 'I applied on Monday and had an offer letter by Wednesday. The process was incredibly smooth and the company was exactly as described — 100% legit.', avatar: 'PS', stars: 5 },
                { name: 'Aryan Kumar', role: 'Web Dev Intern @ Arjuna AI', text: 'As a 2nd-year student I was skeptical, but InternAdda connected me with a real startup where I\'m actually learning React in production. Life-changing.', avatar: 'AK', stars: 5 },
                { name: 'Sneha Rathi', role: 'UI/UX Intern @ Startup', text: 'The skill course + internship combo is genius. I did the UI/UX course, built a portfolio, and landed an internship all through InternAdda in one month.', avatar: 'SR', stars: 5 },
              ].map((t, i) => (
                <FadeIn key={t.name} delay={i * 0.1}>
                  <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:shadow-gray-100/60 transition-all h-full flex flex-col">
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(t.stars)].map((_, j) => <Star key={j} size={14} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-6">"{t.text}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-black">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900">{t.name}</p>
                        <p className="text-xs text-gray-400 font-medium">{t.role}</p>
                      </div>
                      <CheckCircle2 size={16} className="text-emerald-500 ml-auto" />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FINAL CTA — DARK CINEMATIC
        ══════════════════════════════════════════ */}
        <section className="py-10 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="relative overflow-hidden bg-[#0d0b1f] rounded-3xl p-12 md:p-20 text-center">
                {/* Glow blobs */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-indigo-600/25 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-violet-600/20 rounded-full blur-3xl" />
                  <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
                    <defs>
                      <pattern id="ctadots" width="24" height="24" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.2" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#ctadots)" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 mb-8">
                    <Sparkles size={13} className="text-violet-300" />
                    <span className="text-white/70 text-xs font-black uppercase tracking-widest">Start Your Journey Today</span>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-black text-white mb-5 tracking-tight leading-tight">
                    Ready to launch<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-300 to-cyan-300">
                      your career?
                    </span>
                  </h2>

                  <p className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                    Join thousands of students who found their dream internships through Internadda. Verified. Fast. Trusted.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/internships">
                      <motion.div whileTap={{ scale: 0.98 }}>
                        <Button className="w-full sm:w-auto bg-white text-[#1a1063] hover:bg-gray-100 px-10 py-6 text-base font-black rounded-2xl shadow-2xl flex items-center gap-2">
                          Browse Internships
                          <ArrowRight size={17} />
                        </Button>
                      </motion.div>
                    </Link>
                    <Link href="/auth/signup">
                      <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-10 py-6 text-base font-bold rounded-2xl">
                        Create Free Account
                      </Button>
                    </Link>
                  </div>

                  <p className="text-white/30 text-xs font-black uppercase tracking-[0.2em] mt-10">
                    Learn · Intern · Earn
                  </p>
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

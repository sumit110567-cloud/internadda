'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import {
  ArrowRight, Users, Shield, Clock, Award,
  Zap, Star, MapPin, CheckCircle, TrendingUp,
  GraduationCap, BookOpen, Globe, Verified,
  Rocket, Lightbulb, Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { GlobeHero } from '@/components/globe-hero'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── SEO structured data ─────────────────────────────────────────────────────

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
      description: `${job.title} at ${job.company}. Skills: ${job.skills.join(', ')}. Stipend: ${job.stipend}.`,
      hiringOrganization: { '@type': 'Organization', name: job.company },
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: { '@type': 'Country', name: 'Worldwide' },
      employmentType: 'INTERN',
    },
  })),
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'InternAdda',
  url: 'https://www.internadda.com',
  logo: 'https://www.internadda.com/logo.jpg',
  description: "Global internship discovery platform. Connecting students with opportunities worldwide.",
  foundingDate: '2020',
  sameAs: ['https://upforge.org', 'https://linkedin.com/company/internadda'],
  address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
}

const upforgeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Upforge',
  url: 'https://upforge.org',
  description: 'Global startup discovery platform. Explore what students are building worldwide.',
}

// ─── Global cities data ─────────────────────────────────────────────────────
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

// ─── Student startup showcase ───────────────────────────────────────────────
const STUDENT_STARTUPS = [
  { name: 'EcoCart', idea: 'Sustainable shopping assistant', founder: 'Riya S., Delhi', impact: '10k+ users' },
  { name: 'MediTrack', idea: 'Healthcare records on blockchain', founder: 'Arjun K., Bangalore', impact: '5 hospitals' },
  { name: 'LearnLocal', idea: 'Peer-to-peer language exchange', founder: 'Meera P., Mumbai', impact: '3k+ learners' },
]

const CONTAINER = "max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8"

// ─── Animation primitives ───────────────────────────────────────────────────
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

// ─── Internship Card ────────────────────────────────────────────────────────
function InternshipCard({ id, title, company, stipend, location, skills, applicants, image, tag }: any) {
  const { user } = useAuth()
  const router = useRouter()
  const go = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`)
  }
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all"
    >
      <div className="relative h-36 bg-gray-100 overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-white/90 text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded">{tag}</span>
      </div>
      <div className="p-4">
        <h3 className="text-[15px] font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-[12px] text-gray-500 mb-2">{company}</p>
        <div className="flex items-center justify-between text-[12px] mb-3">
          <span className="font-semibold text-indigo-600">{stipend}</span>
          <span className="text-gray-400 flex items-center gap-1"><MapPin size={10} />{location}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {skills.slice(0, 2).map(s => (
            <span key={s} className="bg-gray-50 text-gray-500 text-[9px] px-2 py-0.5 rounded">{s}</span>
          ))}
          {skills.length > 2 && <span className="text-[9px] text-gray-400">+{skills.length - 2}</span>}
        </div>
        <button onClick={go} className="w-full bg-gray-900 hover:bg-gray-800 text-white text-[12px] font-medium py-2 rounded-lg transition-colors">
          {user ? 'Apply Now' : 'Sign in to Apply'}
        </button>
      </div>
    </motion.article>
  )
}

const METRICS = [
  { icon: Shield, label: 'Verified Companies', value: '500+', color: '#4f46e5' },
  { icon: Users, label: 'Students Placed', value: '15000+', color: '#7c3aed' },
  { icon: Globe, label: 'Countries', value: '40+', color: '#059669' },
]

const PARTNERS = ['Delhi University', 'IIT Bombay', 'Microsoft Learn']

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [tick, setTick] = useState(0)
  
  const TICKER = [
    'Students from 40+ countries use InternAdda',
    '500+ verified companies hiring now',
    '15,000+ successful placements',
  ]
  
  useEffect(() => {
    const t = setInterval(() => setTick(i => (i + 1) % TICKER.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(upforgeSchema) }} />
      <Header />

      <main className="w-full">

        {/* ════════════════════════════════════════
            HERO SECTION - Clean & Balanced
        ════════════════════════════════════════ */}
        <section className="bg-white py-12 lg:py-20">
          <div className={CONTAINER}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
              
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-3 py-1 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span className="text-[10px] font-medium text-indigo-700 tracking-wide">Global Internship Platform</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  Discover Internships
                  <span className="text-indigo-600"> Worldwide</span>
                </h1>
                
                <p className="text-gray-500 text-[15px] leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
                  Connect with verified opportunities across 40+ countries. Find remote, paid, and in-person internships that match your skills.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                  <Link href="/internships">
                    <button className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-[14px] font-medium rounded-lg transition-all inline-flex items-center gap-2">
                      Find Internships <ArrowRight size={14} />
                    </button>
                  </Link>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start gap-4 text-[12px] text-gray-400">
                  <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> No fake listings</span>
                  <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> Verified companies</span>
                  <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> Free for students</span>
                </div>
              </div>
              
              {/* Right - Globe */}
              <div className="flex-1 flex justify-center">
                <GlobeHero />
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Bar */}
        <div className="border-y border-gray-100 bg-gray-50/40">
          <div className={CONTAINER}>
            <div className="grid grid-cols-3 divide-x divide-gray-200">
              {METRICS.map((m) => (
                <div key={m.label} className="flex items-center justify-center gap-3 py-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: m.color + '10' }}>
                    <m.icon size={14} style={{ color: m.color }} />
                  </div>
                  <div>
                    <p className="text-lg font-bold" style={{ color: m.color }}><Counter raw={m.value} /></p>
                    <p className="text-[10px] text-gray-400">{m.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            FEATURED INTERNSHIPS
        ════════════════════════════════════════ */}
        <section className="py-16 bg-white">
          <div className={CONTAINER}>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Opportunities</h2>
              <p className="text-gray-500 text-[14px]">Hand-picked internships from top companies</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredInternships.map((item, i) => (
                <FadeUp key={item.id} delay={i * 0.05}>
                  <InternshipCard {...item} />
                </FadeUp>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/internships" className="inline-flex items-center gap-1 text-[13px] font-medium text-indigo-600 hover:text-indigo-700">
                View all internships <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            UPFORGE - Global Startup Discovery
        ════════════════════════════════════════ */}
        <section className="py-16 bg-gray-50">
          <div className={CONTAINER}>
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-indigo-100 rounded-full px-3 py-1 mb-4">
                  <Rocket size={12} className="text-indigo-600" />
                  <span className="text-[10px] font-medium text-indigo-700 tracking-wide">Discover · Inspire · Build</span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Explore What Students Are Building
                </h2>
                
                <p className="text-gray-500 text-[14px] leading-relaxed mb-5">
                  Upforge is a global discovery platform where students showcase their startups, projects, and ideas. 
                  Get inspired, learn from peers, and see what's possible.
                </p>
                
                <div className="space-y-3 mb-6">
                  {STUDENT_STARTUPS.map((startup, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                        <Lightbulb size={14} className="text-indigo-500" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-gray-800">{startup.name}</h4>
                        <p className="text-[11px] text-gray-500">{startup.idea}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{startup.founder} · {startup.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link href="https://upforge.org" target="_blank" className="inline-flex items-center gap-2 text-[13px] font-medium text-indigo-600 hover:text-indigo-700">
                  Explore more student startups <ArrowRight size={12} />
                </Link>
                <p className="text-[10px] text-gray-400 mt-2">Free to explore · No signup required</p>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm max-w-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
                    <Sparkles size={22} className="text-white" />
                  </div>
                  <h3 className="text-[18px] font-bold text-gray-900 mb-2">Upforge</h3>
                  <p className="text-[13px] text-gray-500 mb-4 leading-relaxed">
                    The global directory of student-built startups. Discover innovative projects, 
                    find collaborators, and showcase your own work.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded">Student Projects</span>
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded">Startup Ideas</span>
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded">Global Community</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            GLOBAL REACH
        ════════════════════════════════════════ */}
        <section className="py-16 bg-white">
          <div className={CONTAINER}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Global Presence</h2>
              <p className="text-gray-500 text-[14px]">Internships available across major cities worldwide</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {GLOBAL_CITIES.map(city => (
                <Link 
                  key={city.name} 
                  href={`/internships?location=${encodeURIComponent(city.name)}`}
                  className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 hover:border-indigo-200 hover:bg-indigo-50 transition-all"
                >
                  <span className="text-[13px]">{city.flag}</span>
                  <span className="text-[12px] text-gray-600">{city.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            WHY INTERNADDA
        ════════════════════════════════════════ */}
        <section className="py-16 bg-gray-50">
          <div className={CONTAINER}>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Why Students Choose Us</h2>
              <p className="text-gray-500 text-[14px]">Built for students, trusted by thousands</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Shield, title: 'Verified Employers', desc: 'Every company vetted before listing' },
                { icon: Globe, title: 'Global Opportunities', desc: 'Remote & in-person roles worldwide' },
                { icon: Zap, title: 'Quick Response', desc: 'Average offer within 48 hours' },
                { icon: Award, title: 'Trusted Platform', desc: 'MSME Registered, Govt of India' },
              ].map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.05}>
                  <div className="bg-white p-5 rounded-xl border border-gray-100 text-center">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mx-auto mb-3">
                      <item.icon size={18} className="text-indigo-600" />
                    </div>
                    <h3 className="text-[14px] font-semibold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-[12px] text-gray-500">{item.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            TESTIMONIALS
        ════════════════════════════════════════ */}
        <section className="py-16 bg-white">
          <div className={CONTAINER}>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Stories</h2>
              <p className="text-gray-500 text-[14px]">Real experiences from real students</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { name: 'Priya Sharma', role: 'Data Science Intern', quote: 'Found my first internship within a week. The platform is easy to use and all opportunities are genuine.', rating: 5 },
                { name: 'Aryan Kumar', role: 'Web Dev Intern', quote: 'The companies are legitimate and responsive. Got an offer in 2 days! Highly recommended.', rating: 5 },
                { name: 'Sneha Rathi', role: 'UI/UX Intern', quote: 'InternAdda helped me kickstart my career. The process was smooth and professional.', rating: 5 },
              ].map((t, i) => (
                <FadeUp key={t.name} delay={i * 0.05}>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, j) => <Star key={j} size={12} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-[13px] text-gray-600 leading-relaxed mb-4">"{t.quote}"</p>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-800">{t.name}</p>
                      <p className="text-[11px] text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CTA BANNER
        ════════════════════════════════════════ */}
        <section className="py-16 px-4">
          <div className="max-w-[1520px] mx-auto">
            <div className="bg-gray-900 rounded-2xl px-8 py-12 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">Ready to Start Your Journey?</h2>
              <p className="text-gray-300 text-[14px] mb-6 max-w-md mx-auto">
                Join thousands of students who found their dream internships through InternAdda.
              </p>
              <Link href="/internships">
                <button className="px-6 py-2.5 bg-white text-gray-900 text-[14px] font-medium rounded-lg hover:bg-gray-100 transition-all inline-flex items-center gap-2">
                  Browse Internships <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

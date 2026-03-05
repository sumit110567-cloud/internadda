'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
  ArrowRight, Users, Shield, Clock, Award,
  Zap, Star, MapPin, CheckCircle, TrendingUp, GraduationCap,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { HeroVisual } from './page-client-components'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const featuredInternships = [
  { id: '1', title: 'Python Developer Intern', company: 'Arjuna AI Solutions', stipend: '₹2,000 – ₹8,000 / mo', location: 'Remote', tag: 'AI & ML', skills: ['Python', 'Django', 'PostgreSQL'], applicants: 131, image: '/python.jpg', otherCompaniesCount: 36, companyLogos: ['/company1.jpg', '/company2.jpg', '/company3.jpg'] },
  { id: '2', title: 'Web Development Intern', company: 'Internadda Enterprises', stipend: '₹2,500 – ₹5,000 / mo', location: 'Remote', tag: 'Frontend', skills: ['React', 'Next.js', 'Tailwind'], applicants: 150, image: '/react.jpg', otherCompaniesCount: 21, companyLogos: ['/company4.jpg', '/company5.jpg', '/company1.jpg'] },
  { id: '3', title: 'Data Science Intern', company: 'Larex Systems', stipend: '₹3,000 – ₹7,000 / mo', location: 'Remote', tag: 'Data Science', skills: ['Python', 'Pandas', 'Matplotlib'], applicants: 130, image: '/datascience.jpg', otherCompaniesCount: 21, companyLogos: ['/company2.jpg', '/company3.jpg', '/company4.jpg'] },
]

const jsonLd = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Featured Internships – InternAdda', itemListElement: featuredInternships.map((job, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'JobPosting', title: job.title, description: `${job.title} at ${job.company}. Skills: ${job.skills.join(', ')}. Stipend: ${job.stipend}.`, hiringOrganization: { '@type': 'Organization', name: job.company, sameAs: 'https://www.internadda.com' }, jobLocationType: 'TELECOMMUTE', applicantLocationRequirements: { '@type': 'Country', name: 'India' }, employmentType: 'INTERN' } })) }
const orgSchema = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InternAdda', url: 'https://www.internadda.com', logo: 'https://www.internadda.com/logo.jpg', description: "India's largest dedicated internship ecosystem. MSME Registered.", foundingDate: '2020', address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' } }

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

function Counter({ raw }: { raw: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const num = parseInt(raw.replace(/\D/g, ''))
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView || isNaN(num)) return
    let c = 0; const step = Math.ceil(num / 55)
    const t = setInterval(() => { c = Math.min(c + step, num); setN(c); if (c >= num) clearInterval(t) }, 18)
    return () => clearInterval(t)
  }, [inView, num])
  if (isNaN(num)) return <span ref={ref}>{raw}</span>
  return <span ref={ref}>{n.toLocaleString('en-IN')}{raw.includes('+') ? '+' : ''}</span>
}

function InternshipCard({ id, title, company, stipend, location, skills, applicants, otherCompaniesCount, image, companyLogos, tag }: any) {
  const { user } = useAuth(); const router = useRouter()
  const go = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`) }
  return (
    <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col hover:shadow-xl hover:shadow-indigo-100/25 hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-44 bg-gray-100 overflow-hidden flex-shrink-0">
        <Image src={image} alt={title} fill sizes="(max-width:768px)100vw,400px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span className="absolute top-3 left-3 bg-white text-gray-700 text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-sm">{tag}</span>
        <span className="absolute top-3 right-3 bg-white text-gray-600 text-[11px] px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1"><Zap size={10} className="text-amber-500 fill-amber-500" />{applicants} applied</span>
      </div>
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">{companyLogos.map((l: string, i: number) => <div key={i} className="w-5 h-5 rounded-full border-2 border-white overflow-hidden relative bg-gray-100 shadow-sm"><Image src={l} alt="" fill className="object-cover" /></div>)}</div>
          <p className="text-xs text-gray-400 truncate">{company}<span className="text-gray-300"> +{otherCompaniesCount}</span></p>
        </div>
        <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">{title}</h3>
        <div className="grid grid-cols-2 gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3">
          <div><p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Stipend</p><p className="text-[13px] font-semibold text-gray-800 leading-tight">{stipend}</p></div>
          <div><p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Location</p><p className="text-[13px] font-semibold text-gray-800 flex items-center gap-1 leading-tight"><MapPin size={10} className="text-indigo-400 flex-shrink-0" />{location}</p></div>
        </div>
        <div className="flex flex-wrap gap-1.5">{skills.map((s: string) => <span key={s} className="border border-gray-200 text-gray-500 text-[11px] px-2.5 py-0.5 rounded-lg bg-white">{s}</span>)}</div>
        <Button onClick={go} className="mt-auto w-full bg-[#1a1063] hover:bg-indigo-900 text-white text-sm font-medium rounded-xl py-5 shadow-sm transition-all">{user ? 'Apply Now' : 'Sign in to Apply'}</Button>
      </div>
    </article>
  )
}

const AVATARS = ['/student1.jpg', '/student2.jpg', '/student3.jpg', '/student4.jpg']
const TICKER = ['Rahul M. applied to Python Developer Intern · 2m ago', 'Ananya P. received an offer from Larex Systems · 5m ago', 'Vikram S. enrolled in the React Fundamentals course · 9m ago', 'Sneha R. landed a Data Science internship · 12m ago']
const METRICS = [
  { icon: Shield, label: 'Verified Companies', value: '200+', c: 'text-indigo-600', bg: 'bg-indigo-50' },
  { icon: Users, label: 'Students Placed', value: '7200+', c: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Clock, label: 'Avg. Offer Time', value: '48h', c: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Award, label: 'Est. Since', value: '2020', c: 'text-amber-600', bg: 'bg-amber-50' },
]
const WHY = [
  { icon: Shield, title: '100% Verified Listings', body: 'Every employer is vetted before publishing. No fake companies, no spam roles — ever.', ic: 'text-indigo-600', bg: 'bg-indigo-50' },
  { icon: Zap, title: 'Offers Within 48 Hours', body: 'Streamlined hiring connects you directly with decision-makers. Average time-to-offer is 48 h.', ic: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: GraduationCap, title: 'Skill Certifications', body: 'Industry-aligned courses with partner-recognised certificates that strengthen every application.', ic: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: TrendingUp, title: 'Structured Career Growth', body: 'Track applications, get actionable feedback, and build a verifiable professional profile.', ic: 'text-emerald-600', bg: 'bg-emerald-50' },
]
const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Data Science Intern · Larex Systems', quote: 'Applied on Monday, offer letter by Wednesday. The company was exactly as described — completely legitimate and professional.', av: 'PS' },
  { name: 'Aryan Kumar', role: 'Web Dev Intern · Arjuna AI', quote: 'As a second-year student I was sceptical. InternAdda placed me with a real product team where I write production code daily.', av: 'AK' },
  { name: 'Sneha Rathi', role: 'UI/UX Intern · Delhi Startup', quote: 'Completed the UI/UX course, built my portfolio, and landed an internship all through InternAdda in under a month.', av: 'SR' },
]

export default function Home() {
  const [tick, setTick] = useState(0)
  useEffect(() => { const t = setInterval(() => setTick(i => (i + 1) % TICKER.length), 3600); return () => clearInterval(t) }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Header />
      <main className="w-full overflow-x-hidden">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-[#f0f2ff] via-[#f7f8ff] to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-0 lg:pt-20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-20">

              {/* Left */}
              <motion.div className="flex-1 pb-12 lg:pb-20"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>

                <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 rounded-full pl-2 pr-4 py-1.5 mb-6 shadow-sm">
                  <span className="bg-indigo-600 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full tracking-wide">#1 IN INDIA</span>
                  <span className="text-gray-600 text-xs">Dedicated Internship Platform · MSME Registered</span>
                </div>

                <h1 className="text-[2.55rem] md:text-5xl xl:text-[3.4rem] font-bold text-gray-900 leading-[1.08] tracking-tight mb-5">
                  India's Largest<br />
                  <span className="text-indigo-600">Internship Ecosystem</span><br />
                  for Students.
                </h1>

                <p className="text-gray-500 text-[1.05rem] leading-relaxed mb-8 max-w-[480px]">
                  Find verified internships at 200+ top companies. Join 7,200 students who landed real roles — fast, trusted, and completely free to start.
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-10">
                  <Link href="/internships">
                    <Button className="bg-[#1a1063] hover:bg-indigo-900 text-white px-6 py-5 text-sm font-semibold rounded-xl shadow-lg shadow-indigo-900/15 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
                      Browse Internships <ArrowRight size={15} />
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-5 text-sm font-semibold rounded-xl transition-all">
                      Explore Courses
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2.5">
                      {AVATARS.map((src, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200 relative shadow-sm flex-shrink-0">
                          <Image src={src} alt="Student" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-800">7,200+ students placed</p>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-amber-400 text-amber-400" />)}
                        <span className="text-[11px] text-gray-400 ml-1.5">4.9 / 5</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3.5 py-2 shadow-sm max-w-[260px] overflow-hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse flex-shrink-0" />
                    <AnimatePresence mode="wait">
                      <motion.span key={tick} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.22 }} className="text-[11px] text-gray-500 truncate">
                        {TICKER[tick]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Right */}
              <motion.div className="flex-1 w-full pb-0 lg:pb-12"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
                <HeroVisual />
              </motion.div>
            </div>
          </div>

          {/* Metrics strip */}
          <div className="border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
                {METRICS.map(m => (
                  <div key={m.label} className="flex items-center gap-3 px-5 py-5 sm:px-7">
                    <div className={`w-9 h-9 ${m.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <m.icon size={17} className={m.c} />
                    </div>
                    <div>
                      <p className={`text-xl font-bold leading-none ${m.c}`}><Counter raw={m.value} /></p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-tight">{m.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PARTNERS ─────────────────────────────────────────────────── */}
        <section className="bg-slate-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              <span className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">Recognised by</span>
              {['Delhi University', 'LAREX', 'Tracxn', 'Arjuna-AI'].map(n => (
                <span key={n} className="text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors cursor-default">{n}</span>
              ))}
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                <Shield size={11} className="text-emerald-600" />
                <span className="text-[11px] text-emerald-700 font-medium">MSME · Govt. of India</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── INTERNSHIPS ──────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
              <div>
                <p className="text-xs font-medium text-indigo-600 uppercase tracking-widest mb-1.5">Handpicked for you</p>
                <h2 className="text-[1.85rem] md:text-4xl font-bold text-gray-900 tracking-tight">Top internships this week</h2>
              </div>
              <Link href="/internships" className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium flex-shrink-0 whitespace-nowrap">
                View all internships <ArrowRight size={14} />
              </Link>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredInternships.map((item, i) => (
                <FadeIn key={item.id} delay={i * 0.07}><InternshipCard {...item} /></FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY INTERNADDA ───────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-[#f7f8ff] border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24">
              <FadeIn className="lg:w-72 xl:w-80 flex-shrink-0 mb-10 lg:mb-0">
                <p className="text-xs font-medium text-indigo-600 uppercase tracking-widest mb-3">Why InternAdda</p>
                <h2 className="text-[1.85rem] md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4">Built for students,<br />not just listings.</h2>
                <p className="text-gray-500 text-[15px] leading-relaxed mb-6">We verify every employer, accelerate every hire, and support your growth with courses and community.</p>
                <Link href="/about">
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-white text-sm font-medium rounded-xl px-5 py-4 inline-flex items-center gap-1.5 transition-all">
                    About InternAdda <ArrowRight size={13} />
                  </Button>
                </Link>
              </FadeIn>
              <div className="flex-1 grid sm:grid-cols-2 gap-4 content-start">
                {WHY.map((w, i) => (
                  <FadeIn key={w.title} delay={i * 0.07}>
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-md transition-all duration-200 h-full">
                      <div className={`w-9 h-9 ${w.bg} rounded-lg flex items-center justify-center mb-4`}>
                        <w.icon size={17} className={w.ic} />
                      </div>
                      <h3 className="text-[14px] font-semibold text-gray-900 mb-1.5 leading-snug">{w.title}</h3>
                      <p className="text-[13px] text-gray-500 leading-relaxed">{w.body}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="mb-10">
              <p className="text-xs font-medium text-indigo-600 uppercase tracking-widest mb-1.5">Student Stories</p>
              <h2 className="text-[1.85rem] md:text-4xl font-bold text-gray-900 tracking-tight">What our students say</h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t, i) => (
                <FadeIn key={t.name} delay={i * 0.07}>
                  <figure className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 h-full flex flex-col">
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, j) => <Star key={j} size={13} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <blockquote className="text-[13px] text-gray-600 leading-relaxed flex-1 mb-5">"{t.quote}"</blockquote>
                    <figcaption className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0">{t.av}</div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-gray-900 leading-none mb-0.5">{t.name}</p>
                        <p className="text-[11px] text-gray-400 truncate">{t.role}</p>
                      </div>
                      <CheckCircle size={14} className="text-emerald-500 ml-auto flex-shrink-0" />
                    </figcaption>
                  </figure>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="pb-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="relative bg-[#1a1063] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-[0.055] pointer-events-none select-none">
                  <svg width="100%" height="100%"><defs><pattern id="dp" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="white" /></pattern></defs><rect width="100%" height="100%" fill="url(#dp)" /></svg>
                </div>
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-indigo-600/40 to-transparent pointer-events-none" />
                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 px-8 md:px-12 py-11">
                  <div className="max-w-lg">
                    <p className="text-indigo-300 text-xs font-medium uppercase tracking-widest mb-2">Ready to begin?</p>
                    <h2 className="text-[1.7rem] md:text-[2.2rem] font-bold text-white leading-tight tracking-tight mb-3">Launch your career<br />with InternAdda.</h2>
                    <p className="text-indigo-200 text-[15px] leading-relaxed">Thousands of students found their first real work experience here. Verified listings, fast hiring, zero cost to apply.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 flex-shrink-0">
                    <Link href="/internships">
                      <Button className="w-full sm:w-auto bg-white text-[#1a1063] hover:bg-indigo-50 font-semibold px-7 py-5 text-sm rounded-xl shadow-lg inline-flex items-center gap-1.5 transition-all">
                        Browse Internships <ArrowRight size={15} />
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button className="w-full sm:w-auto bg-indigo-500/80 hover:bg-indigo-500 text-white border border-indigo-400/40 font-semibold px-7 py-5 text-sm rounded-xl transition-all">
                        Create Free Account
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative border-t border-white/10 px-8 md:px-12 py-3.5 flex flex-wrap gap-x-6 gap-y-2">
                  {['Free to register', 'MSME Registered · Govt. of India', '200+ verified companies', '48 h average offer time'].map(item => (
                    <span key={item} className="flex items-center gap-1.5 text-indigo-300/80 text-xs">
                      <CheckCircle size={11} className="text-indigo-400/70 flex-shrink-0" />{item}
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

// app/about/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion, useInView } from 'framer-motion'
import {
  Users, Target, Zap, Award, CheckCircle,
  GraduationCap, Briefcase, ShieldCheck, Sparkles, ArrowRight,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

// ─── Container — mirrors Header ──────────────────────────────────────────────
const CONTAINER = "max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8"

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const teamMembers = [
  {
    name: 'Lucky Tiwari', role: 'Founder & CEO', image: '/lucky.jpg',
    bio: 'Entrepreneur in EdTech & AI. Building Internadda to bridge the gap between students and real industry experience.',
    expertise: ['EdTech', 'AI Strategy', 'Leadership'],
    color: '#4f46e5',
  },
  {
    name: 'Vikash Yadav', role: 'Co-Founder & PR Head', image: '/vikash.jpg',
    bio: 'Brand communication expert leading partnerships, outreach, and brand positioning at scale.',
    expertise: ['Public Relations', 'Strategy', 'Partnerships'],
    color: '#7c3aed',
  },
  {
    name: 'Sumit Pandey', role: 'CTO', image: '/sumit.jpg',
    bio: 'Full Stack Engineer & System Architect driving the technical vision and scalable platforms.',
    expertise: ['Full Stack', 'Architecture', 'AI/ML'],
    color: '#0891b2',
  },
  {
    name: 'Pranjal Singh', role: 'COO', image: '/pranjal.jpg',
    bio: 'Operations & Growth expert overseeing execution, team management, and scaling strategies.',
    expertise: ['Operations', 'Strategy', 'Scaling'],
    color: '#059669',
  },
]

const milestones = [
  { year: '2020', title: 'The Vision',       desc: 'Started with a mission to solve the internship crisis in India.' },
  { year: '2021', title: 'WhatsApp Growth',  desc: 'Distributed curated roles via WhatsApp, reaching 1,000+ students.' },
  { year: '2022', title: 'Building Phase',   desc: 'Developed the core Internadda platform for automated matching.' },
  { year: '2023', title: 'Startup Network',  desc: 'Partnered with 100+ high-growth tech startups across India.' },
  { year: '2024', title: 'Going Live',       desc: 'Official platform launch with dedicated dashboard for students.' },
  { year: '2025', title: 'MSME Gold',        desc: 'Official MSME Registration & Global Recognition achieved.' },
]

const STATS = [
  { label: 'Corporate Partners',  value: '500+',    icon: Briefcase, color: '#4f46e5', bg: 'rgba(79,70,229,0.08)'  },
  { label: 'Student Enrollments', value: '7,200+',  icon: Users,     color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
  { label: 'Avg. Hiring Time',    value: '48 hrs',  icon: Zap,       color: '#d97706', bg: 'rgba(217,119,6,0.08)'  },
  { label: 'Success Rate',        value: '94%',     icon: Award,     color: '#059669', bg: 'rgba(5,150,105,0.08)'  },
]

const studentAvatars = ['/student1.jpg', '/student2.jpg', '/student3.jpg', '/student4.jpg']

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden">

        {/* ════════════════════════════════════════
            TRUST BAR
        ════════════════════════════════════════ */}
        <div style={{ background: '#1a1063' }}>
          <div className={CONTAINER}>
            <div className="flex flex-wrap items-center justify-center gap-6 py-2.5">
              {[
                { icon: ShieldCheck, label: 'MSME Registered · Govt. of India' },
                { icon: GraduationCap, label: 'Global Recognition' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon size={13} style={{ color: 'rgba(199,210,254,0.7)' }} />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'rgba(255,255,255,0.65)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <section className="relative bg-white overflow-hidden">
          {/* Subtle bg accent */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.06) 0%, transparent 70%)' }} />
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.022 }}>
              <defs><pattern id="ag" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#4f46e5" strokeWidth="0.6" />
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#ag)" />
            </svg>
          </div>

          <div className={`relative ${CONTAINER}`}>
            <div className="flex flex-col items-center text-center pt-14 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16 max-w-3xl mx-auto">

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-2 border border-indigo-100 bg-indigo-50 rounded-full px-3 py-1.5 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span className="text-[10.5px] font-bold text-indigo-700 uppercase tracking-[0.13em]">Our Story & Mission</span>
                </div>

                <h1 className="text-[2rem] sm:text-[2.6rem] xl:text-[3rem] 2xl:text-[3.3rem] font-extrabold text-slate-900 leading-[1.07] tracking-tight mb-4">
                  Empowering India's{' '}
                  <span style={{ color: '#1a1063' }}>Future Professionals.</span>
                </h1>

                <p className="text-slate-500 text-[14.5px] sm:text-[15.5px] leading-[1.75] mb-8 max-w-xl">
                  Internadda is an MSME Registered ecosystem bridging the gap between ambitious students and 500+ verified industry leaders across India.
                </p>

                {/* Social proof pill */}
                <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-2xl shadow-sm px-4 py-2.5">
                  <div className="flex -space-x-2">
                    {studentAvatars.map((src, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200 relative shadow-sm flex-shrink-0">
                        <Image src={src} alt="Student" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[13px] text-slate-600 font-medium">
                    Trusted by <span className="font-bold text-indigo-600">7,200+</span> active students
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            STATS
        ════════════════════════════════════════ */}
        <section className="border-y border-slate-100 bg-slate-50/60">
          <div className={CONTAINER}>
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">
              {STATS.map(({ label, value, icon: Icon, color, bg }) => (
                <FadeUp key={label} className="flex flex-col items-center lg:items-start gap-3 px-5 sm:px-8 py-6 sm:flex-row sm:items-center lg:flex-row">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: bg, border: `1px solid ${color}22` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-[1.6rem] font-extrabold leading-none tabular-nums" style={{ color }}>{value}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{label}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            TIMELINE
        ════════════════════════════════════════ */}
        <section className="py-14 sm:py-16 lg:py-20 bg-white">
          <div className={CONTAINER}>

            <FadeUp className="text-center mb-10">
              <div className="w-8 h-0.5 bg-indigo-600 mx-auto mb-5 rounded-full" />
              <h2 className="text-[1.65rem] sm:text-[1.9rem] xl:text-[2.1rem] font-extrabold text-slate-900 tracking-tight mb-2">
                The Internadda Roadmap
              </h2>
              <p className="text-slate-500 text-[13.5px] max-w-sm mx-auto">
                Evolving from a vision to India's most trusted internship ecosystem.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {milestones.map((item, idx) => (
                <FadeUp key={idx} delay={idx * 0.06}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/40 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11.5px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                        {item.year}
                      </span>
                      <Sparkles size={15} className="text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-[15px] font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors">{item.title}</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            TEAM
        ════════════════════════════════════════ */}
        <section className="py-14 sm:py-16 lg:py-20 bg-slate-50 border-y border-slate-100">
          <div className={CONTAINER}>

            <FadeUp className="text-center mb-10">
              <div className="inline-flex items-center gap-2 border border-indigo-100 bg-indigo-50 rounded-full px-3 py-1.5 mb-4">
                <span className="text-[10.5px] font-bold text-indigo-700 uppercase tracking-[0.13em]">The Architects</span>
              </div>
              <h2 className="text-[1.65rem] sm:text-[1.9rem] xl:text-[2.1rem] font-extrabold text-slate-900 tracking-tight">
                Meet the Founders
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {teamMembers.map((member, idx) => (
                <FadeUp key={idx} delay={idx * 0.07}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="group bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300"
                  >
                    {/* Avatar */}
                    <div className="relative mb-5">
                      <div className="absolute inset-0 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: `radial-gradient(circle, ${member.color}18 0%, transparent 70%)` }} />
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                        <Image src={member.image} alt={member.name} fill className="object-cover" />
                      </div>
                      {/* Color ring on hover */}
                      <div className="absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105"
                        style={{ borderColor: member.color + '40' }} />
                    </div>

                    <h3 className="text-[15px] font-bold text-slate-900 mb-0.5">{member.name}</h3>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: member.color }}>{member.role}</p>
                    <p className="text-[12.5px] text-slate-500 leading-relaxed mb-4">{member.bio}</p>

                    <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
                      {member.expertise.map((exp) => (
                        <span key={exp} className="text-[10.5px] font-semibold px-2.5 py-0.5 rounded-md"
                          style={{ background: member.color + '10', color: member.color, border: `1px solid ${member.color}20` }}>
                          {exp}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            MISSION + VALUES
        ════════════════════════════════════════ */}
        <section className="py-14 sm:py-16 lg:py-20 bg-white">
          <div className={CONTAINER}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 xl:gap-20">

              {/* Left */}
              <FadeUp className="text-center lg:text-left lg:w-80 xl:w-96 flex-shrink-0 mb-10 lg:mb-0">
                <p className="text-[10.5px] font-bold text-indigo-600 uppercase tracking-widest mb-2">What drives us</p>
                <h2 className="text-[1.65rem] sm:text-[1.9rem] font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                  A mission built<br />for every student.
                </h2>
                <p className="text-slate-500 text-[13.5px] leading-relaxed max-w-sm mx-auto lg:mx-0">
                  We believe every student deserves access to real, meaningful work experience — regardless of college tier, city, or background.
                </p>
              </FadeUp>

              {/* Right values */}
              <div className="flex-1 grid sm:grid-cols-2 gap-3.5">
                {[
                  { icon: ShieldCheck, title: 'Verified at every step',      body: 'Every employer goes through a multi-point verification before listing on our platform.',     color: '#4f46e5', bg: '#eef2ff' },
                  { icon: Zap,         title: 'Speed that matches ambition',  body: 'From application to offer in 48 hours — because opportunity shouldn\'t wait.',              color: '#d97706', bg: '#fffbeb' },
                  { icon: Target,      title: 'Precision matching',           body: 'Roles matched to your actual skills, not just your resume keywords.',                       color: '#7c3aed', bg: '#f5f3ff' },
                  { icon: Users,       title: 'Community first',              body: 'A growing network of students, mentors, and companies working toward shared growth.',       color: '#059669', bg: '#ecfdf5' },
                ].map((v, i) => (
                  <FadeUp key={v.title} delay={i * 0.06}>
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/40 transition-all duration-300"
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3.5"
                        style={{ background: v.bg, border: `1px solid ${v.color}22` }}>
                        <v.icon size={16} style={{ color: v.color }} />
                      </div>
                      <h3 className="text-[13.5px] font-bold text-slate-900 mb-1.5">{v.title}</h3>
                      <p className="text-[12.5px] text-slate-500 leading-relaxed">{v.body}</p>
                    </motion.div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CTA BANNER
        ════════════════════════════════════════ */}
        <section className="pb-12 sm:pb-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1520px] mx-auto">
            <FadeUp>
              <div className="relative rounded-2xl overflow-hidden" style={{ background: '#1a1063' }}>
                {/* Texture */}
                <div aria-hidden className="absolute inset-0 opacity-[0.04] pointer-events-none">
                  <svg width="100%" height="100%">
                    <defs><pattern id="adp" width="24" height="24" patternUnits="userSpaceOnUse">
                      <circle cx="1.5" cy="1.5" r="1" fill="white" />
                    </pattern></defs>
                    <rect width="100%" height="100%" fill="url(#adp)" />
                  </svg>
                </div>
                <div aria-hidden className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
                  style={{ background: 'linear-gradient(to left, rgba(99,102,241,0.28), transparent)' }} />

                {/* Content */}
                <div className="relative flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left gap-7 px-7 sm:px-10 xl:px-14 py-10">
                  <div className="max-w-lg">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: 'rgba(196,181,253,0.9)' }}>Join the gold standard</p>
                    <h2 className="text-[1.55rem] sm:text-[1.85rem] xl:text-[2.1rem] font-extrabold text-white leading-tight tracking-tight mb-2.5">
                      India's most trusted<br />internship ecosystem.
                    </h2>
                    <p className="text-[13.5px] leading-relaxed max-w-md mx-auto lg:mx-0" style={{ color: 'rgba(199,210,254,0.75)' }}>
                      Whether you're a student seeking industry exposure or a startup looking for verified talent — Internadda is your gateway.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full sm:w-auto">
                    <Link href="/internships" className="w-full sm:w-auto">
                      <button className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#1a1063] hover:bg-slate-50 font-bold px-6 py-3 text-[13.5px] rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                        Get Started Today <ArrowRight size={14} />
                      </button>
                    </Link>
                    <Link href="/auth/signup" className="w-full sm:w-auto">
                      <button className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3 text-[13.5px] rounded-xl transition-all">
                        Partner with Us
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Trust footnote */}
                <div className="relative px-7 sm:px-10 xl:px-14 py-3.5 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-1.5"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  {['MSME Registered', '500+ hiring partners', '7,200+ placed students', '94% success rate'].map(item => (
                    <span key={item} className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: 'rgba(199,210,254,0.65)' }}>
                      <CheckCircle size={9} style={{ color: 'rgba(199,210,254,0.5)' }} className="flex-shrink-0" />{item}
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

"use client"
// app/help-center/page.tsx

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Search, ChevronDown,
  Zap, ShieldCheck, MessageCircle, Users,
  BookOpen, CreditCard, UserCircle, ClipboardList,
  Briefcase, HelpCircle, Star,
} from 'lucide-react'

const up = (delay = 0) => ({
  initial:    { opacity: 0, y: 16 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.46, delay, ease: [0.22, 1, 0.36, 1] as any },
})

// ── FAQ data ───────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id:    'getting-started',
    icon:  Zap,
    label: 'Getting Started',
    color: '#1a1063',
    bg:    '#eef2ff',
    faqs: [
      {
        q: 'What is Internadda?',
        a: 'Internadda is India\'s leading internship and skill assessment platform. We connect students and fresh graduates with verified internship opportunities across sectors like Frontend Development, AI & ML, Data Science, UI/UX Design, Digital Marketing, and Full Stack Development.',
      },
      {
        q: 'Is Internadda free to use?',
        a: 'Yes — browsing internships, creating your profile, and applying to opportunities is completely free. The only optional fee is ₹199 for the official Skill Assessment Certificate, which you can choose to get after completing a test.',
      },
      {
        q: 'Who can use Internadda?',
        a: 'Internadda is designed for college students, recent graduates, and young professionals (typically aged 18–27) looking for their first or next internship opportunity in India.',
      },
      {
        q: 'Is Internadda government-registered?',
        a: 'Yes. Internadda is an MSME-registered entity under the Government of India, operating from New Delhi. Our MSME registration adds a layer of credibility and accountability to everything we do.',
      },
    ],
  },
  {
    id:    'account',
    icon:  UserCircle,
    label: 'Account & Profile',
    color: '#0A66C2',
    bg:    '#eff6ff',
    faqs: [
      {
        q: 'How do I create an account?',
        a: 'Click "Sign Up" on the homepage, enter your email and create a password. Verify your email and you\'re in. The whole process takes under 2 minutes.',
      },
      {
        q: 'What should I fill in my profile?',
        a: 'A complete profile significantly improves your chances of getting responses from companies. Add your full name, university, skills, expected graduation year, a short bio, and your preferred sectors. The more complete your profile, the better.',
      },
      {
        q: 'Can I edit my profile after signing up?',
        a: 'Absolutely. Go to your Profile page at any time to update your name, university, skills, bio, and contact details.',
      },
      {
        q: 'I forgot my password. What should I do?',
        a: 'Click "Forgot Password" on the sign-in page. Enter your registered email and we\'ll send you a secure password reset link within a few minutes.',
      },
    ],
  },
  {
    id:    'internships',
    icon:  Briefcase,
    label: 'Internships',
    color: '#7c3aed',
    bg:    '#f5f3ff',
    faqs: [
      {
        q: 'How do I apply for an internship?',
        a: 'Browse the Internships page, find a role that matches your skills, and click "Apply Now." If you\'re signed in, your profile is sent directly to the company. You\'ll receive email updates on your application status.',
      },
      {
        q: 'Are all listed companies verified?',
        a: 'We manually review all company registrations before approving listings. While we take every precaution, we also recommend independently verifying a company before sharing sensitive personal documents.',
      },
      {
        q: 'How long does it take to hear back from companies?',
        a: 'Response times vary by company. Most active listings receive a response within 3–7 working days. If you haven\'t heard back in 10 days, it\'s fine to apply to other roles.',
      },
      {
        q: 'Can I apply to multiple internships at once?',
        a: 'Yes, you can apply to as many internships as you like. We recommend applying to 5–10 relevant roles to maximize your chances of landing an interview.',
      },
    ],
  },
  {
    id:    'tests',
    icon:  ClipboardList,
    label: 'Skill Assessment Tests',
    color: '#059669',
    bg:    '#ecfdf5',
    faqs: [
      {
        q: 'What is the Skill Assessment Test?',
        a: 'The Skill Assessment Test is a 10-question MCQ test designed for a specific sector (e.g., Frontend Development, Data Science). It takes 10–20 minutes and tests your domain knowledge. You receive an instant marksheet with your score and grade.',
      },
      {
        q: 'How are the tests graded?',
        a: 'Each correct answer earns +4 marks. There are no negative marks. Your percentage score is mapped to a grade: A+ (90–100%), A (75–89%), B (60–74%), C (45–59%), and D (below 45%).',
      },
      {
        q: 'Can I retake a test?',
        a: 'Yes. You can retake any sector test as many times as you like. Different question sets are used each time to give you a fresh assessment. Your most recent score is what you see on your marksheet.',
      },
      {
        q: 'Who creates the test questions?',
        a: 'All questions are created and reviewed by our in-house subject matter experts with industry experience in each sector. Questions are regularly updated to reflect current industry standards.',
      },
    ],
  },
  {
    id:    'certificate',
    icon:  Star,
    label: 'Certificate & Fees',
    color: '#d97706',
    bg:    '#fffbeb',
    faqs: [
      {
        q: 'What is the ₹199 fee for?',
        a: 'The ₹199 fee is strictly for the official digital Skill Assessment Certificate. It is completely optional — you can take tests, view your marksheet, and apply for internships without paying anything.',
      },
      {
        q: 'What does the certificate include?',
        a: 'Your certificate includes your full name, test sector, grade achieved, date of assessment, and Internadda\'s MSME registration details. It comes with a unique verification ID that employers can use to authenticate it.',
      },
      {
        q: 'Is the certificate recognized by employers?',
        a: 'The certificate is issued by an MSME-registered entity, which adds credibility for Indian employers. Many students have used it as a conversation starter in interviews. Its weight ultimately depends on the employer.',
      },
      {
        q: 'Is the fee refundable?',
        a: 'The ₹199 certificate fee is non-refundable once the certificate has been generated. Please ensure you are satisfied with your test score before purchasing the certificate.',
      },
    ],
  },
  {
    id:    'support',
    icon:  HelpCircle,
    label: 'Support & Contact',
    color: '#E1306C',
    bg:    '#fff0f5',
    faqs: [
      {
        q: 'How can I reach the Internadda team?',
        a: 'You can reach us via email at support@internadda.com, or on WhatsApp at +91 92177 13161 (Mon–Sat, 10 AM–7 PM IST). We typically reply within a few hours.',
      },
      {
        q: 'I found a suspicious listing. What should I do?',
        a: 'Please report it immediately at support@internadda.com with the company name and listing URL. We take fraudulent listings extremely seriously and investigate all reports within 24 hours.',
      },
      {
        q: 'How do I delete my account?',
        a: 'To delete your account and all associated data, email support@internadda.com from your registered email address with the subject "Account Deletion Request." We process requests within 7 working days.',
      },
      {
        q: 'Where can I find your Privacy Policy and Terms?',
        a: 'Our Privacy Policy, Terms of Service, and Disclaimer are all accessible via links in the footer of every page on Internadda. You can also visit /disclaimer and /privacy directly.',
      },
    ],
  },
]

// ── Quick stats ────────────────────────────────────────────────────────────────
const STATS = [
  { v: '24',   l: 'FAQs Answered',   icon: BookOpen },
  { v: '< 24h', l: 'Support Reply',  icon: MessageCircle },
  { v: '4.9★',  l: 'User Rating',    icon: Star },
  { v: 'Free',  l: 'Always',         icon: ShieldCheck },
]

export default function HelpCenterPage() {
  const [query,      setQuery]      = useState('')
  const [activeTab,  setActiveTab]  = useState('all')
  const [expanded,   setExpanded]   = useState<string | null>(null)

  // Filter FAQs by search query
  const filteredCats = CATEGORIES
    .filter(c => activeTab === 'all' || c.id === activeTab)
    .map(c => ({
      ...c,
      faqs: query.trim()
        ? c.faqs.filter(
            f =>
              f.q.toLowerCase().includes(query.toLowerCase()) ||
              f.a.toLowerCase().includes(query.toLowerCase())
          )
        : c.faqs,
    }))
    .filter(c => c.faqs.length > 0)

  const totalResults = filteredCats.reduce((sum, c) => sum + c.faqs.length, 0)

  return (
    <div className="min-h-screen bg-[#f8fafc]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[700px] h-[460px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(79,70,229,0.05) 0%,transparent 68%)' }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.013 }}>
          <defs><pattern id="gr" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M36 0L0 0 0 36" fill="none" stroke="#1a1063" strokeWidth="0.6" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#gr)" />
        </svg>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 h-14 flex items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative w-7 h-7 rounded-lg overflow-hidden flex-shrink-0">
            <Image src="/logo.jpg" alt="Internadda" fill className="object-cover" />
          </div>
          <span className="font-black text-[15px] text-slate-900 tracking-tight hidden sm:block">
            Intern<span className="text-indigo-600">adda</span>
          </span>
        </Link>
        <Link href="/" className="flex items-center gap-1.5 text-[12px] font-bold text-slate-500 hover:text-[#1a1063] transition-colors group">
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </Link>
      </nav>

      <div className="relative z-10 max-w-[860px] mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* ── Hero ── */}
        <motion.div {...up(0)} className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-xl shadow-indigo-900/15 border border-white">
              <Image src="/logo.jpg" alt="Internadda" fill className="object-cover" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-3.5 py-1.5 mb-4">
            <HelpCircle size={11} className="text-indigo-500" />
            <span className="text-[9.5px] font-bold text-indigo-600 uppercase tracking-widest">Help Center</span>
          </div>

          <h1 className="text-[2.4rem] sm:text-[3rem] font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            How can we help you?
          </h1>
          <p className="text-slate-500 text-[14.5px] max-w-md mx-auto leading-relaxed mb-8">
            Find answers to common questions about Internadda — from getting started to skill tests and certificates.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search questions… e.g. 'certificate fee', 'apply internship'"
              className="w-full h-12 pl-11 pr-4 bg-white border border-slate-200 rounded-2xl text-[13.5px] text-slate-700 placeholder:text-slate-400 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100/60 shadow-sm transition-all"
            />
            {query && (
              <button onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center text-xs font-bold transition-colors">
                ✕
              </button>
            )}
          </div>

          {/* Search result count */}
          {query && (
            <p className="text-[11.5px] text-slate-400 font-medium mt-2.5">
              {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
            </p>
          )}
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div {...up(0.06)} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {STATS.map(s => (
            <div key={s.l} className="bg-white border border-slate-200 rounded-2xl px-4 py-4 text-center shadow-sm">
              <p className="text-[1.15rem] font-extrabold text-[#1a1063] leading-none mb-1">{s.v}</p>
              <p className="text-[9.5px] font-bold uppercase tracking-wide text-slate-400">{s.l}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Category tabs ── */}
        {!query && (
          <motion.div {...up(0.08)} className="mb-6 -mx-1">
            <div className="flex gap-2 flex-wrap px-1">
              <button
                onClick={() => setActiveTab('all')}
                className="h-8 px-4 rounded-full text-[11.5px] font-bold transition-all"
                style={{
                  background: activeTab === 'all' ? '#1a1063' : '#fff',
                  color:      activeTab === 'all' ? '#fff'    : '#64748b',
                  border:     activeTab === 'all' ? 'none'    : '1px solid #e2e8f0',
                }}>
                All Topics
              </button>
              {CATEGORIES.map(c => (
                <button key={c.id}
                  onClick={() => setActiveTab(c.id)}
                  className="h-8 px-4 rounded-full text-[11.5px] font-bold transition-all flex items-center gap-1.5"
                  style={{
                    background: activeTab === c.id ? c.color : '#fff',
                    color:      activeTab === c.id ? '#fff'   : '#64748b',
                    border:     activeTab === c.id ? 'none'   : '1px solid #e2e8f0',
                  }}>
                  <c.icon size={10} />
                  {c.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── FAQ sections ── */}
        <div className="space-y-5">
          {filteredCats.length === 0 ? (
            <motion.div {...up(0)}
              className="bg-white border border-slate-200 rounded-2xl px-6 py-14 text-center shadow-sm">
              <HelpCircle size={28} className="text-slate-300 mx-auto mb-3" />
              <p className="text-[14px] font-bold text-slate-700 mb-1">No results found</p>
              <p className="text-[12.5px] text-slate-400 mb-5">Try a different search or browse all topics</p>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => setQuery('')}
                  className="h-9 px-5 rounded-xl text-[12.5px] font-bold bg-[#1a1063] text-white">
                  Clear search
                </button>
                <Link href="/contact"
                  className="h-9 px-5 rounded-xl text-[12.5px] font-bold border border-slate-200 text-slate-600 hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                  Ask our team
                </Link>
              </div>
            </motion.div>
          ) : (
            filteredCats.map((cat, ci) => (
              <motion.div key={cat.id} {...up(0.08 + ci * 0.04)}>
                {/* Category header */}
                {(activeTab === 'all' || query) && (
                  <div className="flex items-center gap-2.5 mb-3 px-1">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: cat.bg }}>
                      <cat.icon size={13} style={{ color: cat.color }} />
                    </div>
                    <h2 className="text-[13.5px] font-extrabold text-slate-800">{cat.label}</h2>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {cat.faqs.length}
                    </span>
                  </div>
                )}

                {/* Accordion */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100">
                  {cat.faqs.map((faq, fi) => {
                    const key = `${cat.id}-${fi}`
                    const open = expanded === key
                    return (
                      <div key={fi}>
                        <button
                          onClick={() => setExpanded(open ? null : key)}
                          className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                        >
                          <span className="text-[13.5px] font-bold text-slate-800 leading-snug">{faq.q}</span>
                          <motion.div
                            animate={{ rotate: open ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0">
                            <ChevronDown size={16} className="text-slate-400" />
                          </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div className="px-5 sm:px-6 pb-5 pt-0.5">
                                <p className="text-[13px] text-slate-600 leading-[1.78]">{faq.a}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* ── Still need help? ── */}
        <motion.div {...up(0.2)} className="mt-8">
          <div className="bg-white border border-slate-200 rounded-3xl px-6 sm:px-10 py-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

              {/* Email */}
              <a href="mailto:support@internadda.com"
                className="group flex flex-col items-center text-center p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <BookOpen size={16} className="text-indigo-600" />
                </div>
                <p className="text-[13px] font-extrabold text-slate-800 mb-1">Email Us</p>
                <p className="text-[11.5px] text-slate-400 leading-snug">support@internadda.com</p>
                <p className="text-[10.5px] text-indigo-500 font-bold mt-2">Reply &lt; 24 hrs</p>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/919217713161?text=Hi%20Internadda%20Support!" target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center text-center p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/40 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <MessageCircle size={16} className="text-emerald-600" />
                </div>
                <p className="text-[13px] font-extrabold text-slate-800 mb-1">WhatsApp</p>
                <p className="text-[11.5px] text-slate-400 leading-snug">+91 92177 13161</p>
                <p className="text-[10.5px] text-emerald-500 font-bold mt-2">Mon–Sat · 10 AM–7 PM</p>
              </a>

              {/* Community */}
              <Link href="/community"
                className="group flex flex-col items-center text-center p-4 rounded-2xl border border-slate-100 hover:border-violet-200 hover:bg-violet-50/40 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Users size={16} className="text-violet-600" />
                </div>
                <p className="text-[13px] font-extrabold text-slate-800 mb-1">Community</p>
                <p className="text-[11.5px] text-slate-400 leading-snug">Ask 8,000+ students</p>
                <p className="text-[10.5px] text-violet-500 font-bold mt-2">Join free →</p>
              </Link>

            </div>

            <div className="text-center mt-6 pt-5 border-t border-slate-100">
              <p className="text-[12.5px] text-slate-400 font-medium">
                Can't find what you're looking for?{' '}
                <Link href="/contact" className="text-indigo-600 font-bold hover:underline">
                  Send us a message
                </Link>{' '}
                and we'll get back to you personally.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Join CTA ── */}
        <motion.div {...up(0.24)} className="mt-7">
          <div className="relative rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#0d0622 0%,#1a1063 50%,#2a1fa8 100%)' }}>
            <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
                <defs><pattern id="dd" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1" fill="white" />
                </pattern></defs>
                <rect width="100%" height="100%" fill="url(#dd)" />
              </svg>
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
                style={{ background: 'radial-gradient(ellipse,#818cf8 0%,transparent 70%)' }} />
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 px-7 sm:px-10 py-8">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-lg border border-white/20">
                <Image src="/logo.jpg" alt="Internadda" fill className="object-cover" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-white font-extrabold text-[1.1rem] tracking-tight mb-1">
                  Ready to launch your career?
                </p>
                <p className="text-[12.5px]" style={{ color: 'rgba(199,210,254,0.7)' }}>
                  Join 8,000+ students · MSME certified · 100% free to start
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
                <Link href="/internships"
                  className="flex items-center gap-2 h-10 px-5 rounded-xl font-bold text-[12.5px] text-[#1a1063] bg-white hover:bg-slate-50 transition-all active:scale-[0.98]">
                  Browse Internships <ArrowRight size={12} />
                </Link>
                <Link href="/test"
                  className="flex items-center gap-2 h-10 px-5 rounded-xl font-bold text-[12.5px] transition-all"
                  style={{ border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(199,210,254,0.9)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
                  Free Skill Test <Zap size={11} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p {...up(0.27)} className="text-center text-[11px] text-slate-400 font-medium mt-7">
          © {new Date().getFullYear()} Internadda Enterprises · MSME Registered · New Delhi, India
        </motion.p>

      </div>
    </div>
  )
}

"use client"
// app/disclaimer/page.tsx

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, ShieldCheck, Scale,
  Lock, AlertCircle, FileText, ExternalLink, Zap,
} from 'lucide-react'

const up = (delay = 0) => ({
  initial:    { opacity: 0, y: 16 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.46, delay, ease: [0.22, 1, 0.36, 1] as any },
})

const UPDATED = 'January 15, 2025'

const SECTIONS = [
  {
    id: 'general',
    icon: FileText,
    title: 'General Disclaimer',
    paras: [
      'The information provided on Internadda ("the Platform") is intended for general informational and educational purposes only. While we make every effort to keep all content accurate, complete, and up to date, we make no warranties — express or implied — regarding the reliability or suitability of any information on this platform.',
      'Internadda connects students and fresh graduates with internship and career opportunities. We do not guarantee employment, internship placement, or specific career outcomes as a result of using our services.',
    ],
  },
  {
    id: 'listings',
    icon: ExternalLink,
    title: 'Third-Party Listings & Companies',
    paras: [
      'Internship and job listings on Internadda are provided by third-party employers. We make reasonable efforts to verify company details, but cannot guarantee the accuracy, legitimacy, or continued availability of any specific opportunity.',
      'Internadda does not endorse any individual company or organization listed on the platform. Users are encouraged to independently verify company credentials before applying or sharing personal information with any employer.',
    ],
  },
  {
    id: 'certificates',
    icon: ShieldCheck,
    title: 'Skill Assessments & Certificates',
    paras: [
      'Skill Assessment Tests on Internadda help students evaluate domain knowledge and demonstrate readiness to employers. Certificates issued upon completion are a recognition of performance on our platform assessments — they are not equivalent to formal academic degrees or government-issued credentials.',
      'The optional ₹199 Skill Assessment Certificate fee is a one-time platform charge for certificate issuance and digital verification. This fee is clearly disclosed at the point of purchase and is non-refundable once a certificate has been generated.',
    ],
  },
  {
    id: 'data',
    icon: Lock,
    title: 'Data & Privacy',
    paras: [
      'Internadda collects and processes user data strictly in accordance with its Privacy Policy. We are committed to protecting your personal information and use it solely for providing and improving our services.',
      'We do not sell, rent, or trade your personal information to any third party without explicit consent, except as required by applicable Indian law.',
    ],
  },
  {
    id: 'liability',
    icon: Scale,
    title: 'Limitation of Liability',
    paras: [
      'To the fullest extent permitted by applicable law, Internadda, its founders, employees, and partners shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform — including loss of data, loss of income, or inability to access services.',
      'Our total liability to you for any claim arising from platform use shall not exceed the amount paid by you to Internadda in the twelve months preceding the claim.',
    ],
  },
  {
    id: 'updates',
    icon: AlertCircle,
    title: 'Changes to This Disclaimer',
    paras: [
      'Internadda reserves the right to update this disclaimer at any time. Changes take effect immediately upon posting. Continued use of the platform following any update constitutes your acceptance of the revised disclaimer.',
      'We encourage users to review this page periodically to stay informed of any updates.',
    ],
  },
]

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'MSME Registered',  color: '#059669', bg: '#ecfdf5', border: '#6ee7b7' },
  { icon: Lock,        label: 'Data Protected',    color: '#1a1063', bg: '#eef2ff', border: '#a5b4fc' },
  { icon: Scale,       label: 'India Compliant',   color: '#0A66C2', bg: '#eff6ff', border: '#93c5fd' },
]

export default function DisclaimerPage() {
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

      <div className="relative z-10 max-w-[760px] mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* ── Page Header ── */}
        <motion.div {...up(0)} className="mb-10">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#1a1063] flex items-center justify-center shadow-lg shadow-indigo-900/20 flex-shrink-0">
              <Scale size={20} className="text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 mb-1">
                <span className="w-1 h-1 rounded-full bg-indigo-500" />
                <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">Legal Document</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Last updated: {UPDATED}</p>
            </div>
          </div>

          <h1 className="text-[2.6rem] sm:text-[3.2rem] font-extrabold text-slate-900 tracking-tight leading-none mb-3">
            Disclaimer
          </h1>
          <p className="text-slate-500 text-[14px] leading-relaxed max-w-xl">
            Please read this disclaimer carefully before using Internadda. By accessing our services you agree to the terms described below.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 mt-5">
            {TRUST_BADGES.map(b => (
              <span key={b.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10.5px] font-bold"
                style={{ background: b.bg, border: `1px solid ${b.border}`, color: b.color }}>
                <b.icon size={10} strokeWidth={2.5} /> {b.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Table of Contents ── */}
        <motion.div {...up(0.06)}
          className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-7 shadow-sm">
          <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest mb-3.5">Table of Contents</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {SECTIONS.map((s, i) => (
              <a key={s.id} href={`#${s.id}`}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors group">
                <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 text-[9.5px] font-black flex items-center justify-center flex-shrink-0 transition-colors">
                  {i + 1}
                </span>
                <span className="text-[12.5px] font-semibold text-slate-600 group-hover:text-indigo-700 transition-colors">
                  {s.title}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Sections ── */}
        <div className="space-y-4">
          {SECTIONS.map((s, i) => (
            <motion.section
              key={s.id}
              id={s.id}
              {...up(0.08 + i * 0.035)}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm scroll-mt-20"
            >
              {/* Header strip */}
              <div className="flex items-center gap-3 px-5 sm:px-6 py-3.5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                  <s.icon size={13} className="text-indigo-600" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-slate-300 tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-[14px] font-extrabold text-slate-900">{s.title}</h2>
                </div>
              </div>
              {/* Body */}
              <div className="px-5 sm:px-6 py-5 space-y-3">
                {s.paras.map((p, j) => (
                  <p key={j} className="text-[13.5px] text-slate-600 leading-[1.78]">{p}</p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* ── Governing Law ── */}
        <motion.div {...up(0.22)}
          className="mt-5 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
          <AlertCircle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[12.5px] font-extrabold text-amber-800 mb-0.5">Governing Law</p>
            <p className="text-[12px] text-amber-700 leading-relaxed">
              This disclaimer is governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
            </p>
          </div>
        </motion.div>

        {/* ── Contact row ── */}
        <motion.div {...up(0.24)}
          className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl px-5 sm:px-6 py-4 shadow-sm">
          <div>
            <p className="text-[13px] font-bold text-slate-800">Questions about this disclaimer?</p>
            <p className="text-[12px] text-slate-500 mt-0.5">
              Email{' '}
              <a href="mailto:support@internadda.com" className="text-indigo-600 font-semibold hover:underline">
                support@internadda.com
              </a>
            </p>
          </div>
          <Link href="/contact"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-xl font-bold text-[12.5px] text-white whitespace-nowrap flex-shrink-0 transition-all active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg,#1a1063,#3730a3)', boxShadow: '0 3px 12px rgba(26,16,99,0.2)' }}>
            Contact Us <ArrowRight size={12} />
          </Link>
        </motion.div>

        {/* ── Join CTA ── */}
        <motion.div {...up(0.27)} className="mt-8">
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
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 px-7 sm:px-10 py-8">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-lg border border-white/20">
                <Image src="/logo.jpg" alt="Internadda" fill className="object-cover" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-white font-extrabold text-[1.1rem] tracking-tight mb-1">
                  Trusted by 8,000+ students across India
                </p>
                <p className="text-[12.5px]" style={{ color: 'rgba(199,210,254,0.7)' }}>
                  MSME-certified · 100% free to join · Verified companies only
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

        <motion.p {...up(0.3)} className="text-center text-[11px] text-slate-400 font-medium mt-7">
          © {new Date().getFullYear()} Internadda Enterprises · MSME Registered · New Delhi, India
        </motion.p>
      </div>
    </div>
  )
}

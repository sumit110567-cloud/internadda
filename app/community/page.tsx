"use client"
// app/community/page.tsx

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Users, Zap,
  MessageCircle, ExternalLink, Star, ShieldCheck,
} from 'lucide-react'

const up = (delay = 0) => ({
  initial:    { opacity: 0, y: 18 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as any },
})

// ── 3 channels only ────────────────────────────────────────────────────────────
const CHANNELS = [
  {
    id:      'linkedin',
    name:    'LinkedIn',
    handle:  'Internadda',
    value:   '1,000+ professionals',
    desc:    'Company updates, hiring announcements, and industry insights from the Internadda network.',
    cta:     'Follow on LinkedIn',
    href:    'https://www.linkedin.com/company/Internadda-india',
    accent:  '#0A66C2',
    bg:      '#EFF6FF',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id:      'instagram',
    name:    'Instagram',
    handle:  '@internadda',
    value:   '3,000+ followers',
    desc:    'Daily reels on career hacks, internship openings, resume tips, and real student wins.',
    cta:     'Follow on Instagram',
    href:    'https://www.linkedin.com/company/Internadda-india',
    accent:  '#C13584',
    bg:      '#FFF0F7',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    id:      'whatsapp',
    name:    'WhatsApp',
    handle:  'Community Group',
    value:   '500+ active members',
    desc:    'Instant internship alerts, test reminders, peer Q&A, and direct support from our team.',
    cta:     'Join WhatsApp Group',
    href:    'https://wa.me/919217713161?text=Hi!%20I%20want%20to%20join%20the%20Internadda%20community',
    accent:  '#25D366',
    bg:      '#F0FDF4',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Subtle background ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-72 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(79,70,229,0.05) 0%,transparent 68%)' }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.014 }}>
          <defs>
            <pattern id="g" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M36 0L0 0 0 36" fill="none" stroke="#1a1063" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 h-14 flex items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative w-7 h-7 rounded-lg overflow-hidden flex-shrink-0">
            <Image src="/logo.jpg" alt="Internadda" fill className="object-cover" />
          </div>
          <span className="font-black text-[15px] text-slate-900 hidden sm:block tracking-tight">
            Intern<span className="text-indigo-600">adda</span>
          </span>
        </Link>
        <Link href="/"
          className="flex items-center gap-1.5 text-[12px] font-bold text-slate-500 hover:text-[#1a1063] transition-colors group">
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </Link>
      </nav>

      <div className="relative z-10 max-w-[860px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">

        {/* ── HERO ── */}
        <motion.div {...up(0)} className="text-center space-y-5">

          {/* Logo mark */}
          <div className="flex justify-center">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-xl shadow-indigo-900/15 border border-white">
              <Image src="/logo.jpg" alt="Internadda" fill className="object-cover" />
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-3.5 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[9.5px] font-bold text-indigo-600 uppercase tracking-widest">
                India's Student Career Community
              </span>
            </div>

            <h1 className="text-[2.2rem] sm:text-[3rem] font-extrabold text-slate-900 tracking-tight leading-[1.05] mb-3">
              Grow with the<br />
              <span style={{ color: '#1a1063' }}>Internadda Community</span>
            </h1>

            <p className="text-slate-500 text-[14.5px] max-w-lg mx-auto leading-relaxed">
              Real students. Real opportunities. A community built to help you land your first internship and build a career you're proud of.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap pt-1">
            {[
              { v: '8,000+', l: 'Members' },
              { v: '500+',   l: 'Internships Shared' },
              { v: '4.9★',   l: 'Community Rating' },
              { v: 'Free',   l: 'Always' },
            ].map(s => (
              <div key={s.l}
                className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-center shadow-sm min-w-[80px]">
                <p className="text-[1.05rem] font-extrabold text-[#1a1063] leading-none">{s.v}</p>
                <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400 mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── SOCIAL CHANNELS ── */}
        <motion.div {...up(0.08)}>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-5">
            Connect With Us
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {CHANNELS.map((ch, i) => (
              <motion.a
                key={ch.id}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                {...up(0.1 + i * 0.06)}
                className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:border-transparent"
                style={{ ['--accent' as any]: ch.accent }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px ${ch.accent}20`
                  ;(e.currentTarget as HTMLElement).style.borderColor = `${ch.accent}30`
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = ''
                  ;(e.currentTarget as HTMLElement).style.borderColor = ''
                }}
              >
                {/* Icon + members */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 transition-transform group-hover:scale-105 duration-200"
                    style={{ background: ch.accent, boxShadow: `0 4px 12px ${ch.accent}35` }}>
                    {ch.icon}
                  </div>
                  <span className="text-[9.5px] font-bold px-2.5 py-1 rounded-full"
                    style={{ color: ch.accent, background: ch.bg, border: `1px solid ${ch.accent}20` }}>
                    {ch.value}
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1 mb-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{ch.handle}</p>
                  <h3 className="text-[15px] font-extrabold text-slate-900 mb-2">{ch.name}</h3>
                  <p className="text-[12px] text-slate-500 leading-relaxed">{ch.desc}</p>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-[12px] font-bold transition-colors" style={{ color: ch.accent }}>
                    {ch.cta}
                  </span>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:translate-x-0.5"
                    style={{ background: ch.bg, color: ch.accent }}>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ── UPFORGE SECTION ── */}
        <motion.div {...up(0.14)}>
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#0d0622 0%,#1a1063 55%,#2a1fa8 100%)' }}
          >
            {/* Texture */}
            <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
                <defs>
                  <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
              {/* Orange glow */}
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-25"
                style={{ background: 'radial-gradient(ellipse,#f97316 0%,transparent 70%)', transform: 'translate(35%,-35%)' }} />
            </div>

            <div className="relative z-10 p-7 sm:p-10">

              {/* Partner label */}
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6"
                style={{ background: 'rgba(249,115,22,0.14)', border: '1px solid rgba(249,115,22,0.28)' }}>
                <Zap size={10} className="text-orange-400 fill-current" />
                <span className="text-[9.5px] font-bold text-orange-300 uppercase tracking-widest">
                  Our Startup Community
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8">

                {/* Logo + text */}
                <div className="flex-1">
                  <div className="flex items-center gap-3.5 mb-4">
                    {/* UpForge logo */}
                    <div className="relative w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg"
                      style={{ border: '1.5px solid rgba(249,115,22,0.3)' }}>
                      <Image src="/upforge.jpg" alt="UpForge" fill className="object-cover" />
                    </div>
                    <div>
                      <h2 className="text-[1.5rem] font-extrabold text-white leading-none tracking-tight">
                        UpForge
                      </h2>
                      <p className="text-[11px] font-bold mt-0.5" style={{ color: 'rgba(253,186,116,0.75)' }}>
                        upforge.in
                      </p>
                    </div>
                  </div>

                  <p className="text-[14px] leading-relaxed mb-2" style={{ color: 'rgba(199,210,254,0.9)' }}>
                    India's startup community for student founders and builders.
                  </p>
                  <p className="text-[12.5px] leading-relaxed mb-6" style={{ color: 'rgba(148,163,184,0.75)' }}>
                    Got a startup idea? UpForge is where student entrepreneurs find co-founders, mentors, and their first community. Built by the same team behind Internadda — because building a career and building a company aren't that different.
                  </p>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-2 mb-7">
                    {['Find Co-founders', 'Mentor Connect', 'Startup Resources', 'Founder Cohorts', 'Build in Public'].map(f => (
                      <span key={f}
                        className="text-[11px] font-semibold px-3 py-1.5 rounded-full"
                        style={{
                          background: 'rgba(255,255,255,0.07)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          color: 'rgba(199,210,254,0.85)',
                        }}>
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <a
                      href="https://upforge.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-bold text-[13px] text-white transition-all active:scale-[0.98]"
                      style={{
                        background: 'linear-gradient(135deg,#f97316,#ea580c)',
                        boxShadow: '0 4px 16px rgba(249,115,22,0.35)',
                      }}
                    >
                      <ExternalLink size={13} /> Explore UpForge
                    </a>
                    <a
                      href="https://upforge.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-bold text-[13px] transition-all"
                      style={{
                        border: '1.5px solid rgba(249,115,22,0.3)',
                        color: 'rgba(253,186,116,0.85)',
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(249,115,22,0.1)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                    >
                      <Users size={13} /> Join as Founder
                    </a>
                  </div>
                </div>

                {/* Visual card — desktop only */}
                <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-48">
                  <div className="relative w-44 h-44">
                    {/* Back rings */}
                    <div className="absolute inset-0 rounded-3xl rotate-6 opacity-20"
                      style={{ background: 'rgba(249,115,22,0.3)', border: '1px solid rgba(249,115,22,0.2)' }} />
                    <div className="absolute inset-0 rounded-3xl rotate-2 opacity-40"
                      style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.2)' }} />
                    {/* Front card */}
                    <div className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center gap-3"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1.5px solid rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(16px)',
                      }}>
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg"
                        style={{ border: '1.5px solid rgba(249,115,22,0.3)' }}>
                        <Image src="/upforge.jpg" alt="UpForge" fill className="object-cover" />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-extrabold text-[15px] leading-none">UpForge</p>
                        <p className="text-[10px] font-bold mt-1" style={{ color: 'rgba(253,186,116,0.7)' }}>
                          Build. Launch. Grow.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── BOTTOM CTA ── */}
        <motion.div {...up(0.18)}>
          <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-10 text-center shadow-sm">

            {/* Internadda logo */}
            <div className="flex justify-center mb-5">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md border border-slate-100">
                <Image src="/logo.jpg" alt="Internadda" fill className="object-cover" />
              </div>
            </div>

            <h3 className="text-[1.55rem] sm:text-[1.9rem] font-extrabold text-slate-900 tracking-tight mb-2">
              Ready to start your journey?
            </h3>
            <p className="text-slate-500 text-[13.5px] max-w-sm mx-auto leading-relaxed mb-7">
              Browse open internships, take a free skill assessment, and join 8,000+ students already growing with Internadda.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <Link href="/internships"
                className="flex items-center gap-2 h-11 px-7 rounded-xl font-bold text-[13px] text-white transition-all active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg,#1a1063,#3730a3)', boxShadow: '0 4px 16px rgba(26,16,99,0.22)' }}>
                Browse Internships <ArrowRight size={13} />
              </Link>
              <Link href="/test"
                className="flex items-center gap-2 h-11 px-7 rounded-xl font-bold text-[13px] border-2 border-slate-200 text-slate-700 hover:border-indigo-200 hover:text-indigo-700 hover:bg-indigo-50 transition-all">
                Free Skill Test <Zap size={12} />
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
              {[
                { icon: ShieldCheck, text: 'MSME Certified' },
                { icon: Star,        text: '4.9 rated' },
                { icon: Users,       text: '8,000+ students' },
                { icon: MessageCircle, text: 'Always free' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon size={11} className="text-slate-300" />
                  <span className="text-[11px] font-semibold text-slate-400">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

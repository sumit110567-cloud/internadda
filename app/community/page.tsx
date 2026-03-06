"use client"
// app/community/page.tsx

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Users, Zap, Star,
  ExternalLink, Play, BookOpen, Rocket, Globe,
  MessageCircle, TrendingUp, Award, Heart,
} from 'lucide-react'

// ── Animation helper ───────────────────────────────────────────────────────────
const up = (delay = 0) => ({
  initial:    { opacity: 0, y: 22 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] as any },
})

// ── Social platform data ───────────────────────────────────────────────────────
const SOCIALS = [
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@Internadda',
    desc: 'Career tips, sector guides, interview prep & student success stories.',
    cta: 'Subscribe Free',
    href: 'https://www.youtube.com/@internadda',
    members: '2K+ Subscribers',
    accent: '#FF0000',
    light: '#fff5f5',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
      </svg>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@internadda',
    desc: 'Daily reels on career hacks, resume tips, internship openings & student wins.',
    cta: 'Follow Now',
    href: 'https://www.instagram.com/internadda',
    members: '3K+ Followers',
    accent: '#E1306C',
    light: '#fff0f5',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Internadda',
    desc: 'Company updates, job posts, hiring announcements & industry insights.',
    cta: 'Connect',
    href: 'https://www.linkedin.com/company/internadda',
    members: '1K+ Connections',
    accent: '#0A66C2',
    light: '#f0f7ff',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: 'Community Group',
    desc: 'Get instant alerts for new internships, test reminders & peer support.',
    cta: 'Join Group',
    href: 'https://wa.me/919217713161?text=Hi!%20I%20want%20to%20join%20the%20Internadda%20community',
    members: '500+ Members',
    accent: '#25D366',
    light: '#f0fdf4',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    handle: '@internadda',
    desc: 'Quick updates, career threads, internship opportunities & hot takes.',
    cta: 'Follow',
    href: 'https://twitter.com/internadda',
    members: '800+ Followers',
    accent: '#000000',
    light: '#f8f8f8',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    id: 'telegram',
    name: 'Telegram',
    handle: '@internadda',
    desc: 'Instant internship alerts, resources, PDF guides & exclusive community drops.',
    cta: 'Join Channel',
    href: 'https://t.me/internadda',
    members: '1.2K+ Members',
    accent: '#229ED9',
    light: '#f0f8ff',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
]

// ── UpForge data ───────────────────────────────────────────────────────────────
const UPFORGE_FEATURES = [
  { icon: Rocket,     text: 'Launch & validate your startup idea' },
  { icon: Users,      text: 'Find co-founders and early team members' },
  { icon: TrendingUp, text: 'Connect with mentors and investors' },
  { icon: BookOpen,   text: 'Access startup resources and playbooks' },
  { icon: Award,      text: 'Join exclusive founder cohorts' },
  { icon: Globe,      text: 'Build in public with a global community' },
]

// ── Stats ──────────────────────────────────────────────────────────────────────
const STATS = [
  { v: '8,000+', l: 'Community Members' },
  { v: '6',      l: 'Active Platforms' },
  { v: '500+',   l: 'Internships Shared' },
  { v: '4.9★',   l: 'Community Rating' },
]

export default function CommunityPage() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >

      {/* ── Background ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-80 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(79,70,229,0.055) 0%,transparent 68%)' }} />
        <div className="absolute top-1/3 -right-60 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(26,16,99,0.04) 0%,transparent 65%)' }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.016 }}>
          <defs>
            <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M36 0L0 0 0 36" fill="none" stroke="#1a1063" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 h-14 flex items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#1a1063] flex items-center justify-center text-white text-[11px] font-black">I</div>
          <span className="font-black text-[15px] text-slate-900 hidden sm:block">
            Intern<span className="text-indigo-600">adda</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <a href="https://upforge.in" target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-3 py-1.5 hover:bg-orange-100 transition-all">
            <Zap size={10} className="fill-current" /> UpForge.in
          </a>
          <Link href="/"
            className="flex items-center gap-1.5 text-[12px] font-bold text-slate-500 hover:text-[#1a1063] transition-colors group">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:block">Back</span>
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-14 text-center">

        <motion.div {...up(0)} className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
            India's Fastest Growing Student Community
          </span>
        </motion.div>

        <motion.h1 {...up(0.06)}
          className="text-[2.8rem] sm:text-[3.8rem] lg:text-[5rem] font-extrabold text-slate-900 tracking-tight leading-[0.9] mb-6"
        >
          Join the<br />
          <span style={{ color: '#1a1063' }}>Internadda</span>
          <br />
          <span className="text-indigo-400">Community.</span>
        </motion.h1>

        <motion.p {...up(0.1)} className="text-slate-500 text-[15px] sm:text-[16px] max-w-xl mx-auto leading-relaxed mb-10">
          8,000+ students growing together. Get internship alerts, career guidance, peer support, and real opportunities — wherever you are.
        </motion.p>

        {/* Stats row */}
        <motion.div {...up(0.14)} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto mb-10">
          {STATS.map(s => (
            <div key={s.l}
              className="bg-white border border-slate-200 rounded-2xl px-4 py-4 text-center shadow-sm">
              <p className="text-[1.4rem] font-extrabold text-[#1a1063] leading-none mb-1">{s.v}</p>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{s.l}</p>
            </div>
          ))}
        </motion.div>

        {/* Primary CTAs */}
        <motion.div {...up(0.18)} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="https://wa.me/919217713161?text=Hi!%20I%20want%20to%20join%20the%20Internadda%20community"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 h-12 px-7 rounded-xl font-bold text-[13.5px] text-white transition-all active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg,#1a1063,#3730a3)', boxShadow: '0 4px 18px rgba(26,16,99,0.25)' }}>
            <MessageCircle size={15} /> Join WhatsApp Community
          </a>
          <a href="https://www.youtube.com/@internadda" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 h-12 px-7 rounded-xl font-bold text-[13.5px] border-2 border-slate-200 text-slate-700 hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-all">
            <Play size={14} className="fill-current" /> Watch on YouTube
          </a>
        </motion.div>
      </section>

      {/* ── SOCIAL CHANNELS GRID ── */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <motion.div {...up(0.04)} className="text-center mb-10">
          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2">Find Us Everywhere</p>
          <h2 className="text-[1.9rem] sm:text-[2.4rem] font-extrabold text-slate-900 tracking-tight mb-3">
            Join on Your Platform
          </h2>
          <p className="text-slate-500 text-[14px] max-w-md mx-auto">
            We're active on 6 platforms. Pick your favourite and plug in instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              {...up(0.06 + i * 0.05)}
              onMouseEnter={() => setHoveredSocial(s.id)}
              onMouseLeave={() => setHoveredSocial(null)}
              className="group relative flex flex-col bg-white border border-slate-200 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-2xl"
              style={{
                boxShadow: hoveredSocial === s.id ? `0 20px 50px ${s.accent}18` : undefined,
              }}
            >
              {/* Hover bg wash */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: s.light }}
              />

              {/* Top row */}
              <div className="relative flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110 duration-300"
                  style={{ background: s.accent, boxShadow: `0 4px 12px ${s.accent}40` }}
                >
                  {s.icon}
                </div>
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full border"
                  style={{ color: s.accent, borderColor: `${s.accent}30`, background: `${s.accent}10` }}
                >
                  {s.members}
                </span>
              </div>

              {/* Content */}
              <div className="relative flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{s.handle}</p>
                <h3 className="text-[1.05rem] font-extrabold text-slate-900 mb-2">{s.name}</h3>
                <p className="text-[12.5px] text-slate-500 leading-relaxed mb-5">{s.desc}</p>
              </div>

              {/* CTA */}
              <div className="relative flex items-center justify-between">
                <span
                  className="text-[12.5px] font-bold transition-colors"
                  style={{ color: s.accent }}
                >
                  {s.cta}
                </span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:translate-x-0.5"
                  style={{ background: `${s.accent}15`, color: s.accent }}
                >
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── UPFORGE SECTION ── */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <motion.div
          {...up(0.04)}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#0f0730 0%,#1a1063 45%,#2d1fa8 100%)' }}
        >
          {/* Pattern */}
          <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
              <defs>
                <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
            {/* Glow blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(ellipse,#f97316 0%,transparent 65%)', transform: 'translate(30%,-30%)' }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15"
              style={{ background: 'radial-gradient(ellipse,#818cf8 0%,transparent 65%)', transform: 'translate(-20%,30%)' }} />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 p-8 sm:p-12 lg:p-14 items-center">

            {/* Left */}
            <div>
              {/* UpForge badge */}
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
                style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
                <Zap size={12} className="text-orange-400 fill-current" />
                <span className="text-[10px] font-bold text-orange-300 uppercase tracking-widest">
                  Partner Startup Community
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(249,115,22,0.15)', border: '1.5px solid rgba(249,115,22,0.25)' }}>
                  <Rocket size={22} className="text-orange-400" />
                </div>
                <div>
                  <h2 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-white tracking-tight leading-none">
                    UpForge
                  </h2>
                  <p className="text-[12px] font-bold" style={{ color: 'rgba(253,186,116,0.8)' }}>
                    upforge.in
                  </p>
                </div>
              </div>

              <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'rgba(199,210,254,0.85)' }}>
                India's emerging startup community for student founders, builders, and innovators.
              </p>
              <p className="text-[13.5px] leading-relaxed mb-7" style={{ color: 'rgba(148,163,184,0.8)' }}>
                UpForge is where student entrepreneurs meet their co-founders, mentors, and first customers. If you have an idea — or want to join one — UpForge is your launchpad.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {UPFORGE_FEATURES.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(249,115,22,0.15)' }}>
                      <f.icon size={13} className="text-orange-400" />
                    </div>
                    <p className="text-[12px] font-medium" style={{ color: 'rgba(199,210,254,0.85)' }}>
                      {f.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://upforge.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 h-12 px-7 rounded-xl font-bold text-[13.5px] text-white transition-all active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', boxShadow: '0 4px 18px rgba(249,115,22,0.35)' }}
                >
                  <ExternalLink size={14} /> Explore UpForge
                </a>
                <a
                  href="https://upforge.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-bold text-[13px] transition-all"
                  style={{ border: '1.5px solid rgba(249,115,22,0.35)', color: 'rgba(253,186,116,0.9)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(249,115,22,0.1)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <Heart size={13} /> Join as Founder
                </a>
              </div>
            </div>

            {/* Right — visual card stack */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-72 h-72">

                {/* Card 3 — back */}
                <div className="absolute inset-0 rounded-3xl rotate-6 opacity-30"
                  style={{ background: 'rgba(249,115,22,0.2)', border: '1px solid rgba(249,115,22,0.2)' }} />

                {/* Card 2 — mid */}
                <div className="absolute inset-0 rounded-3xl rotate-2 opacity-60"
                  style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)' }} />

                {/* Card 1 — front */}
                <div className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-8 text-center"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)' }}>

                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(249,115,22,0.2)', border: '1.5px solid rgba(249,115,22,0.3)' }}>
                    <Rocket size={30} className="text-orange-400" />
                  </div>
                  <p className="text-white font-extrabold text-xl mb-1">UpForge</p>
                  <p className="text-[11px] font-bold mb-4" style={{ color: 'rgba(253,186,116,0.8)' }}>
                    Build. Launch. Grow.
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {['Startups', 'Founders', 'Ideas', 'Builders'].map(t => (
                      <span key={t} className="text-[9.5px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(249,115,22,0.15)', color: 'rgba(253,186,116,0.85)', border: '1px solid rgba(249,115,22,0.2)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FINAL CTA STRIP ── */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          {...up(0.04)}
          className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center shadow-xl shadow-slate-100/60"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9.5px] font-bold text-emerald-600 uppercase tracking-widest">Community is Free — Always</span>
          </div>

          <h3 className="text-[2rem] sm:text-[2.6rem] font-extrabold text-slate-900 tracking-tight mb-3">
            Start your internship journey<br className="hidden sm:block" />
            <span style={{ color: '#1a1063' }}> with 8,000+ students.</span>
          </h3>
          <p className="text-slate-500 text-[14.5px] max-w-lg mx-auto mb-8">
            Join our community, take the free skill test, and land your first internship. No fees, no barriers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/internships"
              className="flex items-center gap-2 h-12 px-8 rounded-xl font-bold text-[13.5px] text-white transition-all active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg,#1a1063,#3730a3)', boxShadow: '0 4px 18px rgba(26,16,99,0.25)' }}
            >
              Browse Internships <ArrowRight size={14} />
            </Link>
            <Link
              href="/test"
              className="flex items-center gap-2 h-12 px-8 rounded-xl font-bold text-[13.5px] border-2 border-slate-200 text-slate-700 hover:border-indigo-200 hover:text-indigo-700 hover:bg-indigo-50 transition-all"
            >
              Take Skill Test <Zap size={13} />
            </Link>
          </div>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            {[
              '4.9 rated platform',
              'MSME Certified',
              '8,000+ members',
              '100% free to join',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11.5px] text-slate-400 font-semibold">
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                {text}
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { Mail, Linkedin, Youtube, Instagram, ShieldCheck, MapPin, Zap, ArrowUpRight, Verified, Globe, Award } from 'lucide-react'

// ─── Mirrors Header + page container ─────────────────────────────────────────
const CONTAINER = "max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8"

const footerLinks = {
  Company: [
    { label: 'About Us',  href: '/about' },
    { label: 'Blog',      href: '/blog' },
    { label: 'Careers',   href: '#' },
    { label: 'Contact',   href: '/contact' },
  ],
  Opportunities: [
    { label: 'Internships',       href: '/internships' },
    { label: 'Skill Courses',     href: '/courses' },
    { label: 'Hiring Partners',   href: '/hiring-partners' },
    { label: 'Verify Certificate', href: 'https://upforge.org/registry' },
  ],
  Support: [
    { label: 'Help Center',   href: '/help-center' },
    { label: 'Student Guide', href: '/blog' },
    { label: 'FAQ',           href: '/faq' },
    { label: 'Community',     href: '/community' },
  ],
  Legal: [
    { label: 'Privacy Policy',   href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cookie Policy',    href: '/cookie-policy' },
    { label: 'Disclaimer',       href: '/disclaimer' },
  ],
}

// ─── NEW: Upforge partner section links ──────────────────────────────────────
const UPFORGE_LINKS = [
  { label: 'Create Verified Profile', href: 'https://upforge.org/registry', description: 'Build your portfolio identity' },
  { label: 'Skill Credibility Score', href: 'https://upforge.org', description: 'Measure your readiness' },
  { label: 'Verify Your Certificate', href: 'https://upforge.org/verify', description: 'Blockchain-backed credentials' },
  { label: 'Student Success Stories', href: 'https://upforge.org/blog', description: 'Real student journeys' },
]

const SOCIALS = [
  { Icon: Youtube,   href: 'https://www.youtube.com/@theInternadda',              label: 'YouTube' },
  { Icon: Linkedin,  href: 'https://www.linkedin.com/company/Internadda-india',   label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://www.instagram.com/Internadda.india/#',        label: 'Instagram' },
  { Icon: Mail,      href: 'mailto:support@Internadda.com',                       label: 'Email' },
]

// ─── UPGRADED: Trust section with Upforge integration ────────────────────────
const TRUST = [
  { icon: ShieldCheck, top: 'MSME Registered',  bottom: 'Udyam · Govt. of India',   color: '#059669', bg: 'rgba(5,150,105,0.1)'  },
  { icon: MapPin,      top: 'Headquarters',     bottom: 'New Delhi, India',          color: '#4f46e5', bg: 'rgba(79,70,229,0.1)'  },
  { icon: Verified,    top: 'Partner Platform', bottom: 'Upforge Verified',          color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)'  },
  { icon: Globe,       top: 'Global Reach',     bottom: '40+ Countries',             color: '#06b6d4', bg: 'rgba(6,182,212,0.1)'   },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-[#0c0a1e]">

      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[480px] h-[280px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[380px] h-[220px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)' }} />
        {/* Dot texture */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.035 }}>
          <defs>
            <pattern id="fdots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fdots)" />
        </svg>
      </div>

      {/* ── Top CTA strip (UPGRADED with Upforge CTA) ───────────────────────── */}
      <div className="relative z-10 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className={CONTAINER}>
          <div className="py-8">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left gap-5 rounded-2xl border px-7 py-6"
              style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.18) 0%, rgba(124,58,237,0.12) 50%, rgba(79,70,229,0.16) 100%)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-1.5" style={{ color: 'rgba(196,181,253,0.9)' }}>
                  Ready to launch?
                </p>
                <h3 className="text-white text-[1.3rem] sm:text-[1.5rem] font-extrabold tracking-tight leading-tight">
                  Your internship is one click away.
                </h3>
                <p className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Join 15,000+ students who already found their path. <Link href="https://upforge.org" target="_blank" className="text-indigo-300 hover:text-indigo-200 underline">Get verified on Upforge</Link> to stand out.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/internships" className="flex-shrink-0">
                  <button className="inline-flex items-center gap-2 bg-white text-[#1a1063] font-bold text-[13px] px-6 py-2.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] hover:bg-indigo-50 whitespace-nowrap">
                    Browse Internships <ArrowUpRight size={14} />
                  </button>
                </Link>
                <Link href="https://upforge.org/registry" target="_blank" className="flex-shrink-0">
                  <button className="inline-flex items-center gap-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-white font-bold text-[13px] px-6 py-2.5 rounded-xl transition-all whitespace-nowrap border border-indigo-400/30">
                    <Verified size={14} /> Create Verified Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main grid ─────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <div className={CONTAINER}>
          <div className="pt-12 pb-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-10">

              {/* Brand col */}
              <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-lg flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>I</div>
                  <span className="font-extrabold text-[18px] text-white tracking-tight">Internadda</span>
                </Link>
                <p className="text-[13px] leading-relaxed mb-5 max-w-[240px] mx-auto lg:mx-0"
                  style={{ color: 'rgba(255,255,255,0.38)' }}>
                  Global internship discovery platform. Find verified opportunities across 40+ countries.
                </p>
                <div className="flex items-center gap-2">
                  {SOCIALS.map(({ Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.4)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(79,70,229,0.25)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)' }}>
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Link cols */}
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category} className="flex flex-col items-center lg:items-start">
                  <h4 className="font-bold text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {category}
                  </h4>
                  <ul className="space-y-2.5 text-center lg:text-left">
                    {links.map((link, i) => (
                      <li key={i}>
                        {link.href.startsWith('http') ? (
                          <a href={link.href} target="_blank" rel="noopener noreferrer"
                            className="text-[13px] font-medium transition-colors inline-flex items-center gap-1"
                            style={{ color: 'rgba(255,255,255,0.38)' }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)'}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.38)'}>
                            {link.label} <ArrowUpRight size={10} />
                          </a>
                        ) : (
                          <Link href={link.href}
                            className="text-[13px] font-medium transition-colors"
                            style={{ color: 'rgba(255,255,255,0.38)' }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)'}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.38)'}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* ─── NEW: Upforge Partner Platform Column ───────────────────── */}
              <div className="flex flex-col items-center lg:items-start">
                <h4 className="font-bold text-[10px] uppercase tracking-[0.18em] mb-4 flex items-center gap-1.5" 
                    style={{ color: 'rgba(139,92,246,0.8)' }}>
                  <Verified size={10} /> Partner Platform
                </h4>
                <ul className="space-y-3 text-center lg:text-left">
                  {UPFORGE_LINKS.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer"
                        className="block group"
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'}>
                        <div className="flex flex-col">
                          <span className="text-[12px] font-semibold transition-colors inline-flex items-center gap-1"
                            style={{ color: 'rgba(255,255,255,0.55)' }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(139,92,246,0.9)'}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}>
                            {link.label} <ArrowUpRight size={9} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </span>
                          <span className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                            {link.description}
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
                
                {/* Upforge trust badge */}
                <div className="mt-4 p-2.5 rounded-lg w-full"
                  style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}>
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-purple-400" />
                    <span className="text-[9px] font-medium" style={{ color: 'rgba(139,92,246,0.7)' }}>
                      Upforge powers student credibility
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── UPGRADED: Trust strip (4 columns now) ──────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pb-8">
            {TRUST.map(({ icon: Icon, top, bottom, color, bg }) => (
              <div key={top} className="flex items-center gap-3.5 rounded-xl px-4 py-3.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: bg }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <p className="text-[9.5px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>{top}</p>
                  <p className="text-[13px] font-bold" style={{ color: 'rgba(255,255,255,0.78)' }}>
                    {top === 'Partner Platform' ? (
                      <a href="https://upforge.org" target="_blank" rel="noopener noreferrer" 
                         className="hover:text-purple-300 transition-colors inline-flex items-center gap-1">
                        {bottom} <ArrowUpRight size={10} />
                      </a>
                    ) : bottom}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ─── Bottom bar (UPGRADED with stronger Upforge attribution) ────── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>

            <p className="text-[11.5px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
              © {year}{' '}
              <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Internadda Enterprises</span>
              . All rights reserved.
            </p>

            {/* Powered by Upforge - UPGRADED with link */}
            <a href="https://upforge.org" target="_blank" rel="noopener noreferrer" 
               className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all hover:scale-[1.02] group"
               style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.28)' }}>Verified ecosystem by</span>
              <div className="flex items-center gap-1">
                <div className="w-3.5 h-3.5 rounded-md flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
                  <Verified size={7} className="text-white" />
                </div>
                <span className="text-[11px] font-extrabold tracking-tight group-hover:text-purple-300 transition-colors" 
                      style={{ color: 'rgba(255,255,255,0.65)' }}>Upforge.org</span>
              </div>
              <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'rgba(139,92,246,0.7)' }} />
            </a>

            <div className="flex items-center gap-4">
              {[{ label: 'Terms', href: '/terms-of-service' }, { label: 'Privacy', href: '/privacy-policy' }].map(({ label, href }) => (
                <Link key={label} href={href}
                  className="text-[11.5px] transition-colors"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.28)'}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

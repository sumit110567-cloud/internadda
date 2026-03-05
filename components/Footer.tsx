'use client'

import Link from 'next/link'
import { Mail, Linkedin, Youtube, Instagram, ShieldCheck, MapPin, Zap, ArrowUpRight } from 'lucide-react'

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
    { label: 'Hiring Partners',   href: '#' },
    { label: 'Verify Certificate',href: '#' },
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

const SOCIALS = [
  { Icon: Youtube,   href: 'https://www.youtube.com/@theInternadda',              label: 'YouTube' },
  { Icon: Linkedin,  href: 'https://www.linkedin.com/company/Internadda-india',   label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://www.instagram.com/Internadda.india/#',        label: 'Instagram' },
  { Icon: Mail,      href: 'mailto:support@Internadda.com',                       label: 'Email' },
]

const TRUST = [
  { icon: ShieldCheck, top: 'MSME Registered',  bottom: 'Udyam · Govt. of India',   color: '#059669', bg: 'rgba(5,150,105,0.1)'  },
  { icon: MapPin,      top: 'Headquarters',     bottom: 'New Delhi, India',          color: '#4f46e5', bg: 'rgba(79,70,229,0.1)'  },
  { icon: Zap,         top: 'Trusted By',       bottom: '7,200+ Active Students',    color: '#d97706', bg: 'rgba(217,119,6,0.1)'  },
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

      {/* ── Top CTA strip ─────────────────────────────────────────────── */}
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
                  Join 7,200+ students who already found their path.
                </p>
              </div>
              <Link href="/internships" className="flex-shrink-0">
                <button className="inline-flex items-center gap-2 bg-white text-[#1a1063] font-bold text-[13px] px-6 py-2.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] hover:bg-indigo-50 whitespace-nowrap">
                  Browse Internships <ArrowUpRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main grid ─────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <div className={CONTAINER}>
          <div className="pt-12 pb-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">

              {/* Brand col */}
              <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-lg flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>I</div>
                  <span className="font-extrabold text-[18px] text-white tracking-tight">Internadda</span>
                </Link>
                <p className="text-[13px] leading-relaxed mb-5 max-w-[240px] mx-auto lg:mx-0"
                  style={{ color: 'rgba(255,255,255,0.38)' }}>
                  India's premier ecosystem for student growth — bridging academic learning with professional excellence.
                </p>
                <div className="flex items-center gap-2">
                  {SOCIALS.map(({ Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.4)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(79,70,229,0.25)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)' }}
                    >
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
                        <Link href={link.href}
                          className="text-[13px] font-medium transition-colors"
                          style={{ color: 'rgba(255,255,255,0.38)' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.38)'}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── Trust strip ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-8">
            {TRUST.map(({ icon: Icon, top, bottom, color, bg }) => (
              <div key={top} className="flex items-center gap-3.5 rounded-xl px-4 py-3.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: bg }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <p className="text-[9.5px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>{top}</p>
                  <p className="text-[13px] font-bold" style={{ color: 'rgba(255,255,255,0.78)' }}>{bottom}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom bar ──────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>

            <p className="text-[11.5px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
              © {year}{' '}
              <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Internadda Enterprises</span>
              . All rights reserved.
            </p>

            {/* Powered by Upforge */}
            <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.28)' }}>Crafted by</span>
              <div className="flex items-center gap-1">
                <div className="w-3.5 h-3.5 rounded-md flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #f97316, #e11d48)' }}>
                  <Zap size={8} className="text-white fill-white" />
                </div>
                <span className="text-[11px] font-extrabold tracking-tight" style={{ color: 'rgba(255,255,255,0.65)' }}>Upforge</span>
              </div>
            </div>

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

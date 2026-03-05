'use client'

import Link from 'next/link'
import { Mail, Linkedin, Youtube, Instagram, ShieldCheck, MapPin, Zap, ArrowUpRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '/contact' },
    ],
    Opportunities: [
      { label: 'Internships', href: '/internships' },
      { label: 'Skill Courses', href: '/courses' },
      { label: 'Hiring Partners', href: '#' },
      { label: 'Certificate Verify', href: '#' },
    ],
    Support: [
      { label: 'Help Center', href: '/help-center' },
      { label: 'Student Guide', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Community', href: '/community' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  }

  return (
    <footer className="relative overflow-hidden bg-[#0d0b1f] mt-16">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-violet-600/10 blur-3xl" />
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          <defs>
            <pattern id="fdots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fdots)" />
        </svg>
      </div>

      {/* CTA Banner */}
      <div className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-indigo-600/20 via-violet-600/15 to-indigo-600/20 border border-white/10 rounded-3xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-violet-300" />
                <span className="text-violet-300 text-xs font-black uppercase tracking-widest">Ready to launch?</span>
              </div>
              <h3 className="text-white text-2xl font-black tracking-tight">
                Your internship is one click away.
              </h3>
              <p className="text-white/50 text-sm mt-1">Join 7,200+ students who already found their path.</p>
            </div>
            <Link href="/internships">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0 flex items-center gap-2 bg-white text-[#1a1063] font-black text-sm px-7 py-3.5 rounded-2xl shadow-xl shadow-indigo-900/30 transition-all hover:bg-indigo-50"
              >
                Browse Internships
                <ArrowUpRight size={16} />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-black text-base shadow-lg shadow-indigo-500/30">
                I
              </div>
              <span className="font-black text-xl text-white tracking-tight">Internadda</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-[260px]">
              India's premier ecosystem for student growth. Bridging academic learning with professional excellence.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {[
                { Icon: Youtube, href: 'https://www.youtube.com/@theInternadda', label: 'YouTube' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/Internadda-india', label: 'LinkedIn' },
                { Icon: Instagram, href: 'https://www.instagram.com/Internadda.india/#', label: 'Instagram' },
                { Icon: Mail, href: 'mailto:support@Internadda.com', label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 bg-white/[0.06] hover:bg-indigo-500/30 border border-white/10 hover:border-indigo-400/30 rounded-xl flex items-center justify-center transition-all text-white/40 hover:text-white"
                >
                  <social.Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col items-center lg:items-start">
              <h3 className="font-black text-white/90 text-[10px] uppercase tracking-[0.18em] mb-5">
                {category}
              </h3>
              <ul className="space-y-3 text-center lg:text-left">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          {[
            {
              icon: ShieldCheck,
              top: 'MSME Registered',
              bottom: 'Udyam · Govt. of India',
              color: 'text-emerald-400',
              bg: 'bg-emerald-400/10',
            },
            {
              icon: MapPin,
              top: 'Headquarters',
              bottom: 'New Delhi, India',
              color: 'text-indigo-400',
              bg: 'bg-indigo-400/10',
            },
            {
              icon: Zap,
              top: 'Trusted By',
              bottom: '7,200+ Active Students',
              color: 'text-amber-400',
              bg: 'bg-amber-400/10',
            },
          ].map((item) => (
            <div
              key={item.top}
              className="flex items-center gap-4 bg-white/[0.04] border border-white/[0.07] rounded-2xl px-5 py-4"
            >
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                <item.icon size={18} className={item.color} />
              </div>
              <div>
                <p className="text-white/35 text-[10px] font-black uppercase tracking-widest">{item.top}</p>
                <p className="text-white/80 text-sm font-bold">{item.bottom}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.07] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {currentYear}{' '}
            <span className="text-white/50 font-semibold">Internadda Enterprises</span>
            . All rights reserved.
          </p>

          {/* Powered by Upforge */}
          <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-2">
            <span className="text-white/30 text-[11px] font-medium">Crafted &amp; powered by</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gradient-to-br from-orange-400 to-rose-500 rounded-md flex items-center justify-center">
                <Zap size={9} className="text-white fill-white" />
              </div>
              <span className="text-white/70 text-[11px] font-black tracking-tight">Upforge</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/terms-of-service" className="text-xs text-white/30 hover:text-white/70 transition-colors">
              Terms
            </Link>
            <Link href="/privacy-policy" className="text-xs text-white/30 hover:text-white/70 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

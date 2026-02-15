"use client"

import Link from 'next/link'
import { Mail, Linkedin, Youtube, Instagram, ShieldCheck, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '#' }, // Update when career page is ready
      { label: 'Contact', href: '/about' }, // Pointing to contact section in about
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
    <footer className="bg-[#0A2647] text-white border-t border-white/10 mt-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-16">
          
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link href="/" className="flex items-center gap-3 font-bold text-2xl text-white mb-6">
              <div className="w-10 h-10 bg-[#FFD700] rounded-xl flex items-center justify-center text-[#0A2647] font-black shadow-lg">
                I
              </div>
              <span className="tracking-tight">Internadda</span>
            </Link>
            <p className="text-blue-100/60 text-sm leading-relaxed mb-8 max-w-sm">
              India's premier ecosystem for student growth. Bridging the gap between 
              academic learning and professional excellence. Learn • Intern • Earn.
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: Youtube, href: "https://www.youtube.com/@theinternadda" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/internadda-india" },
                { Icon: Instagram, href: "https://www.instagram.com/internadda.india/#" },
                { Icon: Mail, href: "mailto:support@internadda.com" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-[#FFD700] hover:text-[#0A2647] rounded-full flex items-center justify-center transition-all duration-300 border border-white/10"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col items-center lg:items-start">
              <h3 className="font-bold text-[#FFD700] text-xs uppercase tracking-[0.2em] mb-6">
                {category}
              </h3>
              <ul className="space-y-4 text-center lg:text-left">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-sm text-blue-100/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="bg-white/5 rounded-3xl p-6 mb-12 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[#FFD700]" size={24} />
              <div className="text-center md:text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">MSME Registered</p>
                <p className="text-sm font-medium">Udyam Govt. of India</p>
              </div>
            </div>
            <div className="h-px w-12 bg-white/10 hidden md:block" />
            <div className="flex items-center gap-3">
              <MapPin className="text-[#FFD700]" size={24} />
              <div className="text-center md:text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">Headquarters</p>
                <p className="text-sm font-medium">New Delhi, India</p>
              </div>
            </div>
            <div className="h-px w-12 bg-white/10 hidden md:block" />
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40">Trusted By</p>
              <p className="text-sm font-medium">7,200+ Active Students</p>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-blue-100/40">
            © {currentYear} <span className="text-white font-medium">Internadda Enterprises</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/terms-of-service" className="text-xs text-blue-100/40 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className="text-xs text-blue-100/40 hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

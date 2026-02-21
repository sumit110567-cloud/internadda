// components/Footer.tsx
'use client'

import Link from 'next/link'
import { Mail, Linkedin, Youtube, Instagram, ShieldCheck, MapPin } from 'lucide-react'

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
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                I
              </div>
              <span className="font-bold text-xl text-gray-900">Internadda</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              India's premier ecosystem for student growth. Bridging the gap between academic learning and professional excellence.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Youtube, href: 'https://www.youtube.com/@theInternadda' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/Internadda-india' },
                { Icon: Instagram, href: 'https://www.instagram.com/Internadda.india/#' },
                { Icon: Mail, href: 'mailto:support@Internadda.com' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 rounded-full flex items-center justify-center transition-colors text-gray-400"
                >
                  <social.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col items-center lg:items-start">
              <h3 className="font-semibold text-gray-900 text-xs uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3 text-center lg:text-left">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
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
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-10 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-around gap-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-indigo-600" size={22} />
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  MSME Registered
                </p>
                <p className="text-sm font-medium text-gray-700">Udyam Govt. of India</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-200" />
            <div className="flex items-center gap-3">
              <MapPin className="text-indigo-600" size={22} />
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Headquarters
                </p>
                <p className="text-sm font-medium text-gray-700">New Delhi, India</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-200" />
            <div className="text-center">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Trusted By
              </p>
              <p className="text-sm font-medium text-gray-700">7,200+ Active Students</p>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {currentYear} <span className="font-medium text-gray-600">Internadda Enterprises</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms-of-service" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">
              Terms
            </Link>
            <Link href="/privacy-policy" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

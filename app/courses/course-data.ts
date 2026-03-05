// app/courses/page.tsx
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import CoursesClient from './courses-client'
import type { Metadata } from 'next'
import { courses } from './course-data'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Industry-Ready Courses & Certifications | InternAdda Academy',
  description:
    'Master in-demand skills in Development, Data Science, Design and Marketing. Free expert-led courses with certificates — built for students by industry professionals.',
  openGraph: {
    title: 'InternAdda Academy — Free Courses for Students',
    description: 'Free, expert-led courses with certificates. Trusted by 7,200+ students across India.',
    url: 'https://www.internadda.com/courses',
  },
  alternates: { canonical: 'https://www.internadda.com/courses' },
}

const STATS = [
  { label: '6 Courses', sub: 'across 5 domains' },
  { label: '100% Free', sub: 'no hidden fees' },
  { label: 'Certificate', sub: 'on completion' },
  { label: '5,000+ enrolled', sub: 'this semester' },
]

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative bg-gradient-to-b from-[#eef0ff] via-[#f5f6ff] to-white pt-14 pb-16 md:pt-20 md:pb-20 overflow-hidden">

          {/* Decorative blobs */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 left-1/3 w-80 h-80 bg-indigo-200/25 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl" />
            <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
              <defs>
                <pattern id="cg" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4f46e5" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cg)" />
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 rounded-full pl-2 pr-4 py-1.5 mb-7 shadow-sm">
              <span className="bg-indigo-600 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full tracking-wide">ACADEMY</span>
              <span className="text-gray-600 text-xs font-medium">InternAdda · Free Certification Courses</span>
            </div>

            <h1 className="text-[2.4rem] sm:text-5xl md:text-[3.2rem] font-bold text-gray-900 leading-[1.08] tracking-tight mb-5">
              Master in-demand skills.<br />
              <span className="text-indigo-600">Earn your certificate.</span>
            </h1>

            <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Expert-led courses designed for students entering the workforce — free, structured, and recognised by our hiring partners.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {STATS.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{s.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
                </div>
              ))}
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
                <Shield size={11} className="text-emerald-600" />
                <span className="text-[11px] text-emerald-700 font-semibold">MSME · Govt. of India</span>
              </div>
            </div>
          </div>
        </section>

        <CoursesClient initialCourses={courses} />
      </main>
      <Footer />
    </>
  )
}

// app/courses/page.tsx
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import CoursesClient from './courses-client'
import type { Metadata } from 'next'
import { courses } from './course-data'
import { CheckCircle, Shield } from 'lucide-react'

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
  { label: '6 Courses',      sub: 'across 5 domains' },
  { label: '100% Free',      sub: 'no hidden fees' },
  { label: 'Certificate',    sub: 'on completion' },
  { label: '5,000+ enrolled',sub: 'this semester' },
]

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden">

        {/* ── Hero ── */}
        <section className="relative bg-white overflow-hidden">
          {/* Same ambient treatment as every other page */}
          <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.06) 0%, transparent 70%)' }} />
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.02 }}>
              <defs><pattern id="cg" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#4f46e5" strokeWidth="0.6" />
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#cg)" />
            </svg>
          </div>

          <div className="relative max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center pt-12 pb-10 sm:pt-14 sm:pb-12 lg:pt-16 lg:pb-14">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 rounded-full pl-2 pr-4 py-1.5 mb-5 shadow-sm">
                <span className="bg-[#1a1063] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase">Academy</span>
                <span className="text-slate-600 text-[11.5px] font-medium">InternAdda · Free Certification Courses</span>
              </div>

              <h1 className="text-[2rem] sm:text-[2.6rem] xl:text-[3rem] 2xl:text-[3.3rem] font-extrabold text-slate-900 leading-[1.07] tracking-tight mb-4">
                Master in-demand skills.<br />
                <span style={{ color: '#1a1063' }}>Earn your certificate.</span>
              </h1>

              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-[1.75] max-w-lg mb-8">
                Expert-led courses designed for students entering the workforce — free, structured, and recognised by our hiring partners.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
                {STATS.map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-indigo-500 flex-shrink-0" />
                    <span className="text-[12.5px] font-semibold text-slate-700">{s.label}</span>
                    <span className="text-[12px] text-slate-400">{s.sub}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                  <Shield size={10} className="text-emerald-600" />
                  <span className="text-[10.5px] text-emerald-700 font-bold">MSME · Govt. of India</span>
                </div>
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

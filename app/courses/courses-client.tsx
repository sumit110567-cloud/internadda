'use client'
// app/courses/courses-client.tsx

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Clock, Users, Star, ArrowRight,
  BookOpen, Lock, X,
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import type { Course } from './course-data'

// ─── Category colour map ──────────────────────────────────────────────────────
const CAT: Record<string, { text: string; bg: string; border: string; dot: string }> = {
  Development:   { text: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe', dot: '#4f46e5' },
  'Data Science':{ text: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', dot: '#7c3aed' },
  Design:        { text: '#db2777', bg: '#fdf2f8', border: '#fbcfe8', dot: '#db2777' },
  Marketing:     { text: '#d97706', bg: '#fffbeb', border: '#fde68a', dot: '#d97706' },
  Business:      { text: '#0891b2', bg: '#ecfeff', border: '#a5f3fc', dot: '#0891b2' },
}
const fallback = { text: '#64748b', bg: '#f8fafc', border: '#e2e8f0', dot: '#94a3b8' }

const CATEGORIES = ['All', 'Development', 'Data Science', 'Design', 'Marketing', 'Business']

// ─── Card ─────────────────────────────────────────────────────────────────────
function CourseCard({ course }: { course: Course }) {
  const { user } = useAuth()
  const router   = useRouter()
  const c        = CAT[course.category] ?? fallback
  const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0)

  const handleEnroll = () => {
    router.push(user ? `/courses/${course.id}` : `/auth/signin?callbackUrl=/courses/${course.id}`)
  }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-colors duration-300"
    >
      {/* Thumbnail */}
      <div className="relative h-40 bg-slate-100 overflow-hidden flex-shrink-0">
        <Image
          src={course.image} alt={course.title} fill
          sizes="(max-width:640px)100vw,(max-width:1280px)50vw,33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />

        {/* Category */}
        <span className="absolute top-3 left-3 text-[10.5px] font-bold px-2.5 py-1 rounded-lg shadow-sm"
          style={{ background: 'rgba(255,255,255,0.95)', color: c.text, border: `1px solid ${c.border}` }}>
          {course.category}
        </span>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 px-2.5 py-1 rounded-lg shadow-sm">
          <Star size={10} className="fill-amber-400 text-amber-400" />
          <span className="text-[10.5px] font-bold text-slate-700">{course.rating}</span>
        </div>

        {/* Free badge */}
        <span className="absolute bottom-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wide text-white"
          style={{ background: '#059669' }}>
          FREE
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3.5">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            {course.level} · {course.instructor}
          </p>
          <h3 className="text-[15px] font-bold text-slate-900 leading-snug">{course.title}</h3>
        </div>

        <p className="text-[12.5px] text-slate-500 leading-relaxed line-clamp-2">{course.description}</p>

        {/* Meta row */}
        <div className="flex items-center gap-3.5 text-[11.5px] text-slate-400 pt-2.5 border-t border-slate-100">
          <span className="flex items-center gap-1"><Clock size={11} className="text-indigo-400" />{course.duration}</span>
          <span className="flex items-center gap-1"><BookOpen size={11} className="text-indigo-400" />{totalLessons} lessons</span>
          <span className="flex items-center gap-1"><Users size={11} className="text-indigo-400" />{course.students.toLocaleString('en-IN')}+</span>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-1.5">
          {course.topics.map(t => (
            <span key={t} className="text-[10.5px] font-semibold px-2.5 py-0.5 rounded-md"
              style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleEnroll}
          className="mt-auto w-full bg-[#1a1063] hover:bg-indigo-900 text-white text-[13px] font-semibold rounded-xl h-10 shadow-sm shadow-indigo-900/20 transition-all hover:shadow-md hover:shadow-indigo-900/30 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {user
            ? <><BookOpen size={13} /> Start Learning</>
            : <><Lock size={13} /> Sign in to Enroll</>
          }
          <ArrowRight size={12} className="ml-auto opacity-50" />
        </button>
      </div>
    </motion.article>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function CoursesClient({ initialCourses }: { initialCourses: Course[] }) {
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => initialCourses.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      c.title.toLowerCase().includes(q) ||
      c.topics.some(t => t.toLowerCase().includes(q)) ||
      c.category.toLowerCase().includes(q)
    const matchCat = category === 'All' || c.category === category
    return matchSearch && matchCat
  }), [search, category, initialCourses])

  return (
    <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-16">

      {/* ── Filter bar ── */}
      <div className="py-7 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title or skill…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 text-[13.5px] border border-slate-200 rounded-xl bg-white outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100/60 transition-all text-slate-700 placeholder:text-slate-400"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
              <X size={13} />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
                category === cat
                  ? 'bg-[#1a1063] text-white border-[#1a1063] shadow-sm shadow-indigo-900/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-200 hover:text-indigo-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count + clear */}
        <div className="hidden sm:flex items-center gap-3 ml-auto">
          <p className="text-[12px] font-medium text-slate-500 whitespace-nowrap">
            <span className="font-bold text-slate-800">{filtered.length}</span> course{filtered.length !== 1 ? 's' : ''}
          </p>
          {(search || category !== 'All') && (
            <button
              onClick={() => { setSearch(''); setCategory('All') }}
              className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
              <X size={11} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Mobile count */}
      <div className="flex sm:hidden items-center justify-between mb-4">
        <p className="text-[12px] font-medium text-slate-500">
          <span className="font-bold text-slate-800">{filtered.length}</span> course{filtered.length !== 1 ? 's' : ''}
        </p>
        {(search || category !== 'All') && (
          <button onClick={() => { setSearch(''); setCategory('All') }}
            className="text-[12px] font-semibold text-indigo-600 flex items-center gap-1">
            <X size={11} /> Clear filters
          </button>
        )}
      </div>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((course, i) => (
              <motion.div key={course.id} layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
            <Search size={22} className="text-slate-300" />
          </div>
          <h3 className="text-[14.5px] font-bold text-slate-800 mb-1">No courses found</h3>
          <p className="text-[13px] text-slate-500 mb-4">Try a different keyword or browse all categories.</p>
          <button
            onClick={() => { setSearch(''); setCategory('All') }}
            className="text-[12.5px] font-bold text-indigo-600 border border-indigo-200 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
            Clear filters
          </button>
        </motion.div>
      )}

      {/* ── Bottom CTA — same dark banner as rest of site ── */}
      <div className="mt-12 sm:mt-14">
        <div className="relative rounded-2xl overflow-hidden" style={{ background: '#1a1063' }}>
          <div aria-hidden className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <svg width="100%" height="100%">
              <defs><pattern id="cdp" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1" fill="white" />
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#cdp)" />
            </svg>
          </div>
          <div aria-hidden className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
            style={{ background: 'linear-gradient(to left, rgba(99,102,241,0.28), transparent)' }} />

          <div className="relative flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left gap-6 px-7 sm:px-10 xl:px-14 py-9">
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: 'rgba(196,181,253,0.9)' }}>
                Can't find your topic?
              </p>
              <h2 className="text-[1.4rem] sm:text-[1.65rem] font-extrabold text-white leading-tight tracking-tight mb-2">
                New courses every week.
              </h2>
              <p className="text-[13.5px] leading-relaxed max-w-md mx-auto sm:mx-0" style={{ color: 'rgba(199,210,254,0.75)' }}>
                We release new masterclasses regularly. Join the waitlist to be first to know about new certifications.
              </p>
            </div>
            <button className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-[#1a1063] hover:bg-slate-50 font-bold px-6 py-3 text-[13.5px] rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap">
              Join the Waitlist <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

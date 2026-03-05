'use client'
// app/courses/courses-client.tsx

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Clock, Users, Star, ArrowRight,
  BookOpen, Lock, CheckCircle, Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import type { Course } from './course-data'

// ── Category colour map ───────────────────────────────────────────────────────

const CAT_STYLE: Record<string, { pill: string; badge: string }> = {
  Development: { pill: 'bg-indigo-50 text-indigo-700 border-indigo-100',  badge: 'bg-indigo-600' },
  'Data Science':{ pill: 'bg-violet-50 text-violet-700 border-violet-100', badge: 'bg-violet-600' },
  Design:      { pill: 'bg-rose-50 text-rose-700 border-rose-100',         badge: 'bg-rose-500' },
  Marketing:   { pill: 'bg-amber-50 text-amber-700 border-amber-100',      badge: 'bg-amber-500' },
  Business:    { pill: 'bg-sky-50 text-sky-700 border-sky-100',            badge: 'bg-sky-500' },
}
const fallbackStyle = { pill: 'bg-gray-50 text-gray-600 border-gray-100', badge: 'bg-gray-500' }

// ── Single course card ────────────────────────────────────────────────────────

function CourseCard({ course }: { course: Course }) {
  const { user } = useAuth()
  const router   = useRouter()
  const style    = CAT_STYLE[course.category] ?? fallbackStyle
  const total    = course.modules.reduce((s, m) => s + m.lessons.length, 0)

  const handleEnroll = () => {
    if (!user) {
      router.push(`/auth/signin?callbackUrl=/courses/${course.id}`)
      return
    }
    router.push(`/courses/${course.id}`)
  }

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="group flex flex-col h-full bg-white rounded-2xl border border-gray-200 overflow-hidden"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)' }}
    >
      {/* Thumbnail */}
      <div className="relative h-44 bg-gray-100 overflow-hidden flex-shrink-0">
        <Image
          src={course.image} alt={course.title} fill
          sizes="(max-width:640px)100vw,(max-width:1024px)50vw,380px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

        {/* Category pill */}
        <span className={`absolute top-3 left-3 border text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-sm bg-white/95 ${style.pill}`}>
          {course.category}
        </span>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm">
          <Star size={11} className="fill-amber-400 text-amber-400" />
          <span className="text-[11px] font-semibold text-gray-700">{course.rating}</span>
        </div>

        {/* Free badge */}
        <span className="absolute bottom-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wide">
          FREE
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
            {course.level} · {course.instructor}
          </p>
          <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">{course.title}</h3>
        </div>

        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">{course.description}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-gray-100">
          <span className="flex items-center gap-1.5"><Clock size={12} className="text-indigo-400" />{course.duration}</span>
          <span className="flex items-center gap-1.5"><BookOpen size={12} className="text-indigo-400" />{total} lessons</span>
          <span className="flex items-center gap-1.5"><Users size={12} className="text-indigo-400" />{course.students.toLocaleString('en-IN')}+</span>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-1.5">
          {course.topics.map(t => (
            <span key={t} className="bg-slate-50 border border-slate-200 text-gray-500 text-[11px] px-2.5 py-0.5 rounded-md">{t}</span>
          ))}
        </div>

        {/* CTA */}
        <Button
          onClick={handleEnroll}
          className="mt-auto w-full bg-[#1a1063] hover:bg-indigo-900 text-white text-sm font-medium rounded-xl h-11 shadow-sm shadow-indigo-900/15 transition-all flex items-center justify-center gap-2"
        >
          {user
            ? <><BookOpen size={14} />Start Learning</>
            : <><Lock size={14} />Sign in to Enroll</>
          }
          <ArrowRight size={13} className="ml-auto opacity-60" />
        </Button>
      </div>
    </motion.article>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

const CATEGORIES = ['All', 'Development', 'Data Science', 'Design', 'Marketing', 'Business']

export default function CoursesClient({ initialCourses }: { initialCourses: Course[] }) {
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')

  const filtered = initialCourses.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      c.title.toLowerCase().includes(q) ||
      c.topics.some(t => t.toLowerCase().includes(q)) ||
      c.category.toLowerCase().includes(q)
    const matchCat = category === 'All' || c.category === category
    return matchSearch && matchCat
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

      {/* ── Filter bar ── */}
      <div className="py-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or skill…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all whitespace-nowrap ${
                category === cat
                  ? 'bg-[#1a1063] text-white border-[#1a1063] shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Course grid ── */}
      {filtered.length > 0 ? (
        <>
          <p className="text-xs text-gray-400 mb-5">
            {filtered.length} course{filtered.length !== 1 ? 's' : ''} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((course, i) => (
                <motion.div key={course.id} layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}>
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <div className="text-center py-24">
          <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search size={22} className="text-gray-300" />
          </div>
          <h3 className="text-base font-semibold text-gray-700 mb-1">No courses found</h3>
          <p className="text-sm text-gray-400 mb-4">Try a different keyword or browse all categories.</p>
          <button
            onClick={() => { setSearch(''); setCategory('All') }}
            className="text-sm text-indigo-600 font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* ── Bottom CTA ── */}
      <div className="mt-20">
        <div className="relative bg-[#1a1063] rounded-2xl overflow-hidden">
          <div aria-hidden className="absolute inset-0 opacity-[0.055] pointer-events-none select-none">
            <svg width="100%" height="100%">
              <defs><pattern id="dp" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="white" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#dp)" />
            </svg>
          </div>
          <div aria-hidden className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-indigo-500/35 to-transparent pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-center sm:justify-between gap-6 px-8 sm:px-12 py-10 text-center sm:text-left">
            <div>
              <p className="text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-2">Can't find your topic?</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">New courses every week.</h2>
              <p className="text-indigo-200 text-sm leading-relaxed max-w-md mx-auto sm:mx-0">
                We release new masterclasses regularly. Join the waitlist to be first to know about new certifications.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button className="bg-white text-[#1a1063] hover:bg-indigo-50 font-semibold px-7 py-5 text-sm rounded-xl shadow-lg inline-flex items-center gap-2 transition-all">
                Join the Waitlist <ArrowRight size={15} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

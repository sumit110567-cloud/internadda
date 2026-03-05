// app/internships/internships-client.tsx
'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Filter chip options ──────────────────────────────────────────────────────
const TAGS = ['All', 'Frontend', 'AI & ML', 'Design', 'Data Science', 'Marketing', 'Full Stack']

// ─── Card ─────────────────────────────────────────────────────────────────────
function InternshipCard({ id, title, company, stipend, location, duration, skills, applicants, otherCompaniesCount, image, companyLogos, tag }: any) {
  const { user } = useAuth()
  const router = useRouter()

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`)
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative h-40 bg-slate-100 overflow-hidden flex-shrink-0">
        <Image src={image} alt={title} fill
          sizes="(max-width:640px)100vw,(max-width:1280px)50vw,33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-white/95 text-slate-700 text-[10.5px] font-semibold px-2.5 py-1 rounded-lg shadow-sm tracking-wide">{tag}</span>
        <span className="absolute top-3 right-3 bg-white/95 text-[10.5px] font-medium px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />{applicants} applied
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3.5">
        {/* Company */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex -space-x-1.5">
              {companyLogos.map((l: string, i: number) => (
                <div key={i} className="w-[18px] h-[18px] rounded-full border-2 border-white bg-slate-100 overflow-hidden relative shadow-sm">
                  <Image src={l} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 truncate font-medium">
              {company} <span className="text-slate-300">+{otherCompaniesCount} more</span>
            </p>
          </div>
          <h3 className="text-[15px] font-bold text-slate-900 leading-snug">{title}</h3>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3">
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Stipend</p>
            <p className="text-[11.5px] font-bold text-slate-800 leading-tight">{stipend}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Location</p>
            <p className="text-[11.5px] font-bold text-slate-800 flex items-center gap-0.5">
              <MapPin size={8} className="text-indigo-400 flex-shrink-0" />{location}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Duration</p>
            <p className="text-[11.5px] font-bold text-slate-800">{duration}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {skills.map((s: string) => (
            <span key={s} className="bg-indigo-50 text-indigo-600 text-[10.5px] font-semibold px-2.5 py-0.5 rounded-md border border-indigo-100">{s}</span>
          ))}
        </div>

        {/* CTA */}
        <button onClick={handleApply}
          className="mt-auto w-full bg-[#1a1063] hover:bg-indigo-900 text-white text-[13px] font-semibold rounded-xl h-10 shadow-sm shadow-indigo-900/20 transition-all hover:shadow-md hover:shadow-indigo-900/30 active:scale-[0.98]">
          {user ? 'Apply Now →' : 'Sign in to Apply →'}
        </button>
      </div>
    </motion.article>
  )
}

// ─── Main client ─────────────────────────────────────────────────────────────
export default function InternshipsClient({ initialInternships }: { initialInternships: any[] }) {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const filtered = useMemo(() => {
    return initialInternships.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.company.toLowerCase().includes(search.toLowerCase()) ||
        item.skills.some((s: string) => s.toLowerCase().includes(search.toLowerCase()))
      const matchesTag = activeTag === 'All' || item.tag === activeTag
      return matchesSearch && matchesTag
    })
  }, [search, activeTag, initialInternships])

  return (
    <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── Search + filters ── */}
      <div className="mb-8 -mt-2">
        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-5">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl shadow-sm px-4 py-2.5 focus-within:border-indigo-300 focus-within:shadow-md transition-all">
            <Search size={16} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by role, company, or skill…"
              className="flex-1 py-0.5 text-[13.5px] text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
                activeTag === tag
                  ? 'bg-[#1a1063] text-white shadow-sm shadow-indigo-900/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-200 hover:text-indigo-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results count ── */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-[12.5px] font-medium text-slate-500">
          Showing <span className="font-bold text-slate-800">{filtered.length}</span> internship{filtered.length !== 1 ? 's' : ''}
          {activeTag !== 'All' && <span> in <span className="text-indigo-600 font-bold">{activeTag}</span></span>}
        </p>
        {(search || activeTag !== 'All') && (
          <button
            onClick={() => { setSearch(''); setActiveTag('All') }}
            className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
          >
            <X size={12} /> Clear filters
          </button>
        )}
      </div>

      {/* ── Grid ── */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {filtered.map((item, i) => (
              <InternshipCard key={item.id} {...item} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <Search size={24} className="text-slate-300" />
            </div>
            <h3 className="text-[15px] font-bold text-slate-800 mb-1">No internships found</h3>
            <p className="text-[13px] text-slate-500 mb-4">Try a different role, skill, or category.</p>
            <button
              onClick={() => { setSearch(''); setActiveTag('All') }}
              className="text-[12.5px] font-bold text-indigo-600 border border-indigo-200 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

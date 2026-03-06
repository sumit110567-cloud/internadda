// app/internships/internships-client.tsx
'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import {
  Search, MapPin, X, Clock, Users, Zap,
  ShieldCheck, Star, TrendingUp, ArrowRight,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const TAGS = ['All', 'Frontend', 'AI & ML', 'Design', 'Data Science', 'Marketing', 'Full Stack']

// ── Urgency helper ────────────────────────────────────────────────────────────
function urgencyLevel(applicants: number): { label: string; color: string; bg: string } {
  if (applicants >= 80) return { label: 'Filling fast',  color: '#dc2626', bg: '#fef2f2' }
  if (applicants >= 50) return { label: 'High demand',   color: '#d97706', bg: '#fffbeb' }
  return                        { label: 'Now open',      color: '#059669', bg: '#ecfdf5' }
}

// ── Card ──────────────────────────────────────────────────────────────────────
function InternshipCard({
  id, title, company, stipend, location, duration,
  skills, applicants, otherCompaniesCount, image, companyLogos, tag,
}: any) {
  const { user } = useAuth()
  const router   = useRouter()
  const urgency  = urgencyLevel(applicants)

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
      whileHover={{ y: -3 }}
      className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Cover image */}
      <div className="relative h-40 bg-slate-100 overflow-hidden flex-shrink-0">
        <Image src={image} alt={title} fill
          sizes="(max-width:640px)100vw,(max-width:1280px)50vw,33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/5 to-transparent" />

        {/* Sector tag */}
        <span className="absolute top-3 left-3 bg-white/95 text-slate-700 text-[10.5px] font-bold px-2.5 py-1 rounded-lg shadow-sm tracking-wide">
          {tag}
        </span>

        {/* Urgency badge */}
        <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
          style={{ background: urgency.bg, color: urgency.color, border: `1px solid ${urgency.color}20` }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: urgency.color }} />
          {urgency.label}
        </span>

        {/* Applicant count bottom */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
          <Users size={9} className="text-white/70" />
          <span className="text-[9.5px] font-bold text-white/90">{applicants} applied</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3">

        {/* Company row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {companyLogos.map((l: string, i: number) => (
                <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-slate-100 overflow-hidden relative shadow-sm">
                  <Image src={l} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-[11.5px] text-slate-500 font-semibold truncate max-w-[140px]">
              {company}
              {otherCompaniesCount > 0 && (
                <span className="text-slate-400 font-normal"> +{otherCompaniesCount}</span>
              )}
            </p>
          </div>
          {/* Verified badge */}
          <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-md px-1.5 py-0.5 flex-shrink-0">
            <ShieldCheck size={9} className="text-emerald-500" />
            <span className="text-[9px] font-bold text-emerald-600">Verified</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[15.5px] font-extrabold text-slate-900 leading-snug tracking-tight">
          {title}
        </h3>

        {/* Meta grid */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3">
          <div>
            <p className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Stipend</p>
            <p className="text-[11.5px] font-extrabold text-slate-800 leading-tight">{stipend}</p>
          </div>
          <div>
            <p className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Location</p>
            <p className="text-[11.5px] font-bold text-slate-800 flex items-center gap-0.5 truncate">
              <MapPin size={8} className="text-indigo-400 flex-shrink-0" />{location}
            </p>
          </div>
          <div>
            <p className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Duration</p>
            <p className="text-[11.5px] font-bold text-slate-800 flex items-center gap-0.5">
              <Clock size={8} className="text-indigo-400 flex-shrink-0" />{duration}
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {skills.slice(0, 4).map((s: string) => (
            <span key={s}
              className="bg-indigo-50 text-indigo-600 text-[10.5px] font-semibold px-2.5 py-0.5 rounded-md border border-indigo-100/80">
              {s}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="text-[10.5px] font-semibold text-slate-400 px-2 py-0.5">
              +{skills.length - 4}
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleApply}
          className="mt-auto w-full h-11 rounded-xl text-[13px] font-bold text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2 group/btn"
          style={{
            background: 'linear-gradient(135deg,#1a1063,#3730a3)',
            boxShadow: '0 3px 12px rgba(26,16,99,0.22)',
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,16,99,0.35)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 3px 12px rgba(26,16,99,0.22)')}
        >
          {user ? (
            <>Apply Now <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" /></>
          ) : (
            <><Zap size={12} className="fill-current" /> Sign in & Apply Free</>
          )}
        </button>

        {/* Sub-CTA trust line */}
        {!user && (
          <p className="text-center text-[10.5px] text-slate-400 font-medium -mt-1">
            Free to apply · Takes 2 minutes
          </p>
        )}
      </div>
    </motion.article>
  )
}

// ── Trust banner (logged-out only) ───────────────────────────────────────────
function TrustBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="mb-7 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-white px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3.5">
        <div className="relative w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 shadow border border-white">
          <Image src="/logo.jpg" alt="Internadda" fill className="object-cover" />
        </div>
        <div>
          <p className="text-[13px] font-extrabold text-slate-900">
            Join 8,000+ students already on Internadda
          </p>
          <p className="text-[11.5px] text-slate-500 font-medium">
            MSME certified · 200+ verified companies · 100% free
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Link href="/auth/signin"
          className="h-9 px-4 rounded-xl text-[12px] font-bold border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-all">
          Sign In
        </Link>
        <Link href="/auth/signup"
          className="h-9 px-5 rounded-xl text-[12px] font-bold text-white transition-all active:scale-[0.97] flex items-center gap-1.5"
          style={{ background: 'linear-gradient(135deg,#1a1063,#3730a3)', boxShadow: '0 3px 10px rgba(26,16,99,0.22)' }}>
          Join Free <ArrowRight size={11} />
        </Link>
      </div>
    </motion.div>
  )
}

// ── Social proof ticker ──────────────────────────────────────────────────────
const PROOF_ITEMS = [
  '✦ 200+ verified companies',
  '✦ 7,200+ students placed',
  '✦ MSME registered',
  '✦ Zero hidden fees',
  '✦ Instant marksheet',
  '✦ 4.9★ rated platform',
]

function ProofTicker() {
  return (
    <div className="overflow-hidden mb-7 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="flex gap-0 border-y border-slate-100 bg-slate-50/60 py-2.5">
        <motion.div
          className="flex gap-0 flex-shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          {[...PROOF_ITEMS, ...PROOF_ITEMS].map((item, i) => (
            <span key={i} className="px-6 text-[11px] font-bold text-slate-500 whitespace-nowrap">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// ── Main client ──────────────────────────────────────────────────────────────
export default function InternshipsClient({ initialInternships }: { initialInternships: any[] }) {
  const { user } = useAuth()
  const [search,    setSearch]    = useState('')
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
    <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Trust banner for logged-out users */}
      {!user && <TrustBanner />}

      {/* Social proof ticker */}
      <ProofTicker />

      {/* ── Search + filters ── */}
      <div className="mb-7">

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-4">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl shadow-sm px-4 py-2.5 focus-within:border-indigo-300 focus-within:shadow-md focus-within:ring-2 focus-within:ring-indigo-100/60 transition-all">
            <Search size={15} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by role, company or skill…"
              className="flex-1 py-0.5 text-[13.5px] text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {TAGS.map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all ${
                activeTag === tag
                  ? 'bg-[#1a1063] text-white shadow-sm shadow-indigo-900/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-200 hover:text-indigo-700 hover:bg-indigo-50'
              }`}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results bar ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <p className="text-[12.5px] font-medium text-slate-500">
            <span className="font-extrabold text-slate-900">{filtered.length}</span> internship{filtered.length !== 1 ? 's' : ''}
            {activeTag !== 'All' && <span> in <span className="text-indigo-600 font-bold">{activeTag}</span></span>}
          </p>
          {filtered.length > 0 && (
            <span className="hidden sm:flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
              <TrendingUp size={9} className="text-emerald-500" />
              <span className="text-[9.5px] font-bold text-emerald-600">Updated today</span>
            </span>
          )}
        </div>
        {(search || activeTag !== 'All') && (
          <button onClick={() => { setSearch(''); setActiveTag('All') }}
            className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
            <X size={11} /> Clear
          </button>
        )}
      </div>

      {/* ── Grid ── */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(item => (
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
              <Search size={22} className="text-slate-300" />
            </div>
            <h3 className="text-[15px] font-bold text-slate-800 mb-1">No matches found</h3>
            <p className="text-[13px] text-slate-500 mb-5">Try a different role, skill, or sector.</p>
            <button onClick={() => { setSearch(''); setActiveTag('All') }}
              className="h-10 px-5 rounded-xl text-[12.5px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors">
              Show all internships
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom CTA (logged-out) ── */}
      {!user && filtered.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg,#0d0622 0%,#1a1063 50%,#2a1fa8 100%)' }}
        >
          <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
              <defs><pattern id="dd2" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1" fill="white" />
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#dd2)" />
            </svg>
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20"
              style={{ background: 'radial-gradient(ellipse,#818cf8 0%,transparent 70%)' }} />
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 px-7 sm:px-10 py-8">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-lg border border-white/20">
              <Image src="/logo.jpg" alt="Internadda" fill className="object-cover" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                <p className="text-white font-extrabold text-[1.1rem] tracking-tight">
                  Create a free account to apply
                </p>
                <span className="bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-full">
                  FREE
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start flex-wrap">
                {['One-click apply', 'Track applications', 'Free skill test'].map(f => (
                  <div key={f} className="flex items-center gap-1">
                    <Star size={9} className="text-amber-400 fill-current" />
                    <span className="text-[11px] font-medium" style={{ color: 'rgba(199,210,254,0.75)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
              <Link href="/auth/signup"
                className="flex items-center gap-2 h-11 px-6 rounded-xl font-bold text-[13px] text-[#1a1063] bg-white hover:bg-slate-50 transition-all active:scale-[0.98] shadow-md">
                Get Started Free <ArrowRight size={13} />
              </Link>
              <Link href="/auth/signin"
                className="flex items-center justify-center h-11 px-5 rounded-xl font-bold text-[13px] transition-all"
                style={{ border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(199,210,254,0.9)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  )
}

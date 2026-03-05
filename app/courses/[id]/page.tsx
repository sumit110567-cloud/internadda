'use client'
// app/courses/[id]/page.tsx
// Place this file at: app/courses/[id]/page.tsx

import { useEffect, useState, useRef, useCallback } from 'react'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { courses, type Lesson } from '../course-data'
import {
  CheckCircle, Circle, ChevronRight, ChevronDown, ChevronLeft,
  BookOpen, Code, FileText, HelpCircle, Award, Download,
  Clock, Play, X, Shield, Menu,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// ─── Content renderer (markdown-ish) ─────────────────────────────────────────

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-indigo-100/80">{part.slice(1, -1)}</code>
    return part
  })
}

function ContentRenderer({ content }: { content: string }) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim() || 'code'
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) { codeLines.push(lines[i]); i++ }
      const code = codeLines.join('\n')
      elements.push(
        <div key={`cb-${i}`} className="my-6 rounded-xl overflow-hidden border border-gray-800/60 shadow-lg">
          <div className="flex items-center justify-between bg-[#161b22] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-[#8b949e] text-xs font-mono ml-1">{lang}</span>
            </div>
          </div>
          <pre className="bg-[#0d1117] text-[#e6edf3] text-[13px] font-mono leading-[1.7] p-5 overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
      )
      i++; continue
    }

    // Table
    if (line.startsWith('|') && lines[i + 1]?.match(/^\|[-| ]+\|/)) {
      const headers = line.split('|').slice(1, -1).map(h => h.trim())
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i].startsWith('|')) {
        rows.push(lines[i].split('|').slice(1, -1).map(c => c.trim()))
        i++
      }
      elements.push(
        <div key={`tbl-${i}`} className="my-5 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm min-w-[400px]">
            <thead className="bg-indigo-50">
              <tr>
                {headers.map((h, j) => (
                  <th key={j} className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider border-b border-indigo-100">
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {rows.map((row, ri) => (
                <tr key={ri} className="hover:bg-gray-50/60 transition-colors">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2.5 text-[13px] text-gray-700 leading-relaxed">{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    // H2
    if (line.startsWith('## ')) {
      elements.push(<h2 key={`h2-${i}`} className="text-[1.35rem] font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-100 tracking-tight">{renderInline(line.slice(3))}</h2>)
    }
    // H3
    else if (line.startsWith('### ')) {
      elements.push(<h3 key={`h3-${i}`} className="text-base font-semibold text-gray-800 mt-6 mb-2">{renderInline(line.slice(4))}</h3>)
    }
    // Blockquote / callout
    else if (line.startsWith('> ')) {
      elements.push(
        <div key={`bq-${i}`} className="my-4 flex gap-3 bg-indigo-50/70 border-l-[3px] border-indigo-400 rounded-r-xl px-4 py-3">
          <p className="text-[13.5px] text-indigo-800 leading-relaxed">{renderInline(line.slice(2))}</p>
        </div>
      )
    }
    // Checklist ✅
    else if (/^- [✅❌⚠️]/.test(line)) {
      const icon = line.slice(2, line.indexOf(' ', 2) + 1).trim()
      const rest = line.slice(line.indexOf(' ', 3)).trim()
      elements.push(
        <div key={`chk-${i}`} className="flex items-start gap-2 my-1.5">
          <span className="text-base mt-0.5 flex-shrink-0">{icon}</span>
          <p className="text-[13.5px] text-gray-700 leading-6">{renderInline(rest)}</p>
        </div>
      )
    }
    // Bullet
    else if (line.startsWith('- ')) {
      elements.push(
        <div key={`li-${i}`} className="flex items-start gap-2.5 my-1.5">
          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
          <p className="text-[13.5px] text-gray-700 leading-6">{renderInline(line.slice(2))}</p>
        </div>
      )
    }
    // Numbered list
    else if (/^\d+\. /.test(line)) {
      const num  = line.match(/^(\d+)\./)?.[1] ?? '1'
      const rest = line.replace(/^\d+\. /, '')
      elements.push(
        <div key={`nl-${i}`} className="flex items-start gap-3 my-1.5">
          <span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[11px] font-bold flex items-center justify-center flex-shrink-0">{num}</span>
          <p className="text-[13.5px] text-gray-700 leading-6">{renderInline(rest)}</p>
        </div>
      )
    }
    // Paragraph
    else if (line.trim()) {
      elements.push(<p key={`p-${i}`} className="text-[14px] text-gray-700 leading-7 my-1">{renderInline(line)}</p>)
    }
    // Blank line spacer
    else {
      elements.push(<div key={`sp-${i}`} className="h-1" />)
    }

    i++
  }

  return <div className="space-y-0.5">{elements}</div>
}

// ─── Lesson type icon ─────────────────────────────────────────────────────────

function LessonTypeIcon({ type }: { type: Lesson['type'] }) {
  if (type === 'video')    return <Play     size={12} className="text-violet-500 flex-shrink-0" />
  if (type === 'exercise') return <Code     size={12} className="text-amber-500 flex-shrink-0" />
  if (type === 'quiz')     return <HelpCircle size={12} className="text-rose-500 flex-shrink-0" />
  return                          <FileText size={12} className="text-indigo-500 flex-shrink-0" />
}

// ─── Certificate modal ────────────────────────────────────────────────────────

function CertificateModal({ course, userName, onClose }: {
  course: ReturnType<typeof courses[0]['modules'][0]['lessons'][0] extends infer T ? () => typeof courses[0] : never>,
  userName: string,
  onClose: () => void,
}) {
  const certRef = React.useRef<HTMLDivElement>(null)
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  // Generate a deterministic cert ID from userName + course title
  const certId = 'IA-' + [...(userName + (course as any).title)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) & 0xffffff, 0).toString(16).toUpperCase().padStart(6, '0')

  const handleDownload = () => {
    const el = certRef.current
    if (!el) return
    // Open print dialog scoped to certificate only via a new window
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>Certificate – ${userName}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}
      body{width:794px;height:562px;overflow:hidden;font-family:'Inter',sans-serif;background:#fff;print-color-adjust:exact;-webkit-print-color-adjust:exact}
      @page{size:A4 landscape;margin:0}
    </style>
    </head><body>${el.innerHTML}</body></html>`
    const w = window.open('', '_blank', 'width=900,height=650')
    if (!w) return
    w.document.write(html)
    w.document.close()
    w.onload = () => { w.focus(); w.print() }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, y: 32, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-3xl"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Certificate ── */}
        <div
          ref={certRef}
          className="relative bg-white overflow-hidden"
          style={{
            borderRadius: 0,
            aspectRatio: '794 / 562',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          {/* Outer border frame */}
          <div className="absolute inset-3 border border-[#c8a951]/40 pointer-events-none z-10" style={{ borderRadius: 2 }} />
          <div className="absolute inset-4 border border-[#c8a951]/20 pointer-events-none z-10" style={{ borderRadius: 1 }} />

          {/* Gold corner ornaments */}
          {[
            'top-3 left-3',
            'top-3 right-3 rotate-90',
            'bottom-3 left-3 -rotate-90',
            'bottom-3 right-3 rotate-180',
          ].map((pos, i) => (
            <svg key={i} className={`absolute ${pos} z-10`} width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M2 26 L2 2 L26 2" stroke="#c8a951" strokeWidth="1.5" fill="none" opacity="0.8"/>
              <path d="M6 22 L6 6 L22 6" stroke="#c8a951" strokeWidth="0.7" fill="none" opacity="0.4"/>
              <circle cx="2" cy="2" r="2" fill="#c8a951" opacity="0.9"/>
            </svg>
          ))}

          {/* Left dark sidebar */}
          <div className="absolute left-0 top-0 bottom-0 w-[38%]" style={{ background: 'linear-gradient(135deg, #0a0820 0%, #1a1063 60%, #0f1a5c 100%)' }}>
            {/* Subtle pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cert-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="12" cy="12" r="0.8" fill="white"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cert-grid)"/>
            </svg>
            {/* Glow orb */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />

            {/* Logo / brand area */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              {/* Seal */}
              <div className="relative mb-5">
                <svg width="90" height="90" viewBox="0 0 90 90">
                  <circle cx="45" cy="45" r="42" fill="none" stroke="#c8a951" strokeWidth="1.2" opacity="0.7"/>
                  <circle cx="45" cy="45" r="36" fill="none" stroke="#c8a951" strokeWidth="0.6" opacity="0.4"/>
                  <circle cx="45" cy="45" r="30" fill="#c8a951" opacity="0.12"/>
                  {/* Star rays */}
                  {Array.from({length: 8}).map((_, i) => {
                    const angle = (i * 45) * Math.PI / 180
                    const x1 = 45 + 31 * Math.cos(angle), y1 = 45 + 31 * Math.sin(angle)
                    const x2 = 45 + 38 * Math.cos(angle), y2 = 45 + 38 * Math.sin(angle)
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c8a951" strokeWidth="1" opacity="0.6"/>
                  })}
                  <text x="45" y="38" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="7" fill="#c8a951" fontWeight="600" letterSpacing="2">INTERN</text>
                  <text x="45" y="49" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="14" fill="#c8a951" fontWeight="700">IA</text>
                  <text x="45" y="60" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="7" fill="#c8a951" fontWeight="600" letterSpacing="2">ADDA</text>
                </svg>
              </div>

              <p className="text-white/40 text-[8px] font-semibold tracking-[0.25em] uppercase mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>InternAdda Academy</p>
              <p className="text-white/25 text-[7px] tracking-[0.15em]" style={{ fontFamily: "'Inter', sans-serif" }}>MSME · Govt. of India</p>

              {/* Divider */}
              <div className="mt-6 flex items-center gap-2 opacity-30">
                <div className="h-px w-10 bg-[#c8a951]" />
                <div className="w-1 h-1 rounded-full bg-[#c8a951]" />
                <div className="h-px w-10 bg-[#c8a951]" />
              </div>

              <p className="mt-4 text-white/25 text-[7px] tracking-[0.1em] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>Cert ID: {certId}</p>
            </div>
          </div>

          {/* Right content area */}
          <div className="absolute left-[38%] right-0 top-0 bottom-0 flex flex-col justify-center px-10 py-8 bg-white">
            {/* Top label */}
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px flex-1 bg-[#c8a951]/30" />
              <p className="text-[#c8a951] text-[8px] font-semibold tracking-[0.3em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Certificate of Completion</p>
              <div className="h-px flex-1 bg-[#c8a951]/30" />
            </div>

            <p className="text-gray-400 text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>This certifies that</p>

            {/* Name — hero element */}
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 4vw, 32px)', color: '#0a0820', lineHeight: 1.1, letterSpacing: '-0.5px', fontWeight: 700, marginBottom: 6 }}>
              {userName}
            </h2>

            {/* Gold underline */}
            <div className="flex gap-0.5 mb-5">
              <div className="h-[2.5px] w-12 rounded-full" style={{ background: '#c8a951' }} />
              <div className="h-[2.5px] w-4 rounded-full" style={{ background: '#c8a951', opacity: 0.4 }} />
            </div>

            <p className="text-gray-500 text-[10px] tracking-wide uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>has successfully completed</p>

            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(13px, 2vw, 17px)', color: '#1a1063', lineHeight: 1.3, fontWeight: 600, marginBottom: 4 }}>
              {(course as any).title}
            </h3>
            <p className="text-gray-400 text-[10px] mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              Instructed by <span className="text-gray-600 font-medium">{(course as any).instructor}</span>
              {(course as any).instructorTitle && <span> · {(course as any).instructorTitle}</span>}
            </p>

            {/* Bottom row */}
            <div className="flex items-end justify-between">
              {/* Signature block */}
              <div>
                <div className="mb-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#1a1063', lineHeight: 1, letterSpacing: '-0.5px', fontStyle: 'italic', opacity: 0.85 }}>
                  InternAdda
                </div>
                <div className="h-px w-24 bg-gray-300 mb-1" />
                <p className="text-gray-400 text-[8px] tracking-wider uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Authorised Signatory</p>
              </div>

              {/* Date + badge */}
              <div className="text-right">
                <p className="text-gray-400 text-[8px] uppercase tracking-wider mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>Issue Date</p>
                <p className="text-[#1a1063] text-[11px] font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>{date}</p>
                <div className="mt-2 flex items-center justify-end gap-1">
                  <Shield size={9} className="text-emerald-500" />
                  <p className="text-emerald-600 text-[8px] font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>Verified Certificate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex gap-3 mt-4">
          <Button
            onClick={handleDownload}
            className="flex-1 bg-[#1a1063] hover:bg-indigo-900 text-white font-semibold rounded-xl h-11 flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/30"
          >
            <Download size={15} /> Download Certificate
          </Button>
          <button
            onClick={() => {
              const text = `🎓 I just completed "${(course as any).title}" on InternAdda Academy! Proud to have earned this certificate. #InternAdda #Learning #Certificate`
              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://www.internadda.com/courses')}&summary=${encodeURIComponent(text)}`, '_blank')
            }}
            className="h-11 px-4 bg-[#0077b5] hover:bg-[#006097] text-white rounded-xl flex items-center gap-2 text-sm font-semibold transition-colors shadow-lg shadow-blue-900/20"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            Share on LinkedIn
          </button>
          <button
            onClick={onClose}
            className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white border border-white/15 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-center text-white/30 text-[11px] mt-3">
          Share your achievement and inspire others to learn! 🎓
        </p>
      </motion.div>
    </motion.div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CoursePage() {
  const params   = useParams()
  const router   = useRouter()
  const { user } = useAuth()

  const courseId = parseInt(params?.id as string)
  const course   = courses.find(c => c.id === courseId)

  const allLessons = course?.modules.flatMap(m => m.lessons) ?? []
  const totalLessons = allLessons.length

  const [completedIds,     setCompletedIds]     = useState<Set<string>>(new Set())
  const [activeLessonId,   setActiveLessonId]   = useState(allLessons[0]?.id ?? '')
  const [expandedModules,  setExpandedModules]  = useState<Set<string>>(new Set(course?.modules.map(m => m.id) ?? []))
  const [showCert,         setShowCert]         = useState(false)
  const [sidebarOpen,      setSidebarOpen]      = useState(false)

  // Auth guard
  useEffect(() => {
    if (user === null) router.replace(`/auth/signin?callbackUrl=/courses/${courseId}`)
  }, [user, courseId, router])

  // Scroll top on lesson change
  const contentRef = useRef<HTMLDivElement>(null)
  useEffect(() => { contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' }) }, [activeLessonId])

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <BookOpen size={24} className="text-gray-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Course not found</h2>
        <p className="text-gray-500 text-sm mb-5">This course doesn't exist or has been removed.</p>
        <Link href="/courses"><Button className="bg-[#1a1063] text-white rounded-xl">Browse all courses</Button></Link>
      </div>
    </div>
  )

  if (!user) return null

  const activeLesson      = allLessons.find(l => l.id === activeLessonId) ?? allLessons[0]
  const activeLessonIndex = allLessons.findIndex(l => l.id === activeLessonId)
  const completedCount    = completedIds.size
  const progress          = Math.round((completedCount / totalLessons) * 100)
  const allDone           = completedCount === totalLessons
  const userName          = (user as any)?.user_metadata?.full_name || 'Student'

  const markComplete = useCallback(() => {
    setCompletedIds(prev => new Set([...prev, activeLessonId]))
  }, [activeLessonId])

  const goNext = useCallback(() => {
    markComplete()
    if (activeLessonIndex < allLessons.length - 1)
      setActiveLessonId(allLessons[activeLessonIndex + 1].id)
  }, [markComplete, activeLessonIndex, allLessons])

  const goPrev = useCallback(() => {
    if (activeLessonIndex > 0) setActiveLessonId(allLessons[activeLessonIndex - 1].id)
  }, [activeLessonIndex, allLessons])

  const toggleModule = (id: string) => setExpandedModules(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
  })

  const selectLesson = (id: string) => { setActiveLessonId(id); setSidebarOpen(false) }

  // ── Sidebar (shared between desktop sticky + mobile drawer) ───────────────

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Course header */}
      <div className="px-5 py-4 border-b border-gray-100 flex-shrink-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">{course.category}</p>
        <h2 className="text-sm font-semibold text-gray-900 leading-snug mb-3">{course.title}</h2>
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1"><BookOpen size={11} />{totalLessons} lessons</span>
          <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
        </div>
        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-[10px] font-medium mb-1">
            <span className="text-gray-400">{completedCount}/{totalLessons} completed</span>
            <span className="text-indigo-600">{progress}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-600 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      {/* Modules + lessons */}
      <div className="flex-1 overflow-y-auto">
        {course.modules.map((mod, mi) => {
          const isExp      = expandedModules.has(mod.id)
          const modDone    = mod.lessons.filter(l => completedIds.has(l.id)).length
          return (
            <div key={mod.id} className="border-b border-gray-100 last:border-0">
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-start justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors text-left"
              >
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Module {mi + 1}</p>
                  <p className="text-xs font-semibold text-gray-800 leading-snug">{mod.title}</p>
                </div>
                <div className="flex items-center gap-2 mt-0.5 flex-shrink-0 ml-3">
                  <span className="text-[10px] text-gray-400">{modDone}/{mod.lessons.length}</span>
                  <ChevronDown size={13} className={`text-gray-400 transition-transform flex-shrink-0 ${isExp ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {isExp && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {mod.lessons.map(lesson => {
                      const isDone   = completedIds.has(lesson.id)
                      const isActive = lesson.id === activeLessonId
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => selectLesson(lesson.id)}
                          className={`w-full flex items-center gap-3 px-5 py-3 border-b border-gray-50 last:border-0 text-left transition-all ${
                            isActive
                              ? 'bg-indigo-50 border-l-2 border-l-indigo-500'
                              : 'hover:bg-gray-50/80'
                          }`}
                        >
                          {isDone
                            ? <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                            : <Circle      size={14} className={`flex-shrink-0 ${isActive ? 'text-indigo-400' : 'text-gray-200'}`} />
                          }
                          <div className="min-w-0 flex-1">
                            <p className={`text-[12px] leading-snug truncate ${
                              isActive ? 'font-semibold text-indigo-700' :
                              isDone   ? 'text-gray-400 line-through' :
                                         'text-gray-700'
                            }`}>
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <LessonTypeIcon type={lesson.type} />
                              <span className="text-[10px] text-gray-400">{lesson.duration}</span>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <>
      {/* ── Distraction-free top bar (replaces full Header) ── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-3">
            <Link href="/courses" className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0">
              <ChevronLeft size={18} />
              <span className="text-xs font-medium hidden sm:inline">All Courses</span>
            </Link>

            <div className="w-px h-4 bg-gray-200 hidden sm:block flex-shrink-0" />

            {/* Course name + progress */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-700 truncate hidden sm:block">{course.title}</p>
              <div className="flex items-center gap-2 mt-1 sm:mt-0.5">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-600 rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="text-xs font-semibold text-indigo-600 flex-shrink-0 tabular-nums">{progress}%</span>
              </div>
            </div>

            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Open course menu"
            >
              <Menu size={16} />
            </button>

            {allDone && (
              <Button
                onClick={() => setShowCert(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl px-4 h-9 flex items-center gap-1.5 flex-shrink-0"
              >
                <Award size={13} /> Certificate
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile sidebar drawer ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
                <p className="text-sm font-semibold text-gray-800">Course Contents</p>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <SidebarContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6 items-start">

          {/* ── Desktop sidebar ── */}
          <aside className="hidden lg:flex flex-col w-72 xl:w-80 flex-shrink-0">
            <div
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden sticky top-24 max-h-[calc(100vh-7rem)]"
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
            >
              <SidebarContent />
            </div>
          </aside>

          {/* ── Content area ── */}
          <div ref={contentRef} className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLessonId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
              >
                {/* Lesson header card */}
                <div
                  className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-5"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <LessonTypeIcon type={activeLesson.type} />
                      <span className="text-xs text-gray-500 capitalize">{activeLesson.type}</span>
                    </div>
                    <span className="text-gray-200 text-xs">·</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={11} />{activeLesson.duration}</span>
                    {completedIds.has(activeLessonId) && (
                      <span className="ml-auto flex items-center gap-1 text-xs text-emerald-600 font-medium">
                        <CheckCircle size={13} /> Completed
                      </span>
                    )}
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{activeLesson.title}</h1>
                </div>

                {/* Lesson body */}
                <div
                  className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-5"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                >
                  <ContentRenderer content={activeLesson.content} />

                  {/* "Try it yourself" code panel */}
                  {activeLesson.codeExample && (
                    <div className="mt-8 rounded-2xl overflow-hidden border border-gray-800/50 shadow-lg">
                      <div className="flex items-center justify-between bg-indigo-600 px-5 py-2.5">
                        <div className="flex items-center gap-2">
                          <Code size={14} className="text-indigo-200" />
                          <span className="text-white text-xs font-semibold">Try it yourself</span>
                        </div>
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                        </div>
                      </div>
                      <pre className="bg-[#0d1117] text-[#e6edf3] text-[13px] font-mono leading-[1.7] p-5 sm:p-6 overflow-x-auto">
                        <code>{activeLesson.codeExample}</code>
                      </pre>
                    </div>
                  )}
                </div>

                {/* Navigation footer */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row gap-3"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>

                  <Button
                    variant="outline"
                    disabled={activeLessonIndex === 0}
                    onClick={goPrev}
                    className="w-full sm:w-auto border-gray-200 text-gray-600 rounded-xl h-11 px-5 flex items-center justify-center gap-2 disabled:opacity-40"
                  >
                    <ChevronLeft size={15} /> Previous
                  </Button>

                  {!completedIds.has(activeLessonId) && (
                    <Button
                      onClick={markComplete}
                      variant="outline"
                      className="w-full sm:flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-xl h-11 flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={15} /> Mark as Complete
                    </Button>
                  )}

                  {activeLessonIndex < allLessons.length - 1 ? (
                    <Button
                      onClick={goNext}
                      className="w-full sm:w-auto bg-[#1a1063] hover:bg-indigo-900 text-white rounded-xl h-11 px-6 flex items-center justify-center gap-2"
                    >
                      Next Lesson <ChevronRight size={15} />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => { markComplete(); setTimeout(() => setShowCert(true), 200) }}
                      className="w-full sm:w-auto flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11 px-6 flex items-center justify-center gap-2"
                    >
                      <Award size={15} /> Finish & Get Certificate
                    </Button>
                  )}
                </div>

                {/* Completion banner */}
                {allDone && !showCert && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-5 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award size={22} className="text-emerald-600" />
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="font-semibold text-emerald-800 text-sm">🎉 Course Complete!</p>
                      <p className="text-emerald-600 text-xs mt-0.5">
                        You have finished all {totalLessons} lessons. Your certificate is ready to download.
                      </p>
                    </div>
                    <Button
                      onClick={() => setShowCert(true)}
                      className="ml-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-10 px-5 text-sm flex items-center gap-2 flex-shrink-0"
                    >
                      <Award size={14} /> Claim Certificate
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Certificate modal */}
      <AnimatePresence>
        {showCert && (
          <CertificateModal
            course={course as any}
            userName={userName}
            onClose={() => setShowCert(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

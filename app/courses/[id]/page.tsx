'use client'
// app/courses/[id]/page.tsx
// Place this file at: app/courses/[id]/page.tsx

import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useAuth } from '@/lib/auth-context'
import { courses, type Lesson } from '../course-data'
import {
  CheckCircle, Circle, ChevronRight, ChevronDown, ChevronLeft,
  BookOpen, Code, FileText, HelpCircle, Award, Download,
  Clock, Users, Star, ArrowRight, Lock, Play, X, Shield, Menu,
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
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Certificate design */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          {/* Top strip — dark navy */}
          <div className="relative bg-[#0f0c3d] px-10 pt-10 pb-8 overflow-hidden">
            {/* Corner ornaments */}
            {['top-4 left-4 rounded-tl-xl border-t-2 border-l-2',
              'top-4 right-4 rounded-tr-xl border-t-2 border-r-2',
              'bottom-4 left-4 rounded-bl-xl border-b-2 border-l-2',
              'bottom-4 right-4 rounded-br-xl border-b-2 border-r-2',
            ].map((cls, i) => (
              <div key={i} className={`absolute w-14 h-14 border-indigo-300/25 ${cls}`} />
            ))}
            {/* Dot texture */}
            <div aria-hidden className="absolute inset-0 opacity-[0.04] pointer-events-none">
              <svg width="100%" height="100%">
                <defs><pattern id="cert-dot" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white" /></pattern></defs>
                <rect width="100%" height="100%" fill="url(#cert-dot)" />
              </svg>
            </div>
            {/* Glow */}
            <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
                <Shield size={12} className="text-amber-300" />
                <span className="text-white/80 text-xs font-semibold tracking-[0.15em] uppercase">InternAdda Academy</span>
              </div>
              <p className="text-indigo-200 text-sm font-medium mb-2">This is to certify that</p>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{userName}</h2>
              <p className="text-indigo-200/80 text-sm mb-4">has successfully completed the course</p>
              <h3 className="text-xl font-bold text-amber-300 mb-1.5">{(course as any).title}</h3>
              <p className="text-indigo-300 text-sm">
                Instructed by {(course as any).instructor} · {(course as any).instructorTitle}
              </p>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="flex items-center justify-between px-10 py-5 bg-gray-50 border-t border-gray-100">
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-0.5">Date Issued</p>
              <p className="text-sm font-semibold text-gray-800">{date}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                <Award size={18} className="text-white" />
              </div>
              <p className="text-[10px] text-gray-400 font-medium">Verified</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-0.5">Registered</p>
              <p className="text-sm font-semibold text-gray-800">MSME · Govt. of India</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <Button
            onClick={() => window.print()}
            className="flex-1 bg-[#1a1063] hover:bg-indigo-900 text-white font-semibold rounded-xl h-11 flex items-center justify-center gap-2"
          >
            <Download size={15} /> Download Certificate
          </Button>
          <button
            onClick={onClose}
            className="w-11 h-11 bg-white/15 hover:bg-white/25 rounded-xl flex items-center justify-center text-white border border-white/20 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
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
      <Header />

      {/* ── Top progress bar ── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-3">
            <Link href="/courses" className="text-gray-400 hover:text-gray-700 transition-colors p-1 -ml-1 flex-shrink-0">
              <ChevronLeft size={18} />
            </Link>

            {/* Course name */}
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

      <Footer />
    </>
  )
}

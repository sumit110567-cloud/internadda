'use client'
// app/test/[code]/page.tsx  — Student test experience

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Clock, CheckCircle, XCircle, AlertCircle,
  ArrowRight, ArrowLeft, ShieldCheck, Download,
  ChevronRight, SkipForward,
} from 'lucide-react'
import { getQuestions, getGrade } from '@/lib/test-data'
import type { TestRecord, Question } from '@/lib/test-data'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'ia_tests_v1'

type Phase = 'loading' | 'notfound' | 'lobby' | 'active' | 'result'

// ─── Locked nav — appears on all student views ────────────────────────────────
function LockedNav() {
  return (
    <nav className="bg-white border-b border-slate-100 h-14 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-[#1a1063] flex items-center justify-center text-white text-xs font-black">I</div>
        <span className="font-black text-[15px] text-slate-900">Intern<span className="text-indigo-600">adda</span></span>
      </div>
      <div className="flex items-center gap-2">
        <ShieldCheck size={12} className="text-emerald-600" />
        <span className="text-[10.5px] font-bold text-emerald-700 uppercase tracking-widest hidden sm:block">Secure Assessment</span>
        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest sm:hidden">Secure</span>
      </div>
    </nav>
  )
}

// ─── Lobby ────────────────────────────────────────────────────────────────────
function Lobby({ test, onStart }: { test: TestRecord; onStart: () => void }) {
  const initial = test.name[0].toUpperCase()
  const rules = [
    '10 MCQ questions — one correct answer each.',
    `Timer is ${test.duration} minutes. It starts when you click Begin.`,
    'Each correct answer = 4 marks. No negative marking.',
    'Navigate freely between questions before submitting.',
    'Your marksheet is available immediately after submission.',
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LockedNav />
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
        >
          {/* Header strip */}
          <div className="bg-[#1a1063] px-6 py-5 text-center relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 opacity-[0.04]">
              <svg width="100%" height="100%"><defs><pattern id="dp" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="white" /></pattern></defs>
                <rect width="100%" height="100%" fill="url(#dp)" /></svg>
            </div>
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-3 shadow-lg"
                style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.2)' }}>
                {initial}
              </div>
              <h2 className="text-white font-extrabold text-[1.15rem] tracking-tight">{test.name}</h2>
              <p className="text-indigo-300 text-[12.5px] font-medium mt-0.5">{test.university}</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Sector badge */}
            <div className="flex justify-center mb-5">
              <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 uppercase tracking-widest">
                {test.sector}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Questions', value: '10' },
                { label: 'Duration',  value: `${test.duration} min` },
                { label: 'Marks',     value: '40' },
              ].map(s => (
                <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                  <p className="text-[1.15rem] font-extrabold text-[#1a1063] font-mono leading-none">{s.value}</p>
                  <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Scoring */}
            <div className="flex gap-2 mb-5">
              <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
                <p className="text-[13px] font-bold text-emerald-700">+4 marks</p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Correct answer</p>
              </div>
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                <p className="text-[13px] font-bold text-slate-600">0 marks</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Wrong / Skipped</p>
              </div>
            </div>

            {/* Rules */}
            <ul className="space-y-2 mb-6">
              {rules.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[12.5px] text-slate-600 font-medium">
                  <ChevronRight size={13} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>

            <button
              onClick={onStart}
              className="w-full h-12 bg-[#1a1063] hover:bg-indigo-900 text-white text-[14px] font-bold rounded-xl shadow-sm shadow-indigo-900/20 transition-all hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Begin Test <ArrowRight size={15} />
            </button>

            <p className="text-center text-[10.5px] text-slate-400 mt-4 font-medium">
              Internadda Secure Assessment · MSME Certified
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Active Test ──────────────────────────────────────────────────────────────
function ActiveTest({
  test, questions, onSubmit,
}: {
  test: TestRecord
  questions: Question[]
  onSubmit: (answers: (number | null)[], timeUsed: number) => void
}) {
  const [answers, setAnswers]   = useState<(number | null)[]>(new Array(10).fill(null))
  const [currentQ, setCurrentQ] = useState(0)
  const [timeLeft, setTimeLeft] = useState(test.duration * 60)
  const [timeUsed, setTimeUsed] = useState(0)
  const [animDir, setAnimDir]   = useState<1 | -1>(1)
  const intervalRef = useRef<NodeJS.Timeout>()

  const submit = useCallback((a: (number | null)[], t: number) => {
    clearInterval(intervalRef.current)
    onSubmit(a, t)
  }, [onSubmit])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setAnswers(curr => { setTimeUsed(tu => { submit(curr, tu + 1); return tu + 1 }); return curr })
          return 0
        }
        return prev - 1
      })
      setTimeUsed(prev => prev + 1)
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [submit])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const isWarning = timeLeft <= 60
  const q = questions[currentQ]

  const select = (i: number) => {
    setAnswers(prev => { const n = [...prev]; n[currentQ] = i; return n })
  }

  const goTo = (i: number, dir: 1 | -1) => { setAnimDir(dir); setCurrentQ(i) }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1a1063] flex items-center justify-center text-white text-xs font-black">I</div>
            <span className="text-[13px] font-black text-slate-700 hidden sm:block">Intern<span className="text-indigo-600">adda</span></span>
          </div>
          <span className="text-[12px] font-semibold text-slate-500 truncate max-w-[140px] hidden sm:block">{test.sector}</span>
          {/* Timer */}
          <div className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 transition-colors ${
            isWarning ? 'bg-rose-500 text-white' : 'bg-slate-900 text-white'
          }`}>
            <Clock size={13} />
            <span className="font-mono font-bold text-[14px] tabular-nums">
              {mins}:{secs.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
        {/* Progress */}
        <div className="h-[3px] bg-slate-100">
          <div className="h-full bg-gradient-to-r from-[#1a1063] to-indigo-500 transition-all duration-500"
            style={{ width: `${((currentQ + 1) / 10) * 100}%` }} />
        </div>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-20">

        {/* Question dots */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > currentQ ? 1 : -1)}
              className={`w-8 h-8 rounded-lg text-[11px] font-bold transition-all ${
                i === currentQ
                  ? 'bg-[#1a1063] text-white ring-2 ring-[#1a1063] ring-offset-2'
                  : answers[i] !== null
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white border border-slate-200 text-slate-400 hover:border-indigo-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Question */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: animDir * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: animDir * -30 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6">
              <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Question {currentQ + 1} of 10
              </p>
              <h2 className="text-[1.05rem] sm:text-[1.1rem] font-bold text-slate-900 leading-[1.5]">{q.q}</h2>
            </div>

            <div className="space-y-2.5 mb-8">
              {q.o.map((opt, i) => {
                const selected = answers[currentQ] === i
                return (
                  <button
                    key={i}
                    onClick={() => select(i)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                      selected
                        ? 'border-indigo-500 bg-indigo-50 shadow-sm shadow-indigo-100'
                        : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-colors ${
                      selected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {['A', 'B', 'C', 'D'][i]}
                    </span>
                    <span className={`text-[13.5px] font-medium leading-snug ${selected ? 'text-indigo-800 font-semibold' : 'text-slate-700'}`}>
                      {opt}
                    </span>
                    {selected && <CheckCircle size={16} className="text-indigo-500 ml-auto flex-shrink-0" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="flex items-center gap-3">
          {currentQ > 0 && (
            <button
              onClick={() => goTo(currentQ - 1, -1)}
              className="flex items-center gap-1.5 text-[13px] font-bold text-slate-600 border border-slate-200 bg-white hover:border-indigo-200 hover:text-indigo-700 px-4 py-2.5 rounded-xl transition-all"
            >
              <ArrowLeft size={14} /> Prev
            </button>
          )}
          {currentQ < 9 ? (
            <button
              onClick={() => goTo(currentQ + 1, 1)}
              className="ml-auto flex items-center gap-1.5 text-[13px] font-bold text-white bg-[#1a1063] hover:bg-indigo-900 px-5 py-2.5 rounded-xl shadow-sm shadow-indigo-900/20 transition-all active:scale-[0.98]"
            >
              Next <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={() => submit(answers, timeUsed)}
              className="ml-auto flex items-center gap-1.5 text-[13px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 rounded-xl shadow-sm shadow-emerald-600/20 transition-all active:scale-[0.98]"
            >
              Submit Test <CheckCircle size={14} />
            </button>
          )}
        </div>

        {/* Unanswered warning on last question */}
        {currentQ === 9 && answers.filter(a => a === null).length > 0 && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-4 text-[12px] text-amber-600 font-semibold flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"
          >
            <AlertCircle size={13} />
            {answers.filter(a => a === null).length} question{answers.filter(a => a === null).length > 1 ? 's' : ''} unanswered.
            You can still submit or go back to answer them.
          </motion.p>
        )}
      </div>
    </div>
  )
}

// ─── Result / Marksheet ───────────────────────────────────────────────────────
function Result({
  test, questions, answers, timeUsed,
}: {
  test: TestRecord
  questions: Question[]
  answers: (number | null)[]
  timeUsed: number
}) {
  let correct = 0, wrong = 0, skipped = 0
  questions.forEach((q, i) => {
    if (answers[i] === null) skipped++
    else if (answers[i] === q.a) correct++
    else wrong++
  })

  const score  = correct * 4
  const pct    = Math.round((score / 40) * 100)
  const gradeInfo = getGrade(pct)
  const mUsed  = Math.floor(timeUsed / 60)
  const sUsed  = timeUsed % 60

  return (
    <div className="min-h-screen bg-slate-50" id="marksheet">
      <LockedNav />

      <div className="max-w-2xl mx-auto px-4 py-8 pb-16">

        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#1a1063] rounded-2xl p-7 text-center mb-5 relative overflow-hidden"
        >
          <div aria-hidden className="absolute inset-0 opacity-[0.04]">
            <svg width="100%" height="100%"><defs><pattern id="rdp" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill="white" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#rdp)" /></svg>
          </div>
          <div aria-hidden className="absolute inset-y-0 right-0 w-1/2"
            style={{ background: 'linear-gradient(to left, rgba(99,102,241,0.25), transparent)' }} />

          <div className="relative">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: 'rgba(196,181,253,0.85)' }}>
              Skill Assessment Result
            </p>
            <p className="text-white/60 text-[13px] font-semibold mb-1">{test.name} · {test.university}</p>
            <div className="text-white font-black leading-none mb-2" style={{ fontFamily: 'inherit', fontSize: 'clamp(3rem, 12vw, 5rem)' }}>
              {score}<span className="text-white/40" style={{ fontSize: '.4em' }}>/40</span>
            </div>
            <div className="flex justify-center mb-5">
              <span className="text-[13px] font-bold px-4 py-1.5 rounded-full"
                style={{ background: `${gradeInfo.color}30`, color: '#fff', border: `1px solid ${gradeInfo.color}60` }}>
                Grade {gradeInfo.grade} · {gradeInfo.label}
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: `✓ ${correct} Correct`,  bg: 'rgba(5,150,105,0.15)',  border: 'rgba(5,150,105,0.3)',  color: '#6ee7b7' },
                { label: `✗ ${wrong} Wrong`,       bg: 'rgba(225,29,72,0.15)',  border: 'rgba(225,29,72,0.3)',  color: '#fca5a5' },
                { label: `⊘ ${skipped} Skipped`,  bg: 'rgba(217,119,6,0.15)', border: 'rgba(217,119,6,0.3)',  color: '#fcd34d' },
                { label: `⏱ ${mUsed}m ${sUsed}s`, bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' },
              ].map(c => (
                <span key={c.label} className="text-[11px] font-semibold rounded-full px-3 py-1.5"
                  style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color }}>
                  {c.label}
                </span>
              ))}
            </div>

            <p className="text-white/40 text-[10.5px] mt-4 font-medium">{test.sector} · Internadda Assessment Platform</p>
          </div>
        </motion.div>

        {/* Download + CTA */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5 no-print">
          <button
            onClick={() => window.print()}
            className="flex-1 h-11 flex items-center justify-center gap-2 bg-[#1a1063] hover:bg-indigo-900 text-white text-[13px] font-bold rounded-xl shadow-sm shadow-indigo-900/20 transition-all active:scale-[0.98]"
          >
            <Download size={14} /> Download Marksheet PDF
          </button>
          <Link
            href="/internships"
            className="flex-1 h-11 flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 text-[13px] font-bold rounded-xl transition-all"
          >
            Browse Internships <ArrowRight size={14} />
          </Link>
        </div>

        {/* Answer breakdown */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-5">
          <div className="px-5 py-4 border-b border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Answer Breakdown</p>
          </div>
          {questions.map((q, i) => {
            const ua = answers[i]
            const isCorrect = ua === q.a
            const isSkipped = ua === null
            return (
              <div key={i} className="flex items-start gap-3 px-5 py-4 border-b border-slate-100 last:border-0">
                {/* Status icon */}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black flex-shrink-0 ${
                  isSkipped ? 'bg-amber-50 text-amber-500 border border-amber-200'
                  : isCorrect ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  : 'bg-rose-50 text-rose-500 border border-rose-200'
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-slate-800 leading-snug mb-1.5">{q.q}</p>
                  {isSkipped ? (
                    <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-2 py-0.5">
                      <SkipForward size={10} /> Skipped
                    </span>
                  ) : isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-2 py-0.5">
                      <CheckCircle size={10} /> {q.o[q.a]}
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-md px-2 py-0.5">
                        <XCircle size={10} /> {q.o[ua!]}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-2 py-0.5">
                        <CheckCircle size={10} /> {q.o[q.a]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Internadda CTA */}
        <div className="bg-[#1a1063] rounded-2xl p-6 text-center relative overflow-hidden no-print">
          <div aria-hidden className="absolute inset-0 opacity-[0.04]">
            <svg width="100%" height="100%"><defs><pattern id="cdp" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="white" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#cdp)" /></svg>
          </div>
          <div className="relative">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: 'rgba(196,181,253,0.85)' }}>
              You're ready for the real thing
            </p>
            <h3 className="text-[1.2rem] font-extrabold text-white tracking-tight mb-2">
              Apply to verified internships now.
            </h3>
            <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'rgba(199,210,254,0.7)' }}>
              200+ verified companies · 48h avg. offer time · 100% free
            </p>
            <Link
              href="/internships"
              className="inline-flex items-center gap-2 bg-white text-[#1a1063] hover:bg-slate-50 font-bold text-[13px] px-6 py-2.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Browse Internships <ArrowRight size={13} />
            </Link>
          </div>
        </div>

      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          nav { display: none !important; }
        }
      `}</style>
    </div>
  )
}

// ─── 404 ─────────────────────────────────────────────────────────────────────
function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LockedNav />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-5">
          <AlertCircle size={24} className="text-slate-400" />
        </div>
        <h2 className="text-[1.3rem] font-extrabold text-slate-900 mb-2">Test not found</h2>
        <p className="text-slate-500 text-[13.5px] mb-6 max-w-sm">This test code is invalid or has been deleted by the admin. Please check your link.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-[#1a1063] text-white font-bold text-[13px] px-5 py-2.5 rounded-xl">
          Go Home <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TestPage() {
  const { code } = useParams<{ code: string }>()
  const [phase, setPhase]         = useState<Phase>('loading')
  const [test, setTest]           = useState<TestRecord | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [finalAnswers, setFinalAnswers] = useState<(number | null)[]>([])
  const [finalTimeUsed, setFinalTimeUsed] = useState(0)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const tests: TestRecord[] = raw ? JSON.parse(raw) : []
      const found = tests.find(t => t.code === (code as string).toUpperCase())
      if (found) { setTest(found); setPhase('lobby') }
      else setPhase('notfound')
    } catch { setPhase('notfound') }
  }, [code])

  const handleStart = () => {
    if (!test) return
    setQuestions(getQuestions(test.sector))
    setPhase('active')
  }

  const handleSubmit = (answers: (number | null)[], timeUsed: number) => {
    setFinalAnswers(answers)
    setFinalTimeUsed(timeUsed)
    setPhase('result')
  }

  if (phase === 'loading') return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-3 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  )

  if (phase === 'notfound') return <NotFound />
  if (phase === 'lobby'  && test) return <Lobby test={test} onStart={handleStart} />
  if (phase === 'active' && test) return <ActiveTest test={test} questions={questions} onSubmit={handleSubmit} />
  if (phase === 'result' && test) return <Result test={test} questions={questions} answers={finalAnswers} timeUsed={finalTimeUsed} />

  return null
}

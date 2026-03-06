'use client'

import Image from 'next/image'
// app/test/[code]/page.tsx — Student Assessment
// NO login required. Fetches test data from Supabase using the code in the URL.

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Clock, CheckCircle, XCircle, AlertCircle,
  ArrowRight, ArrowLeft, ShieldCheck, Download,
  SkipForward, Loader2,
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { getQuestions, getGrade } from '@/lib/test-data'
import type { Question } from '@/lib/test-data'
import { motion, AnimatePresence } from 'framer-motion'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface TestMeta {
  code: string; name: string; university: string; sector: string; duration: number
}

type Phase = 'loading' | 'notfound' | 'lobby' | 'active' | 'result'

// ─── Shared Nav ───────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="bg-white border-b border-slate-100 h-14 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="relative w-7 h-7 rounded-lg overflow-hidden flex-shrink-0"><Image src="/logo.jpg" alt="Internadda" fill className="object-cover" /></div>
        <span className="font-black text-[15px] text-slate-900">Intern<span className="text-indigo-600">adda</span></span>
      </div>
      <div className="flex items-center gap-1.5">
        <ShieldCheck size={11} className="text-emerald-600" />
        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Secure Test</span>
      </div>
    </nav>
  )
}

// ─── Lobby ────────────────────────────────────────────────────────────────────
function Lobby({ meta, onStart }: { meta: TestMeta; onStart: () => void }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Dark header */}
          <div className="bg-[#1a1063] rounded-t-2xl px-6 py-7 text-center relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 opacity-[0.04]">
              <svg width="100%" height="100%"><defs>
                <pattern id="dp" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.8" fill="white" />
                </pattern></defs>
                <rect width="100%" height="100%" fill="url(#dp)" />
              </svg>
            </div>
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-white font-black text-2xl"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                {meta.name[0]?.toUpperCase() ?? 'S'}
              </div>
              <h2 className="text-white font-extrabold text-[1.15rem] tracking-tight">{meta.name}</h2>
              {meta.university !== 'Not specified' && (
                <p className="text-indigo-300 text-[12px] mt-0.5 font-medium">{meta.university}</p>
              )}
            </div>
          </div>

          {/* White body */}
          <div className="bg-white border border-slate-200 border-t-0 rounded-b-2xl p-6">
            {/* Sector pill */}
            <div className="flex justify-center mb-5">
              <span className="text-[10.5px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 uppercase tracking-widest">
                {meta.sector}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2.5 mb-4">
              {[['10', 'Questions'], [`${meta.duration}m`, 'Duration'], ['40', 'Max Marks']].map(([v, l]) => (
                <div key={l} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                  <p className="text-[1.1rem] font-extrabold text-[#1a1063] leading-none">{v}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-1">{l}</p>
                </div>
              ))}
            </div>

            {/* Marking */}
            <div className="flex gap-2 mb-5">
              <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
                <p className="text-[12.5px] font-bold text-emerald-700">+4 per correct</p>
              </div>
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                <p className="text-[12.5px] font-bold text-slate-500">No negative marks</p>
              </div>
            </div>

            {/* Rules */}
            <ul className="space-y-1.5 mb-6">
              {[
                'One correct answer per question.',
                `Timer starts on Begin — ${meta.duration} minutes total.`,
                'Jump between questions using the number dots.',
                'Marksheet available right after you submit.',
              ].map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-[12.5px] text-slate-600 font-medium">
                  <span className="text-indigo-400 flex-shrink-0 mt-0.5">›</span>{r}
                </li>
              ))}
            </ul>

            <button onClick={onStart}
              className="w-full h-12 bg-[#1a1063] hover:bg-indigo-900 text-white text-[14px] font-bold rounded-xl shadow-sm shadow-indigo-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              Begin Test <ArrowRight size={15} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Active Test ──────────────────────────────────────────────────────────────
function ActiveTest({ meta, questions, onSubmit }: {
  meta: TestMeta
  questions: Question[]
  onSubmit: (answers: (number | null)[], timeUsed: number) => void
}) {
  const [answers, setAnswers]   = useState<(number | null)[]>(new Array(10).fill(null))
  const [currentQ, setCurrentQ] = useState(0)
  const [timeLeft, setTimeLeft] = useState(meta.duration * 60)
  const [dir, setDir]           = useState<1 | -1>(1)
  const answersRef              = useRef(answers)
  const timeUsedRef             = useRef(0)
  const intervalRef             = useRef<NodeJS.Timeout>()

  answersRef.current = answers

  const submit = useCallback(() => {
    clearInterval(intervalRef.current)
    onSubmit(answersRef.current, timeUsedRef.current)
  }, [onSubmit])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      timeUsedRef.current += 1
      setTimeLeft(p => {
        if (p <= 1) { clearInterval(intervalRef.current); submit(); return 0 }
        return p - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [submit])

  const m    = Math.floor(timeLeft / 60)
  const s    = timeLeft % 60
  const warn = timeLeft <= 60
  const q    = questions[currentQ]

  const select = (i: number) =>
    setAnswers(prev => { const n = [...prev]; n[currentQ] = i; return n })

  const goTo = (i: number, d: 1 | -1) => { setDir(d); setCurrentQ(i) }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Topbar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative w-6 h-6 rounded-md overflow-hidden flex-shrink-0"><Image src="/logo.jpg" alt="Internadda" fill className="object-cover" /></div>
            <span className="text-[12px] text-slate-500 font-semibold truncate">{meta.sector}</span>
          </div>
          <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white flex-shrink-0 transition-colors ${warn ? 'bg-rose-500' : 'bg-slate-900'}`}>
            <Clock size={12} />
            <span className="font-mono font-bold text-[13px] tabular-nums">{m}:{s.toString().padStart(2, '0')}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-[2px] bg-slate-100">
          <div className="h-full bg-gradient-to-r from-[#1a1063] to-indigo-500 transition-all duration-500"
            style={{ width: `${((currentQ + 1) / 10) * 100}%` }} />
        </div>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-16">
        {/* Question dots */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {questions.map((_, i) => (
            <button key={i} onClick={() => goTo(i, i > currentQ ? 1 : -1)}
              className={`w-8 h-8 rounded-lg text-[11px] font-bold transition-all ${
                i === currentQ
                  ? 'bg-[#1a1063] text-white ring-2 ring-[#1a1063] ring-offset-1'
                  : answers[i] !== null
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white border border-slate-200 text-slate-400 hover:border-indigo-200'
              }`}>{i + 1}
            </button>
          ))}
        </div>

        {/* Question */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={currentQ}
            initial={{ opacity: 0, x: dir * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -24 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Question {currentQ + 1} of 10
            </p>
            <h2 className="text-[1.05rem] font-bold text-slate-900 leading-[1.55] mb-5">{q.q}</h2>

            <div className="space-y-2.5 mb-8">
              {q.o.map((opt, i) => {
                const sel = answers[currentQ] === i
                return (
                  <button key={i} onClick={() => select(i)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                      sel
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50'
                    }`}>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black flex-shrink-0 ${
                      sel ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {['A', 'B', 'C', 'D'][i]}
                    </span>
                    <span className={`text-[13.5px] font-medium leading-snug flex-1 ${
                      sel ? 'text-indigo-800 font-semibold' : 'text-slate-700'
                    }`}>{opt}</span>
                    {sel && <CheckCircle size={15} className="text-indigo-500 flex-shrink-0" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center gap-2.5">
          {currentQ > 0 && (
            <button onClick={() => goTo(currentQ - 1, -1)}
              className="flex items-center gap-1.5 text-[13px] font-bold text-slate-600 border border-slate-200 bg-white hover:border-indigo-200 hover:text-indigo-700 px-4 py-2.5 rounded-xl transition-all">
              <ArrowLeft size={13} /> Prev
            </button>
          )}
          {currentQ < 9 ? (
            <button onClick={() => goTo(currentQ + 1, 1)}
              className="ml-auto flex items-center gap-1.5 text-[13px] font-bold text-white bg-[#1a1063] hover:bg-indigo-900 px-5 py-2.5 rounded-xl transition-all active:scale-[0.98]">
              Next <ArrowRight size={13} />
            </button>
          ) : (
            <button onClick={submit}
              className="ml-auto flex items-center gap-1.5 text-[13px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 rounded-xl transition-all active:scale-[0.98]">
              Submit <CheckCircle size={13} />
            </button>
          )}
        </div>

        {/* Unanswered warning */}
        {currentQ === 9 && answers.some(a => a === null) && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-3 text-[12px] text-amber-600 font-semibold flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            <AlertCircle size={12} />
            {answers.filter(a => a === null).length} unanswered — you can still submit.
          </motion.p>
        )}
      </div>
    </div>
  )
}

// ─── Result / Marksheet ───────────────────────────────────────────────────────
function Result({ meta, questions, answers, timeUsed }: {
  meta: TestMeta; questions: Question[]
  answers: (number | null)[]; timeUsed: number
}) {
  let correct = 0, wrong = 0, skipped = 0
  questions.forEach((q, i) => {
    if (answers[i] === null) skipped++
    else if (answers[i] === q.a) correct++
    else wrong++
  })
  const score = correct * 4
  const pct   = Math.round((score / 40) * 100)
  const gi    = getGrade(pct)
  const mU    = Math.floor(timeUsed / 60)
  const sU    = timeUsed % 60

  return (
    <div className="min-h-screen bg-slate-50">
      <Nav />
      <div className="max-w-2xl mx-auto px-4 py-8 pb-16">

        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#1a1063] rounded-2xl p-7 text-center mb-4 relative overflow-hidden"
        >
          <div aria-hidden className="absolute inset-0 opacity-[0.04]">
            <svg width="100%" height="100%"><defs>
              <pattern id="rp" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="white" />
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#rp)" />
            </svg>
          </div>
          <div aria-hidden className="absolute inset-y-0 right-0 w-2/5"
            style={{ background: 'linear-gradient(to left,rgba(99,102,241,0.2),transparent)' }} />

          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-1" style={{ color: 'rgba(196,181,253,0.75)' }}>
              {meta.sector} · Skill Assessment
            </p>
            <p className="text-[12.5px] font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {meta.name}{meta.university !== 'Not specified' ? ` · ${meta.university}` : ''}
            </p>

            <div className="font-black leading-none mb-3 text-white" style={{ fontSize: 'clamp(3rem,12vw,5rem)' }}>
              {score}<span className="text-white/30" style={{ fontSize: '.38em' }}>/40</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
              style={{ background: `${gi.color}25`, border: `1px solid ${gi.color}50` }}>
              <span className="text-white font-bold text-[13px]">Grade {gi.grade}</span>
              <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{gi.label}</span>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {[
                { l: `✓ ${correct} Correct`,  c: 'rgba(5,150,105,0.2)',   b: 'rgba(5,150,105,0.3)',   t: '#6ee7b7' },
                { l: `✗ ${wrong} Wrong`,       c: 'rgba(225,29,72,0.18)',  b: 'rgba(225,29,72,0.3)',   t: '#fca5a5' },
                { l: `⊘ ${skipped} Skipped`,  c: 'rgba(217,119,6,0.18)', b: 'rgba(217,119,6,0.3)',   t: '#fcd34d' },
                { l: `⏱ ${mU}m ${sU}s`,        c: 'rgba(255,255,255,0.06)',b: 'rgba(255,255,255,0.12)',t: 'rgba(255,255,255,0.6)' },
              ].map(c => (
                <span key={c.l} className="text-[11px] font-semibold rounded-full px-3 py-1"
                  style={{ background: c.c, border: `1px solid ${c.b}`, color: c.t }}>
                  {c.l}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex gap-2.5 mb-4 no-print">
          <button onClick={() => window.print()}
            className="flex-1 h-11 flex items-center justify-center gap-2 text-[13px] font-bold text-white bg-[#1a1063] hover:bg-indigo-900 rounded-xl shadow-sm transition-all active:scale-[0.98]">
            <Download size={13} /> Download Marksheet
          </button>
          <Link href="/internships"
            className="flex-1 h-11 flex items-center justify-center gap-2 text-[13px] font-bold text-slate-700 bg-white border border-slate-200 hover:border-indigo-200 hover:text-indigo-700 rounded-xl transition-all">
            Apply Now <ArrowRight size={13} />
          </Link>
        </div>

        {/* Answer breakdown */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-4">
          <div className="px-5 py-3.5 border-b border-slate-100">
            <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-widest">Answer Breakdown</p>
          </div>
          {questions.map((q, i) => {
            const ua = answers[i]
            const isC = ua === q.a
            const isS = ua === null
            return (
              <div key={i} className="flex items-start gap-3 px-5 py-4 border-b border-slate-100 last:border-0">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10.5px] font-black flex-shrink-0 ${
                  isS ? 'bg-amber-50 text-amber-500 border border-amber-200'
                  : isC ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  : 'bg-rose-50 text-rose-500 border border-rose-200'
                }`}>{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] font-semibold text-slate-800 leading-snug mb-1.5">{q.q}</p>
                  {isS ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded px-2 py-0.5">
                      <SkipForward size={9} /> Skipped
                    </span>
                  ) : isC ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5">
                      <CheckCircle size={9} /> {q.o[q.a]}
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded px-2 py-0.5">
                        <XCircle size={9} /> Your: {q.o[ua!]}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5">
                        <CheckCircle size={9} /> Correct: {q.o[q.a]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Internship CTA — clean */}
        <div className="bg-[#1a1063] rounded-2xl px-6 py-7 text-center relative overflow-hidden no-print">
          <div aria-hidden className="absolute inset-0 opacity-[0.04]">
            <svg width="100%" height="100%"><defs>
              <pattern id="cp" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="white" />
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#cp)" />
            </svg>
          </div>
          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(196,181,253,0.7)' }}>Next Step</p>
            <h3 className="text-white font-extrabold text-[1.15rem] tracking-tight mb-1.5">
              Browse open internships on Internadda.
            </h3>
            <p className="text-[13px] mb-5" style={{ color: 'rgba(199,210,254,0.6)' }}>
              500+ verified companies · apply in minutes
            </p>
            <Link href="/internships"
              className="inline-flex items-center gap-2 bg-white text-[#1a1063] hover:bg-slate-50 font-bold text-[13px] px-5 py-2.5 rounded-xl shadow transition-all hover:scale-[1.02] active:scale-[0.98]">
              Browse Internships <ArrowRight size={13} />
            </Link>
          </div>
        </div>

      </div>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          nav { display: none !important; }
          body { background: #fff !important; }
        }
      `}</style>
    </div>
  )
}

// ─── Not Found ────────────────────────────────────────────────────────────────
function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <AlertCircle size={22} className="text-slate-400" />
        </div>
        <h2 className="text-[1.2rem] font-extrabold text-slate-900 mb-2">Test not found</h2>
        <p className="text-slate-500 text-[13px] max-w-xs mb-6">
          This code doesn't exist or was deleted. Ask your admin to generate a new link from{' '}
          <span className="font-semibold text-indigo-600">internadda.com/test</span>.
        </p>
        <Link href="/"
          className="inline-flex items-center gap-2 bg-[#1a1063] text-white font-bold text-[13px] px-5 py-2.5 rounded-xl">
          Go Home <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TestPage() {
  const params = useParams<{ code: string }>()
  const [phase, setPhase]       = useState<Phase>('loading')
  const [meta, setMeta]         = useState<TestMeta | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [finalAns, setFinalAns] = useState<(number | null)[]>([])
  const [finalTime, setFinalTime] = useState(0)

  useEffect(() => {
    const code = (Array.isArray(params?.code) ? params.code[0] : params?.code)?.toUpperCase()
    if (!code) { setPhase('notfound'); return }

    // Fetch from Supabase — works on any device, any browser, no login
    supabase
      .from('ia_tests')
      .select('*')
      .eq('code', code)
      .single()
      .then(({ data, error }) => {
        if (error || !data) { setPhase('notfound'); return }
        setMeta(data as TestMeta)
        setPhase('lobby')
      })
  }, [params])

  const handleStart = () => {
    if (!meta) return
    setQuestions(getQuestions(meta.sector as any))
    setPhase('active')
  }

  const handleSubmit = (answers: (number | null)[], t: number) => {
    setFinalAns(answers); setFinalTime(t); setPhase('result')
  }

  if (phase === 'loading') return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={22} className="animate-spin text-indigo-600" />
        <p className="text-[12.5px] text-slate-500 font-medium">Loading your test…</p>
      </div>
    </div>
  )

  if (phase === 'notfound')       return <NotFound />
  if (phase === 'lobby'  && meta) return <Lobby meta={meta} onStart={handleStart} />
  if (phase === 'active' && meta) return <ActiveTest meta={meta} questions={questions} onSubmit={handleSubmit} />
  if (phase === 'result' && meta) return <Result meta={meta} questions={questions} answers={finalAns} timeUsed={finalTime} />

  return null
}

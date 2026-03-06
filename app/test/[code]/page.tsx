'use client'
// app/test/[code]/page.tsx — Student Assessment (Enhanced UI)
// NO login required. Publicly accessible via Test Code.

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Clock, CheckCircle, XCircle, AlertCircle,
  ArrowRight, ArrowLeft, ShieldCheck, Download,
  SkipForward, Loader2, Award, Star
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
    <nav className="bg-white border-b border-slate-100 h-16 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-3">
        <Image src="/logo.jpg" alt="InternAdda" width={32} height={32} className="rounded-lg object-cover shadow-sm" />
        <span className="font-black text-[18px] text-slate-900 tracking-tight">Intern<span className="text-indigo-600">adda</span></span>
      </div>
      <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
        <ShieldCheck size={14} className="text-emerald-600" />
        <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Secure Assessment</span>
      </div>
    </nav>
  )
}

// ─── Lobby ────────────────────────────────────────────────────────────────────
function Lobby({ meta, onStart }: { meta: TestMeta; onStart: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Nav />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl shadow-indigo-100/50 overflow-hidden border border-slate-100"
        >
          <div className="bg-[#1a1063] px-8 py-10 text-center relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#grid)" /><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs></svg>
            </div>
            <motion.div 
                initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                className="relative z-10"
            >
              <div className="w-20 h-20 bg-white rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl p-2">
                <Image src="/logo.jpg" alt="Logo" width={64} height={64} className="rounded-2xl" />
              </div>
              <h2 className="text-white font-black text-2xl tracking-tight mb-1">{meta.name}</h2>
              <p className="text-indigo-200 text-sm font-medium">{meta.university !== 'Not specified' ? meta.university : 'Official Skill Verification'}</p>
            </motion.div>
          </div>

          <div className="p-8">
            <div className="flex justify-center mb-8">
              <div className="px-5 py-2 bg-indigo-50 border border-indigo-100 rounded-2xl">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">{meta.sector} Specialist</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { v: '10', l: 'Questions', i: <Award size={14}/> },
                { v: `${meta.duration}m`, l: 'Time', i: <Clock size={14}/> },
                { v: '40', l: 'Marks', i: <Star size={14}/> }
              ].map((item) => (
                <div key={item.l} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center group hover:border-indigo-200 transition-colors">
                  <div className="text-indigo-400 mb-1 flex justify-center">{item.i}</div>
                  <p className="text-xl font-black text-[#1a1063]">{item.v}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.l}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-8">
              {['Professional Marksheet upon completion', 'Trusted by 500+ Verified Companies', 'Direct Shortlisting for Internships'].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                  <CheckCircle size={16} className="text-indigo-500" /> {text}
                </div>
              ))}
            </div>

            <button onClick={onStart}
              className="w-full h-14 bg-[#1a1063] hover:bg-indigo-800 text-white text-base font-bold rounded-2xl shadow-lg shadow-indigo-900/20 transition-all hover:translate-y-[-2px] active:scale-[0.98] flex items-center justify-center gap-3">
              Start Assessment <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Active Test ──────────────────────────────────────────────────────────────
function ActiveTest({ meta, questions, onSubmit }: {
  meta: TestMeta; questions: Question[]; onSubmit: (answers: (number | null)[], timeUsed: number) => void
}) {
  const [answers, setAnswers]   = useState<(number | null)[]>(new Array(10).fill(null))
  const [currentQ, setCurrentQ] = useState(0)
  const [timeLeft, setTimeLeft] = useState(meta.duration * 60)
  const [dir, setDir]           = useState<1 | -1>(1)
  const answersRef              = useRef(answers)
  const timeUsedRef             = useRef(0)
  const intervalRef             = useRef<NodeJS.Timeout>()

  answersRef.current = answers
  const submit = useCallback(() => { clearInterval(intervalRef.current); onSubmit(answersRef.current, timeUsedRef.current) }, [onSubmit])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      timeUsedRef.current += 1
      setTimeLeft(p => { if (p <= 1) { clearInterval(intervalRef.current); submit(); return 0 }; return p - 1 })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [submit])

  const m = Math.floor(timeLeft / 60), s = timeLeft % 60, warn = timeLeft <= 60, q = questions[currentQ]
  const select = (i: number) => setAnswers(prev => { const n = [...prev]; n[currentQ] = i; return n })
  const goTo = (i: number, d: 1 | -1) => { setDir(d); setCurrentQ(i) }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Logo" width={28} height={28} className="rounded-md" />
            <span className="text-sm font-bold text-slate-800 hidden sm:block">{meta.sector}</span>
          </div>
          <div className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-white font-mono font-bold text-sm transition-all shadow-md ${warn ? 'bg-rose-500 animate-pulse' : 'bg-slate-900'}`}>
            <Clock size={16} /> {m}:{s.toString().padStart(2, '0')}
          </div>
        </div>
        <div className="h-1 bg-slate-100">
          <motion.div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400" animate={{ width: `${((currentQ + 1) / 10) * 100}%` }} />
        </div>
      </header>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 pb-20">
        <div className="flex flex-wrap gap-2 mb-8">
          {questions.map((_, i) => (
            <button key={i} onClick={() => goTo(i, i > currentQ ? 1 : -1)}
              className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                i === currentQ ? 'bg-[#1a1063] text-white shadow-lg shadow-indigo-200' :
                answers[i] !== null ? 'bg-indigo-500 text-white' : 'bg-white border border-slate-200 text-slate-400 hover:border-indigo-300'
              }`}>{i + 1}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={currentQ} initial={{ opacity: 0, x: dir * 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -20 }} transition={{ duration: 0.2 }} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Assessment Question {currentQ + 1} of 10</p>
            <h2 className="text-xl font-bold text-slate-900 leading-relaxed mb-8">{q.q}</h2>

            <div className="grid gap-3">
              {q.o.map((opt, i) => {
                const sel = answers[currentQ] === i
                return (
                  <button key={i} onClick={() => select(i)} className={`group w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${sel ? 'border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-100' : 'border-slate-100 bg-slate-50 hover:border-indigo-200 hover:bg-white'}`}>
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${sel ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 border border-slate-200 group-hover:border-indigo-300'}`}>{['A', 'B', 'C', 'D'][i]}</span>
                    <span className={`text-sm font-semibold flex-1 ${sel ? 'text-indigo-900' : 'text-slate-700'}`}>{opt}</span>
                    {sel && <CheckCircle size={18} className="text-indigo-600" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8">
          <button onClick={() => currentQ > 0 && goTo(currentQ - 1, -1)} disabled={currentQ === 0}
            className={`flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all ${currentQ === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-600 hover:text-indigo-600'}`}>
            <ArrowLeft size={16} /> Previous
          </button>
          {currentQ < 9 ? (
            <button onClick={() => goTo(currentQ + 1, 1)} className="flex items-center gap-2 text-sm font-bold text-white bg-[#1a1063] hover:bg-indigo-800 px-8 py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all hover:translate-x-1">
              Next Question <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={submit} className="flex items-center gap-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-xl shadow-lg shadow-emerald-100 transition-all active:scale-95">
              Submit Test <CheckCircle size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Result / Marksheet ───────────────────────────────────────────────────────
function Result({ meta, questions, answers, timeUsed }: { meta: TestMeta; questions: Question[]; answers: (number | null)[]; timeUsed: number }) {
  let correct = 0, wrong = 0, skipped = 0
  questions.forEach((q, i) => { if (answers[i] === null) skipped++; else if (answers[i] === q.a) correct++; else wrong++ })
  const score = correct * 4, pct = Math.round((score / 40) * 100), gi = getGrade(pct), mU = Math.floor(timeUsed / 60), sU = timeUsed % 60

  return (
    <div className="min-h-screen bg-slate-50">
      <Nav />
      <div className="max-w-3xl mx-auto px-4 py-10 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1a1063] rounded-[2.5rem] p-10 text-center mb-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10"><svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#resPattern)" /><defs><pattern id="resPattern" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white" /></pattern></defs></svg></div>
          
          <div className="relative z-10">
            <div className="inline-block p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 mb-6">
               <Image src="/logo.jpg" alt="Logo" width={48} height={48} className="rounded-xl" />
            </div>
            <h2 className="text-white/60 font-bold text-xs uppercase tracking-widest mb-2">{meta.sector} Skill Report</h2>
            <h3 className="text-white font-black text-2xl mb-6">{meta.name}</h3>

            <div className="flex justify-center items-baseline gap-2 mb-8">
              <span className="text-7xl sm:text-8xl font-black text-white tracking-tighter">{score}</span>
              <span className="text-2xl text-white/30 font-bold">/40</span>
            </div>

            <div className="inline-flex items-center gap-3 rounded-2xl px-6 py-2.5 mb-8" style={{ background: `${gi.color}20`, border: `1px solid ${gi.color}40` }}>
              <span className="text-white font-black text-lg">Grade {gi.grade}</span>
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-white/70 font-semibold">{gi.label}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { l: `${correct} Correct`, c: 'bg-emerald-500/20', t: 'text-emerald-300' },
                { l: `${wrong} Wrong`, c: 'bg-rose-500/20', t: 'text-rose-300' },
                { l: `${skipped} Skipped`, c: 'bg-amber-500/20', t: 'text-amber-300' },
                { l: `${mU}m ${sU}s Used`, c: 'bg-white/10', t: 'text-white/60' }
              ].map(stat => (
                <div key={stat.l} className={`${stat.c} ${stat.t} px-4 py-2 rounded-xl text-[11px] font-bold border border-white/10`}>{stat.l}</div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 no-print">
          <button onClick={() => window.print()} className="h-14 flex items-center justify-center gap-3 text-sm font-bold text-white bg-slate-900 hover:bg-black rounded-2xl shadow-xl transition-all active:scale-95">
            <Download size={18} /> Download Verified Marksheet
          </button>
          <Link href="/internships" className="h-14 flex items-center justify-center gap-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-xl shadow-indigo-100 transition-all hover:translate-y-[-2px]">
            Claim Your Internship <ArrowRight size={18} />
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Question Review</p>
            <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">Final Assessment</span>
          </div>
          {questions.map((q, i) => {
            const ua = answers[i], isC = ua === q.a, isS = ua === null
            return (
              <div key={i} className="flex items-start gap-4 px-8 py-6 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 border-2 ${isS ? 'bg-amber-50 text-amber-500 border-amber-100' : isC ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-500 border-rose-100'}`}>{i + 1}</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 mb-3 leading-relaxed">{q.q}</p>
                  <div className="flex flex-wrap gap-2">
                    {isS ? <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-lg border border-amber-100 flex items-center gap-1.5"><SkipForward size={12}/> Question Skipped</span> : 
                     isC ? <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 flex items-center gap-1.5"><CheckCircle size={12}/> {q.o[q.a]}</span> : 
                     <>
                      <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-lg border border-rose-100 flex items-center gap-1.5"><XCircle size={12}/> Your: {q.o[ua!]}</span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">Correct: {q.o[q.a]}</span>
                     </>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <style>{`@media print {.no-print, nav { display: none !important; } body { background: #fff !important; } .bg-[#1a1063] { background: #1a1063 !important; -webkit-print-color-adjust: exact; }}`}</style>
    </div>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner"><AlertCircle size={40} className="text-slate-300" /></div>
      <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Access Link Expired</h2>
      <p className="text-slate-500 text-sm max-w-xs mb-8 leading-relaxed">The test code you are using is either invalid or has been deactivated by the administrator.</p>
      <Link href="/" className="bg-[#1a1063] text-white font-bold text-sm px-10 py-4 rounded-2xl shadow-xl shadow-indigo-100 hover:scale-105 transition-all">Back to Home</Link>
    </div>
  )
}

export default function TestPage() {
  const params = useParams<{ code: string }>()
  const [phase, setPhase] = useState<Phase>('loading'), [meta, setMeta] = useState<TestMeta | null>(null)
  const [questions, setQuestions] = useState<Question[]>([]), [finalAns, setFinalAns] = useState<(number | null)[]>([]), [finalTime, setFinalTime] = useState(0)

  useEffect(() => {
    const code = (Array.isArray(params?.code) ? params.code[0] : params?.code)?.toUpperCase()
    if (!code) { setPhase('notfound'); return }
    supabase.from('ia_tests').select('*').eq('code', code).single().then(({ data, error }) => {
      if (error || !data) setPhase('notfound'); else { setMeta(data as TestMeta); setPhase('lobby') }
    })
  }, [params])

  const handleStart = () => { if (!meta) return; setQuestions(getQuestions(meta.sector as any)); setPhase('active') }
  const handleSubmit = (answers: (number | null)[], t: number) => { setFinalAns(answers); setFinalTime(t); setPhase('result') }

  if (phase === 'loading') return <div className="min-h-screen flex flex-col items-center justify-center bg-white"><Loader2 size={32} className="animate-spin text-indigo-600 mb-4" /><p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Preparing Assessment...</p></div>
  if (phase === 'notfound') return <NotFound />
  if (phase === 'lobby' && meta) return <Lobby meta={meta} onStart={handleStart} />
  if (phase === 'active' && meta) return <ActiveTest meta={meta} questions={questions} onSubmit={handleSubmit} />
  if (phase === 'result' && meta) return <Result meta={meta} questions={questions} answers={finalAns} timeUsed={finalTime} />
  return null
}

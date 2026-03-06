'use client'

import Image from 'next/image'
// app/test/page.tsx — Admin Panel
// Admin: password only (Intern@2122), no Supabase auth
// Student: opens /test/CODE — no login at all

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Lock, Plus, Copy, Trash2, ExternalLink,
  ShieldCheck, LogOut, CheckCircle, Users, ChevronRight, Loader2,
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { SECTORS } from '@/lib/test-data'
import type { Sector } from '@/lib/test-data'
import { motion, AnimatePresence } from 'framer-motion'

// ── Supabase (anon key — read/write allowed via RLS, no auth)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ADMIN_PASSWORD = 'Intern@2122'

interface TestRecord {
  code: string
  name: string
  university: string
  sector: string
  duration: number
  created_at: string
}

function makeCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const seg   = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `IA-${seg(4)}-${seg(4)}`
}

function testUrl(code: string): string {
  if (typeof window === 'undefined') return ''
  return `${window.location.origin}/test/${code}`
}

// ─── Login ───────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw]     = useState('')
  const [err, setErr]   = useState(false)
  const [busy, setBusy] = useState(false)
  const ref             = useRef<HTMLInputElement>(null)

  useEffect(() => { ref.current?.focus() }, [])

  const attempt = () => {
    if (!pw || busy) return
    setBusy(true)
    setTimeout(() => {
      if (pw === ADMIN_PASSWORD) { onLogin() }
      else { setErr(true); setPw('') }
      setBusy(false)
    }, 340)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Subtle grid bg */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[360px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(79,70,229,0.06) 0%,transparent 70%)' }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.018 }}>
          <defs><pattern id="g" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0L0 0 0 32" fill="none" stroke="#4f46e5" strokeWidth="0.6" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>

      <nav className="border-b border-slate-100 h-14 flex items-center px-6 justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7 rounded-lg overflow-hidden flex-shrink-0"><Image src="/logo.jpg" alt="Internadda" fill className="object-cover" /></div>
          <span className="font-black text-[15px] text-slate-900">Intern<span className="text-indigo-600">adda</span></span>
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin Portal</span>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-8 shadow-sm"
        >
          <div className="w-11 h-11 rounded-xl bg-[#1a1063] flex items-center justify-center mb-5 shadow-md shadow-indigo-900/20">
            <Lock size={18} className="text-white" />
          </div>
          <h1 className="text-[1.25rem] font-extrabold text-slate-900 tracking-tight mb-1">Admin Login</h1>
          <p className="text-[12.5px] text-slate-500 mb-6">Password required · No account needed</p>

          <div className="space-y-3">
            <div>
              <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Password</label>
              <input
                ref={ref} type="password" value={pw}
                onChange={e => { setPw(e.target.value); setErr(false) }}
                onKeyDown={e => e.key === 'Enter' && attempt()}
                placeholder="Enter admin password"
                className={`w-full h-11 px-4 rounded-xl border text-[13.5px] font-semibold text-slate-800 bg-slate-50 placeholder:text-slate-400 outline-none transition-all ${
                  err
                    ? 'border-rose-300 bg-rose-50'
                    : 'border-slate-200 focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100/60'
                }`}
              />
              <AnimatePresence>
                {err && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-rose-500 text-[11px] font-semibold mt-1.5">
                    Wrong password. Try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button onClick={attempt} disabled={busy || !pw}
              className="w-full h-11 bg-[#1a1063] hover:bg-indigo-900 disabled:opacity-50 text-white text-[13px] font-bold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              {busy
                ? <><Loader2 size={14} className="animate-spin" /> Checking…</>
                : <>Access Dashboard <ChevronRight size={14} /></>
              }
            </button>
          </div>

          <p className="text-center text-[10px] text-slate-400 mt-5">Internadda Enterprises · MSME Certified</p>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tests, setTests]       = useState<TestRecord[]>([])
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [name, setName]         = useState('')
  const [uni, setUni]           = useState('')
  const [sector, setSector]     = useState<Sector | ''>('')
  const [duration, setDuration] = useState(10)
  const [formErr, setFormErr]   = useState('')
  const [newCode, setNewCode]   = useState<string | null>(null)
  const [copied, setCopied]     = useState<string | null>(null)

  // Load all tests
  useEffect(() => {
    supabase
      .from('ia_tests')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setTests(data); setLoading(false) })
  }, [])

  const createTest = async () => {
    if (!name.trim() || !sector) { setFormErr('Please fill student name and sector.'); return }
    setFormErr('')
    setSaving(true)

    const code = makeCode()
    const row  = {
      code,
      name: name.trim(),
      university: uni.trim() || 'Not specified',
      sector,
      duration,
    }

    const { error } = await supabase.from('ia_tests').insert(row)

    if (error) {
      setFormErr('Failed to save test. Check Supabase connection.')
      setSaving(false)
      return
    }

    setTests(prev => [{ ...row, created_at: new Date().toISOString() }, ...prev])
    setNewCode(code)
    setName(''); setUni(''); setSector(''); setDuration(10)
    setSaving(false)
  }

  const removeTest = async (code: string) => {
    await supabase.from('ia_tests').delete().eq('code', code)
    setTests(prev => prev.filter(t => t.code !== code))
    if (newCode === code) setNewCode(null)
  }

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 h-14 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7 rounded-lg overflow-hidden flex-shrink-0"><Image src="/logo.jpg" alt="Internadda" fill className="object-cover" /></div>
          <span className="font-black text-[15px] text-slate-900">Intern<span className="text-indigo-600">adda</span></span>
          <span className="hidden sm:inline text-[9px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-2 py-0.5 uppercase tracking-widest ml-1">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
            <ShieldCheck size={9} /> MSME Verified
          </span>
          <button onClick={onLogout}
            className="flex items-center gap-1.5 text-[12px] font-bold text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-all">
            <LogOut size={12} /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-7">
          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Test Management</p>
          <h1 className="text-[1.6rem] font-extrabold text-slate-900 tracking-tight">Create Practice Tests</h1>
          <p className="text-slate-500 text-[13px] mt-1">Generate a link → share with student. Student needs no login.</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 items-start">

          {/* ── Create form ── */}
          <div className="w-full xl:max-w-md flex-shrink-0 space-y-4">

            {/* Student info */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-[#1a1063] text-white text-[8px] font-black flex items-center justify-center">1</span>
                Student Info
              </p>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.07em] mb-1.5">Full Name *</label>
                <input value={name} onChange={e => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[13.5px] font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100/60 transition-all" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.07em] mb-1.5">University / College</label>
                <input value={uni} onChange={e => setUni(e.target.value)}
                  placeholder="e.g. Delhi University"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[13.5px] font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100/60 transition-all" />
              </div>
            </div>

            {/* Test config */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-[#1a1063] text-white text-[8px] font-black flex items-center justify-center">2</span>
                Test Config
              </p>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.07em] mb-1.5">Sector *</label>
                <select value={sector} onChange={e => setSector(e.target.value as Sector)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[13.5px] font-semibold text-slate-700 outline-none focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100/60 transition-all appearance-none">
                  <option value="">— Choose sector —</option>
                  {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.07em] mb-1.5">Duration</label>
                <div className="flex gap-2">
                  {[10, 15, 20].map(d => (
                    <button key={d} onClick={() => setDuration(d)}
                      className={`flex-1 h-11 rounded-xl text-[13px] font-bold border transition-all ${
                        duration === d
                          ? 'bg-[#1a1063] text-white border-[#1a1063]'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-200'
                      }`}>{d} min</button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {formErr && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-rose-500 text-[11.5px] font-semibold px-1">{formErr}</motion.p>
              )}
            </AnimatePresence>

            <button onClick={createTest} disabled={saving}
              className="w-full h-12 bg-[#1a1063] hover:bg-indigo-900 disabled:opacity-60 text-white text-[13.5px] font-bold rounded-xl shadow-sm shadow-indigo-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              {saving
                ? <><Loader2 size={15} className="animate-spin" /> Saving…</>
                : <><Plus size={15} /> Generate Test Link</>
              }
            </button>

            {/* Generated link box */}
            <AnimatePresence>
              {newCode && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle size={13} className="text-emerald-600" />
                    <p className="text-[12px] font-bold text-emerald-700">Link ready · Share with student</p>
                  </div>
                  <div className="flex gap-2">
                    <input readOnly value={testUrl(newCode)} onClick={e => (e.target as HTMLInputElement).select()}
                      className="flex-1 text-[11px] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none truncate min-w-0" />
                    <button onClick={() => copy(testUrl(newCode), newCode)}
                      className="flex-shrink-0 bg-[#1a1063] hover:bg-indigo-900 text-white text-[11.5px] font-bold px-3 py-2 rounded-lg transition-all whitespace-nowrap">
                      {copied === newCode ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Tests list ── */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              All Tests {!loading && `(${tests.length})`}
            </p>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={20} className="animate-spin text-slate-400" />
              </div>
            ) : tests.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center py-16 text-center">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                  <Users size={16} className="text-slate-300" />
                </div>
                <p className="text-[13px] font-bold text-slate-700 mb-1">No tests yet</p>
                <p className="text-[12px] text-slate-400">Create your first test using the form.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                <AnimatePresence initial={false}>
                  {tests.map((t, i) => (
                    <motion.div key={t.code}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22, delay: i * 0.02 }}
                      className="bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-200 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-[14px] flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg,#1a1063,#4f46e5)' }}>
                          {t.name[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 flex-wrap mb-0.5">
                            <div>
                              <p className="text-[13.5px] font-bold text-slate-900">{t.name}</p>
                              <p className="text-[11px] text-slate-400">{t.university}</p>
                            </div>
                            <div className="flex gap-1.5 flex-shrink-0">
                              <span className="text-[9.5px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5">{t.sector}</span>
                              <span className="text-[9.5px] font-bold text-slate-500 bg-slate-100 rounded px-1.5 py-0.5">{t.duration}m</span>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-400 font-mono mb-2.5">
                            {t.code} · {new Date(t.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            <button onClick={() => copy(testUrl(t.code), t.code)}
                              className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg transition-all">
                              <Copy size={10} /> {copied === t.code ? '✓ Copied' : 'Copy Link'}
                            </button>
                            <Link href={testUrl(t.code)} target="_blank"
                              className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:border-indigo-200 hover:text-indigo-600 px-2.5 py-1.5 rounded-lg transition-all">
                              <ExternalLink size={10} /> Preview
                            </Link>
                            <button onClick={() => removeTest(t.code)}
                              className="flex items-center gap-1 text-[11px] font-bold text-rose-500 bg-rose-50 border border-rose-100 hover:bg-rose-100 px-2.5 py-1.5 rounded-lg transition-all ml-auto">
                              <Trash2 size={10} /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TestAdminPage() {
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('ia_admin') === '1') setAuthed(true)
  }, [])

  const login  = () => { sessionStorage.setItem('ia_admin', '1'); setAuthed(true) }
  const logout = () => { sessionStorage.removeItem('ia_admin'); setAuthed(false) }

  return authed ? <Dashboard onLogout={logout} /> : <LoginScreen onLogin={login} />
}

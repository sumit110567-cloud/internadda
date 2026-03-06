"use client"
// app/contact/page.tsx

import React, { useRef, useState, useEffect } from 'react'
import {
  ShieldCheck, CheckCircle2, Loader2, Mail, MapPin,
  ArrowLeft, MessageCircle, Zap, Clock, Lock,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

// ── EmailJS ────────────────────────────────────────────────────────────────────
const EJS_SERVICE  = 'service_usgk4bw'
const EJS_TEMPLATE = 'template_bfh5x2w'
const EJS_KEY      = 'qsf9Wt-yXfBKQ7CD7'

const WHATSAPP_NUM = '919217713161'
const WHATSAPP_MSG = 'Hi%20Internadda%20Support!'

// ── Stagger helper ─────────────────────────────────────────────────────────────
const up = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as any },
})

// ── Contact channels ───────────────────────────────────────────────────────────
const CHANNELS = [
  {
    Icon: Mail,
    label: 'Email Support',
    value: 'support@internadda.com',
    note:  'Reply within 24 hours',
    href:  'mailto:support@internadda.com',
    accent: '#4f46e5',
    light:  '#eef2ff',
  },
  {
    Icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 92177 13161',
    note:  'Mon – Sat · 10 AM – 7 PM IST',
    href:  `https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`,
    accent: '#059669',
    light:  '#ecfdf5',
  },
  {
    Icon: MapPin,
    label: 'Headquarters',
    value: 'New Delhi, India',
    note:  'MSME Registered Entity',
    href:  null,
    accent: '#1a1063',
    light:  '#f0f0ff',
  },
]

export default function ContactPage() {
  const { user }  = useAuth()
  const formRef   = useRef<HTMLFormElement>(null)
  const router    = useRouter()

  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [focused, setFocused] = useState<string | null>(null)
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [title,   setTitle]   = useState('')
  const [message, setMessage] = useState('')

  // Pre-fill from auth if logged in
  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.full_name || user.email?.split('@')[0] || '')
      setEmail(user.email || '')
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')

    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        { name, email, title, message },
        EJS_KEY
      )
      setStatus('success')
      setTimeout(() => router.push('/'), 2600)
    } catch (err) {
      console.error('[EmailJS]', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3500)
    }
  }

  // Input ring style
  const ring = (f: string) =>
    focused === f
      ? '!border-[#1a1063] !ring-2 !ring-[#1a1063]/10 bg-white'
      : 'border-slate-200 hover:border-slate-300'

  const inputCls = (f: string) =>
    `w-full bg-slate-50 border rounded-xl text-[13.5px] font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 px-4 ${ring(f)}`

  return (
    <div
      className="min-h-screen bg-white relative overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >

      {/* ── Background texture ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-60 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(79,70,229,0.055) 0%,transparent 65%)' }} />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(26,16,99,0.04) 0%,transparent 65%)' }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.016 }}>
          <defs>
            <pattern id="g" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M36 0L0 0 0 36" fill="none" stroke="#1a1063" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 h-14 flex items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#1a1063] flex items-center justify-center text-white text-[11px] font-black">
            I
          </div>
          <span className="font-black text-[15px] text-slate-900 hidden sm:block">
            Intern<span className="text-indigo-600">adda</span>
          </span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[12px] font-bold text-slate-500 hover:text-[#1a1063] transition-colors group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </Link>
      </nav>

      {/* ── Page body ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">

        {/* ── Page header — mobile centered, desktop left ── */}
        <motion.div {...up(0)} className="text-center lg:text-left mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-[9.5px] font-bold text-indigo-600 uppercase tracking-widest">
              Secure Helpdesk · MSME Verified
            </span>
          </div>
          <h1 className="text-[2.4rem] sm:text-[3.2rem] lg:text-[4rem] font-extrabold text-slate-900 tracking-tight leading-[0.9] mb-4">
            Get in&nbsp;
            <span style={{ color: '#1a1063' }}>Touch.</span>
          </h1>
          <p className="text-slate-500 text-[14.5px] max-w-md mx-auto lg:mx-0 leading-relaxed">
            Have a question or need support? We read every message and reply within 24 hours.
          </p>
        </motion.div>

        {/* ── Two-col layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 xl:gap-12 items-start">

          {/* ── Left: Channels + trust ── */}
          <div className="space-y-4">

            {/* Logged-in notice */}
            {user && (
              <motion.div {...up(0.08)}
                className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3.5"
              >
                <div className="w-8 h-8 rounded-xl bg-[#1a1063] flex items-center justify-center flex-shrink-0">
                  <Lock size={13} className="text-white" />
                </div>
                <div>
                  <p className="text-[11.5px] font-bold text-[#1a1063]">Signed in as {user.user_metadata?.full_name || user.email}</p>
                  <p className="text-[10.5px] text-indigo-400 font-medium">Your name & email are pre-filled below</p>
                </div>
              </motion.div>
            )}

            {/* Channel cards */}
            {CHANNELS.map((ch, i) => {
              const inner = (
                <motion.div
                  {...up(0.1 + i * 0.07)}
                  key={ch.label}
                  className={`flex items-center gap-4 p-4 rounded-2xl border bg-white transition-all group ${
                    ch.href
                      ? 'border-slate-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/40 cursor-pointer'
                      : 'border-slate-100 cursor-default'
                  }`}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                    style={{ background: ch.light }}
                  >
                    <ch.Icon size={18} style={{ color: ch.accent }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9.5px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{ch.label}</p>
                    <p className="text-[13.5px] font-bold text-slate-900 truncate">{ch.value}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{ch.note}</p>
                  </div>
                  {ch.href && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all">
                      <ArrowLeft size={11} className="rotate-180 text-slate-400 group-hover:text-indigo-600" />
                    </div>
                  )}
                </motion.div>
              )

              return ch.href ? (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <div key={ch.label}>{inner}</div>
              )
            })}

            {/* Trust strip */}
            <motion.div {...up(0.32)}
              className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white"
            >
              <div className="w-11 h-11 rounded-xl bg-[#1a1063] flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-900/20">
                <ShieldCheck size={18} className="text-white" />
              </div>
              <div>
                <p className="text-[9.5px] font-black uppercase tracking-widest text-slate-400">
                  MSME Registered · Govt. of India
                </p>
                <p className="text-[12.5px] font-bold text-[#1a1063]">Internadda Enterprises · New Delhi</p>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div {...up(0.38)} className="grid grid-cols-3 gap-2.5">
              {[
                { v: '< 24h', l: 'Avg. Reply' },
                { v: '500+', l: 'Students Helped' },
                { v: '4.9★', l: 'Support Rating' },
              ].map(s => (
                <div
                  key={s.l}
                  className="bg-white border border-slate-100 rounded-2xl p-3.5 text-center"
                >
                  <p className="text-[1.1rem] font-extrabold text-[#1a1063] leading-none">{s.v}</p>
                  <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400 mt-1">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Form card ── */}
          <motion.div {...up(0.14)}>
            <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden">

              {/* Card top accent */}
              <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg,#1a1063,#4f46e5,#818cf8)' }} />

              <div className="p-6 sm:p-8 lg:p-10">

                <AnimatePresence mode="wait">

                  {/* ── Form ── */}
                  {status !== 'success' && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-7">
                        <h2 className="text-[1.4rem] font-extrabold text-slate-900 tracking-tight mb-1">
                          Send a Message
                        </h2>
                        <p className="text-[12.5px] text-slate-400 font-medium">
                          {user
                            ? 'Your details are pre-filled. Just write your message.'
                            : 'Fill in your details and we\'ll get back to you.'}
                        </p>
                      </div>

                      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">

                        {/* Name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                              Full Name *
                            </label>
                            <div className="relative">
                              <input
                                name="name"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Priya Sharma"
                                onFocus={() => setFocused('name')}
                                onBlur={() => setFocused(null)}
                                readOnly={!!user}
                                className={`${inputCls('name')} h-11 ${user ? 'text-slate-500 cursor-default' : ''}`}
                              />
                              {user && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  <Lock size={11} className="text-slate-300" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                              Email *
                            </label>
                            <div className="relative">
                              <input
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@email.com"
                                onFocus={() => setFocused('email')}
                                onBlur={() => setFocused(null)}
                                readOnly={!!user}
                                className={`${inputCls('email')} h-11 ${user ? 'text-slate-500 cursor-default' : ''}`}
                              />
                              {user && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  <Lock size={11} className="text-slate-300" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Subject */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                            Subject *
                          </label>
                          <input
                            name="title"
                            required
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g. Question about skill assessment"
                            onFocus={() => setFocused('title')}
                            onBlur={() => setFocused(null)}
                            className={`${inputCls('title')} h-11`}
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                            Message *
                          </label>
                          <textarea
                            name="message"
                            required
                            rows={5}
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="How can our team help you today?"
                            onFocus={() => setFocused('message')}
                            onBlur={() => setFocused(null)}
                            className={`${inputCls('message')} py-3 resize-none`}
                          />
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                          {status === 'error' && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="flex items-start gap-2.5 text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                              <p className="text-[12px] font-semibold">
                                Couldn't send. Try WhatsApp or email us directly.
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="w-full h-12 rounded-xl font-bold text-[13.5px] text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 mt-1"
                          style={{
                            background: 'linear-gradient(135deg,#1a1063,#3730a3)',
                            boxShadow: '0 4px 18px rgba(26,16,99,0.25)',
                          }}
                        >
                          {status === 'loading' ? (
                            <><Loader2 size={15} className="animate-spin" /> Sending…</>
                          ) : (
                            <><Zap size={14} className="fill-current" /> Send Message</>
                          )}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-px bg-slate-100" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">or</span>
                          <div className="flex-1 h-px bg-slate-100" />
                        </div>

                        {/* WhatsApp CTA */}
                        <a
                          href={`https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-11 flex items-center justify-center gap-2.5 rounded-xl border-2 border-emerald-200 text-emerald-700 font-bold text-[13px] hover:bg-emerald-50 hover:border-emerald-300 transition-all"
                        >
                          <MessageCircle size={15} />
                          Chat on WhatsApp
                        </a>

                        {/* Reassurance row */}
                        <div className="flex items-center justify-center gap-5 pt-1">
                          <div className="flex items-center gap-1.5">
                            <Clock size={10} className="text-slate-300" />
                            <span className="text-[10.5px] text-slate-400 font-medium">Reply &lt; 24 hrs</span>
                          </div>
                          <div className="w-px h-3 bg-slate-200" />
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck size={10} className="text-slate-300" />
                            <span className="text-[10.5px] text-slate-400 font-medium">Data stays private</span>
                          </div>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* ── Success ── */}
                  {status === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-center text-center py-8"
                    >
                      {/* Check */}
                      <div className="relative mb-7">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
                          className="w-24 h-24 rounded-full flex items-center justify-center"
                          style={{ background: '#ecfdf5', border: '2px solid #a7f3d0' }}
                        >
                          <CheckCircle2 size={48} className="text-emerald-500" />
                        </motion.div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-[-10px] rounded-full border border-dashed border-emerald-200"
                        />
                      </div>

                      <h3 className="text-[1.7rem] font-extrabold text-slate-900 tracking-tight mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-slate-500 text-[13.5px] max-w-xs leading-relaxed mb-7">
                        Thanks{user ? `, ${user.user_metadata?.full_name?.split(' ')[0] || ''}` : ''}! We'll reply to <span className="font-semibold text-slate-700">{email}</span> within 24 hours.
                      </p>

                      <a
                        href={`https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-200 text-[12.5px] font-bold text-emerald-700 hover:bg-emerald-50 transition-all mb-5"
                      >
                        <MessageCircle size={14} />
                        Need faster help? Chat on WhatsApp
                      </a>

                      <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                        <Loader2 size={10} className="animate-spin" />
                        Redirecting you home…
                      </p>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

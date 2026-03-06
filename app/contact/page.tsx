"use client"
// app/contact/page.tsx

import React, { useRef, useState } from 'react'
import {
  ShieldCheck, CheckCircle2, Loader2,
  Mail, MapPin, ArrowLeft, MessageCircle, Send, Zap,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// ── EmailJS credentials ───────────────────────────────────────────────────────
const EJS_SERVICE  = 'service_usgk4bw'
const EJS_TEMPLATE = 'template_bfh5x2w'
const EJS_KEY      = 'e4W6YbfZEx81sqmN5'

// ── Contact info ──────────────────────────────────────────────────────────────
const WHATSAPP_NUM  = '919217713161'
const WHATSAPP_MSG  = 'Hi%20Internadda%20Support%20Team!'
const SUPPORT_EMAIL = 'support@internadda.com'

export default function ContactPage() {
  const formRef  = useRef<HTMLFormElement>(null)
  const router   = useRouter()
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')

    // Read values from the form
    const data     = new FormData(formRef.current!)
    const name     = (data.get('name')    as string) || ''
    const email    = (data.get('email')   as string) || ''
    const title    = (data.get('title')   as string) || ''
    const message  = (data.get('message') as string) || ''

    try {
      // emailjs.send() — matches the template variables exactly
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        { name, email, title, message },
        EJS_KEY
      )
      setStatus('success')
      setTimeout(() => router.push('/'), 2200)
    } catch (err) {
      console.error('[EmailJS Error]', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const inputBase =
    'bg-white border text-[#0A2647] placeholder:text-gray-400 rounded-xl transition-all text-sm shadow-sm outline-none'

  const inputClass = (name: string) =>
    `${inputBase} ${
      focused === name
        ? 'border-[#1a1063] ring-2 ring-[#1a1063]/10'
        : 'border-indigo-100 hover:border-indigo-200 focus:border-[#1a1063] focus:ring-2 focus:ring-[#1a1063]/10'
    }`

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col md:flex-row relative overflow-hidden font-sans">

      {/* Background pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg,#1a1063 0px,#1a1063 1px,transparent 1px,transparent 10px)`,
        }}
      />

      {/* ── Left panel ── */}
      <div className="relative w-full md:w-[38%] p-8 md:p-14 flex flex-col justify-between bg-white border-r border-gray-100 shadow-2xl z-10">
        <div>
          {/* Back */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-gray-400 hover:text-[#1a1063] transition-all mb-12 w-fit"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600">
                Secure Helpdesk
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-black text-[#1a1063] tracking-tighter leading-[0.85] uppercase">
              Get in<br />
              <span className="text-indigo-500">Touch.</span>
            </h1>

            {/* Contact channels */}
            <div className="space-y-4 pt-2">

              {/* Email */}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/40 transition-all group bg-white"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform shadow-sm">
                  <Mail size={17} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Email Support</p>
                  <p className="text-[13px] font-bold text-[#1a1063]">{SUPPORT_EMAIL}</p>
                  <p className="text-[10.5px] text-gray-400 font-medium">Reply within 24 hours</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-100/40 transition-all group bg-white"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform shadow-sm">
                  <MessageCircle size={17} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">WhatsApp</p>
                  <p className="text-[13px] font-bold text-[#1a1063]">+91 92177 13161</p>
                  <p className="text-[10.5px] text-gray-400 font-medium">Mon – Sat, 10 AM – 7 PM IST</p>
                </div>
              </a>

              {/* HQ */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center text-[#1a1063] shadow-sm">
                  <MapPin size={17} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Headquarters</p>
                  <p className="text-[13px] font-bold text-[#1a1063]">New Delhi, India</p>
                  <p className="text-[10.5px] text-gray-400 font-medium">MSME Certified Entity</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust strip */}
        <div className="pt-8 mt-8 border-t border-gray-100 flex items-center gap-3">
          <div className="h-10 w-10 bg-[#1a1063] rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-black">MSME Registered · Govt. of India</p>
            <p className="text-[11px] font-semibold text-[#1a1063]">Internadda Enterprises · New Delhi</p>
          </div>
        </div>
      </div>

      {/* ── Right panel — Form ── */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">

            {/* ── Form view ── */}
            {status !== 'success' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border border-gray-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-100/20"
              >
                <div className="mb-8 space-y-1">
                  <h2 className="text-3xl font-black text-[#1a1063] tracking-tight uppercase leading-none">
                    Inquiry Form
                  </h2>
                  <p className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.2em]">
                    Verified Submission Path
                  </p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        required
                        placeholder="Priya Sharma"
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        className={`h-12 ${inputClass('name')}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        required
                        placeholder="you@email.com"
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        className={`h-12 ${inputClass('email')}`}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                      Subject *
                    </label>
                    <Input
                      name="title"
                      required
                      placeholder="e.g. Internship application query"
                      onFocus={() => setFocused('title')}
                      onBlur={() => setFocused(null)}
                      className={`h-12 ${inputClass('title')}`}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      required
                      placeholder="How can our team assist you?"
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className={`min-h-[130px] resize-none p-4 ${inputClass('message')}`}
                    />
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-rose-500 text-[12px] font-semibold bg-rose-50 border border-rose-200 rounded-xl px-4 py-3"
                      >
                        Failed to send. Please WhatsApp us or email directly.
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full h-14 bg-[#1a1063] hover:bg-indigo-900 text-white rounded-2xl uppercase text-[11px] font-black tracking-[0.2em] transition-all shadow-xl shadow-indigo-900/20 mt-2 group"
                  >
                    <span className="flex items-center justify-center gap-3">
                      {status === 'loading' ? (
                        <><Loader2 className="animate-spin h-5 w-5" /> Sending…</>
                      ) : (
                        <>Deliver Message <Zap size={13} className="fill-current group-hover:animate-pulse" /></>
                      )}
                    </span>
                  </Button>

                  {/* WhatsApp shortcut */}
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <div className="h-px flex-1 bg-gray-100" />
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">or</span>
                    <div className="h-px flex-1 bg-gray-100" />
                  </div>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 flex items-center justify-center gap-2.5 rounded-2xl border-2 border-emerald-200 text-emerald-700 font-bold text-[12.5px] hover:bg-emerald-50 hover:border-emerald-300 transition-all"
                  >
                    <MessageCircle size={16} />
                    Chat on WhatsApp
                  </a>

                </form>
              </motion.div>
            )}

            {/* ── Success view ── */}
            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-center space-y-8"
              >
                {/* Animated check */}
                <div className="relative mx-auto h-32 w-32">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                    className="h-full w-full rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center shadow-inner"
                  >
                    <CheckCircle2 className="h-16 w-16 text-emerald-500" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-[-12px] border border-dashed border-emerald-200 rounded-full"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="text-4xl font-black text-[#1a1063] tracking-tighter uppercase leading-none">
                    Delivered!
                  </h3>
                  <p className="text-gray-400 max-w-[280px] mx-auto text-[11px] font-bold uppercase tracking-[0.15em] leading-relaxed">
                    Message received. We'll reply within 24 hours.
                    <br />
                    <span className="text-indigo-500">Redirecting to home…</span>
                  </p>
                </div>

                {/* WhatsApp nudge */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-200 text-[12.5px] font-bold text-emerald-700 hover:bg-emerald-50 transition-all"
                >
                  <MessageCircle size={14} />
                  Need urgent help? Chat on WhatsApp
                </a>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

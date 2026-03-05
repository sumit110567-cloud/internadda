'use client'

import React, { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import { User, Mail, Lock, AlertCircle, ArrowRight, Rocket, CheckCircle2, Briefcase, GraduationCap, Globe, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const benefits = [
  { icon: Briefcase, text: 'Access 200+ verified internships', color: 'text-violet-400' },
  { icon: Rocket, text: 'Get hired in as fast as 48 hours', color: 'text-cyan-400' },
  { icon: GraduationCap, text: 'Skill courses & certificates', color: 'text-emerald-400' },
  { icon: Globe, text: 'Remote & hybrid opportunities', color: 'text-amber-400' },
  { icon: Shield, text: '100% verified, no fake roles', color: 'text-rose-400' },
]

const rotatingWords = ['Future.', 'Career.', 'Internship.', 'Story.']

const studentActivity = [
  { name: 'Rahul M.', action: 'just applied to Python Dev @ Arjuna AI', time: '2m ago' },
  { name: 'Ananya P.', action: 'got offer from Larex Systems', time: '5m ago' },
  { name: 'Vikram S.', action: 'joined Web Dev Intern track', time: '8m ago' },
]

export default function SignUpPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [activityIndex, setActivityIndex] = useState(0)
  const router = useRouter()
  const { signUp } = useAuth()

  useEffect(() => {
    const wi = setInterval(() => setWordIndex(i => (i + 1) % rotatingWords.length), 2000)
    const ai = setInterval(() => setActivityIndex(i => (i + 1) % studentActivity.length), 3500)
    return () => { clearInterval(wi); clearInterval(ai) }
  }, [])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) { setError('Passwords do not match'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await signUp(email, password, fullName)
      router.push('/?signup=success')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-stretch bg-[#f7f8ff]">

        {/* LEFT PANEL — form */}
        <div className="flex-1 flex items-center justify-center px-6 py-10 order-1 lg:order-none">
          <div className="w-full max-w-[440px]">

            {/* Mobile badge */}
            <div className="lg:hidden mb-6 flex flex-wrap gap-2 justify-center">
              <span className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1.5 text-[11px] font-black text-indigo-700 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Join 7,200+ Students
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1.5 text-[11px] font-black text-emerald-700 uppercase tracking-wide">
                <Shield size={11} />
                MSME Verified
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-7">
                <h1 className="text-3xl font-black text-gray-900 mb-1.5 tracking-tight">Create your account</h1>
                <p className="text-gray-500 text-sm">Start applying to verified internships today — it's free.</p>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className="mb-5 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3"
                  >
                    <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={17} />
                    <p className="text-sm text-red-600 font-semibold">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSignUp} className="space-y-4">

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-wider">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="pl-11 h-[50px] border-gray-200 bg-white rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium shadow-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-wider">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                    <Input
                      type="email"
                      placeholder="name@university.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-11 h-[50px] border-gray-200 bg-white rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium shadow-sm transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-gray-700 uppercase tracking-wider">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={15} />
                      <Input
                        type="password"
                        placeholder="Min. 6 chars"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 h-[50px] border-gray-200 bg-white rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-gray-700 uppercase tracking-wider">Confirm</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={15} />
                      <Input
                        type="password"
                        placeholder="Repeat password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pl-10 h-[50px] border-gray-200 bg-white rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-1">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="terms" className="text-xs text-gray-500 leading-snug">
                    I agree to the{' '}
                    <Link href="/terms-of-service" className="text-indigo-600 font-bold hover:underline">Terms</Link>{' '}
                    and{' '}
                    <Link href="/privacy-policy" className="text-indigo-600 font-bold hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                <motion.div whileTap={{ scale: 0.99 }}>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-[52px] bg-[#1a1063] hover:bg-indigo-900 text-white rounded-2xl font-black text-sm tracking-wide shadow-lg shadow-indigo-900/20 transition-all"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Account...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Rocket size={16} />
                        Join InternAdda — It's Free
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-100" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Already a member?</p>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <Link href="/auth/signin">
                <motion.div whileTap={{ scale: 0.99 }}>
                  <Button
                    variant="outline"
                    className="w-full h-[50px] rounded-2xl font-bold border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-indigo-200 flex items-center justify-center gap-2 text-sm transition-all"
                  >
                    Sign In to Account
                    <ArrowRight size={15} />
                  </Button>
                </motion.div>
              </Link>

              <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-7">
                Official MSME Portal • Secure SSL • New Delhi
              </p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT PANEL — animated side */}
        <div className="hidden lg:flex lg:w-[48%] relative overflow-hidden bg-gradient-to-br from-[#1a1063] via-[#1e1480] to-[#0f0a4a] flex-col justify-between p-12">

          {/* Decorative blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-[450px] h-[450px] rounded-full bg-violet-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-indigo-600/20 blur-3xl" />
            <div className="absolute top-1/3 right-1/3 w-[200px] h-[200px] rounded-full bg-cyan-500/10 blur-2xl" />
            {/* Dot grid */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
              <defs>
                <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="white"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          {/* Top section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 mb-10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/80 text-xs font-bold tracking-widest uppercase">India's #1 Internship Hub</span>
            </div>

            <h2 className="text-4xl xl:text-5xl font-black text-white leading-[1.1] mb-5">
              Build Your<br />
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-cyan-300 to-emerald-300"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </h2>

            <p className="text-white/55 text-[15px] leading-relaxed max-w-xs mb-10">
              Join India's most trusted internship ecosystem. Real companies. Real experience. Real career growth.
            </p>

            {/* Benefits list */}
            <div className="space-y-3">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.text}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <b.icon size={15} className={b.color} />
                  </div>
                  <p className="text-white/70 text-sm font-medium">{b.text}</p>
                  <CheckCircle2 size={14} className="text-emerald-400 ml-auto flex-shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Live activity feed */}
          <div className="relative z-10">
            <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-3">🔴 Live Activity</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={activityIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-4 mb-6"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                  {studentActivity[activityIndex].name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-bold">{studentActivity[activityIndex].name}</p>
                  <p className="text-white/50 text-[11px] truncate">{studentActivity[activityIndex].action}</p>
                </div>
                <span className="text-white/30 text-[10px] font-bold flex-shrink-0">{studentActivity[activityIndex].time}</span>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/60 text-xs font-bold">Monthly placement progress</p>
                <p className="text-emerald-400 text-xs font-black">87%</p>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '87%' }}
                  transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-400 to-emerald-400"
                />
              </div>
              <p className="text-white/30 text-[10px] mt-2">632 of 726 slots filled this month</p>
            </div>
          </div>

          {/* Footer note */}
          <div className="relative z-10">
            <p className="text-white/25 text-[10px] font-bold uppercase tracking-widest">
              MSME Registered • Udyam Govt. of India • SSL Secured
            </p>
          </div>
        </div>

      </main>
    </>
  )
}

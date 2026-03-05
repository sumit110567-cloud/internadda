'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import { Mail, Lock, AlertCircle, ArrowRight, Zap, TrendingUp, Users, Award, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  { icon: Users, value: '7,200+', label: 'Students Placed' },
  { icon: TrendingUp, value: '200+', label: 'Verified Companies' },
  { icon: Zap, value: '48h', label: 'Avg. Hiring Time' },
  { icon: Award, value: '2020', label: 'Trusted Since' },
]

const testimonials = [
  { name: 'Priya S.', role: 'Data Science Intern @ Larex', text: 'Got placed in 3 days!', avatar: 'PS' },
  { name: 'Aryan K.', role: 'Web Dev Intern @ Arjuna AI', text: 'Best platform for real internships.', avatar: 'AK' },
  { name: 'Sneha R.', role: 'UI/UX Intern @ Startup', text: 'Verified, fast, and legit!', avatar: 'SR' },
]

const floatingTags = [
  '⚡ 131 students applied today',
  '🔥 New: Python Dev roles live',
  '✅ 100% verified companies',
  '🚀 48h average offer time',
  '🏆 India\'s #1 Internship Hub',
]

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [tagIndex, setTagIndex] = useState(0)

  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn } = useAuth()

  const callbackUrl = searchParams.get('callbackUrl') || '/'

  useEffect(() => {
    const interval = setInterval(() => {
      setTagIndex(i => (i + 1) % floatingTags.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      router.refresh()
      router.replace(callbackUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f7f8ff] flex items-stretch">
        
        {/* LEFT PANEL — desktop only */}
        <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-[#1a1063] flex-col justify-between p-12">
          
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/20 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-2xl" />
            {/* Grid pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Top branding */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/90 text-xs font-bold tracking-widest uppercase">Live Opportunities</span>
            </div>

            <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4">
              Your Dream<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
                Internship
              </span>
              <br />Awaits.
            </h2>
            <p className="text-white/60 text-base leading-relaxed max-w-xs">
              India's largest dedicated internship ecosystem. Verified roles, real companies, fast hiring.
            </p>
          </motion.div>

          {/* Animated ticker */}
          <div className="relative z-10 overflow-hidden">
            <motion.div
              key={tagIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-3 mb-6 inline-block"
            >
              <p className="text-white text-sm font-semibold">{floatingTags[tagIndex]}</p>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl p-4"
                >
                  <stat.icon size={18} className="text-violet-300 mb-2" />
                  <p className="text-white text-xl font-black">{stat.value}</p>
                  <p className="text-white/50 text-xs font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Testimonial cards */}
            <div className="space-y-3">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="flex items-center gap-3 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-xs font-bold">{t.name}</p>
                    <p className="text-white/40 text-[10px] truncate">{t.role}</p>
                  </div>
                  <div className="ml-auto flex-shrink-0">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => <Star key={j} size={9} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-white/50 text-[10px] mt-0.5 text-right">"{t.text}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="relative z-10">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
              MSME Registered • Govt. of India • New Delhi
            </p>
          </div>
        </div>

        {/* RIGHT PANEL — form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-[420px]">
            
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Mobile-only branding hint */}
              <div className="lg:hidden mb-8 text-center">
                <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-indigo-700 text-xs font-bold uppercase tracking-widest">7,200+ Students Placed</span>
                </div>
              </div>

              <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 mb-1.5 tracking-tight">Welcome back 👋</h1>
                <p className="text-gray-500 text-sm">Sign in to access your internship dashboard</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-5 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3"
                >
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={17} />
                  <p className="text-sm text-red-600 font-semibold">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-0.5">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={17} />
                    <Input
                      type="email"
                      placeholder="name@university.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-11 h-13 h-[52px] border-gray-200 bg-white rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium shadow-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-0.5">
                      Password
                    </label>
                    <Link href="/auth/forgot-password" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={17} />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-11 h-[52px] border-gray-200 bg-white rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium shadow-sm transition-all"
                    />
                  </div>
                </div>

                <motion.div whileTap={{ scale: 0.99 }} className="pt-1">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-[52px] bg-[#1a1063] hover:bg-indigo-900 text-white rounded-2xl font-black text-sm tracking-wide shadow-lg shadow-indigo-900/20 transition-all"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Authenticating...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Sign In to Account
                        <ArrowRight size={16} />
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-100" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">New here?</p>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <Link href="/auth/signup">
                <motion.div whileTap={{ scale: 0.99 }}>
                  <Button
                    variant="outline"
                    className="w-full h-[52px] rounded-2xl font-bold border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-indigo-200 flex items-center justify-center gap-2 text-sm transition-all"
                  >
                    Create Your Free Account
                    <ArrowRight size={15} />
                  </Button>
                </motion.div>
              </Link>

              <p className="text-center text-[11px] text-gray-400 mt-7 leading-relaxed">
                By signing in, you agree to our{' '}
                <Link href="/terms" className="text-gray-600 font-bold hover:underline">Terms</Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-gray-600 font-bold hover:underline">Privacy Policy</Link>
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}

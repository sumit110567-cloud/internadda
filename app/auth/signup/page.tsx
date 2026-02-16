'use client'

import React, { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import { User, Mail, Lock, AlertCircle, Zap, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

export default function SignUpPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
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
      <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white flex flex-col items-center justify-center py-16 px-4">
        {/* Trust Badges matching Home style */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-8 flex flex-wrap justify-center gap-3"
        >
          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-indigo-100 flex items-center gap-2">
            <Zap size={14} className="text-amber-500 fill-amber-500" />
            <span className="text-[11px] font-bold text-gray-600 uppercase tracking-tight">Join 7,200+ Students</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-emerald-100 flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span className="text-[11px] font-bold text-gray-600 uppercase tracking-tight">MSME Registered</span>
          </div>
        </motion.div>

        <div className="w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10 shadow-xl shadow-indigo-100/50"
          >
            <div className="mb-10 text-center">
              <Badge className="bg-indigo-100 text-indigo-700 border-none px-4 py-1 rounded-full mb-4 text-xs font-semibold">
                Start Your Journey
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Create Account</h1>
              <p className="text-gray-500">Apply to verified internships today</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <Input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    required 
                    className="pl-12 h-12 rounded-xl border-gray-200 bg-gray-50/30 focus:ring-indigo-500 focus:border-indigo-500 font-medium" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <Input 
                    type="email" 
                    placeholder="name@university.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="pl-12 h-12 rounded-xl border-gray-200 bg-gray-50/30 focus:ring-indigo-500 focus:border-indigo-500 font-medium" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                      className="pl-10 h-12 rounded-xl border-gray-200 bg-gray-50/30" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Confirm</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      required 
                      className="pl-10 h-12 rounded-xl border-gray-200 bg-gray-50/30" 
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required 
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                />
                <label htmlFor="terms" className="text-xs text-gray-500 leading-snug">
                  I agree to the <Link href="/terms-of-service" className="text-indigo-600 font-bold hover:underline">Terms</Link> and <Link href="/privacy-policy" className="text-indigo-600 font-bold hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
              >
                {loading ? "Creating Account..." : <span className="flex items-center gap-2">Join InternAdda Now <CheckCircle size={18} /></span>}
              </Button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-100" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Already a Member?</p>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <Link href="/auth/signin">
              <Button 
                variant="outline" 
                className="w-full h-12 rounded-xl font-bold border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                Sign In to Account
                <ArrowRight size={16} />
              </Button>
            </Link>
          </motion.div>
          
          <p className="text-center mt-8 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            Official MSME Portal • Secure SSL Encryption
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

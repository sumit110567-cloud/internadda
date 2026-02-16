'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn } = useAuth()

  const callbackUrl = searchParams.get('callbackUrl') || '/'

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
      <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-xl shadow-indigo-100/50">
            
            <div className="mb-8 text-center">
              <Badge className="bg-indigo-100 text-indigo-700 border-none px-4 py-1 rounded-full mb-4 text-xs font-semibold">
                Member Access
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-500">
                Sign in to manage your applications
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-5">
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 border-gray-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 h-12 border-gray-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white hover:bg-indigo-700 h-12 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
              >
                {loading ? 'Authenticating...' : 'Sign In to Account'}
              </Button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-100" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                OR
              </p>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <Link href="/auth/signup">
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl font-bold border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                Create New Account
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          {/* Bottom Links */}
          <p className="text-center text-sm text-gray-500 mt-8 leading-relaxed">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-gray-900 font-semibold hover:underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-gray-900 font-semibold hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import { Mail, Lock, AlertCircle } from 'lucide-react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn } = useAuth()

  // 🔥 Get callback URL from middleware
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Sign in user
      await signIn(email, password)

      // 🔥 Important for Supabase SSR sync
      router.refresh()

      // 🔥 Replace instead of push (prevents back-loop)
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
      <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
            
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="text-muted-foreground">
                Sign in to access your internship applications
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-destructive flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-muted-foreground" size={20} />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-muted-foreground" size={20} />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              <div className="text-right">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white hover:bg-primary/90 h-11 font-semibold"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <p className="text-sm text-muted-foreground">
                New to InternAdda?
              </p>
              <div className="flex-1 h-px bg-border" />
            </div>

            <Link href="/auth/signup">
              <Button
                variant="outline"
                className="w-full h-11 font-semibold bg-transparent"
              >
                Create an Account
              </Button>
            </Link>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            By signing in, you agree to our{' '}
            <Link href="#" className="text-primary hover:text-primary/80">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-primary hover:text-primary/80">
              Privacy Policy
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

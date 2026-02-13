'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Lock, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Callback URL nikaalna aur default set karna
  const callbackUrl = searchParams.get('callbackUrl') || '/internships'

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // 1. Supabase Sign In call
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      if (data?.session) {
        // 2. Refresh session taaki middleware ko naya token mile
        router.refresh()
        
        // 3. Redirect to callback URL
        setTimeout(() => {
          router.push(callbackUrl)
        }, 100)
      }
    } catch (err: any) {
      console.error("Login Error:", err)
      setError(err.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A2647]">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to continue to your test</p>
        </div>

        <Card className="p-8 rounded-[2rem] shadow-2xl border-none bg-white">
          <form onSubmit={handleSignIn} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-6 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-6 rounded-xl"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A2647] py-7 rounded-xl text-lg font-bold"
            >
              {loading ? "Verifying..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
             <Link 
              href={`/auth/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`} 
              className="text-sm text-blue-600 hover:underline"
             >
              Don't have an account? Sign up
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

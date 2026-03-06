'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, Lock, ChevronRight, LayoutGrid, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { DOMAIN_TESTS } from '@/lib/test-data'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import LoadingScreen from '@/components/LoadingScreen'
import { cn } from '@/lib/utils'

export default function InternshipAssessment() {
  const params = useParams()
  const id = params?.id as string // Safe access for params
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(1800) 
  const [isFinished, setIsFinished] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  // 1. Safe Test Data Fetching
  const testData = id ? DOMAIN_TESTS[id] : null

  // 2. Access Verification
  useEffect(() => {
    const verifyAccess = async () => {
      if (authLoading) return
      if (!user || !id) { 
        setIsAuthorized(false)
        setVerifying(false)
        return 
      }

      try {
        const { data: orders, error } = await supabase
          .from('orders')
          .select('status')
          .eq('user_id', user.id)
          .eq('test_id', String(id))
          .eq('status', 'PAID')
          .limit(1)

        if (orders && orders.length > 0 && !error) {
          setIsAuthorized(true)
          const savedTime = localStorage.getItem(`test_time_${id}`)
          if (savedTime) setTimeLeft(parseInt(savedTime))
        } else {
          setIsAuthorized(false)
        }
      } catch (e) {
        setIsAuthorized(false)
      } finally {
        setVerifying(false)
      }
    }
    verifyAccess()
  }, [user, id, authLoading])

  // 3. Timer Logic
  useEffect(() => {
    if (!isAuthorized || isFinished || !id) return
    if (timeLeft <= 0) { finishTest(); return }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1
        localStorage.setItem(`test_time_${id}`, next.toString())
        return next
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft, isAuthorized, isFinished, id])

  const finishTest = async (overrideScore?: number) => {
    if (submitting || !testData) return
    setSubmitting(true)
    
    const correctCount = Object.entries(answers).reduce((acc, [idx, ans]) => {
      return ans === testData.questions[parseInt(idx)].correct ? acc + 1 : acc
    }, 0)

    try {
      await fetch('/api/test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          testId: id,
          score: overrideScore ?? correctCount,
          total: testData.questions.length
        })
      })
      localStorage.removeItem(`test_time_${id}`)
    } finally {
      setIsFinished(true)
      setSubmitting(false)
    }
  }

  // Error Handling for Missing Test Data
  if (!testData && !verifying) {
    return <div className="p-10 text-center">Test not found. Please contact support.</div>
  }

  if (verifying || authLoading) return <LoadingScreen />

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0A2647] flex items-center justify-center p-6 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          <Lock size={80} className="mx-auto mb-6 text-yellow-400 p-4 bg-yellow-400/10 rounded-full" />
          <h1 className="text-4xl font-black mb-4 tracking-tighter">Access Denied</h1>
          <p className="opacity-70 mb-8">This assessment is restricted. Please complete your enrollment.</p>
          <Button onClick={() => router.push('/internships')} className="bg-yellow-500 hover:bg-yellow-600 text-[#0A2647] font-bold py-7 px-10 rounded-2xl w-full">
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    )
  }

  // --- UI Logic (Ensure testData exists before accessing questions) ---
  if (isFinished) return <div className="text-center p-20"><h1>Test Finished!</h1><Button onClick={() => router.push('/')}>Home</Button></div>

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <header className="fixed top-0 w-full h-20 bg-white border-b z-40 px-6 flex items-center justify-between">
        <span className="font-black text-[#0A2647]">Time: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
      </header>

      <main className="pt-32 px-4 max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-black mb-8">{testData.questions[currentIdx]?.q}</h2>
          <div className="grid gap-4">
            {testData.questions[currentIdx]?.options.map((opt, i) => (
              <button key={i} onClick={() => setAnswers(prev => ({...prev, [currentIdx]: i}))}
                className={cn("w-full text-left p-6 rounded-2xl border-2", answers[currentIdx] === i ? "border-blue-600 bg-blue-50" : "border-slate-100")}>
                {opt}
              </button>
            ))}
          </div>
          <div className="mt-10 flex justify-between">
            <Button disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => prev - 1)}>Prev</Button>
            {currentIdx === testData.questions.length - 1 
              ? <Button onClick={() => finishTest()} className="bg-emerald-500 text-white">Submit</Button>
              : <Button onClick={() => setCurrentIdx(prev => prev + 1)}>Next</Button>
            }
          </div>
        </div>
      </main>
    </div>
  )
}

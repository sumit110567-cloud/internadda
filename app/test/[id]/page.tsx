'use client'

import { useState, useEffect, useCallback } from 'react'
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
  const id = params?.id as string
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [verifying, setVerifying] = useState(true)

  // FIX: Safe access to test data to prevent client-side crash
  const testData = id ? (DOMAIN_TESTS[id] || DOMAIN_TESTS['1']) : null
  
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(1800) 
  const [isFinished, setIsFinished] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  // --- 1. Gatekeeper Fix (Matching Webhook/Verify Logic) ---
  useEffect(() => {
    const verifyAccess = async () => {
      if (authLoading || !id) return
      if (!user) { setIsAuthorized(false); setVerifying(false); return }

      try {
        // FIX: .limit(1) and String(id) for exact matching
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

  // --- 2. Timer & Persistence ---
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
      return ans === testData.questions[parseInt(idx)]?.correct ? acc + 1 : acc
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

  const handleSelectAnswer = (optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [currentIdx]: optionIdx }))
  }

  // --- 3. Crash Prevention Guards ---
  if (verifying || authLoading || !id) return <LoadingScreen />

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0A2647] flex items-center justify-center p-6 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          <Lock size={80} className="mx-auto mb-6 text-yellow-400 p-4 bg-yellow-400/10 rounded-full" />
          <h1 className="text-4xl font-black mb-4">Access Denied</h1>
          <p className="opacity-70 mb-8">Payment not verified for this test. Please contact support if you already paid.</p>
          <Button onClick={() => router.push('/internships')} className="bg-yellow-500 hover:bg-yellow-600 text-[#0A2647] font-bold py-6 px-10 rounded-2xl w-full">
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    )
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-16 rounded-[4rem] shadow-2xl max-w-lg w-full">
           <h1 className="text-4xl font-black text-[#0A2647] mb-8">Test Submitted</h1>
           <p className="text-slate-500 mb-10">Your performance has been recorded successfully.</p>
           <Button onClick={() => router.push('/')} className="w-full py-8 rounded-[2rem] font-black bg-[#0A2647] text-white">
             Return to Home
           </Button>
        </motion.div>
      </div>
    )
  }

  // Final check to ensure testData exists before rendering UI
  if (!testData) return <div className="p-10 text-center">Loading Assessment Data...</div>

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans">
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b z-40 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Timer size={24} className={timeLeft < 300 ? "text-red-500 animate-pulse" : "text-[#0A2647]"} />
          <span className="text-2xl font-black font-mono">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </span>
        </div>
        <Button onClick={() => setShowSidebar(!showSidebar)} variant="outline" className="lg:hidden"><LayoutGrid /></Button>
      </header>

      <div className="pt-32 pb-20 px-4 md:px-12 max-w-7xl mx-auto grid lg:grid-cols-[1fr_350px] gap-10">
        <main>
          <motion.div key={currentIdx} className="bg-white p-8 md:p-16 rounded-[3.5rem] shadow-sm border border-slate-100">
            <h2 className="text-2xl md:text-3xl font-black text-[#0A2647] mb-12">
              {testData.questions[currentIdx]?.q}
            </h2>
            <div className="grid gap-4">
              {testData.questions[currentIdx]?.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectAnswer(i)}
                  className={cn(
                    "w-full text-left p-6 rounded-3xl border-2 font-bold transition-all",
                    answers[currentIdx] === i ? "border-[#0A2647] bg-blue-50" : "border-slate-100 bg-white"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-16 flex justify-between">
              <Button disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => prev - 1)}>Previous</Button>
              {currentIdx === testData.questions.length - 1 ? (
                <Button onClick={() => finishTest()} className="bg-emerald-500 text-white">Submit Test</Button>
              ) : (
                <Button onClick={() => setCurrentIdx(prev => prev + 1)} className="bg-[#0A2647] text-white">Next Question</Button>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

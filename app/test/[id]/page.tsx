'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Timer, Lock, ChevronRight, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { DOMAIN_TESTS } from '@/lib/test-data'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import LoadingScreen from '@/components/LoadingScreen'
import { cn } from '@/lib/utils'

export default function InternshipAssessment() {
  const params = useParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  
  // 1. Safe ID and Data Fetching
  const id = params?.id as string
  // Fallback to first test if ID is not found in DOMAIN_TESTS to prevent "Test not found"
  const testData = DOMAIN_TESTS[id] || Object.values(DOMAIN_TESTS)[0]

  const [isAuthorized, setIsAuthorized] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(1800) 
  const [isFinished, setIsFinished] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // 2. Access Verification
  useEffect(() => {
    const verifyAccess = async () => {
      if (authLoading || !id) return

      try {
        const { data: orders, error } = await supabase
          .from('orders')
          .select('status')
          .eq('user_id', user?.id)
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
    
    if (user) verifyAccess()
    else if (!authLoading) {
      setVerifying(false)
      setIsAuthorized(false)
    }
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
    if (submitting || !testData || !user) return
    setSubmitting(true)
    
    const correctCount = Object.entries(answers).reduce((acc, [idx, ans]) => {
      return ans === testData.questions[parseInt(idx)]?.correct ? acc + 1 : acc
    }, 0)

    try {
      await fetch('/api/test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
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

  if (authLoading || verifying) return <LoadingScreen />

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0A2647] flex items-center justify-center p-6 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          <Lock size={80} className="mx-auto mb-6 text-yellow-400" />
          <h1 className="text-4xl font-black mb-4">Access Denied</h1>
          <p className="opacity-70 mb-8">Payment verification failed or session expired.</p>
          <Button onClick={() => router.push('/internships')} className="bg-yellow-500 text-[#0A2647] w-full font-bold py-6 rounded-xl">
            Go to Internships
          </Button>
        </motion.div>
      </div>
    )
  }

  if (isFinished) return <div className="min-h-screen flex items-center justify-center font-bold text-2xl">Submission Successful! Redirecting... {setTimeout(() => router.push('/dashboard'), 2000)}</div>

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-20">
      <header className="fixed top-0 w-full h-20 bg-white border-b z-40 px-6 flex items-center justify-between shadow-sm">
        <div className="font-mono font-black text-xl text-[#0A2647]">
          TIME: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </div>
        <div className="text-sm font-bold text-slate-400">Proctored Session</div>
      </header>

      <main className="pt-32 px-4 max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
          <div className="mb-8">
            <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">Question {currentIdx + 1} of {testData.questions.length}</p>
            <Progress value={((currentIdx + 1) / testData.questions.length) * 100} className="h-2" />
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-[#0A2647] mb-10 leading-tight">
            {testData.questions[currentIdx]?.q}
          </h2>

          <div className="grid gap-4">
            {testData.questions[currentIdx]?.options.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => setAnswers(prev => ({...prev, [currentIdx]: i}))}
                className={cn(
                  "w-full text-left p-6 rounded-2xl border-2 transition-all font-bold",
                  answers[currentIdx] === i 
                    ? "border-[#0A2647] bg-blue-50 text-[#0A2647]" 
                    : "border-slate-100 hover:border-slate-200 text-slate-600"
                )}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="mt-12 flex justify-between items-center">
            <Button 
              variant="ghost" 
              disabled={currentIdx === 0} 
              onClick={() => setCurrentIdx(prev => prev - 1)}
              className="font-bold"
            >
              Previous
            </Button>
            
            {currentIdx === testData.questions.length - 1 ? (
              <Button onClick={() => finishTest()} className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 h-14 rounded-xl font-black shadow-lg shadow-emerald-200">
                Submit Test
              </Button>
            ) : (
              <Button onClick={() => setCurrentIdx(prev => prev + 1)} className="bg-[#0A2647] hover:bg-blue-900 text-white px-10 h-14 rounded-xl font-black">
                Next <ChevronRight className="ml-2" size={18} />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

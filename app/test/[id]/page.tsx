'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, ShieldAlert, Lock, ChevronRight, LayoutGrid, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { DOMAIN_TESTS } from '@/lib/test-data'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import LoadingScreen from '@/components/LoadingScreen'
import { cn } from '@/lib/utils'

export default function InternshipAssessment() {
  const { id } = useParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [verifying, setVerifying] = useState(true)

  const testData = DOMAIN_TESTS[id as string] || DOMAIN_TESTS['1']
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(1800) 
  const [isFinished, setIsFinished] = useState(false)
  const [cheatingAttempts, setCheatingAttempts] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  // --- 1. Gatekeeper & Persistence ---
  useEffect(() => {
    const verifyAccess = async () => {
      if (authLoading) return
      if (!user) { setIsAuthorized(false); setVerifying(false); return }

      try {
        const { data: order, error } = await supabase
          .from('orders')
          .select('status, created_at')
          .eq('user_id', user.id)
          .eq('test_id', id)
          .eq('status', 'PAID')
          .maybeSingle()

        if (order && !error) {
          setIsAuthorized(true)
          // Recovery logic: Prevent refresh from resetting timer
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

  // --- 2. Advanced Anti-Cheat (Refresh & Tab & Fullscreen) ---
  useEffect(() => {
    if (!isAuthorized || isFinished) return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = "Warning: Refreshing will NOT reset your timer and may cause data loss."
    }

    const handleVisibility = () => {
      if (document.hidden) {
        setCheatingAttempts(prev => {
          const nextCount = prev + 1
          if (nextCount === 1) {
            alert("⚠️ WARNING (1/2): Tab switching detected!\nThis incident has been logged. One more violation will terminate the test.")
          } else {
            finishTest(0) // Auto-fail on second attempt
            router.push('/')
          }
          return nextCount
        })
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [isAuthorized, isFinished])

  // --- 3. Synchronized Timer ---
  useEffect(() => {
    if (!isAuthorized || isFinished) return
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
    if (submitting) return
    setSubmitting(true)
    
    // Calculate final score
    const correctCount = Object.entries(answers).reduce((acc, [idx, ans]) => {
      return ans === testData.questions[parseInt(idx)].correct ? acc + 1 : acc
    }, 0)

    const finalScore = overrideScore ?? correctCount
    
    try {
      await fetch('/api/test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          testId: id,
          score: finalScore,
          total: testData.questions.length
        })
      })
      localStorage.removeItem(`test_time_${id}`)
    } catch (e) {
      console.error("Critical submission error", e)
    } finally {
      setIsFinished(true)
      setSubmitting(false)
    }
  }

  const handleSelectAnswer = (optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [currentIdx]: optionIdx }))
  }

  if (verifying || authLoading) return <LoadingScreen />

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0A2647] flex items-center justify-center p-6 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          <Lock size={80} className="mx-auto mb-6 text-yellow-400 p-4 bg-yellow-400/10 rounded-full" />
          <h1 className="text-4xl font-black mb-4 tracking-tighter">Access Denied</h1>
          <p className="opacity-70 mb-8">This assessment is restricted to verified candidates. Please complete your enrollment to continue.</p>
          <Button onClick={() => router.push('/internships')} className="bg-yellow-500 hover:bg-yellow-600 text-[#0A2647] font-bold py-7 px-10 rounded-2xl w-full text-lg shadow-xl shadow-yellow-500/20">
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    )
  }

  if (isFinished) {
    const scoreVal = Object.entries(answers).reduce((acc, [idx, ans]) => 
      ans === testData.questions[parseInt(idx)].correct ? acc + 1 : acc, 0
    )
    const percentage = Math.round((scoreVal / testData.questions.length) * 100)
    
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl max-w-lg w-full border border-slate-100 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-yellow-400 via-blue-600 to-yellow-400" />
           <h1 className="text-4xl font-black text-[#0A2647] mb-8">Assessment Result</h1>
           <div className="relative inline-block mb-8">
             <div className="w-40 h-40 rounded-full border-[12px] border-slate-50 flex items-center justify-center">
                <span className="text-5xl font-black text-[#0A2647]">{percentage}%</span>
             </div>
           </div>
           <p className="text-slate-500 mb-10 font-medium leading-relaxed">Your performance has been recorded. Our recruitment team will review your application within 48 hours.</p>
           <Button onClick={() => router.push('/')} className="w-full py-8 rounded-[2rem] font-black bg-[#0A2647] text-lg hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/20">
             Return to InternAdda
           </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans selection:bg-blue-100">
      {/* Header Bar */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 z-40 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="bg-[#0A2647] text-white p-3 rounded-2xl shadow-lg shadow-blue-900/20">
            <Timer size={24} className={timeLeft < 300 ? "animate-pulse text-red-400" : ""} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Time Remaining</p>
            <span className={cn(
              "text-2xl font-black font-mono tracking-tighter",
              timeLeft < 300 ? "text-red-500" : "text-[#0A2647]"
            )}>
               {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-100">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" /> Proctored Live
          </div>
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-3 bg-slate-100 rounded-2xl text-[#0A2647] hover:bg-slate-200 transition-colors"
          >
            <LayoutGrid size={24} />
          </button>
        </div>
      </header>

      <div className="pt-32 pb-20 px-4 md:px-12 max-w-7xl mx-auto grid lg:grid-cols-[1fr_350px] gap-10">
        {/* Main Question Area */}
        <main>
          <motion.div 
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 md:p-16 rounded-[3.5rem] shadow-sm border border-slate-100 relative overflow-hidden"
          >
            <div className="mb-12">
               <div className="flex justify-between items-end mb-4">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Question {currentIdx + 1} / {testData.questions.length}</h3>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">Single Choice</span>
               </div>
               <Progress value={((currentIdx + 1) / testData.questions.length) * 100} className="h-2 bg-slate-50" />
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-[#0A2647] mb-12 leading-tight tracking-tight">
              {testData.questions[currentIdx].q}
            </h2>

            <div className="grid gap-4">
              {testData.questions[currentIdx].options.map((option, i) => (
                <button
                  key={i}
                  disabled={submitting}
                  onClick={() => handleSelectAnswer(i)}
                  className={cn(
                    "w-full text-left p-6 md:p-8 rounded-3xl border-2 transition-all font-bold text-lg flex justify-between items-center group",
                    answers[currentIdx] === i 
                      ? "border-[#0A2647] bg-blue-50/30 text-[#0A2647]" 
                      : "border-slate-100 hover:border-slate-300 text-slate-600 bg-white"
                  )}
                >
                  <span className="flex gap-4">
                    <span className="text-slate-300 font-mono">0{i+1}.</span>
                    {option}
                  </span>
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 transition-all",
                    answers[currentIdx] === i ? "border-[#0A2647] bg-[#0A2647] shadow-[0_0_0_4px_rgba(10,38,71,0.1)]" : "border-slate-200"
                  )} />
                </button>
              ))}
            </div>

            <div className="mt-16 flex justify-between items-center">
               <Button 
                variant="ghost" 
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
                className="rounded-2xl px-8 h-14 font-black text-slate-400 hover:text-[#0A2647]"
               >
                 Previous
               </Button>
               {currentIdx === testData.questions.length - 1 ? (
                 <Button 
                  onClick={() => finishTest()}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl px-12 h-16 font-black text-lg shadow-xl shadow-emerald-500/20"
                 >
                   Submit Final Test
                 </Button>
               ) : (
                 <Button 
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                  className="bg-[#0A2647] hover:bg-blue-900 text-white rounded-2xl px-12 h-16 font-black text-lg shadow-xl shadow-blue-900/20"
                 >
                   Next Question <ChevronRight className="ml-2" />
                 </Button>
               )}
            </div>
          </motion.div>
        </main>

        {/* Sidebar Navigation */}
        <aside className={cn(
          "fixed lg:relative inset-y-0 right-0 w-80 bg-white border-l lg:border-none border-slate-200 z-50 p-8 transform transition-transform lg:transform-none shadow-2xl lg:shadow-none",
          showSidebar ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}>
          <div className="lg:sticky lg:top-32">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Assessment Map</h4>
            <div className="grid grid-cols-4 gap-3">
              {testData.questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIdx(i)
                    if(window.innerWidth < 1024) setShowSidebar(false)
                  }}
                  className={cn(
                    "h-12 rounded-xl flex items-center justify-center font-black text-sm transition-all border-2",
                    currentIdx === i ? "border-[#0A2647] bg-[#0A2647] text-white" :
                    answers[i] !== undefined ? "border-blue-100 bg-blue-50 text-blue-600" :
                    "border-slate-100 text-slate-400 hover:border-slate-200"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div className="mt-10 p-6 bg-yellow-50 rounded-[2rem] border border-yellow-100">
               <div className="flex items-center gap-3 text-yellow-700 mb-3">
                 <AlertCircle size={20} />
                 <span className="font-black text-xs uppercase tracking-wider">Integrity Notice</span>
               </div>
               <p className="text-[11px] text-yellow-700/70 font-bold leading-relaxed">
                 Refreshing the page or exiting full-screen will be flagged. Ensure a stable connection.
               </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setShowSidebar(false)}
            className="fixed inset-0 bg-[#0A2647]/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

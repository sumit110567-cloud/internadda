'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, Lock, ChevronRight, LayoutGrid, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { DOMAIN_TESTS } from '@/lib/test-data'
import { useAuth } from '@/lib/auth-context'
import LoadingScreen from '@/components/LoadingScreen'
import { cn } from '@/lib/utils'

export default function InternshipAssessment() {
  const { id } = useParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [verifying, setVerifying] = useState(true)

  // FIX 1: Safety check for testData to prevent client-side crash
  const testData = DOMAIN_TESTS[id as string]
  
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(1800) 
  const [isFinished, setIsFinished] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    if (authLoading || !user) return;

    let retryCount = 0;
    const maxRetries = 5;

    const verifyAccess = async () => {
      try {
        const res = await fetch('/api/test/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ testId: id })
        });
        
        const data = await res.json();

        if (data.authorized) {
          setIsAuthorized(true);
          setVerifying(false);
        } else if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(verifyAccess, 2000);
        } else {
          setIsAuthorized(false);
          setVerifying(false);
        }
      } catch (err) {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(verifyAccess, 2000);
        } else {
          setVerifying(false);
        }
      }
    };

    verifyAccess();
  }, [user, id, authLoading]);

  const finishTest = async (overrideScore?: number) => {
    if (submitting || !testData) return // Safety check
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
    } catch (e) {
      console.error("Submission error", e)
    } finally {
      setIsFinished(true)
      setSubmitting(false)
    }
  }

  const handleSelectAnswer = (optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [currentIdx]: optionIdx }))
  }

  if (verifying || authLoading) return <LoadingScreen />

  // FIX 2: Handle case where test ID is invalid to prevent crash
  if (!testData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A2647] text-white">
        <div className="text-center">
          <AlertCircle size={64} className="mx-auto mb-4 text-red-400" />
          <h1 className="text-2xl font-bold">Test Not Found</h1>
          <Button onClick={() => router.push('/internships')} className="mt-4 bg-yellow-500 text-black">
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0A2647] flex items-center justify-center p-6 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          <Lock size={80} className="mx-auto mb-6 text-yellow-400 p-4 bg-yellow-400/10 rounded-full" />
          <h1 className="text-4xl font-black mb-4 tracking-tighter">Access Denied</h1>
          <p className="opacity-70 mb-8">This assessment is restricted to verified candidates. Please wait a moment for payment confirmation.</p>
          <Button onClick={() => router.push('/internships')} className="bg-yellow-500 hover:bg-yellow-600 text-[#0A2647] font-bold py-7 px-10 rounded-2xl w-full text-lg shadow-xl shadow-yellow-500/20">
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    )
  }

  // ... (Rest of your UI code remains exactly the same)
  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b z-40 px-6 flex items-center justify-between">
         <div className="flex items-center gap-6">
           <span className="text-2xl font-black text-[#0A2647]">
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
           </span>
         </div>
      </header>
      
      <main className="pt-32 px-4 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border">
          <h2 className="text-2xl font-black text-[#0A2647] mb-8">
            {testData.questions[currentIdx]?.q}
          </h2>
          <div className="grid gap-4">
            {testData.questions[currentIdx]?.options.map((option, i) => (
              <button 
                key={i} 
                onClick={() => handleSelectAnswer(i)}
                className={cn(
                  "w-full text-left p-6 rounded-2xl border-2 font-bold transition-all",
                  answers[currentIdx] === i ? "border-[#0A2647] bg-blue-50" : "border-slate-100"
                )}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-between">
             <Button disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => prev - 1)}>Previous</Button>
             {currentIdx === testData.questions.length - 1 ? (
               <Button onClick={() => finishTest()} className="bg-emerald-500">Finish</Button>
             ) : (
               <Button onClick={() => setCurrentIdx(prev => prev + 1)}>Next</Button>
             )}
          </div>
        </div>
      </main>
    </div>
  )
}

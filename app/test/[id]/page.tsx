'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Timer, Lock, AlertCircle, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { DOMAIN_TESTS, Sector } from '@/lib/test-data' //
import { useAuth } from '@/lib/auth-context' //
import LoadingScreen from '@/components/LoadingScreen' //
import { cn } from '@/lib/utils' //

export default function InternshipAssessment() {
  const { id } = useParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const [testSector, setTestSector] = useState<Sector | null>(null)
  
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(1800) 
  const [isFinished, setIsFinished] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Fetch the authorized sector for this specific order/test ID
  useEffect(() => {
    if (authLoading || !user) return;

    const verifyAccess = async () => {
      try {
        const res = await fetch('/api/test/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ testId: id })
        });
        
        const data = await res.json();

        if (data.authorized && data.sector) {
          // Mapping the database sector to the test data keys
          setTestSector(data.sector as Sector);
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error("Verification failed", err);
        setIsAuthorized(false);
      } finally {
        setVerifying(false);
      }
    };

    verifyAccess();
  }, [user, id, authLoading]);

  // Dynamic data lookup based on the verified sector
  const testData = testSector ? DOMAIN_TESTS[testSector] : null; //

  const finishTest = async (overrideScore?: number) => {
    if (submitting || !testData) return 
    setSubmitting(true)
    
    const correctCount = Object.entries(answers).reduce((acc, [idx, ans]) => {
      return ans === testData[parseInt(idx)].a ? acc + 1 : acc //
    }, 0)

    try {
      await fetch('/api/test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          testId: id,
          score: overrideScore ?? correctCount,
          total: testData.length
        })
      })
      router.push('/dashboard')
    } catch (e) {
      console.error("Submission error", e)
    } finally {
      setIsFinished(true)
      setSubmitting(false)
    }
  }

  if (verifying || authLoading) return <LoadingScreen />

  if (!isAuthorized || !testData) {
    return (
      <div className="min-h-screen bg-[#0A2647] flex items-center justify-center p-6 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          {!isAuthorized ? (
            <>
              <Lock size={80} className="mx-auto mb-6 text-yellow-400 p-4 bg-yellow-400/10 rounded-full" />
              <h1 className="text-4xl font-black mb-4 tracking-tighter">Access Denied</h1>
              <p className="opacity-70 mb-8">This assessment is restricted. Please ensure your payment was successful.</p>
            </>
          ) : (
            <>
              <AlertCircle size={80} className="mx-auto mb-6 text-red-400 p-4 bg-red-400/10 rounded-full" />
              <h1 className="text-4xl font-black mb-4 tracking-tighter">Test Not Found</h1>
              <p className="opacity-70 mb-8">We couldn't load the questions for this sector. Please contact support.</p>
            </>
          )}
          <Button onClick={() => router.push('/internships')} className="bg-yellow-500 hover:bg-yellow-600 text-[#0A2647] font-bold py-7 px-10 rounded-2xl w-full text-lg">
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b z-40 px-6 flex items-center justify-between">
         <div className="flex items-center gap-6">
           <span className="text-2xl font-black text-[#0A2647]">
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
           </span>
         </div>
         <Progress value={(currentIdx / testData.length) * 100} className="w-1/3" />
      </header>
      
      <main className="pt-32 px-4 max-w-4xl mx-auto pb-20">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border">
          <div className="mb-4 text-sm font-bold text-blue-600 uppercase tracking-widest">
            Question {currentIdx + 1} of {testData.length}
          </div>
          <h2 className="text-2xl font-black text-[#0A2647] mb-8">
            {testData[currentIdx]?.q}
          </h2>
          <div className="grid gap-4">
            {testData[currentIdx]?.o.map((option, i) => ( //
              <button 
                key={i} 
                onClick={() => setAnswers(prev => ({ ...prev, [currentIdx]: i }))}
                className={cn(
                  "w-full text-left p-6 rounded-2xl border-2 font-bold transition-all",
                  answers[currentIdx] === i ? "border-[#0A2647] bg-blue-50" : "border-slate-100 hover:border-slate-300"
                )}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
             <Button 
                variant="ghost" 
                disabled={currentIdx === 0} 
                onClick={() => setCurrentIdx(prev => prev - 1)}
             >
               Previous
             </Button>
             
             {currentIdx === testData.length - 1 ? (
               <Button 
                 onClick={() => finishTest()} 
                 className="bg-emerald-500 hover:bg-emerald-600 text-white px-8"
                 disabled={submitting}
               >
                 {submitting ? 'Submitting...' : 'Finish Assessment'}
               </Button>
             ) : (
               <Button 
                 onClick={() => setCurrentIdx(prev => prev + 1)}
                 className="bg-[#0A2647] text-white px-8"
               >
                 Next Question <ChevronRight className="ml-2 w-4 h-4" />
               </Button>
             )}
          </div>
        </div>
      </main>
    </div>
  )
}

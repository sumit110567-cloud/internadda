'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { IconicLoader } from '@/components/IconicLoader'

export default function PaymentSuccessHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  useEffect(() => {
    const startAssessment = () => {
      // Retrieve the internship ID saved during the apply step
      const internshipId = typeof window !== 'undefined' ? localStorage.getItem('last_applied_id') || '1' : '1'
      
      // Delay to ensure the "Payment Authenticated" message is seen
      setTimeout(() => {
        router.push(`/test/${internshipId}`)
      }, 3000)
    }

    if (orderId) startAssessment()
  }, [orderId, router])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-6">
      <IconicLoader />
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-3xl font-black text-[#0A2647] mb-2 tracking-tight">Payment Authenticated</h2>
        <p className="text-gray-400 font-medium max-w-sm">
          Please do not refresh. Provisioning your personalized assessment environment...
        </p>
      </motion.div>
    </div>
  )
}

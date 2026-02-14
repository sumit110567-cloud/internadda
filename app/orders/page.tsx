'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { CreditCard, CheckCircle, Clock, Lock, ShieldAlert } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [attempts, setAttempts] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!user) return
      // Parallel fetch for real-time verification
      const [{ data: oData }, { data: aData }] = await Promise.all([
        supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('user_test_attempts').select('test_id').eq('user_id', user.id)
      ])
      
      setOrders(oData || [])
      setAttempts(aData?.map(a => String(a.test_id)) || [])
      setLoading(false)
    }
    fetchData()
  }, [user])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8FAFC] pb-20">
        <section className="bg-[#0A2647] pt-20 pb-40 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-none px-4 py-1 rounded-full mb-6 font-black uppercase text-[10px]">Transaction Center</Badge>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">Real-Time <span className="text-[#FFD700]">Ledger.</span></h1>
            </motion.div>
          </div>
        </section>

        <section className="-mt-24 px-6 relative z-20">
          <div className="max-w-5xl mx-auto grid gap-6">
            {orders.map((order) => {
              const isAttempted = attempts.includes(String(order.test_id))
              return (
                <div key={order.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group">
                  <div className="flex items-center gap-6">
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", order.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600')}><CreditCard size={28} /></div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">TXN #{order.id.slice(0, 8)}</p>
                      <h4 className="text-xl font-black text-[#0A2647]">Assessment ID: {order.test_id}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={cn("px-5 py-2.5 rounded-full border flex items-center gap-2 text-[10px] font-black uppercase", order.status === 'PAID' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100')}>
                      {order.status === 'PAID' ? <CheckCircle size={14} /> : <Clock size={14} />} {order.status}
                    </div>
                    {order.status === 'PAID' && (
                      isAttempted ? (
                        <div className="flex items-center gap-2 bg-slate-50 text-slate-400 px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase border border-slate-100 cursor-not-allowed">
                          <Lock size={14} /> Max Attempt Reached
                        </div>
                      ) : (
                        <Link href={`/test/${order.test_id}`}>
                          <Button className="bg-[#0A2647] hover:bg-blue-900 rounded-2xl px-10 py-7 font-black text-[11px] uppercase tracking-widest shadow-2xl">Start Assessment</Button>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

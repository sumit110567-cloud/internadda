'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { CreditCard, Receipt, ExternalLink, CheckCircle, Clock, Lock } from 'lucide-react'
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
    async function fetchRealData() {
      if (!user) return
      // Fetch orders and previous attempts simultaneously
      const [{ data: orderData }, { data: attemptData }] = await Promise.all([
        supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('user_test_attempts').select('test_id').eq('user_id', user.id)
      ])
      
      setOrders(orderData || [])
      // Map attempted test IDs for quick lookup
      setAttempts(attemptData?.map(a => String(a.test_id)) || [])
      setLoading(false)
    }
    fetchRealData()
  }, [user])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8FAFC] pb-20">
        <section className="bg-[#0A2647] pt-20 pb-40 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-none px-4 py-1 rounded-full mb-6 font-black uppercase tracking-widest text-[10px]">
                Transaction Center
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Payments & <span className="text-[#FFD700]">History.</span></h1>
            </motion.div>
          </div>
        </section>

        <section className="-mt-24 px-4 relative z-20">
          <div className="max-w-5xl mx-auto space-y-6">
            {loading ? (
              <div className="p-20 text-center bg-white rounded-[3rem] shadow-xl">
                 <div className="animate-spin w-10 h-10 border-4 border-[#0A2647] border-t-transparent rounded-full mx-auto" />
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-[3.5rem] p-16 text-center shadow-xl border border-slate-100">
                <Receipt size={40} className="mx-auto mb-8 text-slate-200" />
                <h3 className="text-2xl font-black text-[#0A2647] mb-4">No Transactions Found</h3>
                <Link href="/internships"><Button className="bg-[#0A2647] rounded-2xl px-10 py-7 font-black">Explore Internships</Button></Link>
              </div>
            ) : (
              <div className="grid gap-6">
                {orders.map((order, i) => {
                  const hasAttempted = attempts.includes(String(order.test_id))
                  return (
                    <motion.div key={order.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-6 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-xl transition-all">
                      <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${order.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'}`}><CreditCard size={28} /></div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ID #{order.id.slice(0, 8)}</p>
                          <h4 className="text-xl font-black text-[#0A2647]">Assessment: Test ID {order.test_id}</h4>
                          <span className="text-xs font-bold text-slate-400 uppercase">{new Date(order.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className={`px-4 py-2 rounded-full border flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${order.status === 'PAID' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'}`}>
                          {order.status === 'PAID' ? <CheckCircle size={14} /> : <Clock size={14} />} {order.status}
                        </div>
                        {order.status === 'PAID' && (
                          hasAttempted ? (
                            <div className="flex items-center gap-2 bg-slate-100 text-slate-400 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-200 cursor-not-allowed">
                              <Lock size={12} /> Test Expired
                            </div>
                          ) : (
                            <Link href={`/test/${order.test_id}`}>
                              <Button className="bg-[#0A2647] hover:bg-blue-900 rounded-xl font-black text-[10px] uppercase tracking-widest px-6 shadow-lg">
                                Take Test <ExternalLink size={12} className="ml-1.5" />
                              </Button>
                            </Link>
                          )
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

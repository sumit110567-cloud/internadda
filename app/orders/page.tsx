'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { CreditCard, CheckCircle, Clock, Lock, Receipt } from 'lucide-react'
import { useAuth } from '@/lib/auth-context''use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { CreditCard, CheckCircle, Clock, Lock, Receipt } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils' // Critical Import
import Link from 'next/link'

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [attempts, setAttempts] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!user) return
      
      try {
        // Parallel fetch to optimize speed and prevent hydration lag
        const [oResponse, aResponse] = await Promise.all([
          supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
          supabase.from('user_test_attempts').select('test_id').eq('user_id', user.id)
        ])
        
        setOrders(oResponse.data || [])
        // Map attempts to an array of strings for easy checking
        if (aResponse.data) {
          setAttempts(aResponse.data.map(a => String(a.test_id)))
        }
      } catch (error) {
        console.error("Data fetch error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8FAFC] pb-24 text-[#0A2647]">
        {/* Gold Standard Header */}
        <section className="bg-[#0A2647] pt-20 pb-48 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[120px] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-none px-4 py-1.5 rounded-full mb-6 font-black uppercase text-[10px] tracking-widest">
                Real-Time Ledger
              </Badge>
              <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">
                Payments & <span className="text-[#FFD700]">History.</span>
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="-mt-24 px-6 relative z-20">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="bg-white rounded-[3rem] p-20 text-center shadow-xl border border-slate-100 flex flex-col items-center">
                <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mb-4" />
                <p className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Securing Connection...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-[3.5rem] p-16 text-center shadow-xl border border-slate-100">
                <Receipt size={48} className="mx-auto mb-8 text-slate-200" />
                <h3 className="text-2xl font-black mb-4">No Transactions Found</h3>
                <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto">You haven't purchased any assessments yet. Join 7,200+ students today.</p>
                <Link href="/internships">
                  <Button className="bg-[#0A2647] hover:bg-blue-900 rounded-2xl px-12 py-8 font-black text-xs uppercase tracking-widest">Explore Internships</Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6">
                {orders.map((order, i) => {
                  const isAttempted = attempts.includes(String(order.test_id))
                  
                  return (
                    <motion.div 
                      key={order.id} 
                      initial={{ opacity: 0, x: -20 }} 
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-xl transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <div className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner",
                          order.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'
                        )}>
                          <CreditCard size={28} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TXN #{order.id.slice(0, 8)}</p>
                             {isAttempted && <Badge className="bg-red-50 text-red-600 text-[8px] border-red-100 font-black px-2 py-0">SINGLE-USE EXPIRED</Badge>}
                          </div>
                          <h4 className="text-xl font-black tracking-tight">Assessment ID: {order.test_id}</h4>
                          <p className="text-xs font-bold text-slate-400 mt-1 uppercase">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className={cn(
                          "px-5 py-2.5 rounded-full border flex items-center gap-2 text-[10px] font-black uppercase tracking-widest",
                          order.status === 'PAID' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                        )}>
                          {order.status === 'PAID' ? <CheckCircle size={14} /> : <Clock size={14} />} {order.status}
                        </div>
                        
                        {order.status === 'PAID' && (
                          isAttempted ? (
                            <div className="flex items-center gap-2 bg-slate-100 text-slate-400 px-8 py-4 rounded-2xl font-black text-[10px] uppercase border border-slate-200 cursor-not-allowed select-none">
                              <Lock size={14} /> Max Attempt Reached
                            </div>
                          ) : (
                            <Link href={`/test/${order.test_id}`}>
                              <Button className="bg-[#0A2647] hover:bg-blue-900 text-white rounded-2xl px-10 py-7 font-black text-[10px] uppercase tracking-[0.15em] shadow-2xl">
                                Start Assessment
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
import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils' // Critical Import
import Link from 'next/link'

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [attempts, setAttempts] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!user) return
      
      try {
        // Parallel fetch to optimize speed and prevent hydration lag
        const [oResponse, aResponse] = await Promise.all([
          supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
          supabase.from('user_test_attempts').select('test_id').eq('user_id', user.id)
        ])
        
        setOrders(oResponse.data || [])
        // Map attempts to an array of strings for easy checking
        if (aResponse.data) {
          setAttempts(aResponse.data.map(a => String(a.test_id)))
        }
      } catch (error) {
        console.error("Data fetch error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8FAFC] pb-24 text-[#0A2647]">
        {/* Gold Standard Header */}
        <section className="bg-[#0A2647] pt-20 pb-48 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[120px] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-none px-4 py-1.5 rounded-full mb-6 font-black uppercase text-[10px] tracking-widest">
                Real-Time Ledger
              </Badge>
              <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">
                Payments & <span className="text-[#FFD700]">History.</span>
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="-mt-24 px-6 relative z-20">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="bg-white rounded-[3rem] p-20 text-center shadow-xl border border-slate-100 flex flex-col items-center">
                <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mb-4" />
                <p className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Securing Connection...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-[3.5rem] p-16 text-center shadow-xl border border-slate-100">
                <Receipt size={48} className="mx-auto mb-8 text-slate-200" />
                <h3 className="text-2xl font-black mb-4">No Transactions Found</h3>
                <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto">You haven't purchased any assessments yet. Join 7,200+ students today.</p>
                <Link href="/internships">
                  <Button className="bg-[#0A2647] hover:bg-blue-900 rounded-2xl px-12 py-8 font-black text-xs uppercase tracking-widest">Explore Internships</Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6">
                {orders.map((order, i) => {
                  const isAttempted = attempts.includes(String(order.test_id))
                  
                  return (
                    <motion.div 
                      key={order.id} 
                      initial={{ opacity: 0, x: -20 }} 
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-xl transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <div className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner",
                          order.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'
                        )}>
                          <CreditCard size={28} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TXN #{order.id.slice(0, 8)}</p>
                             {isAttempted && <Badge className="bg-red-50 text-red-600 text-[8px] border-red-100 font-black px-2 py-0">SINGLE-USE EXPIRED</Badge>}
                          </div>
                          <h4 className="text-xl font-black tracking-tight">Assessment ID: {order.test_id}</h4>
                          <p className="text-xs font-bold text-slate-400 mt-1 uppercase">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className={cn(
                          "px-5 py-2.5 rounded-full border flex items-center gap-2 text-[10px] font-black uppercase tracking-widest",
                          order.status === 'PAID' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                        )}>
                          {order.status === 'PAID' ? <CheckCircle size={14} /> : <Clock size={14} />} {order.status}
                        </div>
                        
                        {order.status === 'PAID' && (
                          isAttempted ? (
                            <div className="flex items-center gap-2 bg-slate-50 text-slate-400 px-8 py-4 rounded-2xl font-black text-[10px] uppercase border border-slate-200 cursor-not-allowed">
                              <Lock size={14} /> Expired
                            </div>
                          ) : (
                            <Link href={`/test/${order.test_id}`}>
                              <Button className="bg-[#0A2647] hover:bg-blue-900 text-white rounded-2xl px-10 py-7 font-black text-[10px] uppercase tracking-[0.15em] shadow-2xl">
                                Start Assessment
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

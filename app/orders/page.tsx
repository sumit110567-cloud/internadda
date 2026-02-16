'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { CreditCard, CheckCircle, Clock, Receipt, ArrowRight } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!user) return
      
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
        
        if (error) throw error
        setOrders(data || [])
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
      <main className="min-h-screen bg-white pb-24 font-sans">
        {/* Unified Hero Section */}
        <section className="bg-gradient-to-b from-indigo-50 via-white to-white pt-20 pb-40 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="bg-indigo-100 text-indigo-700 border-none px-4 py-1.5 rounded-full mb-6 text-xs font-semibold">
                Financial Ledger
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Payments & <span className="text-indigo-600">History.</span>
              </h1>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto font-medium">
                Track your assessment purchases and certification fees in one secure place.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Orders List Section */}
        <section className="-mt-24 px-6 relative z-20">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="bg-white rounded-2xl p-20 text-center shadow-xl shadow-indigo-100/50 border border-gray-100 flex flex-col items-center">
                <div className="animate-spin w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full mb-4" />
                <p className="font-bold text-gray-400 uppercase text-[10px] tracking-widest">Securing Connection...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-xl shadow-indigo-100/50 border border-gray-100">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Receipt size={32} className="text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Transactions Found</h3>
                <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto">
                  You haven't purchased any skill assessments yet. Start your journey today!
                </p>
                <Link href="/internships">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-10 py-6 font-bold text-sm shadow-lg shadow-indigo-100 flex items-center gap-2 mx-auto transition-all active:scale-95">
                    Explore Internships <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {orders.map((order, i) => (
                  <motion.div 
                    key={order.id} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 group hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-6 w-full md:w-auto">
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center shadow-sm shrink-0",
                        order.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      )}>
                        <CreditCard size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Ref: #{order.id.slice(0, 8)}
                        </p>
                        <h4 className="text-lg font-bold text-gray-900 tracking-tight">
                          Assessment: {order.test_id || 'Career FastTrack'}
                        </h4>
                        <p className="text-xs font-semibold text-gray-400 mt-1 uppercase">
                          {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-none pt-4 md:pt-0">
                      <div className="text-right md:mr-4">
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</p>
                         <p className="text-lg font-bold text-gray-900">₹{order.amount || '499'}</p>
                      </div>
                      <div className={cn(
                        "px-5 py-2 rounded-full border flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest",
                        order.status === 'PAID' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                      )}>
                        {order.status === 'PAID' ? <CheckCircle size={14} /> : <Clock size={14} />} 
                        {order.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          <p className="text-center mt-12 text-gray-400 text-[10px] font-bold uppercase tracking-[0.25em]">
            Secure Encrypted Transactions • MSME Verified Platform
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}

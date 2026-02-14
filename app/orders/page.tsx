'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { CreditCard, Receipt, ExternalLink, ShieldCheck, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (!error) setOrders(data || [])
      setLoading(false)
    }
    fetchOrders()
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
                 <p className="mt-4 font-bold text-slate-400 uppercase tracking-widest text-xs">Loading history...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-[3.5rem] p-16 md:p-24 text-center shadow-xl border border-slate-100">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-slate-200">
                   <Receipt size={40} />
                </div>
                <h3 className="text-2xl font-black text-[#0A2647] mb-4">No Transactions Found</h3>
                <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto">You haven't purchased any internship assessments yet. Ready to start your career?</p>
                <Link href="/internships">
                  <Button className="bg-[#0A2647] hover:bg-blue-900 rounded-2xl px-10 py-7 font-black text-base shadow-xl shadow-blue-900/10">
                    Explore Internships
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6">
                {orders.map((order, i) => (
                  <motion.div 
                    key={order.id} 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner ${order.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'}`}>
                        <CreditCard size={28} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Order #{order.id.slice(0, 8)}</p>
                        <h4 className="text-xl font-black text-[#0A2647]">Assessment Fee: Test ID {order.test_id}</h4>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-lg font-black text-blue-600">₹{order.amount || '499'}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{new Date(order.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className={`px-4 py-2 rounded-full border flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${order.status === 'PAID' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'}`}>
                        {order.status === 'PAID' ? <CheckCircle size={14} /> : <Clock size={14} />} {order.status}
                      </div>
                      {order.status === 'PAID' && (
                        <Link href={`/test/${order.test_id}`}>
                          <Button size="sm" className="bg-[#0A2647] hover:bg-blue-900 rounded-xl font-black text-[10px] uppercase tracking-widest px-6 h-10 shadow-lg">
                            Take Test <ExternalLink size={12} className="ml-1.5" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

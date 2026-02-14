'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { Briefcase, Award, Clock, Star, Zap, ShieldCheck, ArrowRight } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
// FIX: Added missing Link import to resolve build error
import Link from 'next/link' 

export default function StudentDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ applications: 0, certificates: 0, avgScore: 0, pending: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRealStats() {
      if (!user) return
      
      try {
        const [apps, certs, orders] = await Promise.all([
          supabase.from('user_test_attempts').select('score', { count: 'exact' }).eq('user_id', user.id),
          supabase.from('certificates').select('*', { count: 'exact' }).eq('user_id', user.id),
          supabase.from('orders').select('*', { count: 'exact' }).eq('user_id', user.id).eq('status', 'PENDING')
        ])

        const totalScore = apps.data?.reduce((acc, curr) => acc + curr.score, 0) || 0
        // Calculate real percentage based on total marks of 20 per test
        const average = apps.data?.length ? Math.round((totalScore / (apps.data.length * 20)) * 100) : 0

        setStats({
          applications: apps.count || 0,
          certificates: certs.count || 0,
          avgScore: average,
          pending: orders.count || 0
        })
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchRealStats()
  }, [user])

  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'Lucky'

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8FAFC] pb-24">
        {/* Premium Command Center Header */}
        <section className="bg-[#0A2647] pt-20 pb-48 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[120px] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-blue-500/20 text-blue-300 border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[9px]">Portal Active</Badge>
                <div className="flex items-center gap-1.5 text-emerald-400 text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                  <ShieldCheck size={12} /> Verified identity
                </div>
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter">
                Welcome, <span className="text-yellow-400">{userName}.</span>
              </h1>
              <p className="text-blue-100/60 font-medium max-w-2xl leading-relaxed text-lg">
                India's Gold Standard Internship Ecosystem. Access your {stats.applications} application{stats.applications !== 1 ? 's' : ''} and verified credentials below.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Real Stats Grid */}
        <section className="-mt-24 px-6">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Assessments', value: stats.applications, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Verified Certs', value: stats.certificates, icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Assessment Avg', value: `${stats.avgScore}%`, icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Pending Tests', value: stats.pending, icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }} 
                className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col gap-6"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner", stat.bg)}>
                  <stat.icon className={stat.color} size={28} />
                </div>
                <div>
                  <p className="text-4xl font-black text-[#0A2647] tracking-tight">{loading ? '...' : stat.value}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Career Optimization Banner */}
        <section className="py-20 px-6">
          <div className="max-w-[1400px] mx-auto bg-white rounded-[4rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden group">
             <div className="flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
               <div className="space-y-4 text-center md:text-left">
                  <h2 className="text-3xl font-black text-[#0A2647] tracking-tighter leading-none">Your Professional Roadmap.</h2>
                  <p className="text-slate-500 font-medium max-w-lg leading-relaxed">
                    InternAdda bridges you to 500+ verified industry leaders. Complete your Assessments and verify your profile to unlock direct HR interviews for premium internships.
                  </p>
               </div>
               <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/internships">
                    <Button className="bg-[#0A2647] hover:bg-blue-900 text-white font-black px-12 py-8 rounded-[2rem] text-[11px] uppercase tracking-[0.2em] shadow-2xl transition-all">
                      Browse Internships <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button variant="outline" className="border-slate-200 text-[#0A2647] font-black px-12 py-8 rounded-[2rem] text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all">
                      Update Profile
                    </Button>
                  </Link>
               </div>
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

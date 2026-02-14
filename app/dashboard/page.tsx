'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { Briefcase, Award, Clock, Star, ArrowRight, Zap } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { Badge } from '@/components/ui/badge'

export default function StudentDashboard() {
  const { user } = useAuth()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50/50 pb-20">
        <section className="bg-[#0A2647] pt-20 pb-40 px-4">
          <div className="max-w-[1400px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                <Badge className="bg-blue-500/20 text-blue-300 border-none px-4 py-1.5 rounded-full mb-4 font-bold uppercase tracking-widest text-[10px]">
                  Student Command Center
                </Badge>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                  Welcome back, <span className="text-[#FFD700]">{user?.user_metadata?.full_name?.split(' ')[0] || 'Lucky'}!</span>
                </h1>
              </div>
              <div className="flex gap-4">
                <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                  <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Rank</p>
                  <p className="text-xl font-black text-white">Elite Candidate</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="-mt-20 px-4">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-3 gap-8">
            {/* Stats Cards */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {[
                { title: 'Applied Internships', value: '12', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
                { title: 'Certificates Earned', value: '03', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { title: 'Assigned Tasks', value: '08', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                { title: 'Average Score', value: '92%', icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map((stat, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6">
                  <div className={cn("p-4 rounded-2xl", stat.bg)}>
                    <stat.icon className={stat.color} size={28} />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-[#0A2647]">{stat.value}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Notification Sidebar */}
            <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-[#0A2647] mb-6 flex items-center justify-between">
                Recent Activity <Clock size={20} className="text-slate-300" />
              </h3>
              <div className="space-y-6">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex gap-4 pb-6 border-b border-slate-50 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-[#0A2647]">Interview scheduled with Arjuna AI</p>
                      <p className="text-xs text-slate-400 font-medium mt-1">Today at 2:00 PM</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { Briefcase, Award, Clock, Star, ArrowRight, Zap, ShieldCheck, CheckCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { Badge } from '@/components/ui/badge'
// IMPORT ADDED BELOW TO FIX BUILD ERROR
import { cn } from '@/lib/utils' 

export default function StudentDashboard() {
  const { user } = useAuth()

  // Dynamic user data for Lucky Tiwari's profile look
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'Lucky'

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8FAFC] pb-20">
        {/* Premium Header Section */}
        <section className="bg-[#0A2647] pt-20 pb-44 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[120px] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-500/20 text-blue-300 border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
                    Student Command Center
                  </Badge>
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck size={12} /> Verified Profile
                  </div>
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">
                  Welcome, <span className="text-[#FFD700]">{userName}!</span>
                </h1>
                <p className="text-blue-100/60 font-medium max-w-xl">
                  Track your internship applications, manage certificates, and stay ahead with real-time career updates.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="bg-white/5 backdrop-blur-xl p-5 rounded-[2rem] border border-white/10 shadow-2xl min-w-[160px]">
                  <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Current Status</p>
                  <p className="text-xl font-black text-white flex items-center gap-2">
                    Elite Candidate <Star size={16} className="text-[#FFD700] fill-[#FFD700]" />
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="-mt-24 px-4 relative z-20">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-3 gap-8">
            
            {/* Stats Grid */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                { title: 'Applied Roles', value: '12', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
                { title: 'Verified Certs', value: '03', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { title: 'Pending Tasks', value: '08', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                { title: 'Test Average', value: '92%', icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }} 
                  className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex items-center gap-8 transition-all"
                >
                  <div className={cn("p-5 rounded-[1.5rem] shadow-inner", stat.bg)}>
                    <stat.icon className={stat.color} size={32} />
                  </div>
                  <div>
                    <p className="text-4xl font-black text-[#0A2647] tracking-tighter">{stat.value}</p>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] mt-1">{stat.title}</p>
                  </div>
                </motion.div>
              ))}

              {/* Action Banner */}
              <div className="sm:col-span-2 bg-gradient-to-r from-[#0A2647] to-[#144272] p-10 rounded-[3rem] shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/10 transition-colors" />
                 <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                       <h3 className="text-2xl font-black text-white mb-2">Ready for a new challenge?</h3>
                       <p className="text-blue-100/60 font-medium">Explore 500+ verified internships at top tech startups.</p>
                    </div>
                    <button className="bg-[#FFD700] text-[#0A2647] font-black px-10 py-5 rounded-2xl shadow-lg hover:bg-white transition-all active:scale-95 flex items-center gap-3">
                       Browse Roles <ArrowRight size={20} />
                    </button>
                 </div>
              </div>
            </div>

            {/* Recent Activity Sidebar */}
            <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm flex flex-col h-fit">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-[#0A2647] tracking-tight">Timeline</h3>
                <Clock size={20} className="text-slate-300" />
              </div>
              
              <div className="space-y-10 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-50" />
                
                {[
                  { title: "Interview Scheduled", desc: "Arjuna AI Solutions", time: "Today, 2:00 PM", status: "active" },
                  { title: "Test Completed", desc: "Web Development Assessment", time: "Yesterday", status: "completed" },
                  { title: "Application Viewed", desc: "InternAdda Enterprises", time: "2 days ago", status: "info" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 relative">
                    <div className={cn(
                      "w-6 h-6 rounded-full border-4 border-white shadow-md z-10 shrink-0",
                      item.status === 'active' ? 'bg-blue-600' : 'bg-emerald-500'
                    )} />
                    <div>
                      <p className="text-sm font-black text-[#0A2647] leading-none mb-1">{item.title}</p>
                      <p className="text-xs font-bold text-slate-400">{item.desc}</p>
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-2 bg-blue-50 w-fit px-2 py-0.5 rounded-md">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-12 py-5 rounded-2xl border-2 border-slate-50 text-[#0A2647] font-black text-sm hover:bg-slate-50 transition-colors uppercase tracking-widest">
                View All Activity
              </button>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

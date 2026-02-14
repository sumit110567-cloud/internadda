'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { User, Mail, Phone, GraduationCap, MapPin, Camera, Save, CheckCircle, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function ProfileSettings() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  
  // Real live data state
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    university: 'Delhi University',
    location: 'Delhi, India',
    bio: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.user_metadata?.full_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
        university: user.user_metadata?.university || 'Delhi University',
        location: user.user_metadata?.location || 'Delhi, India',
        bio: user.user_metadata?.bio || 'Elite Candidate at InternAdda'
      })
    }
  }, [user])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: { 
          full_name: formData.full_name,
          phone: formData.phone,
          university: formData.university,
          location: formData.location,
          bio: formData.bio
        }
      })

      if (error) throw error
      toast.success("Profile updated successfully!")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8FAFC] pb-20">
        <section className="bg-[#0A2647] pt-20 pb-40 px-4 relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="bg-yellow-400/10 text-yellow-400 border-none px-4 py-1 rounded-full mb-6 font-black uppercase tracking-widest text-[10px]">
                Student Identity
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">My <span className="text-[#FFD700]">Profile.</span></h1>
            </motion.div>
          </div>
        </section>

        <section className="-mt-24 px-4 relative z-20">
          <div className="max-w-4xl mx-auto bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-12 p-8 md:p-16">
              {/* Left: Avatar Side */}
              <div className="flex flex-col items-center gap-6">
                <div className="relative group">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] bg-[#0A2647] flex items-center justify-center text-5xl font-black text-[#FFD700] shadow-2xl overflow-hidden border-4 border-slate-50">
                    {formData.full_name?.[0] || 'L'}
                  </div>
                  <button className="absolute bottom-2 right-2 p-3 bg-white rounded-2xl shadow-xl text-[#0A2647] hover:bg-slate-50 transition-all border border-slate-100">
                    <Camera size={20} />
                  </button>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 mb-2">
                    <ShieldCheck size={14} /> Verified Student
                  </div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Member since 2025</p>
                </div>
              </div>

              {/* Right: Form Side */}
              <form onSubmit={handleUpdate} className="flex-1 space-y-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white transition-all font-bold" placeholder="Your Name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input disabled value={formData.email} className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-100 font-bold opacity-60" />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white transition-all font-bold" placeholder="+91 XXXX XXXX" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">University</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input value={formData.university} onChange={e => setFormData({...formData, university: e.target.value})} className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white transition-all font-bold" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Profile Bio</label>
                  <Input value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white transition-all font-bold" placeholder="Tell us about your career goals..." />
                </div>

                <Button disabled={loading} className="w-full bg-[#0A2647] hover:bg-blue-900 py-8 rounded-2xl font-black text-lg shadow-xl shadow-blue-900/10 gap-3">
                  <Save size={20} /> {loading ? 'Saving Changes...' : 'Save Profile Details'}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

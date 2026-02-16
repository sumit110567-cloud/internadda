'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { User, Mail, Phone, GraduationCap, Save, ShieldCheck, MapPin } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function ProfileSettings() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  
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
        bio: user.user_metadata?.bio || 'Elite Candidate at Internadda'
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
      <main className="min-h-screen bg-white pb-20 font-sans">
        {/* Unified Hero Section */}
        <section className="bg-gradient-to-b from-indigo-50 via-white to-white pt-20 pb-40 px-4 relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="bg-indigo-100 text-indigo-700 border-none px-4 py-1.5 rounded-full mb-6 text-xs font-semibold">
                Member Dashboard
              </Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Your <span className="text-indigo-600">Professional Identity.</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Profile Form Card */}
        <section className="-mt-24 px-4 relative z-20">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-gray-100 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-12 p-8 md:p-12 lg:p-16">
              
              {/* Left: Avatar Side */}
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 md:w-44 md:h-44 rounded-2xl bg-indigo-600 flex items-center justify-center text-5xl font-bold text-white shadow-lg shadow-indigo-200 border-4 border-white">
                    {formData.full_name?.[0] || 'U'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-[11px] uppercase tracking-wider bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 mb-3">
                    <ShieldCheck size={14} /> Verified Student
                  </div>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Joined Feb 2026</p>
                </div>
              </div>

              {/* Right: Form Side */}
              <form onSubmit={handleUpdate} className="flex-1 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        value={formData.full_name} 
                        onChange={e => setFormData({...formData, full_name: e.target.value})} 
                        className="pl-12 h-12 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-semibold" 
                        placeholder="Lucky Tiwari" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 ml-1 text-gray-400">Email Address (Fixed)</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                      <Input 
                        disabled 
                        value={formData.email} 
                        className="pl-12 h-12 rounded-xl border-gray-100 bg-gray-100 font-semibold opacity-60 cursor-not-allowed" 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 ml-1">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        value={formData.phone} 
                        onChange={e => setFormData({...formData, phone: e.target.value})} 
                        className="pl-12 h-12 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-semibold" 
                        placeholder="+91 00000 00000" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 ml-1">University</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        value={formData.university} 
                        onChange={e => setFormData({...formData, university: e.target.value})} 
                        className="pl-12 h-12 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-semibold" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 ml-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      value={formData.location} 
                      onChange={e => setFormData({...formData, location: e.target.value})} 
                      className="pl-12 h-12 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-semibold" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 ml-1">Profile Bio</label>
                  <textarea 
                    value={formData.bio} 
                    onChange={e => setFormData({...formData, bio: e.target.value})} 
                    className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-semibold min-h-[100px]" 
                    placeholder="Briefly describe your professional goals..."
                  />
                </div>

                <Button 
                  disabled={loading} 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 rounded-xl font-bold text-base shadow-lg shadow-indigo-100 gap-3 transition-all active:scale-[0.98]"
                >
                  <Save size={18} /> {loading ? 'Updating Profile...' : 'Save Profile Details'}
                </Button>
              </form>
            </div>
          </div>
          
          <p className="text-center mt-8 text-gray-400 text-[10px] font-bold uppercase tracking-[0.25em]">
            Internadda Secure Profile System • MSME Certified
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}

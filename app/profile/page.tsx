'use client'
// app/profile/page.tsx

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import {
  User, Mail, Phone, GraduationCap, Save,
  ShieldCheck, MapPin, CheckCircle,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const CONTAINER = "max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8"

export default function ProfileSettings() {
  const { user }    = useAuth()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    full_name:  '',
    email:      '',
    phone:      '',
    university: 'Delhi University',
    location:   'Delhi, India',
    bio:        '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        full_name:  user.user_metadata?.full_name  || '',
        email:      user.email                     || '',
        phone:      user.user_metadata?.phone      || '',
        university: user.user_metadata?.university || 'Delhi University',
        location:   user.user_metadata?.location   || 'Delhi, India',
        bio:        user.user_metadata?.bio        || '',
      })
    }
  }, [user])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name:  formData.full_name,
          phone:      formData.phone,
          university: formData.university,
          location:   formData.location,
          bio:        formData.bio,
        },
      })
      if (error) throw error
      toast.success('Profile updated successfully!')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const initial = (formData.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden pb-14 sm:pb-16">

        {/* ════════════════════════════════════════
            HERO — same white pattern as every page
        ════════════════════════════════════════ */}
        <section className="relative bg-white overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[360px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.06) 0%, transparent 70%)' }} />
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.02 }}>
              <defs><pattern id="pg" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#4f46e5" strokeWidth="0.6" />
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#pg)" />
            </svg>
          </div>

          <div className={`relative ${CONTAINER}`}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center pt-12 pb-10 sm:pt-14 sm:pb-12 lg:pt-16 lg:pb-14"
            >
              <div className="inline-flex items-center gap-2 border border-indigo-100 bg-indigo-50 rounded-full px-3 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span className="text-[10.5px] font-bold text-indigo-700 uppercase tracking-[0.13em]">Member Dashboard</span>
              </div>
              <h1 className="text-[2rem] sm:text-[2.6rem] xl:text-[3rem] font-extrabold text-slate-900 leading-[1.07] tracking-tight">
                Your <span style={{ color: '#1a1063' }}>Professional Identity.</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            PROFILE CARD
        ════════════════════════════════════════ */}
        <div className={CONTAINER}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm shadow-slate-200/60"
          >
            <div className="flex flex-col md:flex-row">

              {/* ── Left sidebar ── */}
              <div className="md:w-56 xl:w-64 flex-shrink-0 flex flex-col items-center gap-5 p-7 sm:p-8 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50">

                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center text-[2.2rem] font-extrabold text-white shadow-lg flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #1a1063, #4f46e5)' }}>
                    {initial}
                  </div>
                  {/* Online dot */}
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                </div>

                {/* Name + role */}
                <div className="text-center">
                  <p className="text-[15px] font-bold text-slate-900 leading-snug">
                    {formData.full_name || 'Your Name'}
                  </p>
                  <p className="text-[11.5px] text-slate-400 mt-0.5 font-medium truncate max-w-[160px]">{formData.email}</p>
                </div>

                {/* Badges */}
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                    <ShieldCheck size={12} className="text-emerald-600 flex-shrink-0" />
                    <span className="text-[10.5px] font-bold text-emerald-700 uppercase tracking-[0.11em]">Verified Student</span>
                  </div>
                  <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2">
                    <CheckCircle size={12} className="text-indigo-500 flex-shrink-0" />
                    <span className="text-[10.5px] font-bold text-indigo-600 uppercase tracking-[0.11em]">MSME Platform</span>
                  </div>
                </div>

                {/* Join date */}
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-[0.16em] text-center">
                  Member since Feb 2026
                </p>
              </div>

              {/* ── Form ── */}
              <form onSubmit={handleUpdate} className="flex-1 p-7 sm:p-8 xl:p-10">

                {/* Section label */}
                <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-widest mb-6">Profile Information</p>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
                  {/* Full name */}
                  <div className="space-y-1.5">
                    <label className="text-[11.5px] font-bold text-slate-600">Full Name</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <Input
                        value={formData.full_name}
                        onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                        placeholder="Lucky Tiwari"
                        className="pl-9 h-11 rounded-xl border-slate-200 bg-slate-50/60 focus:bg-white font-semibold text-[13.5px] text-slate-800 placeholder:text-slate-400 focus:border-indigo-300 focus:ring-indigo-100/60 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email — disabled */}
                  <div className="space-y-1.5">
                    <label className="text-[11.5px] font-bold text-slate-400">Email Address <span className="text-[10px] font-medium normal-case">(cannot change)</span></label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                      <Input
                        disabled
                        value={formData.email}
                        className="pl-9 h-11 rounded-xl border-slate-100 bg-slate-100 font-semibold text-[13.5px] text-slate-400 cursor-not-allowed opacity-70"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[11.5px] font-bold text-slate-600">Mobile Number</label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <Input
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 00000 00000"
                        className="pl-9 h-11 rounded-xl border-slate-200 bg-slate-50/60 focus:bg-white font-semibold text-[13.5px] text-slate-800 placeholder:text-slate-400 focus:border-indigo-300 focus:ring-indigo-100/60 transition-all"
                      />
                    </div>
                  </div>

                  {/* University */}
                  <div className="space-y-1.5">
                    <label className="text-[11.5px] font-bold text-slate-600">University</label>
                    <div className="relative">
                      <GraduationCap size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <Input
                        value={formData.university}
                        onChange={e => setFormData({ ...formData, university: e.target.value })}
                        className="pl-9 h-11 rounded-xl border-slate-200 bg-slate-50/60 focus:bg-white font-semibold text-[13.5px] text-slate-800 focus:border-indigo-300 focus:ring-indigo-100/60 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1.5 mb-5">
                  <label className="text-[11.5px] font-bold text-slate-600">Location</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <Input
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      className="pl-9 h-11 rounded-xl border-slate-200 bg-slate-50/60 focus:bg-white font-semibold text-[13.5px] text-slate-800 focus:border-indigo-300 focus:ring-indigo-100/60 transition-all"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-1.5 mb-7">
                  <label className="text-[11.5px] font-bold text-slate-600">Profile Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Briefly describe your professional goals and skills…"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100/60 transition-all font-semibold text-[13.5px] text-slate-800 placeholder:text-slate-400 resize-none"
                  />
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 mb-6" />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-[#1a1063] hover:bg-indigo-900 disabled:opacity-60 text-white text-[13.5px] font-bold px-7 py-3 rounded-xl shadow-sm shadow-indigo-900/20 transition-all hover:shadow-md hover:shadow-indigo-900/30 active:scale-[0.98]"
                >
                  <Save size={14} />
                  {loading ? 'Saving…' : 'Save Profile Details'}
                </button>

                <p className="mt-4 text-[10.5px] text-slate-400 font-medium">
                  Your data is stored securely. Internadda is MSME registered &amp; compliant with Indian data laws.
                </p>
              </form>
            </div>
          </motion.div>
        </div>

      </main>
      <Footer />
    </>
  )
}

"use client"

import React, { useRef, useState } from 'react'
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  Mail, 
  MapPin, 
  Zap, 
  ArrowLeft,
  Headset,
  SendHorizontal
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.current) return

    setIsLoading(true)
    try {
      // Direct EmailJS Logic (No Database needed)
      await emailjs.sendForm(
        "service_hez7mw9",
        "template_htai0ev",
        form.current,
        "qsf9Wt-yXfBKQ7CD7"
      )

      // Success Tick State
      setIsSubmitted(true)
      
      // 3 Second baad Home Page par redirect
      setTimeout(() => {
        router.push("/")
      }, 3000)

    } catch (error) {
      console.error("Submission failed:", error)
      alert("Technical error occurred. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyles = "h-12 bg-white border border-indigo-100 text-[#0A2647] placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20 rounded-xl transition-all text-sm shadow-sm"

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row relative overflow-hidden font-sans">
      {/* Background Decorative Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[100px]" />
      </div>

      {/* Left Branding Panel */}
      <div className="relative w-full md:w-[38%] p-8 md:p-14 flex flex-col justify-between bg-white border-r border-gray-100 shadow-2xl z-10">
        <div>
          <Link href="/" className="group flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-all mb-12 w-fit">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Hub</span>
          </Link>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">Official Help Desk</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-[#0A2647] tracking-tighter leading-none uppercase">
              Let's <br />
              <span className="text-indigo-600">Connect.</span>
            </h1>

            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs">
              InternAdda is here to bridge the gap. Send us your query and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex gap-5 items-center group">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-[#0A2647] font-bold text-xs uppercase tracking-tight">Email Support</h4>
                  <p className="text-gray-500 text-[11px] font-medium">support@internadda.com</p>
                </div>
              </div>

              <div className="flex gap-5 items-center group">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-[#0A2647] font-bold text-xs uppercase tracking-tight">Location</h4>
                  <p className="text-gray-500 text-[11px] font-medium">New Delhi, India</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="pt-10 border-t border-gray-100 flex items-center gap-4 mt-8">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold">MSME Registered</p>
            <p className="text-[8px] text-indigo-600 font-bold font-mono">TRUSTED_ID: 7200_ACTIVE</p>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div 
              key="contact-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              className="w-full max-w-lg bg-white border border-gray-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
            >
              <div className="mb-10">
                <h2 className="text-3xl font-black text-[#0A2647] tracking-tight uppercase">Send Query</h2>
                <div className="h-1 w-12 bg-indigo-600 mt-2 rounded-full" />
              </div>

              <form ref={form} onSubmit={sendEmail} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                    <Input name="from_name" placeholder="Lucky Tiwari" required className={inputStyles} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email</label>
                    <Input name="reply_to" type="email" placeholder="example@mail.com" required className={inputStyles} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Subject</label>
                  <Input name="subject" placeholder="Internship/Course Inquiry" required className={inputStyles} />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Message</label>
                  <Textarea 
                    name="message" 
                    placeholder="Describe your query in detail..." 
                    required 
                    className="min-h-[140px] bg-white border border-indigo-100 text-[#0A2647] rounded-2xl resize-none p-5 text-sm shadow-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20 transition-all" 
                  />
                </div>
                
                <Button 
                  disabled={isLoading}
                  className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl uppercase text-[11px] font-black tracking-[0.2em] transition-all shadow-xl shadow-indigo-100 mt-4 group"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <span className="flex items-center gap-3">
                      Deliver Message <SendHorizontal className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="relative mx-auto h-32 w-32">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ type: "spring", damping: 12 }}
                  className="h-full w-full rounded-full bg-green-50 border-2 border-green-100 flex items-center justify-center text-green-600 shadow-inner"
                >
                  <CheckCircle2 className="h-16 w-16" />
                </motion.div>
                {/* Rotating Outer Ring */}
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-12px] border border-dashed border-green-200 rounded-full"
                />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-4xl font-black text-[#0A2647] tracking-tighter uppercase">Query Delivered</h3>
                <p className="text-gray-500 max-w-[300px] mx-auto text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                  Data synchronized successfully. <br />
                  <span className="text-indigo-600">Redirecting to home...</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

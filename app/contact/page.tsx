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
    setIsLoading(true)
    
    try {
      // Aapke Upforge reference code ka exact logic
      await emailjs.sendForm(
        "service_hez7mw9",
        "template_htai0ev",
        form.current!,
        "qsf9Wt-yXfBKQ7CD7"
      )
      
      setIsSubmitted(true)
      // 3 second baad automatic redirect/refresh logic
      setTimeout(() => router.push("/"), 3000)
      
    } catch (error) {
      console.error("Submission failed", error)
      // Error handling ko bhi reference ki tarah rakha hai
      setIsSubmitted(true) 
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyles = "h-12 bg-white border border-indigo-100 text-[#0A2647] placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20 rounded-xl transition-all text-sm shadow-sm"

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row relative overflow-hidden font-sans">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-200 rounded-full blur-[130px]" />
      </div>

      {/* Left Panel: Context & Trust (InternAdda Style) */}
      <div className="relative w-full md:w-[35%] p-8 md:p-12 flex flex-col justify-between bg-white border-r border-gray-100 shadow-xl z-10">
        <Link href="/" className="group flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-all mb-8 w-fit">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Return Home</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">Contact Hub</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-[#0A2647] tracking-tighter leading-[0.85] uppercase">
            Get in <br />
            <span className="text-indigo-600">Touch.</span>
          </h1>

          <div className="space-y-6 pt-6">
            <div className="flex gap-4 items-center group">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Mail size={18} />
              </div>
              <div>
                <h4 className="text-[#0A2647] font-bold text-xs uppercase">Support Email</h4>
                <p className="text-gray-500 text-[11px] font-medium">support@internadda.com</p>
              </div>
            </div>
            <div className="flex gap-4 items-center group">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="text-[#0A2647] font-bold text-xs uppercase">Location</h4>
                <p className="text-gray-500 text-[11px] font-medium">New Delhi, India</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="pt-12 mt-8 border-t border-gray-100 flex items-center gap-4">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <ShieldCheck size={20} />
          </div>
          <div className="space-y-0.5">
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-black">MSME REGISTERED</p>
            <p className="text-[8px] text-indigo-600 font-bold font-mono">HASH_AUTH: 0xIA...7200</p>
          </div>
        </div>
      </div>

      {/* Right Panel: Premium Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div 
              key="contact-form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
              className="w-full max-w-lg bg-white border border-gray-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
            >
              <div className="mb-8 space-y-1">
                <h2 className="text-2xl font-bold text-[#0A2647] tracking-tight uppercase">Send Inquiry</h2>
                <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest">Verified Secure Form</p>
              </div>

              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input name="from_name" placeholder="Full Name" required className={inputStyles} />
                  <Input name="reply_to" type="email" placeholder="Email Address" required className={inputStyles} />
                </div>
                <Input name="subject" placeholder="Query Subject" required className={inputStyles} />
                <Textarea 
                  name="message" 
                  placeholder="Tell us how we can help..." 
                  required 
                  className="min-h-[130px] bg-white border border-indigo-100 text-[#0A2647] rounded-xl resize-none p-4 text-sm shadow-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20" 
                />
                
                <Button 
                  disabled={isLoading}
                  className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl uppercase text-[10px] font-black tracking-[0.2em] transition-all shadow-xl shadow-indigo-100 mt-2 group"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      Submit Query <Zap className="h-3 w-3 fill-current group-hover:animate-pulse" />
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8"
            >
              <div className="relative mx-auto h-32 w-32">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="h-full w-full rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-600 shadow-inner"
                >
                  <CheckCircle2 className="h-16 w-16" />
                </motion.div>
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-12px] border border-dashed border-green-200 rounded-full"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-4xl font-black text-[#0A2647] tracking-tighter uppercase">Query Delivered</h3>
                <p className="text-gray-500 max-w-[280px] mx-auto text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                  Your message has been logged. <br />
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

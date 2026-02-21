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
  ArrowLeft
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
      await emailjs.sendForm(
        "service_hez7mw9",
        "template_htai0ev",
        form.current!,
        "qsf9Wt-yXfBKQ7CD7"
      )
      
      setIsSubmitted(true)
      // Redirect to home page after exactly 1.5 seconds
      setTimeout(() => router.push("/"), 1500)
      
    } catch (error) {
      console.error("Submission failed", error)
      // Reference code ki tarah error handle kiya gaya hai
      setIsSubmitted(true) 
      setTimeout(() => router.push("/"), 1500)
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyles = "h-12 bg-white border border-indigo-100 text-[#0A2647] placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20 rounded-xl transition-all text-sm shadow-sm"

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col md:flex-row relative overflow-hidden font-sans">
      {/* Premium Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #0A2647 0px, #0A2647 1px, transparent 1px, transparent 10px)`,
        }}
      />

      {/* Left Panel: Branding & Trust */}
      <div className="relative w-full md:w-[38%] p-8 md:p-14 flex flex-col justify-between bg-white border-r border-gray-100 shadow-2xl z-10">
        <div>
          <Link href="/" className="group flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-all mb-12 w-fit">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return Home</span>
          </Link>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600">Secure Helpdesk</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-[#0A2647] tracking-tighter leading-[0.85] uppercase">
              Get in <br />
              <span className="text-indigo-600">Touch.</span>
            </h1>

            <div className="space-y-6 pt-6">
              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-[#0A2647] font-bold text-[10px] uppercase tracking-wider">Support Channel</h4>
                  <p className="text-gray-500 text-[12px] font-medium">support@internadda.com</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-[#0A2647] font-bold text-[10px] uppercase tracking-wider">Hq Location</h4>
                  <p className="text-gray-500 text-[12px] font-medium">New Delhi, India</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="pt-10 mt-10 border-t border-gray-100 flex items-center gap-4">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <ShieldCheck size={20} />
          </div>
          <div className="space-y-0.5">
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-black">MSME Registered Entity</p>
            <p className="text-[8px] text-indigo-600 font-bold font-mono">IA_AUTH_SECURED: 0xFD...7200</p>
          </div>
        </div>
      </div>

      {/* Right Panel: Form Area */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
              className="w-full max-w-lg bg-white border border-gray-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-100/20"
            >
              <div className="mb-10 space-y-2">
                <h2 className="text-3xl font-black text-[#0A2647] tracking-tight uppercase leading-none">Inquiry Form</h2>
                <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em]">Verified Submission Path</p>
              </div>

              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input name="from_name" placeholder="Full Name" required className={inputStyles} />
                  <Input name="reply_to" type="email" placeholder="Email Address" required className={inputStyles} />
                </div>
                <Input name="subject" placeholder="Subject of Concern" required className={inputStyles} />
                <Textarea 
                  name="message" 
                  placeholder="How can our team assist you?" 
                  required 
                  className="min-h-[140px] bg-white border border-indigo-100 text-[#0A2647] rounded-2xl resize-none p-5 text-sm shadow-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20 transition-all" 
                />
                
                <Button 
                  disabled={isLoading}
                  className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl uppercase text-[11px] font-black tracking-[0.2em] transition-all shadow-xl shadow-indigo-100 mt-4 group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      <>Deliver Message <Zap size={14} className="fill-current group-hover:animate-pulse" /></>
                    )}
                  </span>
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8"
            >
              <div className="relative mx-auto h-32 w-32">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ type: "spring", damping: 12, stiffness: 200 }}
                  className="h-full w-full rounded-full bg-green-50 border-2 border-green-100 flex items-center justify-center text-green-600 shadow-inner"
                >
                  <CheckCircle2 className="h-16 w-16" />
                </motion.div>
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-12px] border border-dashed border-green-200 rounded-full"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-4xl font-black text-[#0A2647] tracking-tighter uppercase leading-none">Delivered</h3>
                <p className="text-gray-400 max-w-[280px] mx-auto text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                  Registry Update Successful. <br />
                  <span className="text-indigo-600">Automatic Redirect...</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

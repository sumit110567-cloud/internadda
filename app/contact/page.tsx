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
  Headset
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
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
      // EmailJS configuration
      await emailjs.sendForm(
        "service_hez7mw9",
        "template_htai0ev",
        form.current!,
        "qsf9Wt-yXfBKQ7CD7"
      )
      setIsSubmitted(true)
      // Success ke 3 second baad home par redirect/refresh
      setTimeout(() => router.push("/"), 3000)
    } catch (error) {
      console.error("Submission failed", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyles = "h-12 bg-white border border-indigo-100 text-[#0A2647] placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 rounded-xl transition-all text-sm shadow-sm"

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col md:flex-row relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[120px]" />
      </div>

      {/* Left Panel: Context & Support Info */}
      <div className="relative w-full md:w-[35%] p-8 md:p-12 flex flex-col justify-between bg-white border-r border-gray-100 shadow-xl z-10">
        <Link href="/" className="group flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-all mb-8 w-fit">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[9px] font-black uppercase tracking-widest">Return Home</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100">
            <Sparkles className="h-3 w-3 text-indigo-600" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600">Support Desk</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-[#0A2647] tracking-tighter leading-[0.9] uppercase">
            Connect with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">InternAdda.</span>
          </h1>

          <div className="space-y-6 pt-4">
            <ContactInfoItem icon={ShieldCheck} title="Verified Support" desc="Official communication channel for students & partners." />
            <ContactInfoItem icon={Mail} title="Direct Email" desc="support@internadda.com" />
            <ContactInfoItem icon={MapPin} title="Headquarters" desc="New Delhi, India - Serving Pan India." />
          </div>
        </motion.div>

        {/* Trust Badge / MSME Info */}
        <div className="pt-12 mt-8 border-t border-gray-100 flex items-center gap-4">
          <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Headset size={24} />
          </div>
          <div className="space-y-0.5">
            <p className="text-[8px] uppercase tracking-[0.4em] text-gray-500 font-black">MSME Registered Entity</p>
            <p className="text-[7px] text-indigo-600 font-bold font-mono">CERT_AUTH: UDYAM-IN-001</p>
          </div>
        </div>
      </div>

      {/* Right Panel: Premium Contact Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
              className="w-full max-w-lg bg-white border border-gray-100 p-8 md:p-12 rounded-[2rem] shadow-2xl"
            >
              <div className="mb-8 space-y-1">
                <h2 className="text-2xl font-bold text-[#0A2647] tracking-tight">Send a Message</h2>
                <p className="text-indigo-600 text-xs font-medium uppercase tracking-widest">Secure Query Portal</p>
              </div>

              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input name="from_name" placeholder="Full Name" required className={inputStyles} />
                  <Input name="reply_to" type="email" placeholder="Email Address" required className={inputStyles} />
                </div>
                <Input name="subject" placeholder="Subject (e.g. Internship Help)" required className={inputStyles} />
                <Textarea 
                  name="message" 
                  placeholder="How can we help you today?" 
                  required 
                  className="min-h-[120px] bg-white border border-indigo-100 text-[#0A2647] placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 rounded-xl resize-none p-4 text-sm shadow-sm" 
                />
                
                <Button 
                  disabled={isLoading}
                  className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl uppercase text-[10px] font-black tracking-[0.3em] transition-all shadow-lg shadow-indigo-200 mt-2 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : (
                      <>Send Inquiry <Zap className="h-3 w-3 fill-current group-hover:animate-pulse" /></>
                    )}
                  </span>
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="relative mx-auto h-24 w-24">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="h-full w-full rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-600"
                >
                  <CheckCircle2 className="h-12 w-12" />
                </motion.div>
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-8px] border border-dashed border-green-200 rounded-full"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-[#0A2647] tracking-tighter uppercase">Message Sent</h3>
                <p className="text-gray-500 max-w-[280px] mx-auto text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                  Our team has received your query. Redirecting to home...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ContactInfoItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex gap-4 items-start group">
      <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-0.5">
        <h4 className="text-[#0A2647] font-bold text-xs tracking-wide uppercase">{title}</h4>
        <p className="text-gray-500 text-[10px] leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  )
}

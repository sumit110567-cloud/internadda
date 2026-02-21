'use client'

import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Tamare EmailJS mathi aa IDs badlavana rehshe
      await emailjs.sendForm(
        'service_usgk4bw', 
        'template_bfh5x2w', 
        formRef.current!, 
        'e4W6YbfZEx81sqmN5'
      )

      setIsSuccess(true)
      toast({
        title: "Message Sent!",
        description: "We'll get back to you shortly.",
      })
      formRef.current?.reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Get in <span className="text-indigo-600">Touch</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Have questions about internships or courses? Our team is here to help you grow your career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-indigo-50 p-8 rounded-3xl space-y-6 border border-indigo-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Email Us</h3>
                  <p className="text-gray-600">support@internadda.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Headquarters</h3>
                  <p className="text-gray-600">New Delhi, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Call Support</h3>
                  <p className="text-gray-600">Available Mon-Sat, 10 AM - 6 PM</p>
                </div>
              </div>
            </div>

            <div className="p-8 border border-gray-100 rounded-3xl bg-gray-50/50">
              <h4 className="font-bold text-gray-900 mb-2">MSME Registered Entity</h4>
              <p className="text-sm text-gray-500 italic">Official Internship Partner for Indian Students.</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100"
          >
            {isSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Thank You!</h2>
                <p className="text-gray-500">Your message has been received. We will contact you soon.</p>
                <Button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 bg-indigo-600 rounded-full"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                    <Input name="user_name" placeholder="Lucky Tiwari" required className="rounded-xl border-gray-200 focus:ring-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                    <Input name="user_email" type="email" placeholder="lucky@example.com" required className="rounded-xl border-gray-200 focus:ring-indigo-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Subject</label>
                  <Input name="subject" placeholder="Internship Inquiry" required className="rounded-xl border-gray-200 focus:ring-indigo-500" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Message</label>
                  <Textarea 
                    name="message" 
                    placeholder="Tell us how we can help you..." 
                    required 
                    className="min-h-[150px] rounded-xl border-gray-200 focus:ring-indigo-500"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : (
                    <span className="flex items-center gap-2">
                      Send Message <Send size={18} />
                    </span>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

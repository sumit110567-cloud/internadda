'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, ShieldCheck, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isError?: boolean
}

export function InternaBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I am Interna, the official AI assistant of Internadda. How can I help you today?"
    }
  ])

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (retryContent?: string) => {
    const messageToSend = retryContent || input.trim()
    if (!messageToSend || isLoading) return

    if (!retryContent) {
      const userMsg: Message = { role: 'user', content: messageToSend }
      setMessages(prev => [...prev, userMsg])
      setInput('')
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/interna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: messageToSend }]
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.reply || "Connection issue")
      }

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.reply }
      ])
    } catch (error: any) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            error.message ||
            "I'm experiencing a temporary issue. Please try again!",
          isError: true
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[200] font-sans">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="mb-4 w-[380px] h-[550px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.2)] border border-indigo-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-5 text-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                    <Image src="/interna.jpg" alt="Interna" fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-bold text-base">Interna AI</p>
                      <ShieldCheck size={14} />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest opacity-80">
                      Official Support
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)}>
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
              <div
                className={cn(
                  "max-w-[85%] p-4 rounded-2xl text-sm shadow-sm",
                  m.role === "user"
                    ? "bg-indigo-600 text-white"
                    : m.isError
                    ? "bg-red-50 text-red-700 border"
                    : "bg-white text-gray-700 border"
                )}
              >
                {m.content.replace(/\*\*/g, '')}
              
                {m.isError && (
                  <button
                    onClick={() => handleSend(messages[i - 1]?.content)}
                    className="flex items-center gap-1 text-xs mt-2 underline"
                  >
                    <RefreshCw size={12} /> Retry
                  </button>
                )}
              </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border p-4 rounded-2xl shadow-sm">
                    Typing...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t">
              <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-2xl">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about your dream internship..."
                  className="flex-1 bg-transparent outline-none text-sm px-2"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  size="icon"
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
                >
                  <Send size={16} />
                </Button>
              </div>
              <p className="text-[9px] text-center text-gray-400 mt-2 uppercase">
                Empowering Students by Lucky Tiwari
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 text-white p-4 rounded-3xl shadow-lg flex items-center gap-3"
      >
        <Sparkles size={20} />
        <span className="font-bold text-sm">Chat with Interna</span>
      </motion.button>
    </div>
  )
}

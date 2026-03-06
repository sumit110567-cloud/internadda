'use client'
// components/InternaBot.tsx

import { useState, useRef, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation' // Added for page restriction
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, RotateCcw } from 'lucide-react'
import Image from 'next/image'

// ── Types ────────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant'
  content: string
  isError?: boolean
  id: number
}

// ── Prompt formatting: raw text → React nodes ─────────────────────────────────
function FormattedMessage({ text }: { text: string }) {
  const lines = text.split('\n')

  const renderInline = (str: string, key: number) => {
    const parts = str.split(/(\*\*[^*]+\*\*)/g)
    return (
      <span key={key}>
        {parts.map((p, i) =>
          p.startsWith('**') && p.endsWith('**')
            ? <strong key={i} className="font-semibold text-slate-900">{p.slice(2, -2)}</strong>
            : <span key={i}>{p}</span>
        )}
      </span>
    )
  }

  const nodes: React.ReactNode[] = []
  let listBuffer: string[] = []
  let listType: 'ol' | 'ul' | null = null
  let nodeKey = 0

  const flushList = () => {
    if (!listBuffer.length) return
    if (listType === 'ol') {
      nodes.push(
        <ol key={nodeKey++} className="list-none space-y-1.5 my-2">
          {listBuffer.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1a1063] text-white text-[9px] font-black flex items-center justify-center mt-0.5">{i + 1}</span>
              <span className="flex-1 leading-relaxed">{renderInline(item, i)}</span>
            </li>
          ))}
        </ol>
      )
    } else {
      nodes.push(
        <ul key={nodeKey++} className="space-y-1.5 my-2">
          {listBuffer.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400 mt-[7px]" />
              <span className="flex-1 leading-relaxed">{renderInline(item, i)}</span>
            </li>
          ))}
        </ul>
      )
    }
    listBuffer = []
    listType = null
  }

  lines.forEach((line, i) => {
    const olMatch = line.match(/^(\d+)\.\s+(.+)/)
    const ulMatch = line.match(/^[-•]\s+(.+)/)

    if (olMatch) {
      if (listType && listType !== 'ol') flushList()
      listType = 'ol'
      listBuffer.push(olMatch[2])
    } else if (ulMatch) {
      if (listType && listType !== 'ul') flushList()
      listType = 'ul'
      listBuffer.push(ulMatch[1])
    } else {
      flushList()
      if (line.trim() === '') {
        if (i > 0) nodes.push(<div key={nodeKey++} className="h-1.5" />)
      } else {
        nodes.push(<p key={nodeKey++} className="leading-relaxed">{renderInline(line, 0)}</p>)
      }
    }
  })
  flushList()

  return <div className="space-y-0.5 text-[13px]">{nodes}</div>
}

// ── Typing indicator dots ─────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-slate-400 block"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1, delay: i * 0.18, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

// ── Quick prompts ─────────────────────────────────────────────────────────────
const QUICK_PROMPTS = [
  'How do I apply for an internship?',
  'Which sectors have internships?',
  'Is it free to use Internadda?',
  'How do I get my marksheet?',
]

// ── Main component ────────────────────────────────────────────────────────────
export function InternaBot() {
  const pathname = usePathname() // Hooks must be at the top
  const [isOpen, setIsOpen]     = useState(false)
  const [input, setInput]       = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [msgId, setMsgId]       = useState(100)

  // Restriction logic: check if the current page should hide the bot
  const isRestrictedPage = 
    pathname.startsWith('/test') || 
    pathname.startsWith('/courses/') || 
    pathname.startsWith('/apply')

  const nextId = () => { setMsgId(p => p + 1); return msgId }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm **Interna**, your dedicated guide at Internadda.\n\nI can help you with:\n1. Finding the right internship for your profile\n2. Application tips and resume advice\n3. Sector-specific career guidance\n4. Platform features and how-tos\n\nWhat can I help you with today?",
    },
  ])

  const scrollRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen) {
      setHasOpened(true)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const send = useCallback(async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || isLoading) return

    const userMsg: Message = { id: nextId(), role: 'user', content }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const res  = await fetch('/api/interna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content }],
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.reply || 'Server error')

      setMessages(prev => [...prev, { id: nextId(), role: 'assistant', content: data.reply }])
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        { id: nextId(), role: 'assistant', content: e.message || 'Something went wrong. Please try again.', isError: true },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages, msgId])

  const retryLast = () => {
    const lastUser = [...messages].reverse().find(m => m.role === 'user')
    if (lastUser) {
      setMessages(prev => prev.filter((_, i) => i < prev.length - 1))
      send(lastUser.content)
    }
  }

  // If we are on a restricted page, do not render anything
  if (isRestrictedPage) return null

  const showQuick = messages.length === 1 && !isLoading

  return (
    <div className="fixed bottom-5 right-5 z-[200]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 flex flex-col"
            style={{
              width: 'min(380px, calc(100vw - 40px))',
              height: 'min(580px, calc(100vh - 100px))',
              background: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 24px 60px rgba(26,16,99,0.14), 0 4px 16px rgba(26,16,99,0.08)',
              border: '1px solid rgba(226,232,240,0.8)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{ background: '#1a1063', padding: '16px 18px 14px', flexShrink: 0 }}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2"
                      style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
                      <Image src="/interna.jpg" alt="Interna" width={40} height={40} className="object-cover" />
                    </div>
                    {/* Online dot */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2"
                      style={{ borderColor: '#1a1063' }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-white font-bold text-[14px] leading-none">Interna</p>
                      <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(196,181,253,0.9)' }}>
                        AI
                      </span>
                    </div>
                    <p className="text-[10px] font-medium mt-0.5" style={{ color: 'rgba(165,180,252,0.85)' }}>
                      Internadda Official Assistant
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}>
                  <X size={15} className="text-white" />
                </button>
              </div>

              {/* Thin accent line */}
              <div className="mt-3 h-px" style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.5), transparent)' }} />
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto"
              style={{
                padding: '16px',
                background: '#f8fafc',
                backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(79,70,229,0.03) 0%, transparent 50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {/* Bot avatar for assistant messages */}
                  {m.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0 mb-0.5"
                      style={{ border: '1.5px solid rgba(226,232,240,0.8)' }}>
                      <Image src="/interna.jpg" alt="Interna" width={24} height={24} className="object-cover" />
                    </div>
                  )}

                  <div style={{ maxWidth: '82%' }}>
                    {m.role === 'assistant' ? (
                      <div style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px 16px 16px 16px',
                        padding: '12px 14px',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                        color: '#475569',
                      }}>
                        {m.isError ? (
                          <div>
                            <p className="text-rose-600 text-[13px]">{m.content}</p>
                            <button onClick={retryLast}
                              className="flex items-center gap-1 text-[11px] text-rose-500 mt-2 font-semibold hover:text-rose-700 transition-colors">
                              <RotateCcw size={10} /> Try again
                            </button>
                          </div>
                        ) : (
                          <FormattedMessage text={m.content} />
                        )}
                      </div>
                    ) : (
                      <div style={{
                        background: '#1a1063',
                        borderRadius: '16px 4px 16px 16px',
                        padding: '11px 14px',
                        color: '#fff',
                        fontSize: '13px',
                        lineHeight: '1.55',
                        boxShadow: '0 2px 8px rgba(26,16,99,0.25)',
                      }}>
                        {m.content}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0"
                      style={{ border: '1.5px solid rgba(226,232,240,0.8)' }}>
                      <Image src="/interna.jpg" alt="" width={24} height={24} className="object-cover" />
                    </div>
                    <div style={{
                      background: '#fff', border: '1px solid #e2e8f0',
                      borderRadius: '4px 16px 16px 16px', padding: '10px 14px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                    }}>
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick prompts */}
              <AnimatePresence>
                {showQuick && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col gap-2 mt-1"
                  >
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Quick questions</p>
                    {QUICK_PROMPTS.map((q, i) => (
                      <motion.button
                        key={q}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        onClick={() => send(q)}
                        className="text-left text-[12.5px] font-medium text-indigo-700 px-3 py-2.5 rounded-xl transition-all"
                        style={{ background: '#eef2ff', border: '1px solid #c7d2fe' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#e0e7ff')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#eef2ff')}
                      >
                        {q}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div style={{
              background: '#fff',
              borderTop: '1px solid #f1f5f9',
              padding: '12px 14px 14px',
              flexShrink: 0,
            }}>
              <div className="flex items-center gap-2"
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '6px 6px 6px 14px',
                  transition: 'border-color 0.2s',
                }}
                onFocus={() => {}}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                  placeholder="Ask about internships…"
                  disabled={isLoading}
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    fontSize: '13px', color: '#334155', fontFamily: 'inherit',
                  }}
                />
                <button
                  onClick={() => send()}
                  disabled={isLoading || !input.trim()}
                  style={{
                    width: '34px', height: '34px', borderRadius: '10px',
                    background: input.trim() ? '#1a1063' : '#e2e8f0',
                    border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s', flexShrink: 0,
                  }}
                >
                  <Send size={14} color={input.trim() ? '#fff' : '#94a3b8'} />
                </button>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-2.5 px-0.5">
                <p style={{ fontSize: '9.5px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  By Lucky Tiwari · Internadda
                </p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <p style={{ fontSize: '9.5px', color: '#94a3b8', fontWeight: 600 }}>AI Online</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger button — circular avatar only ── */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <motion.button
          onClick={() => setIsOpen(p => !p)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          style={{
            width: '60px', height: '60px',
            borderRadius: '50%',
            border: 'none', cursor: 'pointer', padding: 0,
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(26,16,99,0.28), 0 1px 6px rgba(26,16,99,0.15)',
            display: 'block',
            background: '#1a1063',
          }}
          aria-label="Chat with Interna"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close-icon"
                initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7, rotate: 45 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#1a1063',
                }}
              >
                <X size={22} color="#fff" />
              </motion.div>
            ) : (
              <motion.div
                key="avatar"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <Image
                  src="/interna.jpg"
                  alt="Chat with Interna"
                  fill
                  className="object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Online dot */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            style={{
              position: 'absolute', bottom: '2px', right: '2px',
              width: '14px', height: '14px',
              borderRadius: '50%',
              background: '#34d399',
              border: '2.5px solid #fff',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </div>
  )
}

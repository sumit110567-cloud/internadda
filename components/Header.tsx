'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Menu, X, LogOut, ChevronDown, 
  LayoutDashboard, CreditCard, Settings, 
  ShieldCheck, Sparkles, Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [isOpen])

  useEffect(() => setIsOpen(false), [pathname])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  // ✅ Home Added First
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Internships', href: '/internships' },
    { label: 'Courses', href: '/courses' },
    { label: 'About', href: '/about' },
    { label: 'Journal', href: '/blog' },
  ]

  // ✅ Proper active logic (especially for Home)
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className={cn(
      "sticky top-0 z-[100] w-full transition-all duration-500",
      scrolled 
        ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-2 shadow-sm" 
        : "bg-white py-3"
    )}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between h-12">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-9 h-9 overflow-hidden rounded-[1rem] shadow-xl border border-slate-100 transition-transform group-hover:scale-110">
              <Image src="/logo.jpg" alt="Logo" fill className="object-cover" priority />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tighter text-[#0A2647] leading-none uppercase">
                Intern<span className="text-blue-600">Adda</span>
              </span>
              <span className="text-[8px] text-slate-400 font-black uppercase tracking-[0.25em] mt-1">
                India's Adda for Internships
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={cn(
                  "text-[12px] font-black uppercase tracking-widest transition-all",
                  isActive(item.href)
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-[#0A2647]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden md:block">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all">
                      <div className="w-9 h-9 rounded-full bg-[#0A2647] flex items-center justify-center text-[#FFD700] font-black shadow-md text-sm uppercase">
                        {user.user_metadata?.full_name?.[0] || user.email?.[0]}
                      </div>
                      <span className="text-[11px] font-black text-[#0A2647] uppercase tracking-wider">
                        {user.user_metadata?.full_name?.split(' ')[0] || "Student"}
                      </span>
                      <ChevronDown size={14} className="text-slate-400" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent 
                    className="w-64 mt-3 p-2 rounded-[2rem] border-slate-100 shadow-2xl bg-white" 
                    align="end"
                  >
                    <DropdownMenuGroup className="p-1">
                      <DropdownMenuItem 
                        onClick={() => router.push('/dashboard')} 
                        className="p-4 rounded-2xl cursor-pointer hover:bg-blue-50 flex gap-3 items-center"
                      >
                        <LayoutDashboard size={18} className="text-blue-600" />
                        <span className="font-black text-[#0A2647] text-[11px] uppercase">
                          Command Center
                        </span>
                      </DropdownMenuItem>

                      <DropdownMenuItem 
                        onClick={() => router.push('/orders')} 
                        className="p-4 rounded-2xl cursor-pointer hover:bg-blue-50 flex gap-3 items-center"
                      >
                        <CreditCard size={18} className="text-blue-600" />
                        <span className="font-black text-[#0A2647] text-[11px] uppercase">
                          Transaction Center
                        </span>
                      </DropdownMenuItem>

                      <DropdownMenuItem 
                        onClick={() => router.push('/profile')} 
                        className="p-4 rounded-2xl cursor-pointer hover:bg-blue-50 flex gap-3 items-center"
                      >
                        <Settings size={18} className="text-blue-600" />
                        <span className="font-black text-[#0A2647] text-[11px] uppercase">
                          Settings
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="bg-slate-50" />

                    <DropdownMenuItem 
                      onClick={handleSignOut} 
                      className="p-4 rounded-2xl cursor-pointer bg-red-50/50 text-red-600 flex gap-3 items-center mt-1"
                    >
                      <LogOut size={18} />
                      <span className="font-black text-[11px] uppercase">
                        Secure Logout
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href="/auth/signup" className="hidden md:block">
                <Button className="bg-[#0A2647] text-white font-black rounded-full px-8 py-4 text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-900/10">
                  Get Verified
                </Button>
              </Link>
            )}

            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-3 bg-slate-50 rounded-2xl text-[#0A2647] lg:hidden active:scale-90 transition-transform"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">

              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    className={cn(
                      "px-6 py-4 rounded-2xl text-lg font-black transition-all flex items-center justify-between",
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-[#0A2647] hover:bg-slate-50"
                    )}
                  >
                    {item.label}
                    <Zap size={18} className={cn(
                      "transition-opacity", 
                      isActive(item.href) ? "opacity-100" : "opacity-0"
                    )} />
                  </Link>
                ))}
              </nav>

              <div className="pt-6 border-t border-slate-50">
                {user ? (
                  <Button 
                    onClick={handleSignOut} 
                    variant="outline" 
                    className="w-full text-red-600 py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] bg-red-50/30 border-red-100"
                  >
                    <LogOut className="mr-2" size={16} /> Secure Logout
                  </Button>
                ) : (
                  <Link href="/auth/signup" className="w-full">
                    <Button className="w-full bg-[#0A2647] py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs">
                      Join InternAdda
                    </Button>
                  </Link>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

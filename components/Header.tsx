'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Menu, X, LogOut, User, ChevronDown, 
  LayoutDashboard, CreditCard, Settings, 
  Star, ShieldCheck, Sparkles, Briefcase,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

  // High-performance scroll listener for Glassmorphism effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [pathname])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Internships', href: '/internships' },
    { label: 'Courses', href: '/courses' },
    { label: 'About Us', href: '/about' },
  ]

  return (
    <header className={cn(
      "sticky top-0 z-[100] w-full transition-all duration-500 border-b",
      scrolled 
        ? "bg-white/70 backdrop-blur-2xl border-slate-200/60 py-2 shadow-sm" 
        : "bg-white border-transparent py-4"
    )}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section - Premium Frame */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-11 h-11 overflow-hidden rounded-[1.2rem] shadow-2xl border-2 border-white transition-all group-hover:scale-110 group-hover:rotate-3">
              <Image src="/logo.jpg" alt="InternAdda Logo" fill className="object-cover" priority />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter text-[#0A2647] leading-none">
                INTERN<span className="text-blue-600">ADDA</span>
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <ShieldCheck size={10} className="text-emerald-500" />
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">Gold Standard</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav - Focused Typography */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={cn(
                  "text-[13px] font-black uppercase tracking-widest transition-all relative group",
                  pathname === item.href ? "text-blue-600" : "text-slate-500 hover:text-[#0A2647]"
                )}
              >
                {item.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300",
                  pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </nav>

          {/* User Profile / Auth Section */}
          <div className="hidden md:flex items-center gap-5">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 p-1.5 pr-5 rounded-full bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-blue-100 transition-all outline-none group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A2647] to-[#144272] flex items-center justify-center text-[#FFD700] font-black shadow-lg">
                      {user.user_metadata?.full_name?.[0] || "L"}
                    </div>
                    <div className="text-left hidden xl:block">
                      <p className="text-[11px] font-black text-[#0A2647] leading-tight uppercase tracking-wider">{user.user_metadata?.full_name || "Lucky Tiwari"}</p>
                      <p className="text-[9px] text-blue-600 font-black uppercase tracking-widest flex items-center gap-1">
                        <Sparkles size={10} /> Candidate
                      </p>
                    </div>
                    <ChevronDown size={14} className="text-slate-400 transition-transform group-data-[state=open]:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-80 mt-4 p-4 rounded-[2.5rem] border-slate-100 shadow-2xl bg-white/95 backdrop-blur-xl animate-in zoom-in-95 duration-300" align="end">
                  <DropdownMenuLabel className="p-5 bg-[#0A2647] rounded-[2rem] mb-3 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 blur-2xl" />
                    <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-1">Accessing as</p>
                    <p className="text-sm font-black truncate">{user.email}</p>
                    <div className="flex items-center gap-2 mt-3 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified DU Account
                    </div>
                  </DropdownMenuLabel>
                  
                  <DropdownMenuGroup className="space-y-1">
                    <DropdownMenuItem onClick={() => router.push('/dashboard')} className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-blue-50 transition-all group">
                      <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <LayoutDashboard size={18} />
                      </div>
                      <span className="font-black text-[#0A2647] text-[12px] uppercase tracking-wide">Command Center</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/orders')} className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-blue-50 transition-all group">
                      <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-[#0A2647] group-hover:text-white transition-colors">
                        <CreditCard size={18} />
                      </div>
                      <span className="font-black text-[#0A2647] text-[12px] uppercase tracking-wide">Transactions</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  
                  <DropdownMenuSeparator className="my-3 bg-slate-100" />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer bg-red-50/50 text-red-600 hover:bg-red-50 transition-all">
                    <LogOut size={18} />
                    <span className="font-black text-[12px] uppercase tracking-wide">Secure Exit</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth/signin">
                  <Button variant="ghost" className="text-[12px] font-black uppercase tracking-widest text-[#0A2647]">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-[#0A2647] text-white font-black rounded-full px-8 py-6 text-[12px] uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:scale-105 transition-all">Join Platform</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden p-3 bg-slate-100 rounded-2xl text-[#0A2647] active:scale-90 transition-transform"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* --- FULL SCREEN MOBILE HAMBURGER --- */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:hidden fixed inset-0 top-0 bg-white z-[200] flex flex-col p-6 pt-24"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 p-3 bg-slate-100 rounded-2xl">
              <X size={24} />
            </button>

            {user ? (
              <div className="p-8 bg-gradient-to-br from-[#0A2647] to-[#144272] rounded-[3rem] text-white mb-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 blur-3xl rounded-full" />
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 backdrop-blur-xl flex items-center justify-center text-3xl font-black text-[#FFD700] border border-white/10 shadow-inner">
                    {user.user_metadata?.full_name?.[0] || "L"}
                  </div>
                  <div>
                    <h3 className="font-black text-xl tracking-tight leading-none mb-1">{user.user_metadata?.full_name || "Lucky Tiwari"}</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Active DU Candidate</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5">
                  <Link href="/dashboard" className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-[1.5rem] hover:bg-white/10 transition-colors">
                    <LayoutDashboard size={22} className="text-[#FFD700]" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Portal</span>
                  </Link>
                  <Link href="/orders" className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-[1.5rem] hover:bg-white/10 transition-colors">
                    <CreditCard size={22} className="text-[#FFD700]" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Bills</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mb-10 p-1 bg-slate-50 rounded-[2.5rem]">
                <Link href="/auth/signup" className="w-full">
                  <Button className="w-full bg-[#0A2647] py-8 rounded-[2rem] font-black uppercase tracking-widest shadow-2xl">Create Free Account</Button>
                </Link>
              </div>
            )}
            
            <div className="flex flex-col gap-1">
              <p className="px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Ecosystem Navigation</p>
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={cn(
                    "px-8 py-5 rounded-3xl text-xl font-black transition-all flex items-center justify-between group",
                    pathname === item.href ? "bg-blue-50 text-blue-600 shadow-sm" : "text-[#0A2647] hover:bg-slate-50"
                  )}
                >
                  {item.label}
                  <Zap size={18} className={cn("transition-opacity", pathname === item.href ? "opacity-100" : "opacity-0")} />
                </Link>
              ))}
            </div>

            <div className="mt-auto pb-8 space-y-4">
              <div className="flex items-center justify-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-6">
                <ShieldCheck size={14} /> MSME Registered Ecosystem
              </div>
              {user && (
                <Button 
                  onClick={handleSignOut} 
                  variant="ghost" 
                  className="w-full text-red-600 py-8 rounded-[2rem] font-black uppercase tracking-widest bg-red-50/30 border border-red-100"
                >
                  Secure Logout
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

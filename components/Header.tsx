'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Menu, X, LogOut, ChevronDown, 
  LayoutDashboard, CreditCard, ShieldCheck, Zap, User
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setIsOpen(false), [pathname])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Internships', href: '/internships' },
    { label: 'Courses', href: '/courses' },
    { label: 'About', href: '/about' },
    { label: 'Journal', href: '/blog' },
  ]

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname.startsWith(href)

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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const active = isActive(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-2 py-1 text-[12px] font-black uppercase tracking-widest transition-all"
                >
                  <span
                    className={cn(
                      "transition-all duration-300",
                      active
                        ? "text-blue-600 drop-shadow-[0_0_6px_rgba(37,99,235,0.6)]"
                        : "text-slate-500 hover:text-[#0A2647]"
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Underline Glow */}
                  <span
                    className={cn(
                      "absolute left-0 -bottom-1 h-[2px] w-full rounded-full transition-all duration-300",
                      active
                        ? "bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.8)]"
                        : "bg-transparent"
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden md:block">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all">
                      <div className="w-9 h-9 rounded-full bg-[#0A2647] flex items-center justify-center text-[#FFD700] font-black shadow-md text-sm uppercase">
                        {user.user_metadata?.full_name?.[0] || "L"}
                      </div>
                      <span className="text-[11px] font-black text-[#0A2647] uppercase tracking-wider">
                        {user.user_metadata?.full_name?.split(' ')[0] || "Lucky"}
                      </span>
                      <ChevronDown size={14} className="text-slate-400" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent 
                    className="w-64 mt-3 p-2 rounded-[2rem] border-slate-100 shadow-2xl bg-white" 
                    align="end"
                  >
                    <DropdownMenuLabel className="p-4 bg-slate-50 rounded-[1.5rem] mb-2">
                       <p className="text-[9px] font-black text-slate-400 uppercase mb-1">DU Candidate</p>
                       <p className="text-xs font-black text-[#0A2647] truncate">{user.email}</p>
                    </DropdownMenuLabel>

                    <DropdownMenuGroup className="p-1">
                      <DropdownMenuItem 
                        onClick={() => router.push('/profile')} 
                        className="p-4 rounded-2xl cursor-pointer hover:bg-blue-50 flex gap-3 items-center"
                      >
                        <User size={18} className="text-blue-600" />
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
                          Transactions
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="bg-slate-50" />

                    <DropdownMenuItem 
                      onClick={handleSignOut} 
                      className="p-4 rounded-2xl cursor-pointer bg-red-50 text-red-600 flex gap-3 items-center mt-1"
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
                <Button className="bg-[#0A2647] text-white font-black rounded-full px-8 py-3 text-[11px] uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:scale-105 transition-all">
                  Get Verified
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-3 bg-slate-50 rounded-2xl lg:hidden active:scale-90 transition-transform"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}

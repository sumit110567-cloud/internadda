'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, LogOut, User, ChevronDown, LayoutDashboard, CreditCard, Settings, Star, ShieldCheck } from 'lucide-react'
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
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

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
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-2xl shadow-lg border-2 border-slate-50 transition-transform group-hover:scale-105">
              <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter text-[#0A2647]">INTERN<span className="text-blue-600">ADDA</span></span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">India's Largest Ecosystem</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={cn("text-sm font-bold transition-colors", pathname === item.href ? "text-blue-600" : "text-slate-500 hover:text-[#0A2647]")}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Profile / Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 p-1.5 pr-4 rounded-[1.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all outline-none group">
                    <div className="w-10 h-10 rounded-xl bg-[#0A2647] flex items-center justify-center text-[#FFD700] font-black shadow-lg">
                      {user.user_metadata?.full_name?.[0] || "U"}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-black text-[#0A2647] leading-tight">{user.user_metadata?.full_name || "Lucky Tiwari"}</p>
                      <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Verified Student</p>
                    </div>
                    <ChevronDown size={14} className="text-slate-400 ml-1 transition-transform group-data-[state=open]:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 mt-4 p-3 rounded-[2.5rem] border-slate-100 shadow-2xl animate-in zoom-in-95 duration-200" align="end">
                  <DropdownMenuLabel className="p-4 bg-slate-50 rounded-[2rem] mb-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-sm font-black text-[#0A2647] truncate">{user.email}</p>
                    <div className="flex items-center gap-2 mt-2 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                      <ShieldCheck size={12} /> Account Secured
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuGroup className="space-y-1">
                    <DropdownMenuItem onClick={() => router.push('/dashboard')} className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer hover:bg-blue-50 transition-colors">
                      <LayoutDashboard size={18} className="text-blue-600" />
                      <span className="font-bold text-[#0A2647]">Student Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/orders')} className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer hover:bg-blue-50 transition-colors">
                      <CreditCard size={18} className="text-blue-600" />
                      <span className="font-bold text-[#0A2647]">Payments & Orders</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/profile')} className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer hover:bg-blue-50 transition-colors">
                      <Settings size={18} className="text-blue-600" />
                      <span className="font-bold text-[#0A2647]">Profile Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="my-2 bg-slate-100" />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                    <LogOut size={18} />
                    <span className="font-bold">Secure Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/signup"><Button className="bg-[#0A2647] text-white font-black rounded-2xl px-8 py-6">Get Started</Button></Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-3 bg-slate-50 rounded-2xl text-[#0A2647]">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Hamburger Menu Upgrade */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-20 bg-white z-[60] p-6 flex flex-col animate-in slide-in-from-right duration-300">
            {user && (
              <div className="p-6 bg-[#0A2647] rounded-[2.5rem] text-white mb-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 blur-3xl" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl font-black text-[#FFD700]">
                    {user.user_metadata?.full_name?.[0] || "L"}
                  </div>
                  <div>
                    <h3 className="font-black text-lg">{user.user_metadata?.full_name || "Lucky Tiwari"}</h3>
                    <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Active DU Student</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl">
                    <LayoutDashboard size={20} className="text-[#FFD700]" />
                    <span className="text-[10px] font-black uppercase">Dashboard</span>
                  </Link>
                  <Link href="/orders" onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl">
                    <CreditCard size={20} className="text-[#FFD700]" />
                    <span className="text-[10px] font-black uppercase">Payments</span>
                  </Link>
                </div>
              </div>
            )}
            
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={cn("px-6 py-4 rounded-2xl text-lg font-black transition-all", pathname === item.href ? "bg-blue-50 text-blue-600" : "text-slate-500")}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pb-10">
              {user ? (
                <Button onClick={handleSignOut} variant="outline" className="w-full border-red-100 text-red-600 py-8 rounded-[2rem] font-black text-lg bg-red-50/50">
                  <LogOut className="mr-2" /> Secure Sign Out
                </Button>
              ) : (
                <Link href="/auth/signup" className="w-full"><Button className="w-full bg-[#0A2647] py-8 rounded-[2rem] font-black text-lg">Join InternAdda</Button></Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

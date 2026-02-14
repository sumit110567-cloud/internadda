'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, LogOut, User, ChevronDown, Settings, CreditCard, LayoutDashboard } from 'lucide-react'
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
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="InternAdda Home">
            <div className="relative w-12 h-12 overflow-hidden rounded-2xl shadow-lg transition-all group-hover:scale-105 group-hover:rotate-3 border-2 border-slate-50">
              <Image 
                src="/logo.jpg" 
                alt="InternAdda Logo" 
                fill 
                className="object-cover"
                priority 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter leading-none text-[#0A2647]">
                INTERN<span className="text-blue-600">ADDA</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">
                The Gold Standard
              </span>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-bold transition-all duration-300 relative py-2",
                    isActive 
                      ? "text-[#0A2647] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#FFD700] after:rounded-full" 
                      : "text-slate-500 hover:text-[#0A2647]"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Action Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all outline-none group">
                    <div className="w-10 h-10 rounded-xl bg-[#0A2647] flex items-center justify-center text-white font-black shadow-md shadow-blue-900/10 transition-transform group-hover:scale-105">
                      {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-black text-[#0A2647] leading-tight">
                        {user.user_metadata?.full_name || "Active Student"}
                      </p>
                      <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                        My Profile
                      </p>
                    </div>
                    <ChevronDown size={14} className="text-slate-400 ml-2" />
                  </button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-64 mt-4 p-2 rounded-[2rem] border-slate-100 shadow-2xl animate-in zoom-in-95 duration-200" align="end">
                  <DropdownMenuLabel className="px-4 py-4">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Account Holder</p>
                    <p className="text-sm font-black text-[#0A2647] truncate">{user.email}</p>
                    <p className="text-[10px] text-blue-600 font-bold mt-1">{user.user_metadata?.phone || "No Mobile Linked"}</p>
                  </DropdownMenuLabel>
                  
                  <DropdownMenuSeparator className="bg-slate-50" />
                  
                  <DropdownMenuGroup className="p-1">
                    <Link href="/dashboard">
                      <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                        <LayoutDashboard size={18} className="text-slate-400" />
                        <span className="font-bold text-[#0A2647] text-sm">Student Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/profile">
                      <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                        <User size={18} className="text-slate-400" />
                        <span className="font-bold text-[#0A2647] text-sm">Update Profile Details</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/orders">
                      <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                        <CreditCard size={18} className="text-slate-400" />
                        <span className="font-bold text-[#0A2647] text-sm">Payments & History</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  
                  <DropdownMenuSeparator className="bg-slate-50" />
                  
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="flex items-center gap-3 p-3 m-1 rounded-xl cursor-pointer bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="font-bold text-sm">Secure Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth/signin">
                  <Button variant="ghost" className="font-bold text-[#0A2647] hover:bg-slate-50 rounded-xl px-6 py-5">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-[#0A2647] hover:bg-blue-900 text-white font-black px-8 py-6 rounded-2xl shadow-xl shadow-blue-900/10">
                    Join Ecosystem
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 bg-slate-50 rounded-2xl text-[#0A2647] border border-slate-100 transition-all active:scale-95"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Sidebar */}
        {isOpen && (
          <nav className="md:hidden border-t border-slate-100 py-6 space-y-2 animate-in slide-in-from-top duration-300">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-4 py-4 text-sm font-black rounded-2xl transition-all",
                  pathname === item.href 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-slate-500 hover:bg-slate-50"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-6 border-t border-slate-100 px-4 space-y-4">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-[#0A2647] flex items-center justify-center text-white font-bold">
                      {user.user_metadata?.full_name?.[0] || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#0A2647]">{user.user_metadata?.full_name || "Student"}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{user.phone || "No Mobile"}</p>
                    </div>
                  </div>
                  <Button onClick={handleSignOut} className="w-full bg-red-50 text-red-600 hover:bg-red-100 py-7 rounded-2xl font-black">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/auth/signin" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-slate-200 py-7 rounded-2xl font-bold">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-[#0A2647] text-white py-7 rounded-2xl font-black">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

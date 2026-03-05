'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  Menu,
  X,
  LogOut,
  ChevronDown,
  CreditCard,
  User,
  Zap,
  ShieldCheck,
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
} from '@/components/ui/dropdown-menu'
import { motion, AnimatePresence } from 'framer-motion'

const announcementMessages = [
  { icon: '✨', text: 'DREAMSTART — Extra 10% off on skill assessment fees', cta: 'Claim Now', href: '/courses' },
  { icon: '⚡', text: '131 students applied to internships today', cta: 'Browse Roles', href: '/internships' },
  { icon: '🚀', text: 'New: Python Developer roles just went live', cta: 'View Now', href: '/internships' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [announcementIndex, setAnnouncementIndex] = useState(0)
  const [showAnnouncement, setShowAnnouncement] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setIsOpen(false), [pathname])

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex(i => (i + 1) % announcementMessages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

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
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const current = announcementMessages[announcementIndex]

  return (
    <div className="sticky top-0 z-[100] w-full">

      {/* ── Announcement Bar ── */}
      <AnimatePresence>
        {showAnnouncement && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1a1063] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center gap-3 py-2 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={announcementIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-center"
                  >
                    <span className="text-sm">{current.icon}</span>
                    <span className="text-white/80 text-xs font-medium hidden sm:inline">
                      {current.text}
                    </span>
                    <span className="text-white/80 text-xs font-medium sm:hidden">
                      {current.text.length > 40 ? current.text.slice(0, 40) + '…' : current.text}
                    </span>
                    <Link
                      href={current.href}
                      className="text-xs font-black text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors whitespace-nowrap"
                    >
                      {current.cta} →
                    </Link>
                  </motion.div>
                </AnimatePresence>
                <button
                  onClick={() => setShowAnnouncement(false)}
                  className="absolute right-0 text-white/30 hover:text-white/70 transition-colors p-1"
                  aria-label="Dismiss"
                >
                  <X size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Header ── */}
      <header
        className={cn(
          'w-full transition-all duration-500',
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm shadow-indigo-50/50 py-2'
            : 'bg-white border-b border-gray-100/60 py-3'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative w-9 h-9 overflow-hidden rounded-xl shadow-md border border-indigo-100 transition-transform group-hover:scale-105">
                <Image src="/logo.jpg" alt="Internadda" fill className="object-cover" priority />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-[17px] tracking-tight text-gray-900 leading-none">
                  Intern<span className="text-indigo-600">adda</span>
                </span>
                <span className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.15em] mt-0.5">
                  India's Internship Hub
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200',
                      active
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl bg-indigo-50 -z-10"
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-3">

              {/* Trust badge — desktop only */}
              <div className="hidden xl:flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1.5">
                <ShieldCheck size={12} className="text-emerald-600" />
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wide">MSME Verified</span>
              </div>

              {user ? (
                <div className="hidden md:block">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2.5 p-1.5 pr-4 rounded-full bg-gray-50 border border-gray-200 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-sm uppercase shadow-sm">
                          {user.user_metadata?.full_name?.[0] || 'U'}
                        </div>
                        <span className="text-xs font-bold text-gray-700">
                          {user.user_metadata?.full_name?.split(' ')[0] || 'User'}
                        </span>
                        <ChevronDown size={13} className="text-gray-400" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className="w-64 mt-3 p-2 rounded-2xl border-gray-100 shadow-2xl shadow-gray-200/50 bg-white"
                      align="end"
                    >
                      <DropdownMenuLabel className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl mb-2 border border-indigo-100/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-base uppercase shadow-md">
                            {user.user_metadata?.full_name?.[0] || 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-black text-gray-900">
                              {user.user_metadata?.full_name || 'Student'}
                            </p>
                            <p className="text-[11px] text-gray-400 font-medium truncate max-w-[150px]">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuLabel>

                      <DropdownMenuGroup className="p-1 space-y-0.5">
                        <DropdownMenuItem
                          onClick={() => router.push('/profile')}
                          className="p-3 rounded-xl cursor-pointer hover:bg-indigo-50 flex gap-3 items-center"
                        >
                          <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <User size={14} className="text-indigo-600" />
                          </div>
                          <span className="text-sm font-semibold text-gray-700">Profile</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => router.push('/orders')}
                          className="p-3 rounded-xl cursor-pointer hover:bg-indigo-50 flex gap-3 items-center"
                        >
                          <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CreditCard size={14} className="text-indigo-600" />
                          </div>
                          <span className="text-sm font-semibold text-gray-700">Orders</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator className="bg-gray-100 my-1.5" />

                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="p-3 rounded-xl cursor-pointer hover:bg-red-50 flex gap-3 items-center"
                      >
                        <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <LogOut size={14} className="text-red-500" />
                        </div>
                        <span className="text-sm font-semibold text-red-600">Sign out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/auth/signin">
                    <Button
                      variant="ghost"
                      className="text-gray-600 hover:text-gray-900 font-bold text-sm px-4 rounded-xl hover:bg-gray-50"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="bg-[#1a1063] hover:bg-indigo-900 text-white font-black rounded-xl px-5 py-2.5 text-sm shadow-lg shadow-indigo-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5">
                      <Zap size={13} className="fill-amber-400 text-amber-400" />
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl lg:hidden active:scale-95 transition-transform"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isOpen ? <X size={19} /> : <Menu size={19} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl shadow-gray-100/80 px-5 pt-4 pb-6 z-50 space-y-1"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center py-3 px-3 rounded-xl text-sm font-bold transition-colors',
                    isActive(item.href)
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  {item.label}
                </Link>
              ))}

              {/* Trust badge mobile */}
              <div className="flex items-center gap-2 px-3 pt-2 pb-1">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span className="text-[11px] font-black text-emerald-700 uppercase tracking-wide">MSME Verified · Govt. of India</span>
              </div>

              <div className="pt-3 border-t border-gray-100">
                {!user ? (
                  <div className="grid grid-cols-2 gap-2.5">
                    <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full rounded-xl font-bold text-sm border-gray-200 h-11">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-[#1a1063] hover:bg-indigo-900 text-white font-black rounded-xl text-sm h-11 flex items-center gap-1.5">
                        <Zap size={13} className="fill-amber-400 text-amber-400" />
                        Get Started
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl text-sm font-bold text-gray-700 border border-gray-100"
                    >
                      <User size={15} /> Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center justify-center gap-2 p-3 bg-red-50 rounded-xl text-sm font-bold text-red-600 border border-red-100"
                    >
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  )
}

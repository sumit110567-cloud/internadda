'use client'

// components/Header.tsx

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  Menu, X, LogOut, ChevronDown,
  CreditCard, User, Zap, ShieldCheck, ArrowRight,
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

// ── Announcement ticker ───────────────────────────────────────────────────────
const ANNOUNCEMENTS = [
  { icon: '✨', text: 'DREAMSTART — Extra 10% off on skill assessment fees', cta: 'Claim Now', href: '/courses' },
  { icon: '⚡', text: '131 students applied to internships today', cta: 'Browse Roles', href: '/internships' },
  { icon: '🚀', text: 'New: Python Developer roles just went live', cta: 'View Now', href: '/internships' },
]

// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Home',        href: '/' },
  { label: 'Internships', href: '/internships' },
  { label: 'Courses',     href: '/courses' },
  { label: 'Journal',     href: '/blog' },
  { label: 'About',       href: '/about' },
]

export function Header() {
  const [mobileOpen,        setMobileOpen]        = useState(false)
  const [scrolled,          setScrolled]          = useState(false)
  const [announcementIdx,   setAnnouncementIdx]   = useState(0)
  const [showAnnouncement,  setShowAnnouncement]  = useState(true)

  const pathname  = usePathname()
  const router    = useRouter()
  const { user, signOut } = useAuth()

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname])

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Rotate announcement
  useEffect(() => {
    const t = setInterval(() => setAnnouncementIdx(i => (i + 1) % ANNOUNCEMENTS.length), 4500)
    return () => clearInterval(t)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const ann = ANNOUNCEMENTS[announcementIdx]
  const userInitial = (user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()
  const userName    = user?.user_metadata?.full_name?.split(' ')[0] || 'Account'

  return (
    <div className="sticky top-0 z-[100] w-full">

      {/* ── Announcement bar ─────────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {showAnnouncement && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="bg-[#1a1063] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-center h-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={announcementIdx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm leading-none">{ann.icon}</span>
                    <span className="text-white/75 text-[11.5px] font-medium hidden sm:inline tracking-wide">
                      {ann.text}
                    </span>
                    <span className="text-white/75 text-[11px] font-medium sm:hidden">
                      {ann.text.length > 38 ? ann.text.slice(0, 38) + '…' : ann.text}
                    </span>
                    <Link
                      href={ann.href}
                      className="flex items-center gap-0.5 text-[11.5px] font-bold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      {ann.cta} <ArrowRight size={10} />
                    </Link>
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={() => setShowAnnouncement(false)}
                  aria-label="Close announcement"
                  className="absolute right-0 text-white/30 hover:text-white/60 transition-colors p-1 rounded"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main header ──────────────────────────────────────────────────── */}
      <header
        className={cn(
          'w-full bg-white transition-all duration-300',
          scrolled
            ? 'shadow-[0_1px_24px_rgba(0,0,0,0.07)] border-b border-gray-100/80'
            : 'border-b border-gray-100'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px]">

            {/* ── Logo ─────────────────────────────────────────────────── */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-indigo-100 shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                <Image src="/logo.jpg" alt="InternAdda" fill className="object-cover" priority sizes="32px" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[16px] font-black tracking-tight text-gray-900">
                  Intern<span className="text-indigo-600">adda</span>
                </span>
                <span className="text-[8.5px] font-semibold text-gray-400 tracking-[0.12em] uppercase mt-0.5">
                  India's Internship Hub
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ──────────────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative px-3.5 py-2 rounded-lg text-[12.5px] font-semibold tracking-wide transition-all duration-150',
                      active
                        ? 'text-indigo-700 bg-indigo-50/80'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-indigo-50/80 -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* ── Right side ───────────────────────────────────────────── */}
            <div className="flex items-center gap-2.5">

              {/* MSME badge — xl+ only */}
              <div className="hidden xl:flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1.5">
                <ShieldCheck size={11} className="text-emerald-600 flex-shrink-0" />
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-[0.1em] whitespace-nowrap">
                  MSME Verified
                </span>
              </div>

              {/* Authenticated user dropdown */}
              {user ? (
                <div className="hidden md:block">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-white hover:border-indigo-200 hover:shadow-[0_2px_12px_rgba(99,102,241,0.12)] transition-all duration-200 outline-none">
                        {/* Avatar */}
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[11px] font-black shadow-sm flex-shrink-0">
                          {userInitial}
                        </div>
                        <span className="text-[12.5px] font-semibold text-gray-700">{userName}</span>
                        <ChevronDown size={12} className="text-gray-400" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className="w-60 mt-2.5 p-1.5 rounded-2xl border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.12)] bg-white"
                      align="end"
                      sideOffset={6}
                    >
                      {/* User info */}
                      <DropdownMenuLabel className="px-3.5 py-3 mb-1">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-black flex-shrink-0 shadow-sm">
                            {userInitial}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[13px] font-bold text-gray-900 truncate">
                              {user?.user_metadata?.full_name || 'Student'}
                            </p>
                            <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
                          </div>
                        </div>
                      </DropdownMenuLabel>

                      <DropdownMenuSeparator className="bg-gray-100 mx-1" />

                      <DropdownMenuGroup className="py-1 space-y-0.5">
                        <DropdownMenuItem
                          onClick={() => router.push('/profile')}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                        >
                          <User size={14} className="text-gray-400 flex-shrink-0" />
                          <span className="text-[13px] font-medium text-gray-700">My Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push('/orders')}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                        >
                          <CreditCard size={14} className="text-gray-400 flex-shrink-0" />
                          <span className="text-[13px] font-medium text-gray-700">Orders</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator className="bg-gray-100 mx-1" />

                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-red-50 focus:bg-red-50 mt-0.5"
                      >
                        <LogOut size={14} className="text-red-400 flex-shrink-0" />
                        <span className="text-[13px] font-medium text-red-600">Sign out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                /* Guest buttons */
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/auth/signin">
                    <Button
                      variant="ghost"
                      className="h-9 px-4 text-[13px] font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button
                      className="h-9 px-4 bg-[#1a1063] hover:bg-indigo-900 text-white text-[13px] font-bold rounded-xl shadow-sm shadow-indigo-900/20 hover:shadow-indigo-900/30 transition-all gap-1.5"
                    >
                      <Zap size={12} className="fill-amber-400 text-amber-400" />
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(v => !v)}
                aria-label="Toggle navigation"
                aria-expanded={mobileOpen}
                className="lg:hidden flex items-center justify-center w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors active:scale-95"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mobileOpen ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  90,  opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    {mobileOpen ? <X size={17} /> : <Menu size={17} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile menu ──────────────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{   opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="lg:hidden bg-white border-t border-gray-100 shadow-lg shadow-gray-100/60"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-0.5">

                {/* Nav links */}
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center justify-between w-full px-4 py-3 rounded-xl text-[13.5px] font-semibold transition-colors',
                        isActive(item.href)
                          ? 'text-indigo-700 bg-indigo-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      )}
                    >
                      {item.label}
                      {isActive(item.href) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      )}
                    </Link>
                  </motion.div>
                ))}

                {/* MSME badge */}
                <div className="flex items-center gap-2 px-4 py-2">
                  <ShieldCheck size={12} className="text-emerald-600" />
                  <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-[0.1em]">
                    MSME Verified · Govt. of India
                  </span>
                </div>

                {/* Auth buttons */}
                <div className="pt-2 border-t border-gray-100 mt-2">
                  {user ? (
                    <div className="flex gap-2">
                      <Link
                        href="/profile"
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 flex items-center justify-center gap-2 h-10 bg-gray-50 border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-700"
                      >
                        <User size={14} /> Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex-1 flex items-center justify-center gap-2 h-10 bg-red-50 border border-red-100 rounded-xl text-[13px] font-semibold text-red-600"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Link href="/auth/signin" onClick={() => setMobileOpen(false)} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full h-10 text-[13px] font-semibold rounded-xl border-gray-200"
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/auth/signup" onClick={() => setMobileOpen(false)} className="flex-1">
                        <Button
                          className="w-full h-10 bg-[#1a1063] hover:bg-indigo-900 text-white text-[13px] font-bold rounded-xl gap-1.5"
                        >
                          <Zap size={12} className="fill-amber-400 text-amber-400" />
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  )
}

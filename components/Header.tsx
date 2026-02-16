// components/Header.tsx
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

  // Close mobile menu when route changes
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
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'sticky top-0 z-[100] w-full transition-all duration-500',
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-indigo-100/50 py-2 shadow-sm'
          : 'bg-white py-3'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 overflow-hidden rounded-xl shadow-md border border-indigo-100 transition-transform group-hover:scale-110">
              <Image
                src="/logo.jpg"
                alt="Internadda"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight text-gray-900 leading-none">
                Intern<span className="text-indigo-600">adda</span>
              </span>
              <span className="text-[8px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                India's Internship Hub
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
                  className="relative px-2 py-1 text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <span
                    className={cn(
                      'transition-colors duration-300',
                      active
                        ? 'text-indigo-600'
                        : 'text-gray-500 hover:text-gray-900'
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator */}
                  <span
                    className={cn(
                      'absolute left-0 -bottom-1 h-0.5 w-full rounded-full transition-all duration-300',
                      active
                        ? 'bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]'
                        : 'bg-transparent'
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
                    <button className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                      <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm text-sm uppercase">
                        {user.user_metadata?.full_name?.[0] || 'U'}
                      </div>
                      <span className="text-xs font-semibold text-gray-700">
                        {user.user_metadata?.full_name?.split(' ')[0] || 'User'}
                      </span>
                      <ChevronDown size={14} className="text-gray-400" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="w-64 mt-3 p-2 rounded-2xl border-gray-100 shadow-xl bg-white"
                    align="end"
                  >
                    <DropdownMenuLabel className="p-4 bg-gray-50 rounded-xl mb-2">
                      <p className="text-xs font-medium text-gray-500 mb-1">
                        {user.email}
                      </p>
                      <p className="text-xs font-semibold text-gray-900">
                        {user.user_metadata?.full_name || 'Student'}
                      </p>
                    </DropdownMenuLabel>

                    <DropdownMenuGroup className="p-1">
                      <DropdownMenuItem
                        onClick={() => router.push('/profile')}
                        className="p-3 rounded-xl cursor-pointer hover:bg-indigo-50 flex gap-3 items-center"
                      >
                        <User size={16} className="text-indigo-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Profile
                        </span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => router.push('/orders')}
                        className="p-3 rounded-xl cursor-pointer hover:bg-indigo-50 flex gap-3 items-center"
                      >
                        <CreditCard size={16} className="text-indigo-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Orders
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="bg-gray-100" />

                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="p-3 rounded-xl cursor-pointer bg-red-50 text-red-600 flex gap-3 items-center mt-1 hover:bg-red-100"
                    >
                      <LogOut size={16} />
                      <span className="text-sm font-medium">Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href="/auth/signup" className="hidden md:block">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full px-6 py-2.5 text-sm shadow-md shadow-indigo-200 transition-all hover:scale-105">
                  Get Started
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 bg-gray-50 rounded-xl lg:hidden active:scale-95 transition-transform"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg p-5 space-y-4 z-50 animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                'block py-2.5 text-sm font-semibold transition-colors',
                isActive(item.href)
                  ? 'text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              {item.label}
            </Link>
          ))}
          {!user ? (
            <Link href="/auth/signup" className="block pt-3">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-5 text-sm">
                Get Started
              </Button>
            </Link>
          ) : (
            <div className="pt-3 grid grid-cols-2 gap-3">
              <Link
                href="/profile"
                className="flex items-center justify-center gap-2 p-3.5 bg-gray-50 rounded-xl text-sm font-medium text-gray-700"
              >
                <User size={16} /> Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center gap-2 p-3.5 bg-red-50 rounded-xl text-sm font-medium text-red-600"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

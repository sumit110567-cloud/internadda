"use client";

// components/Header.tsx
// UPGRADED: Added Upforge navigation + trust badges + global authority signals

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronRight, LogOut, User, CreditCard, ChevronDown, Zap, ShieldCheck, Verified, Globe } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ── Announcement ticker data (UPGRADED with Upforge mentions) ─────────────────
const ANNOUNCEMENTS = [
  { icon: "✨", text: "Get verified on Upforge — 3x more interview calls", cta: "Verify Now", href: "https://upforge.org/registry", external: true },
  { icon: "⚡", text: "15,000+ students placed globally this year",            cta: "Browse",    href: "/internships", external: false },
  { icon: "🚀", text: "New: Remote internships from 40+ countries",           cta: "View Now",  href: "/internships", external: false },
  { icon: "🏆", text: "Upforge verified candidates get priority shortlisting", cta: "Get Verified", href: "https://upforge.org/registry", external: true },
];

// ── Nav links (UPGRADED: Added Upforge) ──────────────────────────────────────
const NAV_LINKS = [
  { name: "Home",        href: "/" },
  { name: "Internships", href: "/internships" },
  { name: "Courses",     href: "/courses" },
  { name: "Journal",     href: "/blog" },
  { name: "About",       href: "/about" },
];

export function Header() {
  const [isOpen,       setIsOpen]       = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [annIdx,       setAnnIdx]       = useState(0);
  const [showAnn,      setShowAnn]      = useState(true);

  const pathname       = usePathname();
  const router         = useRouter();
  const { user, signOut } = useAuth();

  // Scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close on route change
  useEffect(() => setIsOpen(false), [pathname]);

  // Announcement rotation
  useEffect(() => {
    const t = setInterval(() => setAnnIdx(i => (i + 1) % ANNOUNCEMENTS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const handleSignOut = async () => { await signOut(); router.push("/"); };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const ann         = ANNOUNCEMENTS[annIdx];
  const userInitial = (user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U").toUpperCase();
  const userName    = user?.user_metadata?.full_name?.split(" ")[0] || "Account";

  return (
    <>
      {/* ── Announcement bar (UPGRADED: supports external links) ─────────────── */}
      {showAnn && (
        <div className="fixed top-0 left-0 right-0 z-[101] bg-gradient-to-r from-[#1a1063] to-[#2d1b8a] h-9 flex items-center">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center relative">
            <div className="flex items-center gap-2">
              <span className="text-sm leading-none">{ann.icon}</span>
              <span className="text-white/75 text-[11.5px] font-medium hidden sm:inline tracking-wide">
                {ann.text}
              </span>
              <span className="text-white/75 text-[11px] font-medium sm:hidden">
                {ann.text.length > 36 ? ann.text.slice(0, 36) + "…" : ann.text}
              </span>
              {ann.external ? (
                <a
                  href={ann.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11.5px] font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-0.5 whitespace-nowrap"
                >
                  {ann.cta} <ChevronRight size={10} />
                </a>
              ) : (
                <Link
                  href={ann.href}
                  className="text-[11.5px] font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-0.5 whitespace-nowrap"
                >
                  {ann.cta} <ChevronRight size={10} />
                </Link>
              )}
            </div>
            <button
              onClick={() => setShowAnn(false)}
              aria-label="Close"
              className="absolute right-4 sm:right-6 lg:right-8 text-white/30 hover:text-white/60 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      {/* ── Main header ──────────────────────────────────────────────────── */}
      <header
        className={`fixed left-0 right-0 z-[100] transition-all duration-200 ${
          showAnn ? "top-9" : "top-0"
        } ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-6">

          {/* ── Logo (UPGRADED: tagline reflects global scope) ───────────────── */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden flex-shrink-0 border border-indigo-100">
              <Image src="/logo.jpg" alt="InternAdda" fill className="object-cover" priority sizes="28px" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[16px] font-black tracking-tight text-gray-900">
                Intern<span className="text-indigo-600">adda</span>
              </span>
            </div>
          </Link>

          {/* ── Desktop nav (UPGRADED: added Upforge link) ───────────────────── */}
          <nav className="hidden md:flex items-center gap-0 flex-1 justify-center" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-[12px] font-semibold tracking-wide uppercase transition-colors border-b-2 whitespace-nowrap ${
                    active
                      ? "text-indigo-700 border-indigo-600"
                      : "text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* ─── NEW: Upforge nav link (highlighted) ──────────────────────── */}
            <a
              href={UPFORGE_NAV.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative ml-2 px-4 py-1.5 text-[12px] font-bold tracking-wide rounded-full flex items-center gap-1.5 transition-all hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                color: "white",
                boxShadow: "0 2px 8px rgba(139,92,246,0.25)"
              }}
            >
              <Verified size={11} />
              {UPFORGE_NAV.name}
            </a>
          </nav>

          {/* ── Right side (UPGRADED: added Upforge badge + global badge) ───── */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">

            {/* NEW: Global reach badge */}
            <div className="hidden xl:flex items-center gap-1.5 border border-cyan-200 bg-cyan-50 px-2.5 py-1 rounded-full">
              <Globe size={11} className="text-cyan-600" />
              <span className="text-[9.5px] font-bold text-cyan-700 uppercase tracking-[0.12em] whitespace-nowrap">
                40+ Countries
              </span>
            </div>

            {/* MSME badge */}
            <div className="hidden xl:flex items-center gap-1.5 border border-emerald-200 bg-emerald-50 px-2.5 py-1 rounded-full">
              <ShieldCheck size={11} className="text-emerald-600" />
              <span className="text-[9.5px] font-bold text-emerald-700 uppercase tracking-[0.12em] whitespace-nowrap">
                MSME Verified
              </span>
            </div>

            {/* NEW: Upforge quick badge (desktop right side) */}
            <a
              href="https://upforge.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 border border-purple-200 bg-purple-50 px-2.5 py-1 rounded-full hover:bg-purple-100 transition-colors"
            >
              <Verified size={10} className="text-purple-600" />
              <span className="text-[9.5px] font-bold text-purple-700 uppercase tracking-[0.12em] whitespace-nowrap">
                Powered by Upforge
              </span>
            </a>

            {/* Auth */}
            {user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-white hover:border-indigo-200 hover:shadow-sm transition-all outline-none">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[11px] font-black flex-shrink-0">
                      {userInitial}
                    </div>
                    <span className="text-[12px] font-semibold text-gray-700 max-w-[72px] truncate">{userName}</span>
                    <ChevronDown size={11} className="text-gray-400 flex-shrink-0" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-56 mt-2 p-1.5 rounded-2xl border border-gray-100 shadow-xl bg-white"
                  align="end"
                  sideOffset={6}
                >
                  <DropdownMenuLabel className="px-3 py-2.5 mb-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                        {userInitial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12.5px] font-bold text-gray-900 truncate">{user?.user_metadata?.full_name || "Student"}</p>
                        <p className="text-[10.5px] text-gray-400 truncate">{user?.email}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-gray-100 mx-1" />

                  <DropdownMenuGroup className="py-1 space-y-0.5">
                    <DropdownMenuItem onClick={() => router.push("/profile")} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-gray-50">
                      <User size={13} className="text-gray-400 flex-shrink-0" />
                      <span className="text-[12.5px] font-medium text-gray-700">My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/orders")} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-gray-50">
                      <CreditCard size={13} className="text-gray-400 flex-shrink-0" />
                      <span className="text-[12.5px] font-medium text-gray-700">Orders</span>
                    </DropdownMenuItem>
                    {/* NEW: Upforge link in user menu */}
                    <DropdownMenuItem onClick={() => window.open("https://upforge.org", "_blank")} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-purple-50">
                      <Verified size={13} className="text-purple-400 flex-shrink-0" />
                      <span className="text-[12.5px] font-medium text-purple-700">Verify on Upforge</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="bg-gray-100 mx-1" />

                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-red-50">
                    <LogOut size={13} className="text-red-400 flex-shrink-0" />
                    <span className="text-[12.5px] font-medium text-red-600">Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-[12px] font-semibold text-gray-600 hover:text-gray-900 transition-colors px-2 py-1"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#1a1063] text-white text-[12px] font-bold tracking-wide rounded-lg hover:bg-indigo-900 transition-colors"
                >
                  <Zap size={11} className="fill-amber-400 text-amber-400" />
                  Get Started
                </Link>
                {/* NEW: Upforge CTA for non-logged in users */}
                <a
                  href="https://upforge.org/registry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-purple-300 text-purple-700 text-[11px] font-bold rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <Verified size={10} />
                  verify companies
                </a>
              </>
            )}
          </div>

          {/* ── Mobile toggle ─────────────────────────────────────────────── */}
          <button
            className="md:hidden p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      {/* ── Spacer so page content sits below fixed header ───────────────── */}
      <div className={showAnn ? "h-[92px]" : "h-14"} />

      {/* ── Mobile drawer (UPGRADED: added Upforge link) ────────────────────── */}
      <div
        className={`fixed inset-0 z-[99] md:hidden transition-all duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        />

        {/* Panel — sits right below the header */}
        <div
          className={`absolute left-0 right-0 bg-white border-b-2 border-[#1a1063] shadow-xl transition-transform duration-200 ${
            isOpen ? "translate-y-0" : "-translate-y-2"
          } ${showAnn ? "top-[92px]" : "top-14"}`}
        >
          {/* Nav links */}
          <div className="divide-y divide-gray-100">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-5 py-4 text-[13.5px] font-semibold tracking-wide uppercase transition-colors ${
                    active
                      ? "text-indigo-700 bg-indigo-50/60"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0" />}
                </Link>
              );
            })}
            
            {/* ─── NEW: Upforge mobile link ────────────────────────────────── */}
            <a
              href={UPFORGE_NAV.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-5 py-4 text-[13.5px] font-bold tracking-wide bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700"
            >
              <div className="flex items-center gap-2">
                <Verified size={14} className="text-purple-600" />
                {UPFORGE_NAV.name}
              </div>
              <span className="text-[10px] text-purple-500">Get Verified →</span>
            </a>
          </div>

          {/* Bottom bar (UPGRADED: added Upforge badge) */}
          <div className="px-5 py-4 flex flex-col gap-3 border-t border-gray-100 bg-gray-50/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-emerald-600 flex-shrink-0" />
                <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-[0.12em]">
                  MSME · Govt. of India
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe size={10} className="text-cyan-600" />
                <span className="text-[9px] text-cyan-700 font-semibold">40+ Countries</span>
              </div>
            </div>
            
            {/* NEW: Upforge mobile badge */}
            <a
              href="https://upforge.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-purple-50 border border-purple-200"
            >
              <Verified size={10} className="text-purple-600" />
              <span className="text-[9px] font-bold text-purple-700">Verified Student Ecosystem by Upforge</span>
            </a>

            {user ? (
              <div className="flex gap-2">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 bg-white rounded-lg text-[12px] font-semibold text-gray-700"
                >
                  <User size={13} /> Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-4 py-2 border border-red-100 bg-red-50 rounded-lg text-[12px] font-semibold text-red-600"
                >
                  <LogOut size={13} /> Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-[12px] font-semibold text-gray-700 bg-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a1063] text-white text-[12px] font-bold rounded-lg"
                >
                  <Zap size={11} className="fill-amber-400 text-amber-400" />
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

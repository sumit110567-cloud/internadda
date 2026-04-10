"use client";

// components/Header.tsx
// Clean, professional header - Trustworthy internship platform

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, User, CreditCard, ChevronDown, Zap, ShieldCheck } from "lucide-react";
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

// ── Announcement ticker data ─────────────────────────────────────────────────
const ANNOUNCEMENTS = [
  { text: "15,000+ students placed globally this year", cta: "Browse Internships", href: "/internships" },
  { text: "New: Remote internships from 40+ countries", cta: "View Now", href: "/internships" },
  { text: "500+ verified companies hiring now", cta: "Apply Today", href: "/internships" },
];

// ── Nav links ──────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Internships", href: "/internships" },
  { name: "Courses", href: "/courses" },
  { name: "Journal", href: "/blog" },
  { name: "About", href: "/about" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [annIdx, setAnnIdx] = useState(0);
  const [showAnn, setShowAnn] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
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
    const t = setInterval(() => setAnnIdx(i => (i + 1) % ANNOUNCEMENTS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const handleSignOut = async () => { await signOut(); router.push("/"); };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const ann = ANNOUNCEMENTS[annIdx];
  const userInitial = (user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U").toUpperCase();
  const userName = user?.user_metadata?.full_name?.split(" ")[0] || "Account";

  return (
    <>
      {/* ── Announcement bar ─────────────────────────────────────────────── */}
      {showAnn && (
        <div className="fixed top-0 left-0 right-0 z-[101] bg-[#1a1063] h-9 flex items-center">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center relative">
            <div className="flex items-center gap-3">
              <span className="text-white/80 text-[12px] font-medium hidden sm:inline">
                {ann.text}
              </span>
              <span className="text-white/80 text-[11px] font-medium sm:hidden">
                {ann.text.length > 40 ? ann.text.slice(0, 40) + "…" : ann.text}
              </span>
              <Link
                href={ann.href}
                className="text-[12px] font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-0.5"
              >
                {ann.cta} →
              </Link>
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
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-6">

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden flex-shrink-0">
              <Image src="/logo.jpg" alt="InternAdda" fill className="object-cover" priority sizes="28px" />
            </div>
            <span className="text-[17px] font-bold tracking-tight text-gray-900">
              Intern<span className="text-indigo-600">Adda</span>
            </span>
          </Link>

          {/* ── Desktop navigation ───────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-1.5 text-[13px] font-medium transition-colors rounded-lg ${
                    active
                      ? "text-indigo-700 bg-indigo-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* ── Right side ───────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {/* MSME badge - subtle */}
            <div className="hidden xl:flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span className="text-[10px] text-emerald-600 font-medium">
                MSME Registered
              </span>
            </div>

            {/* Auth */}
            {user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all outline-none">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-[11px] font-medium flex-shrink-0">
                      {userInitial}
                    </div>
                    <span className="text-[12px] font-medium text-gray-700 max-w-[80px] truncate">{userName}</span>
                    <ChevronDown size={12} className="text-gray-400 flex-shrink-0" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-56 mt-2 p-1.5 rounded-xl border border-gray-100 shadow-lg bg-white"
                  align="end"
                  sideOffset={6}
                >
                  <DropdownMenuLabel className="px-3 py-2 mb-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                        {userInitial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-gray-900 truncate">{user?.user_metadata?.full_name || "Student"}</p>
                        <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-gray-100" />

                  <DropdownMenuGroup className="py-1">
                    <DropdownMenuItem onClick={() => router.push("/profile")} className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50">
                      <User size={14} className="text-gray-400" />
                      <span className="text-[13px] text-gray-700">My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/orders")} className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50">
                      <CreditCard size={14} className="text-gray-400" />
                      <span className="text-[13px] text-gray-700">Orders</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="bg-gray-100" />

                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-red-50">
                    <LogOut size={14} className="text-red-400" />
                    <span className="text-[13px] text-red-600">Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/signin"
                  className="text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-1.5"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-1.5 bg-[#1a1063] text-white text-[13px] font-medium rounded-lg hover:bg-indigo-900 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile menu button ───────────────────────────────────────── */}
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Spacer ───────────────────────────────────────────────────────── */}
      <div className={showAnn ? "h-[92px]" : "h-14"} />

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[99] md:hidden transition-all duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/20" onClick={() => setIsOpen(false)} />

        <div
          className={`absolute left-0 right-0 bg-white shadow-xl transition-transform duration-200 ${
            isOpen ? "translate-y-0" : "-translate-y-2"
          } ${showAnn ? "top-[92px]" : "top-14"}`}
        >
          <div className="divide-y divide-gray-100">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-5 py-4 text-[14px] font-medium transition-colors ${
                    active
                      ? "text-indigo-700 bg-indigo-50/60"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                  {active && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                </Link>
              );
            })}
          </div>

          <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/40">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span className="text-[10px] text-emerald-600 font-medium">MSME Registered</span>
              </div>
            </div>

            {user ? (
              <div className="flex gap-2">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center px-4 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-700"
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex-1 text-center px-4 py-2 border border-red-100 bg-red-50 rounded-lg text-[13px] font-medium text-red-600"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 bg-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center px-4 py-2 bg-[#1a1063] text-white text-[13px] font-medium rounded-lg"
                >
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

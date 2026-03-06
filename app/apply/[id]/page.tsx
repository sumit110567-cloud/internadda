'use client'
// app/apply/[id]/page.tsx

import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle2, ShieldCheck, Zap, Star, School, GraduationCap,
  Lock, Ticket, Tag, Loader2, ArrowLeft, MapPin, Clock,
  Briefcase, Users, Phone, ChevronDown, AlertCircle,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

// ── Internship data ────────────────────────────────────────────────────────────
const MOCK_INTERNSHIPS = [
  { id: '1', title: 'Python Developer Intern',    company: 'Arjuna AI Solutions',  stipend: '₹2,000 – ₹8,000',   tag: 'AI & ML',       duration: '3 months', location: 'Remote', applicants: 131 },
  { id: '2', title: 'Web Development Intern',     company: 'Internadda Enterprises',stipend: '₹2,500 – ₹5,000',  tag: 'Frontend',      duration: '2 months', location: 'Remote', applicants: 95  },
  { id: '3', title: 'Data Science Intern',        company: 'Larex Systems',         stipend: '₹3,000 – ₹7,000',  tag: 'Data Science',  duration: '3 months', location: 'Remote', applicants: 89  },
  { id: '4', title: 'Data Science Intern',        company: 'Quantum Analytics',     stipend: '₹12,000 – ₹18,000',tag: 'Data Science',  duration: '4 months', location: 'Remote', applicants: 210 },
  { id: '5', title: 'Digital Marketing Intern',   company: 'Growth Mantra',         stipend: '₹5,000 – ₹10,000', tag: 'Marketing',     duration: '2 months', location: 'Remote', applicants: 340 },
  { id: '6', title: 'Full Stack Intern',          company: 'Nexus Tech',            stipend: '₹20,000 – ₹30,000',tag: 'Full Stack',    duration: '6 months', location: 'Remote', applicants: 156 },
  { id: '7', title: 'Finance & Accounts Intern',  company: 'Larex Systems',         stipend: '₹5,000 – ₹8,000',  tag: 'Finance',       duration: '3 months', location: 'Remote', applicants: 67  },
  { id: '8', title: 'AI/ML Research Intern',      company: 'Enterprise Solutions',  stipend: '₹7,000 – ₹12,000', tag: 'AI & ML',       duration: '4 months', location: 'Remote', applicants: 178 },
  { id: '9', title: 'Content Strategy Intern',    company: 'WriteUp Media',         stipend: '₹6,000 – ₹9,000',  tag: 'Marketing',     duration: '2 months', location: 'Remote', applicants: 112 },
]

// ── Domain metadata — shown on the page ───────────────────────────────────────
const DOMAIN_META: Record<string, { color: string; bg: string; border: string; skills: string[]; desc: string }> = {
  'AI & ML':       { color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', skills: ['Python', 'ML Models', 'Data Analysis', 'TensorFlow'],   desc: 'Work on cutting-edge AI and machine learning projects with real industry data.' },
  'Frontend':      { color: '#0A66C2', bg: '#eff6ff', border: '#bfdbfe', skills: ['React', 'Next.js', 'Tailwind', 'JavaScript'],             desc: 'Build user interfaces for real products used by thousands of people.' },
  'Data Science':  { color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', skills: ['Python', 'Pandas', 'SQL', 'Visualization'],               desc: 'Analyse real datasets, build models and drive business insights.' },
  'Marketing':     { color: '#d97706', bg: '#fffbeb', border: '#fde68a', skills: ['SEO', 'Content', 'Google Ads', 'Analytics'],              desc: 'Run live campaigns, manage social media, and grow real brands.' },
  'Full Stack':    { color: '#1a1063', bg: '#eef2ff', border: '#c7d2fe', skills: ['Node.js', 'React', 'MongoDB', 'APIs'],                    desc: 'Build end-to-end features for production-ready web applications.' },
  'Design':        { color: '#c13584', bg: '#fff0f5', border: '#fbcfe8', skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],       desc: 'Design intuitive user experiences for real products and brands.' },
  'Finance':       { color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc', skills: ['Excel', 'Accounting', 'Tally', 'Financial Modelling'],    desc: 'Work with finance teams on real accounts, reporting, and analysis.' },
}

const COUPONS: Record<string, number> = {
  'CAMPUSVIP':  0.25,
  'DREAMSTART': 0.10,
  'TECHTITANS': 0.90,
}

const EDUCATION_OPTIONS = [
  'B.Tech / B.E. — 1st Year',
  'B.Tech / B.E. — 2nd Year',
  'B.Tech / B.E. — 3rd Year',
  'B.Tech / B.E. — Final Year',
  'BCA / BSc Computer Science',
  'BBA / B.Com',
  'MBA / PGDM',
  'MCA / M.Tech',
  'BSc / BA / Other Graduate',
  'Diploma',
  'Recently Graduated',
]

const EXPERIENCE_OPTIONS = [
  'No experience — first internship',
  'Have done 1 internship before',
  'Have done 2+ internships',
  'Currently working / freelancing',
]

const up = (delay = 0) => ({
  initial:    { opacity: 0, y: 14 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] as any },
})

// ── Select field component ────────────────────────────────────────────────────
function SelectField({ label, icon: Icon, value, onChange, options, placeholder }: any) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
        <Icon size={10} className="text-indigo-400" /> {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full h-11 pl-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-[13.5px] font-medium text-slate-700 outline-none focus:border-[#1a1063] focus:ring-2 focus:ring-[#1a1063]/10 transition-all appearance-none cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {options.map((o: string) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  )
}

// ── Input field component ─────────────────────────────────────────────────────
function Field({ label, icon: Icon, locked, value, onChange, placeholder, type = 'text', hint }: any) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
        <Icon size={10} className={locked ? 'text-slate-300' : 'text-indigo-400'} />
        {label}
        {locked && <span className="ml-auto flex items-center gap-1 text-[9px] font-bold text-slate-300"><Lock size={8} /> Auto-filled</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          readOnly={locked}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full h-11 px-4 rounded-xl border text-[13.5px] font-medium outline-none transition-all ${
            locked
              ? 'bg-slate-50 border-slate-100 text-slate-500 cursor-default'
              : focused
              ? 'bg-white border-[#1a1063] ring-2 ring-[#1a1063]/10 text-slate-800'
              : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
          }`}
        />
        {locked && <Lock size={11} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300" />}
      </div>
      {hint && <p className="mt-1 text-[11px] text-slate-400 font-medium">{hint}</p>}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ApplyPage() {
  const { id }            = useParams()
  const { user, loading } = useAuth()
  const router            = useRouter()

  const [internship, setInternship]     = useState<any>(null)
  const [college,    setCollege]        = useState('')
  const [education,  setEducation]      = useState('')
  const [experience, setExperience]     = useState('')
  const [phone,      setPhone]          = useState('')
  const [linkedin,   setLinkedin]       = useState('')
  const [whyApply,   setWhyApply]       = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [couponInput,  setCouponInput]  = useState('')
  const [couponError,  setCouponError]  = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [originalPrice] = useState(199)
  const [finalPrice,   setFinalPrice]  = useState(199)
  const [step,         setStep]        = useState(1) // 1 = details, 2 = payment

  useEffect(() => {
    const data = MOCK_INTERNSHIPS.find(i => i.id === id)
    setInternship(data)
  }, [id])

  const domain     = internship ? DOMAIN_META[internship.tag] ?? DOMAIN_META['Frontend'] : null
  const urgentText = internship?.applicants > 200 ? 'Very High Demand' : internship?.applicants > 100 ? 'High Demand' : 'Now Accepting'
  const urgentColor = internship?.applicants > 200 ? '#dc2626' : internship?.applicants > 100 ? '#d97706' : '#059669'

  const handleApplyCoupon = () => {
    const code = couponInput.toUpperCase().trim()
    if (COUPONS[code]) {
      const disc = Math.floor(originalPrice * COUPONS[code])
      setAppliedCoupon({ code, discount: disc })
      setFinalPrice(originalPrice - disc)
      setCouponInput('')
      setCouponError(false)
    } else {
      setCouponError(true)
      setTimeout(() => setCouponError(false), 2500)
    }
  }

  const isStep1Valid = college && education && experience && phone

  const handlePayment = async () => {
    if (!isStep1Valid) return
    setIsProcessing(true)
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError || !session?.user) throw new Error('Authentication Failed: Your session has expired. Please log in again.')
      const activeUser = session.user
      const origin     = window.location.origin
      const returnUrl  = `${origin}/test/${id}`

      const response = await fetch(`${origin}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalPrice, userId: activeUser.id,
          customerName: activeUser.user_metadata?.full_name || 'Student',
          customerEmail: activeUser.email, testId: id,
          college, education, experience, phone, linkedin, whyApply,
          couponCode: appliedCoupon?.code || null, returnUrl,
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Failed to create order')

      const { load } = await import('@cashfreepayments/cashfree-js')
      const cashfree = await load({
        mode: process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION' ? 'production' : 'sandbox',
      })
      await cashfree.checkout({ paymentSessionId: result.payment_session_id, redirectTarget: '_self' })
    } catch (error: any) {
      console.error('Payment Error:', error)
      alert(error.message || 'Unable to initiate payment. Please check your connection.')
      if (error.message.includes('Authentication Failed')) router.push(`/auth/signin?callbackUrl=/apply/${id}`)
    } finally {
      setIsProcessing(false)
    }
  }

  // ── Loading ──
  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
      <Loader2 className="h-8 w-8 text-[#1a1063] animate-spin" />
      <p className="text-[#1a1063] text-[13px] font-bold animate-pulse">Verifying your session…</p>
    </div>
  )

  if (!user) return null
  if (!internship) return (
    <div className="h-screen flex items-center justify-center text-slate-500 font-semibold text-[14px]">
      Internship not found.
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f8fafc]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[700px] h-[460px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(79,70,229,0.045) 0%,transparent 68%)' }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.012 }}>
          <defs><pattern id="gr" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M36 0L0 0 0 36" fill="none" stroke="#1a1063" strokeWidth="0.6" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#gr)" />
        </svg>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 h-14 flex items-center justify-between px-4 sm:px-8">
        <Link href="/internships" className="flex items-center gap-2.5">
          <div className="relative w-7 h-7 rounded-lg overflow-hidden flex-shrink-0">
            <Image src="/logo.jpg" alt="Internadda" fill className="object-cover" />
          </div>
          <span className="font-black text-[15px] text-slate-900 tracking-tight hidden sm:block">
            Intern<span className="text-indigo-600">adda</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1.5">
            <ShieldCheck size={10} className="text-emerald-500" />
            <span className="text-[9.5px] font-bold text-emerald-600 uppercase tracking-widest">MSME Secured</span>
          </div>
          <Link href="/internships"
            className="flex items-center gap-1.5 text-[12px] font-bold text-slate-500 hover:text-[#1a1063] transition-colors group">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:block">All Internships</span>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-[680px] mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* ── Hero header ── */}
        <motion.div {...up(0)} className="mb-8">

          {/* Domain pill */}
          {domain && (
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-5 text-[9.5px] font-bold uppercase tracking-widest"
              style={{ background: domain.bg, border: `1px solid ${domain.border}`, color: domain.color }}>
              <Briefcase size={10} />
              {internship.tag} · Skill Assessment Program
            </div>
          )}

          <h1 className="text-[1.85rem] sm:text-[2.3rem] font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
            {internship.title}
          </h1>
          <p className="text-slate-500 text-[14px] font-medium mb-4">{internship.company} & 200+ Partner Companies</p>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[11.5px] font-semibold text-slate-600">
              <MapPin size={10} className="text-indigo-400" /> {internship.location}
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[11.5px] font-semibold text-slate-600">
              <Clock size={10} className="text-indigo-400" /> {internship.duration}
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[11.5px] font-semibold text-slate-600">
              <Zap size={10} className="text-amber-400 fill-current" /> {internship.stipend} / month
            </span>
            <span className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11.5px] font-bold"
              style={{ background: `${urgentColor}10`, border: `1px solid ${urgentColor}25`, color: urgentColor }}>
              <Users size={10} /> {internship.applicants} applied · {urgentText}
            </span>
          </div>

          {/* Domain description + skills */}
          {domain && (
            <div className="rounded-2xl border p-4 sm:p-5 mb-1"
              style={{ background: domain.bg, borderColor: domain.border }}>
              <p className="text-[13px] font-semibold mb-3 leading-relaxed" style={{ color: domain.color }}>
                {domain.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {domain.skills.map(s => (
                  <span key={s}
                    className="text-[11px] font-bold px-3 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.7)', border: `1px solid ${domain.border}`, color: domain.color }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Progress steps ── */}
        <motion.div {...up(0.05)} className="flex items-center gap-3 mb-8">
          {[
            { n: 1, label: 'Your Details' },
            { n: 2, label: 'Payment' },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all ${
                  step > s.n ? 'bg-emerald-500 text-white' : step === s.n ? 'bg-[#1a1063] text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {step > s.n ? <CheckCircle2 size={13} /> : s.n}
                </div>
                <span className={`text-[12px] font-bold hidden sm:block ${step === s.n ? 'text-slate-900' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
              {i < 1 && (
                <div className="flex-1 h-px mx-2" style={{ background: step > 1 ? '#10b981' : '#e2e8f0' }} />
              )}
            </div>
          ))}
        </motion.div>

        {/* ── STEP 1: Details ── */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1"
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.3 }}
              className="space-y-4">

              {/* ── Card: Auto-filled from account ── */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="w-6 h-6 rounded-lg bg-[#1a1063] flex items-center justify-center flex-shrink-0">
                    <Lock size={11} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-extrabold text-slate-800">Account Details</p>
                    <p className="text-[10.5px] text-slate-400 font-medium">Pre-filled from your Internadda profile</p>
                  </div>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name"         icon={Lock}  locked value={user?.user_metadata?.full_name || 'Student'} onChange={() => {}} placeholder="" />
                  <Field label="Registered Email"  icon={Lock}  locked value={user?.email || ''}                           onChange={() => {}} placeholder="" />
                </div>
              </div>

              {/* ── Card: Academic details ── */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                    <School size={12} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-extrabold text-slate-800">Academic Background</p>
                    <p className="text-[10.5px] text-slate-400 font-medium">Helps us match you with the right companies</p>
                  </div>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Field
                      label="College / University Name" icon={School}
                      value={college} onChange={setCollege}
                      placeholder="e.g. Delhi University, IIT Bombay"
                      hint="Enter your current or most recent institution"
                    />
                  </div>
                  <SelectField
                    label="Current Academic Status" icon={GraduationCap}
                    value={education} onChange={setEducation}
                    options={EDUCATION_OPTIONS}
                    placeholder="Select your year / degree…"
                  />
                  <SelectField
                    label="Prior Experience" icon={Briefcase}
                    value={experience} onChange={setExperience}
                    options={EXPERIENCE_OPTIONS}
                    placeholder="Select experience level…"
                  />
                </div>
              </div>

              {/* ── Card: Contact ── */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Phone size={12} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-extrabold text-slate-800">Contact & Profile</p>
                    <p className="text-[10.5px] text-slate-400 font-medium">Companies use these to reach you directly</p>
                  </div>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Phone Number" icon={Phone}
                    value={phone} onChange={setPhone}
                    placeholder="+91 98765 43210" type="tel"
                    hint="WhatsApp preferred — companies may reach out here"
                  />
                  <Field
                    label="LinkedIn Profile (optional)" icon={Users}
                    value={linkedin} onChange={setLinkedin}
                    placeholder="linkedin.com/in/yourname"
                  />
                </div>
              </div>

              {/* ── Card: Motivation ── */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Star size={12} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-extrabold text-slate-800">Why this internship?</p>
                    <p className="text-[10.5px] text-slate-400 font-medium">A short answer boosts your selection chances</p>
                  </div>
                </div>
                <div className="p-5">
                  <textarea
                    value={whyApply}
                    onChange={e => setWhyApply(e.target.value)}
                    rows={3}
                    placeholder={`e.g. "I want to gain hands-on experience in ${internship.tag} and have been building projects in this domain for the past 6 months…"`}
                    className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#1a1063] focus:ring-2 focus:ring-[#1a1063]/10 rounded-xl px-4 py-3 text-[13.5px] text-slate-700 font-medium outline-none transition-all resize-none placeholder:text-slate-400"
                  />
                  <p className="text-[10.5px] text-slate-400 font-medium mt-1.5">Optional but recommended — 2–3 sentences is enough</p>
                </div>
              </div>

              {/* ── Validation warning ── */}
              <AnimatePresence>
                {!isStep1Valid && (college || education || experience || phone) && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    <AlertCircle size={13} className="text-amber-500 flex-shrink-0" />
                    <p className="text-[12px] font-semibold text-amber-700">Please fill in College, Academic Status, Experience, and Phone to continue.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Continue button ── */}
              <button
                onClick={() => isStep1Valid && setStep(2)}
                disabled={!isStep1Valid}
                className="w-full h-12 rounded-xl font-bold text-[14px] text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: isStep1Valid ? 'linear-gradient(135deg,#1a1063,#3730a3)' : '#94a3b8',
                  boxShadow: isStep1Valid ? '0 4px 16px rgba(26,16,99,0.25)' : 'none',
                }}
              >
                Continue to Payment <ArrowLeft size={13} className="rotate-180" />
              </button>

              {/* Trust strip */}
              <div className="flex items-center justify-center gap-4 flex-wrap pt-1">
                {[
                  { icon: ShieldCheck, text: 'MSME Registered',  color: '#059669' },
                  { icon: Lock,        text: 'Data encrypted',   color: '#1a1063' },
                  { icon: CheckCircle2,text: 'Verified companies',color: '#0A66C2' },
                ].map(t => (
                  <div key={t.text} className="flex items-center gap-1.5">
                    <t.icon size={10} style={{ color: t.color }} />
                    <span className="text-[10.5px] font-semibold text-slate-400">{t.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Payment ── */}
          {step === 2 && (
            <motion.div key="step2"
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-4">

              {/* ── Order summary ── */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="w-6 h-6 rounded-lg bg-[#1a1063] flex items-center justify-center flex-shrink-0">
                    <Briefcase size={11} className="text-white" />
                  </div>
                  <p className="text-[12.5px] font-extrabold text-slate-800">Order Summary</p>
                </div>
                <div className="p-5 space-y-4">

                  {/* Role row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Applying for</p>
                      <p className="text-[14px] font-extrabold text-slate-900">{internship.title}</p>
                      <p className="text-[12px] text-slate-500 font-medium">{internship.company} & 200+ partners</p>
                    </div>
                    {domain && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                        style={{ background: domain.bg, border: `1px solid ${domain.border}`, color: domain.color }}>
                        {internship.tag}
                      </span>
                    )}
                  </div>

                  {/* What's included */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">What's included</p>
                    {[
                      { icon: Zap,          text: 'Skill Assessment Test — 10 MCQ, instant result' },
                      { icon: CheckCircle2, text: 'E-Certificate with MSME verification code' },
                      { icon: Briefcase,    text: 'Application forwarded to 200+ partner companies' },
                      { icon: Star,         text: 'Access to Internadda marksheet for future applications' },
                    ].map(item => (
                      <div key={item.text} className="flex items-center gap-2.5">
                        <item.icon size={12} className="text-indigo-500 flex-shrink-0" />
                        <p className="text-[12.5px] font-medium text-slate-700">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Applicant info */}
                  <div className="flex items-center gap-2 text-[11.5px] text-slate-500 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: urgentColor }} />
                    {internship.applicants} students have applied · Spots are filling
                  </div>
                </div>
              </div>

              {/* ── Coupon ── */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                  <Ticket size={10} className="text-indigo-400" /> Have a coupon code?
                </label>
                <div className="flex gap-2">
                  <input
                    value={couponInput}
                    onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponError(false) }}
                    onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                    placeholder="e.g. CAMPUSVIP"
                    className={`flex-1 h-11 px-4 rounded-xl border text-[13px] font-bold uppercase tracking-wider outline-none transition-all ${
                      couponError
                        ? 'border-rose-300 bg-rose-50 text-rose-600 ring-2 ring-rose-100'
                        : 'border-slate-200 bg-slate-50 text-slate-700 focus:border-[#1a1063] focus:ring-2 focus:ring-[#1a1063]/10'
                    }`}
                  />
                  <button onClick={handleApplyCoupon}
                    className="h-11 px-5 rounded-xl text-[12.5px] font-bold border-2 border-[#1a1063] text-[#1a1063] hover:bg-[#1a1063] hover:text-white transition-all flex-shrink-0">
                    Apply
                  </button>
                </div>
                <AnimatePresence>
                  {couponError && (
                    <motion.p initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-2 text-[11.5px] font-semibold text-rose-500 flex items-center gap-1.5">
                      <AlertCircle size={11} /> Invalid coupon code. Please check and try again.
                    </motion.p>
                  )}
                  {appliedCoupon && (
                    <motion.div initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }}
                      className="mt-2 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                      <Tag size={11} className="text-emerald-500" />
                      <span className="text-[11.5px] font-bold text-emerald-700">
                        {appliedCoupon.code} applied — you save ₹{appliedCoupon.discount}!
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Payment card ── */}
              <div className="relative rounded-2xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg,#0d0622 0%,#1a1063 55%,#2a1fa8 100%)' }}>
                <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
                    <defs><pattern id="pd" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="1.5" cy="1.5" r="1" fill="white" />
                    </pattern></defs>
                    <rect width="100%" height="100%" fill="url(#pd)" />
                  </svg>
                  <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-20"
                    style={{ background: 'radial-gradient(ellipse,#818cf8 0%,transparent 70%)' }} />
                </div>

                <div className="relative z-10 p-6 sm:p-7">
                  {/* Price row */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(196,181,253,0.65)' }}>
                        Assessment & Certificate Fee
                      </p>
                      <p className="text-[12px] font-medium" style={{ color: 'rgba(199,210,254,0.55)' }}>
                        One-time · No renewal · No hidden charges
                      </p>
                    </div>
                    <div className="text-right">
                      {appliedCoupon && (
                        <p className="text-[12px] line-through font-bold" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          ₹{originalPrice}
                        </p>
                      )}
                      <div className="text-white font-black leading-none" style={{ fontSize: '2.6rem' }}>
                        ₹{finalPrice}
                      </div>
                      {appliedCoupon && (
                        <p className="text-emerald-400 text-[11px] font-bold mt-0.5">
                          You save ₹{appliedCoupon.discount} 🎉
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Pay button */}
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full h-14 rounded-2xl font-extrabold text-[15px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg,#fff,#e0e7ff)', color: '#1a1063', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
                  >
                    {isProcessing ? (
                      <><Loader2 size={16} className="animate-spin" /> Connecting to Cashfree…</>
                    ) : (
                      <><ShieldCheck size={16} /> Secure Pay ₹{finalPrice} & Start Test</>
                    )}
                  </button>

                  {/* Trust row */}
                  <div className="flex items-center justify-center gap-5 mt-4 flex-wrap">
                    {[
                      '100% Encrypted',
                      'Cashfree Secured',
                      'Instant Access',
                    ].map(t => (
                      <div key={t} className="flex items-center gap-1.5">
                        <ShieldCheck size={9} style={{ color: 'rgba(110,231,183,0.8)' }} />
                        <span className="text-[10px] font-bold" style={{ color: 'rgba(199,210,254,0.6)' }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Back button */}
              <button onClick={() => setStep(1)}
                className="w-full flex items-center justify-center gap-2 text-[12.5px] font-bold text-slate-500 hover:text-slate-700 transition-colors py-2">
                <ArrowLeft size={12} /> Back to your details
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <p className="text-center text-[10.5px] text-slate-400 font-medium mt-8">
          © {new Date().getFullYear()} Internadda Enterprises · MSME Registered · New Delhi, India
        </p>
      </div>
    </div>
  )
}

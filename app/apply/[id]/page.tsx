'use client'
// app/apply/[id]/page.tsx

import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Image from 'next/image'
import Link from 'next/link'
import {
  ShieldCheck, Zap, Star, School, GraduationCap,
  Lock, Ticket, Tag, Loader2, ArrowLeft,
  MapPin, Clock, Briefcase, Users, Phone,
  AlertCircle, CheckCircle2, ChevronDown, Award,
  BadgeCheck, FileText, CreditCard, Sparkles
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

// ─── Data ─────────────────────────────────────────────────────────────────────
const INTERNSHIPS = [
  { id:'1', title:'Python Developer Intern',   company:'Arjuna AI Solutions',   stipend:'₹2,000–₹8,000',    tag:'AI & ML',      dur:'3 months', loc:'Remote', apps:131 },
  { id:'2', title:'Web Development Intern',    company:'Internadda Enterprises', stipend:'₹2,500–₹5,000',   tag:'Frontend',     dur:'2 months', loc:'Remote', apps:95  },
  { id:'3', title:'Data Science Intern',       company:'Larex Systems',          stipend:'₹3,000–₹7,000',   tag:'Data Science', dur:'3 months', loc:'Remote', apps:89  },
  { id:'4', title:'Data Science Intern',       company:'Quantum Analytics',      stipend:'₹12,000–₹18,000', tag:'Data Science', dur:'4 months', loc:'Remote', apps:210 },
  { id:'5', title:'Digital Marketing Intern',  company:'Growth Mantra',          stipend:'₹5,000–₹10,000',  tag:'Marketing',    dur:'2 months', loc:'Remote', apps:340 },
  { id:'6', title:'Full Stack Intern',         company:'Nexus Tech',             stipend:'₹20,000–₹30,000', tag:'Full Stack',   dur:'6 months', loc:'Remote', apps:156 },
  { id:'7', title:'Finance & Accounts Intern', company:'Larex Systems',          stipend:'₹5,000–₹8,000',   tag:'Finance',      dur:'3 months', loc:'Remote', apps:67  },
  { id:'8', title:'AI/ML Research Intern',     company:'Enterprise Solutions',   stipend:'₹7,000–₹12,000',  tag:'AI & ML',      dur:'4 months', loc:'Remote', apps:178 },
  { id:'9', title:'Content Strategy Intern',   company:'WriteUp Media',          stipend:'₹6,000–₹9,000',   tag:'Marketing',    dur:'2 months', loc:'Remote', apps:112 },
]

const DOMAINS: Record<string,{c:string;bg:string;br:string;skills:string[];desc:string}> = {
  'AI & ML':      {c:'#7c3aed',bg:'#f5f3ff',br:'#ddd6fe',skills:['Python','ML Models','TensorFlow','Data Analysis'], desc:'Work on real AI/ML projects with live industry data.'},
  'Frontend':     {c:'#0A66C2',bg:'#eff6ff',br:'#bfdbfe',skills:['React','Next.js','Tailwind','JavaScript'],          desc:'Ship polished interfaces for products used by thousands.'},
  'Data Science': {c:'#059669',bg:'#ecfdf5',br:'#a7f3d0',skills:['Python','Pandas','SQL','Visualization'],             desc:'Analyse real datasets and build predictive models.'},
  'Marketing':    {c:'#d97706',bg:'#fffbeb',br:'#fde68a',skills:['SEO','Google Ads','Content','Analytics'],            desc:'Run live campaigns and grow real brands from day one.'},
  'Full Stack':   {c:'#1a1063',bg:'#eef2ff',br:'#c7d2fe',skills:['Node.js','React','MongoDB','REST APIs'],             desc:'Build end-to-end features deployed to real users.'},
  'Design':       {c:'#c13584',bg:'#fff0f5',br:'#fbcfe8',skills:['Figma','Adobe XD','Prototyping','User Research'],    desc:'Design intuitive experiences for high-impact products.'},
  'Finance':      {c:'#0891b2',bg:'#ecfeff',br:'#a5f3fc',skills:['Excel','Tally','Accounting','Financial Modelling'],  desc:'Work on real financial analysis and business decisions.'},
}

const COUPONS:Record<string,number> = {'CAMPUSVIP':0.25,'DREAMSTART':0.10,'TECHTITANS':0.90}

const EDU_OPTIONS = [
  'B.Tech / B.E. — 1st Year','B.Tech / B.E. — 2nd Year',
  'B.Tech / B.E. — 3rd Year','B.Tech / B.E. — Final Year',
  'BCA / BSc Computer Science','BBA / B.Com',
  'MBA / PGDM','MCA / M.Tech',
  'BSc / BA / Other Graduate','Diploma','Recently Graduated',
]

const BENEFITS = [
  { icon: Award, title: 'MSME Certificate', desc: 'Govt. verified & accepted' },
  { icon: FileText, title: 'Instant Marksheet', desc: 'Share on LinkedIn' },
  { icon: Users, title: '200+ Partners', desc: 'Forwarded to hiring teams' },
  { icon: Sparkles, title: 'Skill Assessment', desc: '10 MCQs · Instant results' },
]

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'MSME Registered', color: '#059669' },
  { icon: Lock, label: 'Data Never Shared', color: '#1a1063' },
  { icon: Star, label: '4.9★ Rated (2.3k+ reviews)', color: '#d97706' },
]

// ─── Reusable Components ─────────────────────────────────────────────────────
const InputField = ({ icon: Icon, label, value, onChange, placeholder, type = 'text', required = true }: any) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
      <Icon size={14} className="text-indigo-500" />
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/80 
                text-sm font-medium text-slate-800 placeholder:text-slate-400
                focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 
                transition-all duration-200 outline-none"
    />
  </div>
)

const SelectField = ({ icon: Icon, label, value, onChange, options, placeholder }: any) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
      <Icon size={14} className="text-indigo-500" />
      {label} <span className="text-rose-500">*</span>
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/80
                  text-sm font-medium text-slate-800 appearance-none
                  focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100
                  transition-all duration-200 outline-none cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    </div>
  </div>
)

const LockedField = ({ icon: Icon, label, value }: any) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
      <Icon size={14} className="text-indigo-500" />
      {label}
    </label>
    <div className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 
                  flex items-center justify-between text-sm font-medium text-slate-600">
      <span className="truncate">{value}</span>
      <Lock size={14} className="text-slate-400 flex-shrink-0" />
    </div>
  </div>
)

// ─── Main Component ─────────────────────────────────────────────────────────
export default function ApplyPage() {
  const { id } = useParams()
  const { user, loading } = useAuth()
  const router = useRouter()

  const [internship, setInternship] = useState<any>(null)
  const [college, setCollege] = useState('')
  const [education, setEducation] = useState('')
  const [phone, setPhone] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [couponError, setCouponError] = useState(false)
  const [price, setPrice] = useState(199)
  const [isPaying, setIsPaying] = useState(false)

  useEffect(() => {
    setInternship(INTERNSHIPS.find(i => i.id === id))
  }, [id])

  const domain = internship ? (DOMAINS[internship.tag] ?? DOMAINS['Frontend']) : null
  const applications = internship?.apps ?? 0
  const demandStatus = applications > 200 
    ? { text: 'Very High Demand', color: '#dc2626' }
    : applications > 100 
    ? { text: 'High Demand', color: '#d97706' }
    : { text: 'Accepting Applications', color: '#059669' }

  const isFormValid = !!(college && education && phone && phone.length >= 10)

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim()
    if (COUPONS[code]) {
      const discount = Math.floor(199 * COUPONS[code])
      setAppliedCoupon({ code, discount })
      setPrice(199 - discount)
      setCouponCode('')
      setCouponError(false)
    } else {
      setCouponError(true)
      setTimeout(() => setCouponError(false), 2500)
    }
  }

  const handlePayment = async () => {
    if (!isFormValid) return
    setIsPaying(true)
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) throw new Error('Session expired. Please login again.')

      const response = await fetch(`${window.location.origin}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: price,
          userId: session.user.id,
          customerName: session.user.user_metadata?.full_name || 'Student',
          customerEmail: session.user.email,
          testId: id,
          college,
          education,
          phone,
          couponCode: appliedCoupon?.code || null,
          returnUrl: `${window.location.origin}/test/${id}`,
        }),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Payment failed')

      const { load } = await import('@cashfreepayments/cashfree-js')
      const cashfree = await load({ 
        mode: process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION' ? 'production' : 'sandbox' 
      })
      
      await cashfree.checkout({ 
        paymentSessionId: result.payment_session_id, 
        redirectTarget: '_self' 
      })
    } catch (error: any) {
      console.error(error)
      alert(error.message || 'Payment failed. Please try again.')
      if (error.message?.includes('Session expired')) {
        router.push(`/auth/signin?callbackUrl=/apply/${id}`)
      }
    } finally {
      setIsPaying(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-600">Loading your application...</p>
        </div>
      </div>
    )
  }

  // Auth guard
  if (!user) return null

  // Not found
  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-800">Internship Not Found</h2>
          <p className="text-sm text-slate-500 mt-1">The internship you're looking for doesn't exist.</p>
          <Link href="/internships" className="inline-block mt-4 text-indigo-600 font-medium hover:underline">
            Browse Internships
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/internships" className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm">
                <Image src="/logo.jpg" alt="Internadda" fill className="object-cover" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                Intern<span className="text-indigo-600">adda</span>
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="hidden sm:flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700">MSME CERTIFIED</span>
              </span>
              
              <Link 
                href="/internships" 
                className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Desktop: Two Column Layout | Mobile: Single Column */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Left Column - Application Form (2/3 on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Internship Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <span 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3"
                      style={{ 
                        background: `${domain?.c}15`, 
                        color: domain?.c,
                        border: `1px solid ${domain?.c}30`
                      }}
                    >
                      <Briefcase size={12} />
                      {internship.tag}
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {internship.title}
                    </h1>
                    <p className="text-sm text-slate-600 mt-1">{internship.company}</p>
                  </div>
                  
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 rounded-full">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-amber-700">4.9 (2.3k reviews)</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-medium text-slate-700">
                    <MapPin size={14} className="text-slate-500" />
                    {internship.loc}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-medium text-slate-700">
                    <Clock size={14} className="text-slate-500" />
                    {internship.dur}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-medium text-slate-700">
                    <Zap size={14} className="text-slate-500" />
                    {internship.stipend}/month
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: demandStatus.color }} />
                  <span className="font-medium" style={{ color: demandStatus.color }}>
                    {applications} applicants · {demandStatus.text}
                  </span>
                </div>
              </div>

              {domain && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-6 sm:p-8">
                  <p className="text-sm text-slate-700 mb-3">{domain.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {domain.skills.map(skill => (
                      <span 
                        key={skill}
                        className="px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-slate-700 border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="p-6 sm:p-8 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">Complete Your Application</h2>
                <p className="text-sm text-slate-600 mt-1">Takes less than 60 seconds</p>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                {/* Auto-filled fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <LockedField 
                    icon={Lock} 
                    label="Full Name" 
                    value={user?.user_metadata?.full_name || 'Student'} 
                  />
                  <LockedField 
                    icon={Lock} 
                    label="Email" 
                    value={user?.email || ''} 
                  />
                </div>

                <div className="border-t border-slate-100" />

                {/* Required fields */}
                <div className="space-y-4">
                  <InputField
                    icon={School}
                    label="College/University"
                    value={college}
                    onChange={setCollege}
                    placeholder="e.g., Delhi University, IIT Bombay"
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <SelectField
                      icon={GraduationCap}
                      label="Academic Status"
                      value={education}
                      onChange={setEducation}
                      options={EDU_OPTIONS}
                      placeholder="Select your degree"
                    />
                    
                    <InputField
                      icon={Phone}
                      label="Phone Number"
                      value={phone}
                      onChange={setPhone}
                      placeholder="+91 98765 43210"
                      type="tel"
                    />
                  </div>
                </div>

                {/* Trust badges - Mobile only */}
                <div className="lg:hidden flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-slate-100">
                  {TRUST_BADGES.map(({ icon: Icon, label, color }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <Icon size={14} style={{ color }} />
                      <span className="text-xs font-medium text-slate-600">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Payment & Benefits (1/3 on desktop) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Benefits Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-indigo-100 p-6"
            >
              <h3 className="text-sm font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <BadgeCheck size={18} className="text-indigo-600" />
                What You'll Get
              </h3>
              
              <div className="space-y-4">
                {BENEFITS.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{title}</p>
                      <p className="text-xs text-slate-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Payment Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border-2 border-indigo-100 overflow-hidden sticky top-24"
            >
              <div className="p-6 bg-gradient-to-r from-indigo-600 to-indigo-700">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <CreditCard size={18} />
                  Payment Summary
                </h3>
              </div>

              <div className="p-6 space-y-4">
                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Application Fee</span>
                  <div className="text-right">
                    {appliedCoupon && (
                      <span className="text-sm line-through text-slate-400 mr-2">₹199</span>
                    )}
                    <span className="text-2xl font-bold text-indigo-600">₹{price}</span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <Ticket size={14} className="text-indigo-500" />
                    Have a coupon?
                  </label>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase())
                        setCouponError(false)
                      }}
                      placeholder="ENTER CODE"
                      className="flex-1 h-10 px-3 rounded-lg border border-slate-200 text-xs font-medium uppercase
                               focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none"
                    />
                    <button
                      onClick={applyCoupon}
                      className="h-10 px-4 bg-indigo-600 text-white text-xs font-bold rounded-lg 
                               hover:bg-indigo-700 transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  <AnimatePresence>
                    {couponError && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-rose-600 flex items-center gap-1"
                      >
                        <AlertCircle size={12} />
                        Invalid coupon code
                      </motion.p>
                    )}
                    
                    {appliedCoupon && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-50 border border-emerald-200 rounded-lg p-2"
                      >
                        <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                          <Tag size={12} />
                          {appliedCoupon.code} — ₹{appliedCoupon.discount} off applied!
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action Button */}
                <button
                  onClick={handlePayment}
                  disabled={!isFormValid || isPaying}
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 to-indigo-700 
                           text-white font-bold rounded-xl text-sm
                           hover:from-indigo-700 hover:to-indigo-800 
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200 flex items-center justify-center gap-2
                           shadow-lg shadow-indigo-200"
                >
                  {isPaying ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} />
                      Pay ₹{price} & Start Test
                    </>
                  )}
                </button>

                {/* Security badges */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <ShieldCheck size={12} className="text-emerald-600" />
                    100% Secure
                  </span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Lock size={12} className="text-emerald-600" />
                    Encrypted
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Trust badges - Desktop only */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-col gap-3">
                {TRUST_BADGES.map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={16} style={{ color }} />
                    <span className="text-xs font-medium text-slate-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Internadda Enterprises · MSME Registered · New Delhi, India
          </p>
          <p className="text-xs text-slate-400 mt-1">
            All applications are securely processed · Your data is protected
          </p>
        </footer>
      </div>
    </div>
  )
}

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
  AlertCircle, CheckCircle2, ChevronDown,
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
  'AI & ML':      {c:'#7c3aed',bg:'#f5f3ff',br:'#ddd6fe',skills:['Python','ML Models','TensorFlow','Data Analysis'], desc:'Work on real AI/ML projects with live industry data and production environments.'},
  'Frontend':     {c:'#0A66C2',bg:'#eff6ff',br:'#bfdbfe',skills:['React','Next.js','Tailwind','JavaScript'],          desc:'Ship polished user interfaces for products used by thousands of real users.'},
  'Data Science': {c:'#059669',bg:'#ecfdf5',br:'#a7f3d0',skills:['Python','Pandas','SQL','Visualization'],             desc:'Analyse real datasets, build predictive models, and surface business insights.'},
  'Marketing':    {c:'#d97706',bg:'#fffbeb',br:'#fde68a',skills:['SEO','Google Ads','Content','Analytics'],            desc:'Run live campaigns, manage social media, and grow real brands from day one.'},
  'Full Stack':   {c:'#1a1063',bg:'#eef2ff',br:'#c7d2fe',skills:['Node.js','React','MongoDB','REST APIs'],             desc:'Build end-to-end product features deployed to real users in production.'},
  'Design':       {c:'#c13584',bg:'#fff0f5',br:'#fbcfe8',skills:['Figma','Adobe XD','Prototyping','User Research'],    desc:'Design intuitive experiences for real products with high-impact user bases.'},
  'Finance':      {c:'#0891b2',bg:'#ecfeff',br:'#a5f3fc',skills:['Excel','Tally','Accounting','Financial Modelling'],  desc:'Work on real financial analysis, reporting, and business decision support.'},
}

const COUPONS:Record<string,number> = {'CAMPUSVIP':0.25,'DREAMSTART':0.10,'TECHTITANS':0.90}

const EDU_OPTIONS = [
  'B.Tech / B.E. — 1st Year','B.Tech / B.E. — 2nd Year',
  'B.Tech / B.E. — 3rd Year','B.Tech / B.E. — Final Year',
  'BCA / BSc Computer Science','BBA / B.Com',
  'MBA / PGDM','MCA / M.Tech',
  'BSc / BA / Other Graduate','Diploma','Recently Graduated',
]

const INCLUDED = [
  {icon:Zap,         title:'Skill Assessment Test',  sub:'10 MCQs · instant marksheet'},
  {icon:Star,        title:'MSME-Verified Certificate', sub:'Shareable digital certificate'},
  {icon:Briefcase,   title:'200+ Companies',           sub:'Application forwarded directly'},
  {icon:CheckCircle2,title:'Digital Marksheet',        sub:'Use in future applications'},
]

const TRUST_ITEMS = [
  {icon:ShieldCheck, label:'MSME Registered',   c:'#059669'},
  {icon:Lock,        label:'Data Never Shared', c:'#1a1063'},
  {icon:Star,        label:'4.9★ Rated',        c:'#d97706'},
]

// ─── Micro components ──────────────────────────────────────────────────────────
function FieldLabel({icon:I, text, right}: any) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <I size={10} className="text-indigo-400 flex-shrink-0"/>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{text}</span>
      {right && <span className="ml-auto text-[9px] font-bold text-slate-300">{right}</span>}
    </div>
  )
}

function LockedInput({icon:I, label, value}: any) {
  return (
    <div>
      <FieldLabel icon={I} text={label} right="Auto-filled · secured"/>
      <div className="relative h-11 flex items-center px-4 pr-10 rounded-2xl border border-slate-100 bg-slate-50 text-[13px] font-semibold text-slate-400 truncate">
        {value}
        <Lock size={10} className="absolute right-3.5 text-slate-300"/>
      </div>
    </div>
  )
}

function TextInput({icon:I, label, value, onChange, placeholder, type='text', hint}: any) {
  const [f,setF] = useState(false)
  return (
    <div>
      <FieldLabel icon={I} text={label}/>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={e=>onChange(e.target.value)}
        onFocus={()=>setF(true)} onBlur={()=>setF(false)}
        className={`w-full h-11 px-4 rounded-2xl border text-[13.5px] font-medium outline-none transition-all duration-150 placeholder:text-slate-300
          ${f
            ? 'bg-white border-[#1a1063] shadow-[0_0_0_3px_rgba(26,16,99,0.07)] text-slate-800'
            : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'}`}
      />
      {hint && <p className="mt-1 text-[10.5px] text-slate-400">{hint}</p>}
    </div>
  )
}

function SelectInput({icon:I, label, value, onChange, options, placeholder}: any) {
  return (
    <div>
      <FieldLabel icon={I} text={label}/>
      <div className="relative">
        <select
          value={value} onChange={e=>onChange(e.target.value)}
          className="w-full h-11 pl-4 pr-9 bg-slate-50 border border-slate-200 rounded-2xl text-[13.5px] font-medium text-slate-700 outline-none focus:border-[#1a1063] focus:shadow-[0_0_0_3px_rgba(26,16,99,0.07)] transition-all appearance-none cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {options.map((o:string)=><option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ApplyPage() {
  const {id}            = useParams()
  const {user,loading}  = useAuth()
  const router          = useRouter()

  const [internship, setInternship] = useState<any>(null)
  const [college,    setCollege]    = useState('')
  const [education,  setEducation]  = useState('')
  const [phone,      setPhone]      = useState('')
  const [couponInput, setCouponInput]  = useState('')
  const [couponErr,   setCouponErr]   = useState(false)
  const [applied,     setApplied]     = useState<{code:string;disc:number}|null>(null)
  const [price,       setPrice]       = useState(199)
  const [step,        setStep]        = useState<1|2>(1)
  const [paying,      setPaying]      = useState(false)

  useEffect(()=>{ setInternship(INTERNSHIPS.find(i=>i.id===id)) },[id])

  const dm   = internship ? (DOMAINS[internship.tag] ?? DOMAINS['Frontend']) : null
  const apps = internship?.apps ?? 0
  const heat = apps>200 ? {t:'Very high demand',c:'#dc2626'} : apps>100 ? {t:'High demand',c:'#d97706'} : {t:'Accepting now',c:'#059669'}
  const valid = !!(college && education && phone)

  const applyCoupon = () => {
    const c = couponInput.toUpperCase().trim()
    if (COUPONS[c]) {
      const disc = Math.floor(199*COUPONS[c])
      setApplied({code:c,disc}); setPrice(199-disc)
      setCouponInput(''); setCouponErr(false)
    } else { setCouponErr(true); setTimeout(()=>setCouponErr(false),2500) }
  }

  const handlePay = async () => {
    if (!valid) return
    setPaying(true)
    try {
      const {data:{session},error} = await supabase.auth.getSession()
      if (error||!session?.user) throw new Error('Authentication Failed: Your session has expired. Please log in again.')
      const u      = session.user
      const origin = window.location.origin
      const res    = await fetch(`${origin}/api/payment/create-order`,{
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          amount:price, userId:u.id,
          customerName:u.user_metadata?.full_name||'Student',
          customerEmail:u.email, testId:id,
          college, education, phone,
          couponCode:applied?.code||null,
          returnUrl:`${origin}/test/${id}`,
        }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error||'Failed to create order')
      const {load} = await import('@cashfreepayments/cashfree-js')
      const cf = await load({mode:process.env.NEXT_PUBLIC_CASHFREE_ENV==='PRODUCTION'?'production':'sandbox'})
      await cf.checkout({paymentSessionId:result.payment_session_id,redirectTarget:'_self'})
    } catch (e:any) {
      console.error(e)
      alert(e.message||'Payment failed. Please try again.')
      if (e.message?.includes('Authentication Failed')) router.push(`/auth/signin?callbackUrl=/apply/${id}`)
    } finally { setPaying(false) }
  }

  // Guards
  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-3" style={{fontFamily:"'DM Sans',sans-serif"}}>
      <Loader2 className="w-7 h-7 text-[#1a1063] animate-spin"/>
      <p className="text-[13px] font-bold text-[#1a1063] animate-pulse">Verifying session…</p>
    </div>
  )
  if (!user)        return null
  if (!internship)  return <div className="min-h-screen flex items-center justify-center text-slate-400 text-[14px] font-semibold">Internship not found.</div>

  return (
    <div className="min-h-screen bg-[#f7f8fc]" style={{fontFamily:"'DM Sans',sans-serif"}}>

      {/* Ambient bg */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-56 left-1/2 -translate-x-1/2 w-[560px] h-[360px] rounded-full"
          style={{background:'radial-gradient(ellipse,rgba(79,70,229,0.06) 0%,transparent 70%)'}}/>
        <svg className="absolute inset-0 w-full h-full" style={{opacity:0.01}}>
          <defs><pattern id="bg-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0L0 0 0 32" fill="none" stroke="#1a1063" strokeWidth="0.5"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#bg-grid)"/>
        </svg>
      </div>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 h-14">
        <div className="max-w-xl mx-auto h-full px-4 flex items-center justify-between">
          <Link href="/internships" className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden shadow-sm">
              <Image src="/logo.jpg" alt="Internadda" fill className="object-cover"/>
            </div>
            <span className="font-black text-[14px] text-slate-900 tracking-tight">
              Intern<span className="text-indigo-600">adda</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-emerald-600">
              <ShieldCheck size={9}/> MSME Certified
            </span>
            <Link href="/internships" className="flex items-center gap-1 text-[11.5px] font-bold text-slate-400 hover:text-slate-700 transition-colors group">
              <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform"/> Back
            </Link>
          </div>
        </div>
      </nav>

      {/* ── BODY ── */}
      <div className="relative z-10 max-w-xl mx-auto px-4 pt-8 pb-16">

        {/* ════════════ ROLE CARD ════════════ */}
        <motion.div
          initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
          transition={{duration:0.42,ease:[0.22,1,0.36,1]}}
          className="mb-5 rounded-3xl overflow-hidden shadow-lg shadow-indigo-950/10"
        >
          {/* Dark header */}
          <div className="relative px-6 pt-6 pb-5 overflow-hidden"
            style={{background:'linear-gradient(135deg,#0b0520 0%,#1a1063 52%,#2c1fa6 100%)'}}>
            <div aria-hidden className="absolute inset-0">
              <svg className="w-full h-full opacity-[0.04]">
                <defs><pattern id="hero-dots" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.75" fill="white"/>
                </pattern></defs>
                <rect width="100%" height="100%" fill="url(#hero-dots)"/>
              </svg>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full opacity-25"
                style={{background:'radial-gradient(ellipse,#818cf8 0%,transparent 70%)'}}/>
            </div>
            <div className="relative z-10">
              {dm && (
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-3 text-[9px] font-black uppercase tracking-widest"
                  style={{background:`${dm.c}25`,border:`1px solid ${dm.c}45`,color:dm.c}}>
                  <Briefcase size={8}/>{internship.tag} · Skill Program
                </span>
              )}
              <h1 className="text-white font-extrabold text-[1.5rem] sm:text-[1.75rem] leading-[1.1] tracking-tight mb-1.5">
                {internship.title}
              </h1>
              <p className="text-[12.5px] mb-4 font-medium" style={{color:'rgba(199,210,254,0.6)'}}>
                {internship.company} &amp; 200+ Partner Companies
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  {I:MapPin, v:internship.loc},
                  {I:Clock,  v:internship.dur},
                  {I:Zap,    v:internship.stipend+'/mo'},
                ].map(({I,v})=>(
                  <span key={v} className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold"
                    style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.11)',color:'rgba(220,228,255,0.85)'}}>
                    <I size={9}/>{v}
                  </span>
                ))}
                <span className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[11px] font-bold"
                  style={{background:`${heat.c}18`,border:`1px solid ${heat.c}35`,color:heat.c}}>
                  <Users size={9}/>{apps} applied · {heat.t}
                </span>
              </div>
            </div>
          </div>

          {/* Domain skills strip */}
          {dm && (
            <div className="px-6 py-4 border-b border-slate-100" style={{background:dm.bg}}>
              <p className="text-[12px] font-semibold leading-snug mb-2.5" style={{color:dm.c}}>{dm.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {dm.skills.map(s=>(
                  <span key={s} className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-white/70"
                    style={{border:`1px solid ${dm.br}`,color:dm.c}}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* What you get — 2×2 */}
          <div className="bg-white px-6 py-5">
            <p className="text-[9.5px] font-black uppercase tracking-widest text-slate-400 mb-3">What's included with ₹199</p>
            <div className="grid grid-cols-2 gap-2.5">
              {INCLUDED.map(({icon:I,title,sub})=>(
                <div key={title} className="flex items-start gap-2.5 bg-slate-50 border border-slate-100 rounded-2xl p-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                    <I size={13} className="text-indigo-500"/>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11.5px] font-extrabold text-slate-800 leading-tight">{title}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-tight">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ════════════ STEP PILL ════════════ */}
        <motion.div
          initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
          transition={{duration:0.35,delay:0.07}}
          className="flex items-center gap-0 mb-5 bg-white border border-slate-200 rounded-2xl p-1 shadow-sm"
        >
          {(['Your Details','Confirm & Pay'] as const).map((label,i)=>{
            const n   = i+1
            const act = step===n
            const done= step>n
            return (
              <div key={label} className={`flex-1 flex items-center justify-center gap-2 h-9 rounded-xl transition-all ${act?'bg-[#1a1063]':''}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 ${done?'bg-emerald-500 text-white':act?'bg-white/20 text-white':'bg-slate-200 text-slate-400'}`}>
                  {done?<CheckCircle2 size={11}/>:n}
                </div>
                <span className={`text-[12px] font-bold ${act?'text-white':done?'text-emerald-500':'text-slate-400'}`}>{label}</span>
              </div>
            )
          })}
        </motion.div>

        {/* ════════════ FORMS ════════════ */}
        <AnimatePresence mode="wait">

          {/* ── STEP 1 ── */}
          {step===1 && (
            <motion.div key="s1"
              initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} exit={{opacity:0,x:16}}
              transition={{duration:0.25,ease:[0.22,1,0.36,1]}}>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-4">

                {/* Card top */}
                <div className="px-6 pt-5 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-white">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 shadow border border-white">
                      <Image src="/logo.jpg" alt="Internadda" fill className="object-cover"/>
                    </div>
                    <div>
                      <p className="text-[13px] font-extrabold text-slate-900 leading-none">Your Application</p>
                      <p className="text-[10.5px] text-slate-400 font-medium mt-0.5">Takes 60 seconds · Your data stays private</p>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5 space-y-4">
                  {/* Locked row */}
                  <div className="grid grid-cols-2 gap-3">
                    <LockedInput icon={Lock} label="Full Name"  value={user?.user_metadata?.full_name||'Student'}/>
                    <LockedInput icon={Lock} label="Email"      value={user?.email||''}/>
                  </div>

                  <div className="h-px bg-slate-100"/>

                  {/* 3 required inputs */}
                  <TextInput icon={School} label="College / University"
                    value={college} onChange={setCollege}
                    placeholder="e.g. Delhi University, IIT Bombay"
                    hint="Your current or most recent institution"/>

                  <div className="grid grid-cols-2 gap-3">
                    <SelectInput icon={GraduationCap} label="Academic Status"
                      value={education} onChange={setEducation}
                      options={EDU_OPTIONS} placeholder="Select degree…"/>
                    <TextInput icon={Phone} label="Phone"
                      value={phone} onChange={setPhone}
                      placeholder="+91 98765 43210" type="tel"
                      hint="Companies reach you here"/>
                  </div>

                  {/* Inline warning */}
                  <AnimatePresence>
                    {!valid && (college||education||phone) && (
                      <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
                        className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
                        <AlertCircle size={12} className="text-amber-400 flex-shrink-0 mt-0.5"/>
                        <p className="text-[11.5px] font-semibold text-amber-700">Please complete all 3 fields to continue.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={()=>valid&&setStep(2)} disabled={!valid}
                className="w-full h-14 rounded-2xl font-extrabold text-[15px] text-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background:valid?'linear-gradient(135deg,#1a1063,#3730a3)':'#94a3b8',
                  boxShadow:valid?'0 8px 24px rgba(26,16,99,0.30)':'none',
                }}>
                Continue to Payment
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>

              {/* Trust strip */}
              <div className="flex items-center justify-center gap-5 mt-4 flex-wrap">
                {TRUST_ITEMS.map(({icon:I,label,c})=>(
                  <div key={label} className="flex items-center gap-1.5">
                    <I size={10} style={{color:c}}/>
                    <span className="text-[10.5px] font-semibold text-slate-400">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── STEP 2 ── */}
          {step===2 && (
            <motion.div key="s2"
              initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-16}}
              transition={{duration:0.25,ease:[0.22,1,0.36,1]}}
              className="space-y-3.5">

              {/* Details recap */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/70">
                  <p className="text-[9.5px] font-black uppercase tracking-widest text-slate-400">Application Confirmed</p>
                </div>
                <div className="px-5 py-4 grid grid-cols-2 gap-x-4 gap-y-3">
                  {[
                    {l:'Role',    v:internship.title},
                    {l:'Company', v:internship.company},
                    {l:'Name',    v:user?.user_metadata?.full_name||'Student'},
                    {l:'College', v:college},
                    {l:'Email',   v:user?.email||''},
                    {l:'Degree',  v:education},
                  ].map(({l,v})=>(
                    <div key={l} className="min-w-0">
                      <p className="text-[8.5px] font-black uppercase tracking-widest text-slate-400">{l}</p>
                      <p className="text-[12.5px] font-semibold text-slate-800 truncate mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-1.5"
                  style={{color:heat.c,background:`${heat.c}08`}}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{background:heat.c}}/>
                  <span className="text-[11px] font-bold">{apps} applied · {heat.t}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm px-5 py-4">
                <div className="text-[9.5px] font-black uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <Ticket size={9} className="text-indigo-400"/> Have a coupon?
                </div>
                <div className="flex gap-2">
                  <input
                    value={couponInput}
                    onChange={e=>{setCouponInput(e.target.value.toUpperCase());setCouponErr(false)}}
                    onKeyDown={e=>e.key==='Enter'&&applyCoupon()}
                    placeholder="e.g. CAMPUSVIP"
                    className={`flex-1 h-10 px-3.5 rounded-xl border text-[12.5px] font-bold uppercase tracking-wider outline-none transition-all
                      ${couponErr?'border-rose-300 bg-rose-50 text-rose-500':'border-slate-200 bg-slate-50 text-slate-700 focus:border-[#1a1063]'}`}
                  />
                  <button onClick={applyCoupon}
                    className="h-10 px-4 rounded-xl text-[12px] font-bold border-2 border-[#1a1063] text-[#1a1063] hover:bg-[#1a1063] hover:text-white transition-all flex-shrink-0">
                    Apply
                  </button>
                </div>
                <AnimatePresence>
                  {couponErr && (
                    <motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                      className="mt-1.5 text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                      <AlertCircle size={10}/> Invalid code — please try again.
                    </motion.p>
                  )}
                  {applied && (
                    <motion.div initial={{opacity:0,y:-3}} animate={{opacity:1,y:0}}
                      className="mt-1.5 flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                      <Tag size={10} className="text-emerald-500"/>
                      <span className="text-[11.5px] font-bold text-emerald-700">{applied.code} — ₹{applied.disc} off!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── PAYMENT PANEL ── */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-indigo-950/20"
                style={{background:'linear-gradient(145deg,#09041e 0%,#1a1063 48%,#2b20a8 100%)'}}>

                {/* texture */}
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full opacity-[0.04]">
                    <defs><pattern id="pay-dots" width="18" height="18" patternUnits="userSpaceOnUse">
                      <circle cx="1.2" cy="1.2" r="0.85" fill="white"/>
                    </pattern></defs>
                    <rect width="100%" height="100%" fill="url(#pay-dots)"/>
                  </svg>
                  <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full opacity-20"
                    style={{background:'radial-gradient(ellipse,#a5b4fc 0%,transparent 70%)'}}/>
                  <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full opacity-10"
                    style={{background:'radial-gradient(ellipse,#818cf8 0%,transparent 70%)'}}/>
                </div>

                <div className="relative z-10 px-6 py-7">

                  {/* Price display */}
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.15em] mb-1"
                        style={{color:'rgba(167,139,250,0.6)'}}>One-time Fee</p>
                      <p className="text-[11.5px] font-medium leading-snug"
                        style={{color:'rgba(199,210,254,0.45)'}}>No renewal · No hidden charges</p>
                    </div>
                    <div className="text-right">
                      {applied && (
                        <p className="text-[13px] line-through font-bold" style={{color:'rgba(255,255,255,0.22)'}}>₹199</p>
                      )}
                      <p className="font-black text-white leading-none" style={{fontSize:'3.2rem',letterSpacing:'-0.02em'}}>
                        ₹{price}
                      </p>
                      {applied && <p className="text-emerald-400 text-[11px] font-bold mt-0.5">You save ₹{applied.disc} 🎉</p>}
                    </div>
                  </div>

                  {/* Pay button — white on dark */}
                  <button
                    onClick={handlePay} disabled={paying}
                    className="w-full h-14 rounded-2xl font-extrabold text-[15px] flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.97] disabled:opacity-50"
                    style={{background:'linear-gradient(135deg,#ffffff,#dde7ff)',color:'#1a1063',boxShadow:'0 8px 28px rgba(0,0,0,0.28)'}}>
                    {paying
                      ? <><Loader2 size={16} className="animate-spin"/> Connecting to Cashfree…</>
                      : <><ShieldCheck size={16}/> Secure Pay ₹{price} &amp; Start Test</>
                    }
                  </button>

                  {/* 3 trust badges */}
                  <div className="flex items-center justify-center gap-6 mt-5">
                    {['100% Encrypted','Cashfree Secured','Instant Access'].map(t=>(
                      <div key={t} className="flex items-center gap-1.5">
                        <ShieldCheck size={9} style={{color:'rgba(110,231,183,0.7)'}}/>
                        <span className="text-[9.5px] font-bold" style={{color:'rgba(199,210,254,0.5)'}}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Back */}
              <button onClick={()=>setStep(1)}
                className="w-full py-2 flex items-center justify-center gap-1.5 text-[12px] font-bold text-slate-400 hover:text-slate-600 transition-colors">
                <ArrowLeft size={11}/> Edit details
              </button>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Footer line */}
        <p className="text-center text-[10px] text-slate-400 font-medium mt-8">
          © {new Date().getFullYear()} Internadda Enterprises · MSME Registered · New Delhi, India
        </p>
      </div>
    </div>
  )
}

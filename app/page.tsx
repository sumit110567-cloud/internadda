'use client'

import React from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, Users, CheckCircle, Shield, Clock, 
  GraduationCap, Award, Zap, Star, Briefcase, 
  Sparkles, MousePointer2, TrendingUp 
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { HeroVisual } from './page-client-components'

// SEO & Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "InternAdda",
  "url": "https://internadda.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://internadda.com/internships?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

const featuredInternships = [
  {
    id: '1',
    title: 'Python Developer Intern',
    company: 'Arjuna AI Solutions',
    stipend: '₹2,000 - ₹8,000',
    location: 'Remote',
    skills: ['Python', 'Django', 'PostgreSQL'],
    applicants: 131,
    image: '/python.jpg',
    otherCompaniesCount: 36,
    companyLogos: ['/company1.jpg', '/company2.jpg', '/company3.jpg']
  },
  {
    id: '2',
    title: 'Web Development Intern',
    company: 'InternAdda Enterprises',
    stipend: '₹2,500 - ₹5,000',
    location: 'Remote',
    skills: ['React', 'Next.js', 'Tailwind'],
    applicants: 150,
    image: '/react.jpg',
    otherCompaniesCount: 21,
    companyLogos: ['/company4.jpg', '/company5.jpg', '/company1.jpg']
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Larex Systems',
    stipend: '₹3,000 - ₹7,000',
    location: 'Remote',
    skills: ['Python', 'Pandas', 'Matplotlib'],
    applicants: 130,
    image: '/datascience.jpg',
    otherCompaniesCount: 21,
    companyLogos: ['/company2.jpg', '/company3.jpg', '/company4.jpg']
  },
]

const InternshipCard = ({ id, title, company, stipend, location, skills, applicants, otherCompaniesCount, image, companyLogos }: any) => {
  const { user } = useAuth()
  const router = useRouter()

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`)
  }

  return (
    <motion.article 
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(10,38,71,0.1)] overflow-hidden w-full max-w-[380px] flex flex-col transition-all duration-500"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill 
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-2 shadow-sm z-10">
          <TrendingUp size={14} className="text-orange-500" />
          <span className="text-[#0A2647] text-[10px] font-bold tracking-tight">{applicants} Applied</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
      </div>

      <div className="px-8 pb-8 pt-2 flex flex-col relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex -space-x-3">
            {companyLogos.map((logo: string, idx: number) => (
              <div key={idx} className="relative w-8 h-8 rounded-full border-2 border-white bg-slate-50 shadow-sm overflow-hidden">
                <Image src={logo} alt="Partner" fill className="object-cover" />
              </div>
            ))}
          </div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">+{otherCompaniesCount} Companies</span>
        </div>

        <h3 className="text-xl font-bold text-[#0A2647] mb-4 leading-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50/50 rounded-2xl">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Stipend</p>
            <p className="text-[#0A2647] font-bold text-sm">{stipend}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Type</p>
            <p className="text-[#0A2647] font-bold text-sm">{location}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {skills.slice(0, 3).map((skill: string) => (
            <span key={skill} className="bg-blue-50/50 px-3 py-1 rounded-full text-[10px] font-bold text-blue-700 border border-blue-100">
              {skill}
            </span>
          ))}
        </div>

        <Button 
          onClick={handleApply}
          className="w-full bg-[#0A2647] hover:bg-blue-700 text-white py-7 rounded-2xl font-bold text-base shadow-xl shadow-blue-900/10 active:scale-[0.97] transition-all"
        >
          {user ? 'Instant Apply' : 'Get Started'}
        </Button>
      </div>
    </motion.article>
  )
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

  const trustMetrics = [
    { icon: Shield, title: 'VERIFIED ROLES', value: '500+', sub: 'Companies' },
    { icon: Users, title: 'SUCCESS STORIES', value: '7,200+', sub: 'Students' },
    { icon: Award, title: 'ESTABLISHED', value: '2020', sub: 'Founding Year' },
    { icon: Clock, title: 'HIRING SPEED', value: '48H', sub: 'Avg. Response' },
  ]

  const partners = [
    { name: 'Delhi University', logo: '🎓' },
    { name: 'LAREX', logo: '🔬' },
    { name: 'Tracxn', logo: '🌐' },
    { name: 'Arjuna-AI', logo: '💻' },
  ]

  return (
    <div className="selection:bg-blue-100 selection:text-blue-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      
      <main className="relative min-h-screen bg-white overflow-x-hidden">
        {/* Modern Animated Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/40 blur-[120px] rounded-full" />
          <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-yellow-100/30 blur-[120px] rounded-full" />
        </div>

        {/* Floating Trust Strip */}
        <div className="relative z-30 bg-[#0A2647] backdrop-blur-md border-b border-white/10 py-3">
          <div className="max-w-[1400px] mx-auto px-4 flex justify-center gap-8 items-center text-[11px] font-bold text-white tracking-[0.1em] uppercase">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <CheckCircle size={14} className="text-[#FFD700]" />
              <span>MSME Registered Entity</span>
            </motion.div>
            <div className="h-4 w-px bg-white/20 hidden md:block" />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#FFD700]" />
              <span>AI-Powered Matching</span>
            </motion.div>
          </div>
        </div>

        {/* Hero Section */}
        <motion.section style={{ opacity, scale }} className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative z-10 text-center lg:text-left flex flex-col items-center lg:items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge className="bg-blue-50 text-blue-700 border-blue-100 px-5 py-2 rounded-full mb-8 text-xs font-bold tracking-tight shadow-sm">
                    ✨ The Gold Standard of Internships
                  </Badge>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-black text-[#0A2647] leading-[1.05] mb-6 tracking-tighter"
                >
                  India's Largest <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-500">
                    Internship Hub.
                  </span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl leading-relaxed font-medium"
                >
                  We bridge the gap between high-potential students and 500+ verified industry leaders across India.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto"
                >
                  <Link href="/internships" className="w-full sm:w-auto">
                    <Button className="w-full bg-[#0A2647] text-white hover:bg-blue-800 font-bold px-10 py-8 text-lg rounded-2xl shadow-2xl shadow-blue-900/20 group transition-all">
                      Find Internships 
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/courses" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full border-slate-200 text-[#0A2647] hover:bg-slate-50 px-10 py-8 text-lg rounded-2xl font-bold">
                      Browse Courses
                    </Button>
                  </Link>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-2 pr-6 rounded-full border border-slate-100 shadow-sm"
                >
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                        <Image src={`/student${i}.jpg`} alt="Student" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-bold text-[#0A2647]">
                    Join <span className="text-blue-600">7,200+</span> Ambitious Students
                  </p>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full animate-pulse" />
                <HeroVisual />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Partner Ecosystem (Smooth Auto-scroll Feel) */}
        <section className="bg-slate-50/50 py-12 border-y border-slate-100">
          <div className="max-w-[1400px] mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-20">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Institutional Partners</p>
            {partners.map((partner) => (
              <div key={partner.name} className="flex items-center gap-3 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default group">
                <span className="text-2xl group-hover:scale-110 transition-transform">{partner.logo}</span>
                <span className="font-bold text-slate-600 text-sm">{partner.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Internship Listings */}
        <section className="py-24 md:py-32 bg-white flex flex-col items-center">
          <div className="max-w-[1400px] w-full px-4 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <Badge className="bg-orange-50 text-orange-600 border-none mb-4 font-bold">HOT OPPORTUNITIES</Badge>
                <h2 className="text-4xl md:text-5xl font-black text-[#0A2647] tracking-tight">
                  Top Internships This Week
                </h2>
              </div>
              <Link href="/internships">
                <Button variant="ghost" className="text-blue-600 font-bold group">
                  View All <ArrowRight className="ml-2 group-hover:translate-x-1 transition-all" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredInternships.map((internship, idx) => (
                <motion.div
                  key={internship.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <InternshipCard {...internship} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Metrics Grid */}
        <section className="py-20 bg-[#0A2647] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-white.svg')] opacity-[0.03]" />
          <div className="max-w-[1400px] mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {trustMetrics.map((m, i) => (
                <motion.div 
                  key={m.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex p-4 rounded-2xl bg-white/5 mb-6">
                    <m.icon className="text-[#FFD700]" size={28} />
                  </div>
                  <h4 className="text-4xl font-black text-white mb-2">{m.value}</h4>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{m.title}</p>
                  <p className="text-blue-300/60 text-xs font-medium">{m.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Proposition (3D Tilt Effect Prepped) */}
        <section className="py-24 md:py-32 bg-slate-50/30">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-black text-[#0A2647] tracking-tight mb-4">Why Choose InternAdda?</h2>
              <div className="w-20 h-1.5 bg-[#FFD700] mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Rigorous Audit', desc: 'Every internship is manually verified for stipend and quality.', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { icon: MousePointer2, title: '1-Click Apply', desc: 'Personalized profiles mean you apply in seconds, not hours.', color: 'text-blue-500', bg: 'bg-blue-50' },
                { icon: Star, title: 'Smart Matching', desc: 'Our AI finds the roles that match your skill level perfectly.', color: 'text-amber-500', bg: 'bg-amber-50' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                  <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-8`}>
                    <item.icon className={item.color} size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A2647] mb-4">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* High Conversion CTA */}
        <section className="py-24 px-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-[1400px] mx-auto bg-gradient-to-br from-[#0A2647] to-[#144272] rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-[0_50px_100px_rgba(10,38,71,0.3)]"
          >
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[120px]" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                  Start your <br />
                  <span className="text-[#FFD700]">Global Career</span> today.
                </h2>
                <p className="text-xl text-blue-100/70 mb-10 font-medium">
                  Join 7,200+ students already building their future with InternAdda.
                </p>
                <div className="flex flex-wrap gap-6">
                  <Link href="/auth/signup">
                    <Button className="bg-[#FFD700] text-[#0A2647] hover:bg-white px-10 py-8 text-xl rounded-2xl font-black shadow-2xl transition-all">
                      Create Account
                    </Button>
                  </Link>
                  <div className="flex items-center gap-4 text-white/60">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-white/20 border border-white/10" />)}
                    </div>
                    <span className="text-sm font-bold tracking-tight">94% Placement Success</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[3rem] shadow-2xl">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-14 h-14 bg-[#FFD700] rounded-2xl flex items-center justify-center text-[#0A2647]">
                      <Briefcase size={28} />
                    </div>
                    <div>
                      <p className="text-white font-black text-xl">Verified Opportunity</p>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Available Now</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-4 bg-white/5 rounded-full w-full" />
                    ))}
                    <div className="h-4 bg-white/5 rounded-full w-[60%]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

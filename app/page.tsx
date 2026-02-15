'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, Users, CheckCircle, Shield, Clock, 
  GraduationCap, Award, Zap, Star, Briefcase, 
  Sparkles, MousePointer2, TrendingUp, Globe2,
  Rocket, Target, Brain, Code2, Palette, Mic,
  Building2, Network, Leaf, Gem, Crown,
  ChevronRight, Play, BookOpen, Laptop,
  BarChart3, MessageSquare, Coffee, HeartHandshake
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { HeroVisual } from './page-client-components'

// 3D Tilt Card Component
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20
    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.05, 1.05, 1.05)`,
        transition: 'transform 0.1s ease'
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Particle Background Component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{ x: number; y: number; vx: number; vy: number }> = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(59, 130, 246, 0.03)'
      
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}

// Floating Elements Component
const FloatingElements = () => {
  const elements = [
    { Icon: Code2, delay: 0, x: '10%', y: '20%' },
    { Icon: Brain, delay: 1, x: '80%', y: '30%' },
    { Icon: Rocket, delay: 2, x: '20%', y: '70%' },
    { Icon: Target, delay: 3, x: '70%', y: '80%' },
    { Icon: Palette, delay: 4, x: '85%', y: '15%' },
    { Icon: Mic, delay: 5, x: '15%', y: '85%' }
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map(({ Icon, delay, x, y }, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-200/20"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon size={48} />
        </motion.div>
      ))}
    </div>
  )
}

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
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`)
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, type: "spring" }}
      whileHover={{ y: -15 }}
      className="group relative bg-gradient-to-br from-white to-blue-50/30 rounded-[2.5rem] border border-blue-100/50 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(10,38,71,0.15)] overflow-hidden w-full max-w-[380px] flex flex-col transition-all duration-500 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-pink-600/5 transition-all duration-700" />
      
      <div className="relative h-52 w-full overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-full"
        >
          <Image 
            src={image} 
            alt={title} 
            fill 
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-2 shadow-sm z-10 border border-blue-100">
          <TrendingUp size={14} className="text-orange-500" />
          <span className="text-[#0A2647] text-[10px] font-bold tracking-tight">{applicants} Applied</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent opacity-80" />
        
        {/* Animated badge */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg"
        >
          ⚡ Hot Opportunity
        </motion.div>
      </div>

      <div className="px-8 pb-8 pt-2 flex flex-col relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex -space-x-3">
            {companyLogos.map((logo: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="relative w-8 h-8 rounded-full border-2 border-white bg-slate-50 shadow-sm overflow-hidden"
              >
                <Image src={logo} alt="Partner" fill className="object-cover" />
              </motion.div>
            ))}
          </div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">+{otherCompaniesCount} Companies</span>
        </div>

        <h3 className="text-xl font-bold text-[#0A2647] mb-4 leading-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/50">
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
          {skills.slice(0, 3).map((skill: string, idx: number) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 rounded-full text-[10px] font-bold text-blue-700 border border-blue-100 shadow-sm"
            >
              {skill}
            </motion.span>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            onClick={handleApply}
            className="w-full bg-gradient-to-r from-[#0A2647] to-blue-700 hover:from-blue-700 hover:to-[#0A2647] text-white py-7 rounded-2xl font-bold text-base shadow-xl shadow-blue-900/20 active:scale-[0.97] transition-all"
          >
            {user ? 'Instant Apply' : 'Get Started'}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </motion.article>
  )
}

// Success Story Component
const SuccessStory = ({ name, role, image, quote, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-blue-100 shadow-xl"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-200">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div>
        <h4 className="font-bold text-[#0A2647] text-lg">{name}</h4>
        <p className="text-blue-600 text-sm">{role}</p>
      </div>
    </div>
    <p className="text-slate-600 italic">"{quote}"</p>
    <div className="flex gap-1 mt-4">
      {[1,2,3,4,5].map((i) => (
        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  </motion.div>
)

// Live Counter Component
const Counter = ({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black text-[#0A2647] mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-slate-500">{label}</div>
    </div>
  )
}

export default function Home() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { damping: 20 })
  const opacity = useTransform(smoothProgress, [0, 0.2], [1, 0.8])
  const scale = useTransform(smoothProgress, [0, 0.1], [1, 0.98])
  const y = useTransform(smoothProgress, [0, 0.2], [0, -50])

  const trustMetrics = [
    { icon: Shield, title: 'VERIFIED ROLES', value: '500+', sub: 'Companies' },
    { icon: Users, title: 'SUCCESS STORIES', value: '7,200+', sub: 'Students' },
    { icon: Award, title: 'ESTABLISHED', value: '2020', sub: 'Founding Year' },
    { icon: Clock, title: 'HIRING SPEED', value: '48H', sub: 'Avg. Response' },
  ]

  const partners = [
    { name: 'Delhi University', logo: '🎓', color: 'from-blue-500 to-indigo-500' },
    { name: 'LAREX', logo: '🔬', color: 'from-purple-500 to-pink-500' },
    { name: 'Tracxn', logo: '🌐', color: 'from-green-500 to-emerald-500' },
    { name: 'Arjuna-AI', logo: '💻', color: 'from-orange-500 to-red-500' },
  ]

  const successStories = [
    {
      name: 'Priya Sharma',
      role: 'SDE at Google',
      image: '/student1.jpg',
      quote: 'InternAdda helped me land my dream internship at Google. The platform is incredible!'
    },
    {
      name: 'Rahul Verma',
      role: 'Data Scientist at Microsoft',
      image: '/student2.jpg',
      quote: 'The AI-powered matching found opportunities I never knew existed. Game changer!'
    },
    {
      name: 'Anjali Patel',
      role: 'Product Manager at Amazon',
      image: '/student3.jpg',
      quote: 'From intern to full-time, InternAdda was with me every step of the way.'
    }
  ]

  return (
    <div className="selection:bg-blue-100 selection:text-blue-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      
      <main className="relative min-h-screen bg-white overflow-x-hidden">
        {/* Advanced Background Effects */}
        <ParticleBackground />
        <FloatingElements />
        
        {/* Gradient Orbs */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/30 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-purple-100/30 blur-[120px] rounded-full animate-pulse animation-delay-2000" />
          <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] bg-pink-100/30 blur-[120px] rounded-full animate-pulse animation-delay-4000" />
        </div>

        {/* Floating Trust Strip with 3D Effect */}
        <TiltCard>
          <div className="relative z-30 bg-gradient-to-r from-[#0A2647] via-[#1a3a5f] to-[#0A2647] backdrop-blur-md border-b border-white/10 py-3 shadow-2xl">
            <div className="max-w-[1400px] mx-auto px-4 flex justify-center gap-8 items-center text-[11px] font-bold text-white tracking-[0.1em] uppercase">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <CheckCircle size={14} className="text-[#FFD700]" />
                <span>MSME Registered Entity</span>
              </motion.div>
              <div className="h-4 w-px bg-white/20 hidden md:block" />
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <Sparkles size={14} className="text-[#FFD700]" />
                <span>AI-Powered Matching</span>
              </motion.div>
              <div className="h-4 w-px bg-white/20 hidden md:block" />
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2"
              >
                <Crown size={14} className="text-[#FFD700]" />
                <span>Premium Verified</span>
              </motion.div>
            </div>
          </div>
        </TiltCard>

        {/* Hero Section */}
        <motion.section style={{ opacity, scale, y }} className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative z-10 text-center lg:text-left flex flex-col items-center lg:items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-100 px-5 py-2 rounded-full mb-8 text-xs font-bold tracking-tight shadow-sm backdrop-blur-sm">
                    <Sparkles className="inline mr-1" size={12} />
                    The Gold Standard of Internships
                  </Badge>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-black text-[#0A2647] leading-[1.05] mb-6 tracking-tighter"
                >
                  India's Largest <br />
                  <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-500 to-purple-600 inline-block"
                    animate={{ 
                      backgroundPosition: ['0%', '100%', '0%'],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    Internship Hub.
                  </motion.span>
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
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="w-full bg-gradient-to-r from-[#0A2647] to-blue-700 text-white hover:from-blue-700 hover:to-[#0A2647] font-bold px-10 py-8 text-lg rounded-2xl shadow-2xl shadow-blue-900/20 group transition-all">
                        Find Internships 
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/courses" className="w-full sm:w-auto">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" className="w-full border-slate-200 text-[#0A2647] hover:bg-slate-50 px-10 py-8 text-lg rounded-2xl font-bold backdrop-blur-sm">
                        Browse Courses
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-2 pr-6 rounded-full border border-slate-100 shadow-sm"
                >
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map((i, idx) => (
                      <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 + idx * 0.1 }}
                        className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm"
                      >
                        <Image src={`/student${i}.jpg`} alt="Student" width={40} height={40} className="object-cover" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm font-bold text-[#0A2647]">
                    Join <span className="text-blue-600">7,200+</span> Ambitious Students
                  </p>
                </motion.div>

                {/* Live counter strip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-6 mt-8"
                >
                  <div className="text-left">
                    <div className="text-2xl font-black text-blue-600">94%</div>
                    <div className="text-xs text-slate-500">Placement Rate</div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-black text-blue-600">48h</div>
                    <div className="text-xs text-slate-500">Avg Response</div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-black text-blue-600">500+</div>
                    <div className="text-xs text-slate-500">Companies</div>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-[100px] rounded-full"
                />
                <HeroVisual />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Partner Ecosystem with 3D Cards */}
        <section className="bg-gradient-to-b from-slate-50/50 to-white py-12 border-y border-slate-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
          <div className="max-w-[1400px] mx-auto px-4 relative z-10">
            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Trusted By Industry Leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20">
              {partners.map((partner, idx) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="relative group cursor-default"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${partner.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity rounded-full`} />
                  <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{partner.logo}</span>
                    <span className="font-bold text-slate-600 group-hover:text-slate-900 transition-colors text-sm">{partner.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Stats Section */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Counter value={500} label="Active Companies" suffix="+" />
              <Counter value={7200} label="Students Placed" suffix="+" />
              <Counter value={48} label="Hours to Interview" />
              <Counter value={94} label="Success Rate" suffix="%" />
            </div>
          </div>
        </section>

        {/* Internship Listings with 3D Effect */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-white to-blue-50/30 flex flex-col items-center">
          <div className="max-w-[1400px] w-full px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
            >
              <div className="max-w-2xl">
                <Badge className="bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 border-none mb-4 font-bold px-4 py-2">
                  <Zap className="inline mr-1" size={12} />
                  HOT OPPORTUNITIES
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black text-[#0A2647] tracking-tight">
                  Top Internships This Week
                </h2>
                <p className="text-slate-500 mt-4 text-lg">Hand-picked opportunities from top companies</p>
              </div>
              <Link href="/internships">
                <motion.div whileHover={{ x: 10 }}>
                  <Button variant="ghost" className="text-blue-600 font-bold group">
                    View All Opportunities <ChevronRight className="ml-2 group-hover:translate-x-1 transition-all" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredInternships.map((internship, idx) => (
                <TiltCard key={internship.id}>
                  <InternshipCard {...internship} />
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Carousel */}
        <section className="py-24 bg-gradient-to-b from-blue-50/30 to-white">
          <div className="max-w-[1400px] mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 border-none mb-4 font-bold px-4 py-2">
                <HeartHandshake className="inline mr-1" size={12} />
                SUCCESS STORIES
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-[#0A2647] tracking-tight mb-4">
                From Interns to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Industry Leaders</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Real stories from students who transformed their careers with InternAdda
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {successStories.map((story, idx) => (
                <SuccessStory key={idx} {...story} delay={idx * 0.2} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-6 rounded-xl font-bold">
                Read More Success Stories <ArrowRight className="ml-2" size={16} />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Trust Metrics Grid with 3D Cards */}
        <section className="py-20 bg-gradient-to-br from-[#0A2647] via-[#0f2b4a] to-[#1a3a5f] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-white.svg')] opacity-[0.03]" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute top-[-50%] right-[-20%] w-[70%] h-[70%] bg-blue-500/10 rounded-full blur-[100px]"
            />
          </div>
          
          <div className="max-w-[1400px] mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {trustMetrics.map((m, i) => (
                <TiltCard key={m.title}>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-6"
                    >
                      <m.icon className="text-[#FFD700]" size={28} />
                    </motion.div>
                    <h4 className="text-4xl font-black text-white mb-2">{m.value}</h4>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">{m.title}</p>
                    <p className="text-blue-300/60 text-xs font-medium">{m.sub}</p>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid with 3D Icons */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-white to-blue-50/30">
          <div className="max-w-[1200px] mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <Badge className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border-none mb-4 font-bold px-4 py-2">
                <Rocket className="inline mr-1" size={12} />
                WHY INTERNADDA
              </Badge>
              <h2 className="text-4xl font-black text-[#0A2647] tracking-tight mb-4">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Complete</span> Platform
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Rigorous Audit', desc: 'Every internship is manually verified for stipend and quality.', color: 'from-emerald-500 to-green-500', bg: 'bg-emerald-50' },
                { icon: MousePointer2, title: '1-Click Apply', desc: 'Personalized profiles mean you apply in seconds, not hours.', color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-50' },
                { icon: Star, title: 'Smart Matching', desc: 'Our AI finds the roles that match your skill level perfectly.', color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50' },
                { icon: Brain, title: 'Skill Assessment', desc: 'Know exactly where you stand with our AI-powered tests.', color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50' },
                { icon: Network, title: 'Mentorship', desc: 'Get guidance from industry experts working at top firms.', color: 'from-red-500 to-rose-500', bg: 'bg-red-50' },
                { icon: Gem, title: 'Premium Access', desc: 'Unlock exclusive opportunities from Indias best companies.', color: 'from-cyan-500 to-teal-500', bg: 'bg-cyan-50' }
              ].map((item, idx) => (
                <TiltCard key={idx}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl transition-all"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${item.color} bg-opacity-10`}
                    >
                      <item.icon className="text-white" size={32} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-[#0A2647] mb-4">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
          <div className="max-w-[1200px] mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Users, value: '7.2k+', label: 'Students Placed' },
                { icon: Building2, value: '500+', label: 'Partner Companies' },
                { icon: Briefcase, value: '2.5k+', label: 'Active Internships' },
                { icon: Globe2, value: '30+', label: 'Countries' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center text-white"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex p-3 rounded-full bg-white/20 backdrop-blur-sm mb-4"
                  >
                    <stat.icon size={24} />
                  </motion.div>
                  <div className="text-3xl font-black mb-1">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog/Resources Section */}
        <section className="py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 border-none mb-4 font-bold px-4 py-2">
                <BookOpen className="inline mr-1" size={12} />
                RESOURCES
              </Badge>
              <h2 className="text-4xl font-black text-[#0A2647] tracking-tight mb-4">
                Learn & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Grow</span>
              </h2>
              <p className="text-slate-500 text-lg">Insights and guides from industry experts</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Resume Building Guide', reads: '2.5k reads', time: '5 min' },
                { title: 'Interview Tips from Google', reads: '3.8k reads', time: '8 min' },
                { title: 'Top Skills for 2024', reads: '4.2k reads', time: '6 min' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A2647] mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                    <span>{item.reads}</span>
                    <span>•</span>
                    <span>{item.time} read</span>
                  </div>
                  <div className="flex items-center text-blue-600 font-medium">
                    Read More <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with 3D Animation */}
        <section className="py-24 px-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-[1400px] mx-auto"
          >
            <TiltCard>
              <div className="bg-gradient-to-br from-[#0A2647] via-[#1a3a5f] to-[#144272] rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-[0_50px_100px_rgba(10,38,71,0.3)]">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 45, 0],
                  }}
                  transition={{ duration: 15, repeat: Infinity }}
                  className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[120px]"
                />
                
                {/* Floating elements */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-20 left-20 text-white/10"
                >
                  <Rocket size={80} />
                </motion.div>
                
                <motion.div
                  animate={{
                    y: [0, 20, 0],
                    rotate: [0, -10, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute bottom-20 right-20 text-white/10"
                >
                  <Target size={80} />
                </motion.div>

                <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <motion.h2 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight"
                    >
                      Start your <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                        Global Career
                      </span> today.
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="text-xl text-blue-100/70 mb-10 font-medium"
                    >
                      Join 7,200+ students already building their future with InternAdda.
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-wrap gap-6 items-center"
                    >
                      <Link href="/auth/signup">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button className="bg-gradient-to-r from-[#FFD700] to-yellow-500 text-[#0A2647] hover:from-white hover:to-white px-10 py-8 text-xl rounded-2xl font-black shadow-2xl transition-all">
                            Create Free Account
                            <Rocket className="ml-2" size={20} />
                          </Button>
                        </motion.div>
                      </Link>
                      
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-4 text-white/60 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full"
                      >
                        <div className="flex -space-x-2">
                          {[1,2,3].map(i => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -5, 0] }}
                              transition={{ delay: i * 0.2, repeat: Infinity }}
                              className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white/20"
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold tracking-tight text-white">94% Placement Success</span>
                      </motion.div>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="flex gap-4 mt-8"
                    >
                      {['ISO Certified', 'MSME Registered', 'Govt Approved'].map((badge, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-xs text-white/40">
                          <CheckCircle size={12} className="text-green-400" />
                          <span>{badge}</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  <div className="hidden lg:block relative">
                    <TiltCard>
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[3rem] shadow-2xl"
                      >
                        <div className="flex items-center gap-6 mb-8">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-14 h-14 bg-gradient-to-r from-[#FFD700] to-yellow-500 rounded-2xl flex items-center justify-center text-[#0A2647]"
                          >
                            <Briefcase size={28} />
                          </motion.div>
                          <div>
                            <p className="text-white font-black text-xl">Verified Opportunity</p>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Available Now</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <motion.div
                            animate={{ width: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2, delay: 1, repeat: Infinity }}
                            className="h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                          />
                          <div className="h-4 bg-white/5 rounded-full w-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: '75%' }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, delay: 0.5 }}
                              className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                            />
                          </div>
                          <div className="h-4 bg-white/5 rounded-full w-3/4" />
                          <div className="h-4 bg-white/5 rounded-full w-1/2" />
                          
                          <div className="flex justify-between mt-4 text-white/60 text-xs">
                            <span>Match Score: 94%</span>
                            <span>Applications: 128</span>
                          </div>
                        </div>
                      </motion.div>
                    </TiltCard>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-[800px] mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 border-none mb-4 font-bold px-4 py-2">
                <MessageSquare className="inline mr-1" size={12} />
                STAY UPDATED
              </Badge>
              <h3 className="text-3xl font-black text-[#0A2647] mb-4">Get Weekly Internship Alerts</h3>
              <p className="text-slate-500 mb-8">Join 15,000+ subscribers who get the best opportunities in their inbox</p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-[#0A2647] to-blue-700 text-white px-8 py-4 rounded-2xl font-bold whitespace-nowrap">
                    Subscribe
                    <Sparkles className="ml-2" size={16} />
                  </Button>
                </motion.div>
              </div>
              
              <p className="text-xs text-slate-400 mt-4">No spam, unsubscribe anytime.</p>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

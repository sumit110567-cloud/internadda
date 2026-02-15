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
  BarChart3, MessageSquare, Coffee, HeartHandshake,
  Infinity, Orbit, Workflow, Binary, CandlestickChart,
  Waves, Crosshair, GanttChartSquare, Hexagon
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { HeroVisual } from './page-client-components'

// Enhanced 3D Tilt Card Component with better aesthetics
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    setRotate({
      x: (y - centerY) / 20,
      y: (centerX - x) / 20
    })
    
    setGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    })
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
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.1s ease'
      }}
      className={`relative group ${className}`}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(37,99,235,0.12), transparent 70%)`
        }}
      />
      {children}
    </motion.div>
  )
}

// Refined Particle Background
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }> = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2,
        opacity: Math.random() * 0.3
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(37, 99, 235, ${p.opacity})`
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

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-50" />
}

// Floating Elements with refined animation
const FloatingElements = () => {
  const elements = [
    { Icon: Code2, delay: 0, x: '5%', y: '15%', size: 24 },
    { Icon: Brain, delay: 1, x: '90%', y: '20%', size: 28 },
    { Icon: Rocket, delay: 2, x: '10%', y: '80%', size: 26 },
    { Icon: Target, delay: 3, x: '85%', y: '85%', size: 22 },
    { Icon: Workflow, delay: 4, x: '45%', y: '45%', size: 32 }
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map(({ Icon, delay, x, y, size }, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-100/20"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6 + i,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon size={size} />
        </motion.div>
      ))}
    </div>
  )
}

// Enhanced Internship Card with premium styling
const InternshipCard = ({ id, title, company, stipend, location, skills, applicants, otherCompaniesCount, image, companyLogos, matchScore = 94 }: any) => {
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, type: "spring" }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl overflow-hidden w-full max-w-[380px] mx-auto flex flex-col transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-transparent to-purple-600/0 group-hover:from-blue-600/[0.02] group-hover:to-purple-600/[0.02] transition-opacity duration-700" />
      
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-full"
        >
          <Image 
            src={image} 
            alt={title} 
            fill 
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="object-cover"
            priority={false}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-white/90 backdrop-blur-sm text-blue-600 border-0 text-xs font-semibold px-3 py-1 shadow-sm">
            Featured
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex -space-x-2">
            {companyLogos?.slice(0, 3).map((logo: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="relative w-7 h-7 rounded-full border-2 border-white bg-white shadow-sm overflow-hidden"
              >
                <Image src={logo} alt="Partner" fill className="object-cover" sizes="28px" />
              </motion.div>
            ))}
          </div>
          <span className="text-xs font-medium text-slate-400">+{otherCompaniesCount} more</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-slate-500 mb-3 flex items-center gap-1">
          <Building2 size={14} className="text-slate-400 flex-shrink-0" />
          <span className="truncate">{company}</span>
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-slate-50 p-2 rounded-xl">
            <p className="text-xs text-slate-400 mb-0.5">Stipend</p>
            <p className="font-semibold text-slate-900 text-sm truncate">{stipend}</p>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl">
            <p className="text-xs text-slate-400 mb-0.5">Location</p>
            <p className="font-semibold text-slate-900 text-sm truncate">{location}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills.slice(0, 3).map((skill: string) => (
            <span key={skill} className="bg-slate-100 px-2.5 py-1 rounded-full text-xs font-medium text-slate-600">
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="text-xs text-slate-400 self-center">+{skills.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Users size={14} />
            <span>{applicants} applicants</span>
          </div>
          {matchScore && (
            <div className="flex items-center gap-1">
              <Zap size={14} className="text-amber-500" />
              <span className="text-xs font-semibold text-amber-600">{matchScore}% match</span>
            </div>
          )}
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            onClick={handleApply}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-xl font-medium shadow-sm hover:shadow-md transition-all text-sm"
          >
            {user ? 'Apply Now' : 'Get Started'}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
          </Button>
        </motion.div>
      </div>
    </motion.article>
  )
}

// Enhanced Counter Component
const Counter = ({ value, label, suffix = "", prefix = "", duration = 2000 }: { value: number; label: string; suffix?: string; prefix?: string; duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        
        setCount(Math.floor(progress * value))
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, value, duration])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  )
}

// Success Story Component
const SuccessStory = ({ name, role, image, quote, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true, margin: "-50px" }}
    className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all max-w-[350px] mx-auto"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100 flex-shrink-0">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover"
          sizes="56px"
        />
      </div>
      <div className="min-w-0">
        <h4 className="font-semibold text-slate-900 text-base truncate">{name}</h4>
        <p className="text-sm text-blue-600 truncate">{role}</p>
      </div>
    </div>
    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">"{quote}"</p>
    <div className="flex gap-0.5 mt-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  </motion.div>
)

export default function Home() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { damping: 25 })
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.95])
  const heroScale = useTransform(smoothProgress, [0, 0.1], [1, 0.99])

  const featuredInternships = [
    {
      id: '1',
      title: 'Senior Python Developer',
      company: 'Arjuna AI Solutions',
      stipend: '₹50K - ₹80K',
      location: 'Remote',
      skills: ['Python', 'Django', 'AWS'],
      applicants: 45,
      image: '/python.jpg',
      otherCompaniesCount: 12,
      companyLogos: ['/company1.jpg', '/company2.jpg', '/company3.jpg'],
      matchScore: 96
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'TechCorp India',
      stipend: '₹60K - ₹90K',
      location: 'Hybrid',
      skills: ['React', 'Node.js', 'TypeScript'],
      applicants: 32,
      image: '/react.jpg',
      otherCompaniesCount: 8,
      companyLogos: ['/company4.jpg', '/company5.jpg', '/company1.jpg'],
      matchScore: 94
    },
    {
      id: '3',
      title: 'Data Scientist',
      company: 'Analytics Pro',
      stipend: '₹70K - ₹1L',
      location: 'Remote',
      skills: ['Python', 'TensorFlow', 'SQL'],
      applicants: 28,
      image: '/datascience.jpg',
      otherCompaniesCount: 15,
      companyLogos: ['/company2.jpg', '/company3.jpg', '/company4.jpg'],
      matchScore: 92
    },
  ]

  const successStories = [
    {
      name: 'Rahul Sharma',
      role: 'SDE at Internadda',
      image: '/student1.jpg',
      quote: 'The personalized mentorship helped me crack my dream job at a top product-based company.'
    },
    {
      name: 'Siddhant Chaturvedi',
      role: 'Researcher at LAREX',
      image: '/student2.jpg',
      quote: 'Found research opportunities I never knew existed. The platform is a game-changer!'
    },
    {
      name: 'Anjali Patel',
      role: 'AI Developer at Arjuna AI',
      image: '/student3.jpg',
      quote: 'From intern to full-time - the journey was seamless with Internadda.'
    },
  ]

  const features = [
    { icon: Shield, title: 'Verified Opportunities', desc: 'Every internship is manually vetted', color: 'from-emerald-500 to-teal-500' },
    { icon: Zap, title: 'Quick Apply', desc: 'Apply in seconds with your profile', color: 'from-blue-500 to-indigo-500' },
    { icon: Brain, title: 'AI Matching', desc: 'Personalized recommendations', color: 'from-purple-500 to-pink-500' },
    { icon: GraduationCap, title: 'Skill Development', desc: 'Curated learning resources', color: 'from-orange-500 to-red-500' },
    { icon: Users, title: 'Mentor Network', desc: 'Connect with industry experts', color: 'from-cyan-500 to-blue-500' },
    { icon: Award, title: 'Certification', desc: 'Earn verifiable credentials', color: 'from-amber-500 to-yellow-500' },
  ]

  return (
    <>
      <Header />
      
      <main className="relative min-h-screen bg-white overflow-x-hidden">
        {/* Background Effects - Subtle */}
        <ParticleBackground />
        <FloatingElements />
        
        {/* Gradient Orbs - More subtle */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-100/20 rounded-full blur-3xl" />
        </div>

        {/* Trust Bar - Refined */}
        <div className="relative bg-white border-b border-slate-100 py-2.5">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-4 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-emerald-500" />
              <span>MSME Registered</span>
            </div>
            <span className="w-px h-3 bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" />
              <span>AI-Powered Matching</span>
            </div>
            <span className="w-px h-3 bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-blue-500" />
              <span>100% Verified</span>
            </div>
          </div>
        </div>

        {/* Hero Section - Centered */}
        <motion.section 
          style={{ opacity: heroOpacity, scale: heroScale }} 
          className="relative pt-8 pb-16 md:pt-12 md:pb-20 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="bg-blue-50 text-blue-700 border-blue-100 px-4 py-2 rounded-full mb-6 inline-flex items-center gap-1.5">
                  <Sparkles size={14} />
                  India's #1 Internship Platform
                </Badge>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight max-w-4xl mx-auto mb-4"
              >
                India's Largest Dedicated{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Internship Ecosystem
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base md:text-lg text-slate-600 mb-8 max-w-2xl mx-auto"
              >
                Connect with 200+ verified companies. Get personalized matches, skill assessments, and mentorship from industry experts.
              </motion.p>

              {/* CTA Buttons - Centered */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 mb-8 w-full sm:w-auto justify-center"
              >
                <Link href="/internships" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-5 text-sm rounded-xl shadow-md hover:shadow-lg transition-all">
                    Explore Opportunities
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
                <Link href="/courses" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 px-6 py-5 text-sm rounded-xl">
                    Explore Courses
                  </Button>
                </Link>
              </motion.div>

              {/* Social Proof - Centered */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center"
              >
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm"
                    >
                      <Image 
                        src={`/student${i}.jpg`} 
                        alt="Student" 
                        width={32} 
                        height={32} 
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-900">7,200+</span> students placed
                </p>
              </motion.div>

              {/* Quick Stats - Centered */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4 mt-8"
              >
                <div className="text-center px-3">
                  <div className="text-base font-bold text-slate-900">500+</div>
                  <div className="text-xs text-slate-500">Active Roles</div>
                </div>
                <div className="w-px h-6 bg-slate-200" />
                <div className="text-center px-3">
                  <div className="text-base font-bold text-slate-900">48h</div>
                  <div className="text-xs text-slate-500">Avg Response</div>
                </div>
                <div className="w-px h-6 bg-slate-200" />
                <div className="text-center px-3">
                  <div className="text-base font-bold text-slate-900">200+</div>
                  <div className="text-xs text-slate-500">Companies</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Partner Logos - Centered */}
        <section className="py-12 border-y border-slate-100 bg-slate-50/30">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider mb-8">
              Trusted by leading institutions
            </p>
        
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {["University of Delhi", "Tracxn", "LAREX", "Arjuna AI"].map((name, idx) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-slate-600 font-medium text-sm md:text-base hover:text-slate-900 transition-colors"
                >
                  {name}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section - Centered */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <Counter value={200} label="Active Companies" suffix="+" />
              <Counter value={7200} label="Students Placed" suffix="+" />
              <Counter value={500} label="Live Internships" suffix="+" />
              <Counter value={6500} label="Avg. Stipend" prefix="₹" suffix="+" />
            </div>
          </div>
        </section>

        {/* Featured Internships - Centered */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-3">
                Featured Opportunities
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Premium Internships
              </h2>
              <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
                Hand-picked opportunities from top companies
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6">
              {featuredInternships.map((internship, idx) => (
                <TiltCard key={internship.id}>
                  <InternshipCard {...internship} />
                </TiltCard>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/internships">
                <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 px-6 py-5 text-sm rounded-xl">
                  View All Opportunities
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid - Centered */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 mb-3">
                Why Choose Us
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Everything You Need to Succeed
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Comprehensive platform designed to accelerate your career growth
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {features.map((feature, idx) => (
                <TiltCard key={idx}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} mx-auto flex items-center justify-center mb-3`}>
                      <feature.icon className="text-white" size={20} />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1">{feature.title}</h3>
                    <p className="text-slate-500 text-xs">{feature.desc}</p>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories - Centered */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-3">
                Success Stories
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Real Stories, Real Success
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Hear from students who transformed their careers with InternAdda
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6">
              {successStories.map((story, idx) => (
                <SuccessStory key={idx} {...story} delay={idx * 0.2} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Centered */}
        <section className="py-16 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-blue-500/10 text-blue-300 border-blue-400/20 mb-4">
                Get Started Today
              </Badge>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to Launch Your Career?
              </h2>
              
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto text-sm md:text-base">
                Join 7,200+ students who have already found their dream internships
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/auth/signup" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 px-6 py-5 text-sm rounded-xl shadow-md">
                    Create Free Account
                    <Rocket className="ml-2" size={16} />
                  </Button>
                </Link>
                
                <Link href="/internships" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-slate-600 text-white hover:bg-slate-800 px-6 py-5 text-sm rounded-xl">
                    Browse Internships
                  </Button>
                </Link>
              </div>
              
              <p className="text-xs text-slate-400 mt-5">
                No credit card required • Free forever • 94% placement rate
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}

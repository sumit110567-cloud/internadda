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

// Enhanced 3D Tilt Card Component
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
      x: (y - centerY) / 15,
      y: (centerX - x) / 15
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
        transition: 'transform 0.2s ease'
      }}
      className={`relative group ${className}`}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(59,130,246,0.15), transparent 50%)`
        }}
      />
      {children}
    </motion.div>
  )
}

// Enhanced Particle Background
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
    const particleCount = 80

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5
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
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`
        ctx.fill()
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`
            ctx.stroke()
          }
        })
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

// Floating Elements with improved animation
const FloatingElements = () => {
  const elements = [
    { Icon: Code2, delay: 0, x: '5%', y: '15%', size: 32 },
    { Icon: Brain, delay: 1, x: '85%', y: '25%', size: 40 },
    { Icon: Rocket, delay: 2, x: '15%', y: '75%', size: 36 },
    { Icon: Target, delay: 3, x: '75%', y: '85%', size: 28 },
    { Icon: Palette, delay: 4, x: '90%', y: '10%', size: 34 },
    { Icon: Mic, delay: 5, x: '10%', y: '90%', size: 30 },
    { Icon: Workflow, delay: 6, x: '45%', y: '45%', size: 42 },
    { Icon: Hexagon, delay: 7, x: '60%', y: '60%', size: 38 }
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map(({ Icon, delay, x, y, size }, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-200/10"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{
            duration: 8 + i,
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

// Enhanced Internship Card
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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, type: "spring" }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-[2rem] border border-slate-200/50 shadow-lg hover:shadow-2xl overflow-hidden w-full max-w-[400px] flex flex-col transition-all duration-500"
    >
      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-full"
        >
          <Image 
            src={image} 
            alt={title} 
            fill 
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
            priority={false}
          />
        </motion.div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        
        {/* Premium Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg"
          >
            <span className="text-xs font-bold text-blue-600">⚡ Premium</span>
          </motion.div>
          
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 rounded-full shadow-lg"
          >
            <span className="text-xs font-bold text-white">Featured</span>
          </motion.div>
        </div>
        
        {/* Match Score */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-xs font-bold text-emerald-600">{matchScore}% Match</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 pt-2">
        {/* Company Logos */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex -space-x-2">
            {companyLogos?.map((logo: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="relative w-8 h-8 rounded-full border-2 border-white bg-slate-100 shadow-md overflow-hidden"
              >
                <Image 
                  src={logo} 
                  alt="Partner" 
                  fill 
                  className="object-cover"
                  sizes="32px"
                />
              </motion.div>
            ))}
          </div>
          <span className="text-xs font-medium text-slate-400">+{otherCompaniesCount} openings</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Company */}
        <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
          <Building2 size={14} className="text-slate-400" />
          {company}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-50 p-2 rounded-xl">
            <p className="text-xs text-slate-400 mb-1">Stipend</p>
            <p className="font-bold text-slate-900 text-sm">{stipend}</p>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl">
            <p className="text-xs text-slate-400 mb-1">Location</p>
            <p className="font-bold text-slate-900 text-sm">{location}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 3).map((skill: string, idx: number) => (
            <span
              key={skill}
              className="bg-slate-100 px-2.5 py-1 rounded-full text-xs font-medium text-slate-700"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="text-xs text-slate-400">+{skills.length - 3}</span>
          )}
        </div>

        {/* Applicants */}
        <div className="flex items-center gap-2 mb-4 text-xs text-slate-400">
          <Users size={14} />
          <span>{applicants} applicants</span>
        </div>

        {/* Apply Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            onClick={handleApply}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            {user ? 'Apply Now' : 'Get Started'}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
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
      <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
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
    transition={{ delay }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div>
        <h4 className="font-semibold text-slate-900">{name}</h4>
        <p className="text-sm text-blue-600">{role}</p>
      </div>
    </div>
    <p className="text-slate-600 text-sm leading-relaxed">"{quote}"</p>
    <div className="flex gap-1 mt-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  </motion.div>
)

export default function Home() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { damping: 25 })
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.9])
  const heroScale = useTransform(smoothProgress, [0, 0.1], [1, 0.98])

  const featuredInternships = [
    {
      id: '1',
      title: 'Senior Python Developer',
      company: 'Arjuna AI Solutions',
      stipend: '₹50,000 - ₹80,000',
      location: 'Remote',
      skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
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
      stipend: '₹60,000 - ₹90,000',
      location: 'Hybrid',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
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
      stipend: '₹70,000 - ₹1,00,000',
      location: 'Remote',
      skills: ['Python', 'TensorFlow', 'SQL', 'PyTorch'],
      applicants: 28,
      image: '/datascience.jpg',
      otherCompaniesCount: 15,
      companyLogos: ['/company2.jpg', '/company3.jpg', '/company4.jpg'],
      matchScore: 92
    },
  ]

  const partners = [
    { name: 'Microsoft', logo: '/microsoft.svg', category: 'Technology' },
    { name: 'Google', logo: '/google.svg', category: 'Technology' },
    { name: 'Amazon', logo: '/amazon.svg', category: 'E-commerce' },
    { name: 'Meta', logo: '/meta.svg', category: 'Social Media' },
    { name: 'Adobe', logo: '/adobe.svg', category: 'Creative' },
    { name: 'Salesforce', logo: '/salesforce.svg', category: 'CRM' },
  ]

  const successStories = [
    {
      name: 'Priya Sharma',
      role: 'SDE at Google',
      image: '/student1.jpg',
      quote: 'The personalized mentorship and skill assessments helped me crack my dream job.'
    },
    {
      name: 'Rahul Verma',
      role: 'Data Scientist at Microsoft',
      image: '/student2.jpg',
      quote: 'Found opportunities I never knew existed. The platform is a game-changer!'
    },
    {
      name: 'Anjali Patel',
      role: 'Product Manager at Amazon',
      image: '/student3.jpg',
      quote: 'From intern to full-time - the journey was seamless with InternAdda.'
    },
  ]

  const features = [
    { icon: Shield, title: 'Verified Opportunities', desc: 'Every internship is manually vetted for quality', color: 'from-emerald-500 to-teal-500' },
    { icon: Zap, title: 'Quick Apply', desc: 'Apply in seconds with your smart profile', color: 'from-blue-500 to-indigo-500' },
    { icon: Brain, title: 'AI Matching', desc: 'Get personalized recommendations', color: 'from-purple-500 to-pink-500' },
    { icon: GraduationCap, title: 'Skill Development', desc: 'Access curated learning resources', color: 'from-orange-500 to-red-500' },
    { icon: Users, title: 'Mentor Network', desc: 'Connect with industry experts', color: 'from-cyan-500 to-blue-500' },
    { icon: Award, title: 'Certification', desc: 'Earn verifiable credentials', color: 'from-amber-500 to-yellow-500' },
  ]

  return (
    <>
      <Header />
      
      <main className="relative min-h-screen bg-white overflow-x-hidden">
        {/* Background Effects */}
        <ParticleBackground />
        <FloatingElements />
        
        {/* Gradient Orbs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl" />
        </div>

        {/* Trust Bar */}
        <div className="relative bg-slate-900 text-white border-b border-slate-800 py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-6 text-xs font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-400" />
              <span>MSME Registered</span>
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-emerald-400" />
              <span>ISO 27001 Certified</span>
            </div>
            <div className="w-px h-4 bg-slate-700 hidden md:block" />
            <div className="items-center gap-2 hidden md:flex">
              <Sparkles size={14} className="text-emerald-400" />
              <span>AI-Powered Matching</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <motion.section 
          style={{ opacity: heroOpacity, scale: heroScale }} 
          className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 rounded-full mb-6 inline-flex items-center gap-1">
                    <Sparkles size={14} />
                    India's #1 Internship Platform
                  </Badge>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4"
                >
                  Launch Your Career with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Premium Internships
                  </span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0"
                >
                  Connect with 500+ verified companies. Get personalized matches, skill assessments, and mentorship from industry experts.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
                >
                  <Link href="/internships">
                    <Button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-base rounded-xl shadow-lg hover:shadow-xl transition-all">
                      Explore Opportunities
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </Link>
                  <Link href="/hire">
                    <Button variant="outline" className="w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-6 text-base rounded-xl">
                      For Employers
                    </Button>
                  </Link>
                </motion.div>

                {/* Social Proof */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-4 justify-center lg:justify-start"
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

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-6 mt-8 justify-center lg:justify-start"
                >
                  <div>
                    <div className="text-lg font-bold text-slate-900">94%</div>
                    <div className="text-xs text-slate-500">Placement Rate</div>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div>
                    <div className="text-lg font-bold text-slate-900">48h</div>
                    <div className="text-xs text-slate-500">Avg Response</div>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div>
                    <div className="text-lg font-bold text-slate-900">500+</div>
                    <div className="text-xs text-slate-500">Companies</div>
                  </div>
                </motion.div>
              </div>

              {/* Right Visual */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative hidden lg:block"
              >
                <div className="relative">
                  <HeroVisual />
                  
                  {/* Floating Cards */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -left-8 top-20 bg-white p-4 rounded-xl shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Featured</p>
                        <p className="text-sm font-semibold">Google Internship</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -right-8 bottom-20 bg-white p-4 rounded-xl shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">New Match</p>
                        <p className="text-sm font-semibold">Microsoft</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Partner Logos */}
        <section className="py-12 border-y border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-center text-xs font-medium text-slate-400 uppercase tracking-wider mb-6">
              Trusted by Industry Leaders
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
              {partners.map((partner, idx) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex justify-center grayscale hover:grayscale-0 transition-all"
                >
                  <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Counter value={500} label="Active Companies" suffix="+" />
              <Counter value={7200} label="Students Placed" suffix="+" />
              <Counter value={2500} label="Live Internships" suffix="+" />
              <Counter value={94} label="Success Rate" suffix="%" />
            </div>
          </div>
        </section>

        {/* Featured Internships */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-end mb-10"
            >
              <div>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-3">
                  Featured Opportunities
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Premium Internships
                </h2>
                <p className="text-slate-500 mt-2">Hand-picked opportunities from top companies</p>
              </div>
              <Link href="/internships" className="hidden md:block">
                <Button variant="link" className="text-blue-600">
                  View All <ChevronRight size={16} className="ml-1" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredInternships.map((internship, idx) => (
                <TiltCard key={internship.id}>
                  <InternshipCard {...internship} />
                </TiltCard>
              ))}
            </div>

            <div className="text-center md:hidden mt-6">
              <Link href="/internships">
                <Button variant="outline" className="border-blue-200 text-blue-600">
                  View All Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 mb-3">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Comprehensive platform designed to accelerate your career growth
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <TiltCard key={idx}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} bg-opacity-10 flex items-center justify-center mb-4`}>
                      <feature.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-500 text-sm">{feature.desc}</p>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-3">
                Success Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Real Stories, Real Success
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Hear from students who transformed their careers with InternAdda
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {successStories.map((story, idx) => (
                <SuccessStory key={idx} {...story} delay={idx * 0.2} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 mb-4">
                Get Started Today
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Launch Your Career?
              </h2>
              
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Join 7,200+ students who have already found their dream internships
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-base rounded-xl shadow-lg">
                    Create Free Account
                    <Rocket className="ml-2" size={18} />
                  </Button>
                </Link>
                
                <Link href="/internships">
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-base rounded-xl">
                    Browse Internships
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-slate-400 mt-6">
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

'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, Users, CheckCircle, Shield, Clock, 
  GraduationCap, Award, Zap, Star, Briefcase, 
  Sparkles, TrendingUp, Globe2,
  Rocket, Target, Brain, Code2, Building2,
  ChevronRight, BookOpen, Laptop,
  BarChart3, MessageSquare, Coffee, HeartHandshake,
  Workflow, Hexagon
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { HeroVisual } from './page-client-components'

// Enhanced 3D Tilt Card Component (kept but simplified)
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
    
    setRotate({
      x: (y - centerY) / 20,
      y: (centerX - x) / 20
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
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Enhanced Internship Card - Refined
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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-[400px] flex flex-col"
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <div className="relative w-full h-full">
          <Image 
            src={image} 
            alt={title} 
            fill 
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority={false}
          />
        </div>
        <div className="absolute top-4 left-4">
          <span className="text-xs font-medium text-white bg-blue-600 px-3 py-1.5 rounded-full">Featured</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex -space-x-2">
            {companyLogos?.map((logo: string, idx: number) => (
              <div
                key={idx}
                className="relative w-8 h-8 rounded-full border-2 border-white bg-white shadow-sm overflow-hidden"
              >
                <Image src={logo} alt="Partner" fill className="object-cover" sizes="32px" />
              </div>
            ))}
          </div>
          <span className="text-xs font-medium text-slate-500">+{otherCompaniesCount} openings</span>
        </div>

        <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-slate-600 mb-4 flex items-center gap-1.5">
          <Building2 size={14} className="text-slate-400" />
          {company}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-50 p-3 rounded-xl">
            <p className="text-xs text-slate-500 mb-1">Stipend</p>
            <p className="font-semibold text-slate-900 text-sm">{stipend}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl">
            <p className="text-xs text-slate-500 mb-1">Location</p>
            <p className="font-semibold text-slate-900 text-sm">{location}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 3).map((skill: string) => (
            <span key={skill} className="bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-700">
              {skill}
            </span>
          ))}
          {skills.length > 3 && <span className="text-xs text-slate-400">+{skills.length - 3}</span>}
        </div>

        <div className="flex items-center gap-1.5 mb-5 text-sm text-slate-500">
          <Users size={14} />
          <span>{applicants} applicants</span>
        </div>

        <Button 
          onClick={handleApply}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
        >
          {user ? 'Apply Now' : 'Get Started'}
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
        </Button>
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
      <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  )
}

// Success Story Component - Refined
const SuccessStory = ({ name, role, image, quote, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-slate-200">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover"
          sizes="56px"
        />
      </div>
      <div>
        <h4 className="font-semibold text-slate-900">{name}</h4>
        <p className="text-sm text-blue-600">{role}</p>
      </div>
    </div>
    <p className="text-slate-600 text-sm leading-relaxed">"{quote}"</p>
    <div className="flex gap-0.5 mt-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="text-blue-600 fill-blue-600" />
      ))}
    </div>
  </motion.div>
)

export default function Home() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { damping: 25 })
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.98])

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

  const successStories = [
    {
      name: 'Rahul Sharma',
      role: 'SDE at Internadda',
      image: '/student1.jpg',
      quote: 'The personalized mentorship and skill assessments helped me crack my first job.'
    },
    {
      name: 'Siddhant Chaturvedi',
      role: 'Researcher at LAREX',
      image: '/student2.jpg',
      quote: 'Found opportunities I never knew existed. The platform is a game-changer!'
    },
    {
      name: 'Anjali Patel',
      role: 'AI Developer Manager at Arjuna-AI',
      image: '/student3.jpg',
      quote: 'From intern to full-time - the journey was seamless with Internadda.'
    },
  ]

  const features = [
    { icon: Shield, title: 'Verified Opportunities', desc: 'Every internship is manually vetted for quality' },
    { icon: Zap, title: 'Quick Apply', desc: 'Apply in seconds with your smart profile' },
    { icon: Brain, title: 'AI Matching', desc: 'Get personalized recommendations' },
    { icon: GraduationCap, title: 'Skill Development', desc: 'Access curated learning resources' },
    { icon: Users, title: 'Mentor Network', desc: 'Connect with industry experts' },
    { icon: Award, title: 'Certification', desc: 'Earn verifiable credentials' },
  ]

  return (
    <>
      <Header />
      
      <main className="relative min-h-screen bg-white">
        {/* Trust Bar - Refined */}
        <div className="bg-slate-50 border-b border-slate-200 py-2.5">
          <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-blue-600" />
              <span>MSME Registered</span>
            </div>
            <div className="w-px h-3 bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-blue-600" />
              <span>100% Verified Companies</span>
            </div>
            <div className="w-px h-3 bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-blue-600" />
              <span>AI-Powered Matching</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <motion.section 
          style={{ opacity: heroOpacity }} 
          className="relative pt-16 pb-20 md:pt-20 md:pb-28 overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Sparkles size={14} />
                    India's #1 Internship Platform
                  </span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-4"
                >
                  India's Largest Dedicated{' '}
                  <span className="text-blue-600">
                    Internship Ecosystem.
                  </span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0"
                >
                  Connect with 200+ verified companies. Get personalized matches, skill assessments, and mentorship from industry experts.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center lg:justify-start"
                >
                  <Link href="/internships" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-5 text-base rounded-xl shadow-md hover:shadow-lg transition-all">
                      Explore Opportunities
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </Link>
                  <Link href="/courses" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-5 text-base rounded-xl">
                      Explore Courses
                    </Button>
                  </Link>
                </motion.div>

                {/* Social Proof */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
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
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">7,200+</span> students placed
                  </p>
                </motion.div>
              </div>

              {/* Right Visual */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <HeroVisual />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Partner Logos - Refined */}
        <section className="py-16 border-y border-slate-200 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-center text-xs font-medium text-slate-500 uppercase tracking-wider mb-10">
              Trusted by leading institutions
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {["University of Delhi", "Tracxn", "LAREX", "Arjuna-AI"].map((name, idx) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-slate-700 font-medium text-sm md:text-base text-center"
                >
                  {name}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <Counter value={200} label="Active Companies" suffix="+" />
              <Counter value={7200} label="Students Placed" suffix="+" />
              <Counter value={500} label="Live Internships" suffix="+" />
              <Counter value={6500} label="Avg. Stipend" suffix="+" prefix="₹" />
            </div>
          </div>
        </section>

        {/* Featured Internships */}
        <section className="py-20 md:py-28 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left mb-12"
            >
              <span className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                Featured Opportunities
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                Premium Internships
              </h2>
              <p className="text-base text-slate-600">Hand-picked opportunities from top companies</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredInternships.map((internship, idx) => (
                <TiltCard key={internship.id}>
                  <InternshipCard {...internship} />
                </TiltCard>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/internships">
                <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 px-6 py-5 rounded-xl">
                  View All Opportunities
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-base text-slate-600 max-w-2xl mx-auto">
                Comprehensive platform designed to accelerate your career growth
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    <feature.icon className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 md:py-28 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                Success Stories
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Real Stories, Real Success
              </h2>
              <p className="text-base text-slate-600 max-w-2xl mx-auto">
                Hear from students who transformed their careers with InternAdda
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {successStories.map((story, idx) => (
                <SuccessStory key={idx} {...story} delay={idx * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Refined */}
        <section className="py-20 md:py-28 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Get Started Today
              </span>
              
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Ready to Launch Your Career?
              </h2>
              
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                Join 7,200+ students who have already found their dream internships
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 px-8 py-5 text-base rounded-xl shadow-lg">
                    Create Free Account
                    <Rocket className="ml-2" size={18} />
                  </Button>
                </Link>
                
                <Link href="/internships" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-blue-700 px-8 py-5 text-base rounded-xl">
                    Browse Internships
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-blue-200 mt-8">
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

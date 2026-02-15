'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, Users, CheckCircle, Shield, Clock, 
  GraduationCap, Award, Zap, Star, Briefcase, 
  Sparkles, MousePointer2, TrendingUp, Globe2,
  Rocket, Target, Brain, Code2, Palette,
  Building2, Network, ChevronRight, BookOpen,
  MapPin, Calendar, Filter, Search, HeartHandshake,
  Laptop, BarChart3, MessageSquare, UserCheck
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { HeroVisual } from './page-client-components'

// Professional color palette
const colors = {
  primary: '#0A2647',      // Deep navy - trust
  secondary: '#1E3A5F',    // Medium navy - depth
  accent: '#2A5C8A',       // Steel blue - professionalism
  highlight: '#C4A484',    // Warm taupe - approachable
  success: '#2E5A4C',      // Forest green - growth
  background: '#F8FAFC',   // Light gray - clean
  text: '#1E2B3A',         // Dark slate - readable
  muted: '#5A6B7A'         // Gray blue - subtle
}

// SEO & Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "InternAdda",
  "description": "Connecting students with verified internship opportunities across India",
  "url": "https://internadda.com",
  "foundingDate": "2020"
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
    type: 'Technical'
  },
  {
    id: '2',
    title: 'Web Development Intern',
    company: 'TechLabs India',
    stipend: '₹2,500 - ₹5,000',
    location: 'Remote',
    skills: ['React', 'Next.js', 'Tailwind'],
    applicants: 150,
    image: '/react.jpg',
    type: 'Technical'
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Insight Analytics',
    stipend: '₹3,000 - ₹7,000',
    location: 'Remote',
    skills: ['Python', 'Pandas', 'Matplotlib'],
    applicants: 130,
    image: '/datascience.jpg',
    type: 'Technical'
  },
]

// Tilt Card Component - Subtle 3D effect
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
    const rotateX = (y - centerY) / 30
    const rotateY = (centerX - x) / 30
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
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.1s ease'
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Internship Card Component
const InternshipCard = ({ id, title, company, stipend, location, skills, applicants, image, type }: any) => {
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
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-48 w-full bg-gradient-to-br from-[#0A2647] to-[#1E3A5F]">
        <div className="absolute inset-0 opacity-20 bg-[url('/pattern.svg')]" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
          <Users size={12} className="text-[#2A5C8A]" />
          <span className="text-[#0A2647] text-xs font-medium">{applicants} applied</span>
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-white/90 backdrop-blur-sm text-[#0A2647] border-none">
            {type}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#0A2647] mb-1">{title}</h3>
          <p className="text-sm text-[#5A6B7A]">{company}</p>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1 text-[#5A6B7A]">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1 text-[#2E5A4C] font-medium">
            <span>{stipend}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map((skill: string) => (
            <span
              key={skill}
              className="px-3 py-1 bg-[#F8FAFC] text-[#2A5C8A] text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        <Button 
          onClick={handleApply}
          className="w-full bg-[#0A2647] hover:bg-[#1E3A5F] text-white py-6 rounded-xl font-medium transition-all"
        >
          {user ? 'Apply Now' : 'View Internship'}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </motion.article>
  )
}

// Testimonial Component
const Testimonial = ({ name, role, quote, company }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white p-8 rounded-2xl border border-gray-100"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-full bg-[#C4A484]/10 flex items-center justify-center">
        <span className="text-[#C4A484] font-semibold text-lg">{name.charAt(0)}</span>
      </div>
      <div>
        <h4 className="font-medium text-[#0A2647]">{name}</h4>
        <p className="text-sm text-[#5A6B7A]">{role}</p>
      </div>
    </div>
    <p className="text-[#1E2B3A] mb-3">"{quote}"</p>
    <p className="text-sm text-[#2A5C8A] font-medium">Placed at {company}</p>
  </motion.div>
)

// Stat Component - Single source of truth
const Stat = ({ value, label, description }: { value: string; label: string; description: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-light text-[#0A2647] mb-2">{value}</div>
      <div className="text-sm font-medium text-[#2A5C8A] mb-1">{label}</div>
      <div className="text-xs text-[#5A6B7A]">{description}</div>
    </div>
  )
}

export default function Home() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { damping: 30 })
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.95])
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.98])

  const partners = [
    { name: 'Delhi University', logo: '🎓' },
    { name: 'LAREX', logo: '🔬' },
    { name: 'Tracxn', logo: '🌐' },
    { name: 'TechLabs', logo: '💻' },
    { name: 'Insight', logo: '📊' }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'B.Tech CSE, 3rd Year',
      quote: 'The platform helped me find an internship that actually matched my skills. No spam, just genuine opportunities.',
      company: 'TechLabs India'
    },
    {
      name: 'Rahul Mehta',
      role: 'MCA Graduate',
      quote: 'Clear stipend details, responsive companies, and a smooth application process. Exactly what students need.',
      company: 'Arjuna AI'
    },
    {
      name: 'Anjali Patel',
      role: 'B.Sc Data Science',
      quote: 'Found my first data analytics internship here. The verification process gives confidence in every listing.',
      company: 'Insight Analytics'
    }
  ]

  return (
    <div className="selection:bg-[#C4A484]/20 selection:text-[#0A2647]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      
      <main className="relative min-h-screen bg-[#F8FAFC] overflow-x-hidden">
        {/* Subtle background pattern */}
        <div className="fixed inset-0 bg-[url('/subtle-pattern.svg')] bg-repeat opacity-[0.02] pointer-events-none" />

        {/* Simple Trust Bar - Single appearance */}
        <div className="relative z-30 bg-[#0A2647] text-white py-2.5">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-[#C4A484]" />
              <span>MSME Registered</span>
            </div>
            <div className="w-px h-3 bg-white/20 hidden md:block" />
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-[#C4A484]" />
              <span>Manual Verification</span>
            </div>
            <div className="w-px h-3 bg-white/20 hidden md:block" />
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-[#C4A484]" />
              <span>Avg Response: 48h</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <motion.section 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative pt-16 pb-20 md:pt-20 md:pb-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge className="bg-[#C4A484]/10 text-[#C4A484] border-none px-4 py-1.5 mb-6">
                    India's Internship Platform
                  </Badge>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0A2647] leading-tight mb-6"
                >
                  Find internships that
                  <span className="block font-medium text-[#2A5C8A]">match your potential</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-[#5A6B7A] mb-8 max-w-lg"
                >
                  Connect with 150+ verified companies. Every internship is reviewed before posting.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 mb-10"
                >
                  <Link href="/internships">
                    <Button className="w-full sm:w-auto bg-[#0A2647] hover:bg-[#1E3A5F] text-white px-8 py-6 rounded-xl text-base">
                      Browse Internships
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/companies">
                    <Button variant="outline" className="w-full sm:w-auto border-[#2A5C8A] text-[#2A5C8A] hover:bg-[#2A5C8A]/5 px-8 py-6 rounded-xl">
                      Partner Companies
                    </Button>
                  </Link>
                </motion.div>

                {/* Single stats row - appears once */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center gap-6"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1,2,3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-[#C4A484]/20 border-2 border-white" />
                      ))}
                    </div>
                    <span className="text-sm text-[#5A6B7A]">3,200+ students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-[#2A5C8A]" />
                    <span className="text-sm text-[#5A6B7A]">150+ companies</span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <HeroVisual />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Partner Logos */}
        <section className="border-y border-gray-200 bg-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs uppercase tracking-wider text-[#5A6B7A] mb-6">
              Trusted by students from
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {partners.map((partner, idx) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-2xl">{partner.logo}</span>
                  <span className="text-sm text-[#5A6B7A]">{partner.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Internships */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <h2 className="text-3xl font-light text-[#0A2647] mb-2">
                  Featured <span className="font-medium">Internships</span>
                </h2>
                <p className="text-[#5A6B7A]">Recently added opportunities</p>
              </div>
              <Link href="/internships">
                <Button variant="ghost" className="text-[#2A5C8A] hover:text-[#0A2647]">
                  View all <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredInternships.map((internship, idx) => (
                <TiltCard key={internship.id}>
                  <InternshipCard {...internship} />
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl font-light text-[#0A2647] mb-4">
                Simple <span className="font-medium">Process</span>
              </h2>
              <p className="text-[#5A6B7A]">Three steps to your next opportunity</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Create Profile",
                  description: "Add your skills and preferences",
                  icon: UserCheck
                },
                {
                  step: "02",
                  title: "Browse Opportunities",
                  description: "Explore verified internships",
                  icon: Target
                },
                {
                  step: "03",
                  title: "Apply & Connect",
                  description: "Submit applications directly",
                  icon: Briefcase
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-light text-[#C4A484] mb-4">{item.step}</div>
                  <item.icon className="w-8 h-8 text-[#2A5C8A] mx-auto mb-4" />
                  <h3 className="font-medium text-[#0A2647] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#5A6B7A]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl font-light text-[#0A2647] mb-4">
                Student <span className="font-medium">Stories</span>
              </h2>
              <p className="text-[#5A6B7A]">Real experiences from our community</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Testimonial key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section - Single appearance */}
        <section className="py-16 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Stat value="150+" label="Companies" description="Verified partners" />
              <Stat value="3,200+" label="Students" description="Active job seekers" />
              <Stat value="48h" label="Avg Response" description="From companies" />
              <Stat value="180+" label="Internships" description="Live opportunities" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl font-light text-[#0A2647] mb-4">
                Why <span className="font-medium">InternAdda</span>
              </h2>
              <p className="text-[#5A6B7A]">Built for students, trusted by companies</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Manual Verification",
                  description: "Every internship is reviewed by our team before posting"
                },
                {
                  icon: Clock,
                  title: "Fast Response",
                  description: "Most companies respond within 48 hours"
                },
                {
                  icon: TrendingUp,
                  title: "Career Growth",
                  description: "Opportunities designed for skill development"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <feature.icon className="w-10 h-10 text-[#C4A484] mb-4" />
                  <h3 className="font-medium text-[#0A2647] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#5A6B7A]">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#0A2647]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                Ready to start your <span className="font-medium">internship journey?</span>
              </h2>
              <p className="text-[#C4A484] mb-8">
                Join thousands of students finding meaningful opportunities
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button className="bg-white text-[#0A2647] hover:bg-[#F8FAFC] px-8 py-6 rounded-xl text-base">
                    Create Student Account
                  </Button>
                </Link>
                <Link href="/for-companies">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-xl">
                    For Companies
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="py-6 bg-[#0A2647] border-t border-[#C4A484]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-[#5A6B7A]">
              InternAdda connects students with verified internship opportunities across India.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

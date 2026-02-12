"use client"

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { InternshipCard } from '@/components/InternshipCard'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Users, CheckCircle, Shield, Clock, GraduationCap, Award } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
}

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { staggerChildren: 0.1 },
  viewport: { once: true },
}

const featuredInternships = [
  {
    id: '1',
    title: 'Python Developer Intern',
    company: 'Arjuna AI Solutions',
    stipend: '₹2,000 - ₹8,000',
    location: 'Remote',
    duration: '3-6 months',
    skills: ['Python', 'Django', 'PostgreSQL'],
    applicants: 131,
    isRecommended: true,
    image: '/python.jpg'
  },
  {
    id: '2',
    title: 'Web Development Intern',
    company: 'InternAdda Enterprises',
    stipend: '₹2,500 - ₹5,000',
    location: 'Remote',
    duration: '2-3 months',
    skills: ['React', 'Next.js', 'Tailwind'],
    applicants: 150,
    isRecommended: true,
    image: '/react.jpg'
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Larex Systems',
    stipend: '₹3,000 - ₹7,000',
    location: 'Remote',
    duration: '3-6 months',
    skills: ['Python', 'Pandas', 'Matplotlib'],
    applicants: 130,
    isRecommended: true,
    image: '/datascience.jpg'
  },
]

const trustMetrics = [
  { icon: Shield, title: '100% VERIFIED', value: '500+ Companies' },
  { icon: Users, title: 'ACTIVE STUDENTS', value: '7,200+' },
  { icon: Award, title: 'Verified Internship', value: 'Since 2020' },
  { icon: Clock, title: 'AVG. HIRING', value: '48 Hours' },
]

const partners = [
  { name: 'Delhi University', logo: '🎓' },
  { name: 'LAREX', logo: '🔬' },
  { name: 'Tracxn', logo: '🌐' },
  { name: 'Arjuna-AI', logo: '💻' },
]

const globalPartners = [
  { name: 'Tracxn', quote: '"Most trusted internship platform in India."', logo: '🌐' },
  { name: 'LAREX', quote: '"Transparent, student-focused ecosystem."', logo: '🌐' },
  { name: 'Arjuna-AI', quote: '"Bridging industry-academia gap effectively."', logo: '🌐' },
]

const collaborationSlides = ['/slide1.jpg', '/slide2.jpg', '/slide3.jpg', '/slide4.jpg', '/slide5.jpg', '/slide6.jpg'];
const studentAvatars = ['/student1.jpg', '/student2.jpg', '/student3.jpg', '/student4.jpg'];

export default function Home() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % collaborationSlides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden">
        {/* Trust Badge Strip */}
        <div className="bg-[#0A2647] text-white py-2">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] sm:text-xs tracking-widest font-medium uppercase">
              <div className="flex items-center gap-2">
                <CheckCircle size={12} className="text-[#FFD700]" />
                <span>Global Recognition</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={12} className="text-[#FFD700]" />
                <span>MSME REGISTERED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0A2647] to-[#144272] overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12 md:py-20">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left flex flex-col items-center lg:items-start"
              >
                <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20 px-4 py-1.5 rounded-full mb-6 w-fit text-xs font-semibold tracking-wide">
                  India's #1 Internship Platform
                </Badge>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-4">
                  India's Largest Dedicated <br className="hidden md:block" />
                  <span className="text-[#FFD700]">Internship Ecosystem.</span>
                </h1>
                
                <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl font-light">
                  Bridging the gap between ambitious students and 500+ verified industry leaders.
                </p>

                {/* Mobile: Row Layout | Desktop: Start aligned */}
                <div className="flex flex-row gap-3 mb-10 w-full sm:w-auto justify-center lg:justify-start">
                  <Link href="/internships" className="flex-1 sm:flex-none">
                    <Button className="w-full bg-[#FFD700] text-[#0A2647] hover:bg-[#FFD700]/90 font-bold px-4 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-lg transition-all shadow-lg active:scale-95">
                      Internships
                    </Button>
                  </Link>
                  <Link href="/courses" className="flex-1 sm:flex-none">
                    <Button variant="outline" className="w-full border-white/40 text-white hover:bg-white/10 px-4 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-lg transition-all active:scale-95 bg-transparent">
                      Courses
                    </Button>
                  </Link>
                </div>

                {/* Student Avatars Circle Group */}
                <div className="flex items-center gap-3 justify-center">
                  <div className="flex -space-x-3">
                    {studentAvatars.map((src, i) => (
                      <div key={i} className="relative w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#0A2647] overflow-hidden bg-gray-300">
                        <Image src={src} alt="Student" fill className="object-cover" />
                      </div>
                    ))}
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#0A2647] bg-[#FFD700] flex items-center justify-center text-[10px] md:text-xs font-bold text-[#0A2647]">
                      +
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-200">
                    <span className="font-bold text-white text-sm md:text-base">7,200+</span> students enrolled
                  </p>
                </div>
              </motion.div>

              {/* Right Visual - Reduced height for better flow */}
              <motion.div
                className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden border border-white/5 shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <AnimatePresence mode='wait'>
                  <motion.img
                    key={slideIndex}
                    src={collaborationSlides[slideIndex]}
                    alt="Collaborations"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2647]/60 to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                  {collaborationSlides.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all duration-500 ${slideIndex === i ? 'bg-[#FFD700] w-6' : 'bg-white/30 w-1'}`} />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Trust Metrics */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 md:mt-16 pt-8 border-t border-white/10 text-center"
              variants={staggerContainer}
              initial="initial"
              animate="whileInView"
            >
              {trustMetrics.map((metric) => {
                const Icon = metric.icon
                return (
                  <motion.div key={metric.title} variants={fadeInUp} className="text-white flex flex-col items-center">
                    <Icon className="text-[#FFD700] mb-2 opacity-90" size={24} />
                    <p className="text-xl md:text-2xl font-bold">{metric.value}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{metric.title}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Partner Strip */}
        <div className="bg-white py-8 border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 lg:gap-20">
              <p className="w-full text-center lg:w-auto text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 lg:mb-0">Academic Partners</p>
              {partners.map((partner, idx) => (
                <div key={idx} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-default">
                  <span className="text-2xl">{partner.logo}</span>
                  <span className="font-semibold text-gray-600 text-sm md:text-base">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Internships */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <motion.div className="text-center mb-12 md:mb-16" {...fadeInUp}>
              <Badge className="bg-[#0A2647]/5 text-[#0A2647] px-4 py-1 rounded-full mb-4 text-xs font-bold border-none">
                PREMIUM LISTINGS
              </Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A2647] mb-4 tracking-tight">
                Top Internships This Week
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-light">
                Hand-picked opportunities from India&apos;s most promising startups and enterprises.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {featuredInternships.map((internship) => (
                <motion.div key={internship.id} variants={fadeInUp}>
                  <InternshipCard {...internship} />
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center mt-12 md:mt-16">
              <Link href="/internships">
                <Button className="bg-[#0A2647] text-white hover:bg-[#0A2647]/95 px-8 py-6 text-base font-bold rounded-xl shadow-lg transition-transform active:scale-95">
                  View All 99+ Internships
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Quality Assurance */}
        <section className="py-16 md:py-24 bg-gray-50/50">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <motion.div className="text-center mb-12 md:mb-16" {...fadeInUp}>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0A2647] tracking-tight">
                The Gold Standard of Trust
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: 'Employer Audit', description: 'Rigorous 3-step verification process for every company.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { icon: CheckCircle, title: 'Direct Access', description: 'No middle-men. Your profile goes straight to decision makers.', color: 'text-blue-600', bg: 'bg-blue-50' },
                { icon: Award, title: 'Smart Credentials', description: 'Blockchain-backed certificates valid globally.', color: 'text-amber-600', bg: 'bg-amber-50' }
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className={item.color} size={24} />
                    </div>
                    <h3 className="font-bold text-xl text-[#0A2647] mb-2">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm md:text-base font-light">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Recognition Carousel */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-[#0A2647] rounded-[2.5rem] p-8 md:p-14 text-white shadow-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  className="relative z-10"
                >
                  <p className="text-lg md:text-2xl font-light italic mb-8 leading-relaxed opacity-90">
                    {globalPartners[carouselIndex].quote}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-3xl">{globalPartners[carouselIndex].logo}</span>
                    <span className="text-lg font-bold text-[#FFD700] tracking-tight">{globalPartners[carouselIndex].name}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center gap-2 mt-10">
                {globalPartners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === carouselIndex ? 'bg-[#FFD700] w-10' : 'bg-white/20 w-1.5'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-32 bg-[#0A2647] relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 text-center relative z-10">
            <motion.div {...fadeInUp} className="flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                Ready to Level Up?
              </h2>
              <p className="text-lg text-gray-300 mb-12 max-w-2xl font-light">
                Join 7,200+ students and start your professional journey with InternAdda.
              </p>
              <div className="flex flex-row gap-4 justify-center w-full max-w-md">
                <Link href="/internships" className="flex-1">
                  <Button className="w-full bg-[#FFD700] text-[#0A2647] hover:bg-[#FFD700]/95 font-extrabold px-6 py-6 text-base rounded-xl transition-all shadow-xl active:scale-95">
                    Browse
                  </Button>
                </Link>
                <Link href="/about" className="flex-1">
                  <Button variant="outline" className="w-full border-white/40 text-white hover:bg-white/10 px-6 py-6 text-base rounded-xl bg-transparent transition-all active:scale-95">
                    Contact
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          {/* Decorative Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        </section>
      </main>
      <Footer />
    </>
  )
}

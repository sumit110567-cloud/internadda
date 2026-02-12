"use client"

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrustBadges } from '@/components/TrustBadges'
import { InternshipCard } from '@/components/InternshipCard'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, TrendingUp, Users, Briefcase, CheckCircle, Star, Shield, Clock, ChevronLeft, ChevronRight, GraduationCap, Award, BookOpen, MapPin, Calendar, IndianRupee } from 'lucide-react'
import { useState, useEffect } from 'react'

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

// Featured internship data with proper images
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
  {
    icon: Shield,
    title: '100% VERIFIED',
    value: '500+ Companies',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    icon: Users,
    title: 'ACTIVE STUDENTS',
    value: '7,200+',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    icon: Award,
    title: 'Verified Internship',
    value: 'Since 2020',
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  {
    icon: Clock,
    title: 'AVG. HIRING',
    value: '48 Hours',
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
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
      <main className="min-h-screen bg-white">
        {/* Trust Badge Strip - Navy Blue */}
        <div className="bg-[#0A2647] text-white py-2">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-[#FFD700]" />
                <span>Global Recognition</span>
              </div>

              <div className="flex items-center gap-2">
                <GraduationCap size={14} className="text-[#FFD700]" />
                <span>MSME REGISTERED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section - Clean Navy & White */}
        <section className="relative bg-gradient-to-br from-[#0A2647] to-[#144272]">
          <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 px-4 py-2 rounded-full mb-6">
                  India's #1 Internship Platform
                </Badge>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                  Launch Your Career with{' '}
                  <span className="text-[#FFD700]">Verified Internships</span>
                </h1>
                
                <p className="text-lg text-gray-300 mb-8">
                  7,200+ students placed • 500+ verified companies • AI interviews
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <Button className="bg-[#FFD700] text-[#0A2647] hover:bg-[#FFD700]/90 font-semibold px-8 py-6 text-base rounded-lg">
                    Find Internships
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                  <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-base rounded-lg bg-transparent">
                    For Employers
                  </Button>
                </div>

                {/* Student Count */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0A2647] overflow-hidden bg-gray-200">
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                      </div>
                    ))}
                  </div>
                  <p className="text-white">
                    <span className="font-bold text-[#FFD700]">7,200+</span> students enrolled
                  </p>
                </div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                className="relative h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2647]/80 to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {collaborationSlides.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all ${slideIndex === i ? 'bg-[#FFD700] w-6' : 'bg-white/40 w-1.5'}`} />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Trust Metrics */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/10"
              variants={staggerContainer}
              initial="initial"
              animate="whileInView"
            >
              {trustMetrics.map((metric) => {
                const Icon = metric.icon
                return (
                  <motion.div key={metric.title} variants={fadeInUp} className="text-white">
                    <Icon className="text-[#FFD700] mb-2" size={24} />
                    <p className="text-xl font-bold">{metric.value}</p>
                    <p className="text-xs text-gray-400">{metric.title}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Partner Strip - Light Gray */}
        <div className="bg-gray-50 py-6 border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <p className="text-sm font-semibold text-gray-500">TRUSTED BY</p>
              {partners.map((partner, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-2xl">{partner.logo}</span>
                  <span className="font-medium text-gray-700">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Internships */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div className="text-center mb-12" {...fadeInUp}>
              <Badge className="bg-[#0A2647] text-white px-4 py-2 rounded-full mb-4">
                FEATURED OPPORTUNITIES
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A2647] mb-4">
                Top Internships This Week
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Verified positions from India's fastest growing companies
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
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

            <div className="text-center mt-12">
              <Button className="bg-[#0A2647] text-white hover:bg-[#0A2647]/90 px-8 py-6 rounded-lg">
                View All 300+ Internships
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </section>

        {/* Quality Assurance - Clean Cards */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div className="text-center mb-12" {...fadeInUp}>
              <Badge className="bg-[#FFD700] text-[#0A2647] px-4 py-2 rounded-full mb-4">
                WHY WE'RE DIFFERENT
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A2647] mb-4">
                Quality You Can Trust
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Manual Employer Audit',
                  description: 'Every company verified through MCA/MSME records before listing',
                  color: 'text-emerald-600',
                  bg: 'bg-emerald-100'
                },
                {
                  icon: CheckCircle,
                  title: 'Direct Interview Routing',
                  description: 'Your application reaches decision makers directly, no middlemen',
                  color: 'text-blue-600',
                  bg: 'bg-blue-100'
                },
                {
                  icon: Award,
                  title: 'Blockchain Certificates',
                  description: 'Verified credentials recognized by 150+ global companies',
                  color: 'text-amber-600',
                  bg: 'bg-amber-100'
                }
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center mb-6`}>
                      <Icon className={item.color} size={28} />
                    </div>
                    <h3 className="font-bold text-lg text-[#0A2647] mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Recognition Carousel - Minimal */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div className="text-center mb-8" {...fadeInUp}>
              <Badge className="bg-[#0A2647] text-white px-4 py-2 rounded-full mb-4">
                INDUSTRY RECOGNITION
              </Badge>
            </motion.div>

            <div className="bg-gradient-to-br from-[#0A2647] to-[#144272] rounded-2xl p-8 text-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center"
                >
                  <p className="text-xl md:text-2xl font-medium italic mb-6">
                    {globalPartners[carouselIndex].quote}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-3xl">{globalPartners[carouselIndex].logo}</span>
                    <span className="font-bold text-[#FFD700]">{globalPartners[carouselIndex].name}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-2 mt-8">
                {globalPartners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === carouselIndex ? 'bg-[#FFD700] w-6' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA - Navy & Gold */}
        <section className="py-20 bg-[#0A2647]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join 7,200+ students who found their dream internship
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#FFD700] text-[#0A2647] hover:bg-[#FFD700]/90 font-semibold px-8 py-6 text-base rounded-lg">
                  Browse Internships
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-base rounded-lg bg-transparent">
                  Partner With Us
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight, Users, CheckCircle, Shield, Clock,
  GraduationCap, Award, Zap, Star, Briefcase,
  Sparkles, TrendingUp, Globe2, Rocket, Target,
  Brain, Code2, Palette, Mic, Building2, Network,
  Gem, Crown, ChevronRight, Play, BookOpen, Laptop,
  BarChart3, MessageSquare, Coffee, HeartHandshake,
  Infinity, Orbit, Workflow, Binary, CandlestickChart,
  Waves, Crosshair, GanttChartSquare, Hexagon,
  MapPin, Clock3, Wifi, WifiOff, Briefcase as BriefcaseIcon,
  Medal, ThumbsUp, ChevronDown, FileCheck, LayoutGrid,
  ExternalLink, CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

// ---------- Data ----------
const slideImages = [
  '/slide1.jpg',
  '/slide2.jpg',
  '/slide3.jpg',
  '/slide4.jpg',
  '/slide5.jpg',
  '/slide6.jpg',
]

const featuredInternships = [
  {
    id: '1',
    title: 'Senior Python Developer',
    company: 'Arjuna AI Solutions',
    stipend: '₹5,000 - ₹8,000',
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
    stipend: '₹4,000 - ₹7,000',
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
    stipend: '₹4,000 - ₹10,000',
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
    name: 'Rahul Sharma',
    role: 'SDE at Internadda',
    image: '/student1.jpg',
    quote: 'The personalized mentorship and skill assessments helped me crack my first job.'
  },
  {
    name: 'siddhant chaturvedi',
    role: 'Researcher at LAREX',
    image: '/student2.jpg',
    quote: 'Found opportunities I never knew existed. The platform is a game-changer!'
  },
  {
    name: 'Anjali Patel',
    role: 'Ai Developer Manager at Arjuna-Ai',
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

const students = [
  { name: 'Ravi', img: 'https://iili.io/fmKACQa.md.jpg' },
  { name: 'Priya', img: 'https://iili.io/fmKMLV2.md.jpg' },
  { name: 'Amit', img: 'https://iili.io/fmKMQPS.jpg' },
  { name: 'Neha', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop' }
]

const faqs = [
  { q: 'How does InternAdda verify internships?', a: 'We manually review every opportunity and verify company credentials before listing.' },
  { q: 'Is there any cost to use InternAdda?', a: 'No, the platform is completely free for students. We earn from partner companies.' },
  { q: 'How long does it take to get a response?', a: 'Average response time is under 24 hours for verified applications.' },
  { q: 'Can I apply to multiple internships?', a: 'Yes, you can apply to unlimited opportunities with your smart profile.' },
]

// ---------- Reusable Components ----------
const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
)

const Counter = ({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [hasTriggered, setHasTriggered] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!ref.current || hasTriggered) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true)
          let start: number
          const duration = 2000
          const step = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            setCount(Math.floor(progress * value))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasTriggered, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-5xl font-bold text-slate-900 mb-1">{count}{suffix}</div>
      <div className="text-xs md:text-sm text-slate-500 font-medium uppercase tracking-wider">{label}</div>
    </div>
  )
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full justify-between items-center text-left font-medium text-slate-900 hover:text-violet-600 transition-colors"
      >
        <span className="text-base md:text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------- Main Home Component ----------
export default function Home() {
  const router = useRouter()
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('All Internships')
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handleApply = (id: string) => {
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden">
        {/* Trust Bar */}
        <div className="bg-slate-50 border-b border-slate-200 py-3">
          <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-wrap justify-center items-center gap-x-8 gap-y-2">
            <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-tighter">
              <CheckCircle2 size={14} className="text-emerald-500" /> 7,200+ students placed
            </span>
            <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-tighter">
              <Medal size={14} className="text-amber-500" /> 12,000+ matched
            </span>
            <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-tighter">
              <ThumbsUp size={14} className="text-blue-500" /> 98% satisfaction
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-8 pb-12 md:pt-16 md:pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left content */}
              <FadeUp className="text-center lg:text-left">
                <Badge className="bg-violet-50 text-violet-600 border-violet-100 mb-6 px-4 py-1.5 text-[10px] md:text-xs font-bold rounded-full">
                  <CheckCircle2 size={14} className="inline mr-2" /> MSME REGISTERED ECOSYSTEM
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                  India's Largest Dedicated <br className="hidden md:block" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-600">
                    Internship Network.
                  </span>
                </h1>
                <p className="text-base md:text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                  Direct access to verified corporate partners. Skip the job-board noise and land your role with transparent stipends.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start">
                  <Link href="/internships">
                    <Button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-10 py-7 text-base rounded-xl shadow-lg shadow-violet-200 transition-all">
                      Find Internships <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button variant="outline" className="w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 px-10 py-7 text-base rounded-xl transition-all">
                      Practice Mode
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-4 text-slate-400">
                  <div className="flex -space-x-3">
                    {students.map((s, i) => (
                      <div key={i} className="relative w-11 h-11 rounded-full border-4 border-white shadow-sm overflow-hidden">
                        <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Trusted by <span className="text-violet-600">7k+</span> verified students
                  </p>
                </div>
              </FadeUp>

              {/* Right visual - Image Slider */}
              <FadeUp delay={0.2} className="relative mt-8 lg:mt-0">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-100 shadow-2xl bg-slate-50 group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0"
                    >
                      <Image 
                        src={slideImages[currentSlide]} 
                        alt="Collaboration" 
                        fill 
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Floating Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-violet-600 uppercase tracking-[0.2em] mb-1">Our Collaborations</p>
                      <p className="text-sm font-semibold text-slate-900">Partnering with Industry Leaders</p>
                    </div>
                    <div className="flex gap-1">
                      {slideImages.map((_, i) => (
                        <div key={i} className={`h-1.5 w-1.5 rounded-full transition-all ${i === currentSlide ? 'bg-violet-600 w-4' : 'bg-slate-300'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: Wifi, label: 'Remote' },
                { icon: WifiOff, label: 'Hybrid' },
                { icon: BriefcaseIcon, label: 'Full-Time' },
                { icon: Clock3, label: 'Part-Time' },
                { icon: Crown, label: 'Premium' }
              ].map((cat) => (
                <button
                  key={cat.label}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-slate-700 hover:border-violet-300 hover:bg-violet-50 transition-all text-sm font-semibold"
                >
                  <cat.icon size={16} className="text-violet-600" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Internships Grid */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Opportunities</h2>
                <p className="text-slate-500 font-medium">Top internships updated every 24 hours</p>
              </div>
              <div className="flex bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
                {['All Internships', 'Tech', 'Marketing', 'Design'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                      selectedCategory === cat ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredInternships.map((job, idx) => (
                <FadeUp key={job.id} delay={idx * 0.1}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl overflow-hidden transition-all group"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image src={job.image} alt={job.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-violet-600/90 backdrop-blur-md text-white border-0 text-[10px] py-1 px-3">Featured</Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-violet-600 transition-colors">{job.title}</h3>
                      <p className="text-sm text-slate-500 mb-4 flex items-center gap-1.5"><Building2 size={16} className="text-slate-400" /> {job.company}</p>
                      
                      <div className="flex items-center gap-4 mb-5 p-3 bg-slate-50 rounded-xl">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Stipend</p>
                          <p className="font-bold text-sm text-slate-900">{job.stipend}</p>
                        </div>
                        <div className="w-px h-8 bg-slate-200" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Location</p>
                          <p className="font-bold text-sm text-slate-900">{job.location}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {job.skills.slice(0,3).map(skill => (
                          <span key={skill} className="bg-slate-100 px-3 py-1 rounded-full text-[11px] font-bold text-slate-600">{skill}</span>
                        ))}
                      </div>

                      <Button
                        onClick={() => handleApply(job.id)}
                        className="w-full bg-slate-900 hover:bg-violet-600 text-white py-6 rounded-xl font-bold text-sm transition-all"
                      >
                        {user ? 'Apply Now' : 'Join to Apply'} <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </motion.article>
                </FadeUp>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link href="/internships">
                <Button variant="outline" className="border-slate-200 text-slate-900 hover:bg-white px-8 py-6 rounded-xl font-bold group">
                  <LayoutGrid size={18} className="mr-2 text-violet-600" />
                  Explore 300+ Opportunities
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Ecosystem Highlights</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Everything you need to transform from a student to a professional.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feat, idx) => (
                <FadeUp key={idx} delay={idx * 0.1}>
                  <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 hover:border-violet-200 hover:bg-white transition-all shadow-sm hover:shadow-xl group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:bg-violet-600 transition-all">
                      <feat.icon className="text-violet-600 group-hover:text-white w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium">{feat.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Questions? We have answers.</h2>
              <p className="text-slate-500 font-medium">Clear your doubts and start your journey today.</p>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200">
              {faqs.map((faq, idx) => (
                <FAQItem key={idx} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* Fixed Bottom CTA */}
        <section className="py-20 bg-violet-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <FadeUp>
              <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Ready to launch your career?</h2>
              <p className="text-violet-100 mb-10 text-lg font-medium opacity-90">Join 7,200+ students who secured their dream internships through InternAdda.</p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link href="/auth/signup">
                  <Button className="bg-white text-violet-700 hover:bg-slate-50 px-10 py-7 text-lg rounded-2xl shadow-2xl shadow-violet-900/20 font-extrabold transition-all scale-100 hover:scale-105">
                    Create Free Account <Rocket className="ml-2 w-6 h-6" />
                  </Button>
                </Link>
                <Link href="/internships">
                  <Button variant="outline" className="border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white px-10 py-7 text-lg rounded-2xl font-extrabold backdrop-blur-sm transition-all">
                    Browse Internships
                  </Button>
                </Link>
              </div>
              
              <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-violet-200 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-2"><CheckCircle size={16} /> Free Forever</span>
                <span className="flex items-center gap-2"><CheckCircle size={16} /> Verified Leads</span>
                <span className="flex items-center gap-2"><CheckCircle size={16} /> Quick Setup</span>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

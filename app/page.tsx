'use client'

import React, { useState } from 'react'
import { motion, useInView } from 'framer-motion'
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
  Medal, ThumbsUp, ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

// ---------- Data (unchanged from original) ----------
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

// ---------- Reusable Motion Components ----------
const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
)

// ---------- Counter Component (simplified) ----------
const Counter = ({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) => {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  React.useEffect(() => {
    if (inView) {
      let start = 0
      const duration = 2000
      const step = timestamp => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        setCount(Math.floor(progress * value))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
  }, [inView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">{count}{suffix}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  )
}

// ---------- FAQ Accordion ----------
const faqs = [
  { q: 'How does InternAdda verify internships?', a: 'We manually review every opportunity and verify company credentials before listing.' },
  { q: 'Is there any cost to use InternAdda?', a: 'No, the platform is completely free for students. We earn from partner companies.' },
  { q: 'How long does it take to get a response?', a: 'Average response time is under 24 hours for verified applications.' },
  { q: 'Can I apply to multiple internships?', a: 'Yes, you can apply to unlimited opportunities with your smart profile.' },
]

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full justify-between items-center text-left font-medium text-slate-900 hover:text-blue-700"
      >
        <span>{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="mt-2 text-slate-600 text-sm">{answer}</p>}
    </div>
  )
}

// ---------- Main Home Component ----------
export default function Home() {
  const router = useRouter()
  const { user } = useAuth()

  const handleApply = (id: string) => {
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden">
        {/* 1️⃣ SEO-Friendly Top Bar + Trust Bar */}
        <div className="bg-slate-50 border-b border-slate-200 py-2 text-xs text-slate-600">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-1">
            <span className="flex items-center gap-1"><CheckCircle size={14} className="text-blue-700" /> 7,200+ students placed</span>
            <span className="flex items-center gap-1"><Medal size={14} className="text-blue-700" /> 12,000+ internships matched</span>
            <span className="flex items-center gap-1"><ThumbsUp size={14} className="text-blue-700" /> 98% satisfaction</span>
          </div>
        </div>

        {/* 2️⃣ Hero Section — Full Bleed Visual */}
        <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <FadeUp>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4">
                  India's Largest Internship <span className="text-violet-600">Ecosystem</span>
                </h1>
                <p className="text-lg text-slate-600 mb-6 max-w-xl">
                  Get verified opportunities, personalized matches & mentorship from industry experts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link href="/internships">
                    <Button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-base rounded-xl shadow-lg">
                      Explore Internships <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button variant="outline" className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-100 px-8 py-6 text-base rounded-xl">
                      Browse Courses
                    </Button>
                  </Link>
                </div>
                {/* Micro badges */}
                <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                  <span className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full"><Shield size={16} className="text-blue-700" /> Verified</span>
                  <span className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full"><Medal size={16} className="text-blue-700" /> MSME Registered</span>
                  <span className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full"><Clock size={16} className="text-blue-700" /> 24h Avg Response</span>
                  <span className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full"><Brain size={16} className="text-blue-700" /> AI-Driven Matching</span>
                </div>
                {/* Small SEO snippet */}
                <p className="text-sm text-slate-500 mt-6 max-w-xl">
                  InternAdda helps students find internships with top companies across India. Best matches. Fast responses. Verified opportunities.
                </p>
              </FadeUp>

              {/* Right visual - simplified 3D gradient graphic */}
              <FadeUp delay={0.2}>
                <div className="relative hidden lg:block">
                  <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-violet-100 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-violet-300/30 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl" />
                    {/* Floating elements */}
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/30 backdrop-blur rounded-2xl rotate-12 flex items-center justify-center shadow-lg border border-white/50">
                      <Briefcase className="text-violet-600 w-12 h-12" />
                    </div>
                    <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-white/30 backdrop-blur rounded-2xl -rotate-6 flex items-center justify-center shadow-lg border border-white/50">
                      <GraduationCap className="text-blue-700 w-12 h-12" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-violet-500 to-blue-500 rounded-full opacity-20 blur-2xl" />
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 3️⃣ Category Quick Filter */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: Wifi, label: 'Remote' },
                { icon: WifiOff, label: 'Hybrid' },
                { icon: BriefcaseIcon, label: 'Full-Time' },
                { icon: Clock3, label: 'Part-Time' },
                { icon: Crown, label: 'Premium' }
              ].map((cat, idx) => (
                <motion.button
                  key={cat.label}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-slate-700 hover:border-violet-300 hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 transition-all"
                >
                  <cat.icon size={16} className="text-blue-700" />
                  <span className="text-sm font-medium">{cat.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* 4️⃣ Featured Internships Grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Top Internships Right Now</h2>
              <p className="text-slate-500 mb-8">Hand-picked opportunities updated daily.</p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredInternships.map((job, idx) => (
                <FadeUp key={job.id} delay={idx * 0.1}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl overflow-hidden transition-all group"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image src={job.image} alt={job.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 400px" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-violet-600 text-white border-0">Featured</Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{job.title}</h3>
                      <p className="text-sm text-slate-500 mb-3 flex items-center gap-1"><Building2 size={14} className="text-slate-400" /> {job.company}</p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-slate-50 p-2 rounded-lg">
                          <p className="text-xs text-slate-400">Stipend</p>
                          <p className="font-semibold text-sm text-slate-900">{job.stipend}</p>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg">
                          <p className="text-xs text-slate-400">Location</p>
                          <p className="font-semibold text-sm text-slate-900">{job.location}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.slice(0,3).map(skill => (
                          <span key={skill} className="bg-slate-100 px-2 py-1 rounded-full text-xs text-slate-700">{skill}</span>
                        ))}
                      </div>
                      <Button
                        onClick={() => handleApply(job.id)}
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white py-5 rounded-xl font-semibold"
                      >
                        {user ? 'Apply Now' : 'Get Started'} <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </motion.article>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 5️⃣ Why InternAdda (Feature Highlights) */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">Why choose InternAdda?</h2>
              <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">Everything you need to launch your career</p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, idx) => (
                <FadeUp key={idx} delay={idx * 0.1}>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-violet-200 transition-all group">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-violet-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feat.icon className="text-violet-600 w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{feat.title}</h3>
                    <p className="text-slate-500 text-sm">{feat.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 6️⃣ Passive SEO Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Makes InternAdda Unique?</h2>
              <div className="prose prose-slate max-w-4xl">
                <p className="text-slate-600 leading-relaxed">
                  InternAdda is India's premier internship platform designed to bridge the gap between talented students and forward-thinking companies. 
                  Unlike traditional job boards, we focus exclusively on internship opportunities, ensuring every listing is verified and tailored to 
                  skill development. Our AI-driven matching system connects you with roles that align with your career goals, while our mentorship 
                  network provides guidance from industry experts. With over 12,000 successful matches and a 98% satisfaction rate, InternAdda is 
                  the trusted partner for students aiming to build a strong professional foundation. Whether you're looking for remote, hybrid, or 
                  in-office internships, our platform offers a seamless experience from application to offer letter. Join thousands of students who 
                  have accelerated their careers through InternAdda's ecosystem of opportunities, skill assessments, and placement support.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 7️⃣ Testimonials + Success Stories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">Success Stories</h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {successStories.map((story, idx) => (
                <FadeUp key={idx} delay={idx * 0.2}>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative">
                    <div className="absolute -top-3 -left-3 text-6xl text-blue-100">"</div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow">
                          <Image src={story.image} alt={story.name} fill className="object-cover" sizes="64px" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{story.name}</h3>
                          <p className="text-sm text-blue-700">{story.role}</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">"{story.quote}"</p>
                      <div className="flex gap-1 mt-4">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-amber-400 fill-amber-400" />)}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 8️⃣ Partners / Logos */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">Trusted by leading companies</p>
            </FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {partners.map((partner, idx) => (
                <FadeUp key={partner.name} delay={idx * 0.05}>
                  <div className="flex justify-center grayscale hover:grayscale-0 transition-all hover:scale-105">
                    <Image src={partner.logo} alt={partner.name} width={120} height={40} className="max-h-10 w-auto object-contain" />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 9️⃣ Stats Counter + FAQ Accordion */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <Counter value={200} label="Active Companies" suffix="+" />
              <Counter value={7200} label="Students Placed" suffix="+" />
              <Counter value={500} label="Live Internships" suffix="+" />
              <Counter value={98} label="Satisfaction Rate" suffix="%" />
            </div>

            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-8">Frequently Asked Questions</h2>
            </FadeUp>
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, idx) => (
                <FadeUp key={idx} delay={idx * 0.1}>
                  <FAQItem question={faq.q} answer={faq.a} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 🔟 Strong Bottom CTA */}
        <section className="py-20 bg-violet-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to launch your career?</h2>
              <p className="text-violet-100 mb-8 text-lg">Join 7,200+ students who found their dream internships.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button className="bg-white text-violet-700 hover:bg-slate-100 px-8 py-6 text-base rounded-xl shadow-lg font-semibold">
                    Create Free Account <Rocket className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/internships">
                  <Button variant="outline" className="border-white text-white hover:bg-violet-700 px-8 py-6 text-base rounded-xl font-semibold">
                    Browse Internships
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-violet-200 mt-6">No credit card required • Free forever • 94% placement rate</p>
            </FadeUp>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

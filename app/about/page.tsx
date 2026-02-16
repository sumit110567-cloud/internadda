// app/about/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import {
  Users,
  Target,
  Zap,
  Award,
  CheckCircle,
  GraduationCap,
  Briefcase,
  Rocket,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

const teamMembers = [
  {
    name: 'Lucky Tiwari',
    role: 'Founder & CEO',
    image: '/lucky.jpg',
    bio: 'Entrepreneur | EdTech & AI. Building Internadda to bridge the gap between students and industry experience.',
    expertise: ['EdTech', 'AI Strategy', 'Leadership'],
  },
  {
    name: 'Vikash Yadav',
    role: 'Co-Founder & PR Head',
    image: '/vikash.jpg',
    bio: 'Brand Communication expert leading partnerships, outreach, and brand positioning.',
    expertise: ['Public Relations', 'Strategy', 'Partnerships'],
  },
  {
    name: 'Sumit Pandey',
    role: 'CTO',
    image: '/sumit.jpg',
    bio: 'Full Stack Engineer & System Architect driving the technical vision and scalable platforms.',
    expertise: ['Full Stack', 'Architecture', 'AI/ML'],
  },
  {
    name: 'Pranjal Singh',
    role: 'COO',
    image: '/pranjal.jpg',
    bio: 'Operations & Growth Management expert overseeing execution and scaling strategies.',
    expertise: ['Operations', 'Strategy', 'Scaling'],
  },
]

const milestones = [
  { year: '2020', title: 'The Vision', desc: 'Started with a mission to solve the internship crisis in India.' },
  { year: '2021', title: 'WhatsApp Growth', desc: 'Distributed curated roles via WhatsApp, reaching 1,000+ students.' },
  { year: '2022', title: 'Building Phase', desc: 'Developed the core Internadda platform for automated matching.' },
  { year: '2023', title: 'Startup Network', desc: 'Partnered with 100+ high-growth tech startups across India.' },
  { year: '2024', title: 'Going Live', desc: 'Official platform launch with dedicated dashboard for students.' },
  { year: '2025', title: 'MSME Gold Standard', desc: 'Official MSME Registration & Global Recognition.' },
]

const studentAvatars = ['/student1.jpg', '/student2.jpg', '/student3.jpg', '/student4.jpg']

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden">
        {/* Top Trust Banner */}
        <div className="bg-indigo-600 text-white py-2.5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-medium uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-indigo-200" />
                <span>Global Recognition</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={14} className="text-indigo-200" />
                <span>MSME Registered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-indigo-50 via-white to-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center">
              <motion.div {...fadeInUp} className="flex flex-col items-center max-w-3xl">
                <Badge className="bg-indigo-100 text-indigo-700 border-none px-4 py-1.5 rounded-full mb-6 text-xs font-semibold">
                  Our Story & Mission
                </Badge>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Empowering India's{' '}
                  <span className="text-indigo-600">Future Professionals.</span>
                </h1>

                <p className="text-lg text-gray-600 max-w-2xl mb-10 leading-relaxed">
                  Internadda is a MSME Registered ecosystem bridging the gap between ambitious
                  students and 500+ verified industry leaders.
                </p>

                <div className="flex items-center gap-4 bg-white border border-gray-100 p-2 pl-4 rounded-2xl shadow-sm">
                  <div className="flex -space-x-2">
                    {studentAvatars.map((src, i) => (
                      <div
                        key={i}
                        className="relative w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                      >
                        <Image src={src} alt="Student" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 pr-3">
                    Trusted by <span className="font-semibold text-indigo-600">7,200+</span> active
                    students
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="bg-white py-16 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Corporate Partners', value: '500+', icon: Briefcase },
                { label: 'Student Enrollments', value: '7,200+', icon: Users },
                { label: 'Avg. Hiring Time', value: '48 Hours', icon: Zap },
                { label: 'Success Rate', value: '94%', icon: Award },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-3">
                    <stat.icon className="text-indigo-600" size={22} />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="w-12 h-1 bg-indigo-600 mx-auto mb-6 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The Internadda Roadmap
              </h2>
              <p className="text-gray-500">
                Evolving from a vision to India's most trusted internship ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestones.map((item, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:bg-white hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      {item.year}
                    </span>
                    <Sparkles className="text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 md:py-28 bg-gray-50/50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge className="bg-indigo-100 text-indigo-700 border-none px-4 py-1.5 rounded-full mb-4 text-xs font-semibold">
                The Architects
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Meet the Founders</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="relative w-32 h-32 mx-auto mb-5">
                    <div className="absolute inset-0 bg-indigo-100 rounded-full group-hover:scale-105 transition-transform" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md">
                      <Image src={member.image} alt={member.name} fill className="object-cover" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-500 mb-5 leading-relaxed">{member.bio}</p>

                    <div className="flex flex-wrap justify-center gap-1.5">
                      {member.expertise.map((exp) => (
                        <span
                          key={exp}
                          className="bg-indigo-50 text-indigo-700 text-[10px] font-medium px-2 py-1 rounded-md"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Impact CTA */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-indigo-600 rounded-3xl md:rounded-4xl p-10 md:p-16 relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90" />
              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <motion.div {...fadeInUp}>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Join the Gold Standard of <br />
                    <span className="text-indigo-200">Indian Internships.</span>
                  </h2>
                  <p className="text-lg text-indigo-100 mb-10 leading-relaxed">
                    Whether you're a student seeking industry exposure or a startup looking for
                    verified talent, Internadda is your gateway to success.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/internships">
                      <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-base font-semibold rounded-xl shadow-lg w-full sm:w-auto">
                        Get Started Today
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-xl w-full sm:w-auto"
                      >
                        Partner with Us
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

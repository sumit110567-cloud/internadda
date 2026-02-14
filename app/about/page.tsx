'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Users, Target, Zap, Award, CheckCircle, GraduationCap, Briefcase, Rocket, ShieldCheck, Sparkles } from 'lucide-react'
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
    bio: 'Entrepreneur | EdTech & AI. Building InternAdda to bridge the gap between students and industry experience.',
    expertise: ['EdTech', 'AI Strategy', 'Leadership']
  },
  {
    name: 'Vikash Yadav',
    role: 'Co-Founder & PR Head',
    image: '/vikash.jpg',
    bio: 'Brand Communication expert leading partnerships, outreach, and brand positioning.',
    expertise: ['Public Relations', 'Strategy', 'Partnerships']
  },
  {
    name: 'Sumit Pandey',
    role: 'CTO',
    image: '/sumit.jpg',
    bio: 'Full Stack Engineer & System Architect driving the technical vision and scalable platforms.',
    expertise: ['Full Stack', 'Architecture', 'AI/ML']
  },
  {
    name: 'Pranjal Singh',
    role: 'COO',
    image: '/pranjal.jpg',
    bio: 'Operations & Growth Management expert overseeing execution and scaling strategies.',
    expertise: ['Operations', 'Strategy', 'Scaling']
  },
]

const milestones = [
  { year: '2020', title: 'The Vision', desc: 'Started with a mission to solve the internship crisis in India.' },
  { year: '2021', title: 'WhatsApp Growth', desc: 'Distributed curated roles via WhatsApp, reaching 1,000+ students.' },
  { year: '2022', title: 'Building Phase', desc: 'Developed the core InternAdda platform for automated matching.' },
  { year: '2023', title: 'Startup Network', desc: 'Partnered with 100+ high-growth tech startups across India.' },
  { year: '2024', title: 'Going Live', desc: 'Official platform launch with dedicated dashboard for students.' },
  { year: '2025', title: 'MSME Gold Standard', desc: 'Official MSME Registration & Global Recognition.' },
]

const studentAvatars = ['/student1.jpg', '/student2.jpg', '/student3.jpg', '/student4.jpg'];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden">
        
        {/* Top Trust Banner */}
        <div className="bg-[#0A2647] text-white py-2.5 border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 text-[10px] sm:text-xs tracking-[0.2em] font-bold uppercase">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#FFD700]" />
                <span>Global Recognition</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={14} className="text-[#FFD700]" />
                <span>MSME REGISTERED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0A2647] to-[#144272] py-24 md:py-32 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center">
              <motion.div {...fadeInUp} className="flex flex-col items-center">
                <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20 px-4 py-1.5 rounded-full mb-8 text-xs font-bold tracking-widest uppercase">
                  Our Story & Mission
                </Badge>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-8 max-w-4xl">
                  Empowering India's <br />
                  <span className="text-[#FFD700]">Future Professionals.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 font-light leading-relaxed">
                  InternAdda is a MSME Registered ecosystem bridging the gap between ambitious students and 500+ verified industry leaders.
                </p>

                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-2 pl-4 rounded-2xl border border-white/10">
                  <div className="flex -space-x-3">
                    {studentAvatars.map((src, i) => (
                      <div key={i} className="relative w-10 h-10 rounded-full border-2 border-[#0A2647] overflow-hidden bg-gray-300">
                        <Image src={src} alt="Student" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-200 pr-4">
                    Trusted by <span className="font-bold text-[#FFD700]">7,200+</span> active students
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Corporate Partners', value: '500+', icon: Briefcase },
                { label: 'Student Enrollments', value: '7,200+', icon: Users },
                { label: 'Avg. Hiring Time', value: '48 Hours', icon: Zap },
                { label: 'Success Rate', value: '94%', icon: Award },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="bg-blue-50 p-3 rounded-xl mb-3">
                    <stat.icon className="text-[#0A2647]" size={20} />
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-[#0A2647]">{stat.value}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-24 px-4 bg-white flex flex-col items-center">
          <div className="max-w-[1400px] w-full px-4">
            <div className="text-center mb-20 flex flex-col items-center">
              <div className="w-16 h-1 bg-[#FFD700] mb-8 rounded-full" />
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2647] tracking-tight mb-4">The InternAdda Roadmap</h2>
              <p className="text-gray-500 max-w-xl font-light">Evolving from a vision to India's most trusted internship ecosystem.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {milestones.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  {...fadeInUp}
                  className="p-10 bg-gray-50 rounded-[3rem] border border-transparent hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-black text-blue-600">{item.year}</span>
                    <Sparkles className="text-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A2647] mb-4 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-4 bg-gray-50/50 flex flex-col items-center border-y border-gray-100">
          <div className="max-w-[1400px] w-full px-4">
            <div className="text-center mb-20 flex flex-col items-center">
              <Badge className="bg-[#0A2647]/5 text-[#0A2647] border-none px-4 py-1 rounded-full mb-4 text-[10px] font-black tracking-widest uppercase">
                The Architects
              </Badge>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2647] tracking-tight">Meet the Founders</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {teamMembers.map((member, idx) => (
                <motion.div 
                  key={idx} 
                  {...fadeInUp}
                  className="bg-white p-8 rounded-[3.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:shadow-2xl transition-all"
                >
                  <div className="relative w-40 h-40 mb-8">
                    <div className="absolute inset-0 bg-[#FFD700] rounded-full rotate-6 group-hover:rotate-12 transition-transform" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image src={member.image} alt={member.name} fill className="object-cover" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#0A2647] mb-1">{member.name}</h3>
                  <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">{member.role}</p>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed px-2 font-medium">{member.bio}</p>
                  
                  <div className="mt-auto w-full pt-6 border-t border-gray-50 flex flex-wrap justify-center gap-2">
                    {member.expertise.map((exp) => (
                      <span key={exp} className="bg-blue-50 text-blue-700 text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider">
                        {exp}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Impact CTA */}
        <section className="py-24 flex flex-col items-center">
          <div className="max-w-[1400px] w-full px-4 lg:px-8">
            <div className="bg-[#0A2647] rounded-[3.5rem] md:rounded-[5rem] p-12 md:p-24 relative overflow-hidden shadow-2xl text-center">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[120px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-1/3 h-full bg-yellow-400/5 blur-[100px] pointer-events-none" />
              
              <motion.div {...fadeInUp} className="relative z-10 flex flex-col items-center">
                <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
                  Join the Gold Standard of <br />
                  <span className="text-[#FFD700]">Indian Internships.</span>
                </h2>
                <p className="text-xl text-blue-100/80 mb-12 max-w-2xl font-light leading-relaxed">
                  Whether you're a student seeking industry exposure or a startup looking for verified talent, InternAdda is your gateway to success.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
                  <Link href="/internships">
                    <Button className="bg-[#FFD700] text-[#0A2647] hover:bg-white px-12 py-8 text-xl rounded-[2rem] font-black shadow-2xl shadow-[#FFD700]/20 transition-all active:scale-95 w-full sm:w-auto">
                      Get Started Today
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button 
                      variant="outline" 
                      className="border-white/20 text-white hover:bg-white hover:text-[#0A2647] px-12 py-8 text-xl rounded-[2rem] font-black w-full sm:w-auto bg-transparent backdrop-blur-sm transition-all active:scale-95"
                    >
                      Partner with Us
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

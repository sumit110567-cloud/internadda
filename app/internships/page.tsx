'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, CheckCircle, GraduationCap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
  type: string;
  description: string;
  skills: string[];
  applicants: number;
  image: string;
  otherCompaniesCount: number;
  companyLogos: string[];
}

const InternshipCard = ({ internship }: { internship: Internship }) => (
  <article className="bg-white rounded-[2.5rem] border border-blue-50 shadow-xl overflow-hidden w-full max-w-[420px] flex flex-col group transition-all duration-300 hover:shadow-2xl hover:border-blue-200">
    <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
      <Image
        src={internship.image}
        alt={`${internship.title} at ${internship.company}`}
        fill
        sizes="(max-width: 768px) 100vw, 420px"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        priority={internship.id <= 3}
      />
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
        <span className="text-orange-500 text-xs" aria-hidden="true">🔥</span>
        <span className="text-white text-[10px] font-bold tracking-tight">{internship.applicants} Applied</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
    </div>

    <div className="px-8 pb-8 pt-2 flex flex-col items-center text-center">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
        HIRING AT {internship.company} & OTHERS
      </p>

      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="flex -space-x-3">
          {internship.companyLogos.map((logo, idx) => (
            <div key={idx} className="relative w-9 h-9 rounded-full border-2 border-white bg-white shadow-sm overflow-hidden">
              <Image src={logo} alt="Partner Logo" fill className="object-cover" />
            </div>
          ))}
        </div>
        <span className="text-blue-600 text-[13px] font-bold">+{internship.otherCompaniesCount} more companies</span>
      </div>

      <h3 className="text-2xl font-extrabold text-[#0A2647] mb-6 leading-snug group-hover:text-blue-700 transition-colors">
        {internship.title}
      </h3>

      <div className="grid grid-cols-2 w-full border-y border-gray-100 py-5 mb-6">
        <div className="border-r border-gray-100 flex flex-col items-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Stipend</p>
          <p className="text-blue-600 font-extrabold text-base">{internship.stipend}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Location</p>
          <p className="text-gray-700 font-extrabold text-base">{internship.location}</p>
        </div>
      </div>

      <div className="w-full mb-8">
        <p className="text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-widest">Skills Required</p>
        <div className="flex flex-wrap justify-center gap-2">
          {internship.skills.map((skill) => (
            <span key={skill} className="bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-xl text-xs font-bold text-gray-600">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <Button className="w-full bg-[#0A2647] hover:bg-[#144272] text-white py-8 rounded-[1.25rem] font-extrabold text-lg shadow-lg shadow-blue-900/10 transition-all active:scale-95">
        Apply Now
      </Button>

      <p className="text-[10px] text-gray-400 font-semibold mt-5 uppercase tracking-widest">
        Ending Soon <span className="mx-1" aria-hidden="true">•</span> AI Interviews
      </p>
    </div>
  </article>
)

export default function InternshipsClient({ initialInternships }: { initialInternships: Internship[] }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredInternships = initialInternships.filter((internship) =>
    internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <>
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

      <section className="bg-gradient-to-br from-[#0A2647] to-[#144272] border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-2 text-center lg:text-left">
              <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20 px-4 py-1.5 rounded-full mb-4 w-fit mx-auto lg:mx-0 text-xs font-semibold tracking-wide">
                India's #1 Internship Platform
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-white">Browse Internships</h1>
              <p className="text-gray-300 text-lg">Discover {initialInternships.length}+ verified opportunities across India</p>
            </div>
            <div className="max-w-2xl mx-auto lg:mx-0">
              <div className="relative">
                <Search className="absolute left-4 top-3 text-white/40" size={20} />
                <Input
                  placeholder="Search by role, company, or skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-6 text-base bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredInternships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
              {filteredInternships.map((internship) => (
                <motion.div key={internship.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full flex justify-center">
                  <InternshipCard internship={internship} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No internships found matching your search.</p>
              <Button variant="outline" className="mt-4 border-[#0A2647] text-[#0A2647]" onClick={() => setSearchTerm('')}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

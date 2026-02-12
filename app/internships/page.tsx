// app/internships/page.tsx
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Search, ArrowRight, MapPin, Briefcase, IndianRupee, Users, CheckCircle, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

// ---------- SEO Metadata ----------
export const metadata: Metadata = {
  title: 'Browse 500+ Verified Internships in India | InternAdda',
  description: 'Discover paid internships at India’s top startups. Roles in tech, marketing, design & more. Apply in minutes.',
  openGraph: {
    title: 'Internships at India’s Best Companies',
    description: 'Find your next internship – 500+ opportunities, ₹12k – ₹25k stipend.',
    images: ['/og-internships.jpg'],
  },
}

// ---------- Enhanced Internship Data ----------
// Now includes images, company logos, and "other companies" count – matches reference card design
const internships = [
  {
    id: 1,
    title: 'Frontend Development Intern',
    company: 'TechCorp India',
    location: 'Bangalore, India',
    stipend: '₹20,000/month',
    duration: '3 months',
    type: 'Remote',
    description: 'Build responsive web applications using React and TypeScript.',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    applicants: 124,
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop', // demo image
    otherCompaniesCount: 36,
    companyLogos: [
      'https://images.unsplash.com/photo-1560259979-0baed4a1f9b1?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1560472355-536de3962603?w=150&h=150&fit=crop',
    ],
  },
  {
    id: 2,
    title: 'Data Science Intern',
    company: 'DataViz Solutions',
    location: 'Mumbai, India',
    stipend: '₹25,000/month',
    duration: '4 months',
    type: 'On-site',
    description: 'Work with machine learning models and data analysis projects.',
    skills: ['Python', 'Machine Learning', 'SQL'],
    applicants: 98,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    otherCompaniesCount: 21,
    companyLogos: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1560259970-8e1b7c1ffb9f?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    ],
  },
  {
    id: 3,
    title: 'Digital Marketing Intern',
    company: 'Growth Hacks Media',
    location: 'Delhi, India',
    stipend: '₹15,000/month',
    duration: '3 months',
    type: 'Hybrid',
    description: 'Create and execute digital marketing campaigns.',
    skills: ['SEO', 'Content Writing', 'Social Media'],
    applicants: 156,
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&auto=format&fit=crop',
    otherCompaniesCount: 42,
    companyLogos: [
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1560472355-536de3962603?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    ],
  },
  {
    id: 4,
    title: 'Backend Development Intern',
    company: 'CloudBase Systems',
    location: 'Pune, India',
    stipend: '₹22,000/month',
    duration: '4 months',
    type: 'Remote',
    description: 'Build scalable backend services and APIs.',
    skills: ['Node.js', 'PostgreSQL', 'Docker'],
    applicants: 87,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
    otherCompaniesCount: 18,
    companyLogos: [
      'https://images.unsplash.com/photo-1560259970-8e1b7c1ffb9f?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=150&h=150&fit=crop',
    ],
  },
  {
    id: 5,
    title: 'UI/UX Design Intern',
    company: 'DesignFlow Studios',
    location: 'Bangalore, India',
    stipend: '₹18,000/month',
    duration: '3 months',
    type: 'On-site',
    description: 'Design intuitive user interfaces and experiences.',
    skills: ['Figma', 'UI Design', 'User Research'],
    applicants: 102,
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop',
    otherCompaniesCount: 27,
    companyLogos: [
      'https://images.unsplash.com/photo-1560472355-536de3962603?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop',
    ],
  },
  {
    id: 6,
    title: 'Content Writing Intern',
    company: 'WordSmith Publishing',
    location: 'Remote, India',
    stipend: '₹12,000/month',
    duration: '2 months',
    type: 'Remote',
    description: 'Write engaging blog posts and marketing content.',
    skills: ['Content Writing', 'SEO', 'Research'],
    applicants: 145,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop',
    otherCompaniesCount: 33,
    companyLogos: [
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1560259970-8e1b7c1ffb9f?w=150&h=150&fit=crop',
    ],
  },
]

// ---------- JSON-LD Structured Data ----------
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: internships.map((job, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'JobPosting',
      title: job.title,
      description: job.description,
      hiringOrganization: {
        '@type': 'Organization',
        name: job.company,
      },
      jobLocation: {
        '@type': 'Place',
        address: job.location,
      },
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'INR',
        value: job.stipend,
      },
      employmentType: job.type,
      validThrough: '2024-12-31',
    },
  })),
}

// ---------- Internship Card (matches reference design exactly) ----------
const InternshipCard = ({ internship }: { internship: typeof internships[0] }) => (
  <article className="bg-white rounded-[2.5rem] border border-blue-50 shadow-xl overflow-hidden w-full max-w-[420px] flex flex-col group transition-all duration-300 hover:shadow-2xl hover:border-blue-200">
    {/* Image Section */}
    <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
      <Image
        src={internship.image}
        alt={`${internship.title} at ${internship.company}`}
        fill
        sizes="(max-width: 768px) 100vw, 420px"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        priority={internship.id <= 3} // priority for first 3 cards
      />
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
        <span className="text-orange-500 text-xs" aria-hidden="true">🔥</span>
        <span className="text-white text-[10px] font-bold tracking-tight">{internship.applicants} Applied</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
    </div>

    {/* Content Section */}
    <div className="px-8 pb-8 pt-2 flex flex-col items-center text-center">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
        HIRING AT {internship.company} & OTHERS
      </p>

      {/* Company Logos */}
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

      {/* Stipend & Location Grid */}
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

      {/* Skills */}
      <div className="w-full mb-8">
        <p className="text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-widest">Skills Required</p>
        <div className="flex flex-wrap justify-center gap-2">
          {internship.skills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-xl text-xs font-bold text-gray-600"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <Button className="w-full bg-[#0A2647] hover:bg-[#144272] text-white py-8 rounded-[1.25rem] font-extrabold text-lg shadow-lg shadow-blue-900/10 transition-all active:scale-95">
        Apply Now
      </Button>

      <p className="text-[10px] text-gray-400 font-semibold mt-5 uppercase tracking-widest">
        Ending Soon <span className="mx-1" aria-hidden="true">•</span> AI Interviews
      </p>
    </div>
  </article>
)

// ---------- Client Component: Search & Filtering ----------
'use client'

import { useState } from 'react'

function InternshipsClient({ initialInternships }: { initialInternships: typeof internships }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredInternships = initialInternships.filter((internship) =>
    internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <>
      {/* Trust Badge Strip (adds premium feel) */}
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

      {/* Page Header with Search */}
      <section className="bg-gradient-to-br from-[#0A2647] to-[#144272] border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-2 text-center lg:text-left">
              <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20 px-4 py-1.5 rounded-full mb-4 w-fit mx-auto lg:mx-0 text-xs font-semibold tracking-wide">
                India's #1 Internship Platform
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Browse Internships
              </h1>
              <p className="text-gray-300 text-lg">
                Discover {initialInternships.length}+ verified internship opportunities across India
              </p>
            </div>

            {/* Search Bar */}
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

      {/* Internships Grid */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredInternships.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredInternships.map((internship) => (
                <motion.div
                  key={internship.id}
                  variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <InternshipCard internship={internship} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg text-gray-500">No internships found matching your search.</p>
              <Button
                variant="outline"
                className="mt-4 border-[#0A2647] text-[#0A2647] hover:bg-[#0A2647] hover:text-white"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}

// ---------- Server Component Page ----------
export default function InternshipsPage() {
  return (
    <>
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden">
        <InternshipsClient initialInternships={internships} />
      </main>
      <Footer />
    </>
  )
}

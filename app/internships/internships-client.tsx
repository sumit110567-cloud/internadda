'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Search, MapPin, Briefcase, Globe, Verified, ArrowRight } from 'lucide-react'

const InternshipCard = ({
  id,
  title,
  company,
  stipend,
  location,
  skills,
  applicants,
  otherCompaniesCount,
  image,
  companyLogos,
  remote,
  country,
}: any) => {
  const { user } = useAuth()
  const router = useRouter()

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      router.push(`/auth/signin?callbackUrl=/apply/${id}`)
      return
    }
    router.push(`/apply/${id}`)
  }

  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 w-full flex flex-col group">
      <div className="relative h-40 w-full bg-gray-100 rounded-t-xl overflow-hidden">
        <Image
          src={image}
          alt={`${title} at ${company}`}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <span className="text-amber-500 text-xs">⚡</span>
          <span className="text-gray-700 text-xs font-medium">
            {applicants} applied
          </span>
        </div>
        {remote && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
            <span className="text-[10px] font-medium text-indigo-600">Remote</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex -space-x-2">
            {companyLogos.slice(0, 3).map((logo: string, idx: number) => (
              <div
                key={idx}
                className="relative w-5 h-5 rounded-full border-2 border-white bg-white shadow-sm overflow-hidden"
              >
                <Image src={logo} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400">
            +{otherCompaniesCount} companies
          </p>
        </div>

        <h3 className="text-base font-bold text-gray-800 mb-1 leading-tight">
          {title}
        </h3>
        
        <p className="text-xs text-gray-500 mb-3">{company}</p>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="font-semibold text-indigo-600">{stipend}</span>
          <span className="flex items-center gap-0.5">
            <MapPin size={10} /> {location}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {skills.slice(0, 3).map((skill: string) => (
            <span
              key={skill}
              className="bg-gray-50 px-2 py-0.5 rounded text-[10px] font-medium text-gray-500 border border-gray-100"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="text-[10px] text-gray-400">+{skills.length - 3}</span>
          )}
        </div>

        <Button
          onClick={handleApply}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg font-medium text-sm transition-all"
        >
          {user ? 'Apply Now →' : 'Sign in to Apply'}
        </Button>

        <p className="text-[9px] text-gray-400 text-center mt-2">
          <Link href="https://upforge.org" target="_blank" className="hover:text-indigo-500">
            Verified on Upforge
          </Link> candidates get priority
        </p>
      </div>
    </article>
  )
}

// Filter chips
const FILTER_CHIPS = ['All', 'Remote', 'Frontend', 'Backend', 'Data Science', 'AI/ML', 'Marketing', 'Design']

export default function InternshipsClient({ initialInternships }: { initialInternships: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredInternships = initialInternships.filter((internship) => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.skills.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilter = activeFilter === 'All' || 
      (activeFilter === 'Remote' && internship.remote) ||
      internship.tag === activeFilter
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto -mt-8 mb-8 z-20">
        <div className="bg-white p-2 rounded-xl shadow-md border border-gray-100 flex items-center gap-2">
          <div className="flex-1 flex items-center px-3 gap-2">
            <Search className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by role or skills..."
              className="w-full py-2.5 outline-none text-gray-700 bg-transparent text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="hidden sm:flex bg-gray-900 hover:bg-gray-800 text-white rounded-lg px-5 text-sm">
            Search
          </Button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {FILTER_CHIPS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeFilter === filter
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-700">{filteredInternships.length}</span> opportunities
        </p>
      </div>

      {/* Results Grid */}
      {filteredInternships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredInternships.map((internship) => (
            <InternshipCard key={internship.id} {...internship} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-gray-300" size={28} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">No internships found</h3>
          <p className="text-gray-400 text-sm">Try adjusting your search or filter.</p>
        </div>
      )}

      {/* Upforge Discovery Banner */}
      <div className="mt-12 text-center border-t border-gray-100 pt-8">
        <p className="text-xs text-gray-400 mb-2">Inspired by student startups?</p>
        <Link 
          href="https://upforge.org" 
          target="_blank" 
          className="inline-flex items-center gap-1 text-indigo-600 text-sm font-medium hover:text-indigo-700"
        >
          Explore what students are building on Upforge <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Search, MapPin, Briefcase } from 'lucide-react'

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
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 w-full flex flex-col group">
      <div className="relative h-44 w-full bg-gray-100 rounded-t-2xl overflow-hidden">
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
      </div>

      <div className="p-5 text-center">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          {company} + {otherCompaniesCount} others
        </p>

        <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug">
          {title}
        </h3>

        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex -space-x-2">
            {companyLogos.map((logo: string, idx: number) => (
              <div
                key={idx}
                className="relative w-6 h-6 rounded-full border-2 border-white bg-white shadow-sm overflow-hidden"
              >
                <Image src={logo} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-500">+{otherCompaniesCount}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-b border-gray-50 py-3 mb-4">
          <div>
            <p className="text-xs font-medium text-gray-400">Stipend</p>
            <p className="text-sm font-bold text-gray-800">{stipend}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Location</p>
            <p className="text-sm font-bold text-gray-800">{location}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5 mb-5">
          {skills.map((skill: string) => (
            <span
              key={skill}
              className="bg-gray-50 px-3 py-1 rounded-full text-xs font-medium text-gray-600 border border-gray-100"
            >
              {skill}
            </span>
          ))}
        </div>

        <Button
          onClick={handleApply}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-xl font-semibold text-sm shadow-md shadow-indigo-200 transition-all active:scale-95"
        >
          {user ? 'Apply Now' : 'Sign in to Apply'}
        </Button>
      </div>
    </article>
  )
}

export default function InternshipsClient({ initialInternships }: { initialInternships: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredInternships = initialInternships.filter((internship) =>
    internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.skills.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search Bar Section */}
      <div className="relative max-w-2xl mx-auto -mt-8 mb-16 z-20">
        <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2">
          <div className="flex-1 flex items-center px-4 gap-3">
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by role or skills (e.g. React, Python)..."
              className="w-full py-3 outline-none text-gray-700 bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="hidden sm:flex bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6">
            Search
          </Button>
        </div>
      </div>

      {/* Results Grid */}
      {filteredInternships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInternships.map((internship) => (
            <InternshipCard key={internship.id} {...internship} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-gray-300" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">No internships found</h3>
          <p className="text-gray-500">Try searching for a different role or skill.</p>
        </div>
      )}
    </div>
  )
}

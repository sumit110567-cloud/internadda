'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  Clock,
  IndianRupee,
  ChevronDown,
  X,
  Sparkles,
  TrendingUp,
  Star,
  Building2,
  Users,
  Calendar,
  GraduationCap,
  SlidersHorizontal,
  BookmarkPlus,
  Share2,
  Eye,
  Zap,
  Award,
  CheckCircle2,
  ArrowUpDown,
  Grid3x3,
  List,
  Loader2,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

// Types
interface Internship {
  id: number
  title: string
  company: string
  location: string
  stipend: string
  duration: string
  type: string
  description: string
  skills: string[]
  applicants: number
  image: string
  otherCompaniesCount: number
  companyLogos: string[]
  postedDate: string
  featured?: boolean
}

// Filter Components
const FilterSection = ({ 
  title, 
  children, 
  defaultOpen = true 
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          size={16}
          className={`transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Internship Card Component
const InternshipCard = ({ internship, index }: { internship: Internship; index: number }) => {
  const { user } = useAuth()
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(user ? `/apply/${internship.id}` : `/auth/signin?callbackUrl=/apply/${internship.id}`)
  }

  // Calculate days ago
  const daysAgo = Math.floor(
    (new Date().getTime() - new Date(internship.postedDate).getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Featured Badge */}
      {internship.featured && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-3 py-1">
            <Zap size={12} className="mr-1" />
            Featured
          </Badge>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={() => setIsSaved(!isSaved)}
        className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all"
      >
        <BookmarkPlus
          size={18}
          className={isSaved ? 'fill-blue-600 text-blue-600' : 'text-slate-400'}
        />
      </button>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0">
            <Image
              src={internship.image}
              alt={internship.company}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
              {internship.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Building2 size={14} className="flex-shrink-0" />
              <span className="truncate">{internship.company}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {internship.description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={14} className="text-slate-400 flex-shrink-0" />
            <span className="text-slate-600 truncate">{internship.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <IndianRupee size={14} className="text-slate-400 flex-shrink-0" />
            <span className="text-slate-600 truncate">{internship.stipend}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={14} className="text-slate-400 flex-shrink-0" />
            <span className="text-slate-600 truncate">{internship.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users size={14} className="text-slate-400 flex-shrink-0" />
            <span className="text-slate-600 truncate">{internship.applicants} applied</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {internship.skills.slice(0, 4).map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              {skill}
            </Badge>
          ))}
          {internship.skills.length > 4 && (
            <Badge variant="outline" className="border-slate-200 text-slate-500">
              +{internship.skills.length - 4}
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {internship.companyLogos.slice(0, 3).map((logo, idx) => (
                <div
                  key={idx}
                  className="relative w-6 h-6 rounded-full border-2 border-white bg-slate-100 overflow-hidden"
                >
                  <Image
                    src={logo}
                    alt={`Company ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="24px"
                  />
                </div>
              ))}
            </div>
            <span className="text-xs text-slate-400">
              +{internship.otherCompaniesCount} openings
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
            </span>
            <Button
              onClick={handleApply}
              size="sm"
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-4"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent pointer-events-none"
      />
    </motion.article>
  )
}

// Main Component
export default function InternshipsClient({ initialInternships }: { initialInternships: Internship[] }) {
  const [internships, setInternships] = useState(initialInternships)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [stipendRange, setStipendRange] = useState<[number, number]>([0, 100000])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'recent' | 'stipend' | 'applicants'>('recent')
  const [isLoading, setIsLoading] = useState(false)

  // Get unique skills and locations for filters
  const allSkills = useMemo(() => {
    const skills = new Set<string>()
    internships.forEach(internship => {
      internship.skills.forEach(skill => skills.add(skill))
    })
    return Array.from(skills).sort()
  }, [internships])

  const allLocations = useMemo(() => {
    const locations = new Set(internships.map(i => i.location))
    return Array.from(locations).sort()
  }, [internships])

  // Filter internships
  const filteredInternships = useMemo(() => {
    return internships.filter(internship => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          internship.title.toLowerCase().includes(query) ||
          internship.company.toLowerCase().includes(query) ||
          internship.description.toLowerCase().includes(query) ||
          internship.skills.some(skill => skill.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      // Skills filter
      if (selectedSkills.length > 0) {
        if (!selectedSkills.some(skill => internship.skills.includes(skill))) {
          return false
        }
      }

      // Location filter
      if (selectedLocations.length > 0) {
        if (!selectedLocations.includes(internship.location)) {
          return false
        }
      }

      // Stipend filter
      const stipendValue = parseInt(internship.stipend.replace(/[^0-9]/g, '')) || 0
      if (stipendValue < stipendRange[0] || stipendValue > stipendRange[1]) {
        return false
      }

      return true
    }).sort((a, b) => {
      switch (sortBy) {
        case 'stipend':
          const aStipend = parseInt(a.stipend.replace(/[^0-9]/g, '')) || 0
          const bStipend = parseInt(b.stipend.replace(/[^0-9]/g, '')) || 0
          return bStipend - aStipend
        case 'applicants':
          return b.applicants - a.applicants
        default:
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      }
    })
  }, [internships, searchQuery, selectedSkills, selectedLocations, stipendRange, sortBy])

  // Stats
  const stats = {
    total: filteredInternships.length,
    featured: filteredInternships.filter(i => i.featured).length,
    totalApplicants: filteredInternships.reduce((acc, i) => acc + i.applicants, 0),
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          Browse Internships
        </h1>
        <p className="text-slate-500">
          Discover {filteredInternships.length} opportunities from top companies
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
              <p className="text-xs text-slate-500">Total Internships</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Zap size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.featured}</p>
              <p className="text-xs text-slate-500">Featured</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.totalApplicants}+</p>
              <p className="text-xs text-slate-500">Total Applicants</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Building2 size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">500+</p>
              <p className="text-xs text-slate-500">Companies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input
            type="text"
            placeholder="Search internships, companies, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 w-full border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={`border-slate-200 rounded-xl px-4 ${
              showFilters ? 'bg-slate-100' : ''
            }`}
          >
            <SlidersHorizontal size={18} className="mr-2" />
            Filters
            {(selectedSkills.length > 0 || selectedLocations.length > 0) && (
              <Badge className="ml-2 bg-blue-600 text-white text-xs px-1.5 py-0.5">
                {selectedSkills.length + selectedLocations.length}
              </Badge>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="border-slate-200 rounded-xl px-4"
          >
            {viewMode === 'grid' ? <List size={18} /> : <Grid3x3 size={18} />}
          </Button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recent">Most Recent</option>
            <option value="stipend">Highest Stipend</option>
            <option value="applicants">Most Applied</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <AnimatePresence mode="wait">
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-80 flex-shrink-0 hidden lg:block"
            >
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Filters</h3>
                  {(selectedSkills.length > 0 || selectedLocations.length > 0) && (
                    <button
                      onClick={() => {
                        setSelectedSkills([])
                        setSelectedLocations([])
                        setStipendRange([0, 100000])
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <FilterSection title="Skills">
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {allSkills.map(skill => (
                      <label key={skill} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSkills([...selectedSkills, skill])
                            } else {
                              setSelectedSkills(selectedSkills.filter(s => s !== skill))
                            }
                          }}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Location">
                  <div className="space-y-2">
                    {allLocations.map(location => (
                      <label key={location} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedLocations.includes(location)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedLocations([...selectedLocations, location])
                            } else {
                              setSelectedLocations(selectedLocations.filter(l => l !== location))
                            }
                          }}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        {location}
                      </label>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Stipend Range">
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="5000"
                      value={stipendRange[1]}
                      onChange={(e) => setStipendRange([stipendRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>₹{stipendRange[0].toLocaleString()}</span>
                      <span>₹{stipendRange[1].toLocaleString()}+</span>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Duration">
                  <div className="space-y-2">
                    {['1 month', '2 months', '3 months', '6 months'].map(duration => (
                      <label key={duration} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-slate-300" />
                        {duration}
                      </label>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Type">
                  <div className="space-y-2">
                    {['Remote', 'Hybrid', 'On-site'].map(type => (
                      <label key={type} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-slate-300" />
                        {type}
                      </label>
                    ))}
                  </div>
                </FilterSection>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1">
          {/* Active Filters */}
          {(selectedSkills.length > 0 || selectedLocations.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSkills.map(skill => (
                <Badge
                  key={skill}
                  className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1"
                >
                  {skill}
                  <button
                    onClick={() => setSelectedSkills(selectedSkills.filter(s => s !== skill))}
                    className="ml-2 hover:text-blue-900"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
              {selectedLocations.map(location => (
                <Badge
                  key={location}
                  className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1"
                >
                  {location}
                  <button
                    onClick={() => setSelectedLocations(selectedLocations.filter(l => l !== location))}
                    className="ml-2 hover:text-blue-900"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-900">{filteredInternships.length}</span> internships
            </p>
            <p className="text-sm text-slate-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Internships Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
          ) : filteredInternships.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
                <Search size={40} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No internships found</h3>
              <p className="text-slate-500 mb-4">Try adjusting your filters or search query</p>
              <Button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedSkills([])
                  setSelectedLocations([])
                  setStipendRange([0, 100000])
                }}
                className="bg-slate-900 text-white hover:bg-slate-800"
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredInternships.map((internship, index) => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Load More */}
          {filteredInternships.length > 0 && filteredInternships.length < internships.length && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-slate-200 text-slate-700 hover:bg-slate-50 px-8"
                onClick={() => setIsLoading(true)}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// app/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  Users,
  CheckCircle,
  Shield,
  Clock,
  GraduationCap,
  Award,
  Zap,
  Star,
  Briefcase,
  X,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { HeroVisual } from './page-client-components'
import { useState } from 'react'

const featuredInternships = [
  {
    id: '1',
    title: 'Python Developer Intern',
    company: 'Arjuna AI Solutions',
    stipend: '₹2,000 - ₹8,000',
    location: 'Remote',
    skills: ['Python', 'Django', 'PostgreSQL'],
    applicants: 131,
    image: '/python.jpg',
    otherCompaniesCount: 36,
    companyLogos: ['/company1.jpg', '/company2.jpg', '/company3.jpg'],
  },
  {
    id: '2',
    title: 'Web Development Intern',
    company: 'Internadda Enterprises',
    stipend: '₹2,500 - ₹5,000',
    location: 'Remote',
    skills: ['React', 'Next.js', 'Tailwind'],
    applicants: 150,
    image: '/react.jpg',
    otherCompaniesCount: 21,
    companyLogos: ['/company4.jpg', '/company5.jpg', '/company1.jpg'],
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Larex Systems',
    stipend: '₹3,000 - ₹7,000',
    location: 'Remote',
    skills: ['Python', 'Pandas', 'Matplotlib'],
    applicants: 130,
    image: '/datascience.jpg',
    otherCompaniesCount: 21,
    companyLogos: ['/company2.jpg', '/company3.jpg', '/company4.jpg'],
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: featuredInternships.map((job, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'JobPosting',
      title: job.title,
      description: `Join ${job.company} as a ${job.title}. Skills required: ${job.skills.join(
        ', '
      )}. Stipend: ${job.stipend}.`,
      hiringOrganization: {
        '@type': 'Organization',
        name: job.company,
        logo: 'https://Internadda.com/logo.jpg',
      },
      jobLocationType: 'TELECOMMUTE',
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'INR',
        value: {
          '@type': 'QuantitativeValue',
          value: job.stipend,
          unitText: 'MONTH',
        },
      },
    },
  })),
}

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
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-[360px] mx-auto flex flex-col group">
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

export default function Home() {
  const [showPromo, setShowPromo] = useState(true)

  const trustMetrics = [
    { icon: Shield, title: 'Verified Companies', value: '200+' },
    { icon: Users, title: 'Active Students', value: '7.2k' },
    { icon: Award, title: 'Trusted Since', value: '2020' },
    { icon: Clock, title: 'Avg. Hiring Time', value: '48h' },
  ]

  const partners = [
    { name: 'Delhi University ' },
    { name: 'LAREX '},
    { name: 'Tracxn '},
    { name: 'Arjuna-AI '},
  ]

  const studentAvatars = [
    '/student1.jpg',
    '/student2.jpg',
    '/student3.jpg',
    '/student4.jpg',
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* DreamStart Promo Banner */}
      {showPromo && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 px-4 relative z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm sm:text-base">
            <span className="font-bold">✨ DreamStart:</span>
            <span>Extra 10% off on skill assessment fees.</span>
            <span className="hidden sm:inline font-mono bg-white/20 px-2 py-0.5 rounded">
              DREAM10
            </span>
            <button
              onClick={() => setShowPromo(false)}
              className="absolute right-2 sm:right-4 p-1 hover:bg-white/20 rounded-full transition"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <Header />
      <main className="min-h-screen bg-white font-sans overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-indigo-50 via-white to-white pt-8 pb-16 md:pt-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <Badge className="bg-indigo-100 text-indigo-700 border-none px-4 py-1.5 rounded-full mb-6 text-xs font-semibold">
                  India’s #1 Internship Platform
                </Badge>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                  Your <span className="text-indigo-600">dream career</span>
                  <br />
                  starts here.
                </h1>

                <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8">
                  Join 7,200+ students who landed internships at 200+ top
                  companies. Verified, fast, and trusted.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
                  <Link href="/internships">
                    <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-5 text-base font-semibold rounded-xl shadow-lg shadow-indigo-200">
                      Browse Internships
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-5 text-base font-semibold rounded-xl"
                    >
                      Explore Courses
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="flex -space-x-2">
                    {studentAvatars.map((src, i) => (
                      <div
                        key={i}
                        className="relative w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                      >
                        <Image
                          src={src}
                          alt="Student"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
                      +
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900">7.2k+</span>{' '}
                    students placed
                  </p>
                </div>
              </div>

              <div className="flex-1 w-full max-w-md mx-auto lg:max-w-none">
                <HeroVisual />
              </div>
            </div>

            {/* Trust Metrics Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-gray-100">
              {trustMetrics.map((metric) => {
                const Icon = metric.icon
                return (
                  <div
                    key={metric.title}
                    className="text-center flex flex-col items-center"
                  >
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-3">
                      <Icon className="text-indigo-600" size={24} />
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      {metric.value}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      {metric.title}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Partner Strip */}
        <section className="bg-gray-50 py-10 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
              Global Recognition
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {partners.map((partner, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <span className="text-2xl">{partner.logo}</span>
                  <span className="font-medium">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Internships */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="bg-indigo-50 text-indigo-700 border-none px-4 py-1.5 rounded-full mb-4">
                Handpicked for you
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Top internships this week
              </h2>
              <p className="text-gray-600">
                Secure your future with positions at India's best startups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {featuredInternships.map((internship) => (
                <InternshipCard key={internship.id} {...internship} />
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/internships">
                <Button className="bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 px-8 py-5 text-base font-semibold rounded-xl shadow-sm">
                  View all internships
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-indigo-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The Internadda advantage
              </h2>
              <p className="text-gray-600">
                We're not just another job board. We're your career launchpad.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: '100% verified',
                  description: 'Every company is vetted for legitimacy.',
                  color: 'text-indigo-600',
                  bg: 'bg-indigo-100',
                },
                {
                  icon: Zap,
                  title: 'Fast hiring',
                  description: 'Average time to offer: 48 hours.',
                  color: 'text-amber-600',
                  bg: 'bg-amber-100',
                },
                {
                  icon: Star,
                  title: 'Smart matching',
                  description: 'AI that connects you to the right roles.',
                  color: 'text-emerald-600',
                  bg: 'bg-emerald-100',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition"
                >
                  <div
                    className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-5`}
                  >
                    <item.icon className={item.color} size={28} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-indigo-600 rounded-3xl md:rounded-4xl p-8 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Ready to launch your career?
                </h2>
                <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of students who found their dream internships
                  through Internadda.
                </p>
                <Link href="/internships">
                  <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-5 text-base font-semibold rounded-xl shadow-lg">
                    Get started now
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                <p className="text-indigo-200 text-sm mt-6">
                  Learn - Intern - Earn.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

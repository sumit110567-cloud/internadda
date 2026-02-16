import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import InternshipsClient from './internships-client'
import { Badge } from '@/components/ui/badge'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse 500+ Verified Internships in India | Internadda',
  description: 'Discover paid internships at India’s top startups. Roles in tech, marketing, design & more. Apply in minutes.',
}

const internships = [
  {
    id: '1',
    title: 'Frontend Development Intern',
    company: 'TechCorp India',
    location: 'Remote',
    stipend: '₹15,000 - ₹25,000',
    duration: '3 months',
    skills: ['React', 'Next.js', 'Tailwind'],
    applicants: 124,
    image: '/react.jpg',
    otherCompaniesCount: 36,
    companyLogos: ['/company1.jpg', '/company2.jpg', '/company3.jpg'],
  },
  {
    id: '2',
    title: 'Python Developer Intern',
    company: 'Arjuna AI Solutions',
    location: 'Remote',
    stipend: '₹8,000 - ₹12,000',
    duration: '6 months',
    skills: ['Python', 'Django', 'PostgreSQL'],
    applicants: 131,
    image: '/python.jpg',
    otherCompaniesCount: 22,
    companyLogos: ['/company4.jpg', '/company5.jpg', '/company1.jpg'],
  },
  {
    id: '3',
    title: 'UI/UX Design Intern',
    company: 'Larex Systems',
    location: 'Remote',
    stipend: '₹10,000 - ₹15,000',
    duration: '4 months',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    applicants: 89,
    image: '/ui-ux.jpg',
    otherCompaniesCount: 15,
    companyLogos: ['/company2.jpg', '/company3.jpg', '/company4.jpg'],
  },
  {
    id: '4',
    title: 'Data Science Intern',
    company: 'Quantum Analytics',
    location: 'Remote',
    stipend: '₹12,000 - ₹18,000',
    duration: '3 months',
    skills: ['Python', 'Pandas', 'SQL'],
    applicants: 210,
    image: '/datascience.jpg',
    otherCompaniesCount: 12,
    companyLogos: ['/company1.jpg', '/company5.jpg', '/company2.jpg'],
  },
  {
    id: '5',
    title: 'Digital Marketing Intern',
    company: 'Growth Mantra',
    location: 'Remote',
    stipend: '₹5,000 - ₹10,000',
    duration: '2 months',
    skills: ['SEO', 'Content Writing', 'Ads'],
    applicants: 340,
    image: '/content.jpg',
    otherCompaniesCount: 45,
    companyLogos: ['/company3.jpg', '/company4.jpg', '/company1.jpg'],
  },
  {
    id: '6',
    title: 'Full Stack Intern',
    company: 'Nexus Tech',
    location: 'Remote',
    stipend: '₹20,000 - ₹30,000',
    duration: '6 months',
    skills: ['Node.js', 'MongoDB', 'React'],
    applicants: 156,
    image: '/fullstack.jpg',
    otherCompaniesCount: 28,
    companyLogos: ['/company5.jpg', '/company2.jpg', '/company3.jpg'],
  },
]

export default function InternshipsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white font-sans overflow-x-hidden">
        {/* Hero Section matching Home style */}
        <section className="relative bg-gradient-to-b from-indigo-50 via-white to-white pt-12 pb-10 md:pt-20 md:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-indigo-100 text-indigo-700 border-none px-4 py-1.5 rounded-full mb-6 text-xs font-semibold">
              Available Opportunities
            </Badge>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Find your <span className="text-indigo-600">perfect role.</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through hundreds of verified internships. Join 7.2k+ students 
              who have already launched their careers with Internadda.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <InternshipsClient initialInternships={internships} />
        </section>
      </main>
      <Footer />
    </>
  )
}

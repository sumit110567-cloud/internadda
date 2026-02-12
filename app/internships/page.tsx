import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import InternshipsClient from './internships-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse 500+ Verified Internships in India | InternAdda',
  description: 'Discover paid internships at India’s top startups. Roles in tech, marketing, design & more. Apply in minutes.',
  openGraph: {
    title: 'Internships at India’s Best Companies',
    description: 'Find your next internship – 500+ opportunities, ₹12k – ₹25k stipend.',
    images: ['/og-internships.jpg'],
  },
}

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
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop',
    otherCompaniesCount: 36,
    companyLogos: [
      'https://images.unsplash.com/photo-1560259979-0baed4a1f9b1?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1560472355-536de3962603?w=150&h=150&fit=crop',
    ],
  },
  // ... Include your other 5 internship objects here from your original code
]

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
      hiringOrganization: { '@type': 'Organization', name: job.company },
      jobLocation: { '@type': 'Place', address: job.location },
      baseSalary: { '@type': 'MonetaryAmount', currency: 'INR', value: job.stipend },
      employmentType: job.type,
      validThrough: '2024-12-31',
    },
  })),
}

export default function InternshipsPage() {
  return (
    <>
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

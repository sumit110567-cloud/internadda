import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import InternshipsClient from './internships-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Global Internships | 10,000+ Opportunities Worldwide | InternAdda',
  description: 'Discover paid internships across 40+ countries. Remote, hybrid, and in-person roles in tech, marketing, design, and more. Apply free.',
  keywords: 'global internships, remote internships, paid internships, student internships, international internships, work from home',
  openGraph: {
    title: 'Global Internships | 10,000+ Opportunities Worldwide',
    description: 'Find internships across 40+ countries. Remote, hybrid, and in-person roles.',
    type: 'website',
  },
}

const internships = [
  {
    id: '1', title: 'Frontend Development Intern', company: 'TechCorp India',
    location: 'Remote', stipend: '₹15,000 – ₹25,000', duration: '3 months',
    skills: ['React', 'Next.js', 'Tailwind'], applicants: 124,
    image: '/react.jpg', otherCompaniesCount: 36,
    companyLogos: ['/company1.jpg', '/company2.jpg', '/company3.jpg'],
    tag: 'Frontend',
    country: 'India',
    remote: true,
  },
  {
    id: '2', title: 'Python Developer Intern', company: 'Arjuna AI Solutions',
    location: 'Remote', stipend: '₹8,000 – ₹12,000', duration: '6 months',
    skills: ['Python', 'Django', 'PostgreSQL'], applicants: 131,
    image: '/python.jpg', otherCompaniesCount: 22,
    companyLogos: ['/company4.jpg', '/company5.jpg', '/company1.jpg'],
    tag: 'AI & ML',
    country: 'India',
    remote: true,
  },
  {
    id: '3', title: 'UI/UX Design Intern', company: 'Larex Systems',
    location: 'Remote', stipend: '₹10,000 – ₹15,000', duration: '4 months',
    skills: ['Figma', 'Adobe XD', 'Prototyping'], applicants: 89,
    image: '/ui-ux.jpg', otherCompaniesCount: 15,
    companyLogos: ['/company2.jpg', '/company3.jpg', '/company4.jpg'],
    tag: 'Design',
    country: 'India',
    remote: true,
  },
  {
    id: '4', title: 'Data Science Intern', company: 'Quantum Analytics',
    location: 'Remote', stipend: '₹12,000 – ₹18,000', duration: '3 months',
    skills: ['Python', 'Pandas', 'SQL'], applicants: 210,
    image: '/datascience.jpg', otherCompaniesCount: 12,
    companyLogos: ['/company1.jpg', '/company5.jpg', '/company2.jpg'],
    tag: 'Data Science',
    country: 'India',
    remote: true,
  },
  {
    id: '5', title: 'Digital Marketing Intern', company: 'Growth Mantra',
    location: 'Remote', stipend: '₹5,000 – ₹10,000', duration: '2 months',
    skills: ['SEO', 'Content Writing', 'Ads'], applicants: 340,
    image: '/content.jpg', otherCompaniesCount: 45,
    companyLogos: ['/company3.jpg', '/company4.jpg', '/company1.jpg'],
    tag: 'Marketing',
    country: 'India',
    remote: true,
  },
  {
    id: '6', title: 'Full Stack Intern', company: 'Nexus Tech',
    location: 'Remote', stipend: '₹20,000 – ₹30,000', duration: '6 months',
    skills: ['Node.js', 'MongoDB', 'React'], applicants: 156,
    image: '/fullstack.jpg', otherCompaniesCount: 28,
    companyLogos: ['/company5.jpg', '/company2.jpg', '/company3.jpg'],
    tag: 'Full Stack',
    country: 'India',
    remote: true,
  },
]

// JobPosting Schema for SEO
const jobPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Global Internship Opportunities',
  description: 'Browse verified internships from companies worldwide',
  numberOfItems: internships.length,
  itemListElement: internships.map((job, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'JobPosting',
      title: job.title,
      description: `${job.title} internship at ${job.company}. Skills required: ${job.skills.join(', ')}. Stipend: ${job.stipend}.`,
      hiringOrganization: {
        '@type': 'Organization',
        name: job.company,
      },
      employmentType: 'INTERN',
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: {
        '@type': 'Country',
        name: 'Worldwide',
      },
      datePosted: new Date().toISOString().split('T')[0],
      validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  })),
}

export default function InternshipsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden">

        {/* Hero Section */}
        <section className="relative bg-white overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[360px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.06) 0%, transparent 70%)' }} />
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.02 }}>
              <defs><pattern id="ig" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#4f46e5" strokeWidth="0.6" />
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#ig)" />
            </svg>
          </div>

          <div className="relative max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center pt-12 pb-10 sm:pt-14 sm:pb-12 lg:pt-16 lg:pb-14">
              <div className="inline-flex items-center gap-2 border border-indigo-100 bg-indigo-50 rounded-full px-3 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-[10.5px] font-bold text-indigo-700 uppercase tracking-[0.13em]">
                  10,000+ Opportunities · 40+ Countries
                </span>
              </div>
              <h1 className="text-[2rem] sm:text-[2.6rem] xl:text-[3rem] 2xl:text-[3.3rem] font-extrabold text-slate-900 leading-[1.07] tracking-tight mb-4">
                Find your <span className="text-indigo-600">perfect role.</span>
                <br />
                <span className="text-gray-400 text-xl sm:text-2xl">Anywhere in the world.</span>
              </h1>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-[1.75] max-w-lg">
                Browse thousands of verified internships. Remote, hybrid, and in-person roles from companies worldwide.
              </p>
            </div>
          </div>
        </section>

        <InternshipsClient initialInternships={internships} />

        {/* Upforge Discovery Section */}
        <section className="py-12 bg-gray-50 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Explore What Students Are Building
                  </h3>
                  <p className="text-gray-500 text-[13px] mb-3">
                    Discover real student startups, innovative ideas, and get inspired by what your peers are creating worldwide.
                  </p>
                  <a 
                    href="https://upforge.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 text-[13px] font-medium hover:text-indigo-700"
                  >
                    Explore Upforge <ArrowRight size={12} />
                  </a>
                  <p className="text-[10px] text-gray-400 mt-2">Free to explore · No signup needed</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Rocket size={20} className="text-indigo-600" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Lightbulb size={20} className="text-purple-600" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                    <Sparkles size={20} className="text-pink-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

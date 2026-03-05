// app/internships/page.tsx
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import InternshipsClient from './internships-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse 500+ Verified Internships in India | Internadda',
  description: "Discover paid internships at India's top startups. Roles in tech, marketing, design & more. Apply in minutes.",
}

const internships = [
  {
    id: '1', title: 'Frontend Development Intern', company: 'TechCorp India',
    location: 'Remote', stipend: '₹15,000 – ₹25,000', duration: '3 months',
    skills: ['React', 'Next.js', 'Tailwind'], applicants: 124,
    image: '/react.jpg', otherCompaniesCount: 36,
    companyLogos: ['/company1.jpg', '/company2.jpg', '/company3.jpg'],
    tag: 'Frontend',
  },
  {
    id: '2', title: 'Python Developer Intern', company: 'Arjuna AI Solutions',
    location: 'Remote', stipend: '₹8,000 – ₹12,000', duration: '6 months',
    skills: ['Python', 'Django', 'PostgreSQL'], applicants: 131,
    image: '/python.jpg', otherCompaniesCount: 22,
    companyLogos: ['/company4.jpg', '/company5.jpg', '/company1.jpg'],
    tag: 'AI & ML',
  },
  {
    id: '3', title: 'UI/UX Design Intern', company: 'Larex Systems',
    location: 'Remote', stipend: '₹10,000 – ₹15,000', duration: '4 months',
    skills: ['Figma', 'Adobe XD', 'Prototyping'], applicants: 89,
    image: '/ui-ux.jpg', otherCompaniesCount: 15,
    companyLogos: ['/company2.jpg', '/company3.jpg', '/company4.jpg'],
    tag: 'Design',
  },
  {
    id: '4', title: 'Data Science Intern', company: 'Quantum Analytics',
    location: 'Remote', stipend: '₹12,000 – ₹18,000', duration: '3 months',
    skills: ['Python', 'Pandas', 'SQL'], applicants: 210,
    image: '/datascience.jpg', otherCompaniesCount: 12,
    companyLogos: ['/company1.jpg', '/company5.jpg', '/company2.jpg'],
    tag: 'Data Science',
  },
  {
    id: '5', title: 'Digital Marketing Intern', company: 'Growth Mantra',
    location: 'Remote', stipend: '₹5,000 – ₹10,000', duration: '2 months',
    skills: ['SEO', 'Content Writing', 'Ads'], applicants: 340,
    image: '/content.jpg', otherCompaniesCount: 45,
    companyLogos: ['/company3.jpg', '/company4.jpg', '/company1.jpg'],
    tag: 'Marketing',
  },
  {
    id: '6', title: 'Full Stack Intern', company: 'Nexus Tech',
    location: 'Remote', stipend: '₹20,000 – ₹30,000', duration: '6 months',
    skills: ['Node.js', 'MongoDB', 'React'], applicants: 156,
    image: '/fullstack.jpg', otherCompaniesCount: 28,
    companyLogos: ['/company5.jpg', '/company2.jpg', '/company3.jpg'],
    tag: 'Full Stack',
  },
]

export default function InternshipsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden">

        {/* ── Hero ── */}
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
                <span className="text-[10.5px] font-bold text-indigo-700 uppercase tracking-[0.13em]">Available Opportunities</span>
              </div>
              <h1 className="text-[2rem] sm:text-[2.6rem] xl:text-[3rem] 2xl:text-[3.3rem] font-extrabold text-slate-900 leading-[1.07] tracking-tight mb-4">
                Find your <span style={{ color: '#1a1063' }}>perfect role.</span>
              </h1>
              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-[1.75] max-w-lg">
                Browse hundreds of verified internships. Join 7,200+ students who have already launched their careers with Internadda.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-14 sm:pb-16">
          <InternshipsClient initialInternships={internships} />
        </section>

      </main>
      <Footer />
    </>
  )
}

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Badge } from '@/components/ui/badge'
import { Scale, UserCheck, AlertTriangle, CheckCircle, Ban } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Internadda',
  description: 'The official terms and conditions for using the Internadda platform. Learn about your rights and responsibilities.',
}

export default function TermsOfService() {
  const lastUpdated = "February 16, 2026"

  const terms = [
    {
      icon: UserCheck,
      title: "1. Eligibility & Registration",
      content: "To use Internadda, you must be at least 16 years of age and currently enrolled in or a recent graduate of a recognized educational institution. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate."
    },
    {
      icon: CheckCircle,
      title: "2. Verified Applications",
      content: "Internadda acts as a bridge between students and verified hiring partners. While we vet companies for MSME compliance and legitimacy, we do not guarantee employment. Users are responsible for their own conduct during interviews and the accuracy of their resumes."
    },
    {
      icon: Ban,
      title: "3. Prohibited Conduct",
      content: "Users are strictly prohibited from: (a) posting fraudulent or misleading information; (b) creating multiple accounts for a single user; (c) attempting to scrape or bypass our platform's security; or (d) using our platform to solicit payments from other users. Violations will result in immediate account termination."
    },
    {
      icon: Scale,
      title: "4. Intellectual Property",
      content: "All content, including logos, UI design, and proprietary matching algorithms, are the property of Internadda Enterprises. Users retain ownership of their personal resumes and uploaded portfolio documents but grant us a license to share these with employers for the purpose of applications."
    },
    {
      icon: AlertTriangle,
      title: "5. Limitation of Liability",
      content: "Internadda is not liable for any direct or indirect disputes that arise between an intern and an employer once an internship has commenced. We provide the connection, but the professional contract is between the user and the hiring company."
    }
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white font-sans">
        {/* Unified Hero Section */}
        <section className="bg-gradient-to-b from-indigo-50 via-white to-white pt-16 pb-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Badge className="bg-indigo-100 text-indigo-700 border-none px-4 py-1.5 rounded-full mb-6 text-xs font-semibold uppercase tracking-wider">
              Legal Agreement
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Terms of <span className="text-indigo-600">Service</span>
            </h1>
            <p className="text-gray-500 font-medium">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-12 shadow-xl shadow-indigo-100/50">
              
              <div className="prose prose-indigo max-w-none">
                <p className="text-gray-600 leading-relaxed mb-10">
                  Welcome to <strong>Internadda</strong>. By accessing or using our platform, you agree to be bound by these Terms of Service. These terms apply to all visitors, users, and others who access the service. Please read them carefully to understand your legal rights as a member of our community.
                </p>

                <div className="space-y-12">
                  {terms.map((item, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                          <item.icon size={24} className="text-indigo-600 group-hover:text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 m-0">
                          {item.title}
                        </h2>
                      </div>
                      <p className="text-gray-600 leading-relaxed pl-2 border-l-2 border-indigo-50 ml-6">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>

                <hr className="my-12 border-gray-100" />

                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Questions about our Terms?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our support team is here to clarify any points regarding our platform usage and legal standards.
                  </p>
                  <p className="font-bold text-indigo-600">
                    Contact: legal@Internadda.com
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-400 text-xs mt-12 uppercase tracking-[0.2em]">
              © 2026 Internadda Enterprises • All Rights Reserved
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

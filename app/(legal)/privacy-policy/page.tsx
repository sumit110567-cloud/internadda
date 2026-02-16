import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Eye, FileText, Globe } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Internadda',
  description: 'Learn how Internadda collects, uses, and protects your personal data. Our commitment to student data security.',
}

export default function PrivacyPolicy() {
  const lastUpdated = "February 16, 2026"

  const sections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      content: "We collect information that identifies, relates to, or could reasonably be linked with you. This includes Personal Identifiers (name, email, phone number), Professional Data (resume, skills, education), and Usage Data (IP address, browser type) collected via cookies to improve your experience."
    },
    {
      icon: Globe,
      title: "2. How We Use Your Data",
      content: "Your data is primarily used to facilitate the internship application process. This includes sharing your profile with verified hiring partners when you apply, sending personalized internship alerts, verifying MSME compliance, and improving our platform's AI matching algorithms."
    },
    {
      icon: Shield,
      title: "3. Data Sharing & Disclosure",
      content: "Internadda does not sell your personal data to third-party advertisers. We only share information with 'Verified Employers' you explicitly apply to, and service providers who help us operate our platform (e.g., AWS for hosting, Arjuna AI for profile analysis)."
    },
    {
      icon: Lock,
      title: "4. Data Security",
      content: "We implement industry-standard SSL encryption and secure server protocols to protect your data. While no method of transmission is 100% secure, we follow MSME-recommended cybersecurity practices to ensure your professional information remains private."
    },
    {
      icon: FileText,
      title: "5. Your Rights & Choices",
      content: "As a user, you have the right to access, correct, or delete your personal information at any time through your dashboard. You may also opt-out of marketing emails while retaining access to critical application notifications."
    }
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white font-sans">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-indigo-50 via-white to-white pt-16 pb-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Badge className="bg-indigo-100 text-indigo-700 border-none px-4 py-1.5 rounded-full mb-6 text-xs font-semibold uppercase tracking-wider">
              Legal Transparency
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Privacy <span className="text-indigo-600">Policy</span>
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
                  At <strong>Internadda</strong>, we take your privacy seriously. This policy outlines our commitment to protecting the personal and professional data of students and employers using our MSME-verified portal. By using our services, you agree to the terms described herein.
                </p>

                <div className="space-y-12">
                  {sections.map((item, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
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

                <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
                  <h3 className="text-xl font-bold text-indigo-900 mb-2">
                    Contact Our Support Team
                  </h3>
                  <p className="text-indigo-700/80 mb-4">
                    If you have questions about your data or wish to exercise your data rights, please contact our Data Protection Officer.
                  </p>
                  <p className="font-bold text-indigo-900">
                    Email: support@Internadda.com
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-400 text-xs mt-12 uppercase tracking-[0.2em]">
              Internadda Enterprises • Secure & Verified Portal
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

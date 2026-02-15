import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | InternAdda',
  description: 'Learn how InternAdda collects, uses, and protects your personal data.',
}

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-extrabold text-[#0A2647] mb-8">Privacy Policy</h1>
      <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-[#0A2647]">1. Information Collection</h2>
          <p>We collect information you provide directly to us when you create an account, apply for internships, or communicate with us.</p>
        </section>
        {/* Add more sections as needed */}
      </div>
    </main>
  )
}

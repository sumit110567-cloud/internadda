import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | InternAdda',
  description: 'The terms and conditions for using the InternAdda platform.',
}

export default function TermsOfService() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-extrabold text-[#0A2647] mb-8">Terms of Service</h1>
      <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
        <p>By accessing InternAdda, you agree to be bound by these terms. InternAdda is an MSME-certified platform providing internship connections.</p>
      </div>
    </main>
  )
}

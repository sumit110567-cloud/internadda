import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'InternAdda — India\'s #1 Internship Platform | Verified Internships for Students',
  description: 'Find verified internships at 200+ top companies. Join 7,200+ students who landed real internships through InternAdda — India\'s largest dedicated internship ecosystem. MSME Registered.',
  keywords: ['internship in India', 'internship for students', 'remote internship', 'Python internship', 'web development internship', 'data science internship', 'InternAdda'],
  openGraph: {
    title: 'InternAdda — India\'s #1 Internship Platform',
    description: 'Verified internships at 200+ companies. 7,200+ students placed. Average offer in 48 hours.',
    url: 'https://www.internadda.com',
    siteName: 'InternAdda',
    images: [{ url: 'https://www.internadda.com/og-image.jpg', width: 1200, height: 630, alt: 'InternAdda - India\'s Internship Ecosystem' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InternAdda — India\'s #1 Internship Platform',
    description: 'Verified internships at 200+ companies. 7,200+ students placed.',
    images: ['https://www.internadda.com/og-image.jpg'],
  },
  alternates: { canonical: 'https://www.internadda.com' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

export { default } from './_home'

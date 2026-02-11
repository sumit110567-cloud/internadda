import React from "react"
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'] 
});

export const metadata: Metadata = {
  title: 'InternAdda - India\'s Best Internship Platform | Learn Intern Earn 2024',
  description: 'InternAdda: India\'s largest internship ecosystem. 7000+ students placed. MSME certified. Verified internships in Web Development, Data Science, Python, UI/UX. ₹2K-₹8K monthly stipend. Direct interviews, no middlemen.',
  keywords: [
    'internship',
    'internships in India',
    'paid internships',
    'web development internship',
    'data science internship',
    'python internship',
    'UI UX internship',
    'online internship',
    'remote internship',
    'work from home internship',
    'internship program',
    'student internship',
    'first internship',
    'summer internship',
    'winter internship',
    'skill development courses',
    'training and placement',
    'career guidance',
    'professional certification',
  ],
  authors: [{ name: 'InternAdda', url: 'https://internadda.com' }],
  creator: 'InternAdda',
  publisher: 'InternAdda',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://internadda.com',
    siteName: 'InternAdda',
    title: 'InternAdda - India\'s Adda for Internships',
    description: 'Access verified internships, learn from experts, and earn while gaining real-world experience.',
    images: [
      {
        url: 'https://internadda.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'InternAdda - Learn Intern Earn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InternAdda - Learn • Intern • Earn',
    description: 'India\'s leading internship platform. Connect with verified opportunities.',
    images: ['https://internadda.com/twitter-image.jpg'],
    creator: '@internadda',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  category: 'Education',
  applicationName: 'InternAdda',
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL('https://internadda.com'),
  alternates: {
    canonical: 'https://internadda.com',
    languages: {
      'en-IN': 'https://internadda.com',
    },
  },
  verification: {
    google: 'google-site-verification-code-here',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${poppins.className} font-sans antialiased bg-background text-foreground`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

import React from "react"
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'
import { cn } from "@/lib/utils"

/**
 * PRODUCTION FONT OPTIMIZATION
 * Using variable font weights and 'swap' display to prevent Layout Shift (CLS).
 */
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap', 
  variable: '--font-poppins',
});

/**
 * ADVANCED SEO METADATA
 * Synchronized with InternAdda's "Gold Standard" branding.
 */
export const metadata: Metadata = {
  title: 'InternAdda - India\'s Largest Dedicated Internship Ecosystem | MSME Registered',
  description: 'InternAdda is India\'s premier MSME-certified internship platform. Trusted by 7,200+ students and 500+ verified companies. Access roles in Web Dev, Python, Data Science, and more with ₹2K-₹8K stipends.',
  keywords: [
    'internship platform india', 'MSME registered internships', 'paid internships for students', 
    'Delhi University internship portal', 'verified tech internships', 'remote python internships',
    'full stack development internships', 'internadda official', 'career development india'
  ],
  authors: [{ name: 'InternAdda', url: 'https://internadda.com' }],
  creator: 'InternAdda',
  publisher: 'InternAdda',
  metadataBase: new URL('https://internadda.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
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
    title: 'InternAdda - India\'s Largest Dedicated Internship Ecosystem',
    description: 'Bridging the gap between ambitious students and 500+ verified industry leaders. MSME Registered and trusted by 7,200+ candidates.',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'InternAdda - The Gold Standard of Internships',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InternAdda - Learn • Intern • Earn',
    description: 'India\'s leading internship platform. Connect with 500+ verified industry opportunities.',
    images: ['/twitter-image.jpg'],
    creator: '@internadda',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0A2647' },
  ],
}

/**
 * GLOBAL STRUCTURED DATA (JSON-LD)
 * Ensures InternAdda's brand information is correctly parsed by search engines.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "InternAdda",
  "alternateName": "InternAdda Enterprises",
  "url": "https://internadda.com",
  "logo": "https://internadda.com/logo.jpg",
  "founder": {
    "@type": "Person",
    "name": "Lucky Tiwari"
  },
  "sameAs": [
    "https://linkedin.com/company/internadda",
    "https://instagram.com/internadda"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Support",
    "areaServed": "IN",
    "availableLanguage": "en"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(poppins.variable)}>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* PRECONNECT TO CRITICAL ORIGINS FOR LOW LATENCY */}
        <link rel="preconnect" href="https://hghpivmqvunfzhqomlud.supabase.co" />
        <link rel="dns-prefetch" href="https://hghpivmqvunfzhqomlud.supabase.co" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={cn(
        "min-h-screen bg-white font-sans antialiased text-[#0A2647] selection:bg-blue-100 selection:text-blue-900",
        poppins.className
      )}>
        <AuthProvider>
          {/* Consistency Guard:
            Ensures a maximum content width of 1400px across the entire ecosystem 
            to match the 'Gold Standard' home page layout.
          */}
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              {children}
            </div>
          </div>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

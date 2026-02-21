import React from "react"
import type { Metadata, Viewport } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"
import { cn } from "@/lib/utils"
import { InternaBot } from "@/components/InternaBot"

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title:
    "InternAdda - India's Largest Dedicated Internship Ecosystem | MSME Registered",
  description:
    "InternAdda is India's premier MSME-certified internship platform. Trusted by 7,200+ students and 500+ verified companies. Access roles in Web Dev, Python, Data Science, and more with ₹2K-₹8K stipends.",
  keywords: [
    "internship platform india",
    "MSME registered internships",
    "paid internships for students",
    "Delhi University internship portal",
    "verified tech internships",
    "remote python internships",
    "full stack development internships",
    "internadda official",
    "career development india",
  ],
  authors: [{ name: "InternAdda", url: "https://internadda.com" }],
  creator: "InternAdda",
  publisher: "InternAdda",
  metadataBase: new URL("https://internadda.com"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "ADD_YOUR_VERIFICATION_CODE_HERE",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://internadda.com",
    siteName: "InternAdda",
    title:
      "InternAdda - India's Largest Dedicated Internship Ecosystem",
    description:
      "Bridging the gap between ambitious students and 500+ verified industry leaders. MSME Registered and trusted by 7,200+ candidates.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "InternAdda - The Gold Standard of Internships",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InternAdda - Learn • Intern • Earn",
    description:
      "India's leading internship platform. Connect with 500+ verified industry opportunities.",
    images: ["/twitter-image.jpg"],
    creator: "@internadda",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0A2647" },
  ],
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "InternAdda",
  alternateName: "InternAdda Enterprises",
  url: "https://internadda.com",
  logo: "https://internadda.com/logo.jpg",
  founder: {
    "@type": "Person",
    name: "Lucky Tiwari",
  },
  sameAs: [
    "https://linkedin.com/company/internadda",
    "https://instagram.com/internadda",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Support",
    areaServed: "IN",
    availableLanguage: "en",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(poppins.variable)}
    >
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* GOOGLE TAG MANAGER */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WDQQ8DV8');
            `,
          }}
        />

        {/* PERFORMANCE OPTIMIZATION */}
        <link
          rel="preconnect"
          href="https://hghpivmqvunfzhqomlud.supabase.co"
        />
        <link
          rel="dns-prefetch"
          href="https://hghpivmqvunfzhqomlud.supabase.co"
        />

        {/* STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>

      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased text-[#0A2647] selection:bg-blue-100 selection:text-blue-900",
          poppins.className
        )}
      >
        {/* GTM NOSCRIPT (BODY TOP) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WDQQ8DV8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
          <InternaBot />
        </AuthProvider>

        <Analytics />
      </body>
    </html>
  )
}

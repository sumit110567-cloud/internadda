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

// ─── UPGRADED: Metadata with global scope & Upforge partnership ──────────────
export const metadata: Metadata = {
  title: {
    default: "InternAdda - Global Internship Discovery Platform | Find Paid Internships Worldwide",
    template: "%s | InternAdda - Global Internships",
  },
  description:
    "Discover 10,000+ verified internships across 40+ countries. Remote, paid, and global opportunities for students. Build your verified profile on Upforge and get noticed by top employers.",
  keywords: [
    // Primary keywords
    "global internships",
    "remote internships",
    "student internships",
    "internships for freshers",
    "paid internships",
    "virtual internships",
    
    // Niche keywords
    "engineering internships",
    "data science internships",
    "AI internships",
    "software development internships",
    
    // Geographic keywords
    "internships India",
    "internships USA",
    "internships UK",
    "internships Germany",
    "internships Canada",
    "internships Singapore",
    "internships worldwide",
    
    // Platform keywords
    "internship discovery platform",
    "verified internships",
    "student career platform",
    "internship ecosystem",
    "Upforge verification",
    "portfolio identity",
    
    // Long-tail
    "best internship platform for students",
    "how to get internship abroad",
    "remote internships for college students",
  ],
  authors: [{ name: "InternAdda", url: "https://internadda.com" }],
  creator: "InternAdda",
  publisher: "InternAdda",
  metadataBase: new URL("https://internadda.com"),
  alternates: {
    canonical: "/",
    languages: {
      'en-US': '/en',
      'en-IN': '/in',
      'en-GB': '/uk',
    },
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
    alternateLocale: ["en_US", "en_GB"],
    url: "https://internadda.com",
    siteName: "InternAdda",
    title: "InternAdda - Global Internship Discovery Platform | Powered by Upforge",
    description:
      "Find verified internships globally. Build your portfolio identity on Upforge and stand out to recruiters. 10,000+ opportunities across 40+ countries.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "InternAdda - Global Internship Discovery Platform | Powered by Upforge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InternAdda - Discover Internships Globally | Get Verified on Upforge",
    description:
      "10,000+ verified internships across 40+ countries. Remote, paid, and global opportunities. Create your verified profile on Upforge today.",
    images: ["/twitter-image.jpg"],
    creator: "@internadda",
    site: "@internadda",
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
  category: "education",
  classification: "Internship Platform & Career Development",
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

// ─── UPGRADED: Organization schema with Upforge sameAs ───────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "InternAdda",
  alternateName: "InternAdda Enterprises",
  url: "https://internadda.com",
  logo: "https://internadda.com/logo.jpg",
  description: "Global internship discovery platform. Find verified internships across 40+ countries. Partnered with Upforge for student profile verification.",
  founder: {
    "@type": "Person",
    name: "Lucky Tiwari",
  },
  sameAs: [
    "https://upforge.org",  // ← ADDED: Upforge partnership reference
    "https://linkedin.com/company/internadda",
    "https://instagram.com/internadda",
    "https://twitter.com/internadda",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Support",
    areaServed: "Worldwide",  // ← CHANGED: from "IN" to global
    availableLanguage: ["en", "hi", "es", "fr", "de"],
  },
  // NEW: Parent/partner organization reference
  parentOrganization: {
    "@type": "Organization",
    name: "Upforge",
    url: "https://upforge.org",
    description: "Student profile verification and portfolio identity platform",
  },
  // NEW: Global reach indicators
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: "50+",
  },
  areaServed: {
    "@type": "Country",
    name: "Worldwide",
  },
}

// ─── NEW: Upforge partner schema for cross-domain authority ──────────────────
const upforgePartnerSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Upforge",
  url: "https://upforge.org",
  description: "Student profile verification, portfolio identity, and skill credibility platform. Official verification partner of InternAdda.",
  logo: "https://upforge.org/logo.png",
  sameAs: [
    "https://internadda.com",  // Backlink reference to InternAdda
  ],
  // Relationship defined
  funding: {
    "@type": "Organization",
    name: "InternAdda",
    url: "https://internadda.com",
  },
}

// ─── NEW: WebSite schema with search and potential action ────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "InternAdda",
  url: "https://internadda.com",
  description: "Global internship discovery platform with Upforge verification integration",
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://internadda.com/internships?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
}

// ─── NEW: BreadcrumbList base schema ─────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://internadda.com",
    },
  ],
}

// ─── NEW: FAQ Schema for common questions (global scope) ─────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can I find global internships?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "InternAdda offers 10,000+ verified internships across 40+ countries. Use our search filters to find remote, paid, and in-person opportunities worldwide.",
      },
    },
    {
      "@type": "Question",
      name: "What is Upforge and why should I verify my profile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upforge is a student profile verification and portfolio identity platform. Students with verified Upforge profiles receive 3x more interview calls and get priority shortlisting from recruiters.",
      },
    },
    {
      "@type": "Question",
      name: "Are the internships on InternAdda paid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we feature both paid and stipend-based internships. Many remote and global opportunities offer competitive compensation.",
      },
    },
    {
      "@type": "Question",
      name: "Can international students apply?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! InternAdda lists internships from 40+ countries. Many remote positions are open to students worldwide.",
      },
    },
  ],
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
        
        {/* ─── NEW: Hreflang tags for international SEO ────────────────────── */}
        <link rel="alternate" hrefLang="en" href="https://internadda.com" />
        <link rel="alternate" hrefLang="en-IN" href="https://internadda.com/in" />
        <link rel="alternate" hrefLang="en-US" href="https://internadda.com/us" />
        <link rel="alternate" hrefLang="en-GB" href="https://internadda.com/uk" />
        <link rel="alternate" hrefLang="x-default" href="https://internadda.com" />

        {/* ─── NEW: Geo-targeting meta tags ────────────────────────────────── */}
        <meta name="geo.region" content="WW" />
        <meta name="geo.placename" content="Global" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="1 days" />

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
        
        {/* ─── NEW: Preconnect to Upforge for faster cross-domain resources ─── */}
        <link rel="preconnect" href="https://upforge.org" />
        <link rel="dns-prefetch" href="https://upforge.org" />

        {/* STRUCTURED DATA - ALL SCHEMAS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(upforgePartnerSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
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

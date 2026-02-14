import type { MetadataRoute } from 'next'

/**
 * PRODUCTION SITEMAP GENERATOR
 * This file ensures all high-value pages, internship categories, and blog posts
 * are indexed by search engines with appropriate priorities.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://internadda.com'
  const currentDate = new Date().toISOString().split('T')[0]

  // Internship categories based on featured listings
  const internshipSlugs = ['1', '2', '3'] // Python, Web Dev, Data Science
  
  // Blog slugs from your journal data
  const blogSlugs = [
    'getting-started-internship',
    'resume-tips-2024',
    'interview-questions',
    'skills-employers-want'
  ]

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/internships`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  // Dynamic Internship Routes (High priority for job seekers)
  const internshipRoutes: MetadataRoute.Sitemap = internshipSlugs.map((id) => ({
    url: `${baseUrl}/apply/${id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Dynamic Blog Routes (For SEO Ranking)
  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...internshipRoutes, ...blogRoutes]
}

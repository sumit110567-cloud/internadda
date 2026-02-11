'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { MapPin, Briefcase, IndianRupee, Users, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import type { Metadata } from 'next'

// This would come from a database in production
const internships = [
  {
    id: 1,
    title: 'Frontend Development Intern',
    company: 'TechCorp India',
    location: 'Bangalore, India',
    stipend: '₹20,000/month',
    duration: '3 months',
    type: 'Remote',
    description: 'Build responsive web applications using React and TypeScript.',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    applicants: 124,
  },
  {
    id: 2,
    title: 'Data Science Intern',
    company: 'DataViz Solutions',
    location: 'Mumbai, India',
    stipend: '₹25,000/month',
    duration: '4 months',
    type: 'On-site',
    description: 'Work with machine learning models and data analysis projects.',
    skills: ['Python', 'Machine Learning', 'SQL'],
    applicants: 98,
  },
  {
    id: 3,
    title: 'Digital Marketing Intern',
    company: 'Growth Hacks Media',
    location: 'Delhi, India',
    stipend: '₹15,000/month',
    duration: '3 months',
    type: 'Hybrid',
    description: 'Create and execute digital marketing campaigns.',
    skills: ['SEO', 'Content Writing', 'Social Media'],
    applicants: 156,
  },
  {
    id: 4,
    title: 'Backend Development Intern',
    company: 'CloudBase Systems',
    location: 'Pune, India',
    stipend: '₹22,000/month',
    duration: '4 months',
    type: 'Remote',
    description: 'Build scalable backend services and APIs.',
    skills: ['Node.js', 'PostgreSQL', 'Docker'],
    applicants: 87,
  },
  {
    id: 5,
    title: 'UI/UX Design Intern',
    company: 'DesignFlow Studios',
    location: 'Bangalore, India',
    stipend: '₹18,000/month',
    duration: '3 months',
    type: 'On-site',
    description: 'Design intuitive user interfaces and experiences.',
    skills: ['Figma', 'UI Design', 'User Research'],
    applicants: 102,
  },
  {
    id: 6,
    title: 'Content Writing Intern',
    company: 'WordSmith Publishing',
    location: 'Remote, India',
    stipend: '₹12,000/month',
    duration: '2 months',
    type: 'Remote',
    description: 'Write engaging blog posts and marketing content.',
    skills: ['Content Writing', 'SEO', 'Research'],
    applicants: 145,
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
}

export default function InternshipsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredInternships = internships.filter((internship) =>
    internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="space-y-6" {...fadeInUp}>
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl font-bold">Browse Internships</h1>
                <p className="text-foreground/70 text-lg">
                  Discover {internships.length}+ verified internship opportunities across India
                </p>
              </div>

              {/* Search Bar */}
              <div className="max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-3 text-foreground/40" size={20} />
                  <Input
                    placeholder="Search by role, company, or skill..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 py-6 text-base"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Internships Grid */}
        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredInternships.length > 0 ? (
              <motion.div
                className="grid gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
                viewport={{ once: true }}
              >
                {filteredInternships.map((internship) => (
                  <motion.div
                    key={internship.id}
                    className="group p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all"
                    variants={fadeInUp}
                  >
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {internship.title}
                        </h3>
                        <p className="text-foreground/70 font-medium mb-3">{internship.company}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {internship.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary mb-2">{internship.stipend}</p>
                        <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                          {internship.type}
                        </span>
                      </div>
                    </div>

                    <p className="text-foreground/70 mb-4">{internship.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-t border-border pt-4">
                      <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <MapPin size={18} className="text-primary" />
                        {internship.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <Briefcase size={18} className="text-primary" />
                        {internship.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <Users size={18} className="text-primary" />
                        {internship.applicants} applied
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <IndianRupee size={18} className="text-primary" />
                        Paid
                      </div>
                    </div>

                    <Button className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                      View Details & Apply
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-12"
                {...fadeInUp}
              >
                <p className="text-lg text-foreground/70">No internships found matching your search.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

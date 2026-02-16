'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Clock, Users, Star, CheckCircle, GraduationCap, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import Image from 'next/image'

interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  price: string;
  description: string;
  topics: string[];
  level: string;
  image: string;
}

const CourseCard = ({ course }: { course: Course }) => {
  const handleEnroll = () => {
    toast.success(`Welcome to ${course.title}!`, {
      description: "You have been successfully enrolled. Check your dashboard for details.",
    });
  };

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-[360px] flex flex-col group mx-auto">
      <div className="relative h-48 w-full bg-gray-100 rounded-t-2xl overflow-hidden">
        <Image 
          src={course.image} 
          alt={course.title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
          {course.category}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm border border-gray-100">
          <Star size={12} className="text-amber-500 fill-amber-500" />
          <span className="text-gray-700 text-xs font-bold">{course.rating}</span>
        </div>
      </div>

      <div className="p-6 text-center flex flex-col flex-1">
        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
          {course.level} • {course.instructor}
        </p>
        
        <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug min-h-[3.5rem] flex items-center justify-center">
          {course.title}
        </h3>

        <div className="flex items-center justify-center gap-4 mb-4 pb-4 border-b border-gray-50">
          <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
            <Clock size={14} className="text-indigo-600" /> {course.duration}
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
            <Users size={14} className="text-indigo-600" /> {course.students}+ Students
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5 mb-6">
          {course.topics.map((topic) => (
            <span key={topic} className="bg-gray-50 border border-gray-100 px-3 py-1 rounded-full text-[10px] font-medium text-gray-600">
              {topic}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Status</p>
            <p className="text-lg font-black text-emerald-600">FREE</p>
          </div>
          <Button 
            onClick={handleEnroll}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-xl font-semibold text-sm shadow-md shadow-indigo-100 transition-all active:scale-95"
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </article>
  )
}

export default function CoursesClient({ initialCourses }: { initialCourses: Course[] }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCourses = initialCourses.filter(course => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  return (
    <div className="flex flex-col items-center">
      {/* Search Bar - Matching Internship Page Filter Style */}
      <div className="relative w-full max-w-2xl px-4 -mt-8 mb-16 z-20">
        <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2">
          <div className="flex-1 flex items-center px-4 gap-3">
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses by title or skill (e.g. Figma, React)..."
              className="w-full py-3 outline-none text-gray-700 bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="hidden sm:flex bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6">
            Search
          </Button>
        </div>
      </div>

      {/* Course Grid */}
      <section className="pb-20 w-full max-w-7xl px-4">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-300" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">No courses found</h3>
            <p className="text-gray-500">Try a different keyword or browse categories.</p>
            <Button variant="link" className="text-indigo-600 mt-2" onClick={() => setSearchTerm('')}>
              Clear all filters
            </Button>
          </div>
        )}
      </section>

      {/* CTA Section - Matching Home Style */}
      <section className="py-16 md:py-24 w-full px-4 max-w-7xl">
        <div className="bg-indigo-600 rounded-3xl md:rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90" />
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Can't find your <span className="text-indigo-200">topic?</span>
            </h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl">
              We release new masterclasses every week. Join the waitlist to be the first to know about new certifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-10 py-6 rounded-xl font-bold shadow-lg flex items-center gap-2">
                Join the Waitlist <ArrowRight size={18} />
              </Button>
            </div>
            <p className="text-indigo-200 text-sm mt-6">
              Learn from the best, for free.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

// data/categories.ts
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string; // optional icon name
}

export const categories: Category[] = [
  { id: 'internships', name: 'Internships', slug: 'internships', description: 'Latest internship opportunities and guides for Indian students.', icon: 'briefcase' },
  { id: 'free-courses', name: 'Free Courses', slug: 'free-courses', description: 'Top free online courses with certificates to boost your resume.', icon: 'academy' },
  { id: 'resume-career', name: 'Resume & Career', slug: 'resume-career', description: 'Resume tips, interview prep, and career advice.', icon: 'document' },
  { id: 'interview-preparation', name: 'Interview Preparation', slug: 'interview-preparation', description: 'Ace your internship interviews with our guides.', icon: 'chat' },
  { id: 'skill-development', name: 'Skill Development', slug: 'skill-development', description: 'Learn in-demand skills for internships and jobs.', icon: 'lightbulb' },
  { id: 'government-internships', name: 'Government Internships', slug: 'government-internships', description: 'Paid internships in Indian government departments.', icon: 'government' },
  { id: 'remote-work', name: 'Remote Work', slug: 'remote-work', description: 'Work-from-home internships and remote career tips.', icon: 'home' },
];

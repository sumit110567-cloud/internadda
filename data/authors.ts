// data/authors.ts
export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  social?: { twitter?: string; linkedin?: string };
}

export const authors: Author[] = [
  {
    id: 'priya-sharma',
    name: 'Lucky Tiwari',
    avatar: '/lucky.jpg',
    bio: 'Founder of Internadda & Career coach with 5+ years helping students land their dream internships.',
    role: 'Founder & CEO',
    social: { linkedin: 'https://www.linkedin.com/in/luckytiwari/' }
  },
  {
    id: 'raj-kumar',
    name: 'Pranjal Singh',
    avatar: '/Pranjal.jpg',
    bio: 'Software engineer turned educator. Passionate about making tech careers accessible to all.',
    role: 'Chief Operating Officer',
    social: { linkedin: 'https://www.linkedin.com/in/pranjal-singh-204580374/' }
  },
  // Add more authors as needed
];

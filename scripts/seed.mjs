import { PrismaClient } from '@prisma/client'
import { createRequire } from 'module'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import * as dotenv from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '..', '.env') })

const prisma = new PrismaClient()

const projects = [
  {
    name: 'BIRSTBD — Research Institute Platform',
    emoji: '🔬',
    tags: ['Featured', 'Full-Stack', 'Stripe', 'Firebase'],
    desc: 'Research and statistical education platform with AI-powered analysis tools, Stripe payments, and course management.',
    fullDesc: 'A comprehensive platform for BIRSTBD (Bangladesh Institute for Research and Statistical Training) that enhances research and statistical education through mentorship, AI-powered tools, and career development. Features include course management, secure Stripe payment integration, Firebase authentication, research guidance tools, AI-powered statistical analysis, and dynamic news and blog system.',
    tech: ['React 19', 'Vite', 'TailwindCSS', 'Framer Motion', 'GSAP', 'Firebase', 'Stripe', 'React Query', 'React Hook Form', 'Node.js', 'Express.js'],
    liveUrl: 'https://birstbd.com',
    ghClientUrl: 'https://github.com/Rayhan-50/birstbd_foxmenstudio-frontend',
    ghServerUrl: 'https://github.com/Rayhan-50/birstbd_foxmenstudio-beckend',
    screenshot: '/projects/birstbd.png',
    challenges: [
      'Integrating Stripe payment gateway with secure webhook handling for course purchases.',
      'Building an AI-powered statistical analysis tool that processes complex datasets.',
      'Designing a scalable multi-user system with different roles (admin, researcher, student).',
      'Optimizing performance for large research datasets and document rendering.',
    ],
    order: 0,
    featured: true,
  },
  {
    name: 'SkillBridge — Tutoring Marketplace',
    emoji: '📚',
    tags: ['Full-Stack', 'Next.js 16', 'PostgreSQL'],
    desc: 'Modern Next.js tutoring marketplace with role-based dashboards, booking management, and review system.',
    fullDesc: 'A modern online tutoring marketplace built with Next.js 16 connecting students with expert tutors. Features role-based dashboards for students, tutors, and admins, comprehensive tutor browsing and filtering by subject and price, session booking management, a fair review and rating system, and full dark/light mode support. Built with a type-safe stack from frontend to backend.',
    tech: ['Next.js 16', 'TypeScript 5', 'Tailwind CSS 4', 'shadcn/ui', 'TanStack Query', 'Better Auth', 'Node.js', 'Express.js', 'Prisma', 'PostgreSQL', 'Zod'],
    liveUrl: 'https://skillbridge-client-coral.vercel.app',
    ghClientUrl: 'https://github.com/Rayhan-50/SkillBridge-Client-',
    ghServerUrl: 'https://github.com/Rayhan-50/SkillBridge-server',
    screenshot: '/projects/skillbridge.png',
    challenges: [
      'Building a real-time booking system that prevents double-bookings across time zones.',
      'Implementing type-safe end-to-end validation with Zod from API to UI.',
      'Designing granular role-based access control with Better Auth for three user types.',
      'Optimizing TanStack Query caching for fast, seamless dashboard interactions.',
    ],
    order: 1,
    featured: false,
  },
  {
    name: 'Leson Paw — Education Platform',
    emoji: '🎓',
    tags: ['Full-Stack', 'i18n', 'Multi-language'],
    desc: 'Multi-language online education system for Haiti with tutor discovery, booking, and progress tracking.',
    fullDesc: 'A comprehensive educational platform connecting students with tutors across Haiti, supporting both in-person and virtual tutoring sessions. Features multi-language support (English, French, Spanish, Haitian Creole), student-teacher discovery, booking management, custom job posting, progress tracking, professional teacher profiles, and admin analytics dashboard. Built with i18n localization for full accessibility.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Query', 'i18n', 'Node.js', 'Express.js', 'MongoDB', 'Firebase Auth', 'JWT', 'Axios'],
    liveUrl: 'https://lesonpaw.web.app',
    ghClientUrl: 'https://github.com/Rayhan-50/Lesson-paw',
    ghServerUrl: 'https://github.com/Rayhan-50/Lesson-paw-server',
    screenshot: '/projects/lesonpaw.png',
    challenges: [
      'Implementing full i18n localization for 4 languages with dynamic content switching.',
      'Building a booking system that handles in-person and virtual session scheduling.',
      'Designing a progress tracking system that works across different tutoring formats.',
      'Optimizing for low-bandwidth users in Haiti with efficient data loading strategies.',
    ],
    order: 2,
    featured: false,
  },
  {
    name: 'The Lebas Buying Int',
    emoji: '🛒',
    tags: ['Full-Stack', 'MERN', 'GSAP'],
    desc: 'Full-stack organizational management platform with Firebase auth + JWT, role-based access, and dynamic content.',
    fullDesc: 'A full-stack MERN application for organizational management featuring a responsive and modern UI built with GSAP animations. Implements Firebase authentication integrated with JWT for dual-layer security, role-based access control with Admin and User roles, dynamic content management system, state management via React Query, and interactive notifications with SweetAlert2.',
    tech: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'React Router', 'Firebase Auth', 'JWT', 'Axios', 'Node.js', 'Express.js', 'MongoDB', 'SweetAlert2'],
    liveUrl: 'https://thelebasbuyingint.com',
    ghClientUrl: 'https://github.com/Rayhan-50/thelebasbuyingint-client',
    ghServerUrl: 'https://github.com/Rayhan-50/thelebasbuyingint-server',
    screenshot: '/projects/lebas.png',
    challenges: [
      'Combining Firebase auth with JWT for dual-layer authentication security.',
      'Implementing smooth GSAP animations without affecting core rendering performance.',
      'Designing flexible role-based permissions adaptable to organizational hierarchies.',
      'Managing complex React Query caching for real-time data synchronization.',
    ],
    order: 3,
    featured: false,
  },
  {
    name: 'Noorvia — Business Platform',
    emoji: '💼',
    tags: ['Full-Stack', 'React 19', 'DaisyUI'],
    desc: 'React 19 business platform with admin management, user dashboards, and secure role-based access control.',
    fullDesc: 'A comprehensive MERN business platform offering secure authentication, user dashboards, and admin management capabilities. Features role-based admin access with user and team management, data moderation tools, elegant form handling with React Hook Form, and fully responsive design with DaisyUI components. Built with React 19 and Tailwind CSS 4 for cutting-edge performance.',
    tech: ['React 19', 'Vite', 'Tailwind CSS 4', 'DaisyUI 5', 'Framer Motion', 'Firebase Auth', 'React Hook Form', 'TanStack Query', 'SweetAlert2', 'React Toastify', 'Node.js', 'MongoDB'],
    liveUrl: 'https://noorviabd.com',
    ghClientUrl: 'https://github.com/Rayhan-50/noorvia-frontend',
    ghServerUrl: 'https://github.com/Rayhan-50/noorvia-beckend',
    screenshot: '/projects/noorvia.png',
    challenges: [
      'Migrating to React 19 and leveraging new concurrent features for better UX.',
      'Building a scalable admin panel with granular permissions for team management.',
      'Integrating Framer Motion for smooth page transitions without layout shifts.',
      'Designing an intuitive data moderation workflow for admin users.',
    ],
    order: 4,
    featured: false,
  },
  {
    name: 'Redleaf-BD — Organic Food Store',
    emoji: '🌿',
    tags: ['E-commerce', 'Featured', 'Full-Stack', 'Premium UI'],
    desc: 'Premium organic food and grocery platform with category-based browsing, cart management, and seamless UX.',
    fullDesc: 'Redleaf-BD is a high-end e-commerce platform dedicated to premium organic products like pure honey, organic spices, and nutritious grains. It features a clean, professional interface with robust search, category filtering, and impact stories. Built with a focus on high-performance, accessibility, and a clean brand aesthetic that builds consumer trust.',
    tech: ['Next.js 15', 'React Query', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Vercel'],
    liveUrl: 'https://redleaf-bd-frontend-i83q.vercel.app/',
    ghClientUrl: 'https://github.com/Rayhan-50/Redleaf-BD-frontend',
    ghServerUrl: 'https://github.com/Rayhan-50/Redleaf-BD-backend',
    screenshot: '/projects/redleaf.png',
    challenges: [
      'Implementing a scalable product category system with nested navigation and sidebar filtering.',
      'Optimizing high-resolution product imagery for fast load times using Next.js Image optimization.',
      'Designing a clean, brand-focused UI that balances information density with a premium aesthetic.',
      'Managing complex state for the multi-item shopping cart and order flow synchronization.',
    ],
    order: 5,
    featured: true,
  },
]

async function main() {
  const existing = await prisma.project.count()
  if (existing > 0) {
    console.log(`DB already has ${existing} projects. Skipping seed.`)
    return
  }

  await prisma.project.createMany({ data: projects })
  console.log(`✓ Seeded ${projects.length} projects into the database.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

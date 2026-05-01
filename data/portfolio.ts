export const personalInfo = {
  name: 'Rayhan Ahmed',
  email: 'rayhanahmed.nstu@gmail.com',
  phone: '+8801645991970',
  location: 'Dhaka, Bangladesh',
  github: 'https://github.com/Rayhan-50',
  linkedin: 'https://www.linkedin.com/in/rayhan-ahmed-0ab5aa33a',
  facebook: 'https://www.facebook.com/raihan.ahamad.750/',
  twitter: '#',
  whatsapp: 'https://wa.me/8801645991970',
  devto: '#',
}

export const roles = [
  'Full-Stack Developer',
  'React Developer',
  'Node.js Engineer',
  'MERN Stack Developer',
  'Open Source Contributor',
]

export const skillsData = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React / Next.js', pct: 92 },
      { name: 'TypeScript', pct: 85 },
      { name: 'TailwindCSS', pct: 92 },
      { name: 'JavaScript (ES6+)', pct: 90 },
      { name: 'HTML / CSS', pct: 95 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js / Express.js', pct: 87 },
      { name: 'Golang', pct: 65 },
      { name: 'PostgreSQL / Prisma', pct: 82 },
      { name: 'REST API Design', pct: 90 },
      { name: 'Firebase / Auth', pct: 80 },
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Git / GitHub', pct: 93 },
      { name: 'Docker / Nginx', pct: 70 },
      { name: 'Vercel / Deployment', pct: 88 },
      { name: 'Framer Motion / GSAP', pct: 75 },
      { name: 'Figma / Design Tools', pct: 72 },
    ],
  },
]

export const experienceData = [
  {
    year: '2024 — Present',
    company: 'Foxmen Studio',
    badge: 'Full-time',
    badgeType: 'full' as const,
    role: 'Co-Founder & Full Stack Developer',
    bullets: [
      'Co-founded a development agency delivering full-stack applications for real-world clients.',
      'Led system design and development of scalable frontend and backend architectures.',
      'Built REST APIs, handled database design, and managed deployment workflows.',
      'Delivered multiple production-ready applications including BIRSTBD, Noorvia, and more.',
    ],
  },
  {
    year: '2025',
    company: 'Sailors Agency',
    badge: 'Part-time',
    badgeType: 'part' as const,
    role: 'Full Stack Developer',
    bullets: [
      'Developed full-stack applications using React, Node.js, and MongoDB.',
      'Designed RESTful APIs and handled backend logic with secure authentication systems.',
      'Worked on Leson Paw, implementing full client-server architecture and admin features.',
    ],
  },
]

export const projectsData = [
  {
    id: 0,
    name: 'BIRSTBD — Research Institute Platform',
    emoji: '🔬',
    bg: 'linear-gradient(135deg,#0a1628,#0d1e3c)',
    tags: ['Featured', 'Full-Stack', 'Stripe', 'Firebase'],
    desc: 'Research and statistical education platform with AI-powered analysis tools, Stripe payments, and course management.',
    fullDesc:
      'A comprehensive platform for BIRSTBD (Bangladesh Institute for Research and Statistical Training) that enhances research and statistical education through mentorship, AI-powered tools, and career development. Features include course management, secure Stripe payment integration, Firebase authentication, research guidance tools, AI-powered statistical analysis, and dynamic news and blog system.',
    tech: ['React 19', 'Vite', 'TailwindCSS', 'Framer Motion', 'GSAP', 'Firebase', 'Stripe', 'React Query', 'React Hook Form', 'Node.js', 'Express.js'],
    liveUrl: 'https://birstbd.com',
    ghClientUrl: 'https://github.com/Rayhan-50/birstbd_foxmenstudio-frontend',
    ghServerUrl: '#',
    wide: true,
    challenges: [
      'Integrating Stripe payment gateway with secure webhook handling for course purchases.',
      'Building an AI-powered statistical analysis tool that processes complex datasets.',
      'Designing a scalable multi-user system with different roles (admin, researcher, student).',
      'Optimizing performance for large research datasets and document rendering.',
    ],
    future: [
      'Add real-time collaboration tools for research teams.',
      'Expand AI capabilities with GPT-4 integration for statistical insights.',
      'Build a mobile app with React Native sharing the same backend.',
      'Add export functionality for research reports in PDF and Excel formats.',
    ],
  },
  {
    id: 1,
    name: 'SkillBridge — Tutoring Marketplace',
    emoji: '📚',
    bg: 'linear-gradient(135deg,#0e1520,#121a30)',
    tags: ['Full-Stack', 'Next.js 16', 'PostgreSQL'],
    desc: 'Modern Next.js tutoring marketplace with role-based dashboards, booking management, and review system.',
    fullDesc:
      'A modern online tutoring marketplace built with Next.js 16 connecting students with expert tutors. Features role-based dashboards for students, tutors, and admins, comprehensive tutor browsing and filtering by subject and price, session booking management, a fair review and rating system, and full dark/light mode support. Built with a type-safe stack from frontend to backend.',
    tech: ['Next.js 16', 'TypeScript 5', 'Tailwind CSS 4', 'shadcn/ui', 'TanStack Query', 'Better Auth', 'Node.js', 'Express.js', 'Prisma', 'PostgreSQL', 'Zod'],
    liveUrl: 'https://skillbridge-client-coral.vercel.app',
    ghClientUrl: 'https://github.com/Rayhan-50/SkillBridge-Client-',
    ghServerUrl: 'https://github.com/Rayhan-50/SkillBridge-server',
    wide: false,
    challenges: [
      'Building a real-time booking system that prevents double-bookings across time zones.',
      'Implementing type-safe end-to-end validation with Zod from API to UI.',
      'Designing granular role-based access control with Better Auth for three user types.',
      'Optimizing TanStack Query caching for fast, seamless dashboard interactions.',
    ],
    future: [
      'Add video calling integration for online sessions.',
      'Implement AI-powered tutor matching based on student learning style.',
      'Add integrated payment gateway for seamless session booking.',
      'Build a progress analytics dashboard for students.',
    ],
  },
  {
    id: 2,
    name: 'Leson Paw — Education Platform',
    emoji: '🎓',
    bg: 'linear-gradient(135deg,#0f0e1c,#180f28)',
    tags: ['Full-Stack', 'i18n', 'Multi-language'],
    desc: 'Multi-language online education system for Haiti with tutor discovery, booking, and progress tracking.',
    fullDesc:
      'A comprehensive educational platform connecting students with tutors across Haiti, supporting both in-person and virtual tutoring sessions. Features multi-language support (English, French, Spanish, Haitian Creole), student-teacher discovery, booking management, custom job posting, progress tracking, professional teacher profiles, and admin analytics dashboard. Built with i18n localization for full accessibility.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Query', 'i18n', 'Node.js', 'Express.js', 'MongoDB', 'Firebase Auth', 'JWT', 'Axios'],
    liveUrl: 'https://lesonpaw.web.app',
    ghClientUrl: 'https://github.com/Rayhan-50/Lesson-paw',
    ghServerUrl: 'https://github.com/Rayhan-50/Lesson-paw-server',
    wide: false,
    challenges: [
      'Implementing full i18n localization for 4 languages with dynamic content switching.',
      'Building a booking system that handles in-person and virtual session scheduling.',
      'Designing a progress tracking system that works across different tutoring formats.',
      'Optimizing for low-bandwidth users in Haiti with efficient data loading strategies.',
    ],
    future: [
      'Add integrated video calling for virtual sessions.',
      'Expand language support to more Caribbean languages.',
      'Build a mobile app with offline capabilities for low-connectivity areas.',
      'Add AI-powered learning path recommendations.',
    ],
  },
  {
    id: 3,
    name: 'The Lebas Buying Int',
    emoji: '🛒',
    bg: 'linear-gradient(135deg,#0a1a0f,#0d2b14)',
    tags: ['Full-Stack', 'MERN', 'GSAP'],
    desc: 'Full-stack organizational management platform with Firebase auth + JWT, role-based access, and dynamic content.',
    fullDesc:
      'A full-stack MERN application for organizational management featuring a responsive and modern UI built with GSAP animations. Implements Firebase authentication integrated with JWT for dual-layer security, role-based access control with Admin and User roles, dynamic content management system, state management via React Query, and interactive notifications with SweetAlert2.',
    tech: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'React Router', 'Firebase Auth', 'JWT', 'Axios', 'Node.js', 'Express.js', 'MongoDB', 'SweetAlert2'],
    liveUrl: 'https://thelebasbuyingint.com',
    ghClientUrl: 'https://github.com/Rayhan-50/thelebasbuyingint-client',
    ghServerUrl: 'https://github.com/Rayhan-50/thelebasbuyingint-server',
    wide: false,
    challenges: [
      'Combining Firebase auth with JWT for dual-layer authentication security.',
      'Implementing smooth GSAP animations without affecting core rendering performance.',
      'Designing flexible role-based permissions adaptable to organizational hierarchies.',
      'Managing complex React Query caching for real-time data synchronization.',
    ],
    future: [
      'Add real-time notifications with WebSockets.',
      'Implement advanced reporting and analytics dashboard.',
      'Add multi-currency and international shipping support.',
      'Build a mobile companion app with React Native.',
    ],
  },
  {
    id: 4,
    name: 'Noorvia — Business Platform',
    emoji: '💼',
    bg: 'linear-gradient(135deg,#1a0e1a,#280a28)',
    tags: ['Full-Stack', 'React 19', 'DaisyUI'],
    desc: 'React 19 business platform with admin management, user dashboards, and secure role-based access control.',
    fullDesc:
      'A comprehensive MERN business platform offering secure authentication, user dashboards, and admin management capabilities. Features role-based admin access with user and team management, data moderation tools, elegant form handling with React Hook Form, and fully responsive design with DaisyUI components. Built with React 19 and Tailwind CSS 4 for cutting-edge performance.',
    tech: ['React 19', 'Vite', 'Tailwind CSS 4', 'DaisyUI 5', 'Framer Motion', 'Firebase Auth', 'React Hook Form', 'TanStack Query', 'SweetAlert2', 'React Toastify', 'Node.js', 'MongoDB'],
    liveUrl: 'https://noorviabd.com',
    ghClientUrl: 'https://github.com/Rayhan-50/noorvia-frontend',
    ghServerUrl: '#',
    wide: false,
    challenges: [
      'Migrating to React 19 and leveraging new concurrent features for better UX.',
      'Building a scalable admin panel with granular permissions for team management.',
      'Integrating Framer Motion for smooth page transitions without layout shifts.',
      'Designing an intuitive data moderation workflow for admin users.',
    ],
    future: [
      'Add business analytics and revenue reporting features.',
      'Implement CRM capabilities for customer relationship management.',
      'Add integrations with popular third-party business tools.',
      'Build an API marketplace for extending platform functionality.',
    ],
  },
]

export const certificatesData = [
  {
    icon: '💻',
    iconBg: 'rgba(32,176,248,.12)',
    issuer: 'Programming Hero',
    name: 'Complete Web Development Course',
    year: '2023',
    verifyUrl: '#',
  },
]

export const educationData = [
  {
    year: '2022 — 2026',
    degree: 'B.Sc. in Statistics',
    school: 'Noakhali Science and Technology University',
    shortSchool: 'NSTU, Noakhali',
    detail:
      'Specializing in statistical computing and data analysis while actively building web applications. Member of the university programming club, contributing to open-source projects and participating in hackathons.',
    pill: '📊 Statistics & Computing',
    status: 'In Progress',
  },
  {
    year: '2023',
    degree: 'Complete Web Development Course',
    school: 'Programming Hero',
    shortSchool: 'Online Bootcamp',
    detail:
      'Intensive full-stack web development bootcamp covering MERN stack, authentication patterns, deployment strategies, and professional development workflows.',
    pill: '🏆 Certified',
    status: 'Completed',
  },
  {
    year: 'Ongoing',
    degree: 'Self-directed Learning',
    school: 'Udemy · Frontend Masters · YouTube',
    shortSchool: 'Online Platforms',
    detail:
      'Continuously upskilling in AI integration, system design, and modern DevOps. Currently deep-diving into Golang, PostgreSQL advanced patterns, and cloud deployment strategies.',
    pill: null,
    status: 'Ongoing',
  },
]

export const personalInfo = {
  name: 'Rayhan Ahmed',
  email: 'rayhanahmed.nstu@gmail.com',
  phone: '+8801645991970',
  location: 'Dhaka, Bangladesh',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/in/',
  twitter: '#',
  facebook: '#',
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
      { name: 'React / Next.js', pct: 90 },
      { name: 'TypeScript', pct: 85 },
      { name: 'TailwindCSS', pct: 90 },
      { name: 'JavaScript (ES6+)', pct: 88 },
      { name: 'HTML / CSS', pct: 95 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js / Express.js', pct: 85 },
      { name: 'Golang', pct: 65 },
      { name: 'PostgreSQL / Prisma', pct: 80 },
      { name: 'REST API Design', pct: 88 },
      { name: 'Firebase', pct: 72 },
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Git / GitHub', pct: 92 },
      { name: 'Docker / Nginx', pct: 70 },
      { name: 'Vercel / Deployment', pct: 85 },
      { name: 'Postman / API Testing', pct: 80 },
      { name: 'VS Code', pct: 90 },
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
      'Delivered multiple production-ready applications with modern tech stacks.',
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
    tags: ['Featured', 'Full-Stack', 'React', 'Node.js'],
    desc: 'A scalable research institute platform supporting structured data workflows and multi-user access.',
    fullDesc:
      'Developed a scalable research institute platform for BIRSTBD supporting structured data workflows and multi-user access. Designed RESTful APIs and optimized backend logic for efficient data handling and performance. Implemented responsive frontend interfaces ensuring smooth interaction between users and system services.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'TailwindCSS'],
    liveUrl: '#',
    ghUrl: '#',
    wide: true,
    challenges: [
      'Designing a scalable multi-user access control system with different permission levels.',
      'Optimizing backend logic for efficient data handling across large structured datasets.',
      'Implementing responsive UI that works seamlessly across all device types.',
    ],
    future: [
      'Add real-time data collaboration features with WebSockets.',
      'Implement advanced analytics dashboard for research data visualization.',
      'Add export functionality for research reports in multiple formats.',
    ],
  },
  {
    id: 1,
    name: 'SkillBridge — Tutoring Marketplace',
    emoji: '📚',
    bg: 'linear-gradient(135deg,#0e1520,#121a30)',
    tags: ['Full-Stack', 'Marketplace', 'React'],
    desc: 'Full-stack tutoring platform enabling students to connect with instructors, book sessions, and leave reviews.',
    fullDesc:
      'Built a full-stack tutoring platform enabling students to connect with instructors, book sessions, and leave reviews. Implemented authentication, role-based access control, and a dynamic booking system. Designed scalable backend APIs and integrated real-time frontend interactions.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'TailwindCSS'],
    liveUrl: '#',
    ghUrl: '#',
    wide: false,
    challenges: [
      'Building a real-time booking system that prevents double-bookings.',
      'Implementing a fair review and rating system that prevents manipulation.',
      'Designing role-based access for students, instructors, and admins.',
    ],
    future: [
      'Add video calling integration for online tutoring sessions.',
      'Implement AI-powered instructor matching based on learning style.',
      'Add payment gateway for seamless session booking.',
    ],
  },
  {
    id: 2,
    name: 'Leson Paw — Education Platform',
    emoji: '🎓',
    bg: 'linear-gradient(135deg,#0f0e1c,#180f28)',
    tags: ['Full-Stack', 'EdTech', 'Node.js'],
    desc: 'Complete online education system with course management, student enrollment, and admin dashboard.',
    fullDesc:
      'Developed a complete online education system with course management, student enrollment, and admin dashboard. Implemented secure authentication, user roles, and dynamic content rendering. Designed client-server architecture ensuring efficient API communication and data flow.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'REST API'],
    liveUrl: '#',
    ghUrl: '#',
    wide: false,
    challenges: [
      'Building a scalable course enrollment system that handles concurrent users.',
      'Implementing dynamic content rendering for different user roles.',
      'Designing efficient API communication between client and server.',
    ],
    future: [
      'Add interactive quiz and assessment features.',
      'Implement progress tracking and learning analytics.',
      'Add certificate generation on course completion.',
    ],
  },
  {
    id: 3,
    name: 'The Lebas Buying Int — E-commerce',
    emoji: '🛒',
    bg: 'linear-gradient(135deg,#0a1a0f,#0d2b14)',
    tags: ['E-commerce', 'Full-Stack', 'PostgreSQL'],
    desc: 'Full-stack e-commerce platform for managing products, clients, and transactions.',
    fullDesc:
      'Developed a full-stack e-commerce platform for managing products, clients, and transactions. Designed backend services and integrated frontend components for seamless user experience. Built with modern tech stack focusing on performance and scalability.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'TailwindCSS', 'REST API'],
    liveUrl: '#',
    ghUrl: '#',
    wide: false,
    challenges: [
      'Handling concurrent inventory updates during peak traffic.',
      'Building a secure payment and transaction management system.',
      'Optimizing database queries for large product catalogs.',
    ],
    future: [
      'Add AI-powered product recommendations.',
      'Implement real-time inventory tracking.',
      'Add multi-currency and international shipping support.',
    ],
  },
  {
    id: 4,
    name: 'Noorvia — Business Platform',
    emoji: '💼',
    bg: 'linear-gradient(135deg,#1a0e0a,#2b1408)',
    tags: ['Business', 'Full-Stack', 'React'],
    desc: 'Business platform supporting product management and user interaction workflows.',
    fullDesc:
      'Built a business platform supporting product management and user interaction workflows. Developed backend APIs and optimized frontend rendering for performance and usability. Focused on clean architecture and maintainable codebase.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'TailwindCSS'],
    liveUrl: '#',
    ghUrl: '#',
    wide: false,
    challenges: [
      'Designing a flexible product management system adaptable to various business types.',
      'Optimizing frontend rendering performance for complex data views.',
      'Building intuitive user interaction workflows.',
    ],
    future: [
      'Add business analytics and reporting features.',
      'Implement customer relationship management (CRM) features.',
      'Add integration with popular business tools.',
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
    school: 'Noakhali Science and Technology University (NSTU)',
    detail:
      'Specializing in statistical computing and data analysis. Active member of the programming club, building web applications and contributing to open-source projects.',
    pill: '📊 Statistics & Computing',
  },
  {
    year: 'Ongoing',
    degree: 'Self-directed Learning',
    school: 'Udemy · Frontend Masters · YouTube',
    detail:
      'Continuously upskilling in AI integration, system design, and modern DevOps. Currently deep-diving into Golang, PostgreSQL advanced patterns, and cloud deployment.',
    pill: null,
  },
]

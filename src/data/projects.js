/**
 * Verified Projects Inventory for Sumon Ahmed
 * All repositories are verified directly from GitHub: https://github.com/sumon-ahmed-ss-550
 * No placeholder '#' links, no fabricated client contracts or metrics.
 */

export const categories = ['All', 'Full Stack', 'Frontend'];

export const projects = [
  {
    id: 'personal-portfolio',
    title: 'Developer Portfolio',
    category: 'Frontend',
    type: 'Next.js Web Application',
    description:
      'A high-performance personal developer portfolio built with Next.js App Router, Tailwind CSS, and Framer Motion, featuring accessible interaction design and responsive architecture.',
    role: 'Front-End Architecture & Design',
    context:
      'Engineered as a modern showcase of responsive component design, WCAG 2.1 accessibility, and custom design tokens.',
    approach:
      'Constructed using Next.js App Router and semantic tokens, implementing smooth scrolling with reduced-motion fallbacks and theme persistence.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    image: '/img/portfolio.png',
    imageAlt: 'Laptop mockup showing personal developer portfolio interface',
    githubUrl: 'https://github.com/sumon-ahmed-ss-550/Personal-web',
    demoUrl: '#home',
    isSelfDemo: true,
    featured: true,
  },
  {
    id: 'ebook-platform',
    title: 'E-Book Platform',
    category: 'Full Stack',
    type: 'Full-Stack MERN Architecture',
    description:
      'A digital e-book library and reader application featuring modular client-side browsing and a dedicated Node.js/MongoDB server for book catalog persistence.',
    role: 'Full-Stack Developer (Client & Server Repositories)',
    context:
      'Demonstrates a complete MERN stack architecture with decoupled client and server codebases.',
    approach:
      'Built with a responsive React frontend communicating via REST endpoints with a dedicated Express/MongoDB backend service.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'REST API'],
    image: '/img/ebook-platform.png',
    imageAlt: 'Interface preview of the E-Book Platform application',
    githubUrl: 'https://github.com/sumon-ahmed-ss-550/ebook_platform_client',
    serverGithubUrl: 'https://github.com/sumon-ahmed-ss-550/Ebook_Platform_Server',
    demoUrl: null,
    featured: true,
  },
  {
    id: 'tutor-booking',
    title: 'Tutor Booking Platform',
    category: 'Full Stack',
    type: 'Full-Stack MERN Architecture',
    description:
      'An educational service application facilitating tutor discovery and session scheduling, backed by an Express and MongoDB data management layer.',
    role: 'Full-Stack Developer (Client & Server Repositories)',
    context:
      'Created to address instructor directory discovery and booking request management.',
    approach:
      'Engineered with React components on the frontend and an Express/MongoDB REST API on the backend for schedule records.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    image: '/img/tutor-booking.png',
    imageAlt: 'Interface preview of the Tutor Booking Platform web application',
    githubUrl: 'https://github.com/sumon-ahmed-ss-550/Tutor-booking-client',
    serverGithubUrl: 'https://github.com/sumon-ahmed-ss-550/Tutor-booking-server',
    demoUrl: null,
    featured: true,
  },
  {
    id: 'keen-keeper',
    title: 'Keen Keeper',
    category: 'Full Stack',
    type: 'Full-Stack MERN Architecture',
    description:
      'A comprehensive task and resource management application designed to help users organize, track, and manage their personal or professional tasks efficiently with a modern, intuitive interface.',
    role: 'Full-Stack Developer (Client & Server Repositories)',
    context:
      'Built to address the need for a streamlined task management solution with real-time updates and persistent data storage.',
    approach:
      'Engineered with a responsive React frontend and Express/MongoDB backend, featuring RESTful API endpoints for CRUD operations and user authentication.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    image: '/img/keen-keeper.png',
    imageAlt: 'Interface preview of the Keen Keeper task management application',
    githubUrl: 'https://github.com/sumon-ahmed-ss-550/Keen-Keeper-client',
    serverGithubUrl: 'https://github.com/sumon-ahmed-ss-550/Keen-Keeper-server',
    demoUrl: null,
    featured: true,
  },
];

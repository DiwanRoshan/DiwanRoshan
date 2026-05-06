import { Injectable } from '@angular/core';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'streaming' | 'others';
  level: number; // 1-100
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
  technologies: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  publishedAt: Date;
  readTime: number;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone?: string;
  location: string;
  bio: string;
  avatar: string;
  resumeUrl: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    dribbble?: string;
    behance?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  // Personal Information - UPDATE THIS WITH YOUR INFO
  personalInfo: PersonalInfo = {
    name: 'Diwan Roshan',
    title: 'Senior Software Engineer',
    tagline: 'I create exceptional digital experiences that make an impact.',
    email: 'diwanroshan2604@gmail.com',
    phone: '+91 8801833417',
    location: 'Hyderabad, India',
    // 'Senior Software Engineer with 4.6+ years of experience building scalable web applications and OTT streaming platforms. I specialize in Angular, TypeScript, JavaScript, REST APIs, and frontend architecture.'
    // 'I’m passionate about creating high-performance user experiences, reusable UI systems, Chromecast-enabled streaming solutions, and production-ready applications. I enjoy solving real-world problems, optimizing performance, and building clean, maintainable products that scale.'
    bio: `I'm a passionate Senior Software Engineer with 4.6+ years of experience building web applications. 
    I specialize in Angular, TypeScript, JavaScript, REST APIs, and frontend architecture. I love creating elegant solutions 
    to complex problems and am always eager to learn new technologies.
    
    When I'm not coding, you can find me exploring new coffee shops, hiking trails, or travelling to new places.
    I believe in writing clean, maintainable code and creating user experiences 
    that truly delight users.`,
    avatar: 'https://i.ibb.co/ZzWcxxQz/avatar.jpg',
    resumeUrl: 'assets/resume.pdf',
    social: {
      github: 'https://github.com/diwanroshan',
      linkedin: 'https://www.linkedin.com/in/diwan-roshan/',
      // twitter: 'https://twitter.com/yourusername',
    }
  };

  // Projects - UPDATE WITH YOUR PROJECTS
  projects: Project[] = [
    {
      id: 'project-1',
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform with real-time inventory management and AI-powered recommendations.',
      longDescription: 'Built a full-featured e-commerce platform from scratch using Angular and Node.js. Implemented real-time inventory tracking, secure payment processing with Stripe, and an AI-powered recommendation engine that increased sales by 35%.',
      image: 'assets/images/projects/ecommerce.jpg',
      tags: ['Angular', 'Node.js', 'MongoDB', 'Stripe', 'AI/ML'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/yourusername/ecommerce',
      featured: true,
    },
    {
      id: 'project-2',
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team analytics.',
      longDescription: 'Developed a Trello-like task management app with drag-and-drop functionality, real-time collaboration using WebSockets, and comprehensive team analytics dashboard.',
      image: 'assets/images/projects/taskapp.jpg',
      tags: ['React', 'Firebase', 'TypeScript', 'WebSockets'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/yourusername/taskapp',
      featured: true,
    },
    {
      id: 'project-3',
      title: 'Health & Fitness Tracker',
      description: 'A comprehensive health tracking app with workout plans and nutrition tracking.',
      longDescription: 'Created a health and fitness application that tracks workouts, nutrition, and sleep patterns. Integrated with wearable devices and provided personalized insights using machine learning.',
      image: 'assets/images/projects/fitness.jpg',
      tags: ['React Native', 'Python', 'TensorFlow', 'PostgreSQL'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/yourusername/fitness',
      featured: true,
    },
    {
      id: 'project-4',
      title: 'Real Estate Platform',
      description: 'A property listing platform with virtual tours and mortgage calculator.',
      image: 'assets/images/projects/realestate.jpg',
      tags: ['Vue.js', 'Django', 'PostgreSQL', 'Three.js'],
      liveUrl: 'https://example.com',
      featured: false,
    },
    {
      id: 'project-5',
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for managing multiple social media accounts.',
      image: 'assets/images/projects/social.jpg',
      tags: ['Angular', 'D3.js', 'Express', 'Redis'],
      githubUrl: 'https://github.com/yourusername/social',
      featured: false,
    },
    {
      id: 'project-6',
      title: 'AI Chatbot',
      description: 'An intelligent chatbot for customer support automation.',
      image: 'assets/images/projects/chatbot.jpg',
      tags: ['Python', 'NLP', 'FastAPI', 'Docker'],
      liveUrl: 'https://example.com',
      featured: false,
    },
  ];

  // Skills - UPDATE WITH YOUR SKILLS
  skills: Skill[] = [
    // Frontend
    { name: 'Angular', icon: 'angular', category: 'frontend', level: 85 },
    { name: 'React', icon: 'react', category: 'frontend', level: 60 },
    { name: 'TypeScript', icon: 'typescript', category: 'frontend', level: 80 },
    { name: 'JavaScript', icon: 'javascript', category: 'frontend', level: 80 },
    { name: 'HTML/CSS', icon: 'html5', category: 'frontend', level: 98 },
    { name: 'SCSS/Sass', icon: 'sass', category: 'frontend', level: 95 },
    { name: 'RxJS', icon: 'rxjs', category: 'frontend', level: 80 },
    { name: 'NgRx', icon: 'ngrx', category: 'frontend', level: 75 },
    { name: 'Bootstrap', icon: 'bootstrap', category: 'frontend', level: 90 },
    { name: 'Tailwind CSS', icon: 'tailwindcss', category: 'frontend', level: 90 },
    
    // Backend
    { name: 'REST APIs', icon: 'api', category: 'backend', level: 90 },
    { name: 'API Integration', icon: 'cloud', category: 'backend', level: 88 },
    { name: 'Payment Gateway', icon: 'creditcard', category: 'backend', level: 82 },
    { name: 'SendGrid', icon: 'mail', category: 'backend', level: 85 },
    { name: 'Google Chromecast', icon: 'cast', category: 'backend', level: 78 },
    
    // Tools & Others
    { name: 'Git', icon: 'git', category: 'tools', level: 90 },
    { name: 'GitFlow', icon: 'gitbranch', category: 'tools', level: 82 },
    { name: 'Jira', icon: 'jira', category: 'tools', level: 88 },
    { name: 'Postman', icon: 'postman', category: 'tools', level: 85 },
    { name: 'Jenkins', icon: 'jenkins', category: 'tools', level: 72 },
    { name: 'VS Code', icon: 'vscode', category: 'tools', level: 95 },
    { name: 'Chrome DevTools', icon: 'chrome', category: 'tools', level: 92 },
    { name: 'Agile/Scrum', icon: 'agile', category: 'tools', level: 88 },
    { name: 'Code Reviews', icon: 'code', category: 'tools', level: 85 },
    { name: 'Debugging', icon: 'bug', category: 'tools', level: 92 },
    { name: 'Production Support', icon: 'settings', category: 'tools', level: 86 },
    { name: 'Feature Ownership', icon: 'layers', category: 'tools', level: 84 },
    { name: 'Cross Functional Collaboration', icon: 'users', category: 'tools', level: 87 },

    // Streaming & OTT
    { name: 'OTT Platforms', icon: 'tv', category: 'streaming', level: 85 },
    { name: 'Streaming Platforms', icon: 'playcircle', category: 'streaming', level: 84 },
    { name: 'Video Playback', icon: 'video', category: 'streaming', level: 82 },

  ];

  // Experience - UPDATE WITH YOUR EXPERIENCE
  experiences: Experience[] = [
    {
      id: 'exp-1',
      role: 'Senior Software Engineer',
      company: 'Yupp Video Services',
      location: 'Hyderabad, India',
      startDate: 'Oct 2025',
      endDate: 'Present',
      description: [
        'Owned end-to-end delivery of critical platform features from requirement understanding and technical design to deployment coordination and post-release optimization.',
        'Led architecture and development of a reusable UI component library that standardized design patterns across multiple applications and reduced development effort by 30-40%.',
        'Drove Google Chromecast platform development to expand streaming availability across connected TV devices and improve multi-device user reach.',
        'Conducted code reviews, guided junior engineers, and improved engineering quality through stronger development standards and technical mentoring.',
      ],
      technologies: ['Angular', 'TypeScript', 'RxJS', 'REST APIs', 'Chromecast', 'Jenkins'],
    },
    {
      id: 'exp-2',
      role: 'Software Engineer',
      company: 'Yupp Video Services',
      location: 'Hyderabad, India',
      startDate: 'Jun 2023',
      endDate: 'Oct 2025',
      description: [
        'Designed and implemented responsive web pages and user-facing features for OTT platforms, contributing to a 19% increase in mobile users.',
        'Collaborated with product managers, designers, and backend engineers to define requirements, refine scope, and deliver features within Agile release cycles.',
        'Integrated payment APIs into the web application, contributing to a 15% increase in revenue through improved transaction enablement.',
        'Developed dynamic cross-client-compatible email templates using HTML tables, inline CSS, and SendGrid for production communication workflows.',
        'Supported debugging, issue resolution, and quality improvements across production-facing modules to maintain application reliability.',
      ],
      technologies: ['Angular', 'JavaScript', 'TypeScript', 'REST APIs', 'Payment Gateway', 'SendGrid'],
    },
    {
      id: 'exp-3',
      role: 'Trainee Software Engineer',
      company: 'Yupp Video Services',
      location: 'Hyderabad, India',
      startDate: 'Oct 2021',
      endDate: 'Jun 2023',
      description: [
        'Built foundational experience in coding, debugging, testing, and technical documentation while working with senior engineers on production deliverables.',
        'Integrated the Paytm payment gateway by following technical documentation and implementation standards to support secure payment processing.',
        'Implemented UI changes and new functionality based on client requirements and Figma designs to improve delivery accuracy and stakeholder satisfaction.',
      ],
      technologies: ['JavaScript', 'HTML', 'CSS', 'Paytm', 'Figma'],
    },
  ];

  // Testimonials - UPDATE WITH YOUR TESTIMONIALS
  testimonials: Testimonial[] = [
    {
      id: 'testimonial-1',
      name: 'Sarah Johnson',
      role: 'CTO',
      company: 'Tech Company Inc.',
      image: 'assets/images/testimonials/sarah.jpg',
      quote: 'An exceptional developer who consistently delivers high-quality work. Their attention to detail and problem-solving skills are outstanding. They were instrumental in the success of our platform rewrite.',
      rating: 5,
    },
    {
      id: 'testimonial-2',
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Startup Labs',
      image: 'assets/images/testimonials/michael.jpg',
      quote: 'Working with them was a pleasure. They have a unique ability to translate complex requirements into elegant, user-friendly solutions. I highly recommend them for any challenging project.',
      rating: 5,
    },
    {
      id: 'testimonial-3',
      name: 'Emily Rodriguez',
      role: 'Design Lead',
      company: 'Digital Agency',
      image: 'assets/images/testimonials/emily.jpg',
      quote: 'The best developer I\'ve collaborated with. They bring designs to life with pixel-perfect precision and always suggest improvements that enhance the user experience.',
      rating: 5,
    },
    {
      id: 'testimonial-4',
      name: 'David Kim',
      role: 'Founder',
      company: 'Tech Startup',
      image: 'assets/images/testimonials/david.jpg',
      quote: 'They helped us build our MVP in record time without compromising on quality. Their technical expertise and business acumen make them an invaluable asset to any team.',
      rating: 5,
    },
  ];

  // Blog Posts - Sample posts
  blogPosts: BlogPost[] = [
    {
      id: 'angular-animations-guide',
      title: 'Mastering Angular Animations: A Complete Guide',
      excerpt: 'Learn how to create smooth, performant animations in Angular applications using the built-in animation module and GSAP.',
      content: '',
      coverImage: 'assets/images/blog/angular-animations.jpg',
      tags: ['Angular', 'Animations', 'GSAP', 'Tutorial'],
      publishedAt: new Date('2024-03-15'),
      readTime: 12,
    },
    {
      id: 'typescript-best-practices',
      title: 'TypeScript Best Practices for Large-Scale Applications',
      excerpt: 'Discover proven patterns and practices for writing maintainable TypeScript code in enterprise applications.',
      content: '',
      coverImage: 'assets/images/blog/typescript.jpg',
      tags: ['TypeScript', 'Best Practices', 'Architecture'],
      publishedAt: new Date('2024-02-28'),
      readTime: 10,
    },
    {
      id: 'building-design-system',
      title: 'Building a Scalable Design System from Scratch',
      excerpt: 'A step-by-step guide to creating a design system that scales with your organization.',
      content: '',
      coverImage: 'assets/images/blog/design-system.jpg',
      tags: ['Design System', 'CSS', 'Components', 'Tutorial'],
      publishedAt: new Date('2024-02-10'),
      readTime: 15,
    },
  ];

  // Methods to get data
  getPersonalInfo(): PersonalInfo {
    return this.personalInfo;
  }

  getProjects(): Project[] {
    return this.projects;
  }

  getFeaturedProjects(): Project[] {
    return this.projects.filter(p => p.featured);
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(p => p.id === id);
  }

  getSkills(): Skill[] {
    return this.skills;
  }

  getSkillsByCategory(category: Skill['category']): Skill[] {
    return this.skills.filter(s => s.category === category);
  }

  getExperiences(): Experience[] {
    return this.experiences;
  }

  getTestimonials(): Testimonial[] {
    return this.testimonials;
  }

  getBlogPosts(): BlogPost[] {
    return this.blogPosts;
  }

  getBlogPostById(id: string): BlogPost | undefined {
    return this.blogPosts.find(p => p.id === id);
  }
}

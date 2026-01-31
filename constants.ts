import { Project, Experience, Skill, SkillCategory } from './types';

export const RESUME_SUMMARY = `
Mahfuz Chowdhury is a Software Engineer and Computer Science student at City, University of London (1st Class track). 
He specializes in high-performance systems and scalable web architectures, with professional experience at American Express 
developing observability tools and bridging Go/Java systems. Experience in Go, C++, Python, and React.
`;

export const PROJECTS: Project[] = [
  {
    title: "Risk Watch",
    category: "Systems",
    description: "Full-stack SaaS for institutional-grade risk analysis. Features a C++ computation core executing 100,000-path Monte Carlo simulations with a 2x performance increase over Python.",
    tech: ["Go", "C / C++", "Python", "FastAPI", "React", "PostgreSQL", "Redis"],
    metrics: [
      "100,000-path Monte Carlo simulations",
      "Real-time React dashboard with WebSockets",
      "Decoupled microservice architecture"
    ],
    repoUrl: "https://github.com/MC-161"
  },
  {
    title: "Know Flow",
    category: "FullStack",
    description: "Enterprise knowledge search platform implementing a secure Retrieval-Augmented Generation (RAG) pipeline using Llama3 and FAISS vector indexing.",
    tech: ["Python", "FastAPI", "React", "Llama3", "FAISS", "Docker"],
    metrics: [
      "80%+ user-polled helpfulness score",
      "Zero access violations in RBAC testing",
      "End-to-end latency tracking suite"
    ],
    repoUrl: "https://github.com/MC-161"
  },
  {
    title: "Hoop Insight",
    category: "FullStack",
    description: "NBA analytics platform with a React/TypeScript frontend and Node.js/Express backend. Includes a multi-threaded Python data scraping pipeline.",
    tech: ["Node.js", "Express", "MongoDB", "React", "TypeScript", "Tailwind CSS", "Python", "Docker"],
    metrics: [
      "Robust Python scraping pipeline",
      "10+ unit and integration tests (Mocha/Chai)",
      "Full Swagger API documentation"
    ],
    repoUrl: "https://github.com/MC-161/HoopsInsight"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Software Engineer Intern",
    company: "American Express",
    period: "Jun, 2025 – Aug, 2025",
    tech: ["Go", "React", "Docker", "Kubernetes", "Kafka", "PostgreSQL", "Redis", "Java", "Distributed Systems", "Microservices", "CI / CD", "RESTful APIs"],
    highlights: [
      "Developed and deployed a production-ready observability tool for Go-based microservices using a React UI, Docker, and Kubernetes, integrating the solution fully into the CI/CD pipeline.",
      "Designed and integrated a new API to bridge Go and Java-based systems, resolving complex performance and architectural challenges in the core transaction processor.",
      "Built the solution using a distributed tech stack including Kafka event streams, PostgreSQL, and Redis to handle real-time stream of 10,000+ events, and gained exposure to Cassandra and Couchbase via partner integrations.",
      "Enhanced system reliability and performance by enabling full event traceability and optimising query/caching layers, reducing latency across high-volume partner integrations.",
      "Presented the project to 12+ engineering teams, achieving 90% adoption rate and establishing the tool as a daily-workflow standard for monitoring."
    ]
  },
  {
    role: "Software Engineering Pathway",
    company: "DotPlot @ Tech Academia",
    period: "Jul, 2024 – Aug, 2024",
    tech: ["React", "TypeScript", "Node.js"],
    highlights: [
      "Led the development of Sonomon, a full-stack patient management application (React, TypeScript, Node.js), winning first place among competing teams.",
      "Drove the project from high-fidelity mock-ups to a deliverable MVP in just 48 hours, completing the entire project 24 hours ahead of schedule.",
      "Improved application loading times by 5 seconds through asset compression and frontend performance optimisations.",
      "Managed the full project lifecycle by leading 5+ team meetings and resolving 3 major technical blockers to ensure milestones were met."
    ]
  }
];

export const SKILLS: Skill[] = [
  // Languages
  { name: "Go", level: 95, category: SkillCategory.BACKEND },
  { name: "Python", level: 94, category: SkillCategory.BACKEND },
  { name: "C / C++", level: 92, category: SkillCategory.BACKEND },
  { name: "Java", level: 88, category: SkillCategory.BACKEND },
  { name: "TypeScript", level: 90, category: SkillCategory.FRONTEND },
  { name: "Node.js", level: 85, category: SkillCategory.BACKEND },
  
  // Frameworks
  { name: "Gin", level: 90, category: SkillCategory.BACKEND },
  { name: "React", level: 95, category: SkillCategory.FRONTEND },
  { name: "Spring Boot", level: 82, category: SkillCategory.BACKEND },
  { name: "FastAPI", level: 90, category: SkillCategory.BACKEND },
  { name: "Tailwind CSS", level: 92, category: SkillCategory.FRONTEND },
  
  // Storage & Infra
  { name: "PostgreSQL", level: 88, category: SkillCategory.DATA },
  { name: "Redis", level: 90, category: SkillCategory.DATA },
  { name: "MongoDB", level: 85, category: SkillCategory.DATA },
  { name: "Kafka", level: 84, category: SkillCategory.DATA },
  { name: "Docker", level: 90, category: SkillCategory.ARCH },
  { name: "Kubernetes", level: 82, category: SkillCategory.ARCH },
  
  // Concepts
  { name: "Distributed Systems", level: 88, category: SkillCategory.ARCH },
  { name: "Microservices", level: 90, category: SkillCategory.ARCH },
  { name: "CI / CD", level: 85, category: SkillCategory.ARCH },
  { name: "RESTful APIs", level: 95, category: SkillCategory.BACKEND },
];

export const EDUCATION_MODULES = [
  "Intro to Python", "Algorithms", "Data structures", "Databases", 
  "Operating Systems", "Language Processor", "Networks", "Discrete Math"
];